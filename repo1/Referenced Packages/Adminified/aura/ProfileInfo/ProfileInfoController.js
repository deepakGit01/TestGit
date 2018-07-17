({  
    /* globals $ */
    documentReadyProfile : function(component,event,helper){ 
        $(document.getElementById('profileModule').querySelectorAll('.profileBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementById('profileModule').querySelectorAll('.profileBorderBottom')).eq($(document.getElementsByClassName('profileBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        helper.getConnectedOrg(component, event, helper);
        
        $(document.getElementById('profile_'+component.get("v.randomNumber"))).off("keypress");
        $(document.getElementById('profile_'+component.get("v.randomNumber"))).on("keypress", function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }
        });
        if(component.get("v.index") === 0){
            // Object toggling
            $('body').off('click', '#profileModule .object-toggle');
            $('body').on('click', '#profileModule .object-toggle', function(){
                var id = $(this).closest('tr').attr('id');
                id = $.trim(id.split('_id___')[1]);
                if($(document.getElementById('profileModule').querySelectorAll('.object-permission'+id)).hasClass('object-hide-cls')){
                    $(document.getElementById('profileModule').querySelectorAll('.object-permission'+id)).removeClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-record-type'+id)).removeClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-layouts'+id)).removeClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-'+id+' span .object-close')).addClass('object-open');
                }else{
                    $(document.getElementById('profileModule').querySelectorAll('.object-permission'+id)).addClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-record-type'+id)).addClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-layouts'+id)).addClass('object-hide-cls');
                    $(document.getElementById('profileModule').querySelectorAll('.object-'+id+' span .object-open')).removeClass('object-open').addClass('object-close');
                }
            });
            
            //Select object functionality
            $('body').off('click', '.SumoSelect');
            $('body').on('click', '.SumoSelect', function(e) {
                if($(this.querySelectorAll('ul .selected')).length > 0){
                    if(!$(this.querySelectorAll('ul')[0].closest('div')).find('.btnOk').hasClass('activecls'))
                        $(this.querySelectorAll('ul')[0].closest('div')).find('.btnOk').addClass('activecls');
                }else{
                    if($(this.querySelectorAll('ul')[0].closest('div')).find('.btnOk').hasClass('activecls'))
                        $(this.querySelectorAll('ul')[0].closest('div')).find('.btnOk').removeClass('activecls');
                }
            });         
            
            
            //Show Hide field level accessiblity 
            $('body').off('click', '.change-chk');
            $('body').on('click', '.change-chk', function(e) {
                var profileId = $(this).attr('id');
                profileId = profileId.split('-');
                var profile = profileId[1];
                var orgId = profileId[2];
                var icon = $(this).attr('name');
                if($(this).is(":checked")){
                    $(document.getElementById('profileModule').querySelectorAll('.render-cls-'+profile+'-'+orgId+'__'+icon)).show();
                }else{
                    $(document.getElementById('profileModule').querySelectorAll('.render-cls-'+profile+'-'+orgId+'__'+icon)).hide();
                }
            });
            
            // Search Object
            $('body').off('click', '#profileModule .btnOk');
            $('body').on('click', '#profileModule .btnOk', function(e) {
                var rno = $(this).attr('id');
                $(document.getElementById('search_object_'+rno)).click();
            });
            
            //View Object Status 
            $('body').off('click','.object-status-info');
            $('body').on('click','.object-status-info',function(){
                var id = $(this).attr('id');
                id = id.split(',');
                var objName = id[0];
                var objForSelect = objName;
                var objNameMap = {};
                var orgIdArray = [];
                var orgObj = {};
                var orgNameArr = [];
                var objectObj = {};
                var status = 'FromObject';
                $.each($(document.getElementById('profileModule').querySelectorAll('.object-cls')), function(index, elementObj){
                    
                    var objectArray = [];
                    var objectApiName = '';
                    objectArray = $(this).val();
                    if(objectArray !== null){
                        var rno = $(this).attr('id');
                        rno = $.trim(rno.split('_id___')[1]);
                        rno = rno.split('_');
                        if($(document.getElementById('profile-namespace-'+rno[1])).text() !== '' && objName.indexOf('__c') > -1){
                            objName = $(document.getElementById('profile-namespace-'+rno[1])).text()+'__'+objName;
                        }
                        if($.inArray(objName, objectArray) > -1){
                            var oId = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).val();
                            var orgName = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).text();
                            orgIdArray.push(oId);
                            orgObj[oId] = orgName;
                            objNameMap[oId] = objName;
                            orgNameArr.push(orgName);
                        }else{
                            objName = objForSelect;
                        }
                    }
                });
                $.each($(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object .object-for-chk-status')), function(index, elementObj){
                    var splitId = $(this).attr('id');
                    splitId = $.trim(splitId.split('_id___')[1]);
                    objectObj[splitId] = $(this.querySelectorAll('b')).text();
                });
                component.getEvent("CreateObjectFieldStatus").setParams({"orgObj" : orgObj,"orgIdArray" : orgIdArray, "objNameMap" : objNameMap, "orgNameArr" : orgNameArr, "objectObj" : objectObj, "status" : status, "objName" : objForSelect}).fire();
            });
            
            // Field level accessibility
            $('body').off('click', '.fieldLevelView');
            $('body').on('click', '.fieldLevelView', function(e) {
                var id = $(this).attr('id');
                id = id.split(',');
                var recordTypeId = id[0];
                var objName = id[1];
                var objTemp = objName;
                var orgId = id[2];
                var lay = id[4];
                var profileIds = '';
                var layoutName = lay;
                var folder = 'SingleColor';  
                $(document.getElementById('profileModule').querySelectorAll('.field-level-accessible-edit')).html('');
                $(document.getElementById('profileModule').querySelectorAll('#LayoutName')).attr("disabled", true);
                $(document.getElementById('profileModule').querySelectorAll('#view-search')).attr("readonly", "readonly");
                $(document.getElementById('profileModule').querySelectorAll('#LayoutName option')).remove();
                $.each($(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts-table tr')), function(ind, obj){
                    if(ind === 0){
                    }else{
                        var rType = $(obj).find('td').text();
                        rType = rType.split('View field level accessibility.');
                        rType = rType[0];
                        $(document.getElementById('profileModule').querySelectorAll('#LayoutName')).append('<option value="'+$(obj).find('a').attr('id')+'">'+rType+'</option>');
                    }
                });
                
                $('#profileModule').find('#LayoutName option[value="'+$(this).attr('id')+'"]').attr('selected', 'selected');
                $(document.getElementById('profileModule').querySelectorAll('.remove-profile')).remove();
                var orgArray = {};
                var profileArr = [];
                var objectOrgMap = {};
                $.each($(document.getElementById('profileModule').querySelectorAll('.profileAuto')), function(ind, obj){
                    var profileName = $(obj).val();
                    if(profileName !== ''){
                        var profileId = $(obj).attr('name');
                        var profile_id = $(obj).attr('id');
                        profile_id = profile_id.split('_');
                        var oId = $(document.getElementById('profileModule').querySelectorAll('#comp'+profile_id[1]+' .select-org'+profile_id[1]+' .selected')).val();
                        var orgName = $(document.getElementById('profileModule').querySelectorAll('#comp'+profile_id[1]+' .select-org'+profile_id[1]+' .selected')).text();
                        var img = '';
                        
                        if(typeof($(obj).attr('name')) !== 'undefined'){
                            var objectList = $(document.getElementById('profileModule').querySelectorAll('#comp'+profile_id[1]+' #'+component.get('v.profileCommonId')+'object_'+profile_id[1])).val();
                            var objectApiName = '';
                            var flagObj = false;
                            
                            if($(document.getElementById('profile-namespace-'+profile_id[1])).text() !== '' && objName.indexOf('__c') > -1){
                                objName = $(document.getElementById('profile-namespace-'+profile_id[1])).text()+'__'+objName;
                            }
                            objectOrgMap[oId] = objName;
                            if($.inArray(objName, objectList) !== -1){
                                if(ind === 0){
                                    orgArray[oId] = profileId;                        
                                }else{
                                    if(typeof(orgArray[oId]) === 'undefined'){
                                        orgArray[oId] = profileId;
                                    }else{
                                        var arrUpdate = orgArray[oId];
                                        arrUpdate = arrUpdate+','+profileId;
                                        orgArray[oId] = arrUpdate;
                                    }
                                }
                            }else{
                                objName = objTemp;
                            }
                            var size = ind+1;
                            img = ''+size;
                            $(document.getElementById('profileModule').querySelectorAll('.profileFieldLevel')).append('<li class="ui toggle checkbox remove-profile"><input name="'+img+'" class="size-cls change-chk field-profile-cls" type="checkbox" id="profile-'+profileId+'-'+oId+'" disabled="disabled" checked/><label class="slds-checkbox"> <span class=""><img src="/resource/stivadmn__Icons/'+folder+'/'+img+'.png" alt="True" />&nbsp;<img src="/resource/stivadmn__Icons/'+folder+'/'+img+'-'+img+'.png" alt="False" /></span> &nbsp; '+profileName+'<span class="org-name">('+orgName+')</span></label></li>');
                            $(document.getElementById('profileModule').querySelectorAll('.field-level-accessible-edit')).append('<li class="slds-dropdown__item"><a href="javascript:void(0);" id="'+profileId+'-'+oId+'" class="edit-mode-field-permission edit-mode-field-permission-'+profileId+'-'+oId+' not-available-layout" role="menuitem"><span class="slds-icon__container slds-icon-utility -setup cAdminifiedIcons edit-field-icon"></span><p class="slds-truncate">'+profileName+'<span class="org-name">('+orgName+')</span></p></a></li>');
                            profileArr.push(profileId+'-'+oId+'-'+size);
                        }
                    }
                });
                component.set('v.profileMap', orgArray);
                component.set('v.objNameMap', objectOrgMap);
                component.getEvent("CreateFieldLevelAccessible").setParams({"objNameMap" : objectOrgMap,"layoutName" : layoutName, "profileArray" : orgArray, 'profileArr' : profileArr}).fire();
            });
            
            // View Object status change object
            $('body').off('change','.object-change-details');
            $('body').on('change','.object-change-details',function(){
                var objName = $(this).val();
                var objForSelect = objName;
                var objNameMap = {};
                var orgIdArray = [];
                var orgObj = {};
                var orgNameArr = [];
                var objectObj = {};
                var status = 'FromObjectSelect';
                $.each($(document.getElementById('profileModule').querySelectorAll('.object-cls')), function(index, elementObj){ 
                    var objectArray = [];
                    var objectApiName = '';
                    objectArray = $(this).val();
                    if(objectArray !== null){
                        var rno = $(this).attr('id');
                        rno = $.trim(rno.split('_id___')[1]);
                        rno = rno.split('_');
                        if($(document.getElementById('profile-namespace-'+rno[1])).text() !== '' && objName.indexOf('__c') > -1){
                            objName = $(document.getElementById('profile-namespace-'+rno[1])).text()+'__'+objName;
                        }
                        if($.inArray(objName, objectArray) > -1){
                            var oId = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).val();
                            var orgName = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).text();
                            orgIdArray.push(oId);
                            orgObj[oId] = orgName;
                            objNameMap[oId] = objName;
                            orgNameArr.push(orgName);
                        }else{
                            objName = objForSelect;
                        }
                    }
                });
                $.each($(document.getElementById('profileModule').querySelectorAll('.Object .object-for-chk-status')), function(index, elementObj){
                    objectObj[$(this).attr('id')] = $(this.querySelectorAll('b')).text();
                });
                
                component.getEvent("CreateObjectFieldStatus").setParams({"orgObj" : orgObj,"orgIdArray" : orgIdArray, "objNameMap" : objNameMap, "orgNameArr" : orgNameArr, "objectObj" : objectObj, "status" : status, "objName" : objForSelect}).fire();
            });
            
            //View Object Dependency            
            $('body').off('click', '.object-dependency-info');
            $('body').on('click', '.object-dependency-info', function(e) {
                var id = $(this).attr('id');
                id = id.split(',');
                var objName = id[0];
                var objNameMap = {};
                objName = objName.split('-')[1].replace(/[\ ]+/g, "");
                var objForDisplay = objName;
                var objLabel = $('.SlectBox_'+component.get("v.randomNumber")+' option[value="'+objName+'"]').text();
                var profileArr = [];
                var orgNameArray = {};
                var objectObj = {};
                var iconShapMap = {"0":"Circle","1":"Square","2":"Triangle"};
                var orgArray = [];
                
                $.each($(document.getElementById('profileModule').querySelectorAll('.object-cls')), function(index, elementObj){
                    var objectArray = [];
                    var objectArrayNew = [];
                    var objectApiName = '';
                    objectArray = $(this).val();
                    if(objectArray !== null){
                        var rno = $(this).attr('id');
                        rno = $.trim(rno.split('_id___')[1]);
                        rno = rno.split('_');
                        if($(document.getElementById('profile-namespace-'+rno[1])).text() !== '' && objName.indexOf('__c') > -1){
                            objName = $(document.getElementById('profile-namespace-'+rno[1])).text()+'__'+objName;
                        }
                        if($.inArray(objName, objectArray) > -1){
                            var oId = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).val();
                            var orgName = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).text();
                            
                            var showIconShap = '';
                            showIconShap = iconShapMap[""+index];
                            if($.inArray(orgName, orgArray) === -1){
                                orgArray.push(orgName);
                                orgNameArray[oId] = 'profile Name'+'-'+orgName+'-'+showIconShap+'-'+objName;
                            }
                            objNameMap[oId] = objName;
                        }else{
                            objName = objForDisplay;
                        }
                    }
                });
                $.each($(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object .object-for-chk-status')), function(index, elementObj){
                    var splitId = $(this).attr('id');
                    splitId = $.trim(splitId.split('_id___')[1]);
                    objectObj[splitId] = $(this.querySelectorAll('b')).text();
                });
                component.getEvent("showFieldDependencies").setParams({"orgNameArray":orgNameArray,"objNameMap":objNameMap,"objName":objForDisplay,"objLabel":objLabel,"objList":objectObj}).fire();
            });
            
            // Change Object In Dependency Modal
            $('body').off('change','.object-change-dependent-details');
            $('body').on('change','.object-change-dependent-details',function(){
                var objName = $(this).val();
                var objForDisplay = objName;
                var objLabel = $('.SlectBox_'+component.get("v.randomNumber")+' option[value="'+objName+'"]').text();
                var orgArray = {};
                var profileArr = [];
                var orgNameArray = {};
                var objectObj = {};
                var objNameMap = {};
                var iconShapMap = {"0":"Circle","1":"Square","2":"Triangle"};
                $.each($(document.getElementById('profileModule').querySelectorAll('.object-cls')), function(index, elementObj){ 
                    var objectArray = [];
                    var objectArrayNew = [];
                    var objectApiName = '';
                    objectArray = $(this).val();
                    if(objectArray !== null){
                        var rno = $(this).attr('id');
                        rno = $.trim(rno.split('_id___')[1]);
                        rno = rno.split('_');
                        if($(document.getElementById('profile-namespace-'+rno[1])).text() !== '' && objName.indexOf('__c') > -1){
                            objName = $(document.getElementById('profile-namespace-'+rno[1])).text()+'__'+objName;
                        }
                        
                        if($.inArray(objName, objectArray) > -1){
                            var oId = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).val();
                            var orgName = $(document.getElementById('profileModule').querySelectorAll('#comp'+rno[1]+' .select-org'+rno[1]+' .selected')).text();
                            var showIconShap = '';
                            showIconShap = iconShapMap[""+index];
                            orgNameArray[oId] = 'profile Name'+'-'+orgName+'-'+showIconShap+'-'+objName;
                            objNameMap[oId] = objName;
                        }else{
                            objName = objForDisplay;
                        }
                        
                    }
                });
                $.each($(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object .object-for-chk-status')), function(index, elementObj){
                    var splitId = $(this).attr('id');
                    splitId = $.trim(splitId.split('_id___')[1]);
                    objectObj[splitId] = $(this.querySelectorAll('b')).text();
                });
                component.getEvent("showFieldDependencies").setParams({"orgNameArray":orgNameArray,"objNameMap":objNameMap,"objName":objForDisplay,"objLabel":objLabel,"objList":objectObj}).fire();
            });
            
        }
    },
    
    getTemplateData : function(component, event, helper){
        component.set("v.profileTemplateData",event.getParam("profileTemplateData"));
    },
    
    getOrgCmpDetails : function(component, event, helper){
        if(component.get("v.index") === event.getParam('index')){ 
            var opts = [{ "class": "optionClass", label: event.getParam("userName"), value:  event.getParam("userName"), selected: "true"}];
            var orgType = '';
            var userName = '';
            if(event.getParam("instaceType") === "Sandbox"){
                orgType = "Sand";
                userName = event.getParam("userName")+' ('+orgType+')';
            }else{
                userName = event.getParam("userName");
            }
            var msg = 'Successfully save organization '+userName;
            $(document.getElementsByClassName('success-msg')).html(msg);
            $(document.getElementsByClassName('alert-success')).show();
            component.set("v.strOrgId", event.getParam("orgId"));
            $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val(userName);
            helper.getOrgProfiles(component, event, helper);
        }
    },
    
    getOrgProfilesData : function(component, event, helper) {
        if(component.get("v.index") === event.getParam('index')){ 
            component.set("v.strOrgId", event.getParam("OrgId"));
            helper.getOrgProfiles(component, event, helper);
        }
    },
    
    getProfileDetail : function(component, event, helper) { 
        var orgId = component.get("v.strOrgId");
        var profileId = event.getParam('profileId');
        var randomNo = component.get("v.randomNumber");
        var flag = false;
        if(component.get("v.index") === event.getParam('index')){
            component.set("v.profileInstanceData", event.getParam('instanceData'));
            helper.getProfileInfo(component, event, helper, orgId, profileId, randomNo, flag);
            
        }
    },
    
    deleteProfileCmp : function(component, event, helper) { 
        
        $(document.getElementById('profileModule').querySelectorAll('.profileBorderBottom')).next().removeClass('slds-scrollable--y').removeClass('srollbarNone');
        $(document.getElementById('profileModule').querySelectorAll('.profileBorderBottom')).eq($(document.getElementsByClassName('profileBorderBottom')).length - 1).next().removeClass('srollbarNone').removeClass('slds-scrollable--y');
        $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).addClass('slide-delete');
        $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "0.5"}, 1000);
        
        if(component.get("v.profileInstanceData") !== ''){
            component.getEvent("ResetInstanceDataListProfile").setParams({"instanceData":component.get("v.profileInstanceData")}).fire();
        }
        setTimeout(function() {
            $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 200);
            component.getEvent("deleteProfileCmpEvent").setParams({
                "index" : component.get("v.index")
            }).fire();
            if($(document.getElementById('profileModule').querySelectorAll(".spanLegend")).length ===2 && $(document.getElementById('profileModule').querySelectorAll('.spanLegend')).eq(1).text()==='Triangle'){
                $.each($(document.getElementById('profileModule').querySelectorAll(".icon_Triangle")), function(ind, objObj){
                    var iconHTtml = $(this).html();
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    iconHTtml = iconHTtml.replace('Triangle', 'Square');
                    $(this).html(iconHTtml);
                });
                $(document.getElementById('profileModule').querySelectorAll('.spanLegend')).eq(1).text('Square');
            }
        }, 700);
        
        
        
    },
    
    addOrganization : function(component, event, helper) { 
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        event.preventDefault();
        var index = component.get("v.index");
        $A.createComponent("stivadmn:ConnectToOrganization", {
            "aura:id": "ConnectToOrganization", 
            "index" : index,
            "randomNumber" : component.get("v.randomNumber"),
            "moduleName" : "profileModule"
        }, function(newModel){
            if (component.isValid()) {
                var body = component.find("orgnizationDiv");
                body.set("v.body", newModel);
            }
        });
    },
    
    editProfile : function(component, event, helper) { 
        helper.profileEdit(component, event);
    },
    
    getObjectDetails : function(component, event, helper) {
        var randomNumber = component.get("v.randomNumber");
        if($(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).val() !== null){
            helper.getObjectDetails(component, event);
        }else{
            $(document.getElementById('profileModule').querySelectorAll('.Object-'+randomNumber+'-fill')).html('&nbsp;');
            component.getEvent("getAllObjectFromObject").setParams({"index" : component.get("v.index")}).fire();
            var msg = 'Select at least one object';
            $(document.getElementsByClassName('error-msg')).html(msg);
            $(document.getElementsByClassName('set-btn')).hide();
            $(document.getElementsByClassName('alert-error')).show();
        }
    },
    
    afterProfileEdit : function(component, event, helper) { 
        var orgId = event.getParam('afterOrgId');
        var profileId = event.getParam('afterProfileId');
        var randomNo = event.getParam("randomNo");
        var flag = event.getParam("afterFlag");
        if(component.get("v.index") === event.getParam('index')){ 
            if($(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNo)).val() !== null && $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNo)).val() !== ''){
                helper.getObjectDetails(component, event);
            }
            helper.getProfileInfo(component, event, helper, orgId, profileId, randomNo, flag);
            
            
        }
    },
    
    getObjList : function(component, event, helper) {
        var randomNo = component.get("v.randomNumber");
        var objList =  $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNo)).val();
        var objList1 = [];
        if(objList !== null){
            $.each(objList, function(ind, objApi){
                var objName = '';
                if(component.get("v.orgNameSpace") !== '' && objApi.indexOf(component.get("v.orgNameSpace")+'__') > -1){
                    objName = objApi.replace(component.get("v.orgNameSpace")+'__','');
                }else{
                    objName = objApi
                }
                objList1.push(objName);
            }); 
        }
        if(objList1.length !== component.get("v.objectNameList").length){
            component.set("v.objectNameList", []);
        }
        var index = component.get("v.index");
        component.getEvent("setObjectInProfileObj").setParams({"objList" : objList1, "index" : index}).fire();
    },
    
    resetVal : function(component, event, helper) {
        var code = event.keyCode || event.which;
        var inp = String.fromCharCode(event.keyCode);
        var reg = /[a-zA-Z0-9-_ ]/;
        if((code === 46 || code === 8 || reg.test(inp)) && !event.ctrlKey && !(code === 17)){ 
            helper.resetProfile(component);
        }else if(code === 86 && event.ctrlKey){
            helper.resetProfile(component);
        }
    },
    
    setGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
    },
    
    updatedGlobalOrg  : function(component, event, helper) { 
        component.set("v.globalOrg", event.getParam("globalOrg"));
        helper.getConnectedOrg(component, event, helper);
    },
    
})