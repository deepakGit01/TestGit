({ 
    documentReady:function(component, event, helper) {
        var action = component.get("c.getHostName");                      
        action.setCallback(this,function(response){          
            var state = response.getState();
            var responseObj = response.getReturnValue();
            if(state === 'SUCCESS'){ 
                 component.set('v.vfHost',responseObj);
                
            }
        });
        $A.enqueueAction(action);
    },
    
})