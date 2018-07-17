({  
    /* globals $ */
    getFieldDependentdata : function(component, event, helper){
        $(document.getElementsByClassName('fieldLevelDpendencies')[0].querySelectorAll('#search-dependent-field')).val('');
        $(document.getElementsByClassName('fieldLevelDpendenciesBody')).html(' ');
        component.set("v.tempdata", " ");
        var action = component.get("c.getFieldsDependencies");
        action.setParams({
            "MapObjName" : component.get("v.objNameMap"),
            "profileArray" : component.get("v.orgNameArrayData")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.objectDependentData",response.getReturnValue());
                helper.showDependentData(component, event, helper);
            }
        });
        $A.enqueueAction(action);
    },
    
    showDependentData : function(component, event, helper){
        $(document.getElementsByClassName('FieldDependentDataLoader')).hide();
        var wrapTrHeading  = ' ';
        var notTrData = ' ';
        var trHeading = ' ';
        component.set("v.tempdata"," ");
        var countId = 0;
        $.each(component.get("v.orgNameArrayData"),function(index,value){
            countId = countId + 1 ;
        });
        trHeading = '<th class="slds-cell-shrink custom-heading slds-text-align--center" colspan="'+countId+'">Availability</th>';
        wrapTrHeading = '<thead><tr class="slds-text-heading--label"><th class="slds-cell-shrink custom-heading slds-text-align--left labelClass labelId">Name</th>'+trHeading+'</tr></thead>';
        notTrData = '<tr class="noRecordsFound"><td colspan="2"><div align="center" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No records available.</b></div></td></tr>';
        $.each(component.get("v.objectDependentData"),function(keyIdx,valObj){
            var temp = ' '; 
            $.each(valObj, function(idx, obj){
                idx = idx.split('-');
                var orgId = idx[1];
                var orgObjName = idx[5];
                var entityTypeName = '';
                entityTypeName = idx[0].replace(/[\ ]+/g, "-");
                if(component.get("v.tempdata") === " " || component.get("v.tempdata") !== entityTypeName){   
                    component.set("v.tempdata",entityTypeName);
                    temp += '<div class="'+entityTypeName+' field-clear section-class"><h3 class="toggle-section slds-truncate slds-section-title section-group--is-open "><a class="togal_'+entityTypeName+' slds-button slds-button--icon-container focus-none"><span class="expand expand-'+entityTypeName+' changeToggle" style="display:none"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use></svg></span><span class="collapse collapse-'+entityTypeName+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#switch"></use></svg></span></a><stivadmn:adminifiedIcons class="slds-icon slds-icon--small slds-icon-text-default" svgPath="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#switch" />'+idx[0]+'</h3><table class=" slds-table slds-table--bordered custom-border toggelClass " id="table-'+entityTypeName+'" style="display:block">'+wrapTrHeading+'<tbody>'+notTrData+'</tbody></table></div>';
                    $(document.getElementById('fieldDependentModule').querySelectorAll('.fieldLevelDpendenciesBody')).append(temp);
                    if(entityTypeName === 'Business-Process' || entityTypeName === 'Validation-Rule' || entityTypeName === 'Assignment-Rule'){
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .noRecordsFound td')).attr('colspan',countId+2);
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .labelId')).after('<th class="slds-cell-shrink custom-heading slds-text-align--center" colspan="'+countId+'">Active</th>');
                        
                    }
                    if(entityTypeName === 'Approval-Process'){
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .noRecordsFound td')).attr('colspan',countId+2);
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .labelId')).after('<th class="slds-cell-shrink custom-heading slds-text-align--center" colspan="'+countId+'">State</th>');
                    }
                    if(entityTypeName === 'Email-Template'){
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .labelId')).after('<th class="slds-cell-shrink custom-heading slds-text-align--center" colspan="'+countId+'">Active</th><th class="slds-cell-shrink custom-heading slds-text-align--center" colspan="'+countId+'">Template Type</th>');
                        $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .noRecordsFound td')).attr('colspan',countId+3+countId);
                    }
                }
                if(obj.status !=="FAIL"){
                    var FieldPerms = JSON.parse(obj.body);
                    if(FieldPerms.records.length > 0 ){
                        var flag = true;
                        $.each(FieldPerms.records, function(i,ob){
                            var addField = '';
                            var CreateRowFlag = false;
                            var ruleName = '';
                            var showRuleName = '';
                            if(entityTypeName === 'Validation-Rule'){
                                showRuleName = ob.ValidationName;
                                ruleName = ob.ValidationName.replace(/([~!@#$%^&*()+=`{}\[\]\|\\:;<>,.\/? ])+/g, "_");
                            }else{
                                showRuleName = ob.Name;
                                ruleName = ob.Name.replace(/([~!@#$%^&*()+=`{}\[\]\|\\:;<>,.\/? ])+/g, "_");
                            }
                            
                            if(entityTypeName === 'Business-Process'){
                                CreateRowFlag = true;
                                $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                    if(objProfile.split('-')[2] === idx[4]){
                                        addField = addField +'<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                    }else{
                                        addField = addField +'<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                    }
                                });
                            }
                            if(entityTypeName === 'Validation-Rule' || entityTypeName === 'Assignment-Rule' ){
                                CreateRowFlag = true;
                                $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                    if(objProfile.split('-')[2] === idx[4]){
                                        addField = addField +'<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                    }else{
                                        addField = addField +'<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                    }
                                });
                            }
                            if(entityTypeName === 'Apex-Trigger'|| entityTypeName === 'Workflow-Rule' || entityTypeName === 'Apex-Page'){
                                CreateRowFlag = true;
                            }
                            if(entityTypeName === 'Approval-Process'){
                                CreateRowFlag = true;
                                $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                    addField = addField +'<td class="State-'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                });
                            }
                            if(entityTypeName === 'Email-Template' && ob.Body !== null){
                                if(ob.Body.indexOf("{!"+orgObjName+".") >= 0 || ob.Subject.indexOf("{!"+orgObjName+".") >= 0){
                                    CreateRowFlag = true;
                                    var activeTd = '';
                                    var templateTd = '';
                                    $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                        
                                        if(objProfile.split('-')[2] === idx[4]){
                                            activeTd = activeTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                        }else{
                                            activeTd = activeTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                        }
                                        templateTd = templateTd + '<td class=" TemplateType-'+entityTypeName+'-'+key+'-'+ruleName+'  slds-text-align--center">N/A</td>';
                                    });
                                    addField = activeTd+''+templateTd;
                                }
                            }
                            
                            if(entityTypeName === 'Email-Template' && ob.Markup !== null){
                                if(ob.Markup.indexOf('relatedToType="'+orgObjName+'"') >= 0 || ob.Markup.indexOf('recipientType="'+orgObjName+'"') >= 0){
                                    CreateRowFlag = true;
                                    var activeMarkpTd = '';
                                    var templateMarkpTd = '';
                                    $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                        
                                        if(objProfile.split('-')[2] === idx[4]){
                                            activeMarkpTd = activeMarkpTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                        }else{
                                            activeMarkpTd = activeMarkpTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                        }
                                        templateMarkpTd = templateMarkpTd + '<td class=" TemplateType-'+entityTypeName+'-'+key+'-'+ruleName+'  slds-text-align--center">N/A</td>';
                                    });
                                    addField = activeMarkpTd+''+templateMarkpTd;
                                }
                            }
                            
                            if(entityTypeName === 'Email-Template' && ob.Body === null && ob.Subject !== null){
                                if(ob.Subject.indexOf("{!"+orgObjName+".") >= 0){
                                    CreateRowFlag = true;
                                    var activeBSTd = '';
                                    var templateBSTd = '';
                                    $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                        
                                        if(objProfile.split('-')[2] === idx[4]){
                                            activeBSTd = activeBSTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                        }else{
                                            activeBSTd = activeBSTd + '<td class="'+entityTypeName+'-'+key+'-'+ruleName+' slds-text-align--center">N/A</td>';
                                        }
                                        templateBSTd = templateBSTd + '<td class=" TemplateType-'+entityTypeName+'-'+key+'-'+ruleName+'  slds-text-align--center">N/A</td>';
                                    });
                                    addField = activeBSTd+''+templateBSTd;
                                }
                            }
                            if(entityTypeName === 'Workflow-Field-Update'){
                                CreateRowFlag = true;                                
                            }
                            $(document.getElementById('fieldDependentModule').querySelectorAll('#table-'+entityTypeName+' .labelClass')).removeClass('labelId');  
                            if(CreateRowFlag){
                                if($(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr')).hasClass('noRecordsFound')){
                                    $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody .noRecordsFound')).remove();
                                }                                
                                var td = '';
                                $.each(component.get("v.orgNameArrayData"), function(key,objProfile){
                                    td = td + '<td class="'+key+'-'+ruleName+' slds-text-align--center"><span class="approval icon_'+objProfile.split('-')[2]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+objProfile.split('-')[2]+'.png" alt="false'+objProfile.split('-')[2]+'" /></span></td>';
                                });
                                if(!$(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr')).hasClass('tr-'+ruleName)){
                                    $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody')).append('<tr id="fieldLevelDpendencies-'+ruleName+'" class="toggle-'+entityTypeName+' tr-'+ruleName+' datarow"><td>'+showRuleName+'</td>'+addField+''+td+'</tr>');
                                }
                                if(entityTypeName === 'Email-Template' || entityTypeName === 'Business-Process' ){
                                    if(ob.IsActive){
                                        $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr .'+entityTypeName+'-'+orgId+'-'+ruleName+'')).html('<span class="approval icon_'+idx[4]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+idx[4]+'.png" alt="true'+idx[4]+'" /></span>');
                                    }
                                    $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr .TemplateType-'+entityTypeName+'-'+orgId+'-'+ruleName+'')).html(ob.TemplateType);
                                }
                                if(entityTypeName === 'Validation-Rule' || entityTypeName === 'Assignment-Rule' ){
                                    if(ob.Active){
                                        $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr .'+entityTypeName+'-'+orgId+'-'+ruleName+'')).html('<span class="approval icon_'+idx[4]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+idx[4]+'.png" alt="true'+idx[4]+'" /></span>');
                                    }
                                }
                                $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr')).find('.'+orgId+'-'+ruleName+'').html('<span class="approval icon_'+idx[4]+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+idx[4]+'.png" alt="true'+idx[4]+'" /></span>');
                                $(document.getElementById('table-'+entityTypeName).querySelectorAll('tbody tr .State-'+entityTypeName+'-'+orgId+'-'+ruleName+'')).html(ob.State);
                                flag = false;
                            }
                        });
                    }                    
                }else{
                    $(document.getElementById('fieldDependentModule').querySelectorAll('.showErrorobjDepend')).html('');
                    var error = '';
                    $.each(obj.errors,function(errorKey,errorVal){
                        error = error + '<p>Error In organization : '+idx[3]+'('+idx[0]+') : '+errorVal.message+'</p>';
                    });
                    $(document.getElementById('fieldDependentModule').querySelectorAll('.showErrorobjDepend')).append(error);
                    $(document.getElementById('fieldDependentModule').querySelectorAll('.errorobjDepend')).show();
                    
                }
            });
            
        });
        $(document.getElementsByClassName('fieldLevelDpendencies')[0].querySelectorAll('.close-obj-Dpendencies-btn')).attr('disabled',false);
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies #select-object-dependent')).prop('disabled',false);
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .btn-col-exp')).show();
        
    },
    fieldSearch : function(component){
        var fieldsearchVal = $('#search-dependent-field').val();
        $.each($(document.getElementsByClassName('FieldDependentModuleBodyDiv')[0].querySelectorAll('#fieldDependentModule .datarow')), function(ind, obj){
            var theadName= $(this.querySelectorAll('td')).eq(0).text();
            if(fieldsearchVal === ''){
                $(this).removeClass('hide-row');
            }else{
                theadName = theadName.toLowerCase();
                fieldsearchVal = fieldsearchVal.toLowerCase();
                if(theadName.includes(fieldsearchVal)){
                    $(this).removeClass('hide-row');
                }else{
                    $(this).addClass('hide-row');
                }
            }
        });
        $.each($(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggelClass')), function(ind, obj){  
            var isTrHide = false;
            $.each($(this.querySelectorAll('tbody tr')),function(){
                if(!$(this).hasClass('hide-row')){
                    isTrHide = true;
                    return false;
                }
            });
            if(isTrHide){ 
                $(this.querySelectorAll('thead')).show();
            }else{
                $(this.querySelectorAll('thead')).hide();
            }            
        });        
    }
})