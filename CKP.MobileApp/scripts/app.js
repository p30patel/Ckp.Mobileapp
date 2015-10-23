// This is your Telerik Backend Services API key.
var baasApiKey = 'uTM7cVvTTvlfDZsu'; // telerik push api key
var baasScheme = 'https';
var androidProjectNumber = '1018275522168'; // google push tocken
var emulatorMode = true;

var telerikAnaltyicsProdcutId = "70d4845295c541ff8e423ed4c3953b94"; // analtyics project key


var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';

var app = angular.module('app', ['kendo.directives', 'LocalStorageModule', 'angular.filter', 'ngTouch']);

app.constant('ngAuthSettings', {
    authServiceBaseUri: authServiceBase,
    clientId: clientId,
    baasApiKey: baasApiKey,
    baasScheme: baasScheme,
    androidProjectNumber: androidProjectNumber,
    emulatorMode: emulatorMode
});

app.run(['authService', 'localStorageService', function (authService, localStorageService) {

    //authService.fillAuthData();
    localStorageService.remove('authorizationData');
    var getDeviceInfo = function () {

        var baasApiKey = ngAuthSettings.baasApiKey;

        var baasScheme = ngAuthSettings.baasScheme;

        var androidProjectNumber = ngAuthSettings.androidProjectNumber;

        var emulatorMode = true;
        var el = new Everlive({
            apiKey: baasApiKey,
            scheme: baasScheme
        });


        var pushSettings = {
            android: {
                senderID: androidProjectNumber
            },
            iOS: {
                badge: "true",
                sound: "true",
                alert: "true"
            },
            wp8: {
                channelName: 'EverlivePushChannel'
            },
            customParameters: {

            }
        };
        el.push.register(pushSettings)
           .then(
               function (data) {

                   el.push.getRegistration().then(function (result) {
                       localStorageService.set('deviceData', result);
                       var deviceData = localStorageService.get('deviceData');
                       // alert('Registed Device : ' + deviceData.result.Id + '\nuuId =' + deviceData.result.Id + '\n  model =' +  deviceData.result.HardwareModel + '\n    platform =' + deviceData.result.PlatformType  + '\n version = ' +deviceData.result.PlatformVersion  + '\n  active =' +  deviceData.result.Active  );

                   },
                   function (e) {
                       //error register
                   });
               },
               function (err) {
                   //  alert('REGISTER ERROR: ' + JSON.stringify(err));
               }
               );
    };

    document.addEventListener('deviceready', function () {
        kendo.mobile.application.navigate("src/app/login/login.html");
        window.analytics.Start();

        if (typeof window.navigator.simulator === 'undefined') {
            getDeviceInfo();
        }
        
    });

   
    
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
                  monitor.TrackFeature("track-menu-handBarClick");
                  monitor.TrackFeature("track-login-btnClick");
                  monitor.TrackFeature("track-login-view");
                  monitor.TrackFeature("track-home-view");
                  monitor.TrackFeature("track-notification-view");
                  monitor.TrackFeature("track-policy-view");
                  monitor.TrackFeature("track-terms-view");
                  monitor.TrackFeature("track-feedback-view");
                  monitor.TrackFeature("track-faq-view");
                  monitor.TrackFeature("track-contactus-view");
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





