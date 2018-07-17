({
    /* globals $*/
    documentReady : function(component, event, helper) {
        $(document.getElementsByClassName('profileSettingIcon')).html('<svg width="25" height="25" viewBox="0 0 24 24" style=" border-radius: 3px;"><g fill="#3c97dd" transform="scale(0.0244375 0.0234000)"><path d="M864 0h-768c-52.8 0-96 43.2-96 96v832c0 52.8 43.2 96 96 96h768c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96zM832 896h-704v-768h704v768zM256 576h448v64h-448zM256 704h448v64h-448zM320 288c0-53.019 42.981-96 96-96s96 42.981 96 96c0 53.019-42.981 96-96 96s-96-42.981-96-96zM480 384h-128c-52.8 0-96 28.8-96 64v64h320v-64c0-35.2-43.2-64-96-64z"></path></g></svg>');
        $(document.getElementsByClassName('clientcls')).attr("readonly", true);
        component.set("v.whichSettingTab", "Manage Organization");
        helper.initTab(component, event, helper);
        var y = $(document.getElementById('settingScroll'));
        var y1;
        if(y.length){
            y1 = $(document.getElementById('settingScroll')).offset().top;
        }
        $(document.getElementsByClassName('settingHight')).height(($(window).height()-y1));
        $('body').off('click','.tab_Setting_module .tab-li');
        $('body').on('click','.tab_Setting_module .tab-li',function(){
            component.set("v.whichSettingTab", $(this).text());
            $(this).addClass('active');
            if(component.get("v.whichSettingTab") ==='Permissions Set'){
                component.set('v.moduleName',"PermissionSet");
            }else{
                component.set('v.moduleName',component.get("v.whichSettingTab"));
            }
            helper.settingTabs(component, event, helper);
        });
        
    },
    getOrgCmpDetails : function(component, event, helper) {
        
    },
    
    addOrg : function(component, event, helper) {  
        $A.createComponent("stivadmn:ConnectToOrganization", {"aura:id": "addOrg"}, function(newModel){
            if (component.isValid()) {
                var body = component.find("orgnizationDiv");
                body.set("v.body", newModel);
            }
        });     
    }, 
    saveUserSetting :function(component, event, helper) {
        $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).addClass('pointer-event');
        $(document.getElementsByClassName('adminifiedTabsUl')[0]).addClass('pointer-event');
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"GlobalUserSetting", "moduleTemplate":"UserTemplate", "moduleName" : "userModule"}).fire();
    }, 
    
    saveProfileSetting :function(component, event, helper) {
        $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).addClass('pointer-event');
        $(document.getElementsByClassName('adminifiedTabsUl')[0]).addClass('pointer-event');
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"GlobalProfileSetting", "moduleTemplate":"ProfileTemplate", "moduleName" : "profileModule"}).fire();
    }, 
    
    savePermissionSetSetting :function(component, event, helper) {
        $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).addClass('pointer-event');
        $(document.getElementsByClassName('adminifiedTabsUl')[0]).addClass('pointer-event');
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"GlobalPermissionSetSetting", "moduleTemplate":"PermissionsTemplate", "moduleName" : "permissionModule"}).fire();
    }, 
    
    setModuleTemplate : function(component, event, helper) {
        var moduleName = event.getParam("moduleName");
        var template = event.getParam("template");
        $A.createComponent("stivadmn:AdminGlobalSetting", {
            "flag" : true,
            "settingTabName":"Global"+moduleName+"Setting",
            "settingTemplate" : template,
            "headerSection" : moduleName+"HeaderSection",
            "settingBlock" : moduleName+"SettingBlock",
            "moduleName" : moduleName,
            "settingTemplateForLocal" : template
        }, 
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.SettingDiv",newModel);
                               }
                           });
        
        
    },
    
    closeViewSetupAuditTrail :function(component, event, helper) {
        $(document.getElementsByClassName('viewSetupAuditTrail')).hide();
    },
    next :function(component, event, helper) {
        document.getElementsByClassName('nextButton')[0].innerHTML = '<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Previous...'; 
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'viewSetupAuditTrail'}).fire();
        $A.get("e.stivadmn:nextPrevPagingEvent").setParams({'pagingAction':'next'}).fire();
    },
    previous:function(component, event, helper) {
        document.getElementsByClassName('prevButton')[0].innerHTML = '<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Next...'; 
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'viewSetupAuditTrail'}).fire();
        $A.get("e.stivadmn:nextPrevPagingEvent").setParams({'pagingAction':'prev'}).fire();
    },
    viewSetUpAuditTrail : function(component, event, helper) {
        $A.createComponent("stivadmn:viewSetupAuditTrailCmp", {
            "orgId":event.getParam('orgId')
        }, function(newModel){
            if (component.isValid()) {
                component.set("v.viewSetupAuditTrail",newModel);
            }
        });
        $(document.getElementsByClassName('viewSetupAuditTrail')).show();
    }, 
     
})