

var baasScheme = 'https';
var androidProjectNumber = '1018275522168'; // google push token
var emulatorMode = true;
//QA
var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';
var baasApiKey = 'uTM7cVvTTvlfDZsu'; // telerik push api key

//PEODUCTION
//var authServiceBase = 'https://checknet.checkpt.com/';
//var clientId = 'Ckp.Mobile';
//var baasApiKey = '3exw5fdm4p9qp0sj'; // telerik push api key

//angular.element(document).ready(function () {
//    if (window.cordova) {
//        document.addEventListener('deviceready', function () {
//            angular.bootstrap(document.body, ['app']);
//        }, false);
//    } else {
//        angular.bootstrap(document.body, ['app']);
//    }
//});


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


app.run(['authService', 'localStorageService', '$rootScope', function (authService, localStorageService, $rootScope) {
  
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

    document.addEventListener('deviceready', function () {

        navigator.splashscreen.hide(); //Hides the splash screen for your app.
        //StatusBar.overlaysWebView(false); //Turns off web view overlay.
        StatusBar.styleDefault();
        $rootScope.hasSearchOrApporval = false;
        $rootScope.hasPreviousSearch = false;
        $rootScope.hasBackButton = false;
        $rootScope.hasBackButtonList = false;
        localStorageService.remove('orderCounts');
        $rootScope.timeStampOrderCount = new Date().getTime();

        var networkState = navigator.connection.type;
        var isOffline = networkState === Connection.UNKNOWN || networkState === Connection.NONE;
        
        if (typeof (window.navigator.simulator) === 'undefined') {
            if (isOffline) {
                onOffline();
            }
            window.plugins.EqatecAnalytics.Monitor.Start();
            getDeviceInfo();
        }
          kendo.mobile.application.navigate("src/app/login/login.html");

    }, false);

    document.addEventListener("offline", onOffline, false);
   
    function onOffline() {
        if (typeof kendo.mobile.application !== 'undefined') {
            kendo.mobile.application.navigate("src/app/error/error.html");
        }
        else {
            window.location = "src/app/error/error.html";
        }
    }
    document.addEventListener("online", onOnline, false);

    function onOnline() {
       
        if (typeof kendo.mobile.application !== 'undefined') {
            kendo.mobile.application.navigate("src/app/login/login.html");
        }
    }

   
}]);

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
});

