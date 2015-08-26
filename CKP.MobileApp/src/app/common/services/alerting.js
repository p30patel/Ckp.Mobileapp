(function (module) {

    var alerting = function ($timeout) {

        var currentAlerts = [];
        var alertTypes = ["success", "info", "warning", "danger"];

        var addWarning = function (message, timeout) {
            addAlert("warning", message, timeout);
        };

        var addDanger = function (message, timeout) {
            addAlert("danger", message, timeout);
        };

        var addInfo = function (message, timeout) {
            addAlert("info", message, timeout);
        };

        var addSuccess = function (message, timeout) {
            addAlert("success", message, timeout);
        };

        var addAlert = function (type, message, timeout) {
            var alert = { type: type, message: message, timeout: timeout };
            currentAlerts.push(alert);
            if (timeout > 0) {
                $timeout(function () {
                    removeAlert(alert);
                }, timeout);
            }
        };

        var removeAlert = function (alert) {
            for (var i = 0; i < currentAlerts.length; i++) {
                if (currentAlerts[i] === alert) {
                    currentAlerts.splice(i, 1);
                    break;
                }
            }
        };

        var errorHandler = function (description) {
            return function () {
                addDanger(description);
            };
        };

        return {
            addWarning: addWarning,
            addDanger: addDanger,
            addInfo: addInfo,
            addSuccess: addSuccess,
            addAlert: addAlert,
            removeAlert: removeAlert,
            errorHandler: errorHandler,
            currentAlerts: currentAlerts,
            alertTypes: alertTypes
        };
    };

    module.factory("alerting", alerting);

}(angular.module("app")))