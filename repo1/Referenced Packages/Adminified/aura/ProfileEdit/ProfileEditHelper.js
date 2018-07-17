({
    /* globals $ */
    getSectionProfile : function(component, event){
        var objNameList = component.get("v.objectNameList");
        var objectPermissions = component.get("v.objectPermissions");
        var orgNameSpace = component.get("v.orgNameSpace");
        function getDateCoversion(myDate){
            var result;
            if($.type(myDate) === 'string' && myDate !== '' && myDate !== null){
                var a = $.trim(myDate).split(/[^0-9]/);
                var y = a[0];
                var m = a[1]-1;
                var d = a[2];
                var h = a[3];
                var mi = a[4];
                var s = a[5];
                return new Date(y,m,d,h,mi,s).toString().split('+')[0];
            }else{
                result = '&nbsp;';  
            }
            return result;
        }
        function selectItemByValue(elmnt, value){
            var optn;
            for(var i=0; i < elmnt.options.length; i++)
            {   
                if(elmnt.options[i].value === value) {
                    elmnt.selectedIndex = i;
                    optn = elmnt.options[i];
                    break;
                }
            }
            return optn;
        }
        var rno = component.get("v.randomNo");
        var profileStruct = component.get("v.profileStructure");
        var action = component.get("c.getProfileMetaAndPermissionSet");
        action.setParams({
            "orgId": component.get("v.orgId"),
            "profileId": component.get("v.profileId")         
        });
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                var permissionSet = response.getReturnValue().PermissionSet;
                var ProfileFields = response.getReturnValue().ProfileFields;
                var disabled = '';
                if(permissionSet.status === "SUCCESS"){
                    component.set("v.isCustomProfile", ($.parseJSON(permissionSet.body)).records[0].IsCustom);
                    if(!($.parseJSON(permissionSet.body)).records[0].IsCustom){
                        disabled = 'disabled="disabled"';
                    }
                }
                if(ProfileFields.status === "SUCCESS"){
                    var profileMeta = $.parseJSON(ProfileFields.body);
                    component.set("v.profileMeta", profileMeta);
                    var profileData = component.get("v.profileData");
                    component.set("v.resetProfileData", profileData);
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.addRow-edit-profile tr')).remove();
                    var i = 0;
                    
                    //$.each(profileStruct, function(sectionKey, sectionObj){
                    for(var sectionKey in profileStruct) {
                        var sectionObj = profileStruct[sectionKey];
                        var sectionTr = document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.addRow-edit-profile')[0];
                        var sectionRow   = sectionTr.insertRow(sectionTr.rows.length);
                        sectionRow.className = 'section-tr edit-toggle-section';
                        sectionRow.id = 'profile_edit___'+sectionKey;
						var sectionCell0  = sectionRow.insertCell(0);
                        sectionCell0.className = 'slds-col-rule--right textUppercase field-row-edit-section';
                        sectionCell0.colSpan = '3';
						sectionCell0.innerHTML = '<p class="slds-tile__title slds-truncate"><button class="slds-button slds-button--icon-container focus-none"><span class="expand edit-expand-'+sectionKey+'" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#right"></use></svg></span><span class="collapse edit-collapse-'+sectionKey+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#down"></use></svg></span></button> '+sectionObj.label+'</p>';
                        //$.each(sectionObj.fields, function(field, fieldVal){
                        for(var field in sectionObj.fields) {
                        	var fieldVal = sectionObj.fields[field];
                            var iconshp = 'iconShap'+component.get("v.randomNo");                                                               
                            var iconShapName = "";
                            iconShapName = $(document.getElementById('profileModule').querySelectorAll('#'+iconshp)).text();        
                            if(typeof profileData[field] !== 'undefined'){
                                var sectionCellElement0 = '';
								var sectionCellElement1 = '';
								var sectionCellElement2 = '';
                                if(profileData[field] === true){
									sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									sectionCellElement1 = '<span class="approval"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>';
                                }else  if(profileData[field] === false){
									sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									sectionCellElement1 = '<span class="reject"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+iconShapName+'.png" alt="false'+iconShapName+'" /></span>';
                                }else if(field === 'CreatedDate' || field === 'LastModifiedDate' || field === 'SystemModstamp' || field === 'LastViewedDate' || field === 'LastReferencedDate'){
                                    if(profileData[field] !== '' && profileData[field] !== null){
										sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									    sectionCellElement1 = getDateCoversion(profileData[field]);
                                    }else if(profileData[field] === '' && profileData[field] !== null){
									    sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									    sectionCellElement1 = profileData[field];
                                    }else{}
                                }else if($.trim(profileData[field]) === '' || $.trim(profileData[field]) === null){
									sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									sectionCellElement1 = '&nbsp;';
                                }else if(field === 'Description' && profileData[field] !== null){
                                    var desc = '';
                                    if((profileData[field]).length > 30 && (profileData[field]) !== null){
                                        desc = (profileData[field]).substring(0, 30);
										sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									    sectionCellElement1 = '<span title="'+profileData[field]+'">'+desc+'...'+'</span>';
                                    }else{
										sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									    sectionCellElement1 = profileData[field];
                                    }
                                }else{
									sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
									sectionCellElement1 = profileData[field];
                                }
                                
                                //fill last td
                                if(typeof profileMeta[field] !== 'undefined'){
                                    var sectionTrElement = document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.addRow-edit-profile')[0];
                                    var sectionTr   = sectionTrElement.insertRow(sectionTrElement.rows.length);
                                    sectionTr.className = 'edit-'+field+' edit-field-'+i+' edit-toggle-'+sectionKey;
                                    var sectionTd0  = sectionTr.insertCell(0);
                                    sectionTd0.className = 'textlowercase slds-text-align--right slds-col-rule--right';
                                    sectionTd0.width = '34%';
                                    sectionTd0.scope = 'col';
                                    sectionTd0.innerHTML = sectionCellElement0;
                                    var sectionTd1  = sectionTr.insertCell(1);
                                    sectionTd1.className = 'slds-col-rule--right';
                                    sectionTd1.width = '33%';
                                    sectionTd1.scope = 'col';
                                    sectionTd1.innerHTML = sectionCellElement1;
                                    var sectionTd2  = sectionTr.insertCell(2);
                                    sectionTd2.className = 'edit-'+field+' slds-col-rule--right';
                                    sectionTd2.width = '34%';
                                    sectionTd2.scope = 'col';
                                    switch(profileMeta[field].fieldType) {
                                        case 'picklist':
											sectionCellElement2 = '<select id="edit-'+field+'" class="slds-select size-cls sndsvr" disabled="disabled"><option>select</option></select>';
                                            sectionTd2.innerHTML = sectionCellElement2;
											$.each(profileMeta[field].fieldVal, function(ind, val){
                                                if(profileData[field] === val){
                                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).append('<option value='+val+' selected>'+val+'</option>');
                                                }else{
                                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).append('<option value='+val+'>'+val+'</option>');
                                                }
                                            });
                                            break;
                                        case 'datetime':
                                            if(profileData[field] !== '' && profileData[field] !== null){
												sectionCellElement2 = getDateCoversion(profileData[field]);
                                            }else if(profileData[field] === '' && profileData[field] !== null){
												sectionCellElement2 = profileData[field];
                                            }else{}
											sectionTd2.innerHTML = sectionCellElement2;
                                            break;
                                        case 'boolean':
                                            var isTrue = '';
                                            if(profileData[field] === true){
                                                isTrue = 'checked';
                                            }
											sectionCellElement2 = '<label class="slds-checkbox" for="edit-'+field+'"><input name="edit-'+field+'" class="size-cls sndsvr" type="checkbox" id="edit-'+field+'" '+isTrue+' /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">'+field+'</span></label>';
                                            sectionTd2.innerHTML = sectionCellElement2;
                                            break;
                                        default:
                                            if($.trim(profileData[field]) === '' || $.trim(profileData[field]) === null){
												sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text" value=""/>';
                                            }else{
												sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text" value="'+profileData[field]+'"/>';
                                            }
                                            sectionTd2.innerHTML = sectionCellElement2;
                                    } 
                                }  
                            }
                        }
                    }
                    
                    if(objNameList.length > 0){
                        var pIconshp = 'iconShap'+component.get("v.randomNo");
                        var PIconShapName = "";
                        PIconShapName = $(document.getElementById('profileModule').querySelectorAll('#'+pIconshp)).text();
                        var objectTr = '';
                        //$.each(objNameList, function(ind, obj){
                        for(var ind in objNameList) {
                        	var obj = objNameList[ind];
                            var objName = '';
                            var objForCls = obj;
                            
                            var headingTagText =selectItemByValue(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+component.get("v.randomNo"))[0],obj);
                            var headingTag = $(headingTagText).text();
                            headingTag = headingTag+' ('+obj+')';
                            if(headingTag.length > 60){
                                headingTag = headingTag.substring(0,60)+'...';
                            }
                            objectTr += '<tr class="datarow obj-field-row edit-toggle-Object"> <td class="textlowercase slds-text-align--left slds-col-rule--right" colspan="3" scope="col">&nbsp;&nbsp;&nbsp;<b title="'+headingTag+'">'+headingTag+'</b></td> </tr><tr><td class="textlowercase slds-text-align--left slds-col-rule--right objectLable edit-toggle-Object" colspan="3"><span><svg class="slds-icon slds-icon-text-default slds-icon--x-small" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Permissions</td></tr><tr class="'+objForCls+'_PermissionsRead_edit edit-toggle-Object" id=""> <td class="textlowercase slds-text-align--right slds-col-rule--right '+objForCls+'_PermissionsRead_edit_field '+objForCls+'_PermissionsRead_edit_fill edit-toggle-Object textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">Read</td><td class="'+objForCls+'_PermissionsRead_edit_view '+objForCls+'_PermissionsRead_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsRead_edit_update '+objForCls+'_PermissionsRead_edit_fill slds-col-rule--right" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsRead" name="'+objForCls+'_PermissionsRead_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr><tr class="'+objForCls+'_PermissionsCreate_edit edit-toggle-Object" id=""> <td class="'+objForCls+'_PermissionsRead_edit_field '+objForCls+'_PermissionsCreate_edit_fill textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">Create</td><td class="'+objForCls+'_PermissionsCreate_edit_view '+objForCls+'_PermissionsCreate_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsCreate_edit_update '+objForCls+'_PermissionsCreate_edit_fill slds-col-rule--right" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsCreate" name="'+objForCls+'_PermissionsCreate_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr><tr class="'+objForCls+'_PermissionsDelete_edit edit-toggle-Object" id=""> <td class="'+objForCls+'_PermissionsDelete_edit_field '+objForCls+'_PermissionsDelete_edit_fill textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">Delete</td><td class="'+objForCls+'_PermissionsDelete_edit_view '+objForCls+'_PermissionsDelete_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsDelete_edit_update '+objForCls+'_PermissionsDelete_edit_fill slds-col-rule--right" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsDelete" name="'+objForCls+'_PermissionsDelete_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr><tr class="'+objForCls+'_PermissionsEdit_edit edit-toggle-Object" id=""> <td class="'+objForCls+'_PermissionsEdit_edit_field '+objForCls+'_PermissionsEdit_edit_fill textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">Edit</td><td class="'+objForCls+'_PermissionsEdit_edit_view '+objForCls+'_PermissionsEdit_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsEdit_edit_update '+objForCls+'_PermissionsEdit_edit_fill" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsEdit" name="'+objForCls+'_PermissionsEdit_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr><tr class="'+objForCls+'_PermissionsModifyAllRecords_edit edit-toggle-Object" id=""> <td class="'+objForCls+'_PermissionsModifyAllRecords_edit_field '+objForCls+'_PermissionsModifyAllRecords_edit_fill textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">ModifyAll</td><td class="'+objForCls+'_PermissionsModifyAllRecords_edit_view '+objForCls+'_PermissionsModifyAllRecords_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsModifyAllRecords_edit_update '+objForCls+'_PermissionsModifyAllRecords_edit_fill slds-col-rule--right" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsModifyAllRecords" name="'+objForCls+'_PermissionsModifyAllRecords_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr><tr class="'+objForCls+'_PermissionsViewAllRecords_edit edit-toggle-Object" id=""> <td class="'+objForCls+'_PermissionsViewAllRecords_edit_field '+objForCls+'_PermissionsViewAllRecords_edit_fill textlowercase slds-text-align--right slds-col-rule--right" width="34%" scope="col">ViewAll</td><td class="'+objForCls+'_PermissionsViewAllRecords_edit_view '+objForCls+'_PermissionsViewAllRecords_edit_fill slds-col-rule--right" width="33%" scope="col"><span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span></td><td class="'+objForCls+'_PermissionsViewAllRecords_edit_update '+objForCls+'_PermissionsViewAllRecords_edit_fill slds-col-rule--right" width="33%" scope="col"><label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objForCls+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objForCls+'-PermissionsViewAllRecords" name="'+objForCls+'_PermissionsViewAllRecords_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label></td> </tr> ';
                        }
                        
                        $(document.getElementById('profile_edit___Object')).after(objectTr);
                        
                        //$.each(objectPermissions, function(objNameApi, objObj) {
                        for(var objNameApi in objectPermissions) {
                        	var objObj = objectPermissions[objNameApi];
                            objNameApi = objNameApi.split('-');
                            var objname = objNameApi[0];
                            //$.each(objObj, function(key, value) {
                            for(var key in objObj) {
                        	    var value = objObj[key];
                                if(value){
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('');
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('<label class="slds-checkbox"><input checked="true" class="size-cls objectPermissionDependency '+objname+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objname+'-'+key+'" name="'+objname+'_'+key+'_objectPermissions" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>');
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_view')[0]).html(' <span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                                }else{ 
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('');
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('<label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objname+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objname+'-'+key+'" name="'+objname+'_'+key+'_objectPermissions" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>');
                                    $(document.getElementsByClassName(objname+'_'+key+'_edit_view')[0]).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                                }
                            }
                        }
                    }
                    if(component.get("v.flag")){
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--success');
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).text('Profile edited successfully.');
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                        
                        setTimeout(function(){
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).hide();
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).text('');
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).removeClass('slds-theme--success');
                            
                        },5000);
                        setTimeout(function(){if(!component.get("v.isCustomProfile")){
                            $(document.getElementsByClassName('object-permissions-edit')).attr('disabled', true);
                        }},500);
                        $(document.getElementsByClassName('editBtn')).attr('disabled', false);
                        $(document.getElementsByClassName('resetBtn')).attr('disabled', false);
                        $(document.getElementsByClassName('save-btn')).html('Save');
                    }else{
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                        $(document.getElementsByClassName('edit-profile-layer-'+rno)).show();
                        $(document.getElementsByClassName('edit-profile-'+rno)).show();
                        $(document.getElementsByClassName('btn-'+rno)[0].querySelectorAll('.edit-profile-cls')).html('Edit');
                        if(!component.get("v.isCustomProfile")){
                            $(document.getElementsByClassName('object-permissions-edit')).attr('disabled', true);
                        }
                        
                    }
                }else if(response.getReturnValue().status === "FAIL"){
                    $(document.getElementsByClassName('btn-'+rno)[0].querySelectorAll('.edit-profile-cls')).html('Edit');
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                }else{
                    var error = 'Something went wrong';
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(error);
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                    $(document.getElementsByClassName('edit-profile-layer-'+rno)).show();
                    $(document.getElementsByClassName('edit-profile-'+rno)).show();
                    $(document.getElementsByClassName('btn-'+rno)[0].querySelectorAll('.edit-profile-cls')).html('Edit');
                }
                
                //set permission set Ids
                if(permissionSet.status === "SUCCESS"){
                    component.set("v.permissionSetId", $.parseJSON(permissionSet.body).records[0].Id);
                }
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    resetProfileEdit : function(component, event){
        function getDateCoversion(myDate){
            var result;
            if($.type(myDate) === 'string' && myDate !== '' && myDate !== null){
                var a = $.trim(myDate).split(/[^0-9]/);
                var y = a[0];
                var m = a[1]-1;
                var d = a[2];
                var h = a[3];
                var mi = a[4];
                var s = a[5];
                return new Date(y,m,d,h,mi,s).toString().split('+')[0];
            }else{
                result = '&nbsp;';  
            }
            return result;
        }
        var rno = component.get("v.randomNo");
        var profileStruct = component.get("v.profileStructure");
        var profileMeta = component.get("v.profileMeta");
        var profileData = component.get("v.resetProfileData");
        var objectPermissions = component.get("v.objectPermissions");
        $.each(profileStruct, function(sectionKey, sectionObj){
            $.each(sectionObj.fields, function(field, fieldVal){
                if(typeof profileData[field] !== 'undefined'){
                    if(typeof profileMeta[field] !== 'undefined'){
                        switch(profileMeta[field].fieldType) {
                            case 'picklist':
                                $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).val(profileData[field]);
                                break;
                            case 'datetime':
                                if(profileData[field] !== null && profileData[field] !== ''){
                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).val(getDateCoversion(profileData[field]));
                                }
                                else if(profileData[field] !== null && profileData[field] === ''){
                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).val(profileData[field]);
                                }
                                    else{}
                                break;
                            case 'boolean':
                                if(profileData[field] === true){
                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).prop( "checked", true );
                                }else{
                                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).prop( "checked", false );
                                }
                                break;
                            default:
                                $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('#edit-'+field)).val(profileData[field]);
                        }
                    }
                }
            });  
        }); 
        var disabled = '';
        if(component.get("v.isCustomProfile")){
            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.objectPermissionDependency')).prop( "checked", false );
            $.each(objectPermissions, function(objNameApi, objObj) {
                objNameApi = objNameApi.split('-');
                var objname = objNameApi[0];
                $.each(objObj, function(key, value) {
                    if(value){ 
                        $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('');
                        $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('<label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objname+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objname+'-'+key+'" name="'+objname+'_'+key+'_objectPermissions" '+disabled+' checked/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>');
                    }else{ 
                        $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('');
                        $(document.getElementsByClassName(objname+'_'+key+'_edit_update')[0]).html('<label class="slds-checkbox"><input class="size-cls objectPermissionDependency '+objname+'_object_perms_chk object-permissions-edit" type="checkbox" id="'+objname+'-'+key+'" name="'+objname+'_'+key+'_objectPermissions" '+disabled+'/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text"></span></label>');
                    }
                });
            });
        }
    },
})