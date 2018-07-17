({
    /* globals $ */
    clone : function(component, event, helper) {
        $(document.getElementsByClassName('clone-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Cloning...');
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementsByClassName('alert-clone')).hide();
        $(document.getElementsByClassName('confirm-box-clone')).hide();
        $(document.getElementsByClassName('hide-div')).show();
        if($(document.getElementsByClassName('clone-sndsvr')).lenght === 0) return false;
        var dataToBeSend = {};
        var objVal = '';
        var objId = '';
        $.each($(document.getElementsByClassName('clone-sndsvr')), function(index, elementObj){ 
            objVal = $.trim($(elementObj).val());
            objId = $.trim($(elementObj).attr('id'));
            dataToBeSend[objId] = objVal;
        });
        var data = JSON.stringify(dataToBeSend);
        var orgId = component.get("v.cloneOrgId");
        var userId = component.get("v.cloneUserId");
        var uniqueNumber = component.get("v.randomNumber");
        var action = component.get("c.cloneUser");
        action.setParams({
            "userDetail": dataToBeSend,
            "orgId" : orgId,
            "userId" : userId
        });
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                $(document.getElementsByClassName('clone_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                if(typeof response.getReturnValue().status !== 'undefined'){
                    if(response.getReturnValue().status === 'SUCCESS'){
                        var bdy = JSON.parse(response.getReturnValue().body);
                        var resUserId = bdy.id;
                        var username = $(document.getElementById('FirstName')).val()+' '+$(document.getElementById('LastName')).val();
                        component.getEvent("AfterCloneUserEvent").setParams({
                            "cloneOrgId" : orgId,
                            "newUserId": resUserId,
                            "randomNumber" : uniqueNumber,
                            "newUserName" : username,
                            "flag": true,
                            "index" : component.get("v.index")
                        }).fire();
                        $(document.getElementsByClassName('clone-response')).text(username+' cloned successfully.');
                        $(document.getElementsByClassName('clone-success-box')).show();
                        $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                        
                        
                    }else if(response.getReturnValue().status === 'FAIL'){
                        $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                        var error = '';
                        if(response.getReturnValue().errors.message !== undefined){
                            error = error + '<p>'+response.getReturnValue().errors.message+'</p>';    
                        }else if(response.getReturnValue().errors[0].message !== undefined){
                            error = error + '<p>'+response.getReturnValue().errors[0].message+'</p>';    
                        }else{}
                        $(document.getElementsByClassName('alert-clone')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('clone-response')).html(error);
                        $(document.getElementsByClassName('alert-clone')).show();
                        $(document.getElementsByClassName('hide-div')).hide();
                    }
                }else{
                    $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                    $(document.getElementsByClassName('clone-response')).html('Something went wrong.');
                    $(document.getElementsByClassName('alert-clone')).show();
                    $(document.getElementsByClassName('hide-div')).hide();
                }
                $(document.getElementsByClassName('clone-btn')).html('Save');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }else if (state === "ERROR") {
                $(document.getElementsByClassName('clone_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        $(document.getElementsByClassName('alert-clone')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('clone-response')).html(errors[0].message);
                        $(document.getElementsByClassName('alert-clone')).show();
                    }
                }else{
                    $(document.getElementsByClassName('alert-clone')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('clone-response')).html('Unknow Error');
                    $(document.getElementsByClassName('alert-clone')).show();
                }
                $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                $(document.getElementsByClassName('clone-btn')).html('Save');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }else if (state === "ABORTED") {
                $(document.getElementsByClassName('clone_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                $(document.getElementsByClassName('alert-clone')).addClass('slds-theme--error');
                $(document.getElementsByClassName('clone-response')).html('Process Aborted...!');
                $(document.getElementsByClassName('alert-clone')).show();
                $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                $(document.getElementsByClassName('clone-btn')).html('Save');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    closeModal : function(component, event, helper) {
        $(document.getElementsByClassName('clone-user-layer-'+component.get("v.randomNumber"))).remove();
        $(document.getElementsByClassName('clone_section')).remove();
        $(document.getElementsByClassName('alert-clone')).remove();
        $(document.getElementsByClassName('clone-sndsvr')).remove();      
        $(document.getElementsByClassName('clone-response')).remove();
        $(document.getElementsByClassName('clone-success-box')).remove();
        $(document.getElementsByClassName('alert-clone')).remove();
        $(document.getElementsByClassName('clone-user-'+component.get("v.randomNumber"))).remove();
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
    },	
})