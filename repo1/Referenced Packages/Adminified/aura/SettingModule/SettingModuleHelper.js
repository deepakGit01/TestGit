({
    
    /* globals $*/
    initTab: function(component, event, helper) {
        var settingTabObj = {'User':'userSetting','Profile':'profileSetting',
                      'Permissions Set':'permissionSetting','Connected App':'ConnectedAppSetting','Manage Organization':'ManageOrgSetting'};

        $('body').on("click",".tab_Setting_module .setting_module_li",function(){
            if(!$(this).hasClass('active')){
                var sName = $(this.querySelectorAll('a')).text();
                var sTab = settingTabObj[sName];
                component.set('v.isSettingOpen',sTab);
                var ariaAttr1 = $(this.querySelectorAll('a')).attr('aria-controls');
                $.each($(document.getElementById(ariaAttr1)), function(ind, el){    
                    el.classList.add('slds-show');
                });
            }
        });
    },
    settingTabs : function(component,event,helper){
        component.getEvent("GetModuleTemplate").setParams({"moduleName" : component.get('v.moduleName')}).fire();
    },
	
})