<aura:application extends="force:slds" controller="SampleAuraController" implements="flexipage:availableForAllPageTypes,force:appHostable">
	 <!--Declare Attributes-->
    <aura:attribute name="data" type="Object"/>
    <aura:attribute name="columns" type="List"/>
    <aura:attribute name="selectedRowsCount" type="Integer" default="0"/>
    <aura:attribute name="selectedRowsDetails" type="Object" />
    <aura:attribute name="selectedRowsList" type="List" />
    <aura:attribute name="maxRowSelection" type="Integer" default="10"/>
    <aura:attribute name="selectedRows" type="List" />
    <aura:attribute name="enableInfiniteLoading" type="Boolean" default="true"/>
    <aura:attribute name="initialRows" type="Integer" default="10"/>
    <aura:attribute name="rowsToLoad" type="Integer" default="10"/>
    <aura:attribute name="totalNumberOfRows" type="Integer" default="10"/>
    <aura:attribute name="loadMoreStatus" type="String" default="Please scroll down to load more data"/>
    <aura:attribute name="showRowNumberColumn" type="Boolean" default="false"/>
    <aura:attribute name="rowNumberOffset" type="Integer" default="0"/>
    <aura:attribute name="rowsToAdd" type="Integer" default="10"/>
    <aura:attribute name="currentCount" type="Integer" default="10"/>
    <aura:attribute name="sortedBy" type="String"/>
    <aura:attribute name="sortedDirection" type="String"/>
    <aura:attribute name="defaultSortDirection" type="String"/>
     
    <!--Declare Handlers-->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
     <!-- hello boss -->
    <!--Component Start-->
    <div class="slds-m-around_xx-large" style="height: 300px">
        <lightning:datatable columns="{!v.columns}"
                             data="{!v.data}"
                             keyField="Id"
                             showRowNumberColumn="true"
                             rowNumberOffset="0"
                             onrowaction="{!c.handleRowAction}"
                             selectedRows="{!v.selectedRows}"
                             maxRowSelection="{!v.maxRowSelection}"
                             onrowselection="{!c.handleSelectedRow}"
                             enableInfiniteLoading="true"
                             loadMoreOffset="{!v.loadMoreOffset}"
                             sortedBy="{!v.sortedBy}"
                             sortedDirection="{!v.sortedDirection}"
                             defaultSortDirection="{!v.defaultSortDirection }"
                             onsort="{!c.handleColumnSorting}"
                             onloadmore="{!c.handleLoadMoreContacts}"/>
        <br/>
        <div class="slds-float_left">
            <strong>Total Rows : {!v.totalNumberOfRows}</strong>
            &nbsp;&nbsp;
            <strong>Selected Rows: {!v.selectedRowsCount }</strong>
        </div>
        <div class="slds-float_right">
            <strong>{!v.loadMoreStatus}</strong>
        </div>
        <br/>
        <br/>
        <div class="slds-float_left">
            <lightning:button label="Get Selected Contacts"  variant="brand" onclick="{!c.handleSelectedRows}"/>    
        </div>
    </div>
    <!--Component End-->
</aura:application>