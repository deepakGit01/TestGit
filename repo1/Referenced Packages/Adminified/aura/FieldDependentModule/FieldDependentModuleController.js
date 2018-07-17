({ 
    /* globals $ */
    documentReady : function(component, event, helper) {       
        helper.getFieldDependentdata(component, event, helper);
        $('body').off('click', '.fieldLevelDpendenciesBody .toggle-section');
        $('body').on('click', '.fieldLevelDpendenciesBody .toggle-section', function(){
            var parentDivClass = $(this).parent('div').attr('class').split(' ')[0];
            var isExpand = false;
            if($(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.expand-'+parentDivClass)).hasClass('changeToggle')){
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.expand-'+parentDivClass)).show();
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('#table-'+parentDivClass)).hide();
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.collapse-'+parentDivClass)).hide();
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.expand-'+parentDivClass)).removeClass('changeToggle');
                
            }else{
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.expand-'+parentDivClass)).addClass('changeToggle');
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.expand-'+parentDivClass)).hide();
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('.collapse-'+parentDivClass)).show();
                $(document.getElementsByClassName(parentDivClass)[0].querySelectorAll('#table-'+parentDivClass)).show();
                
            }
            $.each($(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.expand')),function(e){
                if($(this).hasClass('changeToggle')){
                     isExpand = true;
                }
            });
            if(isExpand){
                 $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .col-exp-btn')).text('Collapse All');
            }else{
                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .col-exp-btn')).text('Expand All');
            }
            
        });
        
        // Search Records
        $('body').off('keyup', '#search-dependent-field');
        $('body').on('keyup', '#search-dependent-field', function(e){
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.fieldSearch(component);
            }
        });
    },
    showfillDataINFieldDependentModule : function(component, event, helper){
        component.set("v.objName",event.getParam("objName"));
        component.set("v.objNameMap",event.getParam("objNameMap"));
        component.set("v.orgNameArrayData",event.getParam("orgNameArrayData"));
        component.set("v.objList",event.getParam("objList"));
        $(document.getElementById('fieldDependentModule').querySelectorAll('.showErrorobjDepend')).html('');
         $(document.getElementById('fieldDependentModule').querySelectorAll('.errorobjDepend')).hide();
         $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .org-details')).html('');
        
        $.each(component.get("v.orgNameArrayData"),function(index,value){
            value = value.split('-');
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .org-details')).append(' <li style="border-right: 1px solid #d8dde6;padding: 0 10px;"><div class=""><label> <span class=""><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+value[2]+'.png" alt="true'+value[2]+'"/>&nbsp;<img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+value[2]+'.png" alt="false'+value[2]+'"/></span>&nbsp;'+value[1]+'</span></label></div></li>');
        });
        helper.getFieldDependentdata(component, event, helper);
    },
    
    close : function(component, event, helper){
         $(document.getElementById('fieldDependentModule').querySelectorAll('.errorobjDepend')).hide();
    },
})