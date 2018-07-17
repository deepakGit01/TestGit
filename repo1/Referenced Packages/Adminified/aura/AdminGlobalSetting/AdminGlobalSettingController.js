({
    /* globals $ */
    document : function(component, event, helper) {
        $(document.getElementsByClassName(component.get("v.moduleName")+'-loader')).block({ message:null });
        $(document.getElementsByClassName('blockOverlay')).html('<div id="loader"><div class="slds-spinner--small" style="display:inline-block; margin-right:15px"><img src="/resource/stivadmn__slds0120/assets/images/spinners/slds_spinner_brand.gif" /></div><span>Loading...</span></div>');
        $(document.getElementsByClassName(component.get("v.moduleName")+'_total_checked_items')).text('');
        var SectionData = component.get("v.settingTemplate");
        var temp = '';
        var ulli = "";
        var li="";
        var sectionHtml="";
        var settingTabName = component.get("v.settingTabName");
        $.each(SectionData, function(sectionKey, sectionObj){
            ulli = '';
            li='';
            sectionHtml='';
            $.each(sectionObj.fields, function(fieldKey, fieldObj){
                if(fieldKey !== 'FirstName' && fieldKey !== 'LastName'){
                    var chk = '';
                    if(fieldObj.display){
                        chk = 'checked';
                    }
                    li +='<li><span class="slds-text-align--left"><label class="slds-checkbox custom-chekbox"> <input name="checkbox" id="'+component.get("v.moduleName")+'_'+fieldKey+'" type="checkbox" '+chk+' class="maincheckboxsection fieldclass class_'+fieldKey+' '+sectionKey+'-field" value="'+sectionKey+'"><span class="slds-checkbox--faux"></span><span class="slds-form-element__label" title="'+fieldKey+'">'+fieldObj.label+'</span></label></span></li>';
                }
            });
            var chk1 = '';
            if(sectionObj.display){
                chk1 = 'checked';
            }
            ulli = '<ul class="setting_list">'+li+'</ul>';
            sectionHtml = '<span class="slds-text-align--left"><label class="slds-checkbox" style="display:inline"><input name="'+sectionKey+'" id="'+sectionKey+'" type="checkbox" '+chk1+' class="maincheckboxsection sectionchkclass section_'+sectionKey+'" value="'+sectionKey+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label"><strong>'+sectionObj.label+'</strong></span></label></span>'+ulli; 
            $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock"))).append(sectionHtml);
            $(document.getElementsByClassName('hide-div')).hide();
        });
        function fillTotalCheckedItems(){
            var totalItems =  $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock")+' input.fieldclass:checked')).length;
            $(document.getElementsByClassName(component.get("v.moduleName")+'_total_checked_items')).text(totalItems);
            if(($(document.getElementsByClassName(settingTabName)[0].querySelectorAll('input.fieldclass:checked')).length === $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock")+' .fieldclass')).length) && ($(document.getElementsByClassName(settingTabName)[0].querySelectorAll('input.sectionchkclass:checked')).length === $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock")+' .sectionchkclass')).length)){  
               $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.headerSection")+' .allcheckbox')).prop('checked', true);
            }else{
                $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.headerSection")+' .allcheckbox')).prop('checked', false);
            }
        }
        
        fillTotalCheckedItems();
        $('body').off('click','.'+component.get("v.headerSection")+' .allcheckbox');
        $('body').on('click','.'+component.get("v.headerSection")+' .allcheckbox',function(){
            if($(this).prop('checked')){
                $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock")+' .maincheckboxsection')).prop('checked', true); 
            }else{
                $(document.getElementsByClassName(settingTabName)[0].querySelectorAll('.'+component.get("v.settingBlock")+' .maincheckboxsection')).prop('checked', false); 
            } 
            fillTotalCheckedItems();
        });
        
        $('body').off('click','.'+settingTabName+' .'+component.get("v.settingBlock")+' .fieldclass');
        $('body').on('click','.'+settingTabName+' .'+component.get("v.settingBlock")+' .fieldclass',function(){
            fillTotalCheckedItems();
            if($('input.'+$(this).val()+'-field:checked').length > 0){
              $(document.getElementsByClassName('section_'+$(this).val())).prop('checked', true);
                
            }else{
                $(document.getElementsByClassName('section_'+$(this).val())).prop('checked', false);
            }  
        });
        
        $('body').off('click','.'+settingTabName+' .'+component.get("v.settingBlock")+' .sectionchkclass');
        $('body').on('click','.'+settingTabName+' .'+component.get("v.settingBlock")+' .sectionchkclass',function(i){
            if($(this).prop('checked')){
                
                $(document.getElementsByClassName($(this).val()+'-field')).prop('checked', true);
            }else{
                
                $(document.getElementsByClassName($(this).val()+'-field')).prop('checked', false); 
            }
            
            fillTotalCheckedItems();
        });
        
        $(document.getElementsByClassName(component.get("v.moduleName")+'-loader')).unblock();
        $(document.getElementsByClassName(component.get("v.settingTabName"))[0].querySelectorAll('.slds-grid')).show();
        $(document.getElementsByClassName(component.get("v.moduleName")+'_footer')).show();
        if(component.get("v.flag")){
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
            $(document.getElementsByClassName('local-setting-cls')).html('<span class="slds-icon__container slds-icon--"><svg aria-hidden="true" class="slds-button__icon slds-icon--" name=""><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#settings"></use></svg><span class="slds-assistive-text"></span></span><span class="slds-assistive-text">Settings</span>');
        }
         
        $(document.getElementsByClassName("model-append-remove")).show(); 
        if(component.get('v.settingTabName') !=='localUserSetting' && component.get('v.settingTabName') !=='localProfileSetting' && component.get('v.settingTabName') !=='localPermissionSetSetting' )
        {
            if($(document.getElementsByClassName('stivadmnSettingModule')[0].querySelectorAll('.common_scroll')).length){
                var h =  $(document.getElementsByClassName('settingHight')).height()-132; //scrollar = padding+header+footer
                $(document.getElementsByClassName('common_scroll')).height(0);
                $(document.getElementsByClassName('common_scroll')).height(h);
            }
        }
    },
    
    saveSetting : function(component, event, helper) {
        $(document.getElementsByClassName("close-model-"+component.get("v.moduleName"))).attr("disabled","disabled");
        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).attr("disabled","disabled");
        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).html('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>Saving...');
        var settingTemplate = component.get("v.settingTemplate");
        var settingTemplateForLocal = component.get("v.settingTemplateForLocal");
        if(settingTemplate !== null || settingTemplate !== undefined){
            $.each(settingTemplateForLocal, function(sectionKey, sectionObj){
                $.each(document.getElementsByClassName(event.getParam("settingTabName"))[0].querySelectorAll('.section_'+sectionKey),function(ex){
                    if($(this).prop('checked')){
                        sectionObj.display = true;
                    }else{
                        sectionObj.display = false;
                    }
                }); 
                $.each(sectionObj.fields, function(fieldKey, fieldObj){
                    $.each(document.getElementsByClassName(event.getParam("settingTabName"))[0].querySelectorAll('.class_'+fieldKey),function(ex){ 
                        if($(this).prop('checked')){
                            fieldObj.display = true;
                        }else{
                            fieldObj.display = false;
                        } 
                    });
                });
            });
            
            $.each(settingTemplate, function(sectionKey, sectionObj){
                sectionObj.isCollapsed = false;
                $.each(document.getElementsByClassName(event.getParam("settingTabName"))[0].querySelectorAll('.section_'+sectionKey),function(ex){ 
                    
                    if($(this).prop('checked')){
                        sectionObj.display = true;
                    }else{
                        sectionObj.display = false;
                    } 
                });
                $.each(sectionObj.fields, function(fieldKey, fieldObj){
                    fieldObj.isFiltered = true;
                    $.each(document.getElementsByClassName(event.getParam("settingTabName"))[0].querySelectorAll('.class_'+fieldKey),function(ex){   
                        if($(this).prop('checked')){
                            fieldObj.display = true;
                        }else{
                            fieldObj.display = false;
                        } 
                    });
                });
            });
            
            var structureForLocal = JSON.stringify(settingTemplateForLocal);
            var structure = JSON.stringify(settingTemplate);
            var action = component.get("c.updateSetting");
            
            action.setParams({
                "structure": structure,
                "moduleTemplate": event.getParam("moduleTemplate")
            });
            var self = this;
            action.setCallback(this, function(response){
                var state = response.getState();
                $(document.getElementsByClassName('setScrollPosition')).scrollTop(0);
                if (component.isValid() && state === "SUCCESS") {
                    if (response.getReturnValue().status === "SUCCESS") {
                        $(document.getElementsByClassName('alert-setting')).addClass('slds-theme--success');
                        $(document.getElementsByClassName('setting-response')).html(''+component.get("v.moduleName")+' settings are saved successfully.');
                        $(document.getElementsByClassName('alert-setting')).show();
                        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).removeAttr("disabled");	
                        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).html('Save');
                        $(document.getElementsByClassName("close-model-"+component.get("v.moduleName"))).attr("disabled",false);
                        setTimeout(function(){ 
                            $(document.getElementsByClassName('alert-setting')).hide();
                        }, 5000);
                        
                        component.getEvent("SetMainSetting").setParams({"structure": structureForLocal, "moduleName" : event.getParam("moduleName")}).fire();
                    }else if(response.getReturnValue().status === "FAIL"){
                        $(document.getElementsByClassName('alert-setting')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('setting-response')).text(response.getReturnValue().message);
                        $(document.getElementsByClassName('alert-setting')).show();
                        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).removeAttr("disabled");	
                        $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).html('Save');
                    }
                }else{
                    $(document.getElementsByClassName('alert-setting')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('setting-response')).text('Something is wrong, please try again.');
                    $(document.getElementsByClassName('alert-setting')).show();
                    $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).removeAttr("disabled");	
                    $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).html('Save');
                    
                }
                if(component.get("v.settingTabName") === 'Global'+component.get("v.moduleName")+'Setting'){
                    $(document.getElementById('settingsModule').querySelectorAll('.tab_Setting_module')).removeClass('pointer-event');
                    $(document.getElementsByClassName('adminifiedTabsUl')).removeClass('pointer-event'); 
                }
            });
            $A.enqueueAction(action);
        }else{
            $(document.getElementsByClassName("close-model-"+component.get("v.moduleName"))).attr("disabled",false);
            $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).removeAttr("disabled");	
            $(document.getElementsByClassName('save-btn-'+component.get("v.moduleName"))).html('Save');
        }
        
    },
    
})