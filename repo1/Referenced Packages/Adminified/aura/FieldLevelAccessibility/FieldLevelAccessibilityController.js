({
	/*globals $*/
    // On Load Script Loaded 
    jsLoad : function(component, event, helper) {
        $(document.getElementsByClassName('edit-field-icon')).html('');
        if($(document.getElementsByClassName('open-list-of-org')).hasClass('open-edit')){
            $(document.getElementsByClassName('open-list-of-org')).removeClass('open-edit');
            $(document.getElementsByClassName('open-list-of-org')).addClass('close-edit');
        }
        
        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.edit-mode-fieldlevel')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-fieldlevel')).show();
        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-footer')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.header-view-mode')).show();
        $(document.getElementById('profileModule').querySelectorAll('.header-edit-mode')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-layput')).show();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-org-legend')).show();
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity')).show();
        var loaderTr = '<tr class="loaderTr"><td colspan="8"><div class=" slds-container--center slds-spinner--small dataLoader " ><img src="/resource/stivadmn__SLDS0120/assets/images/spinners/slds_spinner_brand.gif" alt="Loading..." /> Loading. Please wait...</div></td></tr>';
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr')).remove();
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody')).append(loaderTr);
        helper.getFiledLevelAccessibleDetails(component, event, helper);
        
       $("body").click(function(evt){
           var flag = false;
           if($(evt.target).hasClass('edit-btn-cls')){
               flag = true;
           }else if($(evt.target).parent().hasClass('edit-btn-cls')){
               flag = true;
           } 
            if($(document.getElementById('profileModule').querySelectorAll('.open-list-of-org')).hasClass('open-edit') && !flag){
                $(document.getElementById('profileModule').querySelectorAll('.open-list-of-org')).removeClass('open-edit');
                $(document.getElementById('profileModule').querySelectorAll('.open-list-of-org')).addClass('close-edit');
            }
        }); 
        
        $('body').off('change', '#LayoutName');
        $('body').on('change', '#LayoutName', function(e) {
            
            var ett3 = new Date().getTime();
               if($(this).val() !== 'Select'){
                $(document.getElementById('LayoutName')).attr("disabled", true);
                 
                loaderTr = '<span class="dataImg"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>';
                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity .select-loader')).append(loaderTr);
                 if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__1')){
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__1 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__1 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__1 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__1 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__2')){
                 	$(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__2 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__2 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__2 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__2 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                
               if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__3')){
                	$(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__3 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__3 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__3 .view-mode-fieldlevel')).html('&nbsp;');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__3 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                
                $(document.getElementById('profileModule').querySelectorAll('.field-access-fill')).html('&nbsp;');
                var objDetails = document.querySelectorAll('.field-access-fill');
                var objDetail;
                for(var i=0;i<objDetails.length;i++){
                    objDetail = objDetails[i];
                    if(objDetail.classList.contains('has-read-only')){  
                    	$(objDetail).removeAttr('class'); 
                       $(objDetail).attr('class', 'hidden-field-access field-access-fill has-read-only');
                    }else{
                       $(objDetail).removeAttr('class');
                       $(objDetail).attr('class', 'hidden-field-access field-access-fill');
                    }
                }
               
                
                var id = $(this).val();
                id = id.split(',');
                var recordTypeId = id[0];
                var objName = id[1];
                var orgId = id[2];
                var lay = id[4];
                var layoutName = lay;
                     
                component.getEvent("getLayoutDetail").setParams({"layoutName" : layoutName}).fire();
               
            }    
        });
        
        $('body').off('click', '.edit-mode-field-permission');
        $('body').on('click', '.edit-mode-field-permission', function(e){
            var id = $(this).attr('id');
            $(document.getElementsByClassName('edit-field-icon')).html('');
            $(document.getElementsByClassName('open-list-of-org')).removeClass('open-edit');
            $(document.getElementsByClassName('open-list-of-org')).addClass('close-edit');
            
            $(this.querySelectorAll('.edit-field-icon')).html('<svg aria-hidden="true" class="slds-icon slds-icon--x-small" name="setup" style="fill: #0070d2;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#check"></use></svg>&nbsp;');
            $(document.getElementById('profileModule').querySelectorAll('.edit-mode-fieldlevel')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-fieldlevel')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.field-accessible-final')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.edit-mode-'+id)).show();
            $(document.getElementById('profileModule').querySelectorAll('.field-accessible-final-'+id)).show();
            $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-footer')).show();
            $(document.getElementById('profileModule').querySelectorAll('.save-field-permission')).attr('id', id);
            $(document.getElementById('profileModule').querySelectorAll('.header-view-mode')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.header-edit-mode')).show();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-layput')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-org-legend')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.org-name-which-edit')).html($(this).text());
            $(document.getElementsByClassName('edit-mode-fieldlevel-section')).show();
           for (var key in component.get('v.keyMapForAttr')) {
               var splitKey = key.split('-');
               var splitKL = splitKey.length;
               
               if(key.split('-')[splitKL-1] !=='layout'){
                   $(document.getElementsByClassName(key)).attr('name',component.get('v.keyMapForAttr')[key]);
               }
               $(document.getElementsByClassName(key)).attr('id',component.get('v.keyMapForAttr')[key]);
            }
            
            
        });
        
        $('body').off('click', '.cancel-field-permission');
        $('body').on('click', '.cancel-field-permission', function(e){
            $(document.getElementsByClassName('edit-field-icon')).html('');
            $(document.getElementById('profileModule').querySelectorAll('.edit-mode-fieldlevel')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-fieldlevel')).show();
            $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-footer')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.header-view-mode')).show();
            $(document.getElementById('profileModule').querySelectorAll('.header-edit-mode')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-layput')).show();
            $(document.getElementById('profileModule').querySelectorAll('.view-mode-org-legend')).show();
            $(document.getElementById('profileModule').querySelectorAll('.field-accessible-final')).show();
            
        });
        
        $('body').off('click', '.edit-btn-org-fieldlevelaccessible');
        $('body').on('click', '.edit-btn-org-fieldlevelaccessible', function(e){
            if($(document.getElementsByClassName('open-list-of-org')).hasClass('open-edit')){
                $(document.getElementsByClassName('open-list-of-org')).removeClass('open-edit');
                $(document.getElementsByClassName('open-list-of-org')).addClass('close-edit');
            }else{
                $(document.getElementsByClassName('open-list-of-org')).addClass('open-edit');
                $(document.getElementsByClassName('open-list-of-org')).removeClass('close-edit');
            }
        });
        
        
        $('body').off('click', '.view-exact-accessible');
        $('body').on('click', '.view-exact-accessible', function(e){
            var id = $(this).attr('id');
            var accessible = 'Hidden';
            id = id.split('-');
            var commonIdKey = id[id.length-3]+'-'+id[id.length-2]+'-'+id[id.length-1];
            if(id[0] === 'editAccess' && $('#editAccess-'+commonIdKey).is(':checked')){
            	$('#readAccess-'+commonIdKey).prop('checked', true);
            }else if(id[0] === 'readAccess' && !$('#readAccess-'+commonIdKey).is(':checked')){
              $('#editAccess-'+commonIdKey).prop('checked', false);
            }else if(id[0] === 'accessibility'){
                if(id[1] === 'edit' && !$('#accessibility-edit-'+commonIdKey).is(':checked')){
                	$('#accessibility-required-'+commonIdKey).prop('checked', false);
                    $('#accessibility-readonly-'+commonIdKey).prop('checked', false);
                    $('#accessibility-readonly-'+commonIdKey).prop('disabled', false);
                    $('#accessibility-required-'+commonIdKey).prop('disabled', false);
                }else if(id[1] === 'required' && $('#accessibility-required-'+commonIdKey).is(':checked')){
                    $('#accessibility-readonly-'+commonIdKey).prop('checked', false);
                    $('#accessibility-edit-'+commonIdKey).prop('checked', true);
                }else if(id[1] === 'readonly' && $('#accessibility-readonly-'+commonIdKey).is(':checked')){
                    $('#accessibility-required-'+commonIdKey).prop('checked', false);
                    $('#accessibility-edit-'+commonIdKey).prop('checked', true);
                }  
            }
            if($('#readAccess-'+commonIdKey).is(':checked')){
               accessible  = 'ReadOnly';
            }
            if($('#editAccess-'+commonIdKey).is(':checked')){
                accessible  = 'Editable';
            }
            if(accessible === 'Editable'){
                if($('#accessibility-edit-'+commonIdKey).is(':checked')){
                if($('#accessibility-required-'+commonIdKey).is(':checked')){
                	accessible  = 'Required';
                }else if($('#accessibility-readonly-'+commonIdKey).is(':checked')){
                 	accessible  = 'ReadOnly';
                }
                }else{
                    accessible  = 'Hidden';
                }
            }else if(accessible === 'ReadOnly' && !$('#accessibility-edit-'+commonIdKey).is(':checked')){
            	accessible  = 'Hidden';
            }
            if(accessible === 'Hidden'){
                $('#final-accessible-'+commonIdKey).html('<span class="hidden-field-access field-access-fill has-read-only">Hidden</span>');
            }else if(accessible === 'ReadOnly'){
                	if(!$('#editAccess-'+commonIdKey).is(':checked') && $('#editAccess-'+commonIdKey).prop('disabled')){
                       $('#accessibility-readonly-'+commonIdKey).prop('checked', true);
                        $('#accessibility-required-'+commonIdKey).prop('checked', false);
                        $('#accessibility-readonly-'+commonIdKey).prop('disabled', true);
                        $('#accessibility-required-'+commonIdKey).prop('disabled', true);
                    }
                $('#final-accessible-'+commonIdKey).html('<span class="readonly-field-access field-access-fill">Read-Only</span>');
            }else if(accessible === 'Editable'){
                $('#final-accessible-'+commonIdKey).html('<span class="editable-field-access field-access-fill">Editable</span>');
            }else if(accessible === 'Required'){
                $('#final-accessible-'+commonIdKey).html('<span class="required-field-access field-access-fill">Required</span>');
            }
            
        });

        $('body').off('click', '.refresh-field-level-accessibility');
        $('body').on('click', '.refresh-field-level-accessibility', function(e){
            component.getEvent("refreshFieldLevelAccessibility").setParams().fire();
        });
        
        $('body').off('click', '.save-field-permission');
        $('body').on('click', '.save-field-permission', function(e){
            var id = $(this).attr('id');
            $(this).text('Saving...');
            var orgId = id.split('-');
            var insertFieldPermissionsObj = {};
            var updateFieldPermissionsObj = {};
            var layoutSectionsObj = {};
            var objApiName = component.get('v.objNameMap')[orgId[1]];
            $.each($(document.getElementsByClassName('readAccess-'+id+'-sndsvr')), function(ind, editObj){  
                var fieldName = $(editObj).attr('id');
                var updateFieldPermissionObj = {};
                var insertFieldPermissionObj = {};
                var layoutSectionObj = {};
                fieldName = fieldName.split('-');
                var partialId = fieldName[1]+'-'+fieldName[2]+'-'+fieldName[3];
                if(fieldName[1]+'-'+fieldName[3] in component.get('v.fieldPermissionMap')){
                    var fieldPermissionObj = component.get('v.fieldPermissionMap')[fieldName[1]+'-'+fieldName[3]];
                    if(fieldPermissionObj.PermissionsEdit !== $(document.getElementById('editAccess-'+id+'-'+fieldName[3])).is(':checked') || fieldPermissionObj.PermissionsRead !== $(editObj).is(':checked')){
                    	updateFieldPermissionObj['PermissionsEdit'] = $(document.getElementById('editAccess-'+id+'-'+fieldName[3])).is(':checked');
                        updateFieldPermissionObj['PermissionsRead'] = $(editObj).is(':checked');
                        updateFieldPermissionsObj[fieldPermissionObj.Id] = JSON.stringify(updateFieldPermissionObj);
                    }
                }else{
                     if($(document.getElementById('editAccess-'+id+'-'+fieldName[3])).is(':checked') !== false || $(editObj).is(':checked') !== false){
                        var field_name = objApiName+'.'+fieldName[3];
                        if(fieldName[3] in component.get("v.objectRefFieldsByLayout")){
                            field_name = objApiName+'.'+component.get("v.objectRefFieldsByLayout")[fieldName[3]];
                        }
                        insertFieldPermissionObj['ParentId'] = $.parseJSON((component.get("v.permissionSetIds")[fieldName[1]]).body).records[0].Id;
                        insertFieldPermissionObj['SobjectType'] = objApiName;
                        insertFieldPermissionObj['Field'] = field_name;
                        insertFieldPermissionObj['PermissionsEdit'] = $(document.getElementById('editAccess-'+id+'-'+fieldName[3])).is(':checked');
                        insertFieldPermissionObj['PermissionsRead'] = $(editObj).is(':checked');
                        insertFieldPermissionsObj[fieldName[3]] = JSON.stringify(insertFieldPermissionObj);
                    }
                }
            });
            var metadataupdate = component.get('v.metaDataForUpdate')[id];
            $.each(metadataupdate.layoutSections, function(ind, layoutSectionData){
                $.each(layoutSectionData.layoutColumns, function(indKey, layoutItemData){
                    if(layoutSectionData.label !== 'Custom Links'){
                        layoutItemData.layoutItems = [];
                    }
                });
            });
            $.each($(document.getElementsByClassName('accessibility-edit-'+id+'-sndsvr')), function(ind, editObj){    
                if($(editObj).is(':checked')){
                    var editId = $(editObj).attr('id').split('accessibility-edit-')[1];
                    var operation = 'add';
                    var behavior = 'Edit';
                    var field = '';
                    if(editId in component.get('v.fieldSection')){
                        if((component.get('v.fieldSection')[editId]).replace(/\s/g, '_') ===  $(document.getElementById('layout-section-'+editId)).val()){
                            operation = 'update';
                        }else{
                            operation = 'updatewithSection';
                        }
                    }
                    if($(document.getElementById('accessibility-required-'+editId)).is(':checked')){
                        behavior  = 'Required';
                    }else if($(document.getElementById('accessibility-readonly-'+editId)).is(':checked')){
                        behavior  = 'Readonly';
                    }
                    field = editId.split('-')[2];
                    $.each(metadataupdate.layoutSections, function(inds, layoutSections){
                        if(layoutSections.label !== 'Custom Links' && layoutSections.label !== null){
                            if((layoutSections.label).replace(/\s/g, '_') === $(document.getElementById('layout-section-'+editId)).val()){    
                                $.each(layoutSections.layoutColumns, function(indKey, layoutItems){
                                    if((operation === 'add' || operation === 'updatewithSection') && indKey === 0){
                                        (layoutItems.layoutItems).push({"analyticsCloudComponent":null,"behavior":behavior,"canvas":null,"component":null,"customLink":null,"emptySpace":null,"field":field,"height":null,"page":null,"reportChartComponent":null,"scontrol":null,"showLabel":null,"showScrollbars":null,"width":null});
                                    }else if(operation === 'update' && (component.get('v.fieldWithFieldItem')[editId])['ItemPosition'] === indKey){
                                        var itemValue = (component.get('v.fieldWithFieldItem')[editId])['ItemData'];
                                        itemValue.behavior = behavior;
                                        itemValue.field = field;
                                        (layoutItems.layoutItems).push(itemValue);
                                    }
                                });
                            }
                        }
                    });
                }
            });
            component.getEvent("updateFieldPermisions").setParams({"updateFieldPermissionsObj" : JSON.stringify(updateFieldPermissionsObj), "insertFieldPermissionsObj" : JSON.stringify(insertFieldPermissionsObj), "layoutMetadata" : JSON.stringify({"Metadata" : metadataupdate}), "orgId" : orgId[1], "layoutId" : component.get('v.layoutIds')[id]}).fire();
            
        });
        
        $('body').off('keyup', '#view-search');
        $('body').on('keyup', '#view-search', function(e){
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.viewFieldSearch(component);
            }
        });
    },
    
    getLayoutDetailInfo : function(component, event, helper) {
        var layoutName = event.getParam('layoutName');
        helper.getFiledLayoutDetails(component, event, helper, layoutName);
    },
    
    updateFieldPermision : function(component, event, helper) {
       
        var action = component.get("c.updateFieldLevelAccessible");
            action.setParams({"updateFieldPermissionsObj" : event.getParam('updateFieldPermissionsObj'),
                              "insertFieldPermissionsObj" : event.getParam('insertFieldPermissionsObj'),
                              "orgId" : event.getParam('orgId'),
                              "layoutMetadata" : event.getParam('layoutMetadata'),
                              "layoutId" : event.getParam('layoutId')
                             });
            var self = this;
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    var insertFieldPermission = response.getReturnValue().insertFieldPermission;
                    var layoutPermission = response.getReturnValue().layoutPermission;
                    var status = true;
                    var message = '';
                    $.each(layoutPermission, function(layoutIds, responseLayout){
                        if(responseLayout.status === 'FAIL'){
                            status = false;
                            message = (responseLayout.errors[0]).message;
                        }
                    });
                    $.each(insertFieldPermission, function(fieldPerms, fieldPermission){
                        if(fieldPermission.status === 'FAIL'){
                            status = false;
                            $.each(fieldPermission.errors, function(fieldInd, fieldPermissionError){
                                message += fieldPermissionError.message;
                            });
                        }
                    });
                    $(document.getElementById('profileModule').querySelectorAll('.save-field-permission')).text('Save');
                    if(status){
                        $(document.getElementsByClassName('edit-field-icon')).html('');
                        $(document.getElementById('profileModule').querySelectorAll('.change-chk')).attr('checked', true);
                        $(document.getElementById('profileModule').querySelectorAll('.edit-mode-fieldlevel')).hide();
                        $(document.getElementById('profileModule').querySelectorAll('.view-mode-fieldlevel')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-footer')).hide();
                        $(document.getElementById('profileModule').querySelectorAll('.header-view-mode')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.header-edit-mode')).hide();
                        $(document.getElementById('profileModule').querySelectorAll('.view-mode-layput')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.view-mode-org-legend')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-accessible-final')).show();
                        var loaderTr = '<tr class="loaderTr"><td colspan="8"><div class=" slds-container--center slds-spinner--small dataLoader " ><img src="/resource/stivadmn__SLDS0120/assets/images/spinners/slds_spinner_brand.gif" alt="Loading..." /> Loading. Please wait...</div></td></tr>';
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr')).remove();
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody')).append(loaderTr);
                        
                        setTimeout(function(){$(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-success')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-success .notify-msg')).html('Successfully updated.');
                        setTimeout(function(){ $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-success')).hide(); }, 3000);}, 1000);
                        helper.getFiledLevelAccessibleDetails(component, event, helper);
                    }else{
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);   
                    }
                }
            });
            $A.enqueueAction(action);
    },
    
    refreshFields : function(component, event, helper) {
        $(document.getElementsByClassName('edit-field-icon')).html('');
        $(document.getElementById('profileModule').querySelectorAll('.change-chk')).attr('checked', true);
        $(document.getElementById('profileModule').querySelectorAll('.edit-mode-fieldlevel')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-fieldlevel')).show();
        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-footer')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.header-view-mode')).show();
        $(document.getElementById('profileModule').querySelectorAll('.header-edit-mode')).hide();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-layput')).show();
        $(document.getElementById('profileModule').querySelectorAll('.view-mode-org-legend')).show();
        $(document.getElementById('profileModule').querySelectorAll('.field-accessible-final')).show();
        var loaderTr = '<tr class="loaderTr"><td colspan="8"><div class=" slds-container--center slds-spinner--small dataLoader " ><img src="/resource/stivadmn__SLDS0120/assets/images/spinners/slds_spinner_brand.gif" alt="Loading..." /> Loading. Please wait...</div></td></tr>';
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr')).remove();
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody')).append(loaderTr);
        helper.getFiledLevelAccessibleDetails(component, event, helper);
    },
    
    
})