({
	/* globals $ */
	afterRender : function(component, helper) { 
        //if($('.uiInputSelect').length !== 0){
            this.superAfterRender();
        //}
    
    },
    
    unrender: function () {
    	this.superUnrender();
    	// do custom unrendering here
	}
})