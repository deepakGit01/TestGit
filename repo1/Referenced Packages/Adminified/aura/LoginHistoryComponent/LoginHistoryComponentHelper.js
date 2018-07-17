({
    /* globals $ */
    getLoginHistoryData : function(component, event, helper) {
      
        function getDateCoversion(myDate){
            var result;
            if($.type(myDate) === 'string' && myDate !== '' && myDate !== null){
               	var a = $.trim(myDate).split(/[^0-9]/);
                var y = a[0];
                var m = a[1]-1;
                var d = a[2];
                var h = a[3];
                var mi = a[4];
                var s = a[5];
                return new Date(y,m,d,h,mi,s).toString().split('+')[0];
            }else{
                result = '&nbsp;';  
            }
            return result;
        }
        document.getElementById('userModule').querySelectorAll('.LoginHistoryComponentBody tbody')[0].innerHTML = '';
        var action = component.get("c.getLoginHistory");
        action.setParams({
            "orgId":component.get("v.orgId"),
            "userId" : component.get("v.userId"),
        });
        action.setCallback(this, function(response){ 
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.loginHistoryInfo",response.getReturnValue());
               $(document.getElementsByClassName('LoginHistorySectionLoader')).hide();
                $(document.getElementsByClassName('LoginHistoryComponentBody')).show();
                var noRecord = true;
                var noRecordTr = '<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No login history available.</b></div></td></tr>';
                $.each(component.get("v.loginHistoryInfo"),function(key,val){
                    if(val.status !== "FAIL"){
                        var JSONval = JSON.parse(val.body);
                        if(JSONval.records.length > 0){
                            noRecord = false;
                            var temp = '';
                            $.each(JSONval.records,function(k,v){
                              	var lgtime = '';
                                var sip = '';
                                var sts = '';
                                var app = '';
                                var bro = '';
                                var ctryiso = '';
                                var lgUrl = '';
                                var lgtyp = '';
                                
                                if(v.LoginTime === null || v.LoginTime === ''){
                                    lgtime = '-';
                                }else{
                                    lgtime = getDateCoversion(v.LoginTime);
                                }
                                
                                if(v.SourceIp === null || v.SourceIp === ''){
                                    sip = '-';
                                }else{
                                    sip = v.SourceIp;
                                }
                                if(v.LoginType === null || v.LoginType === ''){
                                    lgtyp = '-';
                                }else{
                                    lgtyp = v.LoginType;
                                }
                                if(v.Status === null || v.Status === ''){
                                    sts = '-';
                                }else{
                                    sts = v.Status;
                                }
                                if(v.Application === null || v.Application === ''){
                                    app = '-';
                                }else{
                                    app = v.Application;
                                }
                                if(v.Browser === null || v.Browser === ''){
                                    bro = '-';
                                }else{
                                    bro = v.Browser;
                                }
                                if(v.CountryIso === null || v.CountryIso === ''){
                                    ctryiso = '-';
                                }else{
                                    ctryiso = v.CountryIso;
                                }
                                if(v.LoginUrl === null || v.LoginUrl === ''){
                                    lgUrl = '-';
                                }else{
                                    lgUrl = v.LoginUrl;
                                }
                                temp = temp +'<tr class="datarow"><td>'+lgtime+'</td><td>'+sip+'</td><td>'+lgtyp+'</td><td>'+sts+'</td><td>'+app+'</td><td>'+bro+'</td><td>'+ctryiso+'</td><td>'+lgUrl+'</td></tr>';
                            });
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory')).show(); 
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory tbody')).append(temp); 
                            }
                    }else{
                        $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .showloginHistoryError')[0]).html('');
                        var error = '';
                        var ReadtimedOut = '';
                        var errorFlg = true;
                        $.each(val.errors,function(errorKey,errorVal){
                            ReadtimedOut = errorVal.message;
                            if(ReadtimedOut === 'Read timed out' ){
                                errorFlg = false;
                            }
                            error = error +'<p>'+errorVal.message+'</p>';
                        });
                        if(errorFlg){
                            noRecord = True;
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory')).show();
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .showloginHistoryError')[0]).append(error);
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .loginHistoryError')[0]).show();
                        }else{
                            $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory')).hide();
                            $(document.getElementById('userModule').querySelectorAll('.loginHistoryErrorForTimeout')[0]).show();
                            noRecord = false;
                        }
                    }
                });
                if(noRecord){
                    $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory')).show(); 
                    $(document.getElementById('userModule').querySelectorAll('#LoginHistoryComponent .LoginHistoryComponentBody #table-loginHistory tbody')).append(noRecordTr);
                
                }
                $(document.getElementById('userModule').querySelectorAll('.LoginHistorySection .close-login-history-btn')[0]).attr('disabled',false);
            }
        });
       
        $A.enqueueAction(action);
    },
    
})