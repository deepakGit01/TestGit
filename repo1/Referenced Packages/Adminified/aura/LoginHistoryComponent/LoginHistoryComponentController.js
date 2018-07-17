({
	/* globals $ */
	documentReady : function(component, event, helper) {
        helper.getLoginHistoryData(component, event, helper);
    },
    showLoginHistoryData: function(component, event, helper){
        component.set("v.orgId",event.getParam("orgId"));
        component.set("v.userId",event.getParam("userId"));
        component.set("v.userName",event.getParam("userName"));
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .showloginHistoryError')[0]).html('');
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .loginHistoryError')[0]).hide();
        helper.getLoginHistoryData(component, event, helper);
    },
    close : function(component, event, helper){
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .loginHistoryError')[0]).hide();
          
    },
    
    closeError : function(component, event, helper){
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .loginHistoryErrorForTimeout')[0]).hide();
    },
    showAgainLoginHstryData : function(component, event, helper){
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory')).hide(); 
        $('#userModule .LoginHistorySectionLoader').show();
        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .loginHistoryErrorForTimeout')[0]).hide();
        helper.getLoginHistoryData(component, event, helper);
    },
})