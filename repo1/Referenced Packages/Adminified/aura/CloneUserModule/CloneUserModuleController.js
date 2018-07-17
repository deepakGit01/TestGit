({
	/* globals $ */
    documentReady : function(component, event, helper) {
        if(component.isValid()){
            $(document.getElementsByClassName('clone_section')).show();
            $(document.getElementsByClassName('clone-user-cls'+component.get("v.randomNumber"))).html('Clone');
            $(document.getElementsByClassName('clone-user-layer-'+component.get("v.randomNumber"))).show();
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
        }
    },
    
    cloneInit : function(component, event, helper) {
        if(component.isValid()){
            component.set("v.cloneUserId",component.get("v.userData").userId);
            component.set("v.cloneOrgId",component.get("v.userData").OrgId);
            component.set("v.strUserName",component.get("v.userData").UserName);
            component.set("v.strProfileName",component.get("v.userData").ProfileName);
            component.set("v.index",component.get("v.index"));
        }
    },
    
    confirm : function(component, event, helper) { 
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
        var email =  $(document.getElementById('Email')).val(); 
        var userName = $(document.getElementById('Username')).val();  
        var fname = $(document.getElementById('FirstName')).val();
        var lname = $(document.getElementById('LastName')).val();
        var aliasName = $(document.getElementById('Alias')).val();
        var comunityName = $(document.getElementById('CommunityNickname')).val();
        var isError = false;  
        var regExp = /^[a-zA-Z0-9- ]*$/;
        if(fname === '' || lname === '' || aliasName === '' || comunityName === ''){
            isError = true;
            $(document.getElementsByClassName('clone-response')).html('Please fill all fields.'); 
        }else if(regExp.test(fname) === false || regExp.test(lname) === false){
            isError = true;
            $(document.getElementsByClassName('clone-response')).html('Special charcter not allowed in name.'); 
        }else if( emailReg.test(userName) === false || userName === ''){
            isError = true;
            $(document.getElementsByClassName('clone-response')).html('Username is not valid.'); 
        }else  if(emailReg.test(email) === false || email === ''){
            isError = true;
            $(document.getElementsByClassName('clone-response')).html('Email address is not valid.');  
        }
        if(isError){
            $(document.getElementsByClassName('alert-clone')).addClass('slds-theme--error');          
            $(document.getElementsByClassName('alert-clone')).show();
        }else{
            $(document.getElementsByClassName('confirm-box-clone')).show(); 
        }
        
    },
    
    clone :function(component, event, helper) {
        helper.clone(component, event, helper);
    },
    
    cancel : function(component, event, helper) {       
        $(document.getElementsByClassName('confirm-box-clone')).hide();
    },
    
    close : function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },
    
    okClone : function(component, event, helper) {
        helper.closeModal(component, event, helper);
    }  
    
})