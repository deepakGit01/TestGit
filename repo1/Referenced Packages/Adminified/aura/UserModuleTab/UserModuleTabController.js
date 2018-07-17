({
	documentReady : function(component, event, helper) {
		component.getEvent("WhichTabEvent").setParams({"tabName":'userModule'}).fire();
	}
})