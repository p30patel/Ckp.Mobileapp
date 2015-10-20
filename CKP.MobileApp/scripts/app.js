// This is your Telerik Backend Services API key.
var baasApiKey = 'uTM7cVvTTvlfDZsu';

// This is the scheme (http or https) to use for accessing Telerik Backend Services.
var baasScheme = 'https';

//This is your Android project number. It is required by Google in order to enable push notifications for your app. You do not need it for iPhone.
var androidProjectNumber = '1018275522168';

//Set this to true in order to test push notifications in the emulator. Note, that you will not be able to actually receive 
//push notifications because we will generate fake push tokens. But you will be able to test your other push-related functionality without getting errors.
var emulatorMode = true;

var telerikAnaltyicsProdcutId = "f453d7f3a0cd4551a4009b8768b91b1f"; // App unique product key
//Initialize the Telerik Backend Services SDK


var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';

var app = angular.module('app', ['kendo.directives', 'LocalStorageModule', 'angular.filter']);

app.constant('ngAuthSettings', {
    authServiceBaseUri: authServiceBase,
    clientId: clientId,
    baasApiKey: baasApiKey,
    baasScheme: baasScheme,
    androidProjectNumber: androidProjectNumber,
    emulatorMode: emulatorMode
});

app.run(['authService', function (authService) {
    authService.fillAuthData();

}]);

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
});

function onDeviceReady() {
    
    feedback.initialize('7c882340-3274-11e5-a28d-c9df925f448c'); // Replace with your API key
}

(function (g) {
    if (g._eqatecmonitor)
        return;
    try {
        // Create the monitor instance
        var settings = _eqatec.createSettings(telerikAnaltyicsProdcutId);
        settings.version = "1.2.3";
        var monitor = g._eqatecmonitor = _eqatec.createMonitor(settings);
        // Start the monitor when your application starts
        monitor.start();
    }
    catch (e) {
        console.log("Telerik Analytics exception: " + e.description);
    }
})(window);
window.monitor.Start();






