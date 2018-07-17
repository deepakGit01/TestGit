({
    /* globals $ */
    getConnectedOrg: function(component, event, helper) {
        function selectItemByValue(elmnt, value){
            var optn;
            for(var i=0; i < elmnt.options.length; i++)
            {   
                if(elmnt.options[i].value === value) {
                    elmnt.selectedIndex = i;
                    optn = elmnt.options[i];
                    break;
                }
            }
            return optn;
        }
        component.getEvent("GetGlobalOrg").fire();
        var conOrgs = component.get("v.globalOrg");
        if (conOrgs !== undefined && conOrgs !== null) {
            var opts = [];
            var options = {};
            var opt_str = '';
            $.each(conOrgs, function(idx, obj){
                var orgType = '';
                if(typeof(obj.stivadmn__Instance_Type__c) !== "undefined"){
                    if(obj.stivadmn__Instance_Type__c === "Sandbox"){
                        orgType = "Sand";
                        options =  { class: "optionClass", label: obj.stivadmn__User_Name__c+" ("+orgType+")", value: obj.stivadmn__Organization_ID__c };
                        opt_str = opt_str + '<option class="optionClass" value="' + obj.stivadmn__Organization_ID__c + '">' + obj.stivadmn__User_Name__c+" ("+orgType+")" + '</option>';
                    }else{
                        options =  { class: "optionClass", label: obj.stivadmn__User_Name__c, value: obj.stivadmn__Organization_ID__c };                  
                        opt_str = opt_str + '<option class="optionClass" value="' + obj.stivadmn__Organization_ID__c + '">' + obj.stivadmn__User_Name__c+ '</option>';
                    }                  
                }else{
                    options =  { class: "optionClass", label: obj.stivadmn__User_Name__c, value: obj.stivadmn__Organization_ID__c }; 
                    opt_str = opt_str + '<option class="optionClass" value="' + obj.stivadmn__Organization_ID__c + '">' + obj.stivadmn__User_Name__c+ '</option>';
                }
                opts.push(options);  
            });
            $(document.getElementById('permissionModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))).html(opt_str);
            $(document.getElementById('permissionModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))[0]).combobox1({
                source: opts,
                select:function(e, ui){
                    $(document.getElementById('permissionModule').querySelectorAll('.tags_'+component.get("v.randomNumber"))[0]).autocomplete({
                        source : []
                    });
                    component.set("v.orgId", e.target.value);
                    component.getEvent("GetOrgPermissionSet").setParams({
                        "OrgId" :  e.target.value,
                        "index" : component.get("v.index")
                    }).fire();
                    $(document.getElementById('permissionModule').querySelectorAll('.selOrg option')).each(function(i, val){
                        if(e.target.value === $(this).val()){
                            component.set("v.strOrgName", $(this).text());
                        }
                    });
                }                   
            });
            if(component.get("v.orgId") !== undefined){
                $(document.getElementById('permissionModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))[0]).closest('span').find('input').val(component.get("v.strOrgName"));
            }else{
                $(document.getElementById('permissionModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))[0].closest('span').querySelectorAll('input')[0]).val('');
            }
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).on('keyup keypress', function(e){
                var code = e.keyCode || e.which;
                var inp = String.fromCharCode(e.keyCode);
                var randomNumber ;
                var temp;
                var regExp = /[a-zA-Z0-9-_ ]/;
                if((code === 46 || code === 8 || regExp.test(inp)) && !e.ctrlKey && !(code === 17)){ 
                    randomNumber = component.get("v.randomNumber");
                    temp = null;
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).val('');
                    component.set("v.allPermissionSet", temp);
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).autocomplete({ 
                        source : []
                    });
                    helper.resetPermissionSet(component,event, helper);
                }else if(code === 86 && e.ctrlKey){
                    randomNumber = component.get("v.randomNumber");
                    temp = null;
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).val('');
                    component.set("v.allPermissionSet", temp);
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).autocomplete({ 
                        source : []
                    });
                    helper.resetPermissionSet(component,event, helper);
                }
            });
            $(document.getElementById('permissionModule').querySelectorAll('.custom-combobox-input')).addClass('slds-input slds-input--small custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left val ui-autocomplete-input'); 
            $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />'); 
            if(!event.getParam("isRefreshOrg")){
                helper.getJSONData(component, event, helper); 
            }else{
                if(event.getParam("action") === "Add"){
                    if(component.get("v.index") === event.getParam("index") && event.getParam("moduleName") === 'permissionModule'){ 
                        var randomNumber = component.get("v.randomNumber");
                        var userName = event.getParam("userName");
                        var msg = 'Successfully saved organization '+userName;
                        $(document.getElementsByClassName('success-msg')).html(msg);
                        $(document.getElementsByClassName('alert-success')).show();
                        component.set("v.strOrgId", event.getParam("orgId"));
                        component.set("v.orgId", event.getParam("orgId"));
                        component.set("v.strOrgName", userName);
                        if(typeof event.getParam("randomNumber") === undefined ){
                            event.setParam("randomNumber", component.get("v.randomNumber"));
                        }
                        $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.custom-combobox-input')).val('');
                        $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).autocomplete({
                            source : []
                        });
                        this.getOrgPermissionSet(component, event, helper);
                        $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.custom-combobox-input')).val(userName);
                        $(document.getElementsByClassName('select-org'+event.getParam("randomNumber"))[0].querySelectorAll('option')).removeAttr('selected');
                    }
                }
                if(event.getParam("action") === "Delete"){
                    if(component.get("v.strOrgId") === event.getParam("orgId")){
                        var DeleteRandomNumber = component.get("v.randomNumber");
                        var DeleteTemp = null;
                        $(document.getElementById('permissionModule').querySelectorAll('#permission_'+DeleteRandomNumber)).val('');
                        component.set("v.allPermissionSet", DeleteTemp);
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val('');
                        $(document.getElementById('permissionModule').querySelectorAll('#permission_'+DeleteRandomNumber)).autocomplete({
                            source : []
                        });
                        helper.resetPermissionSet(component,event, helper);
                        $(document.getElementsByClassName('custom-combobox-input')).addClass('slds-input slds-input--small custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left val ui-autocomplete-input'); 
                        $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
                        
                    }
                    setTimeout(function(){
                        var optSelect = selectItemByValue(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))[0],component.get("v.strOrgId"));
                        $(optSelect).addClass('selected');
                        
                    }, 2000);
                    
                }
            }
            
        }
        
    },
    
    permissionSetEdit : function(component, event){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        $(document.getElementById('permissionModule').querySelectorAll('.btn-'+component.get("v.randomNumber")+' .edit-PermissionSet-cls')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        
        var PermissionSetObj = component.get("v.permissionSetInfo");
        var randomNo = component.get("v.randomNumber");
        var permissionSetStruct = component.get("v.permissionSetTemplate");
        var orgId = component.get("v.strOrgId");
        var permissionSetId = component.get("v.strPermissionSetId");
        var permissionSetName = component.get("v.strPermissionSetName");
        var index = component.get("v.index");
        var orgName = component.get("v.strOrgName");
        var objectNameList = component.get("v.objectNameList");
        var objectPermissions = component.get("v.objectPermissions");
        var orgNameSpace = component.get("v.orgNameSpace");
        $A.createComponent("stivadmn:PermissionSetEdit", {"permissionSetData": PermissionSetObj, "orgId" : orgId, "permissionSetId" : permissionSetId, "permissionSetStructure" : permissionSetStruct, "randomNo" : randomNo, "permissionSetName" : permissionSetName, "index" : index, "strOrgName" : orgName, "objectNameList" : objectNameList, "objectPermissions" : objectPermissions, 'orgNameSpace' : orgNameSpace}, function(newModel){
            if (component.isValid()) {
                var body = component.find("editPermissionSet");
                body.set("v.body", newModel);
            }
        });
    },
    
    getJSONData : function(component, event, helper){
        var templtData = component.get('v.permissionSetTemplate');
        if (templtData !== null || templtData !== undefined) {
            var temp = '';
            var isHeader = false;
            var sectionDisplayClass = '';
            var feildDisplayClass = '';
            var collapsedClass = '';
            var html = '';
            var divClass = '';
            var filteredClass = '';
            var randomNumber1 = component.get("v.randomNumber");
            $.each(templtData, function(sectionKey, sectionObj){
                temp = '';
                sectionDisplayClass = '';
                feildDisplayClass = '';
                collapsedClass = '';
                divClass = '';
                filteredClass = '';
                if(!sectionObj.display){
                    sectionDisplayClass = 'section-field-hide';
                }
                if(templtData !== null){
                    if(templtData[sectionKey].isCollapsed){ 
                        collapsedClass = 'toggle-section-panel'; 
                    }
                }
                if(!isHeader){
                    isHeader = true;
                    divClass = 'slds-col-rule--top';
                }
                $.each(sectionObj.fields, function(fieldKey, fieldObj){
                    fieldKey = $.trim(fieldKey);
                    if(!fieldObj.display){
                        feildDisplayClass = 'section-field-hide';
                    }else{
                        feildDisplayClass = '';
                    }
                    if(templtData !== null){ 
                        if(!templtData[sectionKey].fields[fieldKey].isFiltered){
                            filteredClass = 'hide-row';
                        }else{
                            filteredClass = '';
                        }
                    }
                    temp += '<tr  class="'+fieldKey+' '+feildDisplayClass+' '+filteredClass+' permissionset-search-'+fieldKey+' setting-'+fieldKey+' datarow "><td data-label="stage" class="data-field permissionset-'+randomNumber1+'-'+fieldKey+'">&nbsp;</td></tr>';
                });
                html += '<div class="'+component.get("v.permissionSetCommonId")+''+sectionKey+' '+sectionDisplayClass+' permissionset-section-class section-class setting-'+sectionKey+'"><p class="toggle-section slds-truncate textUppercase "><button class="slds-button slds-button--icon-container focus-none"></button></p><table class="slds-table toggelClass slds-table--bordered '+collapsedClass+' toggle-'+component.get("v.permissionSetCommonId")+''+sectionKey+' data-table-'+component.get("v.permissionSetCommonId")+''+sectionKey+'" id="'+component.get("v.permissionSetCommonId")+''+sectionKey+'-'+randomNumber1+'""><tbody>'+temp+'</tbody></table></div>';
            });
            var randomNumber = component.get('v.randomNumber'); 
            $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).SumoSelect({ csvDispCount: 4, search: true, searchText: 'Enter object...', okCancelInMulti: true });
            $(document.getElementById('permissionModule').querySelectorAll('.CaptionCont .placeholder')).html('Object');
            $(document.getElementById('permissionModule').querySelectorAll('.CaptionCont label')).html('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right" style="height: 30px;width: 2.6em"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></a>');
            $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).after('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle clear-icons clear-icons-permissions" id="clear-'+randomNumber+'" title="Clear"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg></a>');
            $(document.getElementById('permissionModule').querySelectorAll('.tags')[0]).addClass('tags_'+randomNumber).removeClass('tags');
            $(document.getElementById('permissionModule').querySelectorAll('.permissionsetCmpAppend_'+component.get("v.randomNumber"))[0]).append(html);
            temp = '';
            var myRegExp;
            if($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User tr')).length > 0){
                var id = $(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User')).attr('id');
                myRegExp = new RegExp(id,'gi');
                var id1 = component.get("v.permissionSetCommonId")+'Assigned_User-'+component.get("v.randomNumber");
                var tbody = $(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User')).html();
                var tbody1 = tbody.replace(myRegExp, id1);
                $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Assigned_User-'+component.get("v.randomNumber"))).html(tbody1);
                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+component.get("v.randomNumber")+'-fill')).html('&nbsp;');
                if($(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+component.get("v.randomNumber")+'-fill')).parent('tr').hasClass('difference-row')){
                    $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+component.get("v.randomNumber")+'-fill')).parent('tr').removeClass('difference-row');
                }
            }
            
            if($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object tr')).length > 0){
                var idDTObj = $(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object')).attr('id');
                myRegExp = new RegExp(idDTObj,'gi');
                var idObj = component.get("v.permissionSetCommonId")+'Object-'+component.get("v.randomNumber");
                var tbodyObj = $(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object')).html();
                var tbody1Obj = tbodyObj.replace(myRegExp, idObj);
                $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object-'+component.get("v.randomNumber"))).html(tbody1Obj);
                $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get("v.permissionSetCommonId")+'Object-'+component.get("v.randomNumber"))).html('&nbsp;');
                $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+component.get("v.randomNumber"))).attr('title', '');
                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+component.get("v.randomNumber")+'-fill')).html('&nbsp');
            }
            
            $.each(templtData, function(key, objObj){
                if(objObj.display){
                    $.each(document.getElementById('permissionModule').querySelectorAll('.setting-'+key), function(ind, el){
                        el.classList.remove('section-field-hide');
                    });
                }else{
                    $.each(document.getElementById('permissionModule').querySelectorAll('.setting-'+key), function(ind, el){
                        el.classList.add('section-field-hide');
                    });
                }
                
                $.each(objObj.fields, function(key1, objObj1){
                    if(objObj1.display){
                        $.each(document.getElementById('permissionModule').querySelectorAll('.setting-'+key1), function(ind, el){
                            el.classList.remove('section-field-hide');
                        });
                    }else{
                        $.each(document.getElementById('permissionModule').querySelectorAll('.setting-'+key1), function(ind, el){
                            el.classList.add('section-field-hide');
                        });
                    }
                });
            });
            
            component.getEvent("AdjustInfoBlock").setParams({
                "colSizeName": "permissionsetColSize",
                "buttonName": "addMorePermissionSetBtn",
                "moduleName": "permissionModule",
                "eventName": "add"
            }).fire();
            
            component.getEvent("renderIconShapPermissionEvent").setParams({"tabName": "permissionModule"}).fire();
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).show();
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).css("opacity", "0.2");
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 1000);
            document.getElementById('permissionModule').querySelectorAll('.compare-btn')[0].disabled = false;
            document.getElementById('permissionModule').querySelectorAll('.compare-btn')[0].innerHTML ='<span class="slds-icon__container slds-icon--"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--left slds-icon--" name=""><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#add"></use></svg><span class="slds-assistive-text"></span></span> Add to Compare';
            var heights = $("div.permissionsetsectionWp").map(function (){
                return $(this).height();
            }).get(),
                maxHeight = Math.max.apply(null, heights);
            $(document.getElementsByClassName('permissionsetsectionWp')).height(maxHeight);
            var y = $(document.getElementById('PermissionSetSectionDiv')).offset().top;
            $(document.getElementsByClassName('permissionsetscroll')).height(($(window).height()-y));
            $(document.getElementsByClassName('permissionsetscroll')).addClass('scr2');
            $(document.getElementsByClassName('permissionsetscroll')).on('scroll', function () {
                $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
            });
            $(document.getElementsByClassName('permissionsetscroll')).mouseover(function(){
                $(this).removeClass('scr2');    
            }).mouseout(function(){
                $(this).addClass('scr2');   
            });            
            
            $(document.getElementsByClassName('permissionsetBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
            $(document.getElementsByClassName('permissionsetBorderBottom')).eq($(document.getElementsByClassName('permissionsetBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y scr2');
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
            if(document.getElementById("showOnlyPerDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
        }
    },
    
    getOrgPermissionSet: function(component, event, helper){
        
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader')).append('<div class="loader-active textLoader"><svg width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');
        $(document.getElementById('permissionModule').querySelectorAll('.btn-'+component.get("v.randomNumber"))[0]).addClass('btn-visible');
        var randomNumber = component.get("v.randomNumber");
        var orgId = component.get("v.strOrgId");
        $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).val('');
        helper.resetPermissionSet(component,event, helper);
        var self = this;
        var action = component.get("c.getObjsAndPermissionSets");
        action.setParams({
            "orgId": orgId
        });
        action.setCallback(this, function(response) {
            var globalId = component.getGlobalId();
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var permissionSetsInfo = response.getReturnValue().permissionsets;                
                var objects = response.getReturnValue().objects[0];
                var Namespace = response.getReturnValue().Namespace[0];
                component.set("v.orgNameSpace",Namespace.body);
                $(document.getElementById('permissionset-namespace-'+randomNumber)).html(Namespace.body);
                var opts = [];
                var opt = {};
                $.each(permissionSetsInfo, function(idxParent, objParent){
                    if(objParent.status === "SUCCESS"){
                        $.each(JSON.parse(objParent.body).records, function(idx, obj){
                            opt = {'label':obj.Label,'value':obj.Name,'id':obj.Id};
                            opts.push(opt); 
                        });
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                        $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).autocomplete({
                            minLength: 3, 
                            source: opts,
                            select: function(e, ui ) { 
                                helper.resetPermissionSet(component,event, helper);
                                var instance = component.get("v.orgId")+'_'+ui.item.id;
                                
                                $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).val( ui.item.label);
                                $(document.getElementById('permissionModule').querySelectorAll('#permission_'+randomNumber)).attr( 'name', ui.item.id);
                                component.set("v.strPermissionSetName", ui.item.label);
                                component.getEvent("SetInstanceDataListPermission").setParams({
                                    "randomNo" : component.get("v.randomNumber"),
                                    "permissionId" : ui.item.id,
                                    "index" : component.get("v.index"),
                                    "orgId": component.get("v.orgId"),
                                    "instanceData" : instance,
                                    "permissionName" : ui.item.label
                                }).fire();
                                return false;
                            },
                            
                        }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {  
                            var queryTerm =  $(document.getElementById('permission_'+randomNumber)).val();
                            var entry = "<a>" + item.label;      
                            entry = entry + "</a>";
                            return $( "<li></li>" )
                            .data( "item.autocomplete", item )
                            .append( entry )
                            .appendTo( ul );            
                        };
                        $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
                    }else if(objParent.status === "FAIL"){
                        $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                        component.getEvent("handleError").setParams({"responseObj":objParent}).fire();     
                    }
                });
                if(objects.status === "SUCCESS"){
                    objects = objects.body;
                    objects = JSON.parse(objects);
                    $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).parent('.SumoSelect').replaceWith('<select class="object-cls obj-combobox SlectBox_'+component.get('v.randomNumber')+'" multiple="multiple" placeholder="Object" id="'+component.get("v.permissionSetCommonId")+'Object_'+component.get('v.randomNumber')+'" disabled="disabled"/>');
                    $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNumber)).attr('id', component.get("v.permissionSetCommonId")+'Object_'+randomNumber);
                    var objectOptions = '';
                    $.each(objects.sobjects, function(index, objObj){
                        if((objObj.undeletable && objObj.triggerable && !objObj.custom && objObj.mruEnabled) || (objObj.triggerable && objObj.custom)){
                            objectOptions = objectOptions + '<option value="'+objObj.name+'">'+objObj.label+'</option>';
                        }
                    });
                    $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).append(objectOptions); 
                    $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).SumoSelect({ csvDispCount: 4, search: true, searchText: 'Enter object...', okCancelInMulti: true  });
                    $(document.getElementById('permissionModule').querySelectorAll('.CaptionCont .placeholder')).html('Object');
                    $(document.getElementById('permissionModule').querySelectorAll('.CaptionCont label')).html('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right" style="height: 30px;width: 2.6em"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></a>');
                    $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).after('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle clear-icons clear-icons-permissions" id="clear-'+randomNumber+'" title="Clear"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg></a>');
                    $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNumber)).closest("div").find('.MultiControls').find('.btnOk').attr('id', randomNumber).text('Search');
                    
                }else if(objects.status === "FAIL"){ 
                    $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                    component.getEvent("handleError").setParams({"responseObj":objects}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
            }else if (state === "ERROR") {
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
            }else if (state === "ABORTED") {
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    getPermissionSetInfo : function(component, event, helper, orgId, permissionSetId, randomNo, editFlag){ 
        component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
        if(document.getElementById("showOnlyPerDiff").checked){
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
        }
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        function getDateCoversion(myDate){
            var result;
            if($.type(myDate) === 'string' && myDate !== '' && myDate !== null){
                var a = $.trim(myDate).split(/[^0-9]/);
                var y = a[0];
                var m = a[1]-1;
                var d = a[2];
                var h = a[3];
                var mi = a[4];
                var s = a[5];
                return new Date(y,m,d,h,mi,s).toString().split('+')[0];
            }else{
                result = '&nbsp;';  
            }
            return result;
        }
        $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .permissionsetBorderBottom')).append('<div class="progress"><div class="indeterminate"></div></div>');
        component.set("v.strPermissionSetId", permissionSetId);
        $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo)).addClass('adminifiedPermissionSetInfo1');
        var action = component.get("c.getPermissionSetDetailsAndAssignUser");
        action.setParams({
            "orgId" : orgId,
            "permissionSetId": permissionSetId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var permissionSetDetail = response.getReturnValue().PermissionSet_Details;
                var assignUser = response.getReturnValue().PermissionSet_AssignUser;
                var perIconshp = 'iconShap'+randomNo;
                var perIconShapName = "";
                perIconShapName = $(document.getElementById('permissionModule').querySelectorAll('#'+perIconshp)).text();
                if(permissionSetDetail.status === "SUCCESS" && assignUser.status === "SUCCESS"){
                    this.fillData(component);
                    if(permissionSetDetail.status === "SUCCESS"){
                        var temp11 = permissionSetDetail.body;
                        temp11 = JSON.parse(temp11);
                        component.set("v.permissionSetInfo", temp11.records[0]);
                        $.each(temp11.records[0], function(key, value) {
                            
                            if(key === "UserLicense" && value !== null){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(value.Name);
                                component.set("v.strPermissionSetLic", value.Name);
                            }else if(key === 'Description' && value !== null){
                                var desc = '';
                                if((value).length > 40){
                                    desc = (value).substring(0, 40);
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(desc+'...');
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).attr('title', value);
                                }else{
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(value);
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).attr('title', value);
                                }
                            }else if(key === "CreatedBy" && value !== null){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(value.Name);
                            }else if(key === "LastModifiedBy" && value !== null){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(value.Name);
                            }else if(key === "CreatedDate"){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(getDateCoversion(value));
                            }else if(key === "LastModifiedDate"){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(getDateCoversion(value));
                            }else if(key === "SystemModstamp"){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(getDateCoversion(value));
                            }else if(key === "LastViewedDate"){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(getDateCoversion(value));
                            }else if(key === "LastReferencedDate"){
                                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(getDateCoversion(value));
                            }else
                                if(value === true){
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(' <span class="approval icon_'+perIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+perIconShapName+'.png" alt="true'+perIconShapName+'" /></span>');
                                }else if(value === false){
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html('<span class="reject icon_'+perIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+perIconShapName+'.png" alt="false'+perIconShapName+'" /></span>');
                                }else if($.trim(value) === '' || $.trim(value) === null){
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html("&nbsp;");
                                }else{
                                    $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+key)).html(value);
                                }
                        });
                        $(document.getElementById('permissionModule').querySelectorAll('.btn-'+randomNo)).removeClass('btn-visible'); 
                        $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNo)).removeAttr('disabled');
                        $(document.getElementById('permissionModule').querySelectorAll('#'+component.get("v.permissionSetCommonId")+'Object_'+randomNo)).parent('.SumoSelect').removeClass('disabled');
                    }
                    if(assignUser.status === "SUCCESS"){
                        assignUser = JSON.parse(assignUser.body);
                        var assignUserList = [];
                        component.set("v.assignUserList", assignUserList);
                        if(assignUser.records !== ''){
                            if($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User tr td')).hasClass(''+component.get("v.permissionSetCommonId")+'Assigned_User-'+randomNo+'-fill')){
                                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+randomNo+'-fill')).html('&nbsp;');
                            }
                            $.each(assignUser.records, function(ind, objObj) {
                                assignUserList.push(''+objObj.Assignee.Id);
                                var assignuser = $.trim(objObj.Assignee.Name);
                                var assignusercls = '';
                                for (var i = 0; assignuser.indexOf(" ") >= 0; i++) { 
                                    assignuser = assignuser.replace(" ", "-");
                                }
                                assignusercls = assignuser;
                                
                                if(!$(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Assigned_User tr')).hasClass('user-assigned-'+objObj.Assignee.Id)){
                                    $(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Assigned_User')).append('<tr class="user-assigned-'+objObj.Assignee.Id+' permissionset-field-row toggle-'+component.get("v.permissionSetCommonId")+'Assigned_User permissionset-search-'+objObj.Assignee.Id+' setting-'+objObj.Assignee.Id+' '+assignusercls+' datarow" id="adminifiedAdminifiedPermissionSetModule-'+objObj.Assignee.Id+'"><td class="slds-text-align--right"> '+objObj.Assignee.Name+'</td></tr>'); 
                                }
                                $.each($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Assigned_User')), function(index, elementObj){
                                    var rNo = $(elementObj).attr('id');
                                    if(!$(document.getElementById('permissionModule').querySelectorAll('#'+rNo+' tr')).hasClass('user-assigned-'+objObj.Assignee.Id)){
                                        $(document.getElementById('permissionModule').querySelectorAll('#'+rNo)).append('<tr class="user-assigned-'+objObj.Assignee.Id+' permissionset-field-row datarow permissionset-search-'+objObj.Assignee.Id+' setting-'+objObj.Assignee.Id+' '+assignusercls+'" id="'+objObj.Assignee.Id+'"><td class="'+rNo+'-'+objObj.Assignee.Id+' '+rNo+'-fill data-field">&nbsp;</td></tr>');
                                    }
                                });
                            });
                            $.each(assignUser.records, function(ind, objObj) {
                                $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Assigned_User-'+randomNo+'-'+objObj.Assignee.Id)).html('<span class="approval icon_'+perIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+perIconShapName+'.png" alt="true'+perIconShapName+'" /></span>');
                            });
                            component.set("v.assignUserList", assignUserList);
                        }
                        component.getEvent("getAssignUserList").setParams({}).fire();
                    }
                    $(document.getElementsByClassName('btn-'+component.get("v.randomNumber"))).removeClass('btn-visible');
                    
                }else if(permissionSetDetail.status === "FAIL"){
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+component.get("v.randomNumber"))).val('');
                    component.getEvent("handleError").setParams({"responseObj":permissionSetDetail}).fire();
                }else if(assignUser.status === "FAIL"){
                    $(document.getElementById('permissionModule').querySelectorAll('#permission_'+component.get("v.randomNumber"))).val('');
                    component.getEvent("handleError").setParams({"responseObj":assignUser}).fire();
                }
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .permissionsetBorderBottom .progress')).remove();
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
            }else if (state === "ERROR") {
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .permissionsetBorderBottom .progress')).remove();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .permissionsetBorderBottom .progress')).remove();
                
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
            }else if (state === "ABORTED") {
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .permissionsetBorderBottom .progress')).remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                if(document.getElementById("showOnlyPerDiff").checked){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                }
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
            if(document.getElementById("showOnlyPerDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
            }
        });
        $A.enqueueAction(action);
    },
    
    getObjectDetails : function(component, event){
        component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
        if(document.getElementById("showOnlyPerDiff").checked){
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
        }
        
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'permissionModule'}).fire();
        var randomNo = component.get("v.randomNumber");
        $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNo+' .borderBottom')).append('<div class="progress"><div class="indeterminate"></div></div>');
        var objName = $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNo)).val();
        var orgId = component.get("v.strOrgId");
        var permissionSetId = component.get("v.strPermissionSetId");
        var objName1 = '';
        var orgNameSpace = component.get("v.orgNameSpace");
        $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get("v.permissionSetCommonId")+'Object-'+randomNo)).html('&nbsp;');
        $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+randomNo)).attr('title', '');
        $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-fill')).html('&nbsp');
        $.each(objName, function(ind, obj){
            var objectTemplate = '';
            var flag = true;
            if(ind === 0){
                objName1 = objName1 + obj;                
            }else{objName1 = objName1 +','+ obj;}
            
        });
        var action = component.get("c.getObjectsDetails");
        action.setParams({"permissionSetId" : permissionSetId,
                          "objName" : objName1,
                          "orgId" : orgId});
        var self = this;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                if(response.getReturnValue().Permissions.status === "SUCCESS"){
                    var Permissions = response.getReturnValue().Permissions.body;
                    var recordType = response.getReturnValue().RecordTypes.body;
                    var objLayouts = response.getReturnValue().Layouts.body;
                    var SuccessOrgId = response.getReturnValue().OrgId.body;
                    var pIconshp = 'iconShap'+randomNo;
                    var PIconShapName = "";
                    PIconShapName = $(document.getElementById('permissionModule').querySelectorAll('#'+pIconshp)).text();
                    
                    Permissions = JSON.parse(Permissions);
                    recordType = JSON.parse(recordType);
                    objLayouts = JSON.parse(objLayouts);
                    component.set("v.objectNameList", objName);
                    $.each(objName, function(ind, obj){
                        var objectTemplate = '';
                        var flag = true;
                        var objForCls = '';
                        if(orgNameSpace !== '' && obj.indexOf(orgNameSpace) > -1){
                            objForCls = obj.replace(orgNameSpace+'__','');
                        }else{
                            objForCls = obj;
                        }
                        
                        var mainHeadingLabel = objForCls;
                        if(mainHeadingLabel.length > 25){
                            mainHeadingLabel = mainHeadingLabel.substring(0,25)+'...';
                        }
                        if(!$(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Object tr')).hasClass('chk-object-fields-'+objForCls)){
                            objectTemplate = objectTemplate + '<tr class="toggle-'+component.get("v.permissionSetCommonId")+'Object object-search object-name-cls object-for-chk-status chk-object-fields-'+objForCls+'" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'"><td style="padding-right: 0;padding-left: 0;"><div class="object-'+objForCls+' section-class"><h2 class="object-toggle permissionset_id___'+objForCls+'-heading " id="permissionset_id___'+objForCls+'-heading" style="padding: 0.2rem;padding-left: 2.5rem; cursor: pointer;"><span class="slds-truncate toggleIcon thead-val object-name"><span class="object-open "><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#right"></use></svg></span><b title="'+objForCls+'">'+mainHeadingLabel+'</b></span></h2><div class="object-permission'+objForCls+'"><table id="'+component.get("v.permissionSetCommonId")+''+objForCls+'-permission-table" class=" permission-tabl object-subsection-table slds-table--bordered"><tr class="datarow obj-field-row"><td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Permissions</td></tr><tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsRead" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsRead"><td class="slds-text-align--right">Read</td></tr><tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsCreate" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsCreate"><td class="slds-text-align--right">Create</td></tr><tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsDelete" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsDelete"><td class="slds-text-align--right">Delete</td></tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsEdit" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsEdit"> <td class="slds-text-align--right">Edit</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsModifyAllRecords" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsModifyAllRecords"> <td class="slds-text-align--right">ModifyAll</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsViewAllRecords" id="'+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsViewAllRecords"> <td class="slds-text-align--right">ViewAll</td> </tr> </table> </div> <div class="object-record-type'+objForCls+' section-class"> <table id="'+component.get("v.permissionSetCommonId")+''+objForCls+'-record-type" class="'+objForCls+'-record-type-table recordtype-table object-subsection-table slds-table--bordered" style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Record Type</td> </tr> </table> </div> <div class="object-layouts'+objForCls+' section-class"> <table id="'+component.get("v.permissionSetCommonId")+''+objForCls+'-layouts" class="'+objForCls+'-layouts-table layouts-table object-subsection-table slds-table--bordered" style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Layouts</td> </tr> </table> </div></div></td> </tr>';
                            $(document.getElementById('permissionModule').querySelectorAll('#table-'+component.get("v.permissionSetCommonId")+'Object')).append(objectTemplate);  
                        }
                        $.each($(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object')), function(index, elementObj){
                            var rNo = elementObj.getAttribute('id');
                            var samerNO = component.get("v.permissionSetCommonId")+'Object-'+randomNo;
                            if(!$(document.getElementById('permissionModule').querySelectorAll('#'+rNo+' tr')).hasClass('chk-object-'+objForCls)){
                                $(document.getElementById('permissionModule').querySelectorAll('#'+rNo)).append('<tr class="toggle-'+component.get("v.permissionSetCommonId")+'Object chk-object-'+objForCls+'" > <td style="padding-right: 0;padding-left: 0;" id="id-'+rNo+'-'+objForCls+'"><div class="object-'+objForCls+' section-class "> <h2 class="permissionset_id___'+objForCls+'-heading" style="padding: 0.2rem;padding-left: 0.5rem;"><span class="slds-truncate thead-val object-name"><b class="obj-head-'+rNo+'">&nbsp;</b></span></h2> <div class="object-permission'+objForCls+'"> <table class="'+component.get("v.permissionSetCommonId")+''+objForCls+'-permission-table permission-table slds-table--bordered"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsRead'+' '+objForCls+'_PermissionsRead permissionModule-'+objForCls+'_PermissionsRead" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsRead '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsCreate '+objForCls+'_PermissionsCreate permissionModule-'+objForCls+'_PermissionsCreate" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsCreate '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsDelete '+' '+objForCls+'_PermissionsDelete permissionModule-'+objForCls+'_PermissionsDelete" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsDelete '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsEdit '+' '+objForCls+'_PermissionsEdit permissionModule-'+objForCls+'_PermissionsEdit" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsEdit '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsModifyAllRecords '+objForCls+'_PermissionsModifyAllRecords permissionModule-'+objForCls+'_PermissionsModifyAllRecords" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsModifyAllRecords '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+component.get("v.permissionSetCommonId")+''+objForCls+'_PermissionsViewAllRecords  '+objForCls+'_PermissionsViewAllRecords permissionModule-'+objForCls+'_PermissionsViewAllRecords" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsViewAllRecords '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> </table> </div> <div class="object-record-type'+objForCls+' section-class"> <table class="'+component.get("v.permissionSetCommonId")+''+objForCls+'-record-type '+rNo+'-'+objForCls+'-record-type-table  recordtype-table slds-table--bordered"  style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> </table> </div> <div class="object-layouts'+objForCls+' section-class"> <table class="'+component.get("v.permissionSetCommonId")+''+objForCls+'-layouts '+rNo+'-'+objForCls+'-layouts-table  layouts-table slds-table--bordered"  style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> </table> </div> </div> </td> </tr>');
                            }
                        });
                        
                        var headingTag = $('#permissionModule .SlectBox_'+randomNo+' option[value="'+obj+'"]').text();
                        headingTag = headingTag+' ('+obj+')';
                        if(headingTag.length > 45){
                            headingTag = headingTag.substring(0,45)+'...';
                        }
                        
                        $(document.getElementById('permissionModule').querySelectorAll('#id-'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objForCls+' .obj-head-'+component.get("v.permissionSetCommonId")+'Object-'+randomNo)).html(headingTag);
                        $(document.getElementById('permissionModule').querySelectorAll('#id-'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objForCls+' .obj-head-'+component.get("v.permissionSetCommonId")+'Object-'+randomNo)).attr('title',$('#permissionModule .SlectBox_'+randomNo+' option[value="'+obj+'"]').text()+' ('+obj+')');
                        $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objForCls+'-fill')).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                    });
                    
                    var PermissionsObj = {};
                    $.each(Permissions.records, function(ind, objObj) {
                        var objname = '';
                        var objApiName = objObj.SobjectType;
                        var perms = {};
                        $.each(objObj, function(key, value) {
                            if(orgNameSpace !== '' && objApiName.indexOf(orgNameSpace) > -1){
                                objname = objApiName.replace(orgNameSpace+'__','');
                            }else{
                                objname = objApiName;
                            }
                            if(key !== 'attributes' || key !== 'SobjectType'){
                                perms[key] = value;
                                if(value){
                                    $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objname+'-'+key)).html(' <span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                                }else{
                                    $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objname+'-'+key)).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                                }
                            }
                        });
                        PermissionsObj[objObj.SobjectType+'-'+objObj.Id] = perms;
                    });
                    component.set("v.objectPermissions", PermissionsObj);
                    if(recordType.records !== ''){
                        $.each(recordType.records, function(key, value) {   
                            var flag = true;
                            var indexTr = 0;
                            var objNameForRT = '';
                            var objApiName = value.SobjectType;
                            if(orgNameSpace !== '' && objApiName.indexOf(orgNameSpace) > -1){
                                objNameForRT = objApiName.replace(orgNameSpace+'__','');
                            }else{
                                objNameForRT = objApiName;
                            }
                            $(document.getElementById('permissionModule').querySelectorAll('.'+objNameForRT+'-record-type-table')).show();
                            $.each(document.getElementById('permissionModule').querySelectorAll('.'+objNameForRT+'-record-type-table tr'), function(i, objObj){
                                if($.trim($(objObj.querySelectorAll('td')).text()) === $.trim(value.Name)){
                                    flag = false;
                                    indexTr = i; 
                                }
                            });
                            if(flag){
                                $(document.getElementById('permissionModule').querySelectorAll('.'+objNameForRT+'-record-type-table')).append('<tr class="datarow field-row obj-field-row recordtype-'+value.Id+'" id="'+value.Id+'"> <td class="slds-text-align--right">'+value.Name+'</td> </tr>'); 
                                indexTr = ($(document.getElementById('permissionModule').querySelectorAll('.'+objNameForRT+'-record-type-table tr')).length)-1;
                            }
                            $.each(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object'), function(index, elementObj){
                                var rNo = elementObj.getAttribute('id');
                                $(document.getElementById('permissionModule').querySelectorAll('.'+rNo+'-'+objNameForRT+'-record-type-table')).show();
                                if(flag){
                                    $(document.getElementById('permissionModule').querySelectorAll('.'+rNo+'-'+objNameForRT+'-record-type-table')).append('<tr class="datarow field-row obj-field-row recordtype-'+value.Id+' '+value.Id+' permissionModule-'+value.Id+'  rtyp-'+value.Id+'" id="'+value.Id+'"> <td class="'+rNo+'-'+value.SobjectType+'-'+value.Id+' '+rNo+'-fill">&nbsp;</td> </tr>');
                                }
                            });
                            if(value.IsActive){
                                $(document.getElementById('permissionModule').querySelectorAll('.Object-'+randomNo+'-'+objNameForRT+'-record-type-table tr')).eq(indexTr).find('td').html('<span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                            }else{
                                $(document.getElementById('permissionModule').querySelectorAll('.Object-'+randomNo+'-'+objNameForRT+'-record-type-table tr')).eq(indexTr).find('td').html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                            }
                        });
                    }
                    
                    if(objLayouts !== ''){
                        $.each(objLayouts, function(ind, value) {
                            var layoutName = value.Name;
                            layoutName = layoutName.split('-');
                            var objApiName = layoutName[0];
                            var objNameForOL = '';
                            if(orgNameSpace !== '' && objApiName.indexOf(orgNameSpace) > -1){
                                objNameForOL = objApiName.replace(orgNameSpace+'__','');
                            }else{
                                objNameForOL = objApiName;
                            }
                            var layoutName1 = layoutName[1];
                            var layoutName2 = layoutName[1];
                            layoutName2 = decodeURI(layoutName2);
                            $(document.getElementById('permissionModule').querySelectorAll('.'+objNameForOL+'-layouts-table')).show();
                            var flag = true;
                            var indexTr = 0;
                            $.each($(document.getElementById('permissionModule').querySelectorAll('.'+objNameForOL+'-layouts-table tr')), function(i, objObj){
                                if($.trim($(objObj.querySelectorAll('td')).text()) === $.trim(layoutName2+' VIEW!')){
                                    flag = false;
                                    indexTr = i; 
                                }
                            });
                            if(flag){
                                $(document.getElementById('permissionModule').querySelectorAll('.'+objNameForOL+'-layouts-table')).append('<tr class="datarow field-row obj-field-row layouts-'+value.Id+'" id="'+value.Id+'"> <td class="slds-text-align--right">'+layoutName2+' <a class="permissionSetFieldLevelView" id="'+value.Id+','+objNameForOL+','+SuccessOrgId+','+layoutName1+'" style="display:none;">VIEW!</a></td> </tr>'); 
                                indexTr = ($(document.getElementById('permissionModule').querySelectorAll('.'+objNameForOL+'-layouts-table tr')).length)-1;
                            }
                            $.each(document.getElementById('permissionModule').querySelectorAll('.data-table-'+component.get("v.permissionSetCommonId")+'Object'), function(index, elementObj){
                                var rNo = $(elementObj).attr('id');
                                $(document.getElementById('permissionModule').querySelectorAll('.'+rNo+'-'+objNameForOL+'-layouts-table')).show();
                                if(flag){
                                    $(document.getElementById('permissionModule').querySelectorAll('.'+rNo+'-'+objNameForOL+'-layouts-table')).append('<tr class="datarow field-row obj-field-row layouts-'+value.Id+' '+value.Id+' permissionModule-'+value.Id+' ltyp-'+value.Id+'" id="'+value.Id+'"> <td class="'+rNo+'-'+objNameForOL+'-'+value.Id+' '+rNo+'-fill">&nbsp;</td> </tr>');
                                }
                            });
                            $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNo+'-'+objNameForOL+'-layouts-table tr')).eq(indexTr).find('td').html('<span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                        });
                    }
                    component.getEvent("getAllObjectFromObjectPermissionSet").setParams({}).fire();
                    component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
                    if(document.getElementById("showOnlyPerDiff").checked){
                        component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
                    }
                    component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
                }else if(response.getReturnValue().Permissions.status === "FAIL"){
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue().Permissions}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .permissionsetBorderBottom .progress')).remove();
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error.'}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .permissionsetBorderBottom .progress')).remove();
            }else if (state === "ABORTED") {
                component.getEvent("handleError").setParams({"errors":'Process aborted.'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'permissionModule'}).fire();
                $(document.getElementById('permissionModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .permissionsetBorderBottom .progress')).remove();
            }
        });
        $A.enqueueAction(action);
    },
    
    fillData : function(component){
        var permissionSetStructure = component.get("v.permissionSetTemplate");
        var randomNo = component.get("v.randomNumber");
        $.each(permissionSetStructure, function(section, sectionVal) {
            $.each(sectionVal.fields, function(secKey, secValue) {
                $(document.getElementById('permissionModule').querySelectorAll('.permissionset-'+randomNo+'-'+secKey)).html('N/A');
            });
        });
    }, 
    
    resetPermissionSet : function(component,event, helper){
        var randomNumber = component.get("v.randomNumber");
        if($(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber)).hasClass('adminifiedPermissionSetInfo1')){
            $(document.getElementById('permissionModule').querySelectorAll('.btn-'+randomNumber)).addClass('btn-visible');
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber)).removeClass('adminifiedPermissionSetInfo1');
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .data-field')).html('&nbsp;');
            component.set("v.assignUserList" , []);
            component.getEvent("getAssignUserList").setParams({}).fire();
            if(component.get("v.permissionInstanceData") !== '')
                component.getEvent("ResetInstanceDataListPermission").setParams({"instanceData":component.get("v.permissionInstanceData")}).fire();
            component.set("v.permissionInstanceData", '');
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
            if(document.getElementById("showOnlyPerDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
        }
        if(!$(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .SumoSelect')).hasClass('disabled')){
            $(document.getElementById('permissionModule').querySelectorAll('.btn-'+randomNumber)).addClass('btn-visible');
            $(document.getElementById('permissionModule').querySelectorAll('.'+component.get("v.permissionSetCommonId")+'Object-'+randomNumber+'-fill')).html('&nbsp;');
            $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+randomNumber)).html('&nbsp');
            $(document.getElementById('permissionModule').querySelectorAll('.obj-head-'+component.get('v.permissionSetCommonId')+'Object-'+randomNumber)).attr('title', '');
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .CaptionCont')).attr('title', 'Select Here');
            $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNumber)).val('');
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .CaptionCont span')).html('Object');
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .optWrapper ul li')).removeClass('selected');
            $('#permissionModule').find('.SlectBox_'+randomNumber+' > option').removeAttr("selected");
            $(document.getElementById('permissionModule').querySelectorAll('.SlectBox_'+randomNumber)).attr("disabled", "disabled");
            $(document.getElementById('permissionModule').querySelectorAll('#comp'+randomNumber+' .SumoSelect')).addClass('disabled');
            component.getEvent("getAllObjectFromObjectPermissionSet").setParams({}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':false}).fire();
            if(document.getElementById("showOnlyPerDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHidePermissionSet","compDivId" : 'PermissionSetSectionDiv',"mainModule" : 'adminifiedAdminifiedPermissionSetModule',"currentComparableModule" : 'adminifiedPermissionSetInfo1', "tabName" : 'permissionset','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : "PermissionSetSectionDiv","mainModule" : "adminifiedAdminifiedPermissionSetModule","moduleName" : "permissionset"}).fire();
        }
    },
})