({
    /* globals $ */
    documentReady : function(component, event, helper) {
     $(document.getElementsByClassName('faqIcon')).html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 24 24" data-code="57542" data-tags="live_help"><g fill="#3c97dd" transform="scale(0.0234375 0.0234375)"><path d="M642 438c24-24 40-58 40-96 0-94-76-172-170-172s-170 78-170 172h84c0-46 40-86 86-86s86 40 86 86c0 24-10 44-26 60l-52 54c-30 32-50 74-50 120v22h84c0-64 20-90 50-122zM554 768v-86h-84v86h84zM810 86c46 0 86 38 86 84v598c0 46-40 86-86 86h-170l-128 128-128-128h-170c-48 0-86-40-86-86v-598c0-46 38-84 86-84h596z" /></g></svg>');
        var temH =  $(document.getElementById('navTab')).outerHeight()+$(document.getElementsByClassName('slds-page-header')).outerHeight();
         $(document.getElementsByClassName('faqHeight')).innerHeight(($(window).height()-temH)-65);
        helper.initTab(component);
    },
})