
'use strict';

app.factory("notificationDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var notificationDataServiceFactory = {};

                    var getUserNotifications = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                       
                        var organizationDetail = localStorageService.get('organizationDetail');
                        var userId = organizationDetail.UserId;
                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetUserNotifications?userId=' + userId).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };


                    var updateNotification = function (notifcationData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var organizationDetail = localStorageService.get('organizationDetail');
                        var userId = organizationDetail.UserId;
                        notifcationData.UserId = userId;
                        console.log(notifcationData);
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/UpdateNotification', notifcationData).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    notificationDataServiceFactory.updateNotification = updateNotification;

                    notificationDataServiceFactory.getUserNotifications = getUserNotifications;
               
                    return notificationDataServiceFactory;
                }
            ]);