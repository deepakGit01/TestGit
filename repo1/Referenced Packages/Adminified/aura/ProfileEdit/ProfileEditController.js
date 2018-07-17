({ 
    /* globals $ */
    doInit : function(component, event, helper) {
        helper.getSectionProfile(component, event);
        $('body').on('change', 'select', function(){
            $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
            $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        
        $('body').on('keyup', 'input', function(){
            $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
            $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        
        $('body').on('click', 'input', function(){
            $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
            $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        
        $('body').off('click', '.objectPermissionDependency');
        $('body').on('click', '.objectPermissionDependency', function(){
            var Id = $(this).attr('id');
            Id = Id.split('-');
            var objName = Id[0];
            var objectPerms = Id[1];
            if(objectPerms === 'PermissionsRead' && !($(this).is(":checked"))){
                $(document.getElementsByClassName(objName+'_object_perms_chk')).prop('checked', false);
            }else if(objectPerms === 'PermissionsCreate' && $(this).is(":checked")){
                $(document.getElementById(objName+'-PermissionsRead')).prop('checked', true);
            }else if(objectPerms === 'PermissionsEdit' && $(this).is(":checked")){
                $(document.getElementById(objName+'-PermissionsRead')).prop('checked', true);
            }else if(objectPerms === 'PermissionsEdit' && !($(this).is(":checked"))){
                $(document.getElementById(objName+'-PermissionsDelete')).prop('checked', false);
                $(document.getElementById(objName+'-PermissionsModifyAllRecords')).prop('checked', false);
            }else if(objectPerms === 'PermissionsDelete' && $(this).is(":checked")){
                $(document.getElementById(objName+'-PermissionsRead')).prop('checked', true);
                $(document.getElementById(objName+'-PermissionsEdit')).prop('checked', true);
            }else if(objectPerms === 'PermissionsDelete' && !($(this).is(":checked"))){
                $(document.getElementById(objName+'-PermissionsModifyAllRecords')).prop('checked', false);
            }else if(objectPerms === 'PermissionsViewAllRecords' && $(this).is(":checked")){
                $(document.getElementById(objName+'-PermissionsRead')).prop('checked', true);
            }else if(objectPerms === 'PermissionsViewAllRecords' && !($(this).is(":checked"))){
                $(document.getElementById(objName+'-PermissionsModifyAllRecords')).prop('checked', false);
            }else if(objectPerms === 'PermissionsModifyAllRecords' && $(this).is(":checked")){
                $(document.getElementById(objName+'-PermissionsRead')).prop('checked', true);
                $(document.getElementById(objName+'-PermissionsEdit')).prop('checked', true);
                $(document.getElementById(objName+'-PermissionsDelete')).prop('checked', true);
                $(document.getElementById(objName+'-PermissionsViewAllRecords')).prop('checked', true);
            }
            
        });
        
        $('body').off('click', '.edit-toggle-section');
        $('body').on('click', '.edit-toggle-section', function(){
            var id = $(this).attr('id');
            id = id.split('___');
            id = id[1];
            if($(document.getElementsByClassName('edit-toggle-'+id)).hasClass('toggle-cls')){
                $(document.getElementsByClassName('edit-toggle-'+id)).removeClass('toggle-cls');
                $(document.getElementsByClassName('edit-expand-'+id)).hide();
                $(document.getElementsByClassName('edit-collapse-'+id)).show();
            }else{
                $(document.getElementsByClassName('edit-toggle-'+id)).addClass('toggle-cls');
                $(document.getElementsByClassName('edit-collapse-'+id)).hide();
                $(document.getElementsByClassName('edit-expand-'+id)).show();
            }
        });
    },
    
    closeProfileEdit : function(component, event, helper) {
        var rno = component.get("v.randomNo");
        $(document.getElementsByClassName('edit-profile-layer-'+rno)).remove();
        $(document.getElementsByClassName('edit-profile-'+rno)).remove();  
    },
    
    // confirmation
    profileConfirm : function(component, event, helper) {
        var rno = component.get("v.randomNo");
        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).hide();    
        if($(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).hasClass('slds-theme--success')){
            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).removeClass('slds-theme--success');
        }
        if($(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).hasClass('slds-theme--error')){
            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).removeClass('slds-theme--error');
        }
        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.confirm-box-profile')).show();
    },
    
    // confimation cancel
    profileCancel : function(component, event, helper) {
        var rno = component.get("v.randomNo");
        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.confirm-box-profile')).hide();
    },
    
    // reset btn
    profileReset : function(component, event, helper) {
        helper.resetProfileEdit(component, event);
    },
    
    profileSave : function(component, event, helper) {
        $(document.getElementsByClassName('save-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Saving...');
        $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', true);
        var rno = component.get("v.randomNo");
        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.confirm-box-profile')).hide();
        if($(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.sndsvr')).lenght === 0) return false;
        var dataToBeSend = {};
        var objVal = '';
        var objVal1 = '';
        var objId = '';
        var newObjId = '';
        var profileData1 = {};
        var profileName = component.get("v.profileName");
        var objectPermissions = component.get("v.objectPermissions");
        $.each($(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.sndsvr')).not(':disabled'), function(index, elementObj){    
            objVal = $.trim($(elementObj).val());
            objVal1 = $.trim($(elementObj).val());
            if(objVal === ''){
                objVal1 = null;
            }
            objId = $(elementObj).attr('id');
            if(objVal === 'on'){
                objVal = ""+$(elementObj).is(":checked")+"";
                objVal1 = $(elementObj).is(":checked");
                objId = objId.substr(5);
            }else{
                objId = objId.substr(5);
            }
            newObjId = $(elementObj).attr('id');
            newObjId = newObjId.substr(5);
            dataToBeSend[objId] = objVal; 
            profileData1[newObjId] = objVal1;
        });
        var data = JSON.stringify(dataToBeSend);
        var objectsForUpdate = {};
        var objectsForInsert = {};
        if(component.get("v.isCustomProfile")){
            $.each(component.get("v.objectNameList"), function(ind, obj){
                var objectForUpdate = {};
                var objectForInsert = {};
                var objectPermissionId = '';
                var flag = false;
                $.each(objectPermissions, function(objNameApi, objObj) {
                    objNameApi = objNameApi.split('-')
                    var objname = objNameApi[0];
                    if(objname === obj){
                        objectPermissionId = objNameApi[1];
                        flag = true;
                    }
                });
                
                if(flag){
                    objectForUpdate['PermissionsRead'] = $(document.getElementsByClassName(obj+'_PermissionsRead_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['PermissionsCreate'] = $(document.getElementsByClassName(obj+'_PermissionsCreate_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['PermissionsEdit'] = $(document.getElementsByClassName(obj+'_PermissionsEdit_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['PermissionsDelete'] = $(document.getElementsByClassName(obj+'_PermissionsDelete_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['PermissionsViewAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsViewAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['PermissionsModifyAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsModifyAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForUpdate['SobjectType'] = obj;
                    objectsForUpdate[objectPermissionId] = objectForUpdate;            
                }else{
                    objectForInsert['PermissionsRead'] = $(document.getElementsByClassName(obj+'_PermissionsRead_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['PermissionsCreate'] = $(document.getElementsByClassName(obj+'_PermissionsCreate_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['PermissionsEdit'] = $(document.getElementsByClassName(obj+'_PermissionsEdit_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['PermissionsDelete'] = $(document.getElementsByClassName(obj+'_PermissionsDelete_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['PermissionsViewAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsViewAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['PermissionsModifyAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsModifyAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                    objectForInsert['ParentId'] = component.get("v.permissionSetId");
                    objectForInsert['SobjectType'] = obj;
                    objectsForInsert[obj] = objectForInsert;
                }
                
            });
        }
        
        
        var orgId = component.get("v.orgId");
        var profileId = component.get("v.profileId");
        var randomNo = component.get("v.randomNo");
        var index = component.get("v.index");
        var action = component.get("c.updateProfileDetail");
        action.setParams({"profileObj": dataToBeSend,
                          "orgId" : orgId,
                          "profileId" : profileId,
                          "objectsPermissionsUpdate" : JSON.stringify(objectsForUpdate),
                          "objectsPermissionsInsert" : JSON.stringify(objectsForInsert),
                          "profileName" : profileName});
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                $(document.getElementsByClassName('edit-profile-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var profileInfo = component.get("v.profileData");
                var profileUpdateRes = (response.getReturnValue().ProfileUpdate).ProfilesDetail;
                var updatedObjPermRes = response.getReturnValue().UpdateObjectPermission;
                var insertedObjPermRes = response.getReturnValue().InsertObjectPermission;
                var error = '';
                if(profileUpdateRes.status === 'SUCCESS'){
                    $.each(profileData1, function(idx, itr){
                        profileInfo[idx] = itr;
                    });
                    component.set("v.flag", true);
                    objectPermissions = component.get("v.objectPermissions");
                    $.each(updatedObjPermRes, function(id, permObj){
                        if(permObj.status === 'SUCCESS'){
                            var objIdSplit = id.split('-');
                            objIdSplit = objIdSplit[1];
                            objectPermissions[id] = objectsForUpdate[objIdSplit];
                        }else if(permObj.status === 'FAIL'){
                            component.set("v.flag", false);
                            error = '';
                            error = error + '<p>'+permObj.errors[0].message+'</p>';
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(error);
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                            $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                            $(document.getElementsByClassName('save-btn')).html('Save');
                        }
                    });
                    $.each(insertedObjPermRes, function(objName, permObj){
                        if(permObj.status === 'SUCCESS'){
                            var insertId = ($.parseJSON(permObj.body)).id;
                            objectPermissions[objName+'-'+insertId] = objectsForInsert[objName];
                        }else if(permObj.status === 'FAIL'){
                            component.set("v.flag", false);
                            error = '';
                            error = error + '<p>'+permObj.errors[0].message+'</p>';
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(error);
                            $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                            $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                            $(document.getElementsByClassName('save-btn')).html('Save');
                        }
                    });
                    // re-arrange object permission object
                    $.each(objectPermissions, function(objNameApi, objObj) {
                        var flag = false;
                        $.each(objObj, function(key, value) {
                            if(value === true){
                                flag = true;
                            }
                        });
                        if(!flag){
                            delete objectPermissions[objNameApi];
                        }
                    });
                    component.set("v.objectPermissions", objectPermissions);
                    component.set("v.profileData", null);
                    component.set("v.profileData", profileInfo);
                    helper.getSectionProfile(component, event);
                    component.getEvent("ProfileAfterEditEvent").setParams({
                        "afterOrgId" : orgId,
                        "afterProfileId" : profileId,
                        "randomNo"  : randomNo,
                        "afterFlag" : true,
                        "index" : index
                    }).fire();
                }else if(profileUpdateRes.status === 'FAIL'){
                    error = '';
                    error = error + '<p>'+response.getReturnValue().ProfileUpdate.ProfilesDetail.errors[0].message+'</p>';
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(error);
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                    $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                    $(document.getElementsByClassName('save-btn')).html('Save');
                }else{
                    error = 'Something went wrong';
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(error);
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                    $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                    $(document.getElementsByClassName('save-btn')).html('Save');
                }
            }else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementsByClassName('edit-profile-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html(errors[0].message);
                        $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                    }
                }else{
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html('Unknow error.');
                    $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                    
                }
                $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                $(document.getElementsByClassName('save-btn')).html('Save');
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementsByClassName('edit-profile-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).addClass('slds-theme--error');
                $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.edit-profile-response')).html('Process aborted.');
                $(document.getElementsByClassName('edit-profile-'+rno)[0].querySelectorAll('.alert-profile-edit')).show();
                $(document.getElementsByClassName('forProfileEditDisable')).attr('disabled', false);
                $(document.getElementsByClassName('save-btn')).html('Save');
            }
        });
        $A.enqueueAction(action);
    },
})