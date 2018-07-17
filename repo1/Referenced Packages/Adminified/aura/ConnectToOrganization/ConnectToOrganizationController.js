({
    /* globals $ */
    document: function(component, event, helper) {         
        helper.createOptionsDynamically(component, event, helper);
        $(document.getElementsByClassName('copy_btn')).prop('disabled', true);
         $(document.getElementsByClassName('login-url')).prop('disabled', true);
        helper.onChangeOrgType(component, event, helper);
        $(document.getElementsByClassName('login-url')).select();
        $(document.getElementById('loader')).hide();
        $(document.getElementsByClassName('hideOrg')).show();
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
        
        
        $("body").off('click','.btn-alertMsgDataerror');
        $("body").on('click','.btn-alertMsgDataerror',function(){
            $(document.getElementsByClassName('notification-div')).hide();
            $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html('');
        });
        
        $("body").off('click','.close-model-Org-icon');
        $("body").on('click','.close-model-Org-icon',function(){
            $(document.getElementsByClassName('hideOrg')).remove();
            $(document.getElementById('loader')).hide();
        });
        
    },
    closeModel : function(component, event, helper){
        $(document.getElementsByClassName('hideOrg')).remove();
        $(document.getElementById('loader')).hide();
    },
    
    onChange : function(component, event, helper){
       $(document.getElementsByClassName('copy_btn')).prop('disabled', true);
        $(document.getElementsByClassName('login-url')).prop('disabled', true);
        helper.onChangeOrgType(component, event, helper);   
    },
    
    copyUrl : function(component, event, helper){
        helper.copyUrl(component, event, helper);
    },
    
    saveOrgInfo : function (component, event, helper){ 
        var verificationCode = $.trim($(document.getElementsByClassName('varicls')).val()); 
        if(verificationCode ==='' || verificationCode === null){
            var htmlmsg = "Please enter verification code"; 
            $(document.getElementsByClassName('notification-div')).show();
            $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.btn-alertMsgDataerror')).show();
            $(document.getElementsByClassName('notification-div')[0].querySelectorAll('.showErrorConnectOrg')).html(htmlmsg);
            $(document.getElementsByClassName('auth-code')).val('');
        }else{       
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true,"tabName" : component.get("v.moduleName")}).fire();
            component.set("v.insType",$(document.getElementsByClassName('org_type_select')).val());
            $(document.getElementsByClassName('close-model-Org')).hide();
            helper.saveOrgDetails(component, event, helper); 
        }           
    }
    
})