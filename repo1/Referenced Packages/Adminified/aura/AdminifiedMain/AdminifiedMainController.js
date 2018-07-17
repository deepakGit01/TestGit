({
    /* globals $ */
    documentReady : function(component, event, helper) {
        // reload when click on app launcher
        $(document.getElementsByTagName('body')).addClass('stop-scrolling');
        if($(document.getElementsByClassName('main-cmp-1')).length){
            $(document.getElementsByClassName('main-cmp-1')).remove();
            location.reload(true);
        }
        $(document.getElementsByClassName('main-cmp')).addClass('main-cmp-1');
        
        //svg icons show in IE
        var expReg = /MSIE|Trident/;
        expReg.test(navigator.userAgent) && document.addEventListener('DOMContentLoaded', function () {
            [].forEach.call(document.querySelectorAll('svg'), function (svg) {
                var use = svg.querySelector('use'); 
                if (use) {
                    var object = document.createElement('object');
                    object.data = use.getAttribute('xlink:href');
                    object.className = svg.getAttribute('class');
                    svg.parentNode.replaceChild(object, svg);
                }
            });
        });
        
        //setup wizard
        var self = this;
        var action = component.get("c.getAppSetupWizard");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                if(response.getReturnValue().status === "SUCCESS"){
                    if(response.getReturnValue().body === "0"){
                        //$('.setup-wizard-cls').show();
                       $(document.getElementsByClassName('setup-wizard-cls')).show();
                    }
                }else{
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                }
            }else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            } 
        });
        $A.enqueueAction(action);
        
        
        
        //combobox
        $.widget( "custom.combobox1", {
            _create: function() {
                this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );
                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },
            _createAutocomplete: function() {
                var selected = this.element.children( ":selected" ),
                    value = selected.val() ? selected.text() : "";
                this.input = $( "<input autofocus class='slds-input slds-input--small' placeholder='Organization'>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });
                
                this._on( this.input, {
                    autocompleteselect: function( e, ui ) {
                        ui.item.option.selected = true;
                        this._trigger( "select", e, {
                            item: ui.item.option
                        });
                    },
                    autocompletechange: "_removeIfInvalid"
                });
            },
            
            _createShowAllButton: function() {
                var input = this.input,
                    wasOpen = false;
                $( "<a>" )
                .attr( "tabIndex", -1 )
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();
                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }
                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
            },
            
            _source: function( request, response ) {
                var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                response( this.element.children( "option" ).map(function() {
                    var text = $( this ).text();
                    if ( this.value && ( !request.term || matcher.test(text) ) )
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                }) );
            },
            
            _removeIfInvalid: function( e, ui ) {
                // Selected an item, nothing to do
                if ( ui.item ) {
                    return;
                }
                
                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children( "option" ).each(function() {
                    if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                        this.selected = valid = true;
                        return false;
                    }
                });
                
                // Found a match, nothing to do
                if ( valid ) {
                    return;
                }
                
                // Remove invalid value
                this.element.val( "" );
                this.input.autocomplete( "instance" ).term = "";
            },
            
            _destroy: function() {
                this.wrapper.remove();
                this.element.show();
            }
        }); 
        
        //mouseover 
        $("body").off("mouseover",".section-class .datarow");
        $("body").on("mouseover",".section-class .datarow",function(){
            var sectionClasses = $(this).closest('.section-class').attr('class');
            var sectionClassArray = sectionClasses.split(' ');
            var sectionClass = $.trim(sectionClassArray[0]);
            var ind = $(this).index();
            if(sectionClass === "profile_id___Object" || sectionClass === "permissionset_id___Object"){
                var id = '';
                if(typeof $(this).closest('table').attr('id') !== 'undefined'){
                    id = $(this).closest('table').attr('id');
                }else{
                    id = $(this).closest('table').attr('class');
                    id = id.split(' ');
                    id = $.trim(id[0]);
                }
                 $.each($(document.getElementsByClassName('adminifiedAdminifiedProfileModule').querySelectorAll('.'+sectionClass)),function(){
                     $(this.getElementById(id).querySelectorAll('.datarow')).eq(ind).addClass('hover-class');
                    $(this.getElementsByClassName(id)[0].querySelectorAll('.datarow')).eq(ind).addClass('hover-class');
                });
            }else{
                $.each($(document.getElementsByClassName(sectionClass)),function(){
                    $(this.querySelectorAll('.datarow')).eq(ind).addClass('hover-class');
                });  
            } 
        });
        
        $("body").off("mouseout",".section-class .datarow");
        $("body").on("mouseout",".section-class .datarow",function(){
            var sectionClasses = $(this).closest('.section-class').attr('class');
            var sectionClassArray = sectionClasses.split(' ');
            var sectionClass =  $.trim(sectionClassArray[0]);
            var ind = '';
            ind = $(this).index();
            if(sectionClass === "Profile_id___Object" || sectionClass === "permissionset_id___Object"){
                var id = '';
                if(typeof $(this).closest('table').attr('id') !== 'undefined'){
                    id = $(this).closest('table').attr('id');
                }else{
                    id = $(this).closest('table').attr('class');
                    id = id.split(' ');
                    id = $.trim(id[0]);
                }
                $.each($(document.getElementsByClassName('adminifiedAdminifiedProfileModule').querySelectorAll('.'+sectionClass)),function(){
                    $(this.getElementById(id).querySelectorAll('.datarow')).eq(ind).removeClass('hover-class');
                    $(this.getElementsByClassName(id)[0].querySelectorAll('.datarow')).eq(ind).removeClass('hover-class');
               
                });
            }else{
                $.each($(document.getElementsByClassName(sectionClass)),function(){
                    $(this.querySelectorAll('.datarow')).eq(ind).removeClass('hover-class');
                });  
            }
        });
        helper.getGlobalConOrg(component, event, helper);
    },
    
    // show/hide differences
    differenceRow:function(component, event, helper) { 
       var getInnerText = function (element) {
            var nodes = element.childNodes,
                i = 0,
                len = nodes.length,
                text = '';
            for (; i < len; i++) {
                if (nodes[i].nodeType === 3 || nodes[i].nodeType === 4) {
                    // 3 means text node, 4 means cdata
                    text += nodes[i].nodeValue;
                } else {
                    text += getInnerText(nodes[i]);
                }
            }
            return text;
        };
        function  getValues(fieldTdObject) {
            var element = fieldTdObject.querySelectorAll('input,select,checkbox');
            var returnValue = ''; 
            if(element.length > 0){
                if(element.type === 'text' || element.nodeName === 'select'){
                    returnValue = element.value;
                }else if(element.type === 'checkbox'){
                    if(element.checked){
                        returnValue = 'checked';
                    }else{
                        returnValue = 'unchecked';
                    }
                } 
            }else if(fieldTdObject.querySelectorAll('.reject').length > 0){
                returnValue = 'unchecked';
            }else if(fieldTdObject.querySelectorAll('.approval').length > 0){
                returnValue = 'checked';
            }else{
                returnValue = $.trim(getInnerText(fieldTdObject));
            }
            return returnValue;
        } 
        
       
        function indexInParent(node) {
            var children = node.parentNode.childNodes;
            var num = 0;
            for (var i=0; i<children.length; i++) {
                if (children[i]===node) return num;
                if (children[i].nodeType===1) num++;
            }
            return -1;
        }
        
        var objectSection;    
        var tabName = event.getParam('tabName');
        var moduleId = 'userModule';
        if(tabName === 'permissionset'){
            moduleId = 'permissionModule';
        }else if(tabName === 'profile'){
            moduleId = 'profileModule';
        }
        var showHideId = event.getParam('showHideId');//e.g.  appendDiv
        var isChecked = document.getElementById(showHideId).checked;
        if(!isChecked){
               $.each(document.getElementsByClassName(tabName+'-field-row'), function(ind, el){
                    el.classList.remove('difference-row');
                    el.style.display = '';
                    
                });
                $.each(document.querySelectorAll('[class*="'+tabName+'-search-"]'), function(ind, el){
                    el.classList.remove('difference-row');
                    el.style.display = '';
                });
                $.each(document.getElementsByClassName(tabName+'-field-row'), function(ind, el){
                    el.classList.remove('difference-row');
                    el.style.display = '';
                });
                
                $.each(document.getElementById(moduleId).querySelectorAll('.obj-field-row'), function(ind, el){
                    el.classList.remove('difference-row');
                    el.style.display = '';
                });
            
            if($(document.getElementById(moduleId).querySelectorAll('table.data-table-Object > tr.difference-row')).length){  
                $(document.getElementById(moduleId).querySelectorAll('table#table-Object tr.difference-row')).removeClass('difference-row');
                $(document.getElementById(moduleId).querySelectorAll('table.data-table-Object tr.difference-row')).removeClass('difference-row');
                
            }
          
            return false;
        }else{
            var compDivId = event.getParam('compDivId');//e.g.  appendDiv
            var mainModule = event.getParam('mainModule');//e.g. adminifiedAdminifiedUserModule
            var currentComparableModule = event.getParam('currentComparableModule');//e.g. adminifiedUserInfo1
            var fields = $(document.getElementById(compDivId).querySelectorAll('.'+tabName+'-field-row'));
            var rowId = '';
            var fieldApiId = '';
            var prevValue = '';
            var currentValue = '';
            var currentRowIndex = '';
            var isDifference = false;
            var setTFflag = false;
            var setProTFflag = false;
            var setPerTFflag = false;
            $.each($(fields),function(index,row){
                rowId = $(row).attr('id');
                fieldApiId = rowId.replace(mainModule+'-','');
                var parentSection = $(row).closest('.'+tabName+'-section-class').prop('class'); 
                var parentSectionNames = parentSection.split(' ');
                var parentSectionName = parentSectionNames[0]; 
                var tm = document.getElementsByClassName(parentSection)[0].querySelectorAll('.'+tabName+'-field-row');
                currentRowIndex = $(tm).index(row);
                prevValue = '';
                isDifference = false;//adminifiedProfileInfo -- Module Name
                var str = '';
                var pervFalg = false;
                var fieldObj = '';
                var fieldObjs = document.querySelectorAll("."+currentComparableModule+" ."+tabName+"-search-"+fieldApiId);
                for(var i=0;i<fieldObjs.length;i++){
                    fieldObj = fieldObjs[i];
                    currentValue = getValues(fieldObj.getElementsByTagName('td')[0]);
                    if(prevValue === '' && !pervFalg){
                        pervFalg = true;
                        prevValue = currentValue;
                    }else if(currentValue !== prevValue ){
                        isDifference = true; 
                        prevValue = currentValue;
                    }
                    
                }
               
                if(isDifference){
                    $.each(document.getElementsByClassName(tabName+"-search-"+fieldApiId),function(colIndex,fieldObjVal){
                        fieldObjVal.classList.add('difference-row');
                        if(event.getParam('showDifference')){
                            fieldObjVal.style.display = '';
                       }
                        
                    });
                    $.each(document.getElementById(compDivId).querySelectorAll("."+tabName+"-search-"+fieldApiId),function(colIndex,fieldObjVal){
                        fieldObjVal.classList.add('difference-row');
                        if(event.getParam('showDifference')){
                            fieldObjVal.style.display = '';
                        }
                    });
                }else{
                    
                    $.each(document.getElementsByClassName(tabName+"-search-"+fieldApiId),function(colIndex,fieldObjVal){
                        fieldObjVal.classList.remove('difference-row');
                        if(event.getParam('showDifference') && fieldObjs.length > 1){
                            fieldObjVal.style.display = 'none';
                            if(moduleId === 'permissionModule' &&  component.get('v.permissionShowDiff')){
                                setPerTFflag = false;
                            }else if(moduleId === 'profileModule' && component.get('v.profileShowDiff')){
                                setProTFflag = false;
                            }else if(moduleId === 'userModule' && component.get('v.userShowDiff')){
                                setTFflag = false;
                            }else{
                                fieldObjVal.style.display = '';
                                if(moduleId === 'permissionModule'){
                                    setPerTFflag = true;
                                }
                                if(moduleId === 'profileModule'){
                                    setProTFflag = true;
                                }
                                if(moduleId === 'userModule'){
                                    setTFflag = true;
                                }
                            }
                            
                        }else{
                            fieldObjVal.style.display = '';
                            if(moduleId === 'permissionModule'){
                                setPerTFflag = true;
                            }
                            if(moduleId === 'profileModule'){
                               setProTFflag = true;
                            }
                            if(moduleId === 'userModule'){
                                setTFflag = true;
                            }
                         }
                    });
                    $.each(document.getElementById(compDivId).querySelectorAll("."+tabName+"-search-"+fieldApiId),function(colIndex,fieldObjVal){
                        fieldObjVal.classList.remove('difference-row');
                        if(event.getParam('showDifference') && fieldObjs.length > 1){
                            fieldObjVal.style.display = 'none';
                            if(moduleId === 'permissionModule' &&  component.get('v.permissionShowDiff')){
                                setPerTFflag = false;
                            }else if(moduleId === 'profileModule' && component.get('v.profileShowDiff')){
                                setProTFflag = false;
                            }else if(moduleId === 'userModule' && component.get('v.userShowDiff')){
                                setTFflag = false;
                            }else{
                                fieldObjVal.style.display = '';
                                if(moduleId === 'permissionModule'){
                                    setPerTFflag = true;
                                }
                                if(moduleId === 'profileModule'){
                                    setProTFflag = true;
                                }
                                if(moduleId === 'userModule'){
                                    setTFflag = true;
                                }
                            }
                        }else{
                            fieldObjVal.style.display = '';
                            if(moduleId === 'permissionModule'){
                                setPerTFflag = true;
                            }
                            if(moduleId === 'profileModule'){
                               setProTFflag = true;
                            }
                            if(moduleId === 'userModule'){
                                setTFflag = true;
                            }
                        }
                    });
                    
                }
                
            });  
            if(moduleId === 'userModule'){
                component.set('v.userShowDiff',setTFflag);
            }
            var setShowFlg = true;
            /// camparision for objects
            if(moduleId === 'permissionModule'){
                 objectSection = document.getElementById(moduleId).querySelectorAll(".permissionset_id___Object")[0];
            }
            
            if(moduleId === 'profileModule'){
                objectSection = document.getElementById(moduleId).querySelectorAll(".profile_id___Object")[0];
            }
            if($(objectSection).length > 0){
                var subSection = '';
                var objCurrentValue = '';
                var objPrevValue = '';
                var isDifferenceInObj = false;
                 $.each($(objectSection.querySelectorAll(".object-subsection-table")),function(tableIndex,tableObj){
                    subSection = $(tableObj).attr('id');//e.g. Account-permission-table ...this would be class in other data section
                     $.each($(tableObj.querySelectorAll(".obj-field-row")),function(currentRowNo,fieldObj){ 
                        isDifferenceInObj = false;
                        var rowIdForObjCompair = $(fieldObj).attr('id');
                        var rowIdForObjCompairForCls = rowIdForObjCompair;
                        if(!(rowIdForObjCompair === undefined || rowIdForObjCompair === '' || rowIdForObjCompair.indexOf('_id___') === -1)){
                            rowIdForObjCompairForCls = $.trim(rowIdForObjCompair.split('_id___')[1]);
                        }
                        var temp = '';
                        objPrevValue = '';
                        var falgPrev = false;
                        var rowObjs = $(document.getElementById(moduleId).querySelectorAll('.'+currentComparableModule+' .'+moduleId+'-'+rowIdForObjCompairForCls));
                        var getRowObj = '';
                        for(var n=0;n<rowObjs.length;n++){
                            getRowObj = rowObjs[n];
                            objCurrentValue = '';
                            objCurrentValue = getValues(getRowObj.getElementsByTagName('td')[0]);
                            if(objPrevValue === '' && !falgPrev){
                                falgPrev = true;
                                objPrevValue = objCurrentValue;
                            }else if(objCurrentValue !== objPrevValue){
                                isDifferenceInObj = true; 
                                objPrevValue = objCurrentValue;
                            }
                        }
                        if(isDifferenceInObj){
                            $.each($(document.getElementById(moduleId).querySelectorAll('.'+moduleId+'-'+rowIdForObjCompairForCls)),function(rowIndex,rowObj){ 
                                $(rowObj).addClass('difference-row');
                                $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).addClass('difference-row');
                                if(event.getParam('showDifference')){
                                   $(rowObj).css("display", ""); 
                                  $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).css("display", "");
                                }
                            });  
                        }else{
                            $.each($(document.getElementById(moduleId).querySelectorAll('.'+moduleId+'-'+rowIdForObjCompairForCls)),function(rowIndex,rowObj){
                                $(rowObj).removeClass('difference-row');
                                $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).removeClass('difference-row');
                                if(event.getParam('showDifference') && rowObjs.length > 1){
                                    $(rowObj).css("display", "none"); 
                                    $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).css("display", "none");
                                    if(moduleId === 'permissionModule' &&  component.get('v.permissionShowDiff')){
                                        setPerTFflag = false;
                                    }else if(moduleId === 'profileModule' && component.get('v.profileShowDiff')){
                                        setProTFflag = false;
                                    }else{
                                        $(rowObj).css("display", "");
                                        $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).css("display", "");
                                        if(moduleId === 'permissionModule'){
                                            setPerTFflag = true;
                                        }
                                        if(moduleId === 'profileModule'){
                                            setProTFflag = true;
                                        }
                                    }
                                }else{
                                    $(rowObj).css("display", "");
                                    $(document.getElementById(moduleId)).find("#"+rowIdForObjCompair).css("display", "");
                                    if(moduleId === 'permissionModule'){
                                        setPerTFflag = true;
                                    }
                                    if(moduleId === 'profileModule'){
                                        setProTFflag = true;
                                    }
                                }
                            }); 
                        }
                    });
                });
               
            }
            if(moduleId === 'permissionModule'){
                component.set('v.permissionShowDiff',setPerTFflag);
            }
            
            if(moduleId === 'profileModule'){
              component.set('v.profileShowDiff',setProTFflag);
            }
            
        }
         },
    
    //close success alert
    successClose : function(component, event, helper){
        $(document.getElementsByClassName('alert-success')).hide();
    },
    
    //close conected app
    connClose : function(component, event, helper){
        $(document.getElementsByClassName('connected-app-modal')).hide();
    },
    
    connSave : function(component, event, helper){
      $(document.getElementsByClassName('alert-connectedapp-setting')).hide();
        $(document.getElementsByClassName('save-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Saving...');
        $(document.getElementsByClassName('close-btn')).attr('disabled', true);
        $(document.getElementsByClassName('save-btn')).attr('disabled', true);
        if($(document.getElementById('Client_Id')).val() !== '' && $(document.getElementById('Client_Secret')).val() !== ''){
            var dataToBeSend = {};
            var objVal = '';
            var objId = '';
            $.each(document.getElementsByClassName('connected-app-sndsvr'), function(index, elementObj){
                objVal = $.trim($(elementObj).val());
                objId = $.trim($(elementObj).attr('id'));
                dataToBeSend[objId] = objVal;
            });
            
            var action = component.get("c.updateConnectedAppSetting");
            action.setParams({"conAppObj": dataToBeSend});
            var self = this;
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    if(response.getReturnValue() === 'success'){
                        $(document.getElementsByClassName('alert-connectedapp-setting')).removeClass('slds-theme--error');
                        $(document.getElementsByClassName('alert-connectedapp-setting')).addClass('slds-theme--success');
                       $(document.getElementsByClassName('connectedapp-setting-response')).text('Consumer key and consumer secret inserted successfully!');
                        $(document.getElementsByClassName('alert-connectedapp-setting')).show();
                        $(document.getElementsByClassName('save-btn')).html('Save');
                        $(document.getElementsByClassName('close-btn')).attr('disabled', false);
                        $(document.getElementsByClassName('save-btn')).attr('disabled', false);
                        setTimeout(function(){ $(document.getElementsByClassName('alert-connectedapp-setting')).hide();$(document.getElementsByClassName('connected-app-modal')).hide(); }, 5000);
                    }else{
                       $(document.getElementsByClassName('alert-connectedapp-setting')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('connectedapp-setting-response')).html(response.getReturnValue());
                        $(document.getElementsByClassName('alert-connectedapp-setting')).show();
                        setTimeout(function(){ $(document.getElementsByClassName('alert-connectedapp-setting')).hide(); }, 4000);
                    }
                }
            });
            $A.enqueueAction(action);
        }else{
           $(document.getElementsByClassName('alert-connectedapp-setting')).addClass('slds-theme--error');
            $(document.getElementsByClassName('connectedapp-setting-response')).html('Fill consumer key and secret!');
           $(document.getElementsByClassName('alert-connectedapp-setting')).show();
        }
    },
    
    errorClose : function(component, event, helper){
        $(document.getElementsByClassName('alert-error')).hide();
    },
    
    setRemoteSite : function(component, event, helper){
        window.open('/0rp/e?retURL=%2F0rp%3Fspl1%3D1%26setupid%3DSecurityRemoteProxy%26retURL%3D%252Fui%252Fsetup%252FSetup%253Fsetupid%253DSecurity&EndpointUrl='+component.get("v.endPoint"));
    },
    
    setEndPoint : function(component, event, helper){
        component.set("v.endPoint", event.getParam('endPoint'));
    },
    
    faqOpen : function(component, event, helper){
       if($(document.getElementsByClassName('more-warning')).hasClass("more-none")){
            $(document.getElementsByClassName('more-warning')).removeClass("more-none");
        }else{
            $(document.getElementsByClassName('more-warning')).addClass("more-none");
        }  
    },
    
    disabledButton : function(component, event, helper){
        var tabName = '';
        if(event.getParam('tabName') !== undefined){
            tabName = event.getParam('tabName');
        }
        if(event.getParam('isDisabled')){
            if(tabName !== '' && tabName !== undefined){
                $(document.getElementById(tabName).querySelectorAll('button')).not('.compare-btn').attr("disabled", true);
              $(document.getElementById(tabName).querySelectorAll('input')).not('.sndsvr').attr("disabled", true);
                 $(document.getElementById(tabName)).find('input[type="checkbox"]').attr("disabled", true);
                $(document.getElementById(tabName).querySelectorAll('a')).addClass("a-disabled");
            }else{
               $(document.getElementsByTagName('body')[0].querySelectorAll('button')).not('.compare-btn').attr("disabled", true);
                $(document.getElementsByTagName('body')[0].querySelectorAll('input')).not('.sndsvr').attr("disabled", true);
               $(document.getElementsByTagName('body')).find('input[type="checkbox"]').attr("disabled", true);
                $(document.getElementsByTagName('body')[0].querySelectorAll('a')).addClass("a-disabled");
            }
        }else{ 
            if(tabName !== '' && tabName !== undefined){
                $(document.getElementById(tabName).querySelectorAll('button')).attr("disabled", false);
                $(document.getElementById(tabName).querySelectorAll('input')).attr("disabled", false);
                $(document.getElementById(tabName).querySelectorAll('a')).removeClass("a-disabled");
                $(document.getElementById(tabName)).find('input[type="checkbox"]').attr("disabled", false);
            }else{
                $(document.getElementsByTagName('body')[0].querySelectorAll('.main-cmp-1')).css("cursor", "");
                $(document.getElementsByTagName('body')[0].querySelectorAll('button')).attr("disabled", false);
                $(document.getElementsByTagName('body')[0].querySelectorAll('input')).not('.sndsvr').attr("disabled", false);
                $(document.getElementsByTagName('body')[0].querySelectorAll('a')).removeClass("a-disabled");
                $(document.getElementsByTagName('body')).find('input[type="checkbox"]').attr("disabled", false);
            }
        }
    },
    
    loaderOnComp : function(component, event, helper){
        
    },
    
    errorHandle : function(component, event, helper){
        var objObj = event.getParam('responseObj');
        var errors = event.getParam('errors');
         $(document.getElementsByClassName('errorNote')).hide();
        if(typeof(objObj) !== 'undefined'){
            var msg = '';
            if(objObj.refCode === "UNAUTHORIZED_ENDPOINT"){
                msg = objObj.errors[0].message.split('/services');
                var endPoint = msg[0].split('endpoint = ');
                $(document.getElementsByClassName('errorNote')).show();
                $(document.getElementsByClassName('error-msg')).html(msg[0]);
                $(document.getElementsByClassName('alert-error')).show();
                component.set("v.endPoint", endPoint[1]);
            }else{
                msg = objObj.errors[0].message;
                $(document.getElementsByClassName('error-msg')).html(msg);
                $(document.getElementsByClassName('set-btn')).hide();
                $(document.getElementsByClassName('alert-error')).show();
            }
        }else if(typeof(errors) !== undefined){
            $(document.getElementsByClassName('error-msg')).html(errors);
             $(document.getElementsByClassName('set-btn')).hide();
             $(document.getElementsByClassName('alert-error')).show();
        }else {
            $(document.getElementsByClassName('error-msg')).html('Unknown error');
            $(document.getElementsByClassName('set-btn')).hide();
            $(document.getElementsByClassName('alert-error')).show();
        }
    },
    
    fixedRowHeight : function(component, event, helper) { 
        //Returns max td height of row 
        var max; 
        function getmax(myArray) { 
            max = myArray[0];
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i] > max) {
                    max = myArray[i]; 
                }
            }
            return max;
        }
        
        //Row Height for all row except object rows....
        var compDivId = event.getParam('compDivId');//e.g.  appendDiv
        var mainModule = event.getParam('mainModule');//e.g. adminifiedAdminifiedUserModule
        var moduleName = event.getParam('moduleName');
        
        var fields = $(document.getElementById(compDivId).querySelectorAll("."+moduleName+"-field-row")); 
        var rowId = '';
        var fieldApiId = '';
        var maxHeightArray1 = [];
        var start = new Date().getTime();
        var row = '';
        var modTmp = '';
        var fieldObj = '';
        var j = 0;
        for(var i=0;i<fields.length;i++){
            row = fields[i];
            rowId = row.id;
            fieldApiId = rowId.replace(mainModule+'-','');
            modTmp = document.getElementsByClassName(moduleName+"-search-"+fieldApiId);
            for(j=0;j<modTmp.length;j++){
                fieldObj = modTmp[j];
                maxHeightArray1.push($(fieldObj.getElementsByTagName('td')[0]).height());
            }
            
            var maxHeight1 = parseFloat(getmax(maxHeightArray1));
            if(maxHeight1 <= 16.4){
                maxHeight1 = 16.4;
            }
            for(j=0;j<modTmp.length;j++){
                fieldObj = modTmp[j];
                $(fieldObj.getElementsByTagName('td')[0]).height(maxHeight1);
            }
        }   
       
        //Row Height only for Object rows...
        var objectSection = '';
        var headerHeight ='';
        if(moduleName === 'permissionset'){
            headerHeight = 'permissionset_id___';
            objectSection = $(document.getElementById("PermissionSetSectionDiv").querySelectorAll(".permissionset_id___Object"));
        }
        if(moduleName === 'profile'){
            headerHeight = 'profile_id___';
           objectSection = $(document.getElementById("ProfileSectionDiv").querySelectorAll(".profile_id___Object"));
        }
        var maxHeightArray = [];
        var subSection = '';
        $.each($(objectSection).find(".object-subsection-table"),function(tableIndex,tableObj){
            $.each($(tableObj.querySelectorAll(".obj-field-row")),function(currentRowIndex,fieldObjVal){ 
                  var ObjRowId = $(fieldObjVal).attr('id');
                modTmp = document.getElementsByClassName(ObjRowId);
                for(j=0;j<modTmp.length;j++){
                    fieldObj = modTmp[j];
                    $(fieldObj.getElementsByTagName('td')[0]).css('height', '');
                    $(document.getElementById(ObjRowId).getElementsByTagName('td')[0]).css('height', '');
                    maxHeightArray.push($(fieldObj.getElementsByTagName('td')[0]).height());
                }
                var maxHeight = parseFloat(getmax(maxHeightArray)); 
               for(j=0;j<modTmp.length;j++){
                    fieldObj = modTmp[j];
                    $(fieldObj.getElementsByTagName('td')[0]).height(maxHeight);
                    $(document.getElementById(ObjRowId).getElementsByTagName('td')[0]).height(maxHeight);
                }
            });
         });
         var maxHeightArray2 = [];
       $.each($(objectSection).find(".subsection-table"),function(tableIndex,tableObj){
          $.each($(tableObj.querySelectorAll("h2")),function(currentRowIndex,fieldObjVal){ 
                 var headerObjRowId = $(this).attr('id');
                modTmp = document.getElementsByClassName(headerObjRowId);
                for(j=0;j<modTmp.length;j++){
                    fieldObj = modTmp[j];
                    $(fieldObj).css('height', '');
                    $(document.getElementById(headerObjRowId)).css('height', '');
                    
                    maxHeightArray2.push($(fieldObj).height());
                }
                var headMaxHeight = parseFloat(getmax(maxHeightArray2)); 
                 if(headMaxHeight < 17.6){
                    headMaxHeight = 17.6;
                 }
                for(j=0;j<modTmp.length;j++){
                    fieldObj = modTmp[j];
                    $(fieldObj).height(headMaxHeight);
                    $(document.getElementById(headerObjRowId)).height(headMaxHeight);
                }
            });
        });
        
        
    },
    
    //render icons
    renderIconShapes : function(component, event, helper) {
       var iconShapName = $(document.getElementById('profileModule').querySelectorAll('#iconShap'+component.get("v.randomNumber"))).text();
        $(document.getElementById('profileModule').querySelectorAll('#iconShapApproval'+component.get("v.randomNumber"))).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+iconShapName+'.png" alt="true'+iconShapName+'" />');
        $(document.getElementById('profileModule').querySelectorAll('#iconShapReject'+component.get("v.randomNumber"))).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+iconShapName+'.png" alt="false'+iconShapName+'" />');
        $(document.getElementById('profileModule').querySelectorAll('.legendIcon')).show();
        var iconArr = ["Circle", "Square", "Triangle"]; 
        if($(document.getElementById(event.getParam("tabName")).querySelectorAll(".spanLegend")).length === 1){
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".spanLegend")).text(iconArr[0]);
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+iconArr[0]+'.png" alt="true'+iconArr[0]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+iconArr[0]+'.png" alt="false'+iconArr[0]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).addClass('icon_'+iconArr[0]);
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).addClass('icon_'+iconArr[0]);
        }else if($(document.getElementById(event.getParam("tabName")).querySelectorAll(".spanLegend")).length === 2){
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".spanLegend")).eq(1).text(iconArr[1]);
           $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).eq(1).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+iconArr[1]+'.png" alt="true'+iconArr[1]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).eq(1).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+iconArr[1]+'.png" alt="false'+iconArr[1]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).eq(1).addClass('icon_'+iconArr[1]);
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).eq(1).addClass('icon_'+iconArr[1]);
        }else{
           $(document.getElementById(event.getParam("tabName")).querySelectorAll(".spanLegend")).eq(2).text(iconArr[2]);
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).eq(2).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+iconArr[2]+'.png" alt="true'+iconArr[2]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).eq(2).html('<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+iconArr[2]+'.png" alt="false'+iconArr[2]+'" />');
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendApproval")).eq(2).addClass('icon_'+iconArr[2]);
            $(document.getElementById(event.getParam("tabName")).querySelectorAll(".legendReject")).eq(2).addClass('icon_'+iconArr[2]);
        }
    },
    
    //adjust
    adjustInfoBlock : function(component, event, helper) {
        
        var colSizeName = event.getParam("colSizeName");
        var buttonName = event.getParam("buttonName");
        var moduleName = event.getParam("moduleName");
        var eventName = event.getParam("eventName");
       
        
     if(eventName === 'add'){
           if($(document.getElementsByClassName(colSizeName)).length > 1){ 
               $(document.getElementsByClassName(colSizeName)).each(function(){
                   if($(document.getElementsByClassName(colSizeName)).length === 2){
                        if($(this).hasClass('slds-size--3-of-4')){
                           $(document.getElementsByClassName(buttonName)).show();
                            $(this).removeClass('slds-size--3-of-4').addClass('slds-size--1-of-4');
                            if($(this).children().children().hasClass('slds-size--1-of-3')){
                                $(this).children().children().removeClass('slds-size--1-of-3').addClass('slds-size--1-of-1');
                            }
                        }
                        $(document.getElementsByClassName(buttonName)).show();
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).removeClass('slds-size--1-of-4').addClass('slds-size--2-of-4');
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).children().children().removeClass('slds-size--1-of-3').addClass('slds-size--1-of-2');
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).children().next().children().removeClass('slds-size--1-of-2').addClass('slds-size--2-of-2');
                    }
                    if($(document.getElementsByClassName(colSizeName)).length === 3){
                        if($(this).hasClass('slds-size--3-of-4')){
                            $(document.getElementsByClassName(buttonName)).show();
                            $(this).removeClass('slds-size--3-of-4').addClass('slds-size--1-of-4');
                             if($(this).children().children().hasClass('slds-size--1-of-3')){
                                $(this).children().children().removeClass('slds-size--1-of-3').addClass('slds-size--1-of-1');
                            }
                        }
                        if($(this).hasClass('slds-size--2-of-4')){
                            $(document.getElementsByClassName(buttonName)).show();
                            $(this).removeClass('slds-size--2-of-4').addClass('slds-size--1-of-4');
                            if($(this).children().children().hasClass('slds-size--1-of-2')){
                                $(this).children().children().removeClass('slds-size--1-of-2').addClass('slds-size--1-of-1');
                            }
                        }
                        $(document.getElementsByClassName(buttonName)).hide();
                       $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).removeClass('slds-size--2-of-4').addClass('slds-size--1-of-4');
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).children().children().removeClass('slds-size--1-of-2').addClass('slds-size--1-of-1');
                     }
                });
                
                
            } 
        }
        
       
           if(eventName === 'delete'){
            if($(document.getElementsByClassName(colSizeName)).length >= 1){
                $(document.getElementsByClassName(colSizeName)).each(function(){
                    if($(document.getElementsByClassName(colSizeName)).length === 1){
                        if($(this).hasClass('slds-size--1-of-4')){
                            $(document.getElementsByClassName(buttonName)).show();
                            $(this).removeClass('slds-size--1-of-4').addClass('slds-size--3-of-4');
                            if($(this).children().children().hasClass('slds-size--1-of-1')){
                                $(this).children().children().removeClass('slds-size--1-of-1').addClass('slds-size--1-of-3');
                                
                                $(this).children().next().children().removeClass('slds-size--1-of-3').addClass('slds-size--3-of-3');
                            }
                        } 
                        if($(this).hasClass('slds-size--2-of-4')){
                            $(document.getElementsByClassName(buttonName)).show();
                            $(this).removeClass('slds-size--2-of-4').addClass('slds-size--3-of-4');
                            if($(this).children().children().hasClass('slds-size--1-of-2')){
                                $(this).children().children().removeClass('slds-size--1-of-2').addClass('slds-size--1-of-3');
                                $(this).children().next().children().removeClass('slds-size--1-of-3').addClass('slds-size--3-of-3');
                            }
                        } 
                        if($(document.getElementById('showHide')).is(':checked')){
                            $(document.getElementById('showHide')).attr('checked', false);
                        }
                        
                    }if($(document.getElementsByClassName(colSizeName)).length === 2){
                        $(document.getElementsByClassName(buttonName)).show();
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).removeClass('slds-size--1-of-4').addClass('slds-size--2-of-4');
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).children().children().removeClass('slds-size--1-of-1').addClass('slds-size--1-of-2');
                        $(document.getElementsByClassName(colSizeName)).eq($(document.getElementsByClassName(colSizeName)).length - 1).children().next().children().removeClass('slds-size--1-of-2').addClass('slds-size--2-of-2');
                    }
                });
            }
        } 
    },
    
    //quick search 
    setQuickSearch : function(component, event, helper) {
        var moduleName = event.getParam("moduleName");
        var inputName = event.getParam("inputName");
        var template = event.getParam("template");
        var evtName = event.getParam("evtName");
          var searchVal = $.trim($(document.getElementById(inputName+'_search')).val());
        
        var getInnerText = function (element) {
            var nodes = element.childNodes,
                i = 0,
                len = nodes.length,
                text = '';
            for (; i < len; i++) {
                if (nodes[i].nodeType === 3 || nodes[i].nodeType === 4) {
                    text += nodes[i].nodeValue;
                } else {
                    text += getInnerText(nodes[i]);
                }
            }
            return text;
        };
        if(evtName === "search"){
            if(template !== undefined && template !== null && template !== []){
                $.each(template, function(key, objObj){
                    $.each(objObj.fields, function(id, val){
                        if(id !== 'FirstName' && id !== 'LastName'){
                            var theadName = getInnerText(document.getElementsByClassName(inputName+'-search-'+id)[0].querySelector('td'));
                        if(searchVal === ''){
                            val.isFiltered = true;
                            $.each(document.getElementsByClassName(inputName+'-search-'+id), function(ind, el){
                                el.classList.remove('hide-row');
                            });
                        }else{
                            theadName = theadName.toLowerCase();
                            searchVal = searchVal.toLowerCase();
                            if(theadName.includes(searchVal)){
                                val.isFiltered = true;
                                $.each(document.getElementsByClassName(inputName+'-search-'+id), function(ind, el){
                                    el.classList.remove('hide-row');
                                });
                            }else{
                                val.isFiltered = false;
                                $.each(document.getElementsByClassName(inputName+'-search-'+id), function(ind, el){
                                    el.classList.add('hide-row');
                                });
                            }
                        }
                        }
                        
                    });
                });
            }
            if(inputName === "profile" || inputName === "permissionset"){
                if($(document.getElementById(moduleName).querySelectorAll(".object-search")).length > 0){
                    var ProAndPerIdSplit0 = inputName;
                    if(searchVal !== ''){
                        $.each($(document.getElementById(moduleName).querySelectorAll(".object-search")), function(id, val){  
                            var ProAndPerId = $(this).attr('id');
                            ProAndPerIdSplit0 = $.trim(ProAndPerId.split('_id___')[0]);
                            var ProAndPerIdSplit1 = $.trim(ProAndPerId.split('_id___')[1]);
                            var objName = $(this).find('h2').text();
                            objName = objName.toLowerCase();
                            searchVal = searchVal.toLowerCase();
                            if(objName.includes(searchVal)){
                                $(this).removeClass('hide-row');
                                $(document.getElementById(moduleName).querySelectorAll('.data-table-'+ProAndPerIdSplit0+'_id___Object .chk-object-'+ProAndPerIdSplit1)).removeClass('hide-row');
                            }else{
                                $(this).addClass('hide-row');
                                $(document.getElementById(moduleName).querySelectorAll('.data-table-'+ProAndPerIdSplit0+'_id___Object .chk-object-'+ProAndPerIdSplit1)).addClass('hide-row');
                            }
                        });
                    }else{
                        $(document.getElementById(moduleName).querySelectorAll(".object-search")).removeClass('hide-row');
                        $(document.getElementById(moduleName).querySelectorAll('.data-table-'+ProAndPerIdSplit0+'_id___Object tr')).removeClass('hide-row');
                    }
                }
                if(inputName === "permissionset"){
                    if($(document.getElementById(moduleName).querySelectorAll("#table-permissionset_id___Assigned_User tr")).length > 0){   
                        if(searchVal !== ''){
                            $.each($(document.getElementById(moduleName).querySelectorAll("#table-permissionset_id___Assigned_User tr")), function(id, val){ 
                                var assignuser = $.trim($(this).find('td').text()); 
                                var assignusercls = '';
                                for (var i = 0; assignuser.indexOf(" ") >= 0; i++) { 
                                    assignuser = assignuser.replace(" ", "-");
                                }
                                assignusercls = assignuser;
                                assignuser = assignuser.toLowerCase();
                                searchVal = searchVal.toLowerCase();
                                if(assignuser.includes(searchVal)){
                                    $(this).removeClass('hide-row');
                                    $(document.getElementById(moduleName).querySelectorAll('.data-table-permissionset_id___Assigned_User .'+assignusercls)).removeClass('hide-row');
                                }else{
                                    $(this).addClass('hide-row');
                                    $(document.getElementById(moduleName).querySelectorAll('.data-table-permissionset_id___Assigned_User .'+assignusercls)).addClass('hide-row');
                                }
                                
                            }); 
                        }else{
                            $(document.getElementById(moduleName).querySelectorAll("#table-permissionset_id___Assigned_User tr")).removeClass('hide-row');
                            $(document.getElementById(moduleName).querySelectorAll('.data-table-permissionset_id___Assigned_User tr')).removeClass('hide-row');
                        }
                    }
                }
                
            }
            
            if(inputName === "user"){
                if($(document.getElementById(moduleName).querySelectorAll("#table-user_id___Permission_Sets tr")).length > 0){   
                    if(searchVal !== ''){
                        $.each($(document.getElementById(moduleName).querySelectorAll("#table-user_id___Permission_Sets tr")), function(id, val){
                            var permissionset = $.trim($(this).find('td').text());  
                            var permissionsetcls = permissionset.replace(/([~!@#$%^&*()+=`{}\[\]\|\\:;<>,.\/? ])+/g, '-');
                            permissionset = permissionset.toLowerCase();
                            searchVal = searchVal.toLowerCase();
                            if(permissionset.includes(searchVal)){
                                $(this).removeClass('hide-row');
                                $(document.getElementById(moduleName).querySelectorAll('.data-table-user_id___Permission_Sets .'+permissionsetcls)).removeClass('hide-row');
                            }else{
                                $(this).addClass('hide-row');
                                $(document.getElementById(moduleName).querySelectorAll('.data-table-user_id___Permission_Sets .'+permissionsetcls)).addClass('hide-row');
                            }
                            
                        });
                    }else{
                        $(document.getElementById(moduleName).querySelectorAll("#table-user_id___Permission_Sets tr")).removeClass('hide-row');
                        $(document.getElementById(moduleName).querySelectorAll('.data-table-user_id___Permission_Sets tr')).removeClass('hide-row');
                    }
                }
            }
        }
        
        if(evtName === "toggle"){
           var thisObj = event.getParam("thisObj");
            var templateDataId = thisObj.attr('id');
            var tableSection = '';
            var tableSectionArray = [];
            var tableSectionClass = '';
            var sectionForData = '';
            tableSection = thisObj.parent('div').attr('class');
            tableSectionArray = tableSection.split(' ');
            tableSectionClass = tableSectionArray[0];
            sectionForData = tableSectionClass.split('_id___');
            sectionForData = $.trim(sectionForData[1]);
            
            if(!template[sectionForData].isCollapsed){//expand
               $.each($(document.getElementsByClassName(tableSectionClass)),function(){
                $(this.querySelectorAll('table')).addClass('toggle-section-panel');  
                });
                template[sectionForData].isCollapsed = true;
                $(document.getElementById(moduleName).querySelectorAll('.collapse-'+sectionForData)).hide();
                $(document.getElementById(moduleName).querySelectorAll('.expand-'+sectionForData)).show();
            }else{ 
                template[sectionForData].isCollapsed = false;
               $.each($(document.getElementsByClassName(tableSectionClass)),function(){ 
                $(this.querySelectorAll('table')).removeClass('toggle-section-panel');  
                });
                $(document.getElementById(moduleName).querySelectorAll('.collapse-'+sectionForData)).show();
                $(document.getElementById(moduleName).querySelectorAll('.expand-'+sectionForData)).hide();
            }
        }
       
        $A.get("e.stivadmn:GetQuickSearchTemplate").setParams({"template": template, "moduleName":moduleName}).fire();
    },
    
    setGlobalOrg : function(component, event, helper) {
        $A.get("e.stivadmn:SetGlobalOrg").setParams({"globalOrg": component.get("v.globalConOrg")}).fire();
    },
    
    
    updateGlobalOrg : function(component, event, helper) {
        var isFound = false;
        var id = '';
        var userName = event.getParam("userName");
        var orgId = event.getParam("orgId");
        var instanceType = event.getParam("instanceType");
        var globalOrg = component.get("v.globalConOrg");
        var index = event.getParam("index");
        var moduleName = event.getParam("moduleName");
        var randomNumber = event.getParam("randomNumber");
        
        
        if(event.getParam("id") !== undefined){
            id = event.getParam("id");
        }
        
        $.each(globalOrg, function(idx, obj){
            if(obj.stivadmn__Organization_ID__c === orgId) {
                isFound = true;
            }
        });
        if(!isFound){
            globalOrg.push({"Id":id,"stivadmn__Organization_ID__c":orgId,"stivadmn__User_Name__c":userName,"stivadmn__Instance_Type__c":instanceType});
            component.set("v.globalConOrg", globalOrg);
            if(instanceType === "Sandbox"){
                userName +=' (Sand)';
            }
            $A.get("e.stivadmn:UpdatedGlobalOrg").setParams({
                "globalOrg": component.get("v.globalConOrg"), 
                "isRefreshOrg":true,
                "userName": userName, 
                "orgId":orgId,
                "instanceType": instanceType, 
                "id":id,
                "index" : index,
                "moduleName" : moduleName,
                "randomNumber" : randomNumber,
                "action" : "Add"
            }).fire();
        }else{
            $(document.getElementsByClassName('alert-success')).hide();
            $(document.getElementsByClassName('sameInstanceShow')).show();
            $(document.getElementsByClassName('msgCls')).html("<b>"+userName+"</b> already added.");
        }
    },
    
    UpdateGlobalOrgAfterDelete : function(component, event, helper) {
        var isFound = false;
        var id = '';
        var userName = '';
        var orgId = event.getParam("orgId");
        var instanceType = '';
        var globalOrg = event.getParam("allOrg");
        var index = '';
        var moduleName = '';
        var randomNumber = '';
        if(instanceType === "Sandbox"){
            userName +=' (Sand)';
        }
        component.set("v.globalConOrg", globalOrg);
        $A.get("e.stivadmn:UpdatedGlobalOrg").setParams({
            "globalOrg": component.get("v.globalConOrg"), 
            "isRefreshOrg":true,
            "userName": userName, 
            "orgId":orgId,
            "instanceType": instanceType, 
            "id":id,
            "index" : index,
            "moduleName" : moduleName,
            "randomNumber" : randomNumber,
            "action" : "Delete"
        }).fire();
    },
    
    showSettingEffect : function(component, event, helper) {
        var structure = $.parseJSON(event.getParam("structure"));
        var moduleName = event.getParam("moduleName");
        var appendComId = '';
        if(moduleName === 'userModule'){
            appendComId = 'user_id___';
        }
        if(moduleName === 'profileModule'){
            appendComId = 'profile_id___';
        }
        if(moduleName === 'permissionModule'){
            appendComId = "permissionset_id___";
        }
        $.each(structure, function(key, objObj){
            if(objObj.display){
                $.each(document.getElementById(moduleName).querySelectorAll('div .'+appendComId+''+key), function(ind, el){
                    el.classList.remove('section-field-hide');
                });
            }else{
                $.each(document.getElementById(moduleName).querySelectorAll('div.'+appendComId+''+key), function(ind, el){
                    el.classList.add('section-field-hide');
                });
            }
            $.each(objObj.fields, function(key1, objObj1){
                if(objObj1.display){
                    $.each(document.getElementById(moduleName).querySelectorAll('.setting-'+key1), function(ind, el){
                        el.classList.remove('section-field-hide');
                    });
                }else{
                    $.each(document.getElementById(moduleName).querySelectorAll('.setting-'+key1), function(ind, el){
                        el.classList.add('section-field-hide');
                    });
                }
            });
        });
        $A.get("e.stivadmn:GetQuickSearchTemplate").setParams({"template": structure,"moduleName":moduleName}).fire();
    },
    
    okformsg : function(component,event,helper){
         $(document.getElementsByClassName('sameInstanceShow')).hide();
    },
    
    getModuleTemplate :function(component,event,helper){
        $A.get("e.stivadmn:GetSettingTemplateData").setParams({"moduleName" : event.getParam("moduleName")}).fire();
    }, 
    
    
})