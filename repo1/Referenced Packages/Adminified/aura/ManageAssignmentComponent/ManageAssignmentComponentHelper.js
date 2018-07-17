({  
    /* globals $ */
    userFieldSearchalluser : function(component, event, helper){
        var searchVal = $('#Alluser_search').val();
        var filtertempData = component.get("v.alluserData");
        /*$.each(filtertempData,function(index,val){ 
            var assignname='';
            assignname = val.Name.charAt(0).toUpperCase()+val.Name.slice(1);
            var res = assignname.replace(/ /g,'');
            var theadName =  $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr .alluser-'+res+' span')).text();
            if(searchVal === ''){
                $(document.getElementsByClassName('alluser-'+res)).removeClass('hide-row');
            }else{
                theadName = theadName.toLowerCase();
                searchVal = searchVal.toLowerCase();
                if(theadName.includes(searchVal)){
                    $(document.getElementsByClassName('alluser-'+res)).removeClass('hide-row');
                }else{
                    $(document.getElementsByClassName('alluser-'+res)).addClass('hide-row');
                }
            }  
        });*/
        
         $.each($(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')),function(){
            var assignname='';
            assignname =  $(this.querySelectorAll('.user_name')).text().charAt(0).toUpperCase()+ $(this.querySelectorAll('.user_name')).text().slice(1);
            var res = assignname.replace(/ /g,'');
           	var theadName =  $(this.querySelectorAll('.user_name')).text();
            if(searchVal === ''){
                $(document.getElementsByClassName('alluser-'+res)).removeClass('hide-row');
            }else{
                theadName = theadName.toLowerCase();
                searchVal = searchVal.toLowerCase();
                if(theadName.includes(searchVal)){
                    $(document.getElementsByClassName('alluser-'+res)).removeClass('hide-row');
                }else{
                    $(document.getElementsByClassName('alluser-'+res)).addClass('hide-row');
                 }
            }
        });
    },
    
    userFieldSearch : function(component, event, helper){
        var searchVal = $(document.getElementById('Assignuser_search')).val();
        var filtertempData = component.get("v.assignuserData");
        
       /* $.each(filtertempData,function(index,val){ 
            var assignname='';
            assignname = val.Assignee.Name.charAt(0).toUpperCase()+val.Assignee.Name.slice(1);
            var res = assignname.replace(/ /g,'');
            var theadName =  $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr .user-'+res+' span')).text();
            if(searchVal === ''){
                $(document.getElementsByClassName('user-'+res)).removeClass('hide-row');
            }else{
                theadName = theadName.toLowerCase();
                searchVal = searchVal.toLowerCase();
                if(theadName.includes(searchVal)){
                    $(document.getElementsByClassName('user-'+res)).removeClass('hide-row');
                }else{
                    $(document.getElementsByClassName('user-'+res)).addClass('hide-row');
                 }
            }
        });*/
        
         $.each($(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr')),function(){
            var assignname='';
            assignname =  $(this.querySelectorAll('.user_name')).text().charAt(0).toUpperCase()+ $(this.querySelectorAll('.user_name')).text().slice(1);
            var res = assignname.replace(/ /g,'');
           	var theadName =  $(this.querySelectorAll('.user_name')).text();
            if(searchVal === ''){
                $(document.getElementsByClassName('user-'+res)).removeClass('hide-row');
            }else{
                theadName = theadName.toLowerCase();
                searchVal = searchVal.toLowerCase();
                if(theadName.includes(searchVal)){
                    $(document.getElementsByClassName('user-'+res)).removeClass('hide-row');
                }else{
                    $(document.getElementsByClassName('user-'+res)).addClass('hide-row');
                 }
            }
        });
    },
    
    getRemoveAllUsers : function(component, event) {
        var orgId = component.get("v.orgId");
        var permissionsetlicense = component.get("v.permissionsetlicense");
        var action = component.get("c.getPermissionSetUser"); 
        action.setParams({
            "orgId" : orgId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if(state === "SUCCESS") {
                if(response.getReturnValue().status === 'SUCCESS'){
                    var temp = response.getReturnValue().body;
                    var tempParse = JSON.parse(temp);
                    component.set("v.alluserData",tempParse.records);
                    var removeuser = component.get("v.alluserData");
                    var index = component.get("v.index");
                    var assignuserevt = component.getEvent("assignuserevt");
                    component.getEvent("assignuserevt").setParams({"removeuser" : removeuser, "index" : index}).fire();
                }
                if(response.getReturnValue().status === 'FAIL'){
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                }
            }else if (state === "ERROR") {
                  component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        $A.get("e.stivadmn:handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                 $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
            }   
        });
        $A.enqueueAction(action);      
    },
    
    getinsetAssignedUsers : function(component, event) {
        var orgId = component.get("v.orgId");
        var permisionId = component.get("v.permissionsetId");
        var action = component.get("c.getPermissionSetAssignUser"); 
        action.setParams({
            "orgId" : orgId,
            "permissionSetId": permisionId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();   
            if(state === "SUCCESS") {
                if(response.getReturnValue().status === 'SUCCESS'){
                    var assUser = response.getReturnValue().body;
                    var assUsersJson = JSON.parse(assUser);
                    component.set("v.assignuserData",assUsersJson.records);
                    
                    var assignUserData = component.get("v.assignuserData");
                    var index = component.get("v.index");
                    var assignuserevt = component.getEvent("assignuserevt");
                    component.getEvent("assignuserevt").setParams({"assignuser" : assignUserData, "index" : index}).fire();
                }
                if(response.getReturnValue().status === 'FAIL'){
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                }
                
            } else if (state === "ERROR") {
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
                $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            } 
        });
        $A.enqueueAction(action);      
    },
    
    removeAssginUser  :function(component, event) {
        var  unsignRow = false;
       $(document.getElementsByClassName('assigned-user-table')[0]).find('tr').each(function(index, ob){
            var  checkboxval=$(this.querySelectorAll('td .select-row1 .signedchekbox')).val();
            var bul = 'false';
            $(document.getElementsByClassName('unsigned-model-table')[0]).find('tr').each(function(ind, obj){ 
             var checkboxval2 = $(this.querySelectorAll('td .select-row2 .checkboxunsined')).val();
                if(checkboxval === checkboxval2 && bul !== 'false'){
                    $(this).remove();
                    if($(document.getElementsByClassName('unsigned-model-table')[0]).find('tbody tr').length === 0){
                        unsignRow = true;
                    }
                }else{
                    bul = 'true';
                }
            });
        });
        
        if(unsignRow){
            $(document.getElementsByClassName('unsigned-model-table')[0]).find('tbody').html('<tr id="alluser" class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No users available for assignment</span></td></tr>');
        }
    },
    
    getAssignedUsers : function(component, event) {
        var orgId = component.get("v.orgId");
        var permisionId = component.get("v.permissionsetId");
        var action = component.get("c.getPermissionSetAssignUser"); 
        action.setParams({
            "orgId" : orgId,
            "permissionSetId": permisionId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();   
             $(document.getElementsByClassName('dataLoader')).show();
            if(state === "SUCCESS") {
                if(response.getReturnValue().status === 'SUCCESS'){
                    $(document.getElementsByClassName('assigned-user-table')[0]).find('thead .data_loader').hide();
                    $(document.getElementsByClassName('dataLoader')).hide();
                    $(document.getElementsByClassName('close-model')).prop("disabled", false);
                    var assUser = response.getReturnValue().body;
                    var assUsersJson = JSON.parse(assUser);
                    component.set("v.assignuserData",assUsersJson.records);
                    var assignUserData = component.get("v.assignuserData");
                    var assignuserList ='';
                    var chekdata = false;
                    if(assignUserData.length === 0 || assignUserData === []){
                        assignuserList ='<tr id="assinged " class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No assigned users found</span></td></tr>';
                    }else{
                        chekdata = true;
                        var lic = '';
                        var profileName = '';
                        $.each(assignUserData,function(index,val){ 
                            lic = 'None';
                            profileName = 'None';
                            var spiltstring = val.Assignee.Name.charAt(0).toUpperCase()+val.Assignee.Name.slice(1)
                            var res = spiltstring.replace(/ /g,'');
                            profileName = val.Assignee.Profile.Name;
                            if(val.PermissionSet.UserLicense === null ){
                                assignuserList += '<tr id="assinged-'+val.Assignee.Id+'" class="slds-hint-parent datarow asc user-'+res+'"><td class="slds-hide"><span class="perSetAssId">'+val.Id+'</span></td><td class="slds-row-select"><label  for="chk-'+val.Assignee.Id+'" class="slds-checkbox custom-chekbox select-row1"><input id="chk-'+val.Assignee.Id+'" type="checkbox" class="signedchekbox " value="'+val.Assignee.Id+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name" class="user-'+res+'"><span class="slds-truncate user_name">'+  val.Assignee.Name.charAt(0).toUpperCase()+val.Assignee.Name.slice(1)+'</span></td><td data-label="User Profile"><span class="slds-truncate profile_name">'+profileName+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+lic+'</span></td></tr>';
                            }else{
                                lic = val.PermissionSet.UserLicense.Name;
                                assignuserList += '<tr id="assinged-'+val.Assignee.Id+'" class="slds-hint-parent asc user-'+res+' datarow"><td class="slds-hide"><span class="perSetAssId">'+val.Id+'</span></td><td class="slds-row-select"><label  for="chk-'+val.Assignee.Id+'" class="slds-checkbox custom-chekbox select-row1"><input id="chk-'+val.Assignee.Id+'" type="checkbox" class="signedchekbox " value="'+val.Assignee.Id+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name" class="user-'+res+'"><span class="slds-truncate user_name">'+  val.Assignee.Name.charAt(0).toUpperCase()+val.Assignee.Name.slice(1)+'</span></td><td data-label="User Profile"><span class="slds-truncate profile_name">'+profileName+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+lic+'</span></td></tr>';
                                
                            }
                        });
                        
                    }
                    if(chekdata === false){
                        assignuserList ='<tr id="assinged " class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No assigned users found</span></td></tr>';
                    }
                    $(document.getElementsByClassName('assigned-user-table')[0]).find('tbody').html(assignuserList);
                }
                if(response.getReturnValue().status === 'FAIL'){
                    $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('thead .data_loader')).hide();
                    $(document.getElementsByClassName('dataLoader')).hide();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire(); 
                    $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody')).html('');
                    $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody')).html('');
                    $(document.getElementsByClassName('manage_Assignment')).remove(); 
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
                $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            }  
        });
        $A.enqueueAction(action);      
    },
    
    insertAssignedUser : function(component, event) {
       $(document.getElementsByClassName('hide-div')).show();
        var allUserData = component.get("v.alluserData");
        function getUserById(Id){
            var user = {};
            $.each(allUserData , function(key,obj){
                if(obj.Id === Id){
                    user = obj;
                }
            });
            return user;
        }
        var assignedUserList = component.get("v.assignuserData");
        var insertList = {}; 
        var insrtUsrId = component.get("v.insertAallUser"); 
        var insrtObj = {}; 
        var emsg='';
        var successUserArr = [];
        var permissionsetId = component.get("v.permissionsetId"); 
        $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tr')).each(function(index, ob){   
            var assigneeId = $(ob.querySelectorAll('td .signedchekbox')).val();
            var flag = false;
            var insertableAssigneeId = [];
            for(var i=0 ; i < assignedUserList.length ;i++){
                if(assigneeId !== undefined){
                    if(assigneeId === assignedUserList[i].Assignee.Id ) {
                        $(document.getElementsByClassName('hide-div')).hide();
                        flag = true;
                    }
                }
            }
            if(!flag && assigneeId !== undefined){
                $(document.getElementsByClassName('hide-div')).show();
                insrtObj[assigneeId] = permissionsetId;
            }
        }); 
        
        $(document.getElementsByClassName('hide-div')).show();
        var orgId = component.get("v.orgId");
        var action = component.get("c.saveUserAssignData"); 
        action.setParams({
            "userData" : insrtObj,
            "orgId" : orgId,
            "permissionsetId" : permissionsetId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if(state === "SUCCESS"){
                $(document.getElementsByClassName('hide-div')).show();
                var result =  response.getReturnValue(); 
                var errors = response.getError();
                this.getinsetAssignedUsers(component,event);
                this.getAssignedUsers(component, event) ;
                this.getAllUsers(component, event);
                if(result.length !== 0 && result !== '' ){
                    $.each(result,function(permissionSetAssignmentId,val){
                        if(val.status === "SUCCESS"){
                          for(var j=1;j<=$(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr')).length;j++){
                            $(document.getElementById('assinged-'+permissionSetAssignmentId)).css({'background-color': '#4BC076'}); 
                           }
                        }else if(val.status === "FAIL"){
                            var tmp = val.errors;//Array
                            if(tmp.length > 0){  
                                $.each(tmp,function(index,errorRow){
                                    emsg+='Message -'+errorRow.message+'</br>';
                                });
                            }
                            $(document.getElementsByClassName('showErrorMngAssign')).html('');
                            $(document.getElementsByClassName('showErrorMngAssign')).html(emsg);
                            $(document.getElementsByClassName('showdivmsg')).addClass('showdivmsg1');
                            $(document.getElementsByClassName('alertMsgDataerror')).show();
                            $(document.getElementsByClassName('ManageAssScroPos')).scrollTop(0);
                        }
                    });
                     $(document.getElementsByClassName('save-btn')).removeClass('slds-button--neutral').addClass('slds-button--brand');
                    $(document.getElementsByClassName('save-btn')).html('Save');
                }
              $(document.getElementsByClassName('close-model')).prop("disabled", false);
                $(document.getElementsByClassName('save-btn')).prop("disabled", false);
            }else if(state === 'ERROR'){
                var elseError = response.getError();
                if(elseError){
                    if (elseError[0] && elseError[0].message){
                        component.getEvent("handleError").setParams({"errors":elseError[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknown error'}).fire();
                }
                 $(document.getElementsByClassName('close-model')).prop("disabled", false);
                $(document.getElementsByClassName('save-btn')).prop("disabled", false); 
                
            }else if(state === "ABORTED"){
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                 $(document.getElementsByClassName('close-model')).prop("disabled", false);
                $(document.getElementsByClassName('save-btn')).prop("disabled", false);  
            }
         });
        $A.enqueueAction(action);
    },
    
    removeAssignedUser : function(component, event) {  
       $(document.getElementsByClassName('hide-div')).show(); 
        var assignedUserList = component.get("v.assignuserData");
        var permissionsetId = component.get("v.permissionsetId"); 
        var removeObj  = {}; 
        var orgId = component.get("v.orgId");       
        var permisionSetAssignmentId;
        $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tr')).each(function(index, ob){   
            permisionSetAssignmentId = $(ob.querySelectorAll('td .perSetAssId')).text();
            if($(ob.querySelectorAll('td .checkboxunsined')).length >0){
                if(assignedUserList.length === 0) { 
                     $(document.getElementsByClassName('hide-div')).hide();
                }else{
                    for(var i = 0 ; i < assignedUserList.length ;i++){
                        if(permisionSetAssignmentId === assignedUserList[i].Id && permisionSetAssignmentId !=='') { 
                             $(document.getElementsByClassName('hide-div')).show();
                            removeObj[permisionSetAssignmentId] = permissionsetId;
                        }
                    } 
                }
            }
        });
        
        var action = component.get("c.removeUserAssignData"); 
        action.setParams({
            "userData" : removeObj,
            "orgId" : orgId,
            "permissionsetId" : permissionsetId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                this.getinsetAssignedUsers(component,event);
                var result = response.getReturnValue(); 
                if(result.length !== 0){
                    $.each(result,function(assigneeId,val){
                        if(val.status === "SUCCESS"){
                            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')).each(function (td, tddata) {
                               if(assigneeId === $(this.querySelectorAll('.perSetAssId')).text()){ 
                                    $(this).css({'background-color': '#4BC076'});
                                    setTimeout(function(){
                                         $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')).css('background-color','');
                                    }, 3500);
                                }
                                
                            });
                        }else if(val.status === "FAIL"){
                            var tmp = val.errors;
                            var emsg='';
                            if(tmp.length > 0){  
                                $.each(tmp,function(index,errorRow){
                                    emsg+='Message -'+errorRow.message+'</br>';
                                });
                            }
                             $(document.getElementsByClassName('showErrorMngAssign')).html('');
                             $(document.getElementsByClassName('showErrorMngAssign')).html(emsg);
                             $(document.getElementsByClassName('showdivmsg')).addClass('showdivmsg1');
                             $(document.getElementsByClassName('alertMsgDataerror')).show(); 
                             $(document.getElementsByClassName('ManageAssScroPos')).scrollTop(0); 
                        }
                    });
                    $(document.getElementsByClassName('save-btn')).removeClass('slds-button--neutral').addClass('slds-button--brand');
                     $(document.getElementsByClassName('save-btn')).html('Save'); 
                }
                $(document.getElementsByClassName('close-model')).prop("disabled", false);
                $(document.getElementsByClassName('save-btn')).prop("disabled", false);
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
                
                 $(document.getElementsByClassName('close-model')).prop("disabled", false);
                 $(document.getElementsByClassName('save-btn')).prop("disabled", false);
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                $(document.getElementById('comp'+event.getParam("randomNumber"))[0].querySelectorAll('.cute-loader .loader-active')).remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
               $(document.getElementsByClassName('close-model')).prop("disabled", false);
                $(document.getElementsByClassName('save-btn')).prop("disabled", false);  
            }
        });
        $A.enqueueAction(action); 
    },    
    
    saveAssignedUserData : function(component, event) {
        $(document.getElementsByClassName('closemodel')).prop("disabled", true);
        $(document.getElementsByClassName('save-btn')).prop("disabled", true);        
        $(document.getElementsByClassName('save-btn')).removeClass('slds-button--brand').addClass('slds-button--neutral');
        $(document.getElementsByClassName('save-btn')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span> Saving...');
        
        this.removeAssignedUser(component, event); 
        this.insertAssignedUser(component, event); 
        
    },
    
    getAllUsers : function(component, event) {
        var orgId = component.get("v.orgId");
        var permissionsetlicense = component.get("v.permissionsetlicense");
        var action = component.get("c.getPermissionSetUser"); 
        action.setParams({
            "orgId" : orgId
        });  
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if(state === "SUCCESS") {
                $(document.getElementsByClassName('close-model')).prop("disabled", false);
                if(response.getReturnValue().status === 'SUCCESS'){
                    $(document.getElementsByClassName('unsigned-model-table')[0]).find('thead .data_loader').hide();
                    var temp = response.getReturnValue().body;
                    var tempParse = JSON.parse(temp);
                    component.set("v.alluserData",tempParse.records);
                    var allUserData = component.get("v.alluserData");
                    var userList = '' ;
                    var chekval = false;
                    var alluser = false;
                    var lic;
                    if(allUserData.length === 0 ){
                        userList ='<tr id="alluser" class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No users available for assignment</span></td></tr>';
                    }else{
                        chekval = true;
                        $.each(allUserData,function(index,val){
                            if(permissionsetlicense !== 'undefined' ){
                                if(permissionsetlicense === val.Profile.UserLicense.Name){
                                    var stringDataName =  val.Name.charAt(0).toUpperCase()+val.Name.slice(1);
                                    var resultname = stringDataName.replace(/ /g,'');
                                    alluser = true;
                                    userList += '<tr id="alluser-'+val.Id+'" class="slds-hint-parent alluser-'+resultname+' datarow" slds-hide"><span class="perSetAssId"></span></td><td class="slds-row-select"><label  for="chk2-'+val.Id+'" class="slds-checkbox custom-chekbox select-row2"><input id="chk2-'+val.Id+'" type="checkbox" class="checkboxunsined " value="'+val.Id+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name" Class="alluser-'+resultname+'"><span class="slds-truncate user_name">'+val.Name.charAt(0).toUpperCase()+val.Name.slice(1)+'</span></td><td data-label="User Profile"><span class="slds-truncate profile_name">'+val.Profile.Name+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+val.Profile.UserLicense.Name+'</span></td></tr>';
                                }
                            }
                        });
                        if(alluser === false){
                            $.each(allUserData,function(index,val){
                                var stringDataName =  val.Name.charAt(0).toUpperCase()+val.Name.slice(1);
                                var resultname = stringDataName.replace(/ /g,'');
                                userList += '<tr id="alluser-'+val.Id+'" class="slds-hint-parent alluser-'+resultname+' datarow"><td class="slds-hide"><span class="perSetAssId"></span></td><td class="slds-row-select"><label  for="chk2-'+val.Id+'" class="slds-checkbox custom-chekbox select-row2"><input id="chk2-'+val.Id+'" type="checkbox" class="checkboxunsined " value="'+val.Id+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name" Class="alluser-'+resultname+'"><span class="slds-truncate user_name">'+val.Name.charAt(0).toUpperCase()+val.Name.slice(1)+'</span></td><td data-label="User Profile"><span class="slds-truncate profile_name">'+val.Profile.Name+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+val.Profile.UserLicense.Name+'</span></td></tr>';
                                
                            });
                        }
                    }
                    if(chekval === false){
                        userList ='<tr id="alluser" class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No users available for assignment</span></td></tr>';
                    }
                     $(document.getElementsByClassName('unsigned-model-table')[0]).find('tbody').html(userList);
               }
                if(response.getReturnValue().status === 'FAIL'){ 
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire(); 
                }       
                
            } else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        $A.get("e.stivadmn:handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
               $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            }     
            this.removeAssginUser(component, event);
        });
        $A.enqueueAction(action);
    }
})