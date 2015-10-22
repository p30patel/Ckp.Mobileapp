// This is your Telerik Backend Services API key.
var baasApiKey = 'uTM7cVvTTvlfDZsu';

// This is the scheme (http or https) to use for accessing Telerik Backend Services.
var baasScheme = 'https';

//This is your Android project number. It is required by Google in order to enable push notifications for your app. You do not need it for iPhone.
var androidProjectNumber = '1018275522168';

//Set this to true in order to test push notifications in the emulator. Note, that you will not be able to actually receive 
//push notifications because we will generate fake push tokens. But you will be able to test your other push-related functionality without getting errors.
var emulatorMode = true;

var telerikAnaltyicsProdcutId = "70d4845295c541ff8e423ed4c3953b94"; // App unique product key
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



(function (g) {
   
    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = g.analytics = g.analytics || {};
    analytics.Start = function () {
        // Handy shortcuts to the analytics api
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        // Create the monitor instance using the unique product key for CKP.Mobile.App-Analytics
        var settings = factory.CreateSettings(telerikAnaltyicsProdcutId);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
          function () {
              console.log("Monitor created");
              // Start the monitor inside the success-callback
              monitor.Start(function () {
                  console.log("Monitor started");
                  monitor.TrackFeature("Menu-HandBar");
              });
          },
          function (msg) {
              console.log("Error creating monitor: " + msg);
          });
    }
    analytics.Stop = function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    }
    analytics.Monitor = function () {
        return window.plugins.EqatecAnalytics.Monitor;
    }
})(window);

function onDeviceReady() {

    feedback.initialize('7c882340-3274-11e5-a28d-c9df925f448c'); // Replace with your API key
    window.analytics.Start();
    

}





