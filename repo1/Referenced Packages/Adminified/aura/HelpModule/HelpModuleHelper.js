({
    /* globals $ */
    initTab : function(component) { 
        $('body').off("click",".tab_help_module .help_module_li");
        $('body').on("click",".tab_help_module .help_module_li",function(){
            if(!$(this).hasClass('active')){              
                $(document.getElementsByTagName('body')[0].querySelectorAll('.tab_help_module .help_module_li')).each(function(){    
                    if($(this).hasClass('active')){                        
                        $(this).removeClass('active');
                        var ariaAttr = $(this.querySelectorAll('a')).attr('aria-controls');
                        if($(document.getElementById(ariaAttr)).hasClass('slds-show')){
                            $(document.getElementById(ariaAttr)).removeClass('slds-show');
                            $(document.getElementById(ariaAttr)).addClass('slds-hide');
                        }
                        
                    }
                });
                var sName = $(this.querySelectorAll('a')).attr('aria-controls')
                document.getElementById(sName).classList.remove('slds-hide');
                document.getElementById(sName).classList.add('slds-show');
                $(this).addClass('active');
                var ariaAttr1 = $(this.querySelectorAll('a')).attr('aria-controls'); 
                $(document.getElementById(ariaAttr1)).addClass('slds-show');
                component.set("v.whichHelpTab", $(this).text());
                var y =  $(document.getElementById('helpScroll')).offset().top;
                $(document.getElementsByClassName('helpHeight')).height(($(window).height()-y));
            }
        });
    },
})