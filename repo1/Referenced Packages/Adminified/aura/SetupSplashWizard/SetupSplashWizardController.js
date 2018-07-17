({
    /* globals $*/
    
    gotIt : function(component, event, helper) {
        $(document.getElementsByClassName('setup-wizard-cls')[0]).remove();
        var self = this;
        var action = component.get("c.updateAppSetupWizard");
        action.setParams({
            "appSetupWizard": "1"
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                if (response.getReturnValue().status ==="FAIL"){
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
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
    
    next : function(component, event, helper) {
        var count = component.get("v.count");
        $(document.getElementsByClassName('splash-cls')).hide();
        $(document.getElementsByClassName('splash-'+(count+1))).show();
        if((count+1) >2){
            $(document.getElementsByClassName('next-btn')).hide();
            $(document.getElementsByClassName('back-btn')).show();
            $(document.getElementsByClassName('got-it-btn')).show();
            $(document.getElementsByClassName('skip-btn')).show();
        }else{
            $(document.getElementsByClassName('back-btn')).show();
        }
        component.set("v.count", (count+1));
        
    },
    
    back : function(component, event, helper) {
        var count = component.get("v.count");
        $(document.getElementsByClassName('splash-cls')).hide();
        $(document.getElementsByClassName('splash-'+(count-1))).show();
        if((count-1) === 1){
            $(document.getElementsByClassName('next-btn')).show();
            $(document.getElementsByClassName('back-btn')).hide();
            $(document.getElementsByClassName('got-it-btn')).hide();
            $(document.getElementsByClassName('skip-btn')).hide();
        }
        component.set("v.count", (count-1));
    },
    
    skip : function(component, event, helper) {
        $(document.getElementsByClassName('setup-wizard-cls')).remove();
    },
    
    close : function(component, event, helper) {
        $(document.getElementsByClassName('setup-wizard-cls')).remove();
    },
    
    addOrg : function(component, event, helper) {
        
        var index = 1;
        $A.createComponent("stivadmn:ConnectToOrganization", {"aura:id": "ConnectToOrganization", "index" : index}, function(newModel){
            if (component.isValid()) {
                var body = component.find("orgnizationDiv1");
                body.set("v.body", newModel);
            }
        });
    },
    
     createConnctedApp : function(component, event, helper) {
       document.getElementsByClassName('connectedAppModule')[0].classList.add('slds-fade-in-open');
       $A.createComponent("stivadmn:ConnectedAppSettingModule", {"aura:id": "ConnectedAppSettingModule"}, function(newModel){
                if (component.isValid()) {
                    var body = component.find("ConnectedAppDiv");
                    body.set("v.body", newModel);
                }
        });
	},
    closeConnectedAppModule: function(component, event, helper) {
          document.getElementsByClassName('connectedAppModule')[0].classList.remove('slds-fade-in-open');
    }
    
})