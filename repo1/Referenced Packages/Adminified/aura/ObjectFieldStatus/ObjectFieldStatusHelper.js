({
    /*globals $*/
    // Get Object Fields Details
    getObjectFieldRecordDetails : function(component, event, helper) {
        
        var action = component.get("c.getObjectDetails");
        action.setParams({"orgIdArray": component.get("v.orgIdArray"), "objNameMap": component.get("v.objNameMap")});
        var self = this;
        var orgIdArr = component.get("v.orgIdArray");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var theadTr = '<tr><td colspan="3">&nbsp;</td>';
            var orgName = '';
            $(document.getElementById('profileModule').querySelectorAll('.object-fields-status table tbody tr')).remove();
            if (component.isValid() && state === "SUCCESS") {
                var count = 0;
                $.each(orgIdArr, function(i, org){
                    orgName = $(document.getElementById('profileModule').querySelectorAll('.object-fields-status .org-details .headerbgcolor'+i)[0]).text();
                    theadTr = theadTr + '<td class = "slds-m-left--medium bgcolor'+i+' not-avail-size tr-head-total-'+org+'"><span class="org-name-legend headerbgcolor'+i+'">'+orgName+'</span><span class="total"></span></td>';
                });
                theadTr = theadTr + '<td colspan="'+component.get("v.colspansize")+'">&nbsp;</td></tr>';
                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('thead')).append(theadTr);
                $.each(response.getReturnValue(), function(orgId, bodyVal){
                    var objDescribe = bodyVal.objDesc;
                    var totalRecord = bodyVal.totalRecord;
                    
                    // Records Counts
                    if(totalRecord.status === "SUCCESS"){
                        totalRecord = totalRecord.body;
                        totalRecord = JSON.parse(totalRecord);
                        $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('thead tr .tr-head-total-'+orgId+' .total')).append('<b><span class="total-rcd">Total Records=</span><span class="total-record-'+orgId+'">'+totalRecord.totalSize+'</span></b>');
                    }else if(totalRecord.status === "FAIL"){
                        component.getEvent("handleError").setParams({"responseObj":totalRecord}).fire();
                    }
                    count = count + 1;
                    // Object Descriptions
                    if(objDescribe.status === "SUCCESS"){
                        objDescribe = objDescribe.body;
                        objDescribe = JSON.parse(objDescribe);
                        component.set("v.fieldObject", objDescribe);
                        $.each(objDescribe.fields, function(ind, obj){
                            var field_Label = '';
                            var field_Label1 = obj.name;
                            field_Label = field_Label1;
                            if(field_Label1.indexOf("__") > -1){
                                field_Label1 = field_Label1.split("__");
                                if(field_Label1.length > 2){
                                    field_Label = field_Label1[1]+'__'+field_Label1[2];
                                }
                            }
                            var objName = component.get("v.objNameMap");
                            if($(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr')).hasClass('chk-cls-'+field_Label)){
                                var id = $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' td a')).attr('id'); 
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' td a')).attr('id', id+'-'+obj.name+','+objName[orgId]+','+orgId);
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' .used-row-'+orgId)).html('<span class="'+orgId+'-'+obj.name+' spn-'+orgId+'-'+obj.name+' slds-m-left--medium"><b>-</b></span>');
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' .used-row-percent-'+orgId)).html('<span class="'+orgId+'-'+obj.name+' spn-'+orgId+'-'+obj.name+' slds-m-left--medium"><b>-</b></span>');
                            }else{
                                var usedRowTd = '';
                                var usedRowPerTd = '';
                                var apiNameSpan = '';
                                $.each(orgIdArr, function(i, org){
                                    usedRowTd = usedRowTd + '<td class="slds-truncate used-row-'+org+' bgcolor'+i+' not-avail-size"><span class="slds-m-left--medium"><b>N/A</b></span></td>';
                                    usedRowPerTd = usedRowPerTd + '<td class="slds-truncate used-row-percent-'+org+' bgcolor'+i+' not-avail-size"><span class="slds-m-left--medium"><b>N/A</b></span></td>';
                                });
                                var tr = '<tr class="slds-hint-parent firstRow chk-cls-'+field_Label+' datarow"><td class="slds-truncate"><label class="slds-checkbox" for="get-'+field_Label+'"><input name="edit-'+field_Label+'" class="size-cls cls-for-chk-count sndsvr-used-row" type="checkbox" id="get-'+field_Label+'" /><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text">'+field_Label+'</span></label></td><td class="slds-truncate">'+obj.label+'<a class="chk-used-status" style="display:none;" id="'+obj.name+','+objName[orgId]+','+orgId+'"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#refresh"></use></svg></a></td><td class="slds-truncate">'+obj.type+'</td>'+usedRowTd+usedRowPerTd+'</tr>';
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody')).append(tr);
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' .used-row-'+orgId)).html('<span class="'+orgId+'-'+obj.name+' spn-'+orgId+'-'+obj.name+' slds-m-left--medium"><b>-</b></span>');
                                $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .chk-cls-'+field_Label+' .used-row-percent-'+orgId)).html('<span class="'+orgId+'-'+obj.name+' spn-'+orgId+'-'+obj.name+' slds-m-left--medium"><b>-</b></span>');
                            }
                            
                        });
                    }else if(objDescribe.status === "FAIL"){
                        component.getEvent("handleError").setParams({"responseObj":objDescribe}).fire();
                    }
                }); 
                
            }
        });
        $A.enqueueAction(action);
    },
    
    // Search fields
    fieldSearch : function(component){
        var fieldsearchVal = $(document.getElementById('search-object-field')).val();
        var fieldCreateData = component.get("v.fieldObject");
        $.each($(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .datarow')), function(ind, obj){
            var theadName= $(this.querySelectorAll('td')).text();
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
        
        
        if($(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr')).not('.SearchMsg').length === $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .hide-row')).length){
            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .SearchMsg')).remove();
            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody')).append('<tr class="SearchMsg"><td colspan="7" class="slds-text-align--center"><div class="" ><svg aria-hidden="true" class="slds-icon slds-icon-text-warning slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#warning"></use></svg><b> No search result found.</b></div></td></tr>');
        }else{
            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody .SearchMsg')).remove();
        }
        
        
    }
})