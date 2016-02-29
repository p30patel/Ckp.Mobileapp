// This is your Telerik Backend Services API key.
var baasApiKey = 'uTM7cVvTTvlfDZsu'; // telerik push api key
var baasScheme = 'https';
var androidProjectNumber = '1018275522168'; // google push token
var emulatorMode = true;

var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';


angular.element(document).ready(function () {
    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            angular.bootstrap(document.body, ['app']);
        }, false);
    } else {
        angular.bootstrap(document.body, ['app']);
    }
});


var app = angular.module('app', ['kendo.directives', 'LocalStorageModule', 'angular.filter', 'ngTouch']);


app.constant('ngAuthSettings', {
    authServiceBaseUri: authServiceBase,
    clientId: clientId,
    baasApiKey: baasApiKey,
    baasScheme: baasScheme,
    androidProjectNumber: androidProjectNumber,
    emulatorMode: emulatorMode
});

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
});


app.run(['authService', 'localStorageService', '$rootScope', 'alerting', function (authService, localStorageService, $rootScope, alerting) {
  
    localStorageService.remove('authorizationData');
    var getDeviceInfo = function () {


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
                   },
                   function (e) {

                   });
               },
               function (err) {
               }
               );
    };

    navigator.splashscreen.hide(); //Hides the splash screen for your app.
    StatusBar.overlaysWebView(false); //Turns off web view overlay.

    $rootScope.hasSearchOrApporval = false;
    $rootScope.hasPreviousSearch = false;
    $rootScope.hasBackButton = false;
    $rootScope.hasBackButtonList = false;   
    localStorageService.remove('orderCounts');
    $rootScope.timeStampOrderCount = new Date().getTime();
   
    if (typeof (window.navigator.simulator) === 'undefined') {
        window.plugins.EqatecAnalytics.Monitor.Start();
        getDeviceInfo();
    }


    document.addEventListener("offline", function () {
        alerting.addDanger("offline");
    });
    document.addEventListener("online", function () {
       
        alerting.removeAlert("offline");
    });
}]);

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
});

