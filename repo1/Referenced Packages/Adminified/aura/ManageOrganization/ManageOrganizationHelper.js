({
    /* globals $ */
    getConnectedOrg : function(component, event, helper) {
        var action = component.get("c.getConnectedOrg");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                $(document.getElementsByClassName('loaderTr-manageorg')).hide();
                component.set("v.allOrg",response.getReturnValue());
            }else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                 $(document.getElementById('comp'+event.getParam("randomNumber")+' .cute-loader .loader-active')).remove(); 
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            } 
        });         
        $A.enqueueAction(action);   
    },
    
    delConnectedOrg : function(component, event, helper) {
        $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).addClass('pointer-event');
         $(document.getElementsByClassName('adminifiedTabsUl')).addClass('pointer-event');
        var action = component.get("c.delConnectedOrg");                   
        action.setParams({
            "orgId" : component.get("v.delOrgId")
        });         
        action.setCallback(this, function(response) {
            var state = response.getState();
            $(document.getElementsByClassName('ManagOrgScrollPos')).scrollTop(0);
            if (component.isValid() && state === "SUCCESS") { 
                component.set("v.allOrg",response.getReturnValue());                
                var msg = component.get("v.delOrgName")+' is deleted successfully.';$(document.getElementsByClassName('alert-noti')).addClass('slds-theme--success');
                $(document.getElementsByClassName('msg-cls')).html(msg);
                $(document.getElementsByClassName('alert-noti')).show();
                setTimeout(function(){
                    $(document.getElementsByClassName('alert-noti')).hide();
                    $(document.getElementsByClassName('msg-cls')).text('');
                    $(document.getElementsByClassName('alert-noti')).removeClass('slds-theme--success');
                },5000);
                component.getEvent("AfterDeleteOrg").setParams({
                    "orgId" : component.get("v.delOrgId"),
                    "allOrg" : response.getReturnValue()
                }).fire();
                $(component.get("v.thisObj")).html('<span class="slds-icon__container slds-icon-utility-delete"><svg aria-hidden="true" class="slds-button__icon slds-icon--x-small" name="delete"><use  xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#delete"></use></svg><span class="slds-assistive-text"></span></span>');
                $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).removeClass('pointer-event');
                $(document.getElementsByClassName('adminifiedTabsUl')).removeClass('pointer-event');
                
            }  
            else if(state === "Error") {
                var errors = response.getError();
                component.set("v.delOrgError",errors[0].message);
                
                $(document.getElementsByClassName('alert-noti')).addClass('slds-theme--error');
                $(document.getElementsByClassName('msg-cls')).html(errors[0].message);
                $(document.getElementsByClassName('alert-noti')).show();
                setTimeout(function(){
                    $(document.getElementsByClassName('alert-noti')).hide();
                    $(document.getElementsByClassName('msg-cls')).text('');
                    $(document.getElementsByClassName('alert-noti')).removeClass('slds-theme--error');
                },5000);   
                $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).removeClass('pointer-event');
                $(document.getElementsByClassName('adminifiedTabsUl')).removeClass('pointer-event');
            }            
        }); 
        $A.enqueueAction(action);                   
    },
    
})