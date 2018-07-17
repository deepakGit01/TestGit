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
        var temp;
        if (conOrgs !== undefined && conOrgs !== null){
            var opts = [];
            var options = {};
            var randomNumber = component.get("v.randomNumber");
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
            $(document.getElementById('profileModule').querySelectorAll('.stivadmnProfileModule .select-org'+component.get("v.randomNumber"))).html(opt_str);
            $(document.getElementById('profileModule').querySelectorAll('.stivadmnProfileModule .select-org'+component.get("v.randomNumber"))).combobox1({ 
                source: opts,
                select:function(e, ui){
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                        source : []
                    });
                    $(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))[0].querySelectorAll('option')).removeClass('selected');
                    var optSelect = selectItemByValue(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))[0],e.target.value);
                    $(optSelect).addClass('selected');
                    component.set("v.orgId", e.target.value);
                    component.getEvent("GetOrgProfiles").setParams({
                        "OrgId" :  e.target.value,
                        "index" : component.get("v.index")
                    }).fire();
                    var selectOrg = document.getElementById('profileModule').querySelectorAll('.stivadmnProfileModule .select-org'+component.get("v.randomNumber"))[0];
                    component.set("v.strOrgName", $(selectOrg.options[selectOrg.selectedIndex]).text()); 
                } 
            });
            if(component.get("v.orgId") !== undefined){
                $(document.getElementById('profileModule').querySelectorAll('.stivadmnProfileModule .select-org'+component.get("v.randomNumber"))).closest('span').find('input').val(component.get("v.strOrgName"));
            }else{
                $(document.getElementById('profileModule').querySelectorAll('.stivadmnProfileModule .select-org'+component.get("v.randomNumber"))).closest('span').find('input').val('');
            }
            $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).off('keyup keypress');
            $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).on('keyup keypress', function(e){
                var code = e.keyCode || e.which;
                var inp = String.fromCharCode(e.keyCode);
                var org = $(this).val();
                var flag = false;
                var reg = /[a-zA-Z0-9-_ ]/;
                if((code === 46 || code === 8 || reg.test(inp)) && !e.ctrlKey && !(code === 17)){ 
                    temp = null;
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).val('');
                    component.set("v.allProfiles", temp);
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).autocomplete({ 
                        source : []
                    });
                    helper.resetProfile(component,event, helper);
                }else if(code === 86 && e.ctrlKey){
                    temp = null;
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).val('');
                    component.set("v.allProfiles", temp);
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).autocomplete({ 
                        source : []
                    });
                    helper.resetProfile(component,event, helper);
                }
                
            });
            $(document.getElementsByClassName('custom-combobox-input')).addClass('slds-input slds-input--small custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left val ui-autocomplete-input'); 
            $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
            
            if(!event.getParam("isRefreshOrg")){
                helper.getJSONData(component, event, helper); 
            }else{
                if(event.getParam("action") === "Add"){
                    setTimeout(function(){
                        var optSelect1 = selectItemByValue(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))[0],component.get("v.strOrgId"));
                        $(optSelect1).addClass('selected');
                        
                    }, 2000);
                    
                    if(component.get("v.index") === event.getParam("index") && event.getParam("moduleName") === 'profileModule'){ 
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
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val('');
                        $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).autocomplete({ 
                            source : []
                        });
                        this.getOrgProfiles(component, event, helper);
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val(userName);
                        $(document.getElementsByClassName('select-org'+event.getParam("randomNumber"))[0].querySelectorAll('option')).removeClass('selected');
                        
                    }
                }
                
                if(event.getParam("action") === "Delete"){
                    if(component.get("v.strOrgId") === event.getParam("orgId")){
                        temp = null;
                        $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).val('');
                        component.set("v.allProfiles", temp);
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val('');
                        $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).autocomplete({ 
                            source : []
                        });
                        helper.resetProfile(component,event, helper);
                        $(document.getElementsByClassName('custom-combobox-input')).addClass('slds-input slds-input--small custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left val ui-autocomplete-input'); 
                        $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
                        
                    }
                }
                
            }
        }
    },
    
    profileEdit : function(component, event){ 
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        $(document.getElementById('profileModule').querySelectorAll('.btn-'+component.get("v.randomNumber")+' .edit-profile-cls')).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
        var ProfileObj = component.get("v.profileInfo");
        var randomNo = component.get("v.randomNumber");
        var profileStruct = component.get("v.profileTemplate");
        var orgId = component.get("v.strOrgId");
        var profileId = component.get("v.strProfileId");
        var profileName = component.get("v.strProfileName");
        var index = component.get("v.index");
        var orgName = component.get("v.strOrgName");
        var objectNameList = component.get("v.objectNameList");
        var objectPermissions = component.get("v.objectPermissions");
        var orgNameSpace = component.get("v.orgNameSpace");
        
        $A.createComponent("stivadmn:ProfileEdit", {
            "profileData": ProfileObj,"orgId" : orgId, "profileId" : profileId, 
            "profileStructure" : profileStruct, "randomNo" : randomNo, "profileName" : profileName,
            "index" : index, "strOrgName" : orgName, "objectNameList" : objectNameList, 
            "objectPermissions" : objectPermissions, 'orgNameSpace' : orgNameSpace
        }, function(newModel){
            if (component.isValid()) {
                var body = component.find("editProfile");
                body.set("v.body", newModel);
            }
        });
    },
    
    getOrgProfiles: function(component, event, helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader')).append('<div class="loader-active textLoader"><svg width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');
        $(document.getElementById('profileModule').querySelectorAll('.btn-'+component.get("v.randomNumber"))).addClass('btn-visible');
        
        var randomNumber = component.get("v.randomNumber");
        var orgId = component.get("v.strOrgId");
        $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).val('');
        helper.resetProfile(component,event, helper);
        var self = this;
        var action = component.get("c.getObjsAndProfiles");
        action.setParams({
            "orgId": orgId
        });
        action.setCallback(this, function(response) {
            var globalId = component.getGlobalId();
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var profiles = response.getReturnValue().profiles;
                var objects = response.getReturnValue().objects;
                var NameSpace = response.getReturnValue().Namespace;
                component.set("v.orgNameSpace",NameSpace.body);
                $(document.getElementById('profile-namespace-'+randomNumber)).html(NameSpace.body);
                if(profiles.status === "SUCCESS"){
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                    var temp = profiles.body;
                    temp = JSON.parse(temp);
                    component.set("v.allProfiles", temp);
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).autocomplete({
                        minLength: 3, 
                        source: $.map(component.get("v.allProfiles").records, function(item) {
                            return {
                                label:item.Name,
                                value:item.Name,
                                id:item.Id
                            }
                        }),
                        select: function(e, ui ) {
                            helper.resetProfile(component,event, helper);
                            var instance = component.get("v.orgId")+'_'+ui.item.id;
                            $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).val( ui.item.label);
                            $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNumber)).attr( 'name', ui.item.id);
                            component.set("v.strProfileName", ui.item.label);
                            component.getEvent("SetInstanceDataListProfile").setParams({
                                "randomNo" : component.get("v.randomNumber"),
                                "profileId" : ui.item.id,
                                "index" : component.get("v.index"),
                                "orgId": component.get("v.orgId"),
                                "instanceData" : instance,
                                "profileName" : ui.item.label
                            }).fire();
                            return false;
                        }, 
                    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {  
                        var queryTerm = $(document.getElementById('profile_'+randomNumber)).val();
                        var entry = "<a>" + item.label;      
                        entry = entry + "</a>";
                        return $( "<li></li>" )
                        .data( "item.autocomplete", item )
                        .append( entry )
                        .appendTo( ul );            
                    };
                    $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
                }else if(profiles.status === "FAIL"){
                    $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                    component.getEvent("handleError").setParams({"responseObj":profiles}).fire();
                }
                if(objects.status === "SUCCESS"){
                    objects = objects.body;
                    objects = JSON.parse(objects);
                    $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'object_'+randomNumber)).parent('.SumoSelect').replaceWith('<select class="object-cls obj-combobox SlectBox_'+randomNumber+'" id="'+component.get('v.profileCommonId')+'object_'+randomNumber+'" multiple="multiple" placeholder="Object" disabled="true"></select>');
                    $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).attr('id', ''+component.get('v.profileCommonId')+'object_'+randomNumber);
                    
                    var objectOptions = '';
                    $.each(objects.sobjects, function(index, objObj){
                        if((objObj.undeletable && objObj.triggerable && !objObj.custom && objObj.mruEnabled) || (objObj.triggerable && objObj.custom)){
                            objectOptions = objectOptions + '<option value="'+objObj.name+'">'+objObj.label+'</option>';
                        }
                    });
                    $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)[0]).append(objectOptions); 
                    $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)[0]).SumoSelect({ csvDispCount: 4, search: true, searchText: 'Enter object...', okCancelInMulti: true  });
                    $(document.getElementById('profileModule').querySelectorAll('.CaptionCont .placeholder')).html('Object');
                    $(document.getElementById('profileModule').querySelectorAll('.CaptionCont label')).html('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right" style="height: 30px;width: 2.6em"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></a>');
                    $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).after('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle clear-icons clear-icons-profile" id="clear-'+randomNumber+'" title="Clear"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg></a>');
                    $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).closest("div").find('.MultiControls').find('.btnOk').attr('id', randomNumber).text('Search');
                    
                }else if(objects.status === "FAIL"){ 
                    $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .custom-combobox-input')).val('');
                    component.getEvent("handleError").setParams({"responseObj":objects}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
                
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error.'}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .cute-loader .loader-active')).remove();
                component.getEvent("handleError").setParams({"errors":'Process aborted.'}).fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    getProfileInfo : function(component, event, helper, orgId, profileId, randomNo, editFlag){
        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
        if(document.getElementById("showOnlyProfileDiff").checked){
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
        }
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
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
        
        $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .borderBottom')).append('<div class="progress"><div class="indeterminate"></div></div>');
        $(document.getElementById('profileModule').querySelectorAll('#autoProfileId')).parent().attr('id', 'tags_'+profileId);
        component.set("v.strProfileId", profileId);
        $(document.getElementById('profileModule').querySelectorAll('#autoProfileId')).replaceWith('<span id="autoProfileId'+profileId+'" style="display:none;">'+profileId+'</span');
        $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo)).addClass('adminifiedProfileInfo1');
        
        var action = component.get("c.getProfileInfo");
        action.setParams({
            "orgId" : orgId,
            "profileId": profileId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                if(response.getReturnValue().status === "SUCCESS"){
                    var temp11 = response.getReturnValue().body;
                    temp11 = JSON.parse(temp11);
                    
                    component.set("v.profileInfo", temp11.records[0]);
                    this.fillData(component);
                    
                    $.each(temp11.records[0], function(key, value) {
                        var pIconshp = 'iconShap'+randomNo;
                        var PIconShapName = "Circle";
                        PIconShapName = $(document.getElementById('profileModule').querySelectorAll('#'+pIconshp)).text();
                        if(key === "UserLicense" && value !== null){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(value.Name);
                        }else if(key === 'Description' && value !== null){
                            var desc = '';
                            if((value).length > 40){
                                desc = (value).substring(0, 40);
                                $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(desc+'...');
                                $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).attr('title', value);
                            }else{
                                $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(value);
                                $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).attr('title', value);
                            }
                            
                        }else if(key === "CreatedBy" && value !== null){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(value.Name);
                        }else if(key === "LastModifiedBy" && value !== null){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(value.Name);
                        }else if(key === "CreatedDate"){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(getDateCoversion(value));
                        }else if(key === "LastModifiedDate"){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(getDateCoversion(value));
                        }else if(key === "SystemModstamp"){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(getDateCoversion(value));
                        }else if(key === "LastViewedDate"){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(getDateCoversion(value));
                        }else if(key === "LastReferencedDate"){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(getDateCoversion(value));
                        }else if(value === true){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(' <span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                        }else if(value === false){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                        }else if(value === null || $.trim(value) === '' || $.trim(value) === null){
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html("&nbsp;");
                        }else{
                            $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+key)).html(value);
                        }
                    });
                    
                    $(document.getElementById('profileModule').querySelectorAll('.btn-'+randomNo)).removeClass('btn-visible'); 
                    $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'object_'+randomNo)).removeAttr('disabled');
                    $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'object_'+randomNo)).parent('.SumoSelect').removeClass('disabled');
                    $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .profileBorderBottom .progress')).remove();
                    
                }else if(response.getReturnValue().status === "FAIL"){
                    $(document.getElementById('profileModule').querySelectorAll('#profile_'+randomNo)).val('');
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue()}).fire();
                    $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .profileBorderBottom .progress')).remove();
                }
                if($(document.getElementById('profileModule').querySelectorAll('#showHideProfileDiff')).is(':checked')){
                    component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
                    if(document.getElementById("showOnlyProfileDiff").checked){
                        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
                    }
                }
                component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
            }else if (state === "ERROR") {
                $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .profileBorderBottom .progress')).remove();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error.'}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
            }else if (state === "ABORTED") {
                $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNo+' .profileBorderBottom .progress')).remove();
                component.getEvent("handleError").setParams({"errors":'Process aborted.'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
            }
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
            component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();  
        });
        $A.enqueueAction(action);
    },
    
    getJSONData : function(component, event, helper){
        var templtData = component.get('v.profileTemplate');
        if(templtData !== null || templtData !== undefined){
            var temp = '';
            
            var isHeader = false;
            var sectionDisplayClass = '';
            var feildDisplayClass = '';
            var collapsedClass = '';
            var html = '';
            var divClass = '';
            var filteredClass ='';
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
                    temp += '<tr  class="'+fieldKey+' '+feildDisplayClass+' '+filteredClass+' profile-search-'+fieldKey+' setting-'+fieldKey+' datarow "><td data-label="stage" class="data-field profile-'+randomNumber1+'-'+fieldKey+'">&nbsp;</td></tr>';
                });
                html += '<div class="'+component.get('v.profileCommonId')+''+sectionKey+' '+sectionDisplayClass+' profile-section-class section-class setting-'+sectionKey+'"><p class="toggle-section slds-truncate textUppercase "><button class="slds-button slds-button--icon-container focus-none"></button></p><table class="slds-table toggelClass slds-table--bordered '+collapsedClass+' toggle-'+component.get('v.profileCommonId')+''+sectionKey+' data-table-'+component.get('v.profileCommonId')+''+sectionKey+'" id="'+component.get('v.profileCommonId')+''+sectionKey+'-'+randomNumber1+'""><tbody>'+temp+'</tbody></table></div>';
            });
            var randomNumber = component.get('v.randomNumber');
            $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'object_'+randomNumber)).SumoSelect({ csvDispCount: 4, search: true, searchText: 'Enter object...', okCancelInMulti: true });
            $(document.getElementById('profileModule').querySelectorAll('.CaptionCont .placeholder')).html('Object');
            $(document.getElementById('profileModule').querySelectorAll('.CaptionCont label')).html('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right" style="height: 30px;width: 2.6em"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></a>');
            $(document.getElementById('profileModule').querySelectorAll(".profileCmpAppend")).replaceWith("<div class='srollbarNone profilescroll dataScroll profileCmpAppend_"+randomNumber+"'></div>");
            $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'object_'+randomNumber)).after('<a class="ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle clear-icons clear-icons-profile" id="clear-'+randomNumber+'" title="Clear"><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg></a>');
            $(document.getElementById('profileModule').querySelectorAll('.tags')).addClass('tags_'+randomNumber).removeClass('tags');
            $(document.getElementById('profileModule').querySelectorAll('.profileCmpAppend_'+component.get("v.randomNumber"))).append(html);
            
            temp = '';
            if($(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object tr')).length > 0){
                var id = $(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object')).attr('id');
                var myRegExp = new RegExp(id,'gi');
                var id1 = ''+component.get('v.profileCommonId')+'Object-'+component.get("v.randomNumber");
                var tbody = $(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object')).html();
                var tbody1 = tbody.replace(myRegExp, id1);
                $(document.getElementById('profileModule').querySelectorAll('#'+component.get('v.profileCommonId')+'Object-'+component.get("v.randomNumber"))).html(tbody1);
                $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+component.get("v.randomNumber"))).html('&nbsp');
                $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+component.get("v.randomNumber"))).attr('title', '');
                $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+component.get("v.randomNumber")+'-fill')).html('&nbsp');  
                
            }
            
            
            $.each(templtData, function(key, objObj){
                if(objObj.display){
                    $.each(document.getElementById('profileModule').querySelectorAll('.setting-'+key), function(ind, el){
                        el.classList.remove('section-field-hide');
                    });
                }else{
                    $.each(document.getElementById('profileModule').querySelectorAll('.setting-'+key), function(ind, el){
                        el.classList.add('section-field-hide');
                    });
                }
                $.each(objObj.fields, function(key1, objObj1){
                    if(objObj1.display){
                        $.each(document.getElementById('profileModule').querySelectorAll('.setting-'+key1), function(ind, el){
                            el.classList.remove('section-field-hide');
                        });
                    }else{
                        $.each(document.getElementById('profileModule').querySelectorAll('.setting-'+key1), function(ind, el){
                            el.classList.add('section-field-hide');
                        });
                    }
                });
            });
            component.getEvent("AdjustInfoBlock").setParams({
                "colSizeName": "profileColSize",
                "buttonName": "addMoreProfileBtn",
                "moduleName": "profileModule",
                "eventName": "add"
            }).fire();
            component.getEvent("renderIconShapProfileEvent").setParams({"tabName": "profileModule"}).fire();
            $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).show();
            $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).css("opacity", "0.2");
            $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 1000);
            $(document.getElementById('profileModule').querySelectorAll('.compare-btn')).attr('disabled', false);   
            $(document.getElementById('profileModule').querySelectorAll('.compare-btn')).html('<span class="slds-icon__container slds-icon--"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--left slds-icon--" name=""><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#add"></use></svg><span class="slds-assistive-text"></span></span> Add to Compare');
            
            var heights = $("div.profilesectionWp").map(function (){
                return $(this).height();
            }).get(),
                maxHeight = Math.max.apply(null, heights);
            
            $(document.getElementsByClassName('profilesectionWp')).height(maxHeight);
            var y = $(document.getElementById('ProfileSectionDiv')).offset().top;
            $(document.getElementsByClassName('profilescroll')).height(($(window).height()-y));
            $(document.getElementsByClassName('profilescroll')).addClass('scr2');
            $(document.getElementsByClassName('profilescroll')).on('scroll', function () {
                $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
            });
            
            $(document.getElementsByClassName('profilescroll')).mouseover(function(){
                $(this).removeClass('scr2');    
            }).mouseout(function(){
                $(this).addClass('scr2');   
            }); 
            $(document.getElementsByClassName('profileBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
            $(document.getElementsByClassName('profileBorderBottom')).eq($(document.getElementsByClassName('profileBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y scr2');
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
            if(document.getElementById("showOnlyProfileDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();
        }
    },
    
    getObjectDetails : function(component, event){
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
        
        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
        if(document.getElementById("showOnlyProfileDiff").checked){
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
        }
        
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'profileModule'}).fire();
        $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .borderBottom')).append('<div class="progress"><div class="indeterminate"></div></div>');
        var randomNo = component.get("v.randomNumber");
        var objNameList = $(document.getElementsByClassName('SlectBox_'+randomNo)).val();
        var orgId = component.get("v.strOrgId");
        var profileId = component.get("v.strProfileId");
        var orgNameSpace = component.get("v.orgNameSpace");
        var objName1 = '';
        $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).html('&nbsp');
        $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).attr('title', '');
        $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-fill')).html('&nbsp;');
        $.each(objNameList, function(ind, obj){
            var objectTemplate = '';
            var flag = true;
            if(ind === 0){
                objName1 = objName1 + obj;                
            }else{objName1 = objName1 +','+ obj;} 
        });
        var action = component.get("c.getObjectsDetails");
        action.setParams({"profileId" : profileId,
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
                    var pIconshp = 'iconShap'+randomNo;
                    var PIconShapName = "";
                    PIconShapName = $(document.getElementById('profileModule').querySelectorAll('#'+pIconshp)).text();
                    orgId = response.getReturnValue().OrgId.body;
                    Permissions = JSON.parse(Permissions);
                    recordType = JSON.parse(recordType);
                    objLayouts = JSON.parse(objLayouts);
                    component.set("v.objectNameList", objNameList);
                    $.each(objNameList, function(ind, obj){
                        var objectTemplate = '';
                        var flag = true;
                        var objName = '';
                        var objForCls;
                        if(orgNameSpace !== '' && obj.indexOf(orgNameSpace) > -1){
                            objForCls = obj.replace(orgNameSpace+'__','');
                        }else{
                            objForCls = obj;
                        }
                        var mainHeadingLabel = objForCls;
                        if(mainHeadingLabel.length > 25){
                            mainHeadingLabel = mainHeadingLabel.substring(0,25)+'...';
                        }
                        if(!$(document.getElementById('profileModule').querySelectorAll('#table-'+component.get('v.profileCommonId')+'Object tr')).hasClass('chk-object-fields-'+objForCls)){
                            var dependencyIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"> <path fill="#005fb2" d="M36,20c0-2.2-1.8-4-4-4H6c-2.2,0-4,1.8-4,4v26c0,2.2,1.8,4,4,4h26c2.2,0,4-1.8,4-4V20z M43,42h-3v-6h3 c0.6,0,1-0.4,1-1V9c0-0.6-0.4-1-1-1H17c-0.6,0-1,0.4-1,1v3h-6V9c0-3.9,3.1-7,7-7h26c3.9,0,7,3.1,7,7v26C50,38.9,46.9,42,43,42z"/></svg>';
                            objectTemplate = objectTemplate + '<tr class="toggle-'+component.get('v.profileCommonId')+'Object object-name-cls object-search object-for-chk-status chk-object-fields-'+objForCls+'" id="'+component.get('v.profileCommonId')+''+objForCls+'"><td style="padding-right: 0;padding-left: 0;"><div class="object-'+objForCls+' section-class"><div><h2 class="object-toggle profile_id___'+objForCls+'-heading " id="profile_id___'+objForCls+'-heading" style="padding: 0.2rem;padding-left: 2.5rem; cursor: pointer;float: left;"><span class="slds-truncate toggleIcon thead-val object-name"><span class="object-open "><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#right"></use></svg></span><b title="'+objForCls+'">'+mainHeadingLabel+'</b></span></h2><a class="object-status-info tooltips"style="float: right;padding-right: 20px;"  id="'+objForCls+','+orgId+'"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small infoIconColor" style="fill: #005fb2;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#info"></use></svg> </span> <span class="tooltip-span">View object used fields.</span></a><a class="object-dependency-info tooltips" style="float: right;padding-right: 20px;"  id="fieldDependent-'+objForCls+','+orgId+'" ><span>'+dependencyIcon+'</span> <span class="tooltip-span">View object dependency.</span></a></div><div class="object-permission'+objForCls+'"><table id="'+component.get('v.profileCommonId')+''+objForCls+'-permission-table" class=" permission-tabl object-subsection-table slds-table--bordered"><tr class="datarow obj-field-row"><td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Permissions</td></tr><tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsRead"  id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsRead"><td class="slds-text-align--right">Read</td></tr><tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsCreate" id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsCreate"><td class="slds-text-align--right">Create</td></tr><tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsDelete"  id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsDelete"><td class="slds-text-align--right">Delete</td></tr> <tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsEdit" id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsEdit"> <td class="slds-text-align--right">Edit</td> </tr> <tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsModifyAllRecords"  id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsModifyAllRecords"> <td class="slds-text-align--right">ModifyAll</td> </tr> <tr class="datarow field-row obj-field-row '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsViewAllRecords"  id="'+component.get('v.profileCommonId')+''+objForCls+'_PermissionsViewAllRecords"> <td class="slds-text-align--right">ViewAll</td> </tr> </table> </div> <div class="object-record-type'+objForCls+' section-class"> <table id="'+component.get('v.profileCommonId')+''+objForCls+'-record-type" class="'+objForCls+'-record-type-table recordtype-table object-subsection-table slds-table--bordered" style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Record Type</td> </tr> </table> </div> <div class="object-layouts'+objForCls+' section-class"> <table id="'+component.get('v.profileCommonId')+''+objForCls+'-layouts" class="'+objForCls+'-layouts-table layouts-table object-subsection-table slds-table--bordered" style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper objectLable"><span><svg aria-hidden="true" class="slds-icon slds-icon-text-default slds-icon--x-small"><use xlink:href="/resource/stivadmn__slds0120/assets/icons/utility-sprite/svg/symbols.svg#reply"></use></svg> </span> Layouts</td> </tr> </table> </div></div></td> </tr>';
                            $(document.getElementById('profileModule').querySelectorAll('#table-'+component.get('v.profileCommonId')+'Object')).append(objectTemplate);  
                            
                        }
                        $.each($(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object')), function(index, elementObj){
                            var rNo = $(elementObj).attr('id');
                            var samerNO = ''+component.get('v.profileCommonId')+'Object-'+randomNo;
                            if(!$(document.getElementById('profileModule').querySelectorAll('#'+rNo+' tr')).hasClass('chk-object-'+objForCls)){
                                $(document.getElementById('profileModule').querySelectorAll('#'+rNo)).append('<tr class="toggle-'+component.get('v.profileCommonId')+'Object chk-object-'+objForCls+'" id="'+obj+'-'+orgId+'"> <td style="padding-right: 0;padding-left: 0;" id="id-'+rNo+'-'+objForCls+'"><div class="object-'+objForCls+' section-class "> <h2 class="profile_id___'+objForCls+'-heading" style="padding: 0.2rem;padding-left: 0.5rem;"><span class="slds-truncate thead-val object-name"><b class="obj-head-'+rNo+'">&nbsp;</b></span></h2> <div class="object-permission'+objForCls+'"> <table class="'+component.get('v.profileCommonId')+''+objForCls+'-permission-table permission-table slds-table--bordered"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+objForCls+'_PermissionsRead'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsRead profileModule-'+objForCls+'_PermissionsRead" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsRead '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+objForCls+'_PermissionsCreate'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsCreate profileModule-'+objForCls+'_PermissionsCreate" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsCreate '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+objForCls+'_PermissionsDelete'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsDelete profileModule-'+objForCls+'_PermissionsDelete" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsDelete '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row  '+objForCls+'_PermissionsEdit'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsEdit profileModule-'+objForCls+'_PermissionsEdit" id=""> <td class="'+rNo+'-'+objForCls+'-PermissionsEdit '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+objForCls+'_PermissionsModifyAllRecords'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsModifyAllRecords profileModule-'+objForCls+'_PermissionsModifyAllRecords" id="" ><td class="'+rNo+'-'+objForCls+'-PermissionsModifyAllRecords '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> <tr class="datarow field-row obj-field-row '+objForCls+'_PermissionsViewAllRecords'+' '+component.get('v.profileCommonId')+''+objForCls+'_PermissionsViewAllRecords profileModule-'+objForCls+'_PermissionsViewAllRecords" id="" ><td class="'+rNo+'-'+objForCls+'-PermissionsViewAllRecords '+rNo+'-fill '+rNo+'-'+objForCls+'-fill">&nbsp</td> </tr> </table> </div> <div class="object-record-type'+objForCls+' section-class"> <table class="'+component.get('v.profileCommonId')+''+objForCls+'-record-type '+rNo+'-'+objForCls+'-record-type-table  recordtype-table slds-table--bordered"  style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> </table> </div> <div class="object-layouts'+objForCls+' section-class"> <table class="'+component.get('v.profileCommonId')+''+objForCls+'-layouts '+rNo+'-'+objForCls+'-layouts-table  layouts-table slds-table--bordered"  style="display:none"> <tr class="datarow obj-field-row"> <td class="textUper">&nbsp</td> </tr> </table> </div> </div> </td> </tr>');
                            }    
                        });
                        var headingTag = $('#profileModule .SlectBox_'+randomNo+' option[value="'+obj+'"]').text();
                        headingTag = headingTag+' ('+obj+')';
                        if(headingTag.length > 45){
                            headingTag = headingTag.substring(0,45)+'...';
                        }
                        $(document.getElementById('profileModule').querySelectorAll('#id-'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objForCls+' .obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).html(headingTag);
                        $(document.getElementById('profileModule').querySelectorAll('#id-'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objForCls+' .obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNo)).attr('title',$('#profileModule .SlectBox_'+randomNo+' option[value="'+obj+'"]').text()+' ('+obj+')');
                        $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objForCls+'-fill')).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
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
                                    $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objname+'-'+key)).html(' <span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                                }else{
                                    $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objname+'-'+key)).html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                                }
                            }
                        });
                        PermissionsObj[objObj.SobjectType+'-'+objObj.Id] = perms;
                    });
                    component.set("v.objectPermissions", PermissionsObj);
                    if(recordType.records !== ''){
                        $.each(recordType.records, function(key, value) {
                            var objName = '';
                            var objApiName = value.SobjectType;
                            var flag = true;
                            var indexTr = 0;
                            if(orgNameSpace !== '' && objApiName.indexOf(orgNameSpace) > -1){
                                objName = objApiName.replace(orgNameSpace+'__','');
                            }else{
                                objName = objApiName;
                            }
                            $(document.getElementById('profileModule').querySelectorAll('.'+objName+'-record-type-table')).show();
                            $.each($(document.getElementById('profileModule').querySelectorAll('.'+objName+'-record-type-table tr')), function(i, objObj){
                                if($.trim($(objObj.querySelectorAll('td')).text()) === $.trim(value.Name)){
                                    flag = false;
                                    indexTr = i; 
                                }
                            });
                            if(flag){
                                $(document.getElementById('profileModule').querySelectorAll('.'+objName+'-record-type-table')).append('<tr class="datarow field-row obj-field-row recordtype-'+value.Id+'" id="'+value.Id+'"> <td class="slds-text-align--right">'+value.Name+'</td> </tr>'); 
                                indexTr = ($(document.getElementById('profileModule').querySelectorAll('.'+objName+'-record-type-table tr')).length)-1;
                            }
                            $.each($(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object')), function(index, elementObj){
                                var rNo = $(elementObj).attr('id');
                                $(document.getElementById('profileModule').querySelectorAll('.'+rNo+'-'+objName+'-record-type-table')).show();
                                if(flag){
                                    $(document.getElementById('profileModule').querySelectorAll('.'+rNo+'-'+objName+'-record-type-table')).append('<tr class="datarow field-row obj-field-row recordtype-'+value.Id+' '+value.Id+' profileModule-'+value.Id+' rtyp-'+value.Id+'" id="'+value.Id+'"> <td class="'+rNo+'-'+objName+'-'+value.Id+' '+rNo+'-fill">&nbsp;</td> </tr>');
                                }
                            });
                            if(value.IsActive){
                                $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objName+'-record-type-table tr')).eq(indexTr).find('td').html('<span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                            }else{
                                $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objName+'-record-type-table tr')).eq(indexTr).find('td').html('<span class="reject icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/false'+PIconShapName+'.png" alt="false'+PIconShapName+'" /></span>');
                            }
                        });
                    }
                    if(objLayouts !== ''){
                        $.each(objLayouts, function(ind, value) {
                            var layoutName = value.Name;
                            layoutName = layoutName.split('-');
                            var objApiName = layoutName[0];
                            var objName = '';
                            if(orgNameSpace !== '' && objApiName.indexOf(orgNameSpace) > -1){
                                objName = objApiName.replace(orgNameSpace+'__','');
                            }else{
                                objName = objApiName;
                            }
                            var layoutName1 = layoutName[1];
                            var layoutName2 = layoutName[1];
                            if(layoutName.length > 2){
                                for(var i=2; i<layoutName.length; i++){
                                    layoutName1 += '-'+layoutName[i];
                                    layoutName2 += '-'+layoutName[i];
                                }
                            }
                            
                            layoutName2 = decodeURI(layoutName2);
                            $(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts-table')).show();
                            var flag = true;
                            var indexTr = 0;
                            $.each($(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts-table tr')), function(ikey, objObj){
                                var trText = $(objObj.querySelectorAll('td')).text();
                                trText = trText.split('View field level accessibility.'); 
                                trText = $.trim(trText[0]);
                                var layoutforcompare = $.trim(layoutName2);
                                if(trText === layoutforcompare){
                                    flag = false;
                                    indexTr = ikey; 
                                }
                            });
                            if(flag){
                                $(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts-table')).append('<tr class="datarow field-row obj-field-row layouts-'+value.Id+'" id="'+value.Id+'"> <td class="slds-text-align--right">'+layoutName2+' &nbsp;&nbsp;<a class="fieldLevelView tooltips" id="'+value.Id+','+objName+','+orgId+','+layoutName1+'"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 23.667 27" enable-background="new 0 0 23.667 27" xml:space="preserve"><path fill="#005fb2" d="M11.585,1.758c1.31,0,2.382,1.072,2.382,2.382c0,1.309-1.072,2.381-2.382,2.381 c-1.311,0-2.381-1.072-2.381-2.381C9.204,2.831,10.274,1.758,11.585,1.758z M22.303,10.094h-7.146v15.48h-2.382V18.43h-2.382v7.145 H8.013v-15.48H0.867V7.712h21.436V10.094z"/></svg><span class="tooltip-span">View field level accessibility.</span></a></td> </tr>'); 
                                indexTr = ($(document.getElementById('profileModule').querySelectorAll('.'+objName+'-layouts-table tr')).length)-1;
                            }
                            $.each($(document.getElementById('profileModule').querySelectorAll('.data-table-'+component.get('v.profileCommonId')+'Object')), function(index, elementObj){
                                var rNo = $(elementObj).attr('id');
                                $(document.getElementById('profileModule').querySelectorAll('.'+rNo+'-'+objName+'-layouts-table')).show();
                                if(flag){
                                    $(document.getElementById('profileModule').querySelectorAll('.'+rNo+'-'+objName+'-layouts-table')).append('<tr class="datarow field-row obj-field-row layouts-'+value.Id+' '+value.Id+' profileModule-'+value.Id+' ltyp-'+value.Id+'" id="'+value.Id+'"> <td class="'+rNo+'-'+objName+'-'+value.Id+' '+rNo+'-fill">&nbsp;</td> </tr>');
                                }
                            });
                            $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNo+'-'+objName+'-layouts-table tr')).eq(indexTr).find('td').html('<span class="approval icon_'+PIconShapName+'"><img src="/resource/stivadmn__slds0120/assets/icons/SingleColor/true'+PIconShapName+'.png" alt="true'+PIconShapName+'" /></span>');
                            
                        });
                    }
                    //time diff start
                    
                    
                    component.getEvent("getAllObjectFromObject").setParams({"index" : component.get("v.index")}).fire();
                    component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
                    if(document.getElementById("showOnlyProfileDiff").checked){
                        component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
                    }
                    component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();
                }else if(response.getReturnValue().Permissions.status === "FAIL"){
                    component.getEvent("handleError").setParams({"responseObj":response.getReturnValue().Permissions}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .profileBorderBottom .progress')).remove();
                
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error.'}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .profileBorderBottom .progress')).remove();
            }else if (state === "ABORTED") {
                component.getEvent("handleError").setParams({"errors":'Process aborted.'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'profileModule'}).fire();
                $(document.getElementById('profileModule').querySelectorAll('#comp'+component.get("v.randomNumber")+' .profileBorderBottom .progress')).remove();
                
            }
            
        });
        $A.enqueueAction(action);
    },
    
    fillData : function(component){
        var profileStructure = component.get("v.profileTemplate");
        var randomNo = component.get("v.randomNumber");
        $.each(profileStructure, function(section, sectionVal) {
            $.each(sectionVal.fields, function(secKey, secValue) {
                $(document.getElementById('profileModule').querySelectorAll('.profile-'+randomNo+'-'+secKey)).html('N/A');
            });
        });
    },
    
    resetProfile : function(component,event, helper){
        var randomNumber = component.get("v.randomNumber");
        if($(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber)).hasClass('adminifiedProfileInfo1')){
            $.each($(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .data-field')),function(dataFldk,dataFldv){
                $(this).html('&nbsp;');
            });
            $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber)).removeClass('adminifiedProfileInfo1');
            if(component.get("v.profileInstanceData") !== '')
                component.getEvent("ResetInstanceDataListProfile").setParams({"instanceData":component.get("v.profileInstanceData")}).fire();
            component.set("v.profileInstanceData", '');
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
            if(document.getElementById("showOnlyProfileDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
            }
        }
        if(!$(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .SumoSelect')).hasClass('disabled')){ 
            $(document.getElementById('profileModule').querySelectorAll('.btn-'+randomNumber)).addClass('btn-visible');
            $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNumber)).html('&nbsp');
            $(document.getElementById('profileModule').querySelectorAll('.obj-head-'+component.get('v.profileCommonId')+'Object-'+randomNumber)).attr('title', '');
            $(document.getElementById('profileModule').querySelectorAll('.'+component.get('v.profileCommonId')+'Object-'+randomNumber+'-fill')).html('&nbsp;');            
            $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .CaptionCont')).attr('title', 'Select Here');
            $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).val('');
            $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .CaptionCont span')).html('Object');
            $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .optWrapper ul li')).removeClass('selected');
            $(document.getElementById('profileModule').querySelectorAll('.SlectBox_'+randomNumber)).attr("disabled", "disabled");
            $(document.getElementById('profileModule').querySelectorAll('#comp'+randomNumber+' .SumoSelect')).addClass('disabled');
            component.set("v.objectNameList", []);
            component.getEvent("getAllObjectFromObject").setParams({"index" : component.get("v.index")}).fire();
            component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':false}).fire();
            if(document.getElementById("showOnlyProfileDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHideProfileDiff","compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"currentComparableModule" : 'adminifiedProfileInfo1', "tabName" : 'profile','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : 'ProfileSectionDiv',"mainModule" : 'adminifiedAdminifiedProfileModule',"moduleName":'profile'}).fire();
        }
    },    
})