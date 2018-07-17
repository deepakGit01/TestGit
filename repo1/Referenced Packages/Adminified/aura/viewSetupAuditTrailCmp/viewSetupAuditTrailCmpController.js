({/* globals $ */
    
     doInit : function(component, event, helper) {
        var today = new Date();
     },
    
    documentReady : function(component, event, helper) {
        document.getElementsByClassName('loaderForViewSAT')[0].style.display = 'none';        
        document.getElementsByClassName('loaderTr-viewSAT')[0].style.display = '';
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'viewSetupAuditTrail'}).fire();
        helper.getAuditTrailData(component, event, helper); 
    },
    
    openUser: function(component, event, helper) {
        var selId = event.target.closest('button').getAttribute('id');
        var d = document.getElementsByClassName(selId)[0];
        if(d.className.indexOf('slds-is-open') < 0){
            d.className += " slds-is-open";
        }else{
            d.classList.remove("slds-is-open");
        }
    },
    getFilterData:function(component, event, helper) {
        component.set('v.firstSearch',true);
        component.set('v.getWithSearch',true);
        helper.getFilterData(component, event, helper);
    },
    
    
    actionClick : function(component, event, helper) {
        var ulId =  event.target.closest('ul').getAttribute('id');
        var allAction = document.getElementById(ulId).querySelectorAll('li');
        var singleAction;
        if(event.target.closest('li').classList.contains('slds-is-selected')){
            event.target.closest('li').classList.remove('slds-is-selected');
            if(ulId === 'option-list-01'){
                document.getElementById('text-input-01').value = '';
            }else{
                document.getElementById('text-input-02').value = '';
            }
        }else{
            for(var j=0;j<allAction.length;j++){
                singleAction = allAction[j];
                singleAction.classList.remove('slds-is-selected');
            }
            event.target.closest('li').classList += ' slds-is-selected';
            var action = '';
            if(event.target.nodeName ==='svg'){
                action = event.target.closest('li').querySelectorAll('.userAction')[0].innerHTML;
            }else if(event.target.classList.contains('parent-spans')){
                action = event.target.closest('li').querySelectorAll('.userAction')[0].innerHTML;
            }else if(event.target.classList.contains('slds-icon__container')){
                action = event.target.closest('li').querySelectorAll('.userAction')[0].innerHTML;
            }else if(event.target.nodeName ==='use'){
                action = event.target.closest('li').querySelectorAll('.userAction')[0].innerHTML;
            }else{
                action =  event.target.innerHTML;
            }
            if(ulId === 'option-list-01'){
                document.getElementById('text-input-01').value = action;
            }else{
                document.getElementById('text-input-02').value = action;
            }
            
        }
        
        for (var i = 0; i < allAction.length; i++) {
            allAction[i].style.display = '';
            
        }
        
        document.getElementsByClassName('userFilterDiv')[0].classList.remove("slds-is-open");
        document.getElementsByClassName('actionFilterDiv')[0].classList.remove("slds-is-open");
        component.set('v.offset',0);
        component.set('v.firstSearch',false);  
        document.getElementsByClassName('nextButton')[0].setAttribute("disabled", "disabled");
        document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
        component.set('v.pageNo',0);
        
    },
    
    closeUserPickList:function(component, event, helper) {
        document.getElementsByClassName('userFilterDiv')[0].classList.remove("slds-is-open")
    },
    
    setPagination: function(component,event,helper){
        var offsetCount = 0;
        component.set('v.getWithSearch',false);
        if(event.getParam('pagingAction') === 'next' && component.get('v.offset') >= 200){
            offsetCount = component.get('v.offset')-200;
            component.set('v.pageNo',component.get('v.pageNo')-200);
            component.set('v.offset',offsetCount);
        }
        if(event.getParam('pagingAction') === 'prev' &&  component.get("v.allOrg").length > 0){
            offsetCount = component.get('v.offset')+200;
            component.set('v.pageNo',component.get('v.pageNo')+200);
            component.set('v.offset',offsetCount);
        }
        if(component.get('v.searchFlg')){
            helper.getFilterData(component, event, helper);
        }else{
            helper.getAuditTrailData(component, event, helper);
        }
        
    },
    showAgainViewSetupAuditTrailData: function(component,event,helper){
        document.getElementsByClassName('loaderTr-viewSAT')[0].style.display = '';
        document.getElementsByClassName('viewSetupAuditTrailError')[0].style.display = 'none';
        document.getElementsByClassName('noRecordsFound')[0].style.display = 'none';
        helper.getAuditTrailData(component, event, helper);
    },
    close: function(component,event,helper){
        document.getElementsByClassName('viewSetupAuditTrailAllError')[0].style.display = 'none';
    },
    changeUser: function(component,event,helper){
        component.set('v.firstSearch',false);  
        var allAction = document.getElementById('option-list-01').querySelectorAll('li');
        var singleAction;
        for(var j=0;j<allAction.length;j++){
            singleAction = allAction[j];
            singleAction.classList.remove('slds-is-selected');
        }
        document.getElementsByClassName('nextButton')[0].setAttribute("disabled", "disabled");
        document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
    },
    changeAction:function(component,event,helper){
        component.set('v.firstSearch',false);  
        var allAction = document.getElementById('option-list-02').querySelectorAll('li');
        var singleAction;
        for(var j=0;j<allAction.length;j++){
            singleAction = allAction[j];
            singleAction.classList.remove('slds-is-selected');
        }
        document.getElementsByClassName('nextButton')[0].setAttribute("disabled", "disabled");
        document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
    },
    searchAction :function(component,event,helper){
        var listofCmp = component.get("v.filterActionList");
        var searchVal = document.getElementById('text-input-02').value.toUpperCase();
        if(searchVal.length >-1){
            document.getElementsByClassName('actionFilterDiv')[0].classList.add("slds-is-open");
            var lis = document.getElementById('option-list-02').querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                var name = lis[i].querySelectorAll('.action')[0].innerHTML;
               if (name.toUpperCase().indexOf(searchVal) > -1)  
                    lis[i].style.display = '';
                else
                    lis[i].style.display = 'none';
            }
        }else{
            var lis = document.getElementById('option-list-02').querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.display = '';
            }
            document.getElementsByClassName('actionFilterDiv')[0].classList.remove("slds-is-open");
        }
    },
    searchUser :function(component,event,helper){
        var listofCmp = component.get("v.filterUserList");
        var searchVal = document.getElementById('text-input-01').value.toUpperCase();
        if(searchVal.length >= 3){
            document.getElementsByClassName('userFilterDiv')[0].classList.add("slds-is-open");
            var filter = document.getElementById('text-input-01').value;
            var lis = document.getElementById('option-list-01').querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                var name = lis[i].querySelectorAll('.username')[0].innerHTML;
                if (name.toUpperCase().indexOf(searchVal) > -1) 
                    lis[i].style.display = '';
                else
                    lis[i].style.display = 'none';
            }
        }else{
            var lis = document.getElementById('option-list-01').querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.display = '';
            }
            document.getElementsByClassName('userFilterDiv')[0].classList.remove("slds-is-open");
        }
    },
})