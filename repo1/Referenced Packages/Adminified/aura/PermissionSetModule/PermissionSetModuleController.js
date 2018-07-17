({
    /* globals $ */
    // On load script loaded
    documentReady : function(component,event,helper){
        helper.getPermissionSetTemplate(component, event, helper);
        $(document.getElementById('permission-set-search')).off('keypress');
        $(document.getElementById('permission-set-search')).on('keypress', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) { 
                e.preventDefault();
                return false;
            }
        });
        $(document.getElementsByTagName("body")[0].querySelectorAll("select")).attr("disabled", false);
        $(document.getElementsByTagName("body")[0].querySelectorAll("button")).attr("disabled", false);
        $(document.getElementsByTagName("body")[0].querySelectorAll("input")).attr("readonly", false);
        
        $(document.getElementsByTagName("body")).off('click','.clear-icons-permissions');
        $(document.getElementsByTagName("body")).on('click','.clear-icons-permissions',function(){
            var randomNo = this.getAttribute('id');
            randomNo = randomNo.split('-');
            randomNo = randomNo[1];
            if($(document.getElementById('comp'+randomNo).querySelectorAll('.SumoSelect')).hasClass('open'))
                $(document.getElementById('comp'+randomNo).querySelectorAll('.SumoSelect .optWrapper .MultiControls .btnCancel')).click();
            if($(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .SumoSelect .optWrapper ul .selected')).length > 0){
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .CaptionCont span')).html('Object');
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .optWrapper ul li')).removeClass('selected');
                $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNo+' option')).removeAttr("selected");
                $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNo)).val('');
                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-fill')).html('&nbsp;');
                $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+randomNo)).html('&nbsp');
                $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+randomNo)).attr('title', '');
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .CaptionCont')).attr('title', 'Select Here');
                component.getEvent("getAllObjectFromObjectPermissionSetBridges").setParams({}).fire();
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
                component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
            }
        });
        $(document.getElementsByTagName("body")).off('click','.close-model-PermissionSet-icon');
        $(document.getElementsByTagName("body")).on('click','.close-model-PermissionSet-icon',function(){
            $(document.getElementsByClassName('model-append-remove')).hide();
            $(document.getElementsByClassName('setting-profile-layer')).remove();
        });
    },
    
    // Add new permission component
    addComponent : function(component,event,helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        $(document.getElementById('permissionModule').querySelectorAll('.permissionsetscroll')).scrollTop(0);
        $(document.getElementById('permissionModule').querySelectorAll('.permissionsetscroll')).offset().top;
        $(document.getElementById('permissionModule').querySelectorAll('.compare-btn')).attr('disabled', true);
        $(document.getElementById('permissionModule').querySelectorAll('.compare-btn')).html('').append('<span class="loader-active"><svg class="spinnerBlue" width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></span> Add to Compare');
        var isDel = true;
        helper.addPermissionInfoModule(component,event,helper, isDel);
    },
    
    // Delete permission set info component
    deletePermissionSetCmp : function(component, event, helper){
        if(document.getElementsByClassName('permissionsetColSize').length > 1){    
            var permissionSetBody = component.get("v.permissionSetBody");
            permissionSetBody.splice(event.getParam("index"), 1);
            component.set("v.permissionSetBody", permissionSetBody);
            var refCmpBody = component.get("v.permissionSetBody");
            for(var i =0 ; i < refCmpBody.length ; i++){                                   
                refCmpBody[i].set("v.index", i); 
            }
            component.set("v.permissionSetBody", refCmpBody);
            component.set("v.index", refCmpBody.length);
            setTimeout(function() {
                component.getEvent("AdjustInfoBlock").setParams({
                    "colSizeName": "permissionsetColSize",
                    "buttonName": "addMorePermissionSetBtn",
                    "moduleName": "permissionModule",
                    "eventName": "delete"
                }).fire();
                $(document.getElementsByClassName('permissionsetBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
                $(document.getElementsByClassName('permissionsetBorderBottom')).eq($(document.getElementsByClassName('permissionsetBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y');
                
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
                component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
                component.getEvent("getAssignUserListBridge").setParams({}).fire();
                component.getEvent("getAllObjectFromObjectPermissionSetBridges").setParams({}).fire();
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
                component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
                var y = $(document.getElementById('PermissionSetSectionDiv')).offset().top;
                $(document.getElementsByClassName('permissionsetscroll')).height(($(window).height()-y));
                $(document.getElementsByClassName('permissionsetscroll')).on('scroll', function () {
                    $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
                });
            }, 200);
        }
        $(document.getElementById('permission-set-info-section')).contents().each(function(index,currentObje) {
            if(this.nodeType === Node.COMMENT_NODE) {
                var val = this.textContent;
                if(val.indexOf("render facet") > -1){
                    $(this).remove();
                } 
            }
        });
    },
    
    // Display setting
    settingLocal : function(component, event, helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        $(document.getElementsByClassName('local-setting-cls')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        $A.createComponent("stivadmn:AdminGlobalSetting", {
            "flag" : true,
            "settingTabName":"localPermissionSetSetting",
            "settingTemplate" : component.get("v.permissionSetTemplate"),
            "headerSection" : "PermissionSetHeaderSection",
            "settingBlock" : "PermissionSetSettingBlock",
            "moduleName" : "PermissionSet",
            "settingTemplateForLocal" : component.get("v.permissionSetTemplate")
        },  
                           function(newModel){
                               if (component.isValid()) {
                                   component.set("v.adminifiedPermissionSetSettingDiv", newModel);
                               }
                           });
    },
    
    // Diffrence show hide
    hideDiffrences : function(component, event, helper){
        var compDivId = 'PermissionSetSectionDiv';
        var mainModule = 'adminifiedAdminifiedPermissionSetModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedPermissionSetInfo1';//e.g
        document.getElementById("showOnlyPerDiff").checked = false;
        component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'permissionset','showDifference':false}).fire();
    },
    showOnlyDiffrences : function(component, event, helper){
        var compDivId = 'PermissionSetSectionDiv';
        var mainModule = 'adminifiedAdminifiedPermissionSetModule';//e.g. adminifiedAdminifiedUserModule
        var currentComparableModule = 'adminifiedPermissionSetInfo1';//e.g
        if(!document.getElementById("showHidePermissionSet").checked){
            document.getElementById("showHidePermissionSet").checked = true;
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'permissionset','showDifference':false}).fire();  
        }
        component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : compDivId,"mainModule" : mainModule,"currentComparableModule" : currentComparableModule, "tabName" : 'permissionset','showDifference':true}).fire();
    },
    
    
    // Assign user list
    setAssignUserInList : function(component,event,helper){
        if(event.getParam("index") === 0){
            component.set("v.assignUserList", []);
        }
        var assignUserList = component.get("v.assignUserList");
        if(event.getParam("assignUserList") !== null){
            $.each(event.getParam("assignUserList"), function(ind, obj){
                if( $.inArray( obj, component.get("v.assignUserList") ) < 0){
                    assignUserList.push(obj);
                }
            });
        }
        component.set("v.assignUserList", assignUserList);
        if(component.get("v.index") === event.getParam("index")+1){
            // $.each($('#table-'+component.get("v.permissionSetCommonId")+'Assigned_User').find('tr'), function(index, objObj){
            $.each(document.getElementById('table-'+component.get("v.permissionSetCommonId")+'Assigned_User').querySelectorAll('tr'), function(index, objObj){
                var id = objObj.getAttribute('id');
                id = id.split('-');
                if( $.inArray( id[1], assignUserList ) < 0){
                    $(document.getElementsByClassName('user-assigned-'+id[1])).remove();
                }
            }); 
        }
    },
    
    // Model hide
    cancelPermissionSet : function(component, event, helper) {
        $(document.getElementsByClassName('model-append-remove')).hide();
    },
    
    // Save settings
    savePermissionSet:function(component, event, helper) {
        $A.get("e.stivadmn:SaveNewSetting").setParams({"settingTabName":"localPermissionSetSetting", "moduleTemplate":"PermissionsTemplate", "moduleName" : "permissionModule"}).fire();
    },
    
    // Set permission in list
    setObjInListPermissionSet : function(component,event,helper){
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
        if(component.get("v.index") === event.getParam("index")+1){
            $.each(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Object .toggle-'+component.get("v.permissionSetCommonId")+'Object'), function(index, objObj){
                var id = objObj.getAttribute('id');
                var objNameForListChk = id.split(component.get("v.permissionSetCommonId"));
                objNameForListChk = $.trim(objNameForListChk[1]);
                if( $.inArray( objNameForListChk, objList ) < 0){
                    $(document.getElementById('permissionModule').querySelectorAll('#'+id)).remove();
                    var dataTablelen = document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object .chk-object-'+objNameForListChk);
                    for(var i=0;i<dataTablelen.length;i++){
                        $(dataTablelen[i]).remove();  
                    }
                }
            });  
        }
        $.each(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Object .object-name-cls'), function(ind, objObj){
            var objName = this.getAttribute('id');
            $.each($(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-record-type tr')).not(':first'), function(ind1, objObj1){
                var recordType = objObj1.getAttribute('id');
                var flag = true;
                $.each(document.getElementById('permissionModule').querySelectorAll('.rtyp-'+recordType), function(ind11, objObj11){
                    if($(objObj11.querySelectorAll('td')).html() !== '&nbsp;'){
                        flag = false;
                    }
                });
                if(flag){
                    $(objObj1).remove();
                    $.each(document.getElementById('permissionModule').querySelectorAll('.rtyp-'+recordType), function(ind11, objObj11){
                        $(objObj11).remove();
                    });
                }
                if(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-record-type tr').length === 1){
                    $(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-record-type')).hide();
                    var recordLen = document.getElementById('permissionModule').querySelectorAll('.'+objName+'-record-type');
                    for(var i = 0;i<recordLen.length;i++){
                        recordLen[i].style.display = 'none';
                    }
                }    
            });
            
            $.each($(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-layouts tr')).not(':first'), function(ind1, objObj1){
                var layout = objObj1.getAttribute('id');
                var flag = true;
                $.each(document.getElementById('permissionModule').querySelectorAll('.ltyp-'+layout), function(ind11, objObj11){
                    if($(objObj11.querySelectorAll('td')).html() !== '&nbsp;'){
                        flag = false;
                    }
                });
                if(flag){
                    $(objObj1).remove();
                    $.each(document.getElementById('permissionModule').querySelectorAll('.ltyp-'+layout), function(ind11, objObj11){
                        $(objObj11).remove();
                    });
                }
                if(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-layouts tr').length === 1){
                    $(document.getElementById('permissionModule').querySelectorAll('#'+objName+'-layouts')).hide();
                    var layoutLen = document.getElementById('permissionModule').querySelectorAll('.'+objName+'-layouts');
                    for(var j = 0;j<layoutLen.length;j++){
                        layoutLen[j].style.display = 'none';
                    }
                } 
                
            });
            
        });
    },
    
    // Tamplate for search
    getQuickSearchTemplate :function(component, event, helper) {
        if(event.getParam("moduleName") === "permissionModule"){
            component.set("v.permissionSetTemplate", event.getParam("template"));
        }
    },
    
    // Fire event for search
    searchField : function(component,event,helper){
        component.getEvent("QuickSearch").setParams({
            "template" : component.get("v.permissionSetTemplate"),
            "moduleName" : "permissionModule",
            "inputName" : "permissionset",
            "evtName" : "search"
        }).fire(); 
    },
    
    // Fire event for module
    getModuleTemplate : function(component, event, helper) {
        if(event.getParam("moduleName") === "PermissionSet"){
            $A.get("e.stivadmn:SetModuleTemplate").setParams({"template":component.get("v.permissionSetTemplate"), "moduleName" : event.getParam("moduleName")}).fire(); 
        }
    },
    
    //
    setInInstanceListPermission : function(component, event, helper) {
        var instanceList = [];
        var flag = false;
        if(component.get("v.permissionInstanceList") === ''){
            instanceList.push(event.getParam('instanceData'));
            component.set("v.permissionInstanceList", instanceList);
            flag = true;
        }else{
            instanceList = component.get("v.permissionInstanceList");
            if($.inArray( event.getParam('instanceData'), instanceList ) < 0){
                instanceList.push(event.getParam('instanceData'));
                component.set("v.permissionInstanceList", instanceList);
                flag = true;
            }
        }
        
        if(flag){
            $A.get("e.stivadmn:PermissionSetInfoEvent").setParams({
                "permissionSetId" : event.getParam('permissionId'),
                "index" : event.getParam('index'),
                "instanceData" : event.getParam('instanceData')
            }).fire();
            
        }else{
            setTimeout(function(){ 
                $(document.getElementsByClassName('tags_'+event.getParam('randomNo'))).val('') ;
            }, 500);
            $(document.getElementsByClassName('sameInstanceShow')).show();
            $(document.getElementsByClassName('msgCls')).html("<b>"+event.getParam('permissionName')+"</b> already exist. Please select other permission set.");
            
        }
    },
    
    resetInstanceListPermission : function(component,event,helper){
        var instanceList = [];
        instanceList = component.get("v.permissionInstanceList");
        if(instanceList !== ''){if($.inArray( event.getParam('instanceData'), instanceList ) > -1){
            instanceList.splice($.inArray( event.getParam('instanceData'), instanceList ),1);
            component.set("v.permissionInstanceList", instanceList);
        }
                               }
    },
    
    getObjListPermissionSetModule : function(component,event,helper){
        $A.get("e.stivadmn:SetObjPermissionSet").fire();
    },
    
    getUserListPermissionSet : function(component,event,helper){
        $A.get("e.stivadmn:SetAssignUserPermissionSet").fire();
    },
})