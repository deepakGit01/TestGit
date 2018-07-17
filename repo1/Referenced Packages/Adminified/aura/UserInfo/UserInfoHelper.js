({
    /* globals $ */
    // Create structure
    getJSONData : function(component, event, helper){         
        var funcs = {
            getAttr: function(ele, attr) {
                var result = ele[attr] || null;
                if( !result ) {
                    var attrs = ele.attributes;
                    var length = attrs.length;
                    for(var i = 0; i < length; i++)
                        if(attr[i].nodeName === attr)
                            result = attr[i].nodeValue;
                }
                return result;
            }
        };
        
        var templtData = component.get('v.userTemplate');
        if(templtData !== null || templtData !== undefined){
            component.set('v.userTemplate', templtData);
            templtData = component.get('v.userTemplate');
            var jsonData = templtData;
            var temp = '';
            var isHeader = false;
            var sectionDisplayClass = '';
            var feildDisplayClass = '';
            var collapsedClass = '';
            var filteredClass = '';
            var html = '';
            var divClass;
            $.each(jsonData, function(sectionKey, sectionObj){
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
                    if(fieldKey !== 'FirstName' && fieldKey !== 'LastName'){
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
                        temp += '<tr  class="'+fieldKey+' '+feildDisplayClass+' user-search-'+fieldKey+' '+filteredClass+' setting-'+fieldKey+' datarow "><td data-label="stage" class="data-field">&nbsp;</td></tr>';
                    }
                });
                html += '<div class="'+component.get("v.userCommonId")+''+sectionKey+' '+sectionDisplayClass+' users user-section-class section-class setting-'+sectionKey+'"><p class="toggle-section slds-truncate textUppercase "><button class="slds-button slds-button--icon-container focus-none"></button></p><table class="slds-table toggelClass slds-table--bordered '+collapsedClass+' toggle-'+component.get("v.userCommonId")+''+sectionKey+' data-table-'+component.get("v.userCommonId")+''+sectionKey+'" id="'+component.get("v.userCommonId")+''+sectionKey+'-'+component.get("v.randomNumber")+'"><tbody>'+temp+'</tbody></table></div>';
            });
            $(document.getElementsByClassName("userCmpAppend")).replaceWith("<div class='srollbarNone userscroll dataScroll userCmpAppend_"+component.get("v.randomNumber")+"'></div>");
            $(document.getElementsByClassName('userCmpAppend_'+component.get("v.randomNumber"))).append(html);
            temp = '';
            component.getEvent("AdjustInfoBlock").setParams({
                "colSizeName": "userColSize",
                "buttonName": "addMoreUserBtn",
                "moduleName": "userModule",
                "eventName": "add"
            }).fire();
            
            component.getEvent("renderIconShapEvent").setParams({"tabName": "userModule"}).fire();
            if(document.getElementById('userModule').querySelectorAll('.data-table-'+component.get("v.userCommonId")+'Permission_Sets tr').length > 0){   
                var id = funcs.getAttr(document.getElementById('userModule').querySelectorAll('.data-table-'+component.get("v.userCommonId")+'Permission_Sets')[0],'id');
                var myRegExp = new RegExp(id,'gi');
                var id1 = component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber");
                var tbody = document.getElementById('userModule').querySelectorAll('.data-table-'+component.get("v.userCommonId")+'Permission_Sets')[0].innerHTML;
                var tbody1 = tbody.replace(myRegExp, id1);
                $(document.getElementById('userModule').querySelectorAll('#'+component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber"))).html(tbody1);
                $.each($(document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber")+'-fill')),function(ex){
                    $(this).html('&nbsp;');
                });
                if($(document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber")+'-fill')).parent('tr').hasClass('difference-row')){
                   $(document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber")+'-fill')).parent('tr').removeClass('difference-row');
                }
            }
            
            $(document.getElementById('comp'+component.get("v.randomNumber"))).show();
            $(document.getElementById('comp'+component.get("v.randomNumber"))).css("opacity", "0.2");
            $(document.getElementById('comp'+component.get("v.randomNumber"))).animate({"opacity": "1"}, 1000);
            $(document.getElementById('userModule').querySelectorAll('.compare-btn')).html('<span class="slds-icon__container slds-icon--"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--left slds-icon--" name=""><use xlink:href="/resource/stivadmn__SLDS0120/assets/icons/utility-sprite/svg/symbols.svg#add"></use></svg><span class="slds-assistive-text"></span></span> Add to Compare');
            $(document.getElementsByClassName('compare-btn')).attr('disabled', false);
            
            var heights = $("div.usersectionWp").map(function (){
                return $(this).height();
            }).get(), maxHeight = Math.max.apply(null, heights);
            
            
           $(document.getElementsByClassName('usersectionWp')).height(maxHeight);
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            
            $(document.getElementsByClassName('usersectionWp')).addClass('scr2');
            var y = $(document.getElementById('appendDiv')).offset().top;
            $(document.getElementsByClassName('userscroll')).height(($(window).height()-y));
            $(document.getElementsByClassName('userscroll')).on('scroll', function () {
                $(document.getElementsByClassName('scr2')).scrollTop($(this).scrollTop());
            });
            $(document.getElementsByClassName('userscroll')).mouseover(function(){
                $(this).removeClass('scr2');    
            }).mouseout(function(){
                $(this).addClass('scr2');   
            });
            $(document.getElementsByClassName('userBorderBottom')).next().removeClass('slds-scrollable--y').addClass('srollbarNone');
            $(document.getElementsByClassName('userBorderBottom')).eq($(document.getElementsByClassName('userBorderBottom')).length - 1).next().removeClass('srollbarNone').addClass('slds-scrollable--y scr2');
            
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            
            component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':false}).fire();
            
            if(document.getElementById("showOnlyUserDiff").checked){
                component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':true}).fire();  
            }
            component.getEvent("rowHeightEvent").setParams({"compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"moduleName" : 'user'}).fire();
            
            setTimeout(function(){
                $(document.getElementsByClassName('adminified-loader')).hide();
            }, 2000);
        }
    	$(document.getElementsByClassName('adminified-loader')).hide();
    },
    
    // Get organization details
    getConnectedOrg: function(component, event, helper) {
        var Y = $(document.getElementById("appendDiv")).offset().top;
        var opts = [];
        $(document.getElementsByClassName('userscroll')).height(($(window).height()-Y));
        var self = this;
        component.getEvent("GetGlobalOrg").fire();        
        var conOrgs = component.get("v.globalOrg");
        if (conOrgs !== undefined && conOrgs !== null) {
            opts = [];
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
            $(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))).html(opt_str);
            $(document.getElementsByClassName('select-org'+component.get("v.randomNumber"))).combobox1({
                source: opts,
                select:function(e,ui){
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                        source : []
                    });
                    $('select.select-org'+component.get("v.randomNumber")).find('option[value="'+e.target.value+'"]').attr('selected', 'selected');
                    component.set("v.strOrgId", e.target.value);
                    component.getEvent("GetOrgUsers").setParams({
                        "OrgId" :  e.target.value,
                        "randomNumber" : component.get("v.randomNumber"),
                        "index" : component.get("v.index")
                    }).fire();
                    $(document.getElementsByClassName('selOrg')[0].querySelectorAll('option')).each(function(i, val){
                        if(e.target.value === $(this).val()){
                            if($(this).text() !== component.get("v.strOrgName")){
                                $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val('');
                                helper.inputKeyup(component, event, helper);
                            }
                            component.set("v.strOrgName", $(this).text());
                        }
                    });
                }
            });
            // it takes 150 neno sec.
            if(component.get("v.strOrgId") !== undefined){
                $(document.getElementById('userModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))).closest('span').find('input input').val(component.get("v.strOrgName"));
            }else{
                $(document.getElementById('userModule').querySelectorAll('.select-org'+component.get("v.randomNumber"))).closest('span').find('input').val(''); 
            }
            $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).on('keyup keypress', function(e){
                var code = e.keyCode || e.which;
                var inp = String.fromCharCode(e.keyCode);
                var regExp = /[a-zA-Z0-9-_ ]/;
                if((code === 46 || code === 8 || regExp.test(inp)) && !e.ctrlKey && !(code === 17)){ 
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                        source : []
                    });
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val('');
                    helper.inputKeyup(component, event, helper);
                }else if(code === 86 && e.ctrlKey){
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                        source : []
                    });
                    $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val('');
                    helper.inputKeyup(component, event, helper);
                }
            });
            
            $(document.getElementsByClassName('custom-combobox-input')).addClass('slds-input slds-input--small custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left val ui-autocomplete-input '); 
            $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
            if(!event.getParam("isRefreshOrg")){
                helper.getJSONData(component, event, helper); 
            }else{
                if(event.getParam("action") === "Add"){
                    if(component.get("v.index") === event.getParam("index") && event.getParam("moduleName") === 'userModule'){ 
                        opts = [{ "class": "optionClass", label: event.getParam("userName"), value:  event.getParam("userName"), selected: "true"}];
                        var userName = event.getParam("userName");
                        var msg = 'Successfully saved organization '+userName;
                        $(document.getElementsByClassName('success-msg')).html(msg);
                        $(document.getElementsByClassName('alert-success')).show();
                        component.set("v.strOrgId", event.getParam("orgId"));
                        component.set("v.strOrgName", userName);
                        if(typeof event.getParam("randomNumber") === undefined ){
                            event.setParam("randomNumber", component.get("v.randomNumber"));
                        }
                        this.inputKeyup(component, event, helper);
                        $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val('');
                        $(document.getElementsByClassName('tags_'+event.getParam("randomNumber"))).autocomplete({
                            source :  [],
                        });
                        this.getOrgUsers(component, event, helper);
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val(userName);
                        $('select.select-org'+event.getParam("randomNumber")).find('option:selected').removeAttr('selected');                    
                    }
                }
                if(event.getParam("action") === "Delete"){
                    if(component.get("v.strOrgId") === event.getParam("orgId")){
                        $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).autocomplete({
                            source : []
                        });
                        $(document.getElementsByClassName('tags_'+component.get("v.randomNumber"))).val('');
                        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.custom-combobox-input')).val('');
                        this.inputKeyup(component, event, helper);
                    }
                }
             }
        }
    },
    
    // User info edit
    editUserData : function(component, event, helper){
      
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementsByClassName('edit-user-cls'+component.get("v.randomNumber"))).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>');
       
        $A.createComponent(
            "stivadmn:EditUserModule",{ 
                "userTemplateData" : component.get("v.userTemplate"),
                "userData" : {"OrgId":component.get("v.strOrgId"), "OrgName":component.get("v.strOrgName"), "userId":component.get("v.strUserId"), "UserName":component.get("v.strUserName"), "ProfileName": $.parseJSON(component.get("v.userInfo").body).records[0].Profile.Name},
                "userInfo" : component.get("v.userInfo"),
                "randomNumber" : component.get("v.randomNumber"),
                "index" : component.get("v.index")
            },
            function(newComponent){
                if (component.isValid()) {
                    var EditCmp = component.find("EditUserModule");
                    EditCmp.set("v.body", newComponent);
                }
            });
    },
    
    // Create user clone
    cloneUserData: function(component, event, helper){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementsByClassName('clone-user-cls'+component.get("v.randomNumber"))).html('').append('<span class="btnLoder"><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect></svg></span>' );
        $A.createComponent(
            "stivadmn:CloneUserModule",{ 
                "userData" : {"OrgId":component.get("v.strOrgId"), "OrgName":component.get("v.strOrgName"), "userId":component.get("v.strUserId"), "UserName":component.get("v.strUserName"), "ProfileName": $.parseJSON(component.get("v.userInfo").body).records[0].Profile.Name},
                "randomNumber" : component.get("v.randomNumber"), 
                "index" : component.get("v.index")
            },
            function(newComponent){
                if (component.isValid()) {
                    var CloneCmp = component.find("CloneUserModule");
                    CloneCmp.set("v.body", newComponent);
                }
            }
        );
    },
    
    getOrgUsers: function(component, event, helper){        
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader')).append('<div class="loader-active textLoader"><svg width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');
        var self = this;
        var action = component.get("c.getOrgUsers");
        var randomNumber = 0;
        var elem;
        var orgId = ''; 
        
        if(event.getParam("flag") === undefined){
            orgId = component.get("v.strOrgId");
            elem = event.getParam("randomNumber");
            action.setParams({
                "orgId": orgId
            });
        }else{
            orgId = event.getParam("cloneOrgId");
            component.set("v.strOrgId",event.getParam("cloneOrgId"));
            action.setParams({
                "orgId": orgId
            });
        }
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                $('select.select-org'+component.get("v.randomNumber")).find('option[value="'+component.get("v.strOrgId")+'"]').attr('selected', 'selected');
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                var resData = response.getReturnValue();
                var opts = [];
                var opt = {};
                var optsId = [];
                
                $.each(resData, function(idxParent, objParent){
                    if(objParent.status === "SUCCESS"){
                        $.each($.parseJSON(objParent.body).records, function(idx, obj){
                            opt = {'label':obj.Name,'id':obj.Id,'value':obj.Name,'orgId':orgId};
                            opts.push(opt); 
                        });
                        component.set('v.manageUserNameObj',opts);
                        if(event.getParam("flag") === undefined){
                            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                            $(document.getElementsByClassName('tags_'+event.getParam("randomNumber"))).autocomplete({
                                source :  opts,
                                minLength: 3,
                                select: function( e, ui ) {
                                    helper.inputKeyup(component, event, helper);
                                    var instanceData = ui.item.orgId+'_'+ui.item.id;
                                    var indexNo = $(this).attr('class').split(' ');
                                    component.set("v.UserNameForLH",ui.item.label);
                                    component.getEvent("UpdateInstaceDataList").setParams({
                                        "randomNo" : indexNo[3].split('_')[1],
                                        "userId" : ui.item.id,
                                        "index" : component.get("v.index"),
                                        "orgId": ui.item.orgId,
                                        "instanceData" : instanceData,
                                        "userName" : ui.item.label
                                    }).fire();
                                }
                            });
                            
                            $(document.getElementsByClassName('ui-autocomplete')).wrap('<div class="stivadmnAdminifiedMain" />');
                            $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                        }else{
                            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                            $(document.getElementsByClassName('tags_'+event.getParam("randomNumber"))).val('');
                            $(document.getElementsByClassName('tags_'+event.getParam("randomNumber"))).val(event.getParam("newUserName"));
                            $(document.getElementsByClassName('tags_'+event.getParam("randomNumber"))).autocomplete({
                                source :  opts,
                                minLength: 0
                            });
                            
                            $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("randomNumber"))[0].querySelectorAll('table tr .data-field')),function(idx){
                                $(this).text('N/A');
                            });
                            randomNumber = event.getParam("randomNumber");
                            var newUserId = event.getParam("newUserId");
                            component.set("v.strUserName", event.getParam("newUserName"));
                            $A.get("e.stivadmn:UserInfoEvent").setParams({
                                "redNumber" : randomNumber,
                                "userId" : newUserId,
                                "index" : event.getParam("index"),
                                "orgId": orgId,
                                "userName": event.getParam("newUserName")
                            }).fire();
                            component.getEvent("PutCloneUserEvent").setParams({
                                "index" : component.get("v.index"),
                                "newUserName" : event.getParam("newUserName"),
                                "newUserId": newUserId,
                                "orgId":orgId
                            }).fire();
                        }
                        $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                    }if(objParent.status === "FAIL"){
                        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                        $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                        component.getEvent("handleError").setParams({"responseObj":objParent}).fire();
                        
                    }
                });
            }else if (state === "ERROR") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
            }else if (state === "ABORTED") {
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                $(document.getElementById('comp'+event.getParam("randomNumber")).querySelectorAll('.cute-loader .loader-active')).remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
            } 
        });        
        $A.enqueueAction(action);
    },
    
    getUserInfo : function(component, event, helper, orgId, userId, randomNo){
        component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": true, "tabName" : 'userModule'}).fire();
        $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.userBorderBottom')).append('<div class="progress"><div class="indeterminate"></div></div>');
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
        var getInnerText = function (element) {
            var nodes = element.childNodes,
                i = 0,
                len = nodes.length,
                text = '';
            for (; i < len; i++) {
                if (nodes[i].nodeType === 3 || nodes[i].nodeType === 4) {
                    // 3 means text node, 4 means cdata
                    text += nodes[i].nodeValue;
                } else {
                    text += getInnerText(nodes[i]);
                }
            }
            return text;
        };        
        
        function chkHasClass(element, className) {
            return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
        }
        if(event.getParam("flag") === undefined){
            $(document.getElementById('autoUserId')).replaceWith('<span id="autoUserId'+userId+'" style="display:none;">'+userId+'</span>')
            $(document.getElementById('autoUserId')).parent().attr('id', 'tags_'+userId);
        }else{
            orgId = event.getParam("orgId");
        }
        component.set("v.orgIdForRP",orgId);
        userId = event.getParam('userId'); 
        component.set("v.userIdForRP",userId);
        component.set("v.strUserId", userId);
        var action = component.get("c.getUserInfoWithPermissionSet");
        action.setParams({
            "orgId" : orgId,
            "userId": userId
        });
        
        action.setCallback(this, function(response) {
            var div1id = $(document.getElementsByClassName('slds-size--1-of-4')).eq(1);
            var div2id = $(document.getElementsByClassName('slds-size--1-of-4')).eq(2);
            var div3id = $(document.getElementsByClassName('slds-size--1-of-4')).eq(3);
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.userInfo", response.getReturnValue().UserDetails);
                var resData = response.getReturnValue().UserDetails;
                var permissionSet = response.getReturnValue().PermissionSets;
                var temp = '';
                var randomNumber = component.get("v.randomNumber");
                var iconloginHistory = '';
                if(resData.status !== undefined && resData.status === 'SUCCESS'){
                    if(event.getParam("flag") === undefined){
                        var iconshp = 'iconShap'+randomNumber;
                        var iconShapName = "";
                        iconShapName = getInnerText(document.getElementById('userModule').querySelectorAll('#'+iconshp)[0]);
                        $(document.getElementsByClassName("userBtn"+event.getParam("redNumber"))).removeClass('editCloneBtn');
                        $.each($(document.querySelectorAll('.userCmpAppend_'+event.getParam("redNumber")+' table tr')),function(idx){ 
                            var className = $(this).attr('class').split(' ');
                            var className1 = '';
                            className1 = className[0];
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'boolean'){
                                if($.parseJSON(resData.body).records[0][className1]){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span class="approval icon_'+iconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>';
                                }else{
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span class="reject icon_'+iconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>';
                                }
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'undefined' || $.type($.parseJSON(resData.body).records[0][className1]) === undefined){
                                $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] .data-field')),function(dataFldk,dataFldv){
                                    $(this).text('N/A');
                                });
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'null' || $.type($.parseJSON(resData.body).records[0][className1]) === null){
                                $(document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0]).find('table tr[class="'+$(this).attr('class')+'"] td').html('&nbsp;');
                                if(className1 === 'UserRole'){
                                  $(document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0]).find('table tr[class="'+$(this).attr('class')+'"] td').html('None'); 
                                }
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'string' ){
                                if(className1 === 'Username'){
                                    var username = '';
                                    if(($.parseJSON(resData.body).records[0][className1]).length > 35){
                                        username = ($.parseJSON(resData.body).records[0][className1]).substring(0, 35);
                                        iconloginHistory = '<a class="tooltips login-histroy-info'+event.getParam("redNumber")+'" style="float: right;"  id="LoginHistroy-'+orgId+','+userId+','+component.get("v.UserNameForLH")+','+$.parseJSON(resData.body).records[0][className1]+'" ><span><svg fill="#0070d2" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg> </span><span class="tooltip-span">Login history.</span></a>';
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span style="float:left">'+username+'...</span>';
                                        var userCmpAppendhtml = document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = userCmpAppendhtml+''+iconloginHistory;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].title = $.parseJSON(resData.body).records[0][className1];
                                        
                                    }else{
                                        iconloginHistory = '<a class="tooltips login-histroy-info'+event.getParam("redNumber")+'" style="float: right;"  id="LoginHistroy-'+orgId+','+userId+','+component.get("v.UserNameForLH")+','+$.parseJSON(resData.body).records[0][className1]+'" ><span><svg fill="#0070d2" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg></span><span class="tooltip-span">Login history.</span></a>';
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span style="float:left">'+$.parseJSON(resData.body).records[0][className1]+'</span>';
                                        var userCmpAppendhtmlEls = document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = userCmpAppendhtmlEls+''+iconloginHistory;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].title = $.parseJSON(resData.body).records[0][className1];
                                        
                                    }
                                }else if(className1 === 'LastLoginDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else if(className1 === 'LastPasswordChangeDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else if(className1 === 'CreatedDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else{
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = $.parseJSON(resData.body).records[0][className1];
                                }
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'object'){
                                if($.parseJSON(resData.body).records[0][className1].Name !== null && $.parseJSON(resData.body).records[0][className1].Name !== undefined){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = $.parseJSON(resData.body).records[0][className1].Name;
                                }
                                if($.parseJSON(resData.body).records[0][className1].Name !== undefined && $.parseJSON(resData.body).records[0][className1].Name === null || $.parseJSON(resData.body).records[0][className1].Name === ''){
                                    $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] .data-field')),function(dataFldk,dataFldv){
                                        $(this).text('N/A');
                                    });
                                }
                                if(className1 === 'Profile'){
                                    $(document.getElementsByClassName('userCmpAppend_'+event.getParam("redNumber"))[0].querySelectorAll('.UserLicense td')).text($.parseJSON(resData.body).records[0][className1].UserLicense.Name);
                                }
                            }
                            
                        });
                    }
                    
                    if(event.getParam("flag") !== undefined && event.getParam("flag")){
                        var iconshpAfterEdit = 'iconShap'+event.getParam("uniqueNumber");
                        var iconShapNameAfterEdit = "";
                        iconShapNameAfterEdit = getInnerText(document.getElementById('userModule').querySelectorAll('#'+iconshpAfterEdit)[0]);
                        $(document.getElementsByClassName("userBtn"+event.getParam("uniqueNumber"))).removeClass('editCloneBtn');
                        $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr')),function(idx){
                            var className = $(this).attr('class').split(' ');
                            var className1 = '';
                            className1 = className[0];
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'boolean'){
                                if($.parseJSON(resData.body).records[0][className1]){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span class="approval icon_'+iconShapNameAfterEdit+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+iconShapNameAfterEdit+'.png" alt="true'+iconShapNameAfterEdit+'" /></span>';
                                }else{
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span class="reject icon_'+iconShapNameAfterEdit+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/false'+iconShapNameAfterEdit+'.png" alt="true'+iconShapNameAfterEdit+'" /></span>';  
                                }
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'undefined' || $.type($.parseJSON(resData.body).records[0][className1]) === undefined){
                                $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] .data-field')),function(dataFldk,dataFldv){
                                    $(this).text('N/A');
                                }); 
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'null' || $.type($.parseJSON(resData.body).records[0][className1]) === null){
                                document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '&nbsp;'; 
                                if(className1 === 'UserRole'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = 'None';   
                                }
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'string' ){
                                if(className1 === 'Username'){
                                    var username = '';
                                    if(($.parseJSON(resData.body).records[0][className1]).length > 35){
                                        username = ($.parseJSON(resData.body).records[0][className1]).substring(0, 35);
                                        iconloginHistory = '<a class="tooltips login-histroy-info'+event.getParam("uniqueNumber")+'" style="float: right;"  id="LoginHistroy-'+orgId+','+userId+','+component.get("v.UserNameForLH")+','+$.parseJSON(resData.body).records[0][className1]+'" ><span><svg fill="#0070d2" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg></span> <span class="tooltip-span">Login history.</span></a>';
                                        
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span style="float:left">'+username+'...</span>';
                                        var userCmp = document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = userCmp+''+iconloginHistory;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].title = $.parseJSON(resData.body).records[0][className1];
                                    }else{
                                        iconloginHistory = '<a class="tooltips login-histroy-info'+event.getParam("uniqueNumber")+'" style="float: right;"  id="LoginHistroy-'+orgId+','+userId+','+component.get("v.UserNameForLH")+','+$.parseJSON(resData.body).records[0][className1]+'" ><span><svg fill="#0070d2" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg></span><span class="tooltip-span">Login history.</span></a>';
                                        
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = '<span style="float:left">'+$.parseJSON(resData.body).records[0][className1]+'</span>';
                                        var userCmpEls = document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = userCmpEls+''+iconloginHistory;
                                        document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].title = $.parseJSON(resData.body).records[0][className1];
                                    }
                                    
                                    
                                }else if(className1 === 'LastLoginDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else if(className1 === 'LastPasswordChangeDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else if(className1 === 'CreatedDate'){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = getDateCoversion($.parseJSON(resData.body).records[0][className1]);
                                }else{
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = $.parseJSON(resData.body).records[0][className1];
                                }    
                            }
                            if($.type($.parseJSON(resData.body).records[0][className1]) === 'object'){
                                if($.parseJSON(resData.body).records[0][className1].Name !== null && $.parseJSON(resData.body).records[0][className1].Name !== undefined){
                                    document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] td')[0].innerHTML = $.parseJSON(resData.body).records[0][className1].Name;
                                }if($.parseJSON(resData.body).records[0][className1].Name !== undefined && $.parseJSON(resData.body).records[0][className1].Name === null || $.parseJSON(resData.body).records[0][className1].Name === ''){
                                    $.each($(document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('table tr[class="'+$(this).attr('class')+'"] .data-field')),function(dataFldk,dataFldv){
                                        $(this).text('N/A');
                                    });                                    
                                }
                                if(className1 === 'Profile'){
                                    $(document.getElementsByClassName('userCmpAppend_'+event.getParam("uniqueNumber"))[0].querySelectorAll('.UserLicense td')).text($.parseJSON(resData.body).records[0][className1].UserLicense.Name);
                                }   
                            }
                        });
                    }
                    component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':false}).fire();
                    if(document.getElementById("showOnlyUserDiff").checked){
                        component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':true}).fire();  
                    }
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                    component.getEvent("rowHeightEvent").setParams({"compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"moduleName" : 'user'}).fire();
                }else if(resData.status === 'FAIL'){
                    $(document.getElementsByClassName('tags_'+event.getParam("redNumber"))).val('');
                    $(document.getElementById('comp'+event.getParam("redNumber")).querySelectorAll('.borderBottom .progress')).remove();
                    component.getEvent("handleError").setParams({"responseObj":resData}).fire();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                }
                if(permissionSet.status !== undefined && permissionSet.status === 'SUCCESS'){
                    permissionSet = JSON.parse(permissionSet.body);
                    var permissionSetList = [];
                    component.set("v.permissionSetList", permissionSetList);
                    if(permissionSet.records !== ''){
                        if($(document.getElementById('userModule').querySelectorAll('.data-table-'+component.get("v.userCommonId")+'Permission_Sets tr td')).hasClass(component.get("v.userCommonId")+'Permission_Sets-'+randomNo+'-fill')){
                            document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'Permission_Sets-'+randomNo+'-fill').innerHTML = '&nbsp;';
                        }
                        $.each(permissionSet.records, function(ind, objObj) {
                            permissionSetList.push(''+objObj.PermissionSet.Id);
                            var permissionSetLabel = $.trim(objObj.PermissionSet.Label);    
                            var permissionSetCls = permissionSetLabel.replace(/([~!@#$%^&*()+=`{}\[\]\|\\:;<>,.\/? ])+/g, '-');
                            if(!$(document.getElementById('userModule').querySelectorAll('#table-'+component.get("v.userCommonId")+'Permission_Sets tr')).hasClass(component.get("v.userCommonId")+'permission-set-'+objObj.PermissionSet.Id)){
                                $(document.getElementById('userModule').querySelectorAll('#table-'+component.get("v.userCommonId")+'Permission_Sets')).append('<tr class="'+component.get("v.userCommonId")+'permission-set-'+objObj.PermissionSet.Id+' user-field-row toggle-'+component.get("v.userCommonId")+'Permission_Sets user-search-'+objObj.PermissionSet.Id+' setting-'+objObj.PermissionSet.Id+' '+permissionSetCls+' datarow" id="adminifiedAdminifiedUserModule-'+objObj.PermissionSet.Id+'"><td class="slds-text-align--right"> '+objObj.PermissionSet.Label+'</td></tr>'); 
                            }
                            $.each($(document.getElementById('userModule').querySelectorAll('.data-table-'+component.get("v.userCommonId")+'Permission_Sets')), function(index, elementObj){  
                                var rNo = $(elementObj).attr('id');
                                if(!$(document.getElementById('userModule').querySelectorAll('#'+rNo+' tr')).hasClass(''+component.get("v.userCommonId")+'permission-set-'+objObj.PermissionSet.Id)){
                                    $(document.getElementById('userModule').querySelectorAll('#'+rNo)).append('<tr class="'+component.get("v.userCommonId")+'permission-set-'+objObj.PermissionSet.Id+' user-field-row datarow user-search-'+objObj.PermissionSet.Id+' setting-'+objObj.PermissionSet.Id+' '+permissionSetCls+'" id="'+objObj.PermissionSet.Id+'"><td class="'+rNo+'-'+objObj.PermissionSet.Id+' '+rNo+'-fill">&nbsp;</td></tr>');
                                }
                            });
                        });
                        $.each(permissionSet.records, function(ind, objObj) {
                            $.each($(document.getElementById('userModule').querySelectorAll('.'+component.get("v.userCommonId")+'Permission_Sets-'+randomNo+'-'+objObj.PermissionSet.Id)),function(){
                                $(this).html('<span class="approval icon_'+iconShapName+'"><img src="/resource/stivadmn__SLDS0120/assets/icons/SingleColor/true'+iconShapName+'.png" alt="true'+iconShapName+'" /></span>');
                            });
                        });
                        component.set("v.permissionSetList", permissionSetList);
                    }
                    component.getEvent("getPermissionSetList").setParams({}).fire();
                    component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                    component.getEvent("rowHeightEvent").setParams({"compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"moduleName" : 'user'}).fire();
                    component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':false}).fire();
                    if(document.getElementById("showOnlyUserDiff").checked){
                        component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':true}).fire();  
                    }
                }
                $(document.getElementById('comp'+component.get("v.randomNumber")).querySelectorAll('.userBorderBottom .progress')).remove();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }else if (state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if (errors[0] && errors[0].message){
                        component.getEvent("handleError").setParams({"errors":errors[0].message}).fire();
                    }
                }else{
                    component.getEvent("handleError").setParams({"errors":'Unknow error'}).fire();
                }
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
                $('#comp'+event.getParam("redNumber")).find('.borderBottom').find('.progress').remove();
                document.getElementById('#comp'+event.getParam("redNumber")).querySelectorAll('.borderBottom .progress')[0].remove();
            }else if (state === "ABORTED") {
                $('#comp'+event.getParam("redNumber")).find('.borderBottom').find('.progress').remove();
                component.getEvent("handleError").setParams({"errors":'Process Aborted'}).fire();
                component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
            }
            component.getEvent("DisabledSreenButtonEvent").setParams({"isDisabled": false, "tabName" : 'userModule'}).fire();
        });
        $A.enqueueAction(action);
    },
    
    inputKeyup : function(component, event, helper) {
        $(document.getElementsByClassName('comp-div'+component.get("v.randomNumber"))).removeClass('adminifiedUserInfo1');
        $(document.getElementsByClassName("userBtn"+component.get("v.randomNumber"))).addClass('editCloneBtn'); 
        $.each($(document.getElementsByClassName('userCmpAppend_'+component.get("v.randomNumber"))[0].querySelectorAll('.data-field')),function(dataFldk,dataFldv){
            $(this).html('&nbsp;');
        });
        $(document.getElementsByClassName(component.get("v.userCommonId")+'Permission_Sets-'+component.get("v.randomNumber")+'-fill')).html('&nbsp;');
        component.set("v.permissionSetList", []);
        component.getEvent("getPermissionSetList").setParams({}).fire();
        if(component.get("v.instanceData") !== '')
            component.getEvent("ResetInstanceDataList").setParams({"instanceData":component.get("v.instanceData")}).fire();
        component.set("v.instanceData", '');
        component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':false}).fire();
        if(document.getElementById("showOnlyUserDiff").checked){
            component.getEvent("differenceRow").setParams({"showHideId":"showHide","compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"currentComparableModule" : 'adminifiedUserInfo1', "tabName" : 'user','showDifference':true}).fire();  
        }component.getEvent("rowHeightEvent").setParams({"compDivId" : 'appendDiv',"mainModule" : 'adminifiedAdminifiedUserModule',"moduleName" : 'user'}).fire();
    }
})