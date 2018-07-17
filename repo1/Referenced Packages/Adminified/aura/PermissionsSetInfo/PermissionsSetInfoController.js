({  
    /* globals $ */
    documentReady : function(component,event,helper){
        $(document.getElementsByClassName('permissionsetBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementsByClassName('permissionsetBorderBottom')).eq($(document.getElementsByClassName('permissionsetBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        helper.getConnectedOrg(component, event, helper);
        
        // Object Section Toggling
        $('body').off('click', '#permissionModule .object-toggle');
        $('body').on('click', '#permissionModule .object-toggle', function(){
            var id = $(this).closest('tr').attr('id');
            id = $.trim(id.split('_id___')[1]);
            if($(document.getElementById('permissionModule').querySelectorAll('.object-permission'+id)).hasClass('object-hide-cls')){
                $(document.getElementById('permissionModule').querySelectorAll('.object-permission'+id)).removeClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-record-type'+id)).removeClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-layouts'+id)).removeClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-'+id+' span .object-close')).removeClass('object-open').addClass('object-open');
            }else{
                $(document.getElementById('permissionModule').querySelectorAll('.object-permission'+id)).addClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-record-type'+id)).addClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-layouts'+id)).addClass('object-hide-cls');
                $(document.getElementById('permissionModule').querySelectorAll('.object-'+id+' span .object-open')).removeClass('object-open').addClass('object-close');
            }
        });
        $(document.getElementsByTagName('body')).off('click', '#permissionModule .btnOk');
        $(document.getElementsByTagName('body')).on('click', '#permissionModule .btnOk', function(e) {
            var rno = this.getAttribute('id');
            $(document.getElementById('search_object_permissionset'+rno)).click();
        });
    },
    
    // Assigned user infomation
    getAssigneduser : function(component, event, helper){
        if(component.get("v.index") === event.getParam('index')){
            var assignuserdata = event.getParam('assignuser');
            var randomNo = component.get("v.randomNumber");
            var assignUserList = [];
            component.set("v.assignUserList", assignUserList);
            $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+randomNo+'-fill')).html('&nbsp;');
            $.each(assignuserdata, function(ind, objObj) {
                assignUserList.push(''+objObj.Assignee.Id);
                if(!$(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Assigned_User tr')).hasClass('user-assigned-'+objObj.Assignee.Id)){
                    $(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Assigned_User')).append('<tr class="user-assigned-'+objObj.Assignee.Id+' permissionset-field-row toggle-Assigned_User permissionset-search-'+objObj.Assignee.Id+' setting-'+objObj.Assignee.Id+' datarow" id="adminifiedAdminifiedPermissionSetModule-'+objObj.Assignee.Id+'"><td class="slds-text-align--right"> '+objObj.Assignee.Name+'</td></tr>'); 
                }
                $.each($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User')), function(index, elementObj){
                    var rNo = $(elementObj).attr('id');
                    if(!$(document.getElementById('permissionModule').querySelectorAll('#'+rNo+' tr')).hasClass('user-assigned-'+objObj.Assignee.Id)){
                        $(document.getElementById('permissionModule').querySelectorAll('#'+rNo)).append('<tr class="user-assigned-'+objObj.Assignee.Id+' permissionset-field-row datarow permissionset-search-'+objObj.Assignee.Id+' setting-'+objObj.Assignee.Id+'" id="'+objObj.Assignee.Id+'"><td class="'+rNo+'-'+objObj.Assignee.Id+' '+rNo+'-fill data-field">&nbsp;</td></tr>');
                    }
                });
            });
            
            $.each(assignuserdata, function(ind, objObj) {
                var perAsgIconshp = 'iconShap'+randomNo;
                var perAsgIconShapName = "";
                perAsgIconShapName = $(document.getElementById('permissionModule').querySelectorAll('#'+perAsgIconshp)).text();
                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+randomNo+'-'+objObj.Assignee.Id)).html(' <span class="approval icon_'+perAsgIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+perAsgIconShapName+'.png" alt="true'+perAsgIconShapName+'" /></span>');
            });
            component.set("v.assignUserList", assignUserList);
            component.getEvent("getAssignUserList").setParams({}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
            if(document.getElementById("showOnlyPerDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
        }
    },
    
    // Manage Assignment functinality
    manageAssignment : function(component, event, helper){
        event.preventDefault();
        $(document.getElementsByTagName("body")[0].querySelectorAll('button')).attr("disabled", true);
        $(document.getElementsByTagName("body")[0].querySelectorAll('input')).attr("disabled", true);
        $(document.getElementsByTagName("body")[0].querySelectorAll('a')).addClass("a-disabled");
        $(document.getElementById('permissionModule').querySelectorAll('.btn-'+component.get("v.randomNumber")+' .manage-assignments')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        
        var permissionsetId = component.get("v.strPermissionSetId");
        var orgId = component.get("v.strOrgId");
        var orgName = component.get("v.strOrgName");
        var permissionName = component.get("v.strPermissionSetName");
        var permissionsetlicense = component.get("v.strPermissionSetLic");
        var randomNumber = component.get("v.randomNumber");
        var index = component.get("v.index");
        $A.createComponent("stivadmn:ManageAssignmentComponent", {"aura:id": "ManageAssignmentComponent","permissionsetId":permissionsetId, "orgId":orgId,"permissionName":permissionName, "permissionsetlicense" : permissionsetlicense, "randomNumber" : randomNumber, "index" : index, "organizationName" : orgName}, function(newModel){
            if (component.isValid()) {
                var body = component.find("managepermissionDiv");
                body.set("v.body", newModel);
            }
        });
    },
    
    // Permission Sets templates data
    getTemplateData : function(component, event, helper){
        component.set("v.permissionSetTemplate",event.getParam("permissionSetTemplate"));
    },
    
    // Fetch selected object
    getObjectDetails : function(component, event, helper) {
        var randomNumber = component.get("v.randomNumber");
        if($(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNumber)).val() !== null){    
            helper.getObjectDetails(component, event);
        }else{
            var Objectlen = document.getElementById('permissionModule').querySelectorAll('.Object-'+randomNumber+'-fill');
            for(var n = 0;n<Objectlen.length;n++){
                Objectlen[n].innerHTML = '&nbsp;';
            }
            component.getEvent("getAllObjectFromObjectPermissionSet").setParams({}).fire();
            var msg = 'Select at least one object';
            document.getElementsByClassName('error-msg')[0].innerHTML = msg;
            document.getElementsByClassName('set-btn')[0].style.display = 'none';
            document.getElementsByClassName('alert-error')[0].style.display = 'block';
        }   
    },
    
    // Fetch Permission sets list
    getObjListPermissionSet : function(component, event, helper) { 
        var randomNo = component.get("v.randomNumber");
        var objList = $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNo)).val();
        var objList1 = [];
        if(objList !== null){
            $.each(objList, function(ind, objApi){
                var objName = '';
                if($(document.getElementById('permissionset-namespace-'+randomNo)).text() !== ''){
                    objName = objApi.replace($(document.getElementById('permissionset-namespace-'+randomNo)).text()+'__','');
                }else{
                    objName = objApi
                }
                objList1.push(objName);
            }); 
        }
        var index = component.get("v.index");
        component.getEvent("setObjectInPermissionSetObj").setParams({"objList" : objList1, "index" : index}).fire();
    },
    
    getOrgPermissionSetData : function(component, event, helper) {
        if(component.get("v.index") === event.getParam('index')){ 
            component.set("v.strOrgId", event.getParam("OrgId"));
            helper.getOrgPermissionSet(component, event, helper);
        }
    },
    
    //Permission Sets details
    getPermissionSetDetail : function(component, event, helper) { 
        var orgId = component.get("v.strOrgId");
        var permissionSetId = event.getParam('permissionSetId');
        var flag = false;
        var randomNo = component.get("v.randomNumber");
        if(component.get("v.index") === event.getParam('index')){ 
            component.set("v.permissionInstanceData", event.getParam('instanceData'));
            helper.getPermissionSetInfo(component, event, helper, orgId, permissionSetId, randomNo, flag);
        }  
    },
    
    // Delete permission sets componets
    deletePermissionSetCmp : function(component, event, helper) { 
        $(document.getElementsByClassName('permissionsetBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementsByClassName('permissionsetBorderBottom')).eq($(document.getElementsByClassName('permissionsetBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "0.5"}, 1000);
        if(component.get("v.permissionInstanceData") !== '')
            component.getEvent("ResetInstanceDataListPermission").setParams({"instanceData":component.get("v.permissionInstanceData")}).fire();
        setTimeout(function() {
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 200);
            component.getEvent("deletePermissionSetCmpEvent").setParams({
                "index" : component.get("v.index")
            }).fire();
            if(document.getElementById('permissionModule').querySelectorAll(".spanLegend").length === 2 && $(document.getElementById('permissionModule').querySelectorAll('.spanLegend')).eq(1).text()==='Triangle'){
                $.each(document.getElementById('permissionModule').querySelectorAll(".icon_Triangle"), function(ind, objObj){
                    var iconHTtml = $(this).html();
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    $(this).html(iconHTtml);
                });
                $(document.getElementById('permissionModule').querySelectorAll('.spanLegend')).eq(1).text('Square');
            }
        }, 200);
        
    }, 
    
    //Add new organization 
    addOrganization : function(component, event, helper) {
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        event.preventDefault();
        var index = component.get("v.index");
        $A.createComponent("stivadmn:ConnectToOrganization", {
            "aura:id": "ConnectToOrganization", 
            "index" : index,
            "randomNumber" : component.get("v.randomNumber"),
            "moduleName" : "permissionModule"
        },function(newModel) {
            if (component.isValid()) {
                var body = component.find("orgnizationDiv");
                body.set("v.body", newModel);
            }
        });
    },
    
    // Editing permission sets
    editPermissionSet : function(component, event, helper) { 
        helper.permissionSetEdit(component, event);
    },
    
    // Event function after editing permission sets
    afterPermissionSetEdit : function(component, event, helper) { 
        var orgId = event.getParam('afterOrgId');
        var permissionSetId = event.getParam('afterPermissionSetId');
        var randomNo = event.getParam("randomNo");
        var flag = event.getParam("afterFlag");
        if(component.get("v.index") === event.getParam('index')){ 
            var randomNumber = component.get("v.randomNumber");
            if($(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNumber)).val() !== null){    
                helper.getObjectDetails(component, event);
            }
            helper.getPermissionSetInfo(component, event, helper, orgId, permissionSetId, randomNo, flag);
        }
    },
    
    // Reset permission set
    resetVal : function(component, event, helper) {
        var code = event.keyCode || event.which;
        var inp = String.fromCharCode(event.keyCode);
        var regExp = /[a-zA-Z0-9-_ ]/;
        if((code === 46 || code === 8 || regExp.test(inp)) && !event.ctrlKey && !(code === 17)){ 
            helper.resetPermissionSet(component,event, helper);
        }else if(code === 86 && event.ctrlKey){
            helper.resetPermissionSet(component,event, helper);
        }
    },
    
    getUserList : function(component, event, helper) { 
        var randomNo = component.get("v.randomNumber");
        var assignUserList = component.get("v.assignUserList");
        var index = component.get("v.index");
        component.getEvent("setAssignUserList").setParams({"assignUserList" : assignUserList, "index" : index}).fire();
    },
    
    setGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
    },
    
    updatedGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
        helper.getConnectedOrg(component, event, helper);
    },
})