({
    doInit : function(component, event, helper) {
        helper.getTotalNumberOfContacts(component);
        helper.getColumnAndAction(component);
        helper.getContacts(component);
    },
     
    handleLoadMoreContacts: function (component, event, helper) {
        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Loading....');
        helper.getMoreContacts(component, component.get('v.rowsToLoad')).then($A.getCallback(function (data) {
            if (component.get('v.data').length == component.get('v.totalNumberOfRows')) {
                component.set('v.enableInfiniteLoading', false);
                component.set('v.loadMoreStatus', 'No more data to load');
            } else {
                var currentData = component.get('v.data');
                var newData = currentData.concat(data);
                component.set('v.data', newData);
                component.set('v.loadMoreStatus', 'Please scroll down to load more data');
            }
            event.getSource().set("v.isLoading", false);
        }));
    },
     
    handleSelectedRows: function (component, event, helper) {
        var data = component.get('v.data');
        var selectedRowList =  component.get("v.selectedRowsList");
        console.log('selectedRowList-' + selectedRowList);
    },
     
    handleSelectedRow: function(component, event, helper){
        var selectedRows = event.getParam('selectedRows');
        component.set("v.selectedRowsCount", selectedRows.length);
        let obj =[] ; 
        for (var i = 0; i < selectedRows.length; i++){
            obj.push({Name:selectedRows[i].Name});
        }
        component.set("v.selectedRowsDetails", JSON.stringify(obj) );
        component.set("v.selectedRowsList", event.getParam('selectedRows'));
    },
     
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        switch (action.name) {
            case 'new':
                helper.createContactRecord(component, event);
                break;
            case 'edit':
                helper.editContactRecord(component, event);
                break;
            case 'delete':
                helper.deleteContactRecord(component, event);
                break;
            case 'view':
                helper.viewContactRecord(component, event);
                break;
        }
    },
     
    handleColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },
})