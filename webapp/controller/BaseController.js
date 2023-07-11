sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, mobileLibrary, History) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("bpmaint28.bpmaint28.controller.BaseController", {
        /**
         * Convenience method for accessing the router.
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component
         */
        getRouter : function () {
            return UIComponent.getRouterFor(this);
        },

        /**
         * Convenience method for getting the view model by name.
         * @public
         * @param {string} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance
         */
        getModel : function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Convenience method for setting the view model.
         * @public
         * @param {sap.ui.model.Model} oModel the model instance
         * @param {string} sName the model name
         * @returns {sap.ui.mvc.View} the view instance
         */
        setModel : function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        /**
         * Getter for the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         */
        getResourceBundle : function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        /**
         * Event handler when the share by E-Mail button has been clicked
         * @public
         */
        onShareEmailPress : function () {
            var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
            URLHelper.triggerEmail(
                null,
                oViewModel.getProperty("/shareSendEmailSubject"),
                oViewModel.getProperty("/shareSendEmailMessage")
            );
        },

        getText: function (sTextId, aArgs) { 
            var oView = this.getView(); 
            var oModel = oView.getModel("i18n");
            if (!oModel) { 
                oModel = sap.ui.model.resource.ResourceModel({ bundleName: "bpmaint28.bpmaint28.i18n.i18n" }); 
                oView.setModel(oModel, "i18n"); 
            }
            return oModel.getResourceBundle().getText(sTextId, aArgs); 
        },

        formatPartnerType: function(sPartnerType) {
            switch(sPartnerType) {
            case "1":
            return this.getText("txtOrganization");
            case "2":
            return this.getText("txtPerson");
            default:
            return "";
            }
        },

        _onNavBack: function (sPath) {
            var sPreviousHash = History.getInstance().getPreviousHash(),
                sHistory = sPath;
            // sHistory = Utils.returnNow(sPath);
            if (sPreviousHash === sHistory) {
                window.history.go(-1);
            } else {
                if (!sHistory) {
                    sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist", true);
                } else {
                    sap.ui.core.UIComponent.getRouterFor(this).navTo(sHistory, true);
                }
                
            }
        },
            
            
    });

});