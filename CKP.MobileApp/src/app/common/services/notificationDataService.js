
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
                     
                        var orgContext = '';
                        if (!organizationDetail)
                        {
                                deferred.reject('Error while getting data');
                        }
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/GetUserNotificationSettings', organizationDetail).success(function (result) {
                           
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
                      
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/UpdateNotification', notifcationData).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    var getInboxMessages = function (jsonIn) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;

                        var organizationDetail = localStorageService.get('organizationDetail');

                        var orgContext = '';
                        if (!organizationDetail) {
                            deferred.reject('Error while getting data');
                        }
                       
                        jsonIn.UserId = organizationDetail.UserId;                       

                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/GetMessagesForInboxByUserId', jsonIn).success(function (result) {

                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });

                        if (typeof (window.navigator.simulator) === 'undefined') {
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.getInbox");
                            if (organizationDetail.UserName) {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                            }
                        }

                        return deferred.promise;
                    };

                    var updateInboxMessage = function (notifcationData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/UpdatePushNotificationMessageQueue', notifcationData).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });

                        var status = notifcationData.Status == 104 ? "MarkAsRead" : "MarkAsDelete";
                     
                        if (typeof (window.navigator.simulator) === 'undefined') {
                           
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.UpdateInbox");
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.UpdateInbox.Status." + status);
                            if (organizationDetail.UserName) {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.UpdateInbox.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                            }
                        }
                        return deferred.promise;
                    };

                    var getUnReadMessageCount = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;

                        var organizationDetail = localStorageService.get('organizationDetail');

                        var orgContext = '';
                        var userId = 0;
                        if (!organizationDetail) {
                            deferred.reject('Error while getting data');
                        }

                        userId = organizationDetail.UserId;
                        
                        $http.get(authServiceBase + 'webapi/api/mobile/Notification/GetInboxUnReadMessageCount?userId='  + userId).success(function (result) {

                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });

                        if (typeof (window.navigator.simulator) === 'undefined') {
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.GetUnReadInboxMessageCount");
                            if (organizationDetail.UserName) {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                            }
                        }

                        return deferred.promise;
                    };

                    notificationDataServiceFactory.updateNotification = updateNotification;

                    notificationDataServiceFactory.getUserNotifications = getUserNotifications;

                    notificationDataServiceFactory.updateInboxMessage = updateInboxMessage;

                    notificationDataServiceFactory.getInboxMessages = getInboxMessages;

                    notificationDataServiceFactory.getUnReadMessageCount = getUnReadMessageCount;
               
                    return notificationDataServiceFactory;
                }
            ]);