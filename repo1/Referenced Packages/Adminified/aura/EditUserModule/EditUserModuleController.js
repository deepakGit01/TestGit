({
    
    /* globals $ */
    documentReady : function(component, event, helper) {
        helper.createUserScreen(component, event, helper);
        
        $('body').off('click', '.edit-toggle-section');
        $('body').on('click', '.edit-toggle-section', function(){
            if($(document.getElementsByClassName('edit-toggle-'+$(this).attr('id'))).hasClass('toggle-cls')){
                $(document.getElementsByClassName('edit-toggle-'+$(this).attr('id'))).removeClass('toggle-cls');
                $(document.getElementsByClassName('edit-expand-'+$(this).attr('id'))).hide();
                $(document.getElementsByClassName('edit-collapse-'+$(this).attr('id'))).show();
            }else{
                $(document.getElementsByClassName('edit-toggle-'+$(this).attr('id'))).addClass('toggle-cls');
                $(document.getElementsByClassName('edit-collapse-'+$(this).attr('id'))).hide();
                $(document.getElementsByClassName('edit-expand-'+$(this).attr('id'))).show();
            }
        });
        $('body').off('change', '#edit-UserLicenseId');
        $('body').on('change', '#edit-UserLicenseId', function(){
            var chngval = $(this).val();
            $(document.getElementById('edit-ProfileId')).html('');
            $.each(component.get('v.userProfileList'), function(ikey, val){
                if(component.get('v.userInfo')['Profile'] !== null && chngval === ikey){
                    $.each(val, function(vkey, vval){
                        if(component.get('v.userInfo')['Profile'].Name === vval.Name){
                            $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+' selected>'+vval.Name+'</option>');
                        }else{
                            $(document.getElementById('edit-ProfileId')).append('<option value='+vval.Id+'>'+vval.Name+'</option>');
                        } 
                    });
                }  
            }); 
        });
    },
    
    closeEdit:function(component, event, helper) {
        $(document.getElementsByClassName('edit-user-layer-'+component.get("v.randomNumber"))).remove();
        $(document.getElementsByClassName('edit-user-'+component.get("v.randomNumber"))).remove();
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
    },
    
    save : function(component, event){
        if(component.get('v.holdEmail') !== $(document.getElementById('edit-Email')).val()){
            $(document.getElementsByClassName('showMsgForEmail')).show();
        }else{
            $(document.getElementsByClassName('showMsgForEmail')).hide();
        }
        $(document.getElementsByClassName('edit-user-confirm')).show();
        
    },
    
    cancel:function(component, event){
        $(document.getElementsByClassName('edit-user-confirm')).hide()
    },
    
    confirm :function(component, event, helper){
        helper.updateUserData(component, event, helper);
    },
    
    reset :function(component, event, helper){
        helper.resetUserEdit(component, event, helper);
    }
})