var baasScheme = 'https';
var androidProjectNumber = '1018275522168'; // google push token
var emulatorMode = true;
//QA
var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';
var baasApiKey = 'uTM7cVvTTvlfDZsu'; // telerik push api key

//Production
//var authServiceBase = 'https://checknet.checkpt.com/';
//var clientId = 'Ckp.Mobile';
//var baasApiKey = '3exw5fdm4p9qp0sj'; // telerik push api key


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

var emulatorMode = true;
var el = new Everlive({
    apiKey: baasApiKey,
    scheme: baasScheme
});
app.run(['authService', 'localStorageService', '$rootScope', function (authService, localStorageService, $rootScope) {

    localStorageService.remove('authorizationData');

    var getDeviceInfo = function () {
        var onAndroidPushReceived = function (args) {
            var message = JSON.stringify(args);
       
        };

        var onIosPushReceived = function (args) {
            var message = JSON.stringify(args);
         
            
        };

        var onWP8PushReceived = function (args) {
            var message = JSON.stringify(args);
          
        };


        var pushSettings = {
            android: {
                senderID: androidProjectNumber
            },
            iOS: {
                badge: "true",
                sound: "true",
                alert: "true",
                clearBadge: false,
                interactiveSettings: {
                    actions: [{
                        identifier: 'READ_IDENTIFIER',
                        title: 'Read',
                        activationMode: window.plugins.pushNotification.UserNotificationActivationMode.Foreground,
                        destructive: false,
                        authenticationRequired: true
                    }, {
                        identifier: 'CANCEL_IDENTIFIER',
                        title: 'Cancel',
                        activationMode: window.plugins.pushNotification.UserNotificationActivationMode.Foreground,
                        destructive: false,
                        authenticationRequired: true
                    }],
                    categories: [{
                        identifier: 'READ_CATEGORY',
                        actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
                        actionsForMinimalContext: ['READ_IDENTIFIER']
                    }]
                },
            },
            wp8: {
                channelName: 'EverlivePushChannel'
            },
            notificationCallbackAndroid: onAndroidPushReceived,
            notificationCallbackIOS: onIosPushReceived,
            notificationCallbackWP8: onWP8PushReceived,
            customParameters: {
                Age: 21
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

        var userProfileData = localStorageService.get('user-profile');

        var userProfile = {
            SearchType: 'OrderNumber',
            SelectedPara: '1',
            HasReadNote: true,
            IsFirtTime: true,
            HasTrunOnNotifcation: false,
            HasForceClearAll: false,
            HasClearBadgeCount : false
        };

        if (!userProfileData) {
            localStorageService.set('user-profile', userProfile);
            //console.log(userProfile);
            //var userProfileData = localStorageService.get('user-profile');
            //console.log(userProfileData.HasTrunOnNotifcation);
        }


        StatusBar.overlaysWebView(false);//Turns off web view overlay.
        StatusBar.backgroundColorByName('black');
        $rootScope.hasSearchOrApporval = false;
        $rootScope.hasPreviousSearch = false;
        $rootScope.hasBackButton = false;
        $rootScope.hasBackButtonList = false;
        localStorageService.remove('orderCounts');
        $rootScope.timeStampOrderCount = new Date().getTime();

        var networkState = navigator.connection.type;
        var isOffline = networkState === Connection.UNKNOWN || networkState === Connection.NONE;

        var startAnalyticsAndDeviceInfo = function () {
            var hasSimlulatorMode = false;
            if (window.navigator.simulator === true) {
                hasSimlulatorMode = true;
            } else if (cordova.getAppVersion === undefined) {
                hasSimlulatorMode = true;
            } else {
                hasSimlulatorMode = false;
            }
            if (!hasSimlulatorMode) {
                if (isOffline) {
                    onOffline();
                }
             
                getDeviceInfo();

                window.plugins.EqatecAnalytics.Monitor.Start();

                kendo.mobile.application.navigate("src/app/login/login.html");
                navigator.splashscreen.hide(); //Hides the splash screen for your app.
                cordova.getAppVersion(function (version) {
                    $(".version").text('Version ' + version);
                });

            }
            else {
                kendo.mobile.application.navigate("src/app/login/login.html");
                navigator.splashscreen.hide(); //Hides the splash screen for your app.
                $(".version").text('Version 0.0');
            }
        }
        startAnalyticsAndDeviceInfo();

    }, false);

    document.addEventListener("pause", function () {
               
        window.plugins.EqatecAnalytics.Monitor.Stop();
        window.plugins.EqatecAnalytics.Monitor.ForceSync();
      
    });
    document.addEventListener("resume", function () {
      
        window.plugins.EqatecAnalytics.Monitor.Start();
     
    });
 

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


    function backButtonEvent() {
        document.addEventListener("backbutton", function (e) {

            var hasLoginPage = false;
            var hasModalOpen = false;
            if (typeof kendo.mobile.application !== 'undefined') {
                var view = kendo.mobile.application.view();


                if (view !== null) {
                    hasModalOpen = $(".km-modalview:visible").length > 0 ? true : false;
                    hasLoginPage = kendo.mobile.application.view().id == 'src/app/login/login.html';
                   
                }
            }

            if (hasLoginPage && !hasModalOpen) {
                e.preventDefault();
                //navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
                window.plugins.EqatecAnalytics.Monitor.Stop();
                window.plugins.EqatecAnalytics.Monitor.ForceSync();
                navigator.app.exitApp();
            }
            else {
                if (hasModalOpen) {
                    $(".km-modalview:visible").kendoMobileModalView("close");
                    return false;
                }
                else {
                    navigator.app.backHistory();
                }
            }
        }, false);

        function onConfirm(buttonIndex) {
            if (buttonIndex == 1) {
                navigator.app.exitApp();
                return true;
            }
            else {
                return false;
            }
        }
    }
    backButtonEvent();

    $(document).on('click', '.showAlertLink', function () {
        var url = $('#surveyUrl').val();
        window.open(url, '_blank', 'location=yes');
    });

}]);

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
});

