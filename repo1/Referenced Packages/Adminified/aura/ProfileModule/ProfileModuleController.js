({
    /* globals $ */
    documentReady : function(component,event,helper){ 
        $(document.getElementsByClassName('profile-Heading-icon')).html('<svg width="32" height="32" viewBox="0 0 24 24" style=" border-radius: 3px;"><g fill="#3c97dd" transform="scale(0.0254375 0.0234375)"><path d="M864 0h-768c-52.8 0-96 43.2-96 96v832c0 52.8 43.2 96 96 96h768c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96zM832 896h-704v-768h704v768zM256 576h448v64h-448zM256 704h448v64h-448zM320 288c0-53.019 42.981-96 96-96s96 42.981 96 96c0 53.019-42.981 96-96 96s-96-42.981-96-96zM480 384h-128c-52.8 0-96 28.8-96 64v64h320v-64c0-35.2-43.2-64-96-64z"></path></g></svg>');
        $(document.getElementsByClassName('header-logo-fieldlevel')).html('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 23.667 27" enable-background="new 0 0 23.667 27" xml:space="preserve" style="background: #3c97dd;border-radius: 3px;"><path fill="white" d="M11.585,1.758c1.31,0,2.382,1.072,2.382,2.382c0,1.309-1.072,2.381-2.382,2.381 c-1.311,0-2.381-1.072-2.381-2.381C9.204,2.831,10.274,1.758,11.585,1.758z M22.303,10.094h-7.146v15.48h-2.382V18.43h-2.382v7.145 H8.013v-15.48H0.867V7.712h21.436V10.094z"></path></svg>');
        
        helper.getProfileTemplate(component, event, helper);
        
        $(document.getElementById('profile-search')).off('keypress');
        $(document.getElementById('profile-search')).on('keypress', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }else{
                helper.profileFieldSearch(component);
            }
        });
        
        $(document.getElementsByTagName("body")).off('click','.close-model-Profile-icon');
        $(document.getElementsByTagName("body")).on('click','.close-model-Profile-icon',function(){
            $(document.getElementsByClassName('model-append-remove')).hide();
            $(document.getElementsByClassName('setting-profile-layer')).remove();
        });
        
        $(document.getElementsByTagName("body")).off('click','.col-exp-btn');
        $(document.getElementsByTagName("body")).on('click','.col-exp-btn',function(){
            if($(this).text() === 'Collapse All'){
                $(this).text('Expand All');
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class table')).hide();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .collapse')).hide();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .expand')).show();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .expand')).removeClass('changeToggle');
            }else{
                $(this).text('Collapse All');
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class table')).show();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .collapse')).show();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .expand')).hide();
                $(document.getElementsByClassName('fieldLevelDpendenciesBody')[0].querySelectorAll('.section-class .toggle-section .expand')).addClass('changeToggle');
            }
        });
        
        $(document.getElementsByTagName("body")).off('click','.clear-icons-profile');
        $(document.getElementsByTagName("body")).on('click','.clear-icons-profile',function(){
            var randomNo = $(this).attr('id');
            randomNo = randomNo.split('-');
            randomNo = randomNo[1];
            if($(document.getElementById('comp'+randomNo).querySelectorAll('.SumoSelect')).hasClass('open'))
                $(document.getElementById('comp'+randomNo).querySelectorAll('.SumoSelect .optWrapper .MultiControls .btnCancel')).click();
            if($(document.getElementById('comp'+randomNo).querySelectorAll('.SumoSelect .optWrapper ul .selected')).length > 0){
                $(document.getElementById('comp'+randomNo).querySelectorAll('.CaptionCont span')).html('Object');
                $(document.getElementById('comp'+randomNo).querySelectorAll('.optWrapper ul li')).removeClass('selected');
                $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNo)).val('');
                $(document.getElementsByClassName('SlectBox_'+randomNo)[0].querySelectorAll('option')).removeAttr("selected");
                $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-fill')).html('&nbsp;');
                $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).html('&nbsp');
                $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).attr('title', '');                
                $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .CaptionCont')).attr('title', 'Select Here');
                component.getEvent("ObjectClose").fire();
                component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
                if(document.getElementById("showOnlyProfileDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
                }
            }
        });
        
        $(document.getElementsByTagName("body")).off('click','.chk-used-status');
        $(document.getElementsByTagName("body")).on('click','.chk-used-status',function(){
            var field = $(this).attr('id');
            var orgArray = [];
            var fieldName;
            var objName;
            var fieldCount;
            field = field.split(',');
            fieldName = field[0];
            objName = field[1];
            $.each(field, function(ind, orgId){
                if(ind > 1){
                    orgArray.push(orgId);
                }
            });
            
            var action = component.get("c.getObjectRecords");
            action.setParams({"orgIds": orgArray, "objName": objName, "fieldName" : fieldName});
            var self = this;
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    $.each(response.getReturnValue(), function(key, val){
                        fieldCount = val.body;
                        var fieldNameLocal = key.split('-');
                        if(fieldCount !== ''){
                            fieldCount = JSON.parse(fieldCount);
                            var totalRecords = $(document.getElementsByClassName('object-fields-status-table thead')[0].querySelectorAll('.total-record-'+fieldNameLocal[0])).text();
                            var fieldPercent = fieldCount.totalSize;
                            if(fieldCount.totalSize > 0){
                                fieldPercent = parseFloat(fieldCount.totalSize*100/totalRecords).toFixed(2);
                            }
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-'+fieldNameLocal[1]+' .'+key)).html(fieldCount.totalSize+'/'+totalRecords);
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-percent-'+fieldNameLocal[1]+' .'+key)).html( fieldPercent+'%');
                        }else{
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-'+fieldNameLocal[1]+' .'+key)).html('N/A');
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-percent-'+fieldNameLocal[1]+' .'+key)).html('N/A');
                        }
                    });
                }
            });
            $A.enqueueAction(action);
        });
    },
    
    addComponent : function(component,event,helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        $(document.getElementById('profileModule').querySelectorAll('.profilescroll')).scrollTop(0);
        if($(document.getElementById('profileModule')).length){
            $(document.getElementById('profileModule').querySelectorAll('.profilescroll')).offset().top;
        }
        $(document.getElementById('profileModule').querySelectorAll('.compare-btn')).attr('disabled', true);
        $(document.getElementById('profileModule').querySelectorAll('.compare-btn')).html('').append('<span class="loader-active"><svg class="spinnerBlue" width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></span> Add to Compare');
        var isDel = true;
        helper.addProfileInfoModule(component, event, helper, isDel);
    },
    
    deleteProfileCmp : function(component, event, helper){
        if($(document.getElementsByClassName('profileColSize')).length > 1){
            var profileBody = component.get("v.profileBody");
            profileBody.splice(event.getParam("index"), 1);
            component.set("v.profileBody", profileBody);
            var refCmpBody = component.get("v.profileBody");
            for(var i =0 ; i < refCmpBody.length ; i++){                                   
                refCmpBody[i].set("v.index", i); 
            }
            component.set("v.profileBody", refCmpBody);
            component.set("v.index", refCmpBody.length);
            setTimeout(function() {
                component.getEvent("AdjustInfoBlock").setParams({
                    "colSizeName": "profileColSize",
                    "buttonName": "addMoreProfileBtn",
                    "moduleName": "profileModule",
                    "eventName": "delete"
                }).fire();
                $(document.getElementsByClassName('profileBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
                $(document.getElementsByClassName('profileBorderBottom')).eq($(document.getElementsByClassName('profileBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y');
                component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
                if(document.getElementById("showOnlyProfileDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
                }
                component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();
                component.getEvent("ObjectClose").setParams({"index" : 1}).fire();
                var y = $(document.getElementById('ProfileSectionDiv')).offset().top;
                $(document.getElementsByClassName('profilescroll')).height(($(window).height()-y));
                $(document.getElementsByClassName('profilescroll')).on('scroll', function () {
                    $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
                });
            }, 200);
        }
        
        $(document.getElementById('profile-info-section')).contents().each(function(index,currentObje) {
            if(this.nodeType === Node.COMMENT_NODE) {
                var val = this.textContent;
                if(val.indexOf("render facet") > -1){
                    $(this).remove();
                } 
            }
        });
    },
    
    getQuickSearchTemplate :function(component, event, helper) {
        if(event.getParam("moduleName") === "profileModule"){
            component.set("v.profileTemplate", event.getParam("template"));
        }
    },
    
    profileSearchField : function(component,event,helper){
        component.getEvent("QuickSearch").setParams({
            "template" : component.get("v.profileTemplate"),
            "moduleName" : "profileModule",
            "inputName" : "profile",
            "evtName" : "search"
        }).fire(); 
    },
    
    settingLocal : function(component, event, helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        $(document.getElementsByClassName('local-setting-cls')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        $A.createComponent("stivadmn:AdminGlobalSetting", {
            "flag" : true,
            "settingTabName":"localProfileSetting",
            "settingTemplate" : component.get("v.profileTemplate"),
            "headerSection" : "ProfileHeaderSection",
            "settingBlock" : "ProfileSettingBlock",
            "moduleName" : "Profile",
            "settingTemplateForLocal" : component.get("v.profileTemplate")
        },  
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.adminifiedProfileSettingDiv", newModel);
                               }
                           });
        
    },
    
    profileDiffrences : function(component, event, helper){    
        var compDivId = 'ProfileSectionDiv';
        var mainModule = 'adminifiedAdminifiedProfileModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedProfileInfo1';//e.g 
        document.getElementById("showOnlyProfileDiff").checked = false;
        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
        
    },
    showOnlyProfileDiff :function(component, event, helper){   
        var compDivId = 'ProfileSectionDiv';
        var mainModule = 'adminifiedAdminifiedProfileModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedProfileInfo1';//e.g 
        if(!document.getElementById("showHideProfileDiff").checked){
            document.getElementById("showHideProfileDiff").checked = true;
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();  
        }
        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();
    },
    
    setObjInList : function(component,event,helper){
        if(event.getParam("index") === 0){
            component.set("v.objList", []);
        }
        var objList = component.get("v.objList");
        if(event.getParam("objList") !== null){
            $.each(event.getParam("objList"), function(ind, obj){
                if( $.inArray( obj, component.get("v.objList") ) < 0){
                    objList.push(obj);
                }
            });
        }
        component.set("v.objList", objList);
        var ind = event.getParam("index");
        ind = parseInt(ind, 10)+1;
        if(component.get("v.index") === ind){
            $.each($(document.getElementById('profileModule').querySelectorAll('#table-'+component.get('v.profileCommonId')+'Object .toggle-'+component.get('v.profileCommonId')+'Object')), function(index, objObj){
                var id = $(objObj).attr('id');
                var objNameForListChk = id.split(component.get('v.profileCommonId'));
                objNameForListChk = $.trim(objNameForListChk[1]);
                if( $.inArray(objNameForListChk, objList ) < 0){
                    $(document.getElementById('profileModule').querySelectorAll('#'+id)).remove();
                    $(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object .chk-object-'+objNameForListChk)).remove();
                }
            });
            
        }
        $.each($(document.getElementById('profileModule').querySelectorAll('#table-'+component.get('v.profileCommonId')+'Object .object-name-cls')), function(index, objObj){
            var objName = $(this).attr('id');
            $.each($(document.getElementById('profileModule').querySelectorAll('#'+objName+'-record-type tr')).not(':first'), function(ind1, objObj1){
                var recordType = $(objObj1).attr('id');
                var flag = true;
                $.each($(document.getElementById('profileModule').querySelectorAll('.rtyp-'+recordType)), function(ind11, objObj11){
                    if($(objObj11.querySelectorAll('td')).html() !== '&nbsp;'){
                        flag = false;
                    }
                });
                if(flag){
                    $(objObj1).remove();
                    $.each($(document.getElementsByClassName('rtyp-'+recordType)), function(ind11, objObj11){
                        $(objObj11).remove();
                    });
                }
                if($(document.getElementById('profileModule').querySelectorAll('#'+objName+'-record-type tr')).length === 1){
                    $(document.getElementById(objName+'-record-type')).hide();
                    $(document.getElementsByClassName(objName+'-record-type')).hide();
                }   
            });
            
            $.each($(document.getElementById('profileModule').querySelectorAll('#'+objName+'-layouts tr')).not(':first'), function(ind1, objObj1){
                var layout = $(objObj1).attr('id');
                var flag = true;
                $.each($(document.getElementById('profileModule').querySelectorAll('.ltyp-'+layout)), function(ind11, objObj11){
                    if($(objObj11.querySelectorAll('td')).html() !== '&nbsp;'){
                        flag = false;
                    }
                });
                if(flag){
                    $(objObj1).remove();
                    $.each($(document.getElementById('profileModule').querySelectorAll('.ltyp-'+layout)), function(ind11, objObj11){
                        $(objObj11).remove();
                    });
                }
                if($(document.getElementById('profileModule').querySelectorAll('#'+objName+'-layouts tr')).length === 1){
                    $(document.getElementById('profileModule').querySelectorAll('#'+objName+'-layouts')).hide();
                    $(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts')).hide();
                }
            });
            
        }); 
    },
    
    cancel : function(component, event, helper) {
        $(document.getElementsByClassName('model-append-remove')).hide();
        $(document.getElementsByClassName('setting-profile-layer')).remove();
    },
    
    save : function(component, event, helper) {
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"localProfileSetting", "moduleTemplate":"ProfileTemplate", "moduleName" : "profileModule"}).fire();
    },
    
    closeModel : function(component, event, helper) {
        var FLAELength = document.getElementById('profileModule').querySelectorAll('.edit-mode-field-permission');
        for(var i = 0;i<FLAELength.length;i++){
            if($(FLAELength[i]).hasClass('not-available-layout')){
                FLAELength[i].classList.remove('not-available-layout');
            }
        }
        $(document.getElementsByClassName('fieldLevelSecurity')).hide();
        $(document.getElementsByClassName('fieldLevelSecurity')[0].querySelectorAll('table tbody tr')).remove();
        $(document.getElementsByClassName('dataImg')).remove();
        $(document.getElementById('view-search')).val('');
        $(document.getElementById('LayoutName')).removeAttr("disabled");
    },
    
    getProfileModuleTemplate : function(component, event, helper) {
        if(event.getParam("moduleName") === "Profile"){
            $A.get("e.stivadmn:SetModuleTemplate").setParams({"template":component.get("v.profileTemplate"), "moduleName" : event.getParam("moduleName")}).fire(); 
        }
    },
    
    setInInstanceList : function(component, event, helper) {
        var instanceList = [];
        var flag = false;
        if(component.get("v.profileInstanceList") === ''){
            instanceList.push(event.getParam('instanceData'));
            component.set("v.profileInstanceList", instanceList);
            flag = true;
        }else{
            instanceList = component.get("v.profileInstanceList");
            if($.inArray( event.getParam('instanceData'), instanceList ) < 0){
                instanceList.push(event.getParam('instanceData'));
                component.set("v.profileInstanceList", instanceList);
                flag = true;
            }
        }
        
        if(flag){
            $A.get("e.stivadmn:ProfileInfoEvent").setParams({
                "profileId" : event.getParam('profileId'),
                "index" : event.getParam('index'),
                "instanceData" : event.getParam('instanceData')
            }).fire();
        }else{
            setTimeout(function(){  $(document.getElementsByClassName('tags_'+event.getParam('randomNo'))).val('') }, 500);
            $(document.getElementsByClassName('sameInstanceShow')).show();
            $(document.getElementsByClassName('msgCls')).html("<b>"+event.getParam('profileName')+"</b> already exist. Please select other profile.");
            
        }
    },
    
    resetInstanceListProfile : function(component,event,helper){
        var instanceList = [];
        instanceList = component.get("v.profileInstanceList");
        if(instanceList !== ''){if($.inArray( event.getParam('instanceData'), instanceList ) > -1){
            instanceList.splice($.inArray( event.getParam('instanceData'), instanceList ),1);
            component.set("v.profileInstanceList", instanceList);
        }
                               }
    },
    
    getObjListAll : function(component,event,helper){
        $A.get("e.stivadmn:SetAllObjEvt").setParams({
            "index" : event.getParam('index')
        }).fire();
    },
    
    createObjStatusComponent : function(component,event,helper){
        $A.createComponent("stivadmn:ObjectFieldStatus", {
            "orgIdArray" : event.getParam('orgIdArray'),
            "orgObj" : event.getParam('orgObj'),
            "objNameMap" : event.getParam('objNameMap'),
            "orgNameArr" : event.getParam('orgNameArr'),
            "objectObj" : event.getParam('objectObj'),
            "status" : event.getParam('status'),
            "objName" : event.getParam('objName')
        },  
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.objectStatus", newModel);
                               }
                           });
    },
    
    createFieldLevelAccessibilityComponent : function(component,event,helper){
        $A.createComponent("stivadmn:FieldLevelAccessibility", {
            "objNameMap" : event.getParam('objNameMap'),
            "profileArray" : event.getParam('profileArray'),
            "layoutName" : event.getParam('layoutName'),
            "profileArr" : event.getParam('profileArr'),
            "idAttrMap":component.get('v.idAttrMap'),
        },  
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.FieldLevelSecurityBody", newModel);
                               }
                           });
    },
    
    closeFieldInfo : function(component, event, helper) {
        $(document.getElementsByClassName('object-fields-status')).hide();
        $(document.getElementsByClassName('object-fields-status')[0].querySelectorAll('table tbody tr')).remove();
        $(document.getElementsByClassName('dataImg')).remove();
    }, 
    
    closeFieldDependModel :function(component, event, helper) {
        $(document.getElementsByClassName('fieldLevelDpendencies')).hide();
    },
    
    showFieldDependencies :function(component, event, helper) {
        $(document.getElementsByClassName('fieldLevelDpendencies')).show();
        $(document.getElementsByClassName('FieldDependentDataLoader')).show();
        $(document.getElementsByClassName('FieldDependentDataLoader')[0].querySelectorAll('.dataLoader')).css('display', 'inline');
        $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies #select-object-dependent')).html('');
        $.each(event.getParam("objList"), function(objkey, objName){
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies #select-object-dependent')).append('<option value="'+objkey+'">'+objkey+'</option>');
        });
        $('#profileModule').find('.fieldLevelDpendencies').find('#select-object-dependent option[value="'+event.getParam("objName")+'"]').prop('selected', true);
        if(component.get("v.FieldDependentModuleBody").length === 0){
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies #select-object-dependent')).prop('disabled','disabled');
            $(document.getElementsByClassName('fieldLevelDpendencies')[0].querySelectorAll('.close-obj-Dpendencies-btn')).prop('disabled','disabled');
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .org-details')).html('');
            
            $.each(event.getParam('orgNameArray'),function(index,value){
                value = value.split('-');
                $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .org-details')).append(' <li style="border-right: 1px solid #d8dde6;padding: 0 10px;"><div class=""><label> <span class=""><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+value[2]+'.png" alt="true'+value[2]+'"/>&nbsp;<img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+value[2]+'.png" alt="false'+value[2]+'"/></span>&nbsp;'+value[1]+'</span></label></div></li>');
            });
            component.set("v.orgNameArrayData",event.getParam('orgNameArray'));
            component.set("v.objNameMap",event.getParam('objNameMap'));
            component.set("v.objName",event.getParam('objName'));
            component.set("v.objListForDependency",event.getParam('objList'));
            $A.createComponent("stivadmn:FieldDependentModule", {
                "orgNameArrayData": event.getParam('orgNameArray'),
                "objName" : event.getParam('objName'),
                "objNameMap" : event.getParam('objNameMap'),
                "objList" : event.getParam('objList')
            },  
                               function(newModel){
                                   if (component.isValid()) {
                                       component.set("v.FieldDependentModuleBody", newModel);
                                   }
                               });
        }else{
            $(document.getElementsByClassName('fieldLevelDpendencies')[0].querySelectorAll('#search-dependent-field')).val('');
            $(document.getElementsByClassName('FieldDependentDataLoader')).hide();
            if (! $(document.getElementById('fieldDependentModule').querySelectorAll('.showErrorobjDepend')).is(':empty')){
                $(document.getElementById('fieldDependentModule').querySelectorAll('.errorobjDepend')).show();
            }
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .btn-col-exp')).hide();
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies .col-exp-btn')).text('Collapse All');
            $(document.getElementById('profileModule').querySelectorAll('.fieldLevelDpendencies #select-object-dependent')).prop('disabled','disabled');
            $(document.getElementsByClassName('FieldDependentDataLoader')).show();
            $(document.getElementsByClassName('FieldDependentDataLoader')[0].querySelectorAll('.dataLoader')).css('display', 'inline');
            $(document.getElementById('fieldDependentModule').querySelectorAll('.showErrorobjDepend')).html('');
            $(document.getElementById('fieldDependentModule').querySelectorAll('.errorobjDepend')).hide();
            $(document.getElementsByClassName('fieldLevelDpendencies')[0].querySelectorAll('.close-obj-Dpendencies-btn')).prop('disabled','disabled');
            component.set("v.objName",event.getParam('objName'));
            component.set("v.orgNameArrayData",event.getParam('orgNameArray'));
            component.set("v.objNameMap",event.getParam('objNameMap'));
            component.set("v.objListForDependency",event.getParam('objList'));
            $A.get("e.stivadmn:showfillDataINFieldDependentModule").setParams({
                "objName" : event.getParam('objName'),
                "objNameMap" : event.getParam("objNameMap"),
                "orgNameArrayData": event.getParam("orgNameArray"),
                "objList" : event.getParam('objList')
            }).fire();
        }
    },
    
    getUsedRowDetails : function(component, event, helper){
        var fieldList = [];
        var flag = false;
        var fieldCount;
        $(document.getElementsByClassName('object-fields-status')[0].querySelectorAll('.object-used-info-loader')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg> Loading...</span>');
        $.each($(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr')), function(index, elementObj){
            if($(elementObj.querySelectorAll('.sndsvr-used-row')).is(":checked")){
                var field =  $(elementObj.querySelectorAll('.chk-used-status')).attr("id");
                flag = true;
                
                if(field.indexOf("-") > -1){
                    field = field.split('-');
                    $.each(field, function(i, eObj){
                        fieldList.push(field[i]);
                    }); 
                }else{ 
                    fieldList.push(field);
                }
                
            }
        });
        if(flag){
            var action = component.get("c.getObjectRecordCountBulk");
            action.setParams({"fieldList": fieldList});
            var self = this;
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    $(document.getElementsByClassName('object-fields-status')[0].querySelectorAll('.object-used-info-loader')).html('Fetch Used Row');
                    $.each(response.getReturnValue(), function(key, val){
                        fieldCount = val.body;
                        var fieldNameLocal = key.split('-');
                        if(fieldCount !== ''){
                            fieldCount = JSON.parse(fieldCount);
                            var totalRecords = $('.object-fields-status-table thead').find('.total-record-'+fieldNameLocal[0]+':first').text();
                            var fieldPercent = fieldCount.totalSize;
                            if(fieldCount.totalSize > 0){
                                fieldPercent = parseFloat(fieldCount.totalSize*100/totalRecords).toFixed(2);
                            }
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-'+fieldNameLocal[0]+' .spn-'+key+' b')).html(fieldCount.totalSize);
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-percent-'+fieldNameLocal[0]+' .spn-'+key+' b')).html( fieldPercent+'%');
                        }else{
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-'+fieldNameLocal[0]+' .spn-'+key+' b')).html('N/A');
                            $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr .used-row-percent-'+fieldNameLocal[0]+' .spn-'+key+' b')).html('N/A');
                        }
                    });
                    $('.object-fields-status-table tbody input:checkbox').removeAttr('checked');
                    $(document.getElementById('select_all_fields')).removeAttr('checked');
                    $(document.getElementsByClassName('object-fields-status-table')[0].querySelectorAll('tbody tr')).removeClass('select-color');
                    $(document.getElementsByClassName('header-object-status')).hide();
                }
            });
            $A.enqueueAction(action);
        }else{
            $(document.getElementsByClassName('cls-notify')[0].querySelectorAll('.notify-msg')).html('&nbsp; Please select record.');
            $(document.getElementsByClassName('cls-notify')).show();
            setTimeout(function(){
                $(document.getElementsByClassName('cls-notify')[0].querySelectorAll('.notify-msg')).html(' ');
                $(document.getElementsByClassName('cls-notify')).hide();
            }, 4000);
            $(document.getElementsByClassName('object-fields-status')[0].querySelectorAll('.object-used-info-loader')).html('Fetch Used Row');
        }
    },
    closeError : function(component, event, helper) {
        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-error')).hide();
    }, 
    
    closeSuccess : function(component, event, helper) {
        $(document.getElementById('profileModule').querySelectorAll('.field-level-accessibility-success')).hide();
    },
    getSetAttrIdInEditList : function(component, event, helper) {
        component.set('v.idAttrMap',event.getParam('idAttrMap'));
    }
})