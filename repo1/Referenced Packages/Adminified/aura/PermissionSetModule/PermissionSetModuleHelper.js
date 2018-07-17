({
    /* globals $ */
    isDeletable:false,
    getPermissionSetTemplate: function(component, event, helper) {
        document.getElementById('PermissionSetSectionDiv').innerHTML = '';
        var action = component.get("c.getPermissionsTemplate");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                if (response.getReturnValue().status === "SUCCESS") {
                    var jsonD = JSON.parse(response.getReturnValue().body);
                    component.set("v.permissionSetTemplate",jsonD);
                    component.set("v.permissionSetTemplateDataSetting",jsonD);
                    var temp = '';
                    helper.addPermissionInfoModule(component, event, helper);
                    
                    $.each(jsonD, function(idx, obj){
                        temp += '<div class="'+component.get("v.permissionSetCommonId")+''+idx+' permissionset-section-class section-class"><h3 class="toggle-section slds-truncate slds-section-title section-group--is-open" id="'+component.get("v.permissionSetCommonId")+''+idx+'"><a class="togal_'+component.get("v.permissionSetCommonId")+''+idx+' slds-button slds-button--icon-container focus-none"><span class="expand expand-'+idx+'" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use></svg></span><span class="collapse collapse-'+idx+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch"></use></svg></span></a><stivadmn:adminifiedIcons class="slds-icon slds-icon--small slds-icon-text-default" svgPath="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#switch" />'+obj.label+'</h3><table class="slds-table toggelClass  subsection-table slds-table--bordered permissionset-table-'+idx+'" id="table-'+component.get("v.permissionSetCommonId")+''+idx+'"><tbody></tbody></table></div>';
                        $(document.getElementById('PermissionSetSectionDiv')).append(temp);
                        if(obj.display){
                            $(document.getElementsByClassName(component.get("v.permissionSetCommonId")+''+idx)).removeClass('section-field-hide');
                        }else{
                            $(document.getElementsByClassName(component.get("v.permissionSetCommonId")+''+idx)).removeClass('section-field-hide');
                        }
                        $.each(obj.fields, function(i, o){
                            $(document.getElementById('table-'+component.get("v.permissionSetCommonId")+''+idx)).append('<tr id="adminifiedAdminifiedPermissionSetModule-'+i+'" class="toggle-'+component.get("v.permissionSetCommonId")+''+idx+' permissionset-field-row permissionset-search-'+i+' setting-'+i+' datarow"><td class="slds-text-align--right">'+o.label+'</td></tr>');
                            
                            if(o.display){
                                $(document.getElementById('permissionModule').querySelectorAll('.setting-'+i)).removeClass('section-field-hide');
                            }else{
                                $(document.getElementById('permissionModule').querySelectorAll('.setting-'+i)).addClass('section-field-hide');
                            }
                        });
                        temp = '';                    
                    });
                    $(document.getElementById('PermissionSetSectionDiv').querySelectorAll('.permissionset-table-Object')).attr('id', 'table-'+component.get("v.permissionSetCommonId")+'Object');
                    $(document.getElementsByClassName('permission-set-section')).show();
                    $('body').off('click', '#PermissionSetSectionDiv .toggle-section');   
                    $('body').on('click', '#PermissionSetSectionDiv .toggle-section', function(){
                        component.getEvent("QuickSearch").setParams({
                            "template" : component.get("v.permissionSetTemplate"),
                            "moduleName" : "permissionModule",
                            "inputName" : "permissionset",
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
    
    addPermissionInfoModule : function(component, event, helper, isDel) {
        var permissionSetBody = component.get("v.permissionSetBody");
        var newIndex = permissionSetBody.length;
        component.set("v.index", permissionSetBody.length + 1);
        if(component.get("v.index") === 2){
        }
        $A.createComponent(
            "stivadmn:PermissionsSetInfo",{ 
                "aura:id" : "PermissionsSetInfo",
                "index" : newIndex,
                "isDeletable": isDel,
                "permissionSetTemplate" : component.get("v.permissionSetTemplate"),
                "randomNumber" :  Math.round(Math.random() * 1000),
                "permissionSetCommonId" : component.get("v.permissionSetCommonId")
            },
            function(newComponent){
                if (component.isValid()) {
                    var newPermissionSetBody = component.get("v.permissionSetBody");
                    newPermissionSetBody.push(newComponent);
                    component.set("v.permissionSetBody", newPermissionSetBody);
                    var refCmpBody = component.get("v.permissionSetBody");        
                    for(var i =0 ; i < refCmpBody.length ; i++){                                   
                        refCmpBody[i].set("v.index", i); 
                    }
                    component.set("v.permissionSetBody", refCmpBody);
                }
            });
    },
})