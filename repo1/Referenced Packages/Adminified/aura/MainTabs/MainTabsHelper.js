({
	/* globals $ */
    initTab : function(component,event,helper) {
        var tabObj = {'User':'userModule','Profile':'profileModule',
                      'Permission Set':'permissionModule','Settings':'settingsModule','Help':'helpModule'};
        $('body').on('click','.adminifiedTabsUl li',function(){
            if(!$(this).hasClass('slds-active')){
                
                var tName= $(this.querySelectorAll('a')).text();
                component.set('v.isModuleOpen',tabObj[tName]);
                //$(this).addClass('slds-active');
                var attrAria = $(this.querySelectorAll('a')).attr('aria-controls');
                $(document.getElementById(attrAria)).addClass('slds-show');
                $(document.getElementsByClassName("model-append-remove")).hide();
                 var perY = $(document.getElementById('PermissionSetSectionDiv')).offset().top;
                 var proY = $(document.getElementById('ProfileSectionDiv')).offset().top;
                var usrY = $(document.getElementById('appendDiv')).offset().top;
                 var hlpY =  $(document.getElementById('helpScroll')).offset().top;
               $(document.getElementsByClassName('permissionsetscroll')).height(($(window).height()-perY));
                $(document.getElementsByClassName('profilescroll')).height(($(window).height()-proY));
                $(document.getElementsByClassName('userscroll')).height(($(window).height()-usrY));
               $(document.getElementsByClassName('helpHeight')).height(($(window).height()-hlpY));
            }
        });
    },
    
   
})