({
    /* globals $ */
    createOptionsDynamically : function(component, event, helper){          
        var opts = []; 
        var obj = {};           
        var orgTypes = {"Developer Edition":"Developer Edition","Sandbox": "Sandbox","Production" : "Production"};
        $.each(orgTypes,function(index,val){
            obj = {label : index,value : val};
            opts.push(obj);
        }); 
        component.find("org_type_select").set("v.options", opts);
        $(document.getElementsByClassName('loader-div')).hide();
    },
    
    getOrgData : function(component, event, helper, userName){ 
        var action = component.get("c.getConnectedOrg");      
        
        action.setCallback(this,function(response){          
            var state = response.getState(); 
            if(state === 'SUCCESS'){               
                var appevent = $A.get("e.stivadmn:OrgCmpEvent1");
                appevent.setParams({                            
                    "orgData" : response.getReturnValue(),
                    "userName" : userName
                });
                appevent.fire();  
            }
        });
        $A.enqueueAction(action);
        
    },
    
    onChangeOrgType : function(component, event, helper){
        var selected = component.find("org_type_select").get("v.value");   
        var action = component.get("c.getAuthUrl");
        action.setParams({"orgType" :  selected });
        action.setCallback(this,function(response){  
            //$(document.getElementsByClassName('copy_btn')).prop('disabled', false);
            $(document.getElementsByClassName('login-url')).prop('disabled', false);
            //showErrorConnectOrg
            if(JSON.stringify(response.getReturnValue()).indexOf('null') >= 0){
                 $(document.getElementsByClassName('copy_btn')).prop('disabled', true);
                $(document.getElementsByClassName('notification-div')).show();
                $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).hide();
               
                $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html('');
                $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html('Consumer Key is not set. Please create connected app to generate Consumer Key from Setting tab.');
                        
            }else{
                $(document.getElementsByClassName('copy_btn')).prop('disabled', false);
                $(document.getElementsByClassName('login-url')).val(response.getReturnValue());
            }
            
        });
        $A.enqueueAction(action);
    },
    
    copyUrl : function(component, event, helper){
        event.preventDefault();
        var $temp = $("<input>");
        $(document.getElementsByTagName('body')).append($temp);
        $temp.val( $(document.getElementsByClassName('loginurl-txt')).val()).select();
        document.execCommand("copy");
        $temp.remove();
    },
    
    saveOrgDetails : function(component, event, helper){
        $(document.getElementsByClassName('auth-button')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Authorizing...');
        var action = component.get("c.saveOrgDetails");
        var code = $.trim( $(document.getElementsByClassName('auth-code')).val());  
        $(document.getElementsByClassName('notification-div')).hide();
        action.setParams({
            "orgType" :  component.find("org_type_select").get("v.value"),
            "code" : code
        });
        action.setCallback(this,function(response){             
            var state = response.getState();
            if(state === 'SUCCESS'){
                var responseObj = response.getReturnValue();
                if(responseObj.status  === 'SUCCESS'){  
                    $(document.getElementsByClassName('auth-code')).val('');
                    var parseBody = JSON.parse(responseObj.body);
                    helper.getOrgData(component, event, helper, parseBody.userName);
                    $(document.getElementsByClassName('auth-button')).html('Authorize');
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false,"tabName" : component.get("v.moduleName")}).fire();
                    if(parseBody.orgId !== '' ){
                         $(document.getElementsByClassName('hideOrg')).remove();
                    }
                    component.getEvent("OrgCmpEvent").setParams({
                        "orgId" : parseBody.orgId,
                        "userName" : parseBody.userName,
                        "randomNumber" : component.get("v.randomNumber"),
                        "index" : component.get("v.index"),
                        "orgType" : component.get("v.insType"),                                                     
                        "instanceType" :parseBody.instanceType, 
                        "id" : parseBody.id, 
                        "moduleName" : component.get("v.moduleName")
                    }).fire();
                    
                }else if(responseObj.status === 'FAIL'){ 
                    $(document.getElementsByClassName('auth-code')).val('');
                    var responseOrgDetail = responseObj.errors;
                    if(responseObj.refCode === 'UNAUTHORIZED_ENDPOINT'){
                        component.getEvent("handleError").setParams({"responseObj":responseObj}).fire();
                    }else{                        
                         $(document.getElementsByClassName('notification-div')).show();
                         $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).show();
                         $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html(responseOrgDetail[0].message);
                         $(document.getElementsByClassName('auth-code')).val('');
                    }
                   $(document.getElementsByClassName('auth-button')).html('Authorize');
                   component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false,"tabName" : component.get("v.moduleName")}).fire(); 
                }
                $(document.getElementsByClassName('close-model-Org')).show();
            }else if(state === 'ERROR'){
                $(document.getElementsByClassName('auth-button')).html('Authorize');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false,"tabName" : component.get("v.moduleName")}).fire();
                var errors = response.getError();
                if (errors) {
                     if(errors[0] && errors[0].message){
                        $(document.getElementsByClassName('notification-div')).show();
                         $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).show();
                        $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html(errors[0].message);
                        $(document.getElementsByClassName('auth-code')).val('');
                    }else{
                        $(document.getElementsByClassName('notification-div')).show();
                        $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).show();
                        $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html('UnExpected Error..');
                        $(document.getElementsByClassName('auth-code')).val('');
                    }
                }
           		$(document.getElementsByClassName('close-model-Org')).show();
            }else if (state === "ABORTED") {
                $(document.getElementsByClassName('auth-button')).html('Authorize');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false,"tabName" : component.get("v.moduleName")}).fire();
               $(document.getElementsByClassName('notification-div')).show();
 		$(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).show();
                $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html('Process Aborted...');
                $(document.getElementsByClassName('auth-code')).val('');
                $(document.getElementsByClassName('close-model-Org')).show();
            }
        });
        $A.enqueueAction(action);
    }
})