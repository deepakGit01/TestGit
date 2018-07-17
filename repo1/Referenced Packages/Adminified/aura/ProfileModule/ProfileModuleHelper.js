({
    /* globals $ */
    isDeletable:false,
    getProfileTemplate: function(component, event, helper) {
        $(document.getElementById('ProfileSectionDiv')).html('');
        var action = component.get("c.getProfileTemplate");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                if (response.getReturnValue().status === "SUCCESS") {
                    component.set("v.profileTemplate",$.parseJSON(response.getReturnValue().body));
                    var jsonD = $.parseJSON(response.getReturnValue().body);
                    var temp = '';
                    this.addProfileInfoModule(component, event, helper);
                    $.each(jsonD, function(idx, obj){
                        temp += '<div class="'+component.get('v.profileCommonId')+''+idx+' profile-section-class section-class"><h3 class="toggle-section slds-truncate slds-section-title section-group--is-open " id="'+component.get('v.profileCommonId')+''+idx+'"><a class="togal_'+component.get('v.profileCommonId')+''+idx+' slds-button slds-button--icon-container focus-none"><span class="expand expand-'+idx+'" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use></svg></span><span class="collapse collapse-'+idx+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch"></use></svg></span></a><stivadmn:adminifiedIcons class="slds-icon slds-icon--small slds-icon-text-default" svgPath="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch" />'+obj.label+'</h3><table class="slds-table toggelClass slds-table--bordered  subsection-table" id="table-'+component.get('v.profileCommonId')+''+idx+'"><tbody></tbody></table></div>';
                        $(document.getElementById('ProfileSectionDiv')).append(temp);
                        if(obj.display){
                            $(document.getElementById('profileModule').querySelectorAll('div.'+component.get('v.profileCommonId')+''+idx)).removeClass('section-field-hide');
                        }else{
                            $(document.getElementById('profileModule').querySelectorAll('div.'+component.get('v.profileCommonId')+''+idx)).addClass('section-field-hide');
                        }
                        $.each(obj.fields, function(i, o){
                            $(document.getElementById('table-'+component.get('v.profileCommonId')+''+idx)).append('<tr id="adminifiedAdminifiedProfileModule-'+i+'" class="toggle-'+component.get('v.profileCommonId')+''+idx+' profile-field-row profile-search-'+i+' setting-'+i+' datarow"><td class="slds-text-align--right">'+o.label+'</td></tr>');
                            if(o.display){
                                $(document.getElementById('profileModule .setting-'+i)).removeClass('section-field-hide');
                            }else{
                                $(document.getElementById('profileModule .setting-'+i)).addClass('section-field-hide');
                            }
                        });
                        temp = '';
                    });
                    
                    $('body').off('click', '#ProfileSectionDiv .toggle-section');
                    $('body').on('click', '#ProfileSectionDiv .toggle-section', function(){
                        component.getEvent("QuickSearch").setParams({
                            "template" : component.get("v.profileTemplate"),
                            "moduleName" : "profileModule",
                            "inputName" : "profile",
                            "evtName" : "toggle",
                            "thisObj" : $(this)
                        }).fire();
                    }); 
                }
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            }
            
        });
        $A.enqueueAction(action);
    },
    
    plusComponent: function(component, event, helper) {
        var isDel = false;
        helper.addProfileInfoModule(component, event, helper);
    },
    
    addProfileInfoModule: function(component, event, helper, isDel) {
        var profileBody = component.get("v.profileBody");
        var newIndex = profileBody.length;
        component.set("v.index", profileBody.length + 1);
        $A.createComponent(
            "stivadmn:ProfileInfo",{ 
                "aura:id" : "ProfileInfo",
                "index" : newIndex,
                "isDeletable": isDel,
                "profileTemplate" : component.get("v.profileTemplate"),
                "randomNumber" :  Math.round(Math.random() * 1000),
                "profileCommonId" : component.get('v.profileCommonId')
            },
            function(newComponent){
                if (component.isValid()) {
                    profileBody = component.get("v.profileBody");
                    profileBody.push(newComponent);
                    component.set("v.profileBody", profileBody);
                }
            });
    },
    
})