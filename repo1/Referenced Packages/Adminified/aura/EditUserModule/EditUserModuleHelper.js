({
    /* globals $ */
    
   createUserScreen : function(component, event, helper){
        
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
        
        function getDateCoversion(myDate){
            var result;
            if(typeof myDate === 'string' && myDate !== '' && myDate !== null){
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
        //getting user roles...
        
        helper.getAlluserRole(component, event, helper);
        component.set("v.strUserName", component.get("v.userData").UserName);
        component.set("v.strProfileName", component.get("v.userData").ProfileName);
        component.set("v.randomNumber", component.get("v.randomNumber"));
        var userTemplateData = component.get("v.userTemplateData");
        var action = component.get("c.getUserMetaFields");
        var self = this;
        component.set("v.userData", component.get("v.userData"));
        action.setParams({
            "orgId": component.get("v.userData").OrgId
        });
        action.setCallback(this, function(response) {
            var userModMeta = {};
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                if(typeof response.getReturnValue().status !== 'undefined'){
                    if(response.getReturnValue().status === 'SUCCESS'){
                        var userMeta = {};
                        if(typeof response.getReturnValue().body  === 'string'){
                            userMeta = $.parseJSON(response.getReturnValue().body);
                        }
                        var userInfo = component.get("v.userInfo");
                        var i = 0;
                        if(userInfo.body !== undefined && typeof userInfo.body === 'string'){
                            userInfo = $.parseJSON(userInfo.body).records[0];
                        }
                        component.set("v.userMeta", userMeta);
                        component.set("v.userInfo", userInfo);
                        component.set("v.strUserName", userInfo['Username']);
                        component.set("v.strProfileName", userInfo['Profile'].Name);
                        $(document.getElementsByClassName('addRow-edit')).html('');
                        if(typeof userTemplateData === 'string'){
                            userTemplateData = $.parseJSON(userTemplateData);
                        }
                        var userRoleFlg = true;
                        var userLicenseFlg = true;
                        var userProfileFlg = true;
                        var edt = new Date();
                        
                        if( typeof userTemplateData === 'object'){
                            $.each(userTemplateData, function(sectionKey, sectionObj){
                                if(sectionKey !== 'Permission_Sets'){
                                    var sectionTr = document.getElementsByClassName('addRow-edit')[0];
                                    var sectionRow   = sectionTr.insertRow(sectionTr.rows.length);
                                    sectionRow.className = 'section-tr edit-toggle-section';

                                    sectionRow.id = ''+sectionKey;
                                    var sectionCell0  = sectionRow.insertCell(0);
                                    sectionCell0.className = 'slds-col-rule--right textUppercase field-row-edit-section';
                                    sectionCell0.colSpan = '3';
                                    sectionCell0.innerHTML = '<p class="slds-tile__title slds-truncate"><button type="button" class="slds-button slds-button--icon-container focus-none"><span class="expand edit-expand-'+sectionKey+'" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#right"></use></svg></span><span class="collapse edit-collapse-'+sectionKey+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#down"></use></svg></span></button> '+sectionObj.label+'</p>';
                                }
                                
                                $.each(sectionObj.fields, function(field, fieldVal){
                                   
                                    if((typeof userInfo[field] !== 'undefined' || typeof userInfo['Profile'][field] !== 'undefined' ) && field != 'Name'){
                                        var sectionCellElement0 = '<span class="slds-truncate thead-val">'+fieldVal.label+'</span>';
                                        var sectionCellElement1 = '';
                                        var sectionCellElement2 = '';                                        
                                        var iconshp = 'iconShap'+component.get("v.randomNumber");                                        
                                        var iconShapName = "";
                                        iconShapName = getInnerText(document.getElementById('userModule').querySelectorAll('#'+iconshp)[0]);
                                        if(userInfo[field] && typeof userInfo[field] === 'boolean'){
                                            sectionCellElement1 = '<span class="approval"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>';
                                        }else if(!userInfo[field] && typeof userInfo[field] === 'boolean'){
                                            sectionCellElement1 = '<span class="reject"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>';
                                        }else if(field === 'CreatedDate' || field === 'LastLoginDate' || field === 'LastPasswordChangeDate'){
                                            if(userInfo[field] !== null && userInfo[field] !== ''){
                                                sectionCellElement1 = getDateCoversion(userInfo[field]);
                                            }else if(userInfo[field] !== null && userInfo[field] === ''){
                                                sectionCellElement1 = userInfo[field];
                                            }else{}
                                            
                                        }else if(field === "UserRole" && userInfo['Profile']['UserLicense'].Name !== 'Chatter Free' && userInfo['Profile']['UserLicense'].Name !== 'Chatter External'){
                                            if(userInfo[field] !== null ){
                                                if(userInfo[field].Name !== ''){
                                                    sectionCellElement1 = userInfo[field].Name;
                                                }else{
                                                    sectionCellElement1 = 'None';
                                                }
                                            }else{
                                                sectionCellElement1 = 'None';
                                            }
                                        }else if(field === 'UserLicense'){
                                            sectionCellElement1 = userInfo['Profile'][field].Name;
                                        }else if(field === 'Profile'){
                                            sectionCellElement1 = userInfo['Profile'].Name;
                                        }else{
                                            
                                            if(userInfo[field] !== null){
                                                if(field === 'Username'){
                                                    var username = '';
                                                    if((userInfo[field]).length > 30 && (userInfo[field]) !== null){
                                                        username = (userInfo[field]).substring(0, 30);
                                                        sectionCellElement1 = '<span title="'+userInfo[field]+'">'+username+'...</span>';
                                                    }else{
                                                        sectionCellElement1 = userInfo[field];
                                                    }
                                                }else if(field === 'CompanyName'){
                                                    var companyName = '';
                                                    if((userInfo[field]).length > 30 && (userInfo[field]) !== null){
                                                        companyName = (userInfo[field]).substring(0, 30);
                                                        sectionCellElement1 = '<span title="'+userInfo[field]+'">'+companyName+'...</span>';
                                                    }else{
                                                        sectionCellElement1 = userInfo[field];
                                                    }
                                                }else if(field === 'FirstName'){
                                                    var FirstName = '';
                                                    if((userInfo[field]).length > 30 && (userInfo[field]) !== null){
                                                        FirstName = (userInfo[field]).substring(0, 30);
                                                        sectionCellElement1 = '<span title="'+userInfo[field]+'">'+FirstName+'...</span>';
                                                    }else{
                                                        sectionCellElement1 = userInfo[field];
                                                    }
                                                }else if(field === 'LastName'){
                                                    var LastName = '';
                                                    if((userInfo[field]).length > 30 && (userInfo[field]) !== null){
                                                        LastName = (userInfo[field]).substring(0, 30);
                                                        sectionCellElement1 = '<span title="'+userInfo[field]+'">'+LastName+'...</span>';
                                                    }else{
                                                        sectionCellElement1 = userInfo[field];
                                                    }
                                                }else{
                                                    if(field !=='Name'){
                                                        sectionCellElement1 = userInfo[field];
                                                    }
                                                }
                                            }else{
                                                if(field !=='Name'){
                                                    sectionCellElement1 = '&nbsp;';
                                                }
                                            }
                                            
                                        }
                                        
                                        //fill last td
										var sectionTrElement = document.getElementsByClassName('addRow-edit')[0];
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
                                        if(field === "Username"){
                                            sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text"  value="'+userInfo[field]+'"/>';
                                            sectionTd2.innerHTML = sectionCellElement2;
                                        }else if(field === "FirstName"){
                                            if(userInfo[field] !== null){
                                                sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text"  value="'+userInfo[field]+'"/>';
                                            }else{
                                                sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text"  value="'+userInfo[field]+'"/>';
                                            }
                                            sectionTd2.innerHTML = sectionCellElement2;
                                        }else if(field === "LastName"){
                                            if(userInfo[field] !== null){
                                                sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text"  value="'+userInfo[field]+'"/>';
                                            }else{
                                                sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text"  value="'+userInfo[field]+'"/>';
                                            }
                                            sectionTd2.innerHTML = sectionCellElement2;
                                        }else if(field === "Email"){
                                            component.set('v.holdEmail',userInfo[field]);
                                            sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text" value="'+userInfo[field]+'"/>';
                                            sectionTd2.innerHTML = sectionCellElement2;
                                        }else{
                                            $.each(userMeta.fields, function(idx, itr){
                                                if(itr.name === field || itr.name === 'UserRoleId' || itr.name === 'ProfileId'){
                                                    switch(itr.type) {
                                                        case 'picklist':
                                                            sectionCellElement2 = '<select id="edit-'+field+'" class="slds-select size-cls sndsvr"></select>';
                                                            sectionTd2.innerHTML = sectionCellElement2;
                                                            $.each(itr.picklistValues, function(ikey, val){
                                                                if(userInfo[field] === val.value){
                                                                    $(document.getElementById('edit-'+field)).append('<option value='+val.value+' selected>'+val.label+'</option>');
                                                                }else{
                                                                    $(document.getElementById('edit-'+field)).append('<option value='+val.value+'>'+val.label+'</option>');
                                                                }
                                                            });
                                                            break;
                                                        case 'datetime':
                                                            if(userInfo[field] !== '' && userInfo[field] !== null){
                                                                sectionCellElement2 = getDateCoversion(userInfo[field]);
                                                            }else if(userInfo[field] === '' && userInfo[field] !== null){
                                                                sectionCellElement2 = userInfo[field];
                                                            }else{}
                                                            sectionTd2.innerHTML = sectionCellElement2;
                                                            break;
                                                        case 'boolean':
                                                            var isTrue = '';
                                                            if(userInfo[field] === true){
                                                                isTrue = 'checked';
                                                            }
                                                            sectionCellElement2 = '<label class="slds-checkbox" for="edit-'+field+'"><input name="edit-'+field+'" class="size-cls sndsvr" type="checkbox" id="edit-'+field+'" '+isTrue+' /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">'+field+'</span></label>';
                                                            sectionTd2.innerHTML = sectionCellElement2;
                                                            break;
                                                        case 'reference':
                                                            
                                                            if(field ==='UserRole' && userRoleFlg && userInfo['Profile']['UserLicense'].Name !== 'Chatter Free' && userInfo['Profile']['UserLicense'].Name !== 'Chatter External'){
                                                                userRoleFlg = false;
                                                                sectionCellElement2 = '<select id="edit-'+itr.name+'" class="slds-select size-cls sndsvr"><option value="000000000000000">None</option></select>';
                                                                sectionTd2.innerHTML = sectionCellElement2;
                                                                var userRoleflg = false;
                                                                $.each(component.get('v.userRoles'), function(ikey, val){
                                                                    if(userInfo[field] !== null){
                                                                        if(userInfo[field].Name === val.Name){
                                                                            $(document.getElementById('edit-'+itr.name)).append('<option value='+val.Id+' selected>'+val.Name+'</option>');
                                                                            userRoleflg = true;
                                                                        }else{
                                                                            $(document.getElementById('edit-'+itr.name)).append('<option value='+val.Id+'>'+val.Name+'</option>');
                                                                        } 
                                                                    }else{
                                                                        $(document.getElementById('edit-'+itr.name)).append('<option value='+val.Id+'>'+val.Name+'</option>');
                                                                    }    
                                                                }); 
                                                                if(!userRoleflg){
                                                                    $(document.getElementsByClassName('edit-'+field)[0].querySelectorAll('select')).val("000000000000000");
                                                                }
                                                            }
                                                            if(field === 'UserLicense' && userLicenseFlg){
                                                                userLicenseFlg = false;
                                                                sectionCellElement2 = '<select id="edit-UserLicenseId" class="slds-select size-cls sndsvr"></select>';
                                                                sectionTd2.innerHTML = sectionCellElement2;
                                                                $.each(component.get('v.UserLicenses'), function(ikey, val){
                                                                    if(userInfo['Profile'][field] !== null){
                                                                        if(userInfo['Profile'][field].Name === val.Name){
                                                                            $(document.getElementById('edit-UserLicenseId')).append('<option value='+val.Id+' selected>'+val.Name+'</option>');
                                                                        }else{
                                                                            $(document.getElementById('edit-UserLicenseId')).append('<option value='+val.Id+'>'+val.Name+'</option>');
                                                                        } 
                                                                    }  
                                                                }); 
                                                            }
                                                            if(field === 'Profile' && userProfileFlg){
                                                                userProfileFlg = false;
                                                                sectionCellElement2 = '<select id="edit-ProfileId" class="slds-select size-cls sndsvr"></select>';
                                                                sectionTd2.innerHTML = sectionCellElement2;
                                                                $.each(component.get('v.userProfileList'), function(ikey, val){
                                                                    if(userInfo[field] !== null && userInfo[field].UserLicenseId === ikey){
                                                                        $.each(val, function(vkey, vval){
                                                                            if(userInfo[field].Name === vval.Name){
                                                                                $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+' selected>'+vval.Name+'</option>');
                                                                            }else{
                                                                                $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+'>'+vval.Name+'</option>');
                                                                            } 
                                                                        });
                                                                    }  
                                                                }); 
                                                            }
                                                            break;
                                                        default:
                                                            if(itr.name !=='Name'){
                                                                if(userInfo[field] !== null){
                                                                    sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text" value="'+userInfo[field]+'"/>';
                                                                }else{
                                                                    sectionCellElement2 = '<input class="slds-input slds-input--small size-cls sndsvr" id="edit-'+field+'" type="text" value=""/>';
                                                                }
                                                                sectionTd2.innerHTML = sectionCellElement2;
                                                            }
                                                    }
                                                } 
                                            });
                                            
                                        }
                                    }
                                });
                            });
                        }
                        
                        if(component.get("v.flag")){
                            $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--error').addClass('slds-theme--success');
                            $(document.getElementsByClassName('edit-response')).text('User is edited successfully.');
                            $(document.getElementsByClassName('alert-edit')).show();
                            setTimeout(function(){
                                $(document.getElementsByClassName('alert-edit')).hide();
                                $(document.getElementsByClassName('edit-response')).text('');
                                $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success');
                            }, 5000);
                        }
                        $(document.getElementsByClassName('edit_section')).show();
                        $(document.getElementsByClassName('edit-user-layer-'+component.get("v.randomNumber"))).show();
                        $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
                    }else if(response.getReturnValue().status === 'FAIL'){
                        $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
                        component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                    }
                }else{
                    $(document.getElementsByClassName('alert-edit').removeClass('slds-theme--success')).addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-response')).html('Something went wrong.');
                    $(document.getElementsByClassName('alert-edit')).show();
                    $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                    $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                    
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
                $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
            }else if (state === "ABORTED") {
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
            }
            $(document.getElementsByClassName('save-btn')).html('Save');
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            
        });
        
        $A.enqueueAction(action);
    },
    
    updateUserData : function(component, event, helper){
        $(document.getElementsByClassName('save-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Saving...'); 
        $(document.getElementsByClassName('for-disable')).attr('Disabled', 'Disabled');
        $(document.getElementsByClassName('header-color-cls')).hide();
        $(document.getElementsByClassName('hide-div')).show();
        
        var isLoop = false;
        if($(document.getElementsByClassName('sndsvr')).length === 0) return false;
        var dataToBeSend = {};
        var objVal = '';
        var objId = '';
        var newUserInfo = {};
        var newObjVal = '';
        var newObjId = '';
        var orgId = component.get("v.userData").OrgId;
        var userId = component.get("v.userData").userId;
        var randomNumber = component.get("v.randomNumber");
        
        var nameUserLisence = '';  
        var nameUserrole = '';  
        var nameProfiles = '';
        var UserLicenseId = '';
        $.each($('table.edit-table-'+randomNumber).find('.sndsvr').not(':disabled'), function(index, elementObj){
            objVal = $.trim($(elementObj).val());
            newObjVal = $.trim($(elementObj).val());
            if(objVal === 'on'){
                objVal = ""+$(elementObj).is(":checked")+"";
                newObjVal = $(elementObj).is(":checked");
            }
            objId = $(elementObj).attr('id');
            objId = objId.substr(5);
            if(objId !== 'UserLicenseId'){
                dataToBeSend[objId] = objVal;
            }
            newObjId = $(elementObj).attr('id');
            newObjId = newObjId.substr(5);
            newUserInfo[newObjId] = newObjVal; 
            if(newObjId ==='UserRoleId'){
                nameUserrole = $.trim($(elementObj).find('option:selected').text());
            }
            if(newObjId ==='ProfileId'){
                nameProfiles = $.trim(elementObj.options[elementObj.selectedIndex].text);
            }
            if(newObjId ==='UserLicenseId'){
                nameUserLisence = $.trim(elementObj.options[elementObj.selectedIndex].text);
                UserLicenseId = $.trim(elementObj.options[elementObj.selectedIndex].value);
            }
        });
        var data = JSON.stringify(dataToBeSend);
        var action = component.get("c.updateUserDetail");
        action.setParams({
            "userDetialForClone": dataToBeSend,
            "orgId" : orgId,
            "userId" : userId
        });
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                $(document.getElementsByClassName('edit_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var userInfo = component.get("v.userInfo");
                if(typeof response.getReturnValue().status !== 'undefined'){
                    if(response.getReturnValue().status === 'SUCCESS'){
                        var emailmsg = '';
                        $.each(newUserInfo, function(idx, itr){
                            if(userInfo[idx] !== undefined && userInfo[idx] !== itr && idx !=='Email'){
                                if(idx === 'UserRoleId'){
                                    if(userInfo['UserRole'] !== null){
                                        userInfo['UserRole'].Name = nameUserrole;
                                    }else{
                                        userInfo['UserRole'] = {"Name":nameUserrole};
                                    }
                                }
                                if(idx === 'ProfileId'){
                                    if(userInfo['Profile'] !== null){
                                        userInfo['Profile'].Name = nameProfiles;
                                        userInfo['Profile'].UserLicenseId = UserLicenseId;
                                        userInfo['Profile']['UserLicense'] = {"Name":nameUserLisence};
                                    }
                                }
                                userInfo[idx] = itr;
                            }if(userInfo[idx] === null && itr !== null ){
                                userInfo[idx] = itr;
                            }
                        });
                        component.set("v.userInfo", null);
                        component.set("v.userInfo", userInfo);
                        component.set("v.flag", true);
                        helper.createUserScreen(component, event, helper);
                        //get back to usermodule page
                        component.getEvent("AfterEditUserEvent").setParams({
                            "orgId" : orgId,
                            "userId" : userId,
                            "uniqueNumber" : randomNumber,
                            "flag" : true,
                            "index" : component.get("v.index"),
                            "userName":userInfo['FirstName']+' '+userInfo['LastName'] 
                        }).fire();
                        $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                        
                    }else if(response.getReturnValue().status === 'FAIL'){
                        var error = '';
                        if(response.getReturnValue().errors.message !== undefined){
                            error = error + '<p>'+response.getReturnValue().errors.message+'</p>';    
                        }else if(response.getReturnValue().errors[0].message !== undefined){
                            error = error + '<p>'+response.getReturnValue().errors[0].message+'</p>';    
                        }else{}
                        $(document.getElementsByClassName('for-disable')).removeAttr('Disabled');
                        $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                        $(document.getElementsByClassName('edit-response')).html(error);
                        $(document.getElementsByClassName('alert-edit')).show();
                        $(document.getElementsByClassName('hide-div')).hide();
                        $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                        $(document.getElementsByClassName('save-btn')).html('Save'); 
                    }
                }else{
                    
                    $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-response')).html('Something went wrong.');
                    $(document.getElementsByClassName('alert-edit')).show();
                    $(document.getElementsByClassName('hide-div')).hide();
                    $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                    $(document.getElementsByClassName('save-btn')).html('Save');
                    
                    
                }
                
            }else if (state === "ERROR") {
                $(document.getElementsByClassName('edit_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                        $(document.getElementsByClassName('edit-response')).html(errors[0].message);
                        $(document.getElementsByClassName('alert-edit')).show();
                    }
                }else{
                    $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-response')).html('Unknow Error');
                    $(document.getElementsByClassName('alert-edit')).show();
                }
                $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                $(document.getElementsByClassName('save-btn')).html('Save');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }else if (state === "ABORTED") {
                $(document.getElementsByClassName('edit_section')[0].querySelectorAll('.slds-popover__body')).scrollTop(0);
                $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                $(document.getElementsByClassName('edit-response')).html('Process Aborted...!');
                $(document.getElementsByClassName('alert-edit')).show();
                $(document.getElementsByClassName('save-btn')).html('Save');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    resetUserEdit : function(component, event){
        function getDateCoversion(myDate){
            var result;
            if( myDate === 'string' && myDate !== '' && myDate !== null){
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
        var userStruct = component.get("v.userTemplateData");
        var userMeta = component.get("v.userMeta");
        var userData = component.get("v.userInfo");
        var userRoleFlgRes = true;
        var userLicenseFlgRes = true;
        var userProfileFlgRes = true;
        if(!$.isEmptyObject(userStruct)){
            $.each(userStruct, function(sectionKey, sectionObj){
                $.each(sectionObj.fields, function(field, fieldVal){
                    if(typeof userData[field] !== 'undefined' || typeof userData['Profile'][field] !== 'undefined'){
                        if(typeof userMeta.fields !== 'undefined'){
                            $.each(userMeta.fields, function(idx, itr){
                                if(itr.name === field || itr.name === 'UserRoleId' || itr.name === 'ProfileId'){
                                    switch(itr.type) {
                                        case 'picklist':
                                            $(document.getElementById('edit-'+field)).val(userData[field]);
                                            break;
                                        case 'datetime':
                                            if(userData[field] !== '' && userData[field] !== null){
                                                $(document.getElementById('edit-'+field)).val(getDateCoversion(userData[field]));
                                            }else if(userData[field] === '' && userData[field] !== null){
                                                $(document.getElementById('edit-'+field)).val(userData[field]);
                                            }else{}
                                            break;
                                        case 'boolean':
                                            if(userData[field] === true){
                                                $(document.getElementById('edit-'+field)).prop( "checked", true );
                                            }else{
                                                $(document.getElementById('edit-'+field)).prop( "checked", false );
                                            }
                                            break;
                                        case 'reference':
                                            if(field ==='UserRole' && userRoleFlgRes){
                                                userRoleFlgRes = false;
                                                if(userData['UserRoleId'] !== null){
                                                    $(document.getElementById('edit-UserRoleId')).val(userData['UserRoleId']);
                                                }else{
                                                    $(document.getElementsByClassName('edit-'+field)[0].querySelectorAll('select')).val("000000000000000");
                                                }
                                            }
                                            if(field === 'Profile' && userProfileFlgRes){
                                                userProfileFlgRes = false;
                                                var chngval =  $(document.getElementById('edit-UserLicenseId')).val();
                                                $(document.getElementById('edit-ProfileId')).html('');
                                                $.each(component.get('v.userProfileList'), function(ikey, val){
                                                    if(userData['Profile'] !== null && chngval === ikey){
                                                        $.each(val, function(vkey, vval){
                                                            if(userData['Profile'].Name === vval.Name){
                                                                $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+' selected>'+vval.Name+'</option>');
                                                            }else{
                                                                $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+'>'+vval.Name+'</option>');
                                                            } 
                                                        });
                                                    }  
                                                }); 
                                            }
                                            if(field === 'UserLicense' && userLicenseFlgRes){
                                                userLicenseFlgRes = false;
                                                $(document.getElementById('edit-UserLicenseId')).val(userData['Profile']['UserLicenseId']);
                                            }
                                            break;
                                        default:
                                            $(document.getElementById('edit-'+field)).val(userData[field]);
                                    }
                                }
                            });
                        }
                    }
                });
            }); 
        }
    },    
    
    getAlluserRole:function(component, event, helper){
        var action = component.get("c.getUserRoleLicenseProfile");
        action.setParams({
            "orgId": component.get("v.userData").OrgId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                var userRole = response.getReturnValue().UserRoles;
                var UserLicenses = response.getReturnValue().UserLicenses;
                var UserLicensesProfile = response.getReturnValue().Profiles;
                if(typeof userRole.status !== 'undefined' && typeof userRole.status !== 'undefined'){
                    if(userRole.status === 'SUCCESS' || UserLicenses.status === 'SUCCESS'){
                        component.set('v.userRoles',$.parseJSON(userRole.body).records);
                        component.set('v.UserLicenses',$.parseJSON(UserLicenses.body).records);
                        var userLicenseKey = {};
                        $.each($.parseJSON(UserLicensesProfile.body).records, function(idx, obj){
                            var userLicenseArray = [];
                            if(obj.UserLicenseId in userLicenseKey){
                                userLicenseArray = userLicenseKey[obj.UserLicenseId];
                                userLicenseArray.push({'Id':obj.Id,'Name':obj.Name});
                            }else{
                                userLicenseArray.push({'Id':obj.Id,'Name':obj.Name});
                            }
                            userLicenseKey[obj.UserLicenseId] = userLicenseArray;
                            
                        });
                        component.set('v.userProfileList',userLicenseKey);
                    }else if(userRole.status === 'FAIL'){
                        $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
                        component.getEvent("handleError").setParams({"responseObj":userRole}).fire();
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                    }
                }else{
                    $(document.getElementsByClassName('alert-edit')).removeClass('slds-theme--success').addClass('slds-theme--error');
                    $(document.getElementsByClassName('edit-response')).html('Something went wrong.');
                    $(document.getElementsByClassName('alert-edit')).show();
                    $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))[0].querySelectorAll('.slds-grid')).show();
                    $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
                    component.getEvent("handleError").setParams({"responseObj":userRole}).fire();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                }
            }else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
                $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('Edit');
            }
            
        });
        $A.enqueueAction(action);
    }
    
})