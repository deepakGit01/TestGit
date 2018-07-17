({
    /* globals $ */
    doInit : function(component, event, helper) {
        helper.getSectionPermissionSet(component, event);
        $(document.getElementsByTagName('body')).on('change', 'select', function(){
            $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
            $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        $(document.getElementsByTagName('body')).on('keyup', 'input', function(){
            $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
            $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        $(document.getElementsByTagName('body')).on('click', 'input', function(){
           $(document.getElementsByClassName('editBtn')).removeAttr('disabled');
           $(document.getElementsByClassName('resetBtn')).removeAttr('disabled');
        });
        
        $(document.getElementsByTagName('body')).off('click', '.objectPermissionDependency');
        $(document.getElementsByTagName('body')).on('click', '.objectPermissionDependency', function(){
            var Id = this.getAttribute('id');
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
        
         $(document.getElementsByTagName('body')).off('click', '.edit-toggle-section');
         $(document.getElementsByTagName('body')).on('click', '.edit-toggle-section', function(){
           var id = this.getAttribute('id');
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
    
    closePermissionSetEdit : function(component, event, helper) {
        $(document.getElementsByClassName('edit-permissionset-layer')).remove();
        $(document.getElementsByClassName('edit-permissionset-section')).remove();
    },
    
    // Confirmation
    permissionSetConfirm : function(component, event, helper) {
       $(document.getElementsByClassName('alert-permissionset-edit')).hide();
        if($(document.getElementsByClassName('alert-permissionset-edit')).hasClass('slds-theme--success')){
            $(document.getElementsByClassName('alert-permissionset-edit')).removeClass('slds-theme--success');
        }
        if($(document.getElementsByClassName('alert-permissionset-edit')).hasClass('slds-theme--error')){
            $(document.getElementsByClassName('alert-permissionset-edit')).removeClass('slds-theme--error');
        }
        $(document.getElementsByClassName('confirm-box-permissionset')).show();
    },
    
    // confimation cancel
    permissionSetCancel : function(component, event, helper) {
       $(document.getElementsByClassName('confirm-box-permissionset')).hide();
    },
    
    // reset btn
    permissionSetReset : function(component, event, helper) {
        helper.resetPermissionSetEdit(component, event);
    },
    
    permissionSetSave : function(component, event, helper) {
        $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', true);
        $(document.getElementsByClassName('save-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Saving...');
        $(document.getElementsByClassName('confirm-box-permissionset')).hide();
        if($(document.getElementsByClassName('sndsvr')).lenght === 0) return false;
        
        var dataToBeSend = {};
        var objVal = '';
        var objId = '';
        var newObjVal = '';
        var newObjId = '';
        var newpermissionSetData = {};
        var objectPermissions = component.get("v.objectPermissions");
        $.each($(document.getElementsByClassName('sndsvr')).not(':disabled'), function(index, elementObj){
            objVal = $.trim($(elementObj).val());
            newObjVal = $.trim($(elementObj).val());
            if(objVal === ''){
                newObjVal = null;
            }
            if(objVal === 'on'){
                objVal = ""+$(elementObj).is(":checked")+"";
                newObjVal = $(elementObj).is(":checked");
            }
            objId = $(elementObj).attr('id');
            objId = objId.substr(5);
            newObjId = $(elementObj).attr('id');
            newObjId = newObjId.substr(5);
            dataToBeSend[objId] = objVal; 
            newpermissionSetData[newObjId] = newObjVal;
        });
        
        var objectsForUpdate = {};
        var objectsForInsert = {};
        
        $.each(component.get("v.objectNameList"), function(ind, obj){
            var objectForUpdate = {};
            var objectForInsert = {};
            var objectPermissionId = '';
            var flag = false;
            $.each(objectPermissions, function(objNameApi, objObj) {
                objNameApi = objNameApi.split('-');
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
                objectForInsert['PermissionsCreate'] =$(document.getElementsByClassName(obj+'_PermissionsCreate_edit_update')[0].querySelectorAll('input')).is(":checked");
                objectForInsert['PermissionsEdit'] = $(document.getElementsByClassName(obj+'_PermissionsEdit_edit_update')[0].querySelectorAll('input')).is(":checked");
                objectForInsert['PermissionsDelete'] = $(document.getElementsByClassName(obj+'_PermissionsDelete_edit_update')[0].querySelectorAll('input')).is(":checked");
                objectForInsert['PermissionsViewAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsViewAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                objectForInsert['PermissionsModifyAllRecords'] = $(document.getElementsByClassName(obj+'_PermissionsModifyAllRecords_edit_update')[0].querySelectorAll('input')).is(":checked");
                objectForInsert['ParentId'] = component.get("v.permissionSetId");
                objectForInsert['SobjectType'] = obj;
                objectsForInsert[obj] = objectForInsert;
            }
        });
        
        var data = JSON.stringify(dataToBeSend);
        var orgId = component.get("v.orgId");
        var permissionSetId = component.get("v.permissionSetId");
        var randomNo = component.get("v.randomNo");
        var index = component.get("v.index");
        var action = component.get("c.updatePermissionSetDetail");
        
        action.setParams({"permissionSetObj": dataToBeSend,
                          "orgId" : orgId,
                          "permissionSetId" : permissionSetId,
                          "objectsPermissionsUpdate" : JSON.stringify(objectsForUpdate),
                          "objectsPermissionsInsert" : JSON.stringify(objectsForInsert),});
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                $(document.getElementsByClassName('edit-permissionset-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var permissionSetUpdateRes = (response.getReturnValue().PermissionSetUpdate).PermissionSetDetail;
                var updatedObjPermRes = response.getReturnValue().UpdateObjectPermission;
                var insertedObjPermRes = response.getReturnValue().InsertObjectPermission;
                
                var error;
                if(permissionSetUpdateRes.status === 'SUCCESS'){
                    component.set("v.flag", true);
                    var permissionSetData = component.get("v.permissionSetData");
                    $.each(newpermissionSetData, function(idx, itr){
                        permissionSetData[idx] = itr;
                    });
                    
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
                           $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                            $(document.getElementsByClassName('edit-permissionset-response')).html(error);
                            $(document.getElementsByClassName('alert-permissionset-edit')).show();
                            $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
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
                             $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                            $(document.getElementsByClassName('edit-permissionset-response')).html(error);
                            $(document.getElementsByClassName('alert-permissionset-edit')).show();
                            $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
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
                    component.set("v.permissionSetData", null);
                    component.set("v.permissionSetData", permissionSetData);
                    helper.getSectionPermissionSet(component, event);
                    component.getEvent("PermissionSetAfterEditEvent").setParams({
                        "afterOrgId" : orgId,
                        "afterPermissionSetId" : permissionSetId,
                        "randomNo"  : randomNo,
                        "afterFlag" : true,
                        "index" : index
                    }).fire();
                }else if(permissionSetUpdateRes.status === 'FAIL'){
                    error = '';
                    error = error + '<p>'+permissionSetUpdateRes.errors[0].message+'</p>';
                   $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-permissionset-response')).html(error);
                    $(document.getElementsByClassName('alert-permissionset-edit')).show();
                    $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
                    $(document.getElementsByClassName('save-btn')).html('Save');
                }else{
                    error = 'Something went wrong';
                    $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-permissionset-response')).html(error);
                    $(document.getElementsByClassName('alert-permissionset-edit')).show();
                    $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
                    $(document.getElementsByClassName('save-btn')).html('Save');
                }
            }else if (state === "ERROR") {
                 $(document.getElementsByClassName('edit-permissionset-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
               
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                       $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                        $(document.getElementsByClassName('edit-permissionset-response')).html(errors[0].message);
                        $(document.getElementsByClassName('alert-permissionset-edit')).show();
                    }
                }else{
                   $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-permissionset-response')).html('Unknow Error');
                    $(document.getElementsByClassName('alert-permissionset-edit')).show();
                }
                $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
                $(document.getElementsByClassName('save-btn')).html('Save');
            }else if (state === "ABORTED") {
                $(document.getElementsByClassName('edit-permissionset-section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                 $(document.getElementsByClassName('alert-permissionset-edit')).addClass('slds-theme--error');
                 $(document.getElementsByClassName('edit-permissionset-response')).html('Process Aborted');
                 $(document.getElementsByClassName('alert-permissionset-edit')).show();
                 $(document.getElementsByClassName('forPermissionSetDisable')).attr('disabled', false);
                 $(document.getElementsByClassName('save-btn')).html('Save');
            } 
        });
        $A.enqueueAction(action); 
    },
})