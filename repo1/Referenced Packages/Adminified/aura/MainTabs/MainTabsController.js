({
    /* globals $ */
    documentReady : function(component,event,helper){
        $(document.getElementsByClassName('main-tabs')).show();
        helper.initTab(component,event,helper);
        $('body').off('click','.adminifiedTabsUl .tab-li');
        $('body').on('click','.adminifiedTabsUl .tab-li',function(){
            if($(this).hasClass('slds-active')){
                component.set("v.whichTab", $(this).text());
                if($(this).text() === "Settings"){
                    var stgY = document.getElementById("settingScroll");
                    if (stgY.length) {
                        var stgY1 = $(document.getElementById("settingScroll")).offset().top;
                        $(document.getElementsByClassName('settingHight')).height(($(window).height()-stgY1));
                    }
                }
            }            
        });
    },
    
    getTabName : function(component,event,helper){
        var tabName = event.getParam("tabName");
        if(typeof event.getParam("tabName") !== 'undefined'){
            $(document.getElementsByClassName(tabName)[0]).addClass('slds-active');
            $(document.getElementsByClassName(tabName)[0].querySelectorAll('a')).attr("aria-selected", true);
            $(document.getElementById(tabName)).removeClass('slds-hide').addClass('slds-show');
            component.set("v.whichTab",$(document.getElementsByClassName(tabName)).attr('title'));
        }
    },
})