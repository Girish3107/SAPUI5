sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment"
], function(Controller, MessageToast,JSONModel,ResourceModel, Fragment) {
    'use strict';
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        
        onShowHello: function () {
            //Test3
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenDialog : function () {
            var oView = this.getView();

            //create the dialog lazily
            if(!this.byId("helloDialog")){
                //load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.HelloDialog",
                    controller: this
                }).then (function (oDialog){
                    // connect dialog to the root view of this component (model, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                })

            } else {
                this.byId("helloDialog").open();
            }
        },

        onCloseDialog : function () {
            this.byId("helloDialog").close();
        },

        onGetProducts: function(){
            debugger;
            var oModel = this.getView().getModel("invoice");
            oModel.read("/Products", {success: function(oData, oResponse){
                console.log("success Handler");
            }, error: function(oError){
                console.log("Error handler");
            }}); 
        }
    });
});