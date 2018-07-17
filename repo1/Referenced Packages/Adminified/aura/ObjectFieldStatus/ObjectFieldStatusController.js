({
    /*globals $*/
    // On Load Script Loaded 
    jsLoad : function(component, event, helper) {
        component.set("v.colspansize", component.get("v.orgNameArr").length); 
        var colsize = 3 + (component.get("v.colspansize") * 2);
        var loaderTr = '<tr class="loaderTr"><td colspan="'+colsize+'"><div class=" slds-container--center slds-spinner--small dataLoader " ><img src="/resource/stivadmn__slds0120/assets/images/spinners/slds_spinner_brand.gif" alt="Loading..." /> Loading. Please wait...</div></td></tr>';
        $(document.getElementById('profileModule').querySelectorAll('.object-fields-status table tbody tr')).remove();
        $(document.getElementById('profileModule').querySelectorAll('.object-fields-status table tbody')).append(loaderTr);
        $(document.getElementById('profileModule').querySelectorAll('.org-details')).html('');
        $.each(component.get("v.orgNameArr"), function(ind, orgName){
            $(document.getElementById('profileModule').querySelectorAll('.org-details')).append('<li class="ui toggle checkbox remove-profile"><span class="org-name-legend headerbgcolor'+ind+'">'+orgName.charAt(0)+'</span><span class="org-name-field-status" style="font-size: 12px;">'+orgName+'</span></li>');
        });
        if(component.get("v.status") === "FromObject"){
            $(document.getElementById('profileModule').querySelectorAll('.object-fields-status #select-object')).html('');
            $.each(component.get("v.objectObj"), function(objId, objName){
                $(document.getElementById('profileModule').querySelectorAll('.object-fields-status #select-object')).append('<option value="'+objId+'">'+objId+'</option>');
            });
            $(document.getElementById('profileModule').querySelectorAll('.object-fields-status #select-object option[value="'+component.get("v.objName")+'"]')).prop('selected', true);
            $(document.getElementsByClassName('object-fields-status')).show();
        }
        helper.getObjectFieldRecordDetails(component, event, helper);
        
        // Search Records
        $('body').off('keyup', '#search-object-field');
        $('body').on('keyup', '#search-object-field', function(e){
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.fieldSearch(component);
            }
        });
        
        // Restrict to checkbox checked
        $('body').off('change', '.cls-for-chk-count');
        $('body').on('change', '.cls-for-chk-count', function(e){
            if($('.object-fields-status-table tbody input:checkbox:checked').length > 30){
                this.checked = false;
                $(document.getElementsByClassName('cls-notify')[0].querySelectorAll('.notify-msg')).html('&nbsp; You can select only 30 records.');
                $(document.getElementsByClassName('cls-notify')).show();
                setTimeout(function(){
                    $(document.getElementsByClassName('cls-notify')[0].querySelectorAll('.notify-msg')).html(' ');
                    $(document.getElementsByClassName('cls-notify')).hide();
                    
                }, 4000);
            }
            
            if($('.object-fields-status-table tbody input:checkbox:checked').length === 0){
                $('.header-object-status').hide();
            }
            if(this.checked){
                $(this).parents('tr').addClass('select-color'); 
                $(document.getElementsByClassName('header-object-status')).show();
            }else{
                if($(this).parents('tr').hasClass('select-color')){
                    $(this).parents('tr').removeClass('select-color');
                }
                
            }
        });
    },
    
    // Close Model
    close : function(component, event, helper) {
        $(document.getElementsByClassName('cls-notify')[0].querySelectorAll('.notify-msg')).html('');
        $(document.getElementsByClassName('cls-notify')).hide();
    }
})