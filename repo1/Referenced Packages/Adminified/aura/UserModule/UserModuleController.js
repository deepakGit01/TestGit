({
    /* globals $ */
    documentReady : function(component,event,helper){
        $('#userModule').find('.LoginHistorySection .LoginHistoryIcon').html('<span class="slds-icon__container slds-icon-standard-relationship"><svg fill="#ffffff" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg></span>');
        helper.getUserTemplate(component, event, helper);
        $(document.getElementById('user_search')).off('keypress');
        $(document.getElementById('user_search')).on('keypress', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }
        });
        
        $("body").off('click','.close-model-User-icon');
        $("body").on('click','.close-model-User-icon',function(){
            $(document.getElementsByClassName("model-append-remove")).hide();
        });
    },
    
    // add user module component
    addComponent : function(component,event,helper){
        $(document.getElementById('userModule').querySelectorAll('.userscroll')).scrollTop(0);
        
        if($(document.getElementById('userModule')).length){
            $(document.getElementById('userModule').querySelectorAll('.userscroll')).offset().top;
        }
        var isDel = true;
        helper.dynamicAddCmp(component, event, helper, isDel);
        
    },
    
    //delete user component
    deleteUserCmp : function(component, event, helper){
        if($(document.getElementsByClassName('userColSize')).length > 1){  
            var userBody = component.get("v.userBody");
            userBody.splice(event.getParam("index"), 1);
            component.set("v.userBody", userBody);
            var refCmpBody = component.get("v.userBody");
            for(var i =0 ; i < refCmpBody.length ; i++){                                   
                refCmpBody[i].set("v.index", i); 
            }
            component.set("v.userBody", refCmpBody);
            
            var userBody1 = component.get("v.userBody1");
            userBody1.splice(event.getParam("index"), 1);
            component.set("v.userBody1", userBody1);
            var refCmpBody1 = component.get("v.userBody1");
            for(var n =0 ; n < refCmpBody1.length ; n++){                                   
                refCmpBody1[n].set("v.index", n); 
            }
            component.set("v.userBody1", refCmpBody1);
            
            //Maintaining size of columns when removing columns 
            setTimeout(function() {
                component.getEvent("AdjustInfoBlock").setParams({
                    "colSizeName": "userColSize",
                    "buttonName": "addMoreUserBtn",
                    "moduleName": "userModule",
                    "eventName": "delete"
                }).fire();
                
                $(document.getElementsByClassName('userBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
                $(document.getElementsByClassName('userBorderBottom')).eq($(document.getElementsByClassName('userBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y');
                component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':false}).fire();
                if(document.getElementById("showOnlyUserDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':true}).fire();  
                }component.getEvent("rowHeightEvent").setParams({"compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"moduleName" : 'user'}).fire();
                var y = $(document.getElementById('appendDiv')).offset().top;
                $(document.getElementsByClassName('userscroll')).height(($(window).height()-y));
                $(document.getElementsByClassName('userscroll')).on('scroll', function () {
                    $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
                });
            },200);
            
        }
        $(document.getElementById('User-info-section')).contents().each(function(index,currentObje) {
            if(this.nodeType === Node.COMMENT_NODE) {
                var val = this.textContent;
                if(val.indexOf("render facet") > -1){
                    $(this).remove();
                } 
            }
        });
        
    },
    
    //user module setting
    userModuleSetting : function(component, event, helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementsByClassName('local-setting-cls')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        $A.createComponent("stivadmn:AdminGlobalSetting", {
            "flag" : true,
            "settingTabName":"localUserSetting",
            "settingTemplate" : component.get("v.userTemplate"),
            "headerSection" : "UserHeaderSection",
            "settingBlock" : "UserSettingBlock",
            "moduleName" : "User",
            "settingTemplateForLocal" : component.get("v.userTemplate")
        }, 
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.adminifiedUserSettingDiv",newModel);
                               }
                           });
    },
    
    hideDiffrences : function(component, event, helper){
        var compDivId = 'appendDiv';
        var mainModule = 'adminifiedAdminifiedUserModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedUserInfo1';//e.g
        document.getElementById("showOnlyUserDiff").checked = false;
        component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'user','showDifference':false}).fire();  
    },
    showDiffrences : function(component, event, helper){
        var compDivId = 'appendDiv';
        var mainModule = 'adminifiedAdminifiedUserModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedUserInfo1';//e.g
        if(!document.getElementById("showHide").checked){
            document.getElementById("showHide").checked = true;
            component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'user','showDifference':false}).fire();  
        }
        component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'user','showDifference':true}).fire();  
    },
    
    cancelUserSetting :function(component, event, helper) {
        $(document.getElementsByClassName("model-append-remove")).hide();
    }, 
    
    saveUserSetting :function(component, event, helper) {
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"localUserSetting", "moduleTemplate":"UserTemplate", "moduleName" : "userModule"}).fire();
    }, 
    
    
    
    getQuickSearchTemplate :function(component, event, helper) {
        if(event.getParam("moduleName") === "userModule"){
            component.set("v.userTemplate", event.getParam("template"));
        }
    },
    
    userFieldSearch :function(component, event, helper) {
        component.getEvent("QuickSearch").setParams({
            "template" : component.get("v.userTemplate"),
            "moduleName" : "userModule",
            "inputName" : "user",
            "evtName" : "search"
        }).fire();
    },
    
    getModuleTemplate : function(component, event, helper) {
        if(event.getParam("moduleName") === "User"){
            $A.get("e.stivadmn:SetModuleTemplate").setParams({"template":component.get("v.userTemplate"), "moduleName" : event.getParam("moduleName")}).fire(); 
        }
    },
    
    
    setPermissionSetInList : function(component,event,helper){
        if(event.getParam("index") === 0){
            component.set("v.permissionSetList", []);
        }
        var permissionSetList = component.get("v.permissionSetList");
        if(event.getParam("permissionSetList") !== null){
            $.each(event.getParam("permissionSetList"), function(ind, obj){
                if( $.inArray( obj, component.get("v.permissionSetList") ) < 0){
                    permissionSetList.push(obj);
                }
            });
        }
        component.set("v.permissionSetList", permissionSetList);
        if(component.get("v.index")-1 === event.getParam("index")){
            $.each($(document.getElementById('table-'+component.get("v.userCommonId")+'Permission_Sets').querySelectorAll('tr')), function(index, objObj){
                var id = $(objObj).attr('id');
                if(id !== undefined){
                    id = id.split('-');
                    if( $.inArray( id[1], permissionSetList ) < 0){
                        $(document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'permission-set-'+id[1])).remove();
                    }
                }
            }); 
        }
    },
    
    setUpdateInstanceList : function(component,event,helper){
        var instanceList = [];
        var flag = false;
        var instanceIndxList = [];
        
        if(component.get("v.instanceDataList").length === 0 && component.get("v.manageIndex").length === 0){
            instanceList.push(event.getParam('instanceData'));
            instanceIndxList.push(event.getParam('index'));
            component.set("v.instanceDataList", instanceList);
            component.set("v.manageIndex", instanceIndxList);
            flag = true;
        }else{
            instanceList = component.get("v.instanceDataList");
            if($.inArray( event.getParam('instanceData'), instanceList ) < 0 ){
                instanceList.push(event.getParam('instanceData'));
                instanceIndxList.push(event.getParam('index'));
                component.set("v.instanceDataList", instanceList);
                component.set("v.manageIndex", instanceIndxList);
                flag = true;
            }
            if($.inArray( event.getParam('index'), component.get("v.manageIndex")) === 0 && $.inArray( event.getParam('instanceData'), instanceList ) < 0){
                flag = true;
            }
        }
        
        if(flag){
            $A.get("e.stivadmn:UserInfoEvent").setParams({
                "redNumber" : event.getParam('randomNo'),
                "userId" : event.getParam('userId'),
                "index" : event.getParam('index'),
                "orgId": event.getParam('orgId'),
                "userName": event.getParam('userName')
            }).fire();
        }else{
            setTimeout(function(){
                $(document.getElementsByClassName('tags_'+event.getParam('randomNo'))).val('');
            }, 500);
            $(document.getElementsByClassName('sameInstanceShow')).show();
            $(document.getElementsByClassName('msgCls')).html("<b>"+event.getParam('userName')+"</b> already exist. Please select other user.");
        }
    },
    
    
    
    resetInstanceList : function(component,event,helper){
        var instanceList = [];
        instanceList = component.get("v.instanceDataList");
        if(instanceList !== ''){
            if($.inArray( event.getParam('instanceData'), instanceList ) > -1){
                instanceList.splice($.inArray( event.getParam('instanceData'), instanceList ),1);
                component.set("v.instanceDataList", instanceList);
            }
        }
    },
    getCloneUser : function(component, event, helper) {
        $A.get("e.stivadmn:RefreshCloneUser").setParams({
            "index":event.getParam("index"),
            "newUserName":event.getParam("newUserName"),
            "newUserId":event.getParam("newUserId"),
            "orgId":event.getParam("orgId")
        }).fire();
    },
    
    getPermissionSetListUser : function(component,event,helper){
        $A.get("e.stivadmn:SetPermissionSetListInUserInfo").fire();
    },
    
    getLoginHistroy : function(component,event,helper){
        $(document.getElementsByClassName('org-name')).html("Organization name : <span style='color: #c1c1c1;'>"+event.getParam("orgName")+"</span>");
        $(document.getElementsByClassName('org-user-name')).html("User name : <span style='color: #c1c1c1;'>"+event.getParam("userName")+"("+event.getParam("apiUserName")+")</span>");
        $(document.getElementsByClassName('LoginHistorySection')).show();
        $(document.getElementsByClassName('LoginHistorySectionLoader')).show();
        
        if(component.get("v.LoginHistorySectionAreaBody").length === 0){
            $(document.getElementsByClassName('close-login-history-btn')).attr('disabled',true);
            component.set("v.orgIdForLH",event.getParam("orgId").split('-')[1]);
            component.set("v.userIdForLH",event.getParam('userId'));
            component.set("v.userNameForLH",event.getParam('userName'));
            component.set("v.apiUserNameForLH",event.getParam('apiUserName'));
            $A.createComponent("stivadmn:LoginHistoryComponent", {
                "orgId": event.getParam("orgId").split('-')[1],
                "userId" : event.getParam("userId"),
                "userName" : event.getParam("userName"),
                "apiUserName" : event.getParam("apiUserName")
            },  
                               function(newModel){
                                   if (component.isValid()) {
                                       component.set("v.LoginHistorySectionAreaBody", newModel);
                                   }
                               });
        }else{
            $(document.getElementsByClassName('LoginHistorySectionLoader')).hide();
            $(document.getElementsByClassName('LoginHistorySectionLoader')).show();
            $(document.getElementsByClassName('LoginHistoryComponentBody')).hide();
            $(document.getElementsByClassName('close-login-history-btn')).attr('disabled',true);
            component.set("v.orgIdForLH",event.getParam("orgId").split('-')[1]);
            component.set("v.userIdForLH",event.getParam('userId'));
            component.set("v.userNameForLH",event.getParam('userName'));
            component.set("v.apiUserNameForLH",event.getParam('apiUserName'));
            
            $A.get("e.stivadmn:showLoginHistoryDataEvent").setParams({
                "orgId": event.getParam("orgId").split('-')[1],
                "userId" : event.getParam("userId"),
                "userName" : event.getParam("userName"),
                "apiUserName" : event.getParam("apiUserName")
            }).fire();
        }
        
    },
    
    closeLoginHistoryComponent : function(component,event,helper){
        
        $(document.getElementsByClassName('LoginHistorySection')).hide();
    },
    
    successOkay : function(component, event, helper) { 
        $(document.getElementsByClassName('password-reset-success')).hide();
    },
    
    errorOkay : function(component, event, helper) { 
        $(document.getElementsByClassName('password-reset-error')).hide();
    },
    setResetPassword : function(component, event, helper) { 
        component.set("v.orgIdForReset", event.getParam("orgId"));
        component.set("v.userIdForReset", event.getParam("userId"));
        component.set("v.randomNoForReset", event.getParam("randomNo"));
    },
    
    resetConfirm : function(component, event, helper) { 
        $(document.getElementsByClassName('reset-password-confirm')).hide();
        $(document.getElementsByClassName('rsetPassword-user-cls'+component.get("v.randomNoForReset"))).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg>Resetting...</span>' );
        
        var action = component.get("c.goUserResetPassword");
        action.setParams({
            "orgId":component.get("v.orgIdForReset"),
            "userId" : component.get("v.userIdForReset"),
        });
        action.setCallback(this, function(response){ 
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                
                var res = $.parseJSON(response.getReturnValue());
                $(document.getElementsByClassName('rsetPassword-user-cls'+component.get("v.randomNoForReset"))).html('Reset Password');
                if(res.Status === 'OK'){
                    $(document.getElementsByClassName('password-reset-success')).show();
                }else{
                    $(document.getElementsByClassName('password-reset-error-msg')).html(res.Status);
                    $(document.getElementsByClassName('password-reset-error')).show();
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    resetCancel : function(component, event, helper) { 
        $(document.getElementsByClassName('reset-password-confirm')).hide();
    },
    
})