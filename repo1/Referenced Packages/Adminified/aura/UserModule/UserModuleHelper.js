({
    /* globals $ */
    isDeletable:false,
    getUserTemplate: function(component, event, helper) {
         $(document.getElementById('appendDiv')).html('');
        var action = component.get("c.getUserTemplate");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                if(response.getReturnValue().status === "SUCCESS"){
                    var jsonD = $.parseJSON(response.getReturnValue().body);
                    component.set("v.userTemplate",jsonD);
                    component.set("v.userSettingTemplateData",jsonD);
                    this.dynamicAddCmp(component, event, helper); 
                    var temp = '';
                    var sectionDisplayClass = '';
                    $.each(jsonD, function(idx, obj){
                        temp += '<div class="'+component.get("v.userCommonId")+''+idx+' user-section-class section-class"><h3 class="toggle-section slds-truncate slds-section-title section-group--is-open setting-'+idx+'" id="'+component.get("v.userCommonId")+''+idx+'"><a class="togal_'+component.get("v.userCommonId")+''+idx+' slds-button slds-button--icon-container focus-none"><span class="expand expand-'+idx+'" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use></svg></span><span class="collapse collapse-'+idx+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch"></use></svg></span></a><stivadmn:adminifiedIcons class="slds-icon slds-icon--small slds-icon-text-default" svgPath="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch" />'+obj.label+'</h3><table class="slds-table toggelClass slds-table--bordered" id="table-'+component.get("v.userCommonId")+''+idx+'"><tbody></tbody></table></div>';
                        $(document.getElementById('appendDiv')).append(temp);
                        if(obj.display){
                            $(document.getElementById('userModule').querySelectorAll('div.'+component.get("v.userCommonId")+''+idx)).removeClass('section-field-hide');
                        }else{
                            $(document.getElementById('userModule').querySelectorAll('div.'+component.get("v.userCommonId")+''+idx)).addClass('section-field-hide');
                        }
                        
                        $.each(obj.fields, function(i, o){
                            if(i !== 'FirstName' && i !== 'LastName'){
                                $(document.getElementById('table-'+component.get("v.userCommonId")+''+idx)).append('<tr id="adminifiedAdminifiedUserModule-'+i+'" class="toggle-'+component.get("v.userCommonId")+''+idx+' user-field-row user-search-'+i+' setting-'+i+' datarow"><td class="slds-text-align--right">'+o.label+'</td></tr>');
                               if(o.display){
                                    $(document.getElementById('userModule').querySelectorAll('.setting-'+i)).removeClass('section-field-hide');
                                }else{
                                     $(document.getElementById('userModule').querySelectorAll('.setting-'+i)).addClass('section-field-hide');
                                }
                            }
                        });
                        temp = '';
                    });
                    
                   $('body').off('click', '#appendDiv .toggle-section');  
                   $('body').on('click', '#appendDiv .toggle-section', function(){
                        component.getEvent("QuickSearch").setParams({
                            "template" : component.get("v.userTemplate"),
                            "moduleName" : "userModule",
                            "inputName" : "user",
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
         helper.dynamicAddCmp(component, event, helper, isDel);
    },
    
    dynamicAddCmp : function(component, event, helper, isDel) {
         
        var userBody = component.get("v.userBody");
        var newIndex = userBody.length;
        component.set("v.index", userBody.length + 1);
        $(document.getElementById('userModule').querySelectorAll('.compare-btn')).html('').append('<span class="loader-active"><svg class="spinnerBlue" width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></span> Add to Compare');
         
        $A.createComponent(
            "stivadmn:UserInfo",{ 
                "aura:id" : "UserInfo",
                "index" : newIndex,
                "isDeletable": isDel,
                "userTemplate" : component.get("v.userTemplate"),
                "randomNumber" : Math.round(Math.random() * 1000),
                "userCommonId" : component.get('v.userCommonId')
            },
            function(newComponent, status, errorMessage){
                if (component.isValid()) {
                    var userBodyCmp = component.get("v.userBody");
                    userBodyCmp.push(newComponent);
                    component.set("v.userBody", userBodyCmp);
                } 
            });
    },
    
})