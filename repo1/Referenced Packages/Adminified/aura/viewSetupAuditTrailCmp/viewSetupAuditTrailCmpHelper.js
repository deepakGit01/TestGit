({
    /* globals $ */
    getAuditTrailData : function(component, event, helper) {        
        if(component.get('v.offset') <=2000){
            var action = component.get("c.getSetupAuditTrailDetails");
        action.setParams({
            "orgId": component.get('v.orgId'),
            "getAlldataFlg":component.get('v.getAlldataFlg'),
            "offset":''+component.get('v.offset'),
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS" && response.getReturnValue() != null) {   
                var filterActionList = [];
                var filterUserList = [];
                document.getElementsByClassName('viewSetupAuditTrailAllError')[0].style.display = 'none';
                document.getElementsByClassName('viewSetupAuditTrailError')[0].style.display = 'none';
                document.getElementsByClassName('noRecordsFound')[0].style.display = 'none';
                if(response.getReturnValue().oneMonthData.status !=='FAIL'){
                    if(component.get('v.getAlldataFlg')){
                        component.set('v.getAlldataFlg',false);
                        component.set('v.filterActionList',response.getReturnValue().action);
                        component.set('v.filterUserList',response.getReturnValue().userName);
                    }
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
                    if($.parseJSON(response.getReturnValue().oneMonthData.body).totalSize <= 0){
                       document.getElementsByClassName('noRecordsFound')[0].style.display = 'table-row';
                        document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
                    }else if($.parseJSON(response.getReturnValue().oneMonthData.body).totalSize >= 0 && $.parseJSON(response.getReturnValue().oneMonthData.body).totalSize <= 199){
                        document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
                    }else{
                        
                    }
                    component.set("v.allOrg",$.parseJSON(response.getReturnValue().oneMonthData.body).records);
                    document.getElementsByClassName('nextButton')[0].innerHTML = 'Previous';
                    document.getElementsByClassName('prevButton')[0].innerHTML = 'Next';
                    document.getElementsByClassName('nextButton')[0].setAttribute("disabled", "disabled");
                    
                    if(component.get('v.pageNo') >= 201){
                        document.getElementsByClassName('nextButton')[0].removeAttribute("disabled");
                    }else{
                        component.set('v.pageNo',$.parseJSON(response.getReturnValue().oneMonthData.body).totalSize);
                    }
                }else{
                    document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML = '';
                    document.getElementsByClassName('showViewSetupAuditTrailAllError')[0].innerHTML = '';
                    var error = '';
                    var somthingWentWrong = '';
                    var errorFlg = true;
                    var errorList = response.getReturnValue().oneMonthData.errors;
                    for(var i = 0;i<errorList.length;i++){
                        somthingWentWrong = errorList[i].message;
                        if(somthingWentWrong.indexOf('You have uncommitted work pending. Please commit or rollback before calling out') > -1){
                            errorFlg = false;
                            error = somthingWentWrong;
                        }else{
                            error = error +'</p>'+errorList[i].message+'</p>';
                        }
                    }
                    if(errorFlg){
                        document.getElementsByClassName('viewSetupAuditTrailAllError')[0].style.display = 'block';
                        document.getElementsByClassName('showViewSetupAuditTrailAllError')[0].innerHTML = error;
                    }else{
                        document.getElementsByClassName('viewSetupAuditTrailError')[0].style.display = 'block';
                        document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML = error+' '+document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML;
                    }
                    if(response.getReturnValue().oneMonthData.body !== null && response.getReturnValue().oneMonthData.body !== '' && response.getReturnValue().oneMonthData.body !== 'undefined'){
                        component.set("v.allOrg",$.parseJSON(response.getReturnValue().oneMonthData.body).records);
                    }else{
                        component.set("v.allOrg",{});
                        document.getElementsByClassName('noRecordsFound')[0].style.display = 'table-row';
                    }
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
                	
                }                
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
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            } 
            document.getElementsByClassName('loaderTr-viewSAT')[0].style.display = 'none';
            document.getElementsByClassName('topScroll')[0].scrollTop = 0;
            
        });         
        $A.enqueueAction(action);  
        }else{
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
            component.set("v.allOrg",{});
            document.getElementsByClassName('noRecordsFound')[0].style.display = 'table-row';
            document.getElementsByClassName('prevButton')[0].innerHTML = 'Next';
            document.getElementsByClassName('prevButton')[0].setAttribute("disabled","disabled");
		}
    },
    
    getFilterData:function(component, event, helper) {
        var  fromDateval = '';
        if(component.find('fromdate').get("v.value") !== '' && component.find('fromdate').get("v.value") !== null){
            var fromSpliDateval = component.find('fromdate').get("v.value").split('-');
            fromDateval = fromSpliDateval[1]+"/"+fromSpliDateval[2]+"/"+fromSpliDateval[0];
        }
       var fdate = new Date(fromDateval);
        var tdate ;
        var toDate = '';
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd;
        } 
        if(mm<10) {
            mm='0'+mm;
        } 
        if(component.find('todate').get("v.value") !== '' && component.find('todate').get("v.value") !== null){
             var toSpliDateval = component.find('todate').get("v.value").split('-');
             var  toDateval = toSpliDateval[1]+"/"+toSpliDateval[2]+"/"+toSpliDateval[0];
             toDate = toDateval;
             tdate = new Date(toDateval);
           }else{
            toDate = mm+'/'+dd+'/'+yyyy;
            component.set('v.toDate',yyyy+'-'+mm+'-'+dd);
    
            tdate = new Date(toDate);
        }
        var timeDiff = Math.abs(tdate.getTime() - fdate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var getPageNo = 0;
        if(moment(fromDateval, "MM/DD/YYYY", true).isValid() && moment(toDate, "MM/DD/YYYY", true).isValid() && component.get('v.firstSearch')){
            document.getElementsByClassName('nextButton')[0].setAttribute("disabled", false);
            document.getElementsByClassName('prevButton')[0].setAttribute("disabled", false);
            if(component.get('v.getWithSearch')){
                component.set('v.offset',0); 
                document.getElementsByClassName('search-btn')[0].innerHTML = '<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Searching...'; 
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'viewSetupAuditTrail'}).fire();
            }
            var action = component.get("c.getFilterSetupAuditTrailDetails");
            action.setParams({
                "orgId": component.get('v.orgId'),
                "userName": document.getElementById('text-input-01').value,
                "action": document.getElementById('text-input-02').value,
                "fromDate":fromDateval,
                "toDate":toDate,
                "offset":''+component.get('v.offset'),
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") { 
                    component.set('v.searchFlg',true);
                    document.getElementsByClassName('viewSetupAuditTrailAllError')[0].style.display = 'none';
                    document.getElementsByClassName('viewSetupAuditTrailError')[0].style.display = 'none';
                    
                    if(response.getReturnValue().status !=='FAIL'){
                        document.getElementsByClassName('noRecordsFound')[0].style.display = 'none';
                        component.set("v.allOrg",$.parseJSON(response.getReturnValue().body).records);
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
                        getPageNo = $.parseJSON(response.getReturnValue().body).totalSize;
                        document.getElementsByClassName('nextButton')[0].setAttribute("disabled", "disabled");
                        if($.parseJSON(response.getReturnValue().body).totalSize <= 0){
                            document.getElementsByClassName('noRecordsFound')[0].style.display = 'table-row';
                            document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
                        }else if($.parseJSON(response.getReturnValue().body).totalSize >= 0 && $.parseJSON(response.getReturnValue().body).totalSize <= 199){
                            document.getElementsByClassName('prevButton')[0].setAttribute("disabled", "disabled");
                        }else{}
                        if(component.get('v.pageNo') >= 201){
                            document.getElementsByClassName('nextButton')[0].removeAttribute("disabled");
                        }else{
                            component.set('v.pageNo',$.parseJSON(response.getReturnValue().body).totalSize);
                        }
                    }else{
                        document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML = '';
                        document.getElementsByClassName('showViewSetupAuditTrailAllError')[0].innerHTML = '';
                        var error = '';
                        var somthingWentWrong = '';
                        var errorFlg = true;
                        var errorList = response.getReturnValue().errors;
                        for(var i = 0;i<errorList.length;i++){
                            somthingWentWrong = errorList[i].message;
                            if(somthingWentWrong.indexOf('You have uncommitted work pending. Please commit or rollback before calling out') > -1){
                                errorFlg = false;
                                error = somthingWentWrong;
                            }else{
                                error = error +'</p>'+errorList[i].message+'</p>';
                            }
                        }
                        if(errorFlg){
                            document.getElementsByClassName('viewSetupAuditTrailAllError')[0].style.display = 'block';
                            document.getElementsByClassName('showViewSetupAuditTrailAllError')[0].innerHTML = error;
                        }else{
                            document.getElementsByClassName('viewSetupAuditTrailError')[0].style.display = 'block';
                            document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML = error+' '+document.getElementsByClassName('uncommittedWorkPending')[0].innerHTML;
                        }

                        if(response.getReturnValue().body !== null && response.getReturnValue().body !== '' && response.getReturnValue().body !== 'undefined'){
                            component.set("v.allOrg",$.parseJSON(response.getReturnValue().body).records);
                        }else{
                            component.set("v.allOrg",{});
                            document.getElementsByClassName('noRecordsFound')[0].style.display = 'table-row';
                        }
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
                	}
                }else if (state === "ERROR") {
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
                	var errors = response.getError();
                    if(errors){
                        if (errors[0] && errors[0].message){
                            component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                        }
                    }else{
                        component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                    }
                }else if (state === "ABORTED") {
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'viewSetupAuditTrail'}).fire();
					component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                } 
                document.getElementsByClassName('search-btn')[0].innerHTML = 'Search';
                document.getElementsByClassName('nextButton')[0].innerHTML = 'Previous';
                document.getElementsByClassName('prevButton')[0].innerHTML = 'Next';
                document.getElementsByClassName('topScroll')[0].scrollTop = 0;
            
            });    
            $A.enqueueAction(action); 
        }else{
            document.getElementsByClassName('loaderTr-viewSAT')[0].style.display = 'none';
            document.getElementsByClassName('alert-search')[0].style.display = '';
            document.getElementsByClassName('topScroll')[0].scrollTop = 0;
            setTimeout(function(){
                document.getElementsByClassName('alert-search')[0] .style.display = 'none';
            }, 5000);
            document.getElementsByClassName('search-btn')[0].innerHTML = 'Search';
            document.getElementsByClassName('nextButton')[0].innerHTML = 'Previous';
            document.getElementsByClassName('prevButton')[0].innerHTML = 'Next';            
        }
    },
})