({
    /* globals $ */
    documentReady : function(component, event, helper) {
        $(document.getElementsByClassName('moveUp')).prop('disabled','disabled');
        $(document.getElementsByClassName('moveDown')).prop('disabled','disabled');
        var perMissionName = component.get("v.permissionName");
        component.set("v.permissionName",perMissionName.charAt(0).toUpperCase()+perMissionName.slice(1));
        $(document.getElementsByClassName('close-model')).prop("disabled", true);
        $(document.getElementsByClassName('save-btn')).prop("disabled", true); 
        helper.getAssignedUsers(component, event);
        helper.getAllUsers(component, event);
        $(document.getElementsByClassName('manage_Assignment')).show();
        $(document.getElementsByClassName('btn-'+component.get("v.randomNumber"))[0].querySelectorAll('.manage-assignments')).html('Manage Assignments');
        
        $(document.getElementsByTagName("body")).off('click','.close-model');
        $(document.getElementsByTagName("body")).on('click','.close-model',function(){
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
            $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll("tbody")).html('');
            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody')).html('');
            $(document.getElementsByClassName('manage_Assignment')).remove(); 
            
        });
        
        $(document.getElementById('Alluser_search')).off('keypress');
        $(document.getElementById('Alluser_search')).on('keyup', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.userFieldSearchalluser(component, event, helper);
            }
        });
        
        $(document.getElementById('Assignuser_search')).off('keypress');
        $(document.getElementById('Assignuser_search')).on('keyup', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.userFieldSearch(component, event, helper);
            }
        });
        
        $(document.getElementsByTagName('body')).off('click','.signedchekbox');
        $(document.getElementsByTagName('body')).on('click','.signedchekbox',function(){
            if($(document.getElementsByClassName('signedchekbox')).is(":checked")){
                $(document.getElementsByClassName('moveDown')).addClass('slds-button--brand');
                $(document.getElementsByClassName('moveDown')).removeClass('slds-button--neutral');
                $(document.getElementsByClassName('moveDown')).prop('disabled',false);
            }else{
                $(document.getElementsByClassName('moveDown')).addClass('slds-button--neutral');
                $(document.getElementsByClassName('moveDown')).removeClass('slds-button--brand');
                $(document.getElementsByClassName('moveDown')).prop('disabled','disabled');
            }
        });
        
        $(document.getElementsByTagName('body')).off('click','.checkboxunsined');
        $(document.getElementsByTagName('body')).on('click','.checkboxunsined',function(){
            if($(document.getElementsByClassName('checkboxunsined')).is(":checked")){
                $(document.getElementsByClassName('moveUp')).addClass('slds-button--brand');
                $(document.getElementsByClassName('moveUp')).removeClass('slds-button--neutral');
                $(document.getElementsByClassName('moveUp')).prop('disabled',false);
            }else{
                $(document.getElementsByClassName('moveUp')).addClass('slds-button--neutral');
                $(document.getElementsByClassName('moveUp')).removeClass('slds-button--brand');
                $(document.getElementsByClassName('moveUp')).prop('disabled','disabled');
            }
            
        });
        
        $(document.getElementsByTagName('body')).off('click','.btn-alertMsgDataerror');
        $(document.getElementsByTagName('body')).on('click','.btn-alertMsgDataerror',function(){
            $(document.getElementsByClassName('showErrorMngAssign')).html('');
            $(document.getElementsByClassName('showdivmsg')).removeClass('showdivmsg1');
            $(document.getElementsByClassName('alertMsgDataerror')).hide();
        });
        
    },
    
    userFieldSearch : function(component, event, helper){
        helper.userFieldSearch(component);
    },
    
    userFieldSearchalluser : function(component, event, helper){
        helper.userFieldSearchalluser(component);
    },
    
    saveAssignment: function(component, event, helper){  
        $(document.getElementsByClassName('close-model')).prop("disabled", true);
        helper.saveAssignedUserData(component, event);
    },
    
    closeModal : function(component, event){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false}).fire();
        $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll("tbody")).html('');
        $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll("tbody")).html('');
        $(document.getElementsByClassName('manage_Assignment')).remove();
    },
    
    moveDown : function(component, event, helper) {
        if($('.assigned-user-table input[class*="signedchekbox"]:checked').length>0){
            $(document.getElementsByClassName('close-model')).prop("disabled", false);
            $(document.getElementsByClassName('save-btn')).prop("disabled", false); 
            var assignedTrList='';
            if($( "td:contains('No assigned users found')" ).length > 0){
                $( "td:contains('No assigned users found')" ).closest('tr').remove();
            } 
            $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr')).each(function(index, ob){
                if($(this.querySelectorAll('td .select-row1 .signedchekbox')).prop('checked')){
                    var perSetAssId = $(this.querySelectorAll('td .perSetAssId')).text();
                    var userId = $(ob).prop("id");
                    userId = userId.substr(9); 
                    var profileName = $(this.querySelectorAll('td .profile_name')).text();
                    var userName = $(this.querySelectorAll('td .user_name')).text();
                    var userLicense = $(this.querySelectorAll('td .user_license')).text();
                     var searchasuname = userName.replace(/ /g,'');
                    
                    assignedTrList = assignedTrList + '<tr id="alluser-'+userId+'" class="slds-hint-parent datarow alluser-'+searchasuname+'"><td class=" slds-hide"><span class="perSetAssId">'+perSetAssId+'</span></td><td class="slds-row-select"><label  for="chk3-'+userId+'" class="slds-checkbox custom-chekbox select-row2"><input id="chk3-'+userId+'" type="checkbox" class="checkboxunsined " value="'+userId+'"/><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name"><span class="slds-truncate user_name">'+ userName.charAt(0).toUpperCase()+userName.slice(1)+'</span></td><td data-label="User Profile profilename"><span class="slds-truncate profile_name">'+profileName+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+userLicense+'</span></td></tr>';
                    $(this).remove();                
                }                                                              
            });
            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody')).append(assignedTrList);
        }
        
        $(document.getElementsByClassName('moveDown')).removeClass('slds-button--brand');
        $(document.getElementsByClassName('moveDown')).addClass('slds-button--neutral');
        $(document.getElementsByClassName('moveDown')).prop('disabled','disabled');
        if($(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr')).length === 0){
            $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody')).html('<tr id="assinged " class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No assigned users found</span></td></tr>');
        }
        if($(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')).length > 0){
            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody .warnigmsgrow')).remove();
        }
        $(document.getElementsByClassName('manage_Assignment')[0].querySelectorAll('.save-btn')).prop("disabled",false);
    },
    
    moveUp : function(component, event, helper) {
        
        if($('.unsigned-model-table input[class*="checkboxunsined"]:checked').length>0){
            $(document.getElementsByClassName('close-model')).prop("disabled", false);
            $(document.getElementsByClassName('save-btn')).prop("disabled", false);
            var unsignedTrList='';
            
            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')).each(function(index, ob){
                if($(this.querySelectorAll('td .select-row2 .checkboxunsined')).prop('checked')){
                    var userId = $(ob).prop("id");
                    userId = userId.substr(8); 
                    var profileName = $(this.querySelectorAll('td .profile_name')).text();
                    var userName = $(this.querySelectorAll('td .user_name')).text();
                    var userLicense = $(this.querySelectorAll('td .user_license')).text();
                    var searchauname = userName.replace(/ /g,'');
                    
                    unsignedTrList = unsignedTrList + '<tr id="assinged-'+userId+'" class="slds-hint-parent tr-'+userId+' datarow user-'+searchauname+'"><td class="slds-hide"><span>'+userId+'</span></td><td class="slds-row-select"><label  for="chk4-'+userId+'" class="slds-checkbox custom-chekbox select-row1"><input id="chk4-'+userId+'" type="checkbox" class="signedchekbox " value="'+userId+'" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">select all</span></label></td><td data-label="User Name"><span class="slds-truncate user_name">'+ userName.charAt(0).toUpperCase()+userName.slice(1)+'</span></td><td data-label="User Profile"><span class="slds-truncate profile_name">'+profileName+'</span></td><td data-label="User Name"><span class="slds-truncate user_license">'+userLicense+'</span></td></tr>'; 
                    $(this).remove();
                }
            });
            $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody')).append(unsignedTrList);
        }
        $(document.getElementsByClassName('moveUp')).removeClass('slds-button--brand');
        $(document.getElementsByClassName('moveUp')).addClass('slds-button--neutral');
        $(document.getElementsByClassName('moveUp')).prop('disabled','disabled');
        if($(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody tr')).length === 0){
            $(document.getElementsByClassName('unsigned-model-table')[0].querySelectorAll('tbody')).html('<tr id="alluser" class="warnigmsgrow slds-hint-parent asc"><td colspan="4" class="slds-text-align--center"><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg>&nbsp;<span class="perSetAssId" >No users available for assignment</span></td></tr>');
        }
        if($(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody tr')).length > 0){
            $(document.getElementsByClassName('assigned-user-table')[0].querySelectorAll('tbody .warnigmsgrow')).remove();
        }
        $(document.getElementsByClassName('manage_Assignment')[0].querySelectorAll('.save-btn')).prop("disabled",false);
    },
    
})