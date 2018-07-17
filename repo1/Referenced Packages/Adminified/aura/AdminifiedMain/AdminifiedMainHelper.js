({ /* globals $ */
    getGlobalConOrg : function(component, event, helper){
        var action = component.get("c.getConnectedOrg");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.globalConOrg", response.getReturnValue());
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
    }
})