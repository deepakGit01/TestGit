({
    /*globals $*/
    //Get object fields detail
    getFiledLevelAccessibleDetails : function(component, event, helper) {
        var objectOrgMap = component.get("v.objNameMap");
        var layoutName = component.get("v.layoutName");
        var orgArray = component.get("v.profileArray");
        var profileArr = component.get("v.profileArr");
        var folder = 'SingleColor';
        var self = this;
        var action = component.get("c.getFieldsLevelDetails");
        action.setParams({
            "objNameMap" : objectOrgMap,
            "layoutName" : layoutName,
            "profileArray" : orgArray
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var mapKey = {};
            var idAttrMap = {};
            if (component.isValid() && state === "SUCCESS"){
                
                
                $(document.getElementById('profileModule').querySelectorAll('.loaderTr')).remove();
                $(document.getElementById('profileModule').querySelectorAll('#LayoutName')).removeAttr("disabled");
                $(document.getElementById('profileModule').querySelectorAll('.field-profile-cls')).removeAttr("disabled");
                $(document.getElementById('profileModule').querySelectorAll('#view-search')).removeAttr("readonly");
                var FieldLevelPermissions = response.getReturnValue().FieldLevelPermissions;
                component.set("v.viewCreateData",response.getReturnValue().ObjectDescribeDetail);
                component.set("v.permissionSetIds",response.getReturnValue().PermissionSet);
                var FieldAccessible = response.getReturnValue().FieldAccessible;
                var objDescribe = response.getReturnValue().ObjectDescribeDetail;
                var flag = true;
                var tbodyOfTable = '';
                var objectRefFieldsByLayout = {};
                var objectRefFieldsByProfile = {};
                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr')).remove();
                
                // Create structure
                $.each(objDescribe, function(orgId, objDesc){
                    if(objDesc.status === 'SUCCESS'){
                         var FLAELength = document.getElementById('profileModule').querySelectorAll('.edit-mode-field-permission');
                        for(var j = 0;j<FLAELength.length;j++){
                            if($(FLAELength[j]).hasClass('not-available-layout')){
                                FLAELength[j].classList.remove('not-available-layout');
                            }
                            
                        }
                        if(component.get('v.idAttrMap') != null){
                            for (var key in component.get('v.idAttrMap')) {
                                $(document.getElementsByClassName(key)).attr('id',component.get('v.idAttrMap')[key]);
                            }
                        }
                        if($(document.getElementById(orgId)).hasClass('not-available-layout')){
                            $(document.getElementById(orgId)).removeClass('not-available-layout');
                        }
                       
                        objDesc = objDesc.body;
                        objDesc = JSON.parse(objDesc);
                        $.each(objDesc.fields, function(ind, obj){
                            var field_Label = '';
                            var field_Label1 = obj.name;
                            field_Label = field_Label1;
                            var standardField = ['MasterRecordId', 'BillingStreet', 'BillingCity', 'BillingState', 'BillingPostalCode', 'BillingCountry', 'BillingLatitude', 'BillingLongitude', 'BillingGeocodeAccuracy', 'ShippingStreet', 'ShippingCity', 'ShippingState', 'ShippingPostalCode', 'ShippingCountry', 'ShippingLatitude', 'ShippingLongitude', 'ShippingGeocodeAccuracy', 'PhotoUrl', 'LastActivityDate', 'LastViewedDate', 'LastReferencedDate', 'JigsawCompanyId', 'IsClosed', 'HasSelfServiceComments', 'HasCommentsUnreadByOwner', 'LastName', 'FirstName', 'Salutation', 'OtherStreet', 'OtherCity', 'OtherState', 'OtherPostalCode', 'OtherCountry', 'OtherLatitude', 'OtherLongitude', 'OtherGeocodeAccuracy', 'MailingStreet', 'MailingCity', 'MailingState', 'MailingPostalCode', 'MailingCountry', 'MailingLatitude', 'MailingLongitude', 'MailingGeocodeAccuracy', 'EmailBouncedReason', 'EmailBouncedDate', 'IsEmailBounced', 'RecordTypeId', 'CommunityId', 'LastCommentDate', 'NumComments', 'VoteScore', 'VoteTotal', 'LastCommentId', 'ParentIdeaId', 'IsHtml', 'IsMerged', 'CreatorFullPhotoUrl', 'CreatorSmallPhotoUrl', 'CreatorName', 'Street', 'City', 'State', 'PostalCode', 'Country', 'Latitude', 'Longitude', 'GeocodeAccuracy', 'IsConverted', 'ConvertedDate', 'ConvertedAccountId', 'ConvertedContactId', 'ConvertedOpportunityId', 'IsUnreadByOwner', 'JigsawContactId', 'IsWon', 'ForecastCategory', 'HasOpportunityLineItem', 'FiscalQuarter', 'FiscalYear', 'Fiscal', 'HasOpenActivity', 'HasOverdueTask','StatusCode', 'IsDefault', 'IsReviewed', 'TimesUsed', 'PricebookEntryId', 'Id', 'IsDeleted', 'SystemModstamp'];
                            
                            if(standardField.indexOf(field_Label) === -1){
                                if(obj.type === 'reference'){
                                    objectRefFieldsByLayout[field_Label] = field_Label.split('Id')[0];
                                    objectRefFieldsByProfile[field_Label.split('Id')[0]] = field_Label;
                                }
                                if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr')).hasClass('chk-cls-'+field_Label)){
                                    var profileEdit = '';
                                    var profileRead = '';
                                    var fieldAccess = '';
                                    var layoutVisible = '';
                                    var layoutsVal = '';
                                    $.each(profileArr, function(i, proId){ 
                                        var ids = proId.split('-');
                                        var index = ids[2];
                                        var profile_org = ids[0]+'-'+ids[1];
                                        profileEdit = profileEdit + '&nbsp; &nbsp; &nbsp;<span class="chk-cls chk-icon clk-'+profile_org+' render-cls-'+profile_org+'__'+index+'" name="'+index+'"><span class="view-mode-fieldlevel not-avail">N/A</span></span>';
                                        fieldAccess = fieldAccess + '&nbsp; &nbsp; &nbsp;<span class="chk-cls chk-icon clk-'+profile_org+' render-cls-'+profile_org+'__'+index+'" name="'+index+'"><span class="view-mode-fieldlevel field-hide-select-layout not-avail">N/A</span></span>';
                                        profileRead = profileRead + '&nbsp; &nbsp; &nbsp;<span class="chk-cls chk-icon clk-'+profile_org+' render-cls-'+profile_org+'__'+index+'" name="'+index+'"><span class="view-mode-fieldlevel not-avail">N/A</span></span>';
                                        layoutVisible = layoutVisible + '&nbsp; &nbsp; &nbsp;<span class="chk-cls layout-visible-fill__'+index+' chk-icon clk-'+profile_org+' render-cls-'+profile_org+'__'+index+'" name="'+index+'"><span class="field-hide-select-layout not-avail view-mode-fieldlevel">N/A</span></span>';
                                        layoutsVal = layoutsVal + '&nbsp; &nbsp; &nbsp;<span class="chk-cls chk-icon field-accessible-na__'+index+' clk-'+profile_org+' clk-'+ids[1]+' render-cls-'+profile_org+'__'+index+'" name="'+index+'"><span class="field-hide-select-layout not-avail view-mode-fieldlevel">N/A</span></span>';
                                    });
                                    var tr = '<tr class="slds-hint-parent firstRow chk-cls-'+field_Label+' datarow"><td class="slds-truncate">'+obj.label+'</td><td class="slds-truncate">'+field_Label+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-security security-visible-'+field_Label+'">'+profileEdit+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-security security-readonly-'+field_Label+'">'+profileRead+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-accessible accessibility-edit-'+field_Label+'">'+layoutVisible+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-accessible accessibility-required-'+field_Label+'">'+layoutsVal+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-accessible accessibility-readonly-'+field_Label+'">'+layoutsVal+'</td>';
                                    tr = tr + '<td class="slds-text-align--center field-mapping mapping-'+field_Label+'">'+fieldAccess+'</td>';
                                    tr = tr + '</tr>';
                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody')).append(tr);
                                }
                            }
                        });
                    }else if(objDesc.status === 'FAIL'){
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurityTable tbody')).html('<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>');
                        var message = objDesc.errors[0].message;
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);
                    }
                });
                component.set('v.objectRefFieldsByLayout', objectRefFieldsByLayout);
                //create select drop down for section
                var layoutSectionsWithOrgId = {};
                var layoutSectionsOptionObj = {};
                var metaDataForUpdate = {};
                var layoutIds = {};
                $.each(FieldAccessible, function(orgId, accessObj){
                    if(accessObj.status === 'SUCCESS'){
                        var layoutSectionDetails = [];
                        var layoutSectionDropDown = '';
                        var layoutId = '';
                        //$(document.getElementById('profileModule').querySelectorAll('.edit-mode-field-permission-'+orgId)).attr("disabled", true);
                        if(typeof(accessObj.body) !== 'undefined'){
                            var FieldAccessible_details = JSON.parse(accessObj.body);
                            idAttrMap['edit-mode-field-permission-'+orgId] = orgId;
                            
                            if(FieldAccessible_details.size === 0){
                                $(document.getElementById(orgId)).addClass('not-available-layout');
                            }else{
                                if($(document.getElementById(orgId)).hasClass('not-available-layout')){
                                    $(document.getElementById(orgId)).removeClass('not-available-layout');
                                }
                            }
                            var records = FieldAccessible_details.records;
                            var metadataUpdate = {};
                            if(records.length > 0){
                                records = records[0];
                                var metadata = records.Metadata;
                                layoutId = records.Id;
                                
                                metadataUpdate = metadata;
                                $.each(metadataUpdate.layoutSections, function(ind, layoutSectionData){
                                    $.each(layoutSectionData.layoutColumns, function(indKey, layoutItemData){
                                        if(layoutSectionData.label !== 'Custom Links'){
                                            layoutItemData.layoutItems = [];
                                        }
                                    });
                                });
                                if(metadataUpdate.summaryLayout !== null){
                                    (metadataUpdate.summaryLayout).summaryLayoutStyle = null;
                                }
                                $.each(metadata.layoutSections, function(inds, layoutSections){
                                    if(layoutSections.label !== 'Custom Links' && layoutSections.label !== null){
                                        layoutSectionDetails[inds] = layoutSections.label;
                                        var valueSection = layoutSections.label;
                                        if(valueSection !== null){
                                            if(valueSection.indexOf(' ') > -1){
                                               valueSection = (layoutSections.label).replace(/\s/g, '_');
                                            }
                                            layoutSectionDropDown += '<option value='+valueSection+'>'+layoutSections.label+'</option>';   
                                        }
                                    }
                                });
                            }
                            var orgIdSection = orgId.split('-');
                            layoutSectionsOptionObj[orgIdSection[1]] = layoutSectionDropDown;
                            layoutSectionsWithOrgId[orgId] = layoutSectionDetails
                            metaDataForUpdate[orgId] = metadataUpdate;
                            layoutIds[orgId] = layoutId;
                            
                        }
                    }else if(accessObj.status === 'FAIL'){
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurityTable tbody')).html('<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>');
                        var message = accessObj.errors[0].message;
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);
                    }
                }); 
                component.set("v.metaDataForUpdate", metaDataForUpdate);
                component.set("v.layoutIds", layoutIds);
                component.set("v.layoutSectionsOptionObj", layoutSectionsOptionObj);
                
                
                // Fill field permissions
                $.each(objDescribe, function(orgId, objDesc){
                    if(objDesc.status === 'SUCCESS'){
                        objDesc = objDesc.body;
                        objDesc = JSON.parse(objDesc);
                        var profile_str = '';
                        profile_str = orgArray[orgId];
                        
                        $.each(objDesc.fields, function(ind, obj){
                            var field_Label = '';
                            field_Label = obj.name;
                            var profile_str_length = profile_str.split(",");
                            $.each(profile_str_length, function(indKey, obj1){
                                var profile_str_id = obj1;
                                $.each($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+field_Label+' .clk-'+profile_str_id+'-'+orgId)), function(i, objObj){
                                    var icon = '';
                                    if($(objObj).hasClass('render-cls-'+profile_str_id+'-'+orgId+'__1')){
                                        icon = '1';
                                    }else if($(objObj).hasClass('render-cls-'+profile_str_id+'-'+orgId+'__2')){
                                        icon = '2';
                                    }else if($(objObj).hasClass('render-cls-'+profile_str_id+'-'+orgId+'__3')){
                                        icon = '3';
                                    }
                                    var profileTrue = ''+icon;
                                    var profileFalse = icon+'-'+icon;
                                    var readAccess;
                                    var editAccess;
                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-required-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls accessibility-required-'+profile_str_id+'-'+orgId+'-sndsvr view-exact-accessible accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr " type="checkbox" id="accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                    mapKey['accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr '] = 'accessibility-required-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls view-exact-accessible accessibility-edit-'+profile_str_id+'-'+orgId+'-sndsvr  accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr " type="checkbox" id="accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label+'" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>&nbsp;&nbsp;<select id="layout-section-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="slds-select size-cls layout-section-'+profile_str_id+'-'+orgId+'-'+field_Label+'-layout layout-section-'+profile_str_id+'-'+orgId+'" style="height:1.2rem">'+layoutSectionsOptionObj[orgId]+'</select></span>');
                                   	mapKey['layout-section-'+profile_str_id+'-'+orgId+'-'+field_Label+'-layout'] = 'layout-section-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                    mapKey['accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr '] = 'accessibility-edit-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-readonly-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls view-exact-accessible accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr" type="checkbox" id="accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label+'" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                    mapKey['accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr'] = 'accessibility-readonly-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                    readAccess = '<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none"><label class="slds-checkbox" for="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls view-exact-accessible" type="checkbox" id="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" disabled="disabled" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>';
                                    editAccess = '<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none"><label class="slds-checkbox" for="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls view-exact-accessible" type="checkbox" id="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" disabled="disabled" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>';
                                    var flagOfperms = true;
                                    
                                    if((obj.name).indexOf('__c') > 0 || obj.permissionable){
                                        readAccess = '<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls readAccess-'+profile_str_id+'-'+orgId+'-sndsvr view-exact-accessible readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr" type="checkbox" id="readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>';
                                        mapKey['readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr'] = 'readAccess-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                        
                                        editAccess = '<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls editAccess-'+profile_str_id+'-'+orgId+'-sndsvr editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr view-exact-accessible" type="checkbox" id="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>';
                                        mapKey['editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'-sndsvr'] = 'editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label;
                                        
                                        flagOfperms = false;
                                    }
                                    if(flagOfperms){
                                        if(obj.updateable){
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html(editAccess); 
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-readonly-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html(readAccess);
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span id="final-accessible-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="field-accessible-final field-accessible-final-'+profile_str_id+'-'+orgId+'"><span class="hidden-field-access field-access-fill">Hidden</span></span>'); 
                                            
                                        }else{
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+profile_str_id+'-'+orgId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+profile_str_id+'-'+orgId+'" style="display:none;"><label class="slds-checkbox" for="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'"><input name="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="size-cls view-exact-accessible" type="checkbox" id="editAccess-'+profile_str_id+'-'+orgId+'-'+field_Label+'" disabled="disabled"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span id="final-accessible-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="field-accessible-final field-accessible-final-'+profile_str_id+'-'+orgId+'"><span class="hidden-field-access field-access-fill has-read-only">Hidden</span></span>');
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-readonly-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html(readAccess);
                                        }
                                    }else{
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html(editAccess); 
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-readonly-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html(readAccess);
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span id="final-accessible-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="field-accessible-final field-accessible-final-'+profile_str_id+'-'+orgId+'"><span class="hidden-field-access field-access-fill">Hidden</span></span>'); 
                                        
                                    }
                                    if((obj.name).indexOf('__c') > 0 || obj.permissionable){
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+field_Label+' .render-cls-'+profile_str_id+'-'+orgId+'__'+icon)).html('<span id="final-accessible-'+profile_str_id+'-'+orgId+'-'+field_Label+'" class="field-accessible-final field-accessible-final-'+profile_str_id+'-'+orgId+'"><span class="hidden-field-access field-access-fill final-hidden">Hidden</span></span>');
                                    }
                                });
                            });
                        });
                    }else if(objDesc.status === 'FAIL'){
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurityTable tbody')).html('<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>');
                        var message = objDesc.errors[0].message;
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);
                    }
                });
                
                // Fill profile security
                var fieldPermissionMap = {};
                $.each(FieldLevelPermissions, function(key, objResponse){
                    if(objResponse.status === 'SUCCESS'){
                        var FieldPerms = JSON.parse(objResponse.body);
                        if(JSON.parse(objResponse.body).totalSize !== 0){ 
                            $.each(FieldPerms.records, function(ind, obj){
                                var fieldObj = obj.Field;
                                var objName_field_level = '';
                                var fieldName = '';
                                
                                fieldObj = fieldObj.split('.');
                                objName_field_level = fieldObj[0];
                                fieldName = fieldObj[1];
                                if(fieldName in objectRefFieldsByProfile){
                                    fieldName = objectRefFieldsByProfile[fieldName];
                                }
                                fieldPermissionMap[obj.Parent.ProfileId+'-'+fieldName] = obj;
                                $.each($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+fieldName+' .clk-'+obj.Parent.ProfileId+'-'+key)), function(i, objObj){
                                    var icon = '';
                                    if($(objObj).hasClass('render-cls-'+obj.Parent.ProfileId+'-'+key+'__1')){
                                        icon = '1';
                                    }else if($(objObj).hasClass('render-cls-'+obj.Parent.ProfileId+'-'+key+'__2')){
                                        icon = '2';
                                    }else if($(objObj).hasClass('render-cls-'+obj.Parent.ProfileId+'-'+key+'__3')){
                                        icon = '3';
                                    }
                                    var profileTrue = ''+icon;
                                    var profileFalse = icon+'-'+icon;
                                    if(obj.PermissionsEdit){
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+obj.Parent.ProfileId+'-'+key+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+obj.Parent.ProfileId+'-'+key+'" style="display:none;"><label class="slds-checkbox" for="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"><input name="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="size-cls editAccess-'+obj.Parent.ProfileId+'-'+key+'-sndsvr  	editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr view-exact-accessible" type="checkbox" id="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>'); 
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span id="final-accessible-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="field-accessible-final field-accessible-final-'+obj.Parent.ProfileId+'-'+key+'"><span class="hidden-field-access field-access-fill">Hidden</span></span>'); 
                                        mapKey['editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr'] = 'editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName;
                                        
                                    }else{
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-visible-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+obj.Parent.ProfileId+'-'+key+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+obj.Parent.ProfileId+'-'+key+'" style="display:none;"><label class="slds-checkbox" for="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"><input name="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="size-cls editAccess-'+obj.Parent.ProfileId+'-'+key+'-sndsvr view-exact-accessible editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr " type="checkbox" id="editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span id="final-accessible-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="field-accessible-final field-accessible-final-'+obj.Parent.ProfileId+'-'+key+'"><span class="hidden-field-access field-access-fill has-read-only">Hidden</span></span>'); 
                                        mapKey['editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr'] = 'editAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName;
                                        
                                    }
                                    
                                    if(obj.PermissionsRead){
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-readonly-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+obj.Parent.ProfileId+'-'+key+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+obj.Parent.ProfileId+'-'+key+'" style="display:none;"><label class="slds-checkbox" for="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"><input name="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="size-cls readAccess-'+obj.Parent.ProfileId+'-'+key+'-sndsvr  readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr view-exact-accessible" type="checkbox" id="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                        mapKey['readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr'] = 'readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName;
                                        
                                    }else{
                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .security-readonly-'+fieldName+' .render-cls-'+obj.Parent.ProfileId+'-'+key+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+obj.Parent.ProfileId+'-'+key+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /><span><span class="edit-mode-fieldlevel edit-mode-'+obj.Parent.ProfileId+'-'+key+'" style="display:none;"><label class="slds-checkbox" for="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"><input name="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'" class="size-cls readAccess-'+obj.Parent.ProfileId+'-'+key+'-sndsvr view-exact-accessible readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr" type="checkbox" id="readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                        mapKey['readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName+'-sndsvr'] = 'readAccess-'+obj.Parent.ProfileId+'-'+key+'-'+fieldName;
                                        
                                    } 
                                });
                                
                            });
                        }
                    }else if(objResponse.status === 'FAIL'){
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurityTable tbody')).html('<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>');
                        var message = objResponse.errors[0].message;
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);
                    }
                    
                });
                
                component.set('v.fieldPermissionMap', fieldPermissionMap);
                
                //Fill layout accessible
                var metaDataObj = {};
                var fieldSectionObj = {};
                var fieldWithFieldItem = {};
                $.each(FieldAccessible, function(oId, accessObj){
                    if(accessObj.status === 'SUCCESS'){
                        if(typeof(accessObj.body) !== 'undefined'){
                            var FieldAccessible_details = JSON.parse(accessObj.body);
                            var records = FieldAccessible_details.records;
                            var metadataUpdate = {};
                            if(records.length > 0){
                                records = records[0];
                                var metadata = records.Metadata;
                                metaDataObj[oId] = metadata;
                                $.each(metadata.layoutSections, function(inds, layoutSections){
                                    var layoutColumns = layoutSections.layoutColumns;
                                    var sectionName = layoutSections.label;
                                    $.each(layoutColumns, function(ind, layoutItems){
                                        $.each(layoutItems.layoutItems, function(itemPos, objObjFields){
                                            var fieldName = '';
                                            var edit = 'false';
                                            var required = 'false';
                                            var readOnly = 'false';
                                            if(objObjFields != null && objObjFields.field != null){ 
                                                fieldName = objObjFields.field;
                                                if(objObjFields.behavior === 'Edit'){
                                                    edit = 'true';
                                                }else if(objObjFields.behavior === 'Required'){
                                                    edit = 'true';
                                                    required = 'true';
                                                }else if(objObjFields.behavior === 'Readonly'){
                                                    readOnly = 'true';
                                                }          
                                            }                                        
                                            fieldSectionObj[oId+'-'+fieldName] = sectionName;
                                            fieldWithFieldItem[oId+'-'+fieldName] = {"ItemPosition" : ind, "ItemData" : objObjFields};
                                            $.each($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .clk-'+oId)), function(i, objObj){
                                                var icon = '1';
                                                if($(objObj).hasClass('render-cls-'+oId+'__1')){
                                                    icon = '1';
                                                }else if($(objObj).hasClass('render-cls-'+oId+'__2')){
                                                    icon = '2';
                                                }else if($(objObj).hasClass('render-cls-'+oId+'__3')){
                                                    icon = '3';
                                                }
                                                var profileTrue = ''+icon;
                                                var profileFalse = icon+'-'+icon;
                                                var orgId = oId.split('-');
                                                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-edit-'+oId+'-'+fieldName+'"><input name="accessibility-edit-'+oId+'-'+fieldName+'" class="size-cls accessibility-edit-'+oId+'-'+fieldName+'-sndsvr accessibility-edit-'+oId+'-sndsvr view-exact-accessible" type="checkbox" id="accessibility-edit-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>&nbsp;&nbsp;<select id="layout-section-'+oId+'-'+fieldName+'" class="slds-select size-cls layout-section-'+oId+'-'+fieldName+'-layout layout-section-'+oId+'" style="height: 1.2rem">'+layoutSectionsOptionObj[orgId[1]]+'</select></span>');
                                                mapKey['layout-section-'+oId+'-'+fieldName+'-layout'] = 'layout-section-'+oId+'-'+fieldName;
                                                mapKey['accessibility-edit-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-edit-'+oId+'-'+fieldName;
                                                if(sectionName != null){
                                                    document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .render-cls-'+oId+'__'+icon+' select')[0].value = sectionName.replace(/\s/g, '_');
                                                }
                                                if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden')){
                                                    if(edit === 'true'){
                                                        if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') ){
                                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="editable-field-access field-access-fill">Editable</span>');  
                                                        }else{
                                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill has-read-only">Read-Only</span>'); 
                                                        }
                                                    }else{
                                                        if($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') ){
                                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill has-read-only">Read-Only</span>'); 
                                                        }
                                                    }
                                                }
                                                
                                                if(required === 'true'){
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-required-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-required-'+oId+'-'+fieldName+'"><input name="accessibility-required-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-required-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-required-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                    if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') && !$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden')){
                                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="required-field-access field-access-fill">Required</span>');  
                                                    }
                                                    mapKey['accessibility-required-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-required-'+oId+'-'+fieldName;
                                                }else{
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-required-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-required-'+oId+'-'+fieldName+'"><input name="accessibility-required-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-required-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-required-'+oId+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                    mapKey['accessibility-required-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-required-'+oId+'-'+fieldName;
                                                }
                                                
                                                if(readOnly === 'true'){
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-readonly-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-readonly-'+oId+'-'+fieldName+'"><input name="accessibility-readonly-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-readonly-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                    if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden'))
                                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill">Read-Only</span>');  
                                                    mapKey['accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-readonly-'+oId+'-'+fieldName;
                                                }else{
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-readonly-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-readonly-'+oId+'-'+fieldName+'"><input name="accessibility-readonly-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-readonly-'+oId+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                    mapKey['accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-readonly-'+oId+'-'+fieldName;
                                                }   
                                            });
                                        }); 
                                    });
                                });
                                
                            }  
                        }
                    }else if(accessObj.status === 'FAIL'){
                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurityTable tbody')).html('<tr><td colspan="8"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>');
                        var message = accessObj.errors[0].message;
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).show();
                        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error .notify-msg')).html(message);
                    }
                });   
                component.set("v.metadataWithOrgId", metaDataObj);
                component.set("v.fieldSection", fieldSectionObj);
                component.set("v.fieldWithFieldItem", fieldWithFieldItem);
            }
            component.set('v.keyMapForAttr',mapKey);
           // component.set('v.idAttrMap',idAttrMap);
           component.getEvent("setAttrIdInEditList").setParams({'idAttrMap':idAttrMap}).fire(); 
            
        });
        $A.enqueueAction(action);
    },
    
    //Layout change get object layout fields detail
    getFiledLayoutDetails : function(component, event, helper, layoutName) {
         var mapKey1 = {};
         var idAttrMap1 = {};
          
        var folder = 'SingleColor';
        var objectOrgMap = component.get("v.objNameMap");
        var proOrg = component.get('v.profileArray');
        var objOrgMap = component.get('v.objNameMap');
        component.set("v.layoutName", layoutName);
        var self = this;
        var action = component.get("c.getLayoutFieldsData");
        action.setParams({
            "layoutName" : layoutName,
            "ProfileMap" : proOrg,
            "objOrgMap" : objOrgMap
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                $(document.getElementById('profileModule').querySelectorAll('.dataImg')).remove();
                $(document.getElementById('profileModule').querySelectorAll('#LayoutName')).removeAttr("disabled");
                $(document.getElementById('profileModule').querySelectorAll('.field-access-fill')).html('Hidden');
                $(document.getElementById('profileModule').querySelectorAll('.field-hide-select-layout')).show();
                if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__1')){
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__1 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__1 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__1 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__1 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                
                if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__2')){
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__2 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__2 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__2 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__2 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                
                if($(document.getElementById('profileModule').querySelectorAll('span')).hasClass('layout-visible-fill__3')){
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__3 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.layout-visible-fill__3 .edit-mode-fieldlevel input')).attr('checked', false);
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__3 .view-mode-fieldlevel')).html('<img src="/resource/stivadmn__Icons/'+folder+'/1-1.png" alt="false" />');
                    $(document.getElementById('profileModule').querySelectorAll('.field-accessible-na__3 .edit-mode-fieldlevel input')).attr('checked', false);
                }
                
                //create select drop down for section
                var layoutSectionsWithOrgId = {};
                var layoutSectionsOptionObj = {};
                var metaDataForUpdate = {};
                var layoutIds = {};
                $.each(response.getReturnValue(), function(orgId, accessObj){
                    var layoutSectionDetails = [];
                    var layoutSectionDropDown = '';
                    var layoutId = '';
                    if(typeof(accessObj.body) !== 'undefined'){
                        var FieldAccessible_details = JSON.parse(accessObj.body);
                       idAttrMap1['edit-mode-field-permission-'+orgId] = orgId;
                      if(FieldAccessible_details.size === 0){
                            $(document.getElementById(orgId)).addClass('not-available-layout');
                        }else{
                            if($(document.getElementById(orgId)).hasClass('not-available-layout')){
                                $(document.getElementById(orgId)).removeClass('not-available-layout');
                            }
                        }
                        var records = FieldAccessible_details.records;
                        var metadataUpdate = {};
                        if(records.length > 0){
                            records = records[0];
                            var metadata = records.Metadata;
                            layoutId = records.Id;
                            metadataUpdate = metadata;
                            $.each(metadataUpdate.layoutSections, function(ind, layoutSectionData){
                                $.each(layoutSectionData.layoutColumns, function(indKey, layoutItemData){
                                    if(layoutSectionData.label !== 'Custom Links'){
                                        layoutItemData.layoutItems = [];
                                    }
                                });
                            });
                            if(metadataUpdate.summaryLayout !== null){
                                (metadataUpdate.summaryLayout).summaryLayoutStyle = null;
                            }
                            $.each(metadata.layoutSections, function(inds, layoutSections){
                                if(layoutSections.label !== 'Custom Links' && layoutSections.label !== null){
                                    layoutSectionDetails[inds] = layoutSections.label;
                                    layoutSectionDropDown += '<option value='+(layoutSections.label).replace(/\s/g, '_')+'>'+layoutSections.label+'</option>';   
                                }
                            });
                        }
                        var orgIdSection = orgId.split('-');
                        layoutSectionsOptionObj[orgIdSection[1]] = layoutSectionDropDown;
                        layoutSectionsWithOrgId[orgId] = layoutSectionDetails
                        metaDataForUpdate[orgId] = metadataUpdate;
                        layoutIds[orgId] = layoutId; 
                        $(document.getElementById('profileModule').querySelectorAll('.layout-section-'+orgId)).html(layoutSectionDropDown);
                    }
                }); 
                
                component.set("v.metaDataForUpdate", metaDataForUpdate);
                component.set("v.layoutIds", layoutIds);
                component.set("v.layoutSectionsOptionObj", layoutSectionsOptionObj);
                
                //layout field details
                var metaDataObj = {};
                var fieldSectionObj = {};
                var fieldWithFieldItem = {};
                $.each(response.getReturnValue(), function(oId, accessObj){
                    if(typeof(accessObj.body) !== 'undefined'){
                        var FieldAccessible_details = JSON.parse(accessObj.body);
                        var records = FieldAccessible_details.records;
                        var metadataUpdate = {};
                        if(records.length > 0){
                            records = records[0];
                            var metadata = records.Metadata;
                            metaDataObj[oId] = metadata;
                            var layoutIdChange = component.get("v.layoutIds");
                            layoutIdChange[oId] = records.Id;
                            component.set("v.layoutIds", layoutIdChange);
                            $.each(metadata.layoutSections, function(inds, layoutSections){
                                var layoutColumns = layoutSections.layoutColumns;
                                var sectionName = layoutSections.label;
                                $.each(layoutColumns, function(ind, layoutItems){
                                    $.each(layoutItems.layoutItems, function(itemPos, objObjFields){
                                        var fieldName = '';
                                        var edit = 'false';
                                        var required = 'false';
                                        var readOnly = 'false';
                                        if(objObjFields != null && objObjFields.field != null){ 
                                            fieldName = objObjFields.field;
                                            if(objObjFields.behavior === 'Edit'){
                                                edit = 'true';
                                            }else if(objObjFields.behavior === 'Required'){
                                                edit = 'true';
                                                required = 'true';
                                            }else if(objObjFields.behavior === 'Readonly'){
                                                readOnly = 'true';
                                            }          
                                        }                                        
                                        fieldSectionObj[oId+'-'+fieldName] = sectionName;
                                        fieldWithFieldItem[oId+'-'+fieldName] = {"ItemPosition" : ind, "ItemData" : objObjFields};
                                        $.each($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .clk-'+oId)), function(i, objObj){
                                            var icon = '1';
                                            if($(objObj).hasClass('render-cls-'+oId+'__1')){
                                                icon = '1';
                                            }else if($(objObj).hasClass('render-cls-'+oId+'__2')){
                                                icon = '2';
                                            }else if($(objObj).hasClass('render-cls-'+oId+'__3')){
                                                icon = '3';
                                            }
                                            var profileTrue = ''+icon;
                                            var profileFalse = icon+'-'+icon;
                                            var orgId = oId.split('-');
                                            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-edit-'+oId+'-'+fieldName+'"><input name="accessibility-edit-'+oId+'-'+fieldName+'" class="size-cls accessibility-edit-'+oId+'-sndsvr view-exact-accessible accessibility-edit-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-edit-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>&nbsp;&nbsp;<select id="layout-section-'+oId+'-'+fieldName+'" class="slds-select  layout-section-'+oId+'-'+fieldName+'-layout size-cls" style="height: 1.2rem">'+component.get("v.layoutSectionsOptionObj")[orgId[1]]+'</select></span>');
                                            mapKey1['layout-section-'+oId+'-'+fieldName+'-layout'] = 'layout-section-'+oId+'-'+fieldName;
                                            mapKey1['accessibility-edit-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-edit-'+oId+'-'+fieldName;
                                            document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-edit-'+fieldName+' .render-cls-'+oId+'__'+icon+' select')[0].value = sectionName.replace(/\s/g, '_');
                                            if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden')){
                                                if(edit === 'true'){
                                                    if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') ){
                                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="editable-field-access field-access-fill">Editable</span>');  
                                                    }else{
                                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill has-read-only">Read-Only</span>'); 
                                                    }
                                                }else{
                                                    if($(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') ){
                                                        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill has-read-only">Read-Only</span>'); 
                                                    }
                                                }
                                            }
                                            
                                            if(required === 'true'){
                                                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-required-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-required-'+oId+'-'+fieldName+'"><input name="accessibility-required-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-required-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-required-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('has-read-only') && !$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden')){
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="required-field-access field-access-fill">Required</span>');  
                                                }
                                                mapKey1['accessibility-required-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-required-'+oId+'-'+fieldName;
                                            }else{
                                                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-required-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-required-'+oId+'-'+fieldName+'"><input name="accessibility-required-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-required-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-required-'+oId+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                            	mapKey1['accessibility-required-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-required-'+oId+'-'+fieldName;
                                            }
                                            
                                            if(readOnly === 'true'){
                                                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-readonly-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileTrue+'.png" alt="True" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-readonly-'+oId+'-'+fieldName+'"><input name="accessibility-readonly-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-readonly-'+oId+'-'+fieldName+'" checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                                if(!$(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span span')).hasClass('final-hidden'))
                                                    $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .mapping-'+fieldName+' .render-cls-'+oId+'__'+icon+' span')).html('<span class="readonly-field-access field-access-fill">Read-Only</span>');  
                                            mapKey1['accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-readonly-'+oId+'-'+fieldName;
                                            }else{
                                                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelSecurity table tbody tr .accessibility-readonly-'+fieldName+' .render-cls-'+oId+'__'+icon)).html('<span class="view-mode-fieldlevel view-mode-'+oId+'"><img src="/resource/stivadmn__Icons/'+folder+'/'+profileFalse+'.png" alt="False" /></span><span class="edit-mode-fieldlevel edit-mode-'+oId+'" style="display:none;"><label class="slds-checkbox" for="accessibility-readonly-'+oId+'-'+fieldName+'"><input name="accessibility-readonly-'+oId+'-'+fieldName+'" class="size-cls view-exact-accessible accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr" type="checkbox" id="accessibility-readonly-'+oId+'-'+fieldName+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></span>');
                                            mapKey1['accessibility-readonly-'+oId+'-'+fieldName+'-sndsvr'] = 'accessibility-readonly-'+oId+'-'+fieldName;
                                            }   
                                        });
                                    }); 
                                });
                            });
                            
                        }  
                    }
                });   
                component.set("v.metadataWithOrgId", metaDataObj);
                component.set("v.fieldSection", fieldSectionObj);
                component.set("v.fieldWithFieldItem", fieldWithFieldItem);
                component.set('v.keyMapForAttr',mapKey1);
                //component.set('v.idAttrMap',idAttrMap1);
                component.getEvent("setAttrIdInEditList").setParams({'idAttrMap':idAttrMap1}).fire();        
            }
        });
        $A.enqueueAction(action);
    },    
    
    //Search filter on field
    viewFieldSearch : function(component){
        //var viewsearchVal = $('#view-search').val();
         var viewsearchVal = $(document.getElementById('view-search')).val();
        var viewCreateData = component.get("v.viewCreateData");
        $.each(viewCreateData, function(orgId, objDesc){
            objDesc = JSON.parse(objDesc.body);
            $.each(objDesc.fields, function(ind, obj){
                var field_Label = '';
                var field_Label1 = obj.name;
                field_Label = field_Label1;
                var standardField = ['MasterRecordId', 'BillingStreet', 'BillingCity', 'BillingState', 'BillingPostalCode', 'BillingCountry', 'BillingLatitude', 'BillingLongitude', 'BillingGeocodeAccuracy', 'ShippingStreet', 'ShippingCity', 'ShippingState', 'ShippingPostalCode', 'ShippingCountry', 'ShippingLatitude', 'ShippingLongitude', 'ShippingGeocodeAccuracy', 'PhotoUrl', 'LastActivityDate', 'LastViewedDate', 'LastReferencedDate', 'JigsawCompanyId', 'IsClosed', 'HasSelfServiceComments', 'HasCommentsUnreadByOwner', 'LastName', 'FirstName', 'Salutation', 'OtherStreet', 'OtherCity', 'OtherState', 'OtherPostalCode', 'OtherCountry', 'OtherLatitude', 'OtherLongitude', 'OtherGeocodeAccuracy', 'MailingStreet', 'MailingCity', 'MailingState', 'MailingPostalCode', 'MailingCountry', 'MailingLatitude', 'MailingLongitude', 'MailingGeocodeAccuracy', 'EmailBouncedReason', 'EmailBouncedDate', 'IsEmailBounced', 'RecordTypeId', 'CommunityId', 'LastCommentDate', 'NumComments', 'VoteScore', 'VoteTotal', 'LastCommentId', 'ParentIdeaId', 'IsHtml', 'IsMerged', 'CreatorFullPhotoUrl', 'CreatorSmallPhotoUrl', 'CreatorName', 'Street', 'City', 'State', 'PostalCode', 'Country', 'Latitude', 'Longitude', 'GeocodeAccuracy', 'IsConverted', 'ConvertedDate', 'ConvertedAccountId', 'ConvertedContactId', 'ConvertedOpportunityId', 'IsUnreadByOwner', 'JigsawContactId', 'IsWon', 'ForecastCategory', 'HasOpportunityLineItem', 'FiscalQuarter', 'FiscalYear', 'Fiscal', 'HasOpenActivity', 'HasOverdueTask', 'StatusCode', 'IsDefault', 'IsReviewed', 'TimesUsed', 'PricebookEntryId', 'Id', 'IsDeleted', 'SystemModstamp'];
                if(standardField.indexOf(field_Label) === -1){
                    //alert(field_Label);
                    var theadName = $(document.getElementsByClassName('chk-cls-'+field_Label)[0].querySelectorAll('td:nth-child(2)')).text();
                    if(viewsearchVal === ''){
                        $(document.getElementsByClassName('chk-cls-'+field_Label)).removeClass('hide-row');
                    }else{
                        theadName = theadName.toLowerCase();
                        viewsearchVal = viewsearchVal.toLowerCase();
                        if(theadName.includes(viewsearchVal)){
                            $(document.getElementsByClassName('chk-cls-'+field_Label)).removeClass('hide-row');
                        }else{
                            $(document.getElementsByClassName('chk-cls-'+field_Label)).addClass('hide-row');
                        }
                    }
                }
            });
        });
        if($(document.getElementsByClassName('view-table-search')[0].querySelectorAll('tbody tr')).not('.SearchMsg').length === $(document.getElementsByClassName('view-table-search')[0].querySelectorAll(' tbody .hide-row')).length){
            $(document.getElementsByClassName('view-table-search')[0].querySelectorAll('tbody .SearchMsg')).remove();
            $(document.getElementsByClassName('view-table-search')[0].querySelectorAll('tbody')).append('<tr class="SearchMsg"><td colspan="8" class="slds-text-align--center"><div class="" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No search result found.</b></div></td></tr>');
        }else{
            $(document.getElementsByClassName('view-table-search')[0].querySelectorAll('tbody .SearchMsg')).remove();
        }
        component.set("v.viewCreateData",viewCreateData);
    },
})