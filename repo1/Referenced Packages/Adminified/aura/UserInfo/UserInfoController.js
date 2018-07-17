({    
    /* globals $ */
    // On load script loaded
    documentReady : function(component,event,helper){      
        $(document.getElementsByClassName('userBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementsByClassName('userBorderBottom')).eq($(document.getElementsByClassName('userBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        component.getEvent("GetGlobalOrg").fire();
        if(component.get("v.globalOrg") == null){
            setTimeout(function() {
                helper.getConnectedOrg(component, event, helper);
            }, 1000);
        }else{
            helper.getConnectedOrg(component, event, helper);
        }
        
       $('body').off('click', '.a-permissionsets');
        $('body').on('click', '.a-permissionsets', function(e){            
            $(document.getElementsByClassName('userModule')).removeClass('slds-active');
            $(document.getElementById('userModule')).removeClass('slds-show');
            $(document.getElementsByClassName('permissionModule')).addClass('slds-active');
            $(document.getElementById('permissionModule')).addClass('slds-show');
        });
        
        $('body').off('click','.login-histroy-info'+component.get("v.randomNumber")+'');
        $('body').on('click','.login-histroy-info'+component.get("v.randomNumber")+'',function(){
            var select = document.getElementsByClassName('select-org'+component.get("v.randomNumber"))[0];
            var orgName = select.options[select.selectedIndex].innerHTML;
            var id = $(this).attr('id');
            component.getEvent("getLoginHistroyEvent").setParams({"orgId":id.split(',')[0],"userId":id.split(',')[1],"userName":id.split(',')[2],"apiUserName":id.split(',')[3],"orgName":orgName}).fire(); 
        });
    },
    
    // Edit user info 
    editUserData : function(component, event, helper){
        helper.editUserData(component, event, helper);
    },
    
    // Clone user
    cloneUserData : function(component, event, helper){
        helper.cloneUserData(component, event, helper);
    },
    
    getOrgUsersData : function(component, event, helper) {
        if(component.get("v.index") === event.getParam('index')){ 
            component.set("v.strOrgId", event.getParam("OrgId"));
            helper.getOrgUsers(component, event, helper);            
        }
    },
    
    getUserDetail : function(component, event, helper) { 
        if(component.get("v.index") === event.getParam('index')){
            $.each(component.get('v.manageUserNameObj'), function(idx,obj){
                if(obj.id === event.getParam('userId')){
                    obj.label = event.getParam("userName");
                    obj.value = event.getParam("userName");
                }
            });
             $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                source :  component.get('v.manageUserNameObj'),
                minLength: 3,
                select: function( e, ui ) {
                    var instanceData = ui.item.orgId+'_'+ui.item.id;
                    var indexNo = $(this).attr('class').split(' ');
                    //new work
                    component.set("v.UserNameForLH",ui.item.label);
                    component.getEvent("UpdateInstaceDataList").setParams({
                        "randomNo" : component.get("v.randomNumber"),
                        "userId" : ui.item.id,
                        "index" : component.get("v.index"),
                        "orgId": ui.item.orgId,
                        "instanceData" : instanceData,
                        "userName" : ui.item.label
                    }).fire();
                }
            });
            $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val(event.getParam("userName")); // display the selected text
            if(!$(document.getElementById("comp"+component.get("v.randomNumber"))).hasClass('adminifiedUserInfo1')){ 
                component.set("v.strUserName", event.getParam("userName"));
                component.set("v.instanceData", event.getParam("orgId")+'_'+event.getParam('userId'));
                $(document.getElementById("comp"+component.get("v.randomNumber"))).addClass('adminifiedUserInfo1');
            }    
            var orgId = event.getParam("orgId");
            var userId = event.getParam('userId');
            var randomNo = event.getParam("redNumber");
            helper.getUserInfo(component, event, helper, orgId, userId, randomNo);
        }
    },
    
    deleteUserCmp : function(component, event, helper) { 
        $(document.getElementsByClassName('userBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementsByClassName('userBorderBottom')).eq( $(document.getElementsByClassName('userBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        $(document.getElementById('comp'+component.get("v.randomNumber"))).animate({"opacity": "0.5"}, 1000);
        component.set("v.permissionSetList", []);
        component.getEvent("getPermissionSetList").setParams({}).fire();
        component.getEvent("ResetInstanceDataList").setParams({"instanceData":component.get("v.instanceData")}).fire();
          
        setTimeout(function() {
            $(document.getElementById('comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 200);
            component.getEvent("deleteUserCmpEvent").setParams({
                "index" : component.get("v.index")
            }).fire();
            
            if($(document.getElementById('userModule').querySelectorAll(".spanLegend")).length === 2 && $(document.getElementById('userModule').querySelectorAll('.spanLegend')).eq(1).text() === 'Triangle'){
                $.each($(document.getElementById('userModule').querySelectorAll(".icon_Triangle")), function(ind, objObj){
                    var iconHTtml = $(this).html();
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    $(this).html(iconHTtml);
                });
             $(document.getElementById('userModule').querySelectorAll('.spanLegend')).eq(1).text('Square');
             }
        }, 700);
    },
    
    inputKeyup : function(component, event, helper) { 
        var code = event.keyCode || event.which;
        var inp = String.fromCharCode(event.keyCode);
        var regExp = /[a-zA-Z0-9-_ ]/;
        if((code === 46 || code === 8 || regExp.test(inp)) && !event.ctrlKey && !(code === 17)){ 
            helper.inputKeyup(component, event, helper);
        }else if(code === 86 && event.ctrlKey){
            helper.inputKeyup(component, event, helper);
        }
    },
    
    addOrganization : function(component, event, helper) { 
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $A.createComponent("stivadmn:ConnectToOrganization", {
            "aura:id": "ConnectToOrganization",
            "randomNumber" : component.get("v.randomNumber"),
            "index" : component.get("v.index"),
            "moduleName" : "userModule"
        }, function(newModel){
            if (component.isValid()) {
                var body = component.find("orgnizationDiv");
                body.set("v.body", newModel);
            }
        });       
    },
    
    getRefreshOrg  : function(component, event, helper) { 
        helper.getConnectedOrg(component, event, helper);
    },
    
    setGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
    },
    
    updatedGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
        helper.getConnectedOrg(component, event, helper);
    },
    
    getPermissionSetList : function(component, event, helper) { 
        var randomNo = component.get("v.randomNumber");
        var permissionSetList = component.get("v.permissionSetList");
        var index = component.get("v.index");
        component.getEvent("setPermissionSetList").setParams({"permissionSetList" : permissionSetList, "index" : index}).fire();
    },
    
    putCloneUser : function(component, event, helper) {
        if(event.getParam("index") !== component.get("v.index") && event.getParam("orgId") === component.get("v.strOrgId")){
            $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete().data( "ui-autocomplete" ).options.source.push({'label':event.getParam("newUserName"),'id':event.getParam("newUserId"),'value':event.getParam("newUserName"),'orgId':event.getParam("orgId")});
        } 
    },
    
    getPermissionSetListOfData : function(component, event, helper) { 
        var randomNo = component.get("v.randomNumber");
        var permissionSetList = component.get("v.permissionSetList");
        var index = component.get("v.index");
        component.getEvent("setPermissionSetList").setParams({"permissionSetList" : permissionSetList, "index" : index}).fire();
    },
    
    resetPassword : function(component, event, helper) { 
        $(document.getElementsByClassName('reset-user-name')).html(component.get("v.strUserName"));
        $(document.getElementsByClassName('reset-password-confirm')).show();
        var orgId = component.get("v.orgIdForRP");
        var userId = component.get("v.userIdForRP");
        var randomNo = component.get("v.randomNumber");
        component.getEvent("resetPasswordEvent").setParams({"orgId" : orgId, "userId" : userId, 'randomNo' : randomNo}).fire();
    },  
})