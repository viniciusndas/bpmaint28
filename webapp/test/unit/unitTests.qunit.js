/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"bpmaint28/bpmaint28/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});