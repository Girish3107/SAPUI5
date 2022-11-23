sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, formatter, Filter, FilterOperator,ODataModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
		onInit : function () {
			// var oViewModel = new JSONModel({
			// 	currency: "EUR"
			// });
            var oModel = new ODataModel("http://services.odata.org/Northwind/Northwind.svc/");
            var oModel = new ODataModel({serviceUrl: "http://services.odata.org/Northwind/Northwind.svc"});
			this.getView().setModel(oModel, "view");
		},

    onFilterInvoices : function (oEvent){
        //test 4
        //build filter array
        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if(sQuery){
            aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }

        //filter binding
        var oList = this.byId("invoiceList");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
    },

    // onPress: function (oEvent) {
    //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    //     
    //     oRouter.navTo("detail");
    // }
    onPress: function (oEvent) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
            invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
        });
    }
});
});