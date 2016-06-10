
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

                    var updateMessageStatusWithMarkAll = function (notifcationData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var organizationDetail = localStorageService.get('organizationDetail');
                        var userId = organizationDetail.UserId;
                        notifcationData.UserId = userId;

                        $http.post(authServiceBase + 'webapi/api/core/Notification/UpdateMessageStatusWithMarkAll', notifcationData).success(function (result) {
                            setBadgeCount(0, false);
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

                        if (notifcationData.Status == 104)
                        {
                            //update badge count
                            setBadgeCount(0, true);
                        }
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
                            //set count
                            setBadgeCount(result, false);
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

                    var setBadgeCount = function(count, hasMarkAsRead)
                    {
                        var hasClearBadgeCount = false;
                        var userProfileData = localStorageService.get('user-profile');
                        if (userProfileData) {
                            hasClearBadgeCount = userProfileData.HasClearBadgeCount;
                        }
                        $('#inboxMessageCount').hide();
                        //clear badge count then no to set
                        if (hasClearBadgeCount) {
                            if (!checkSimulator()) {
                                cordova.plugins.notification.badge.set(0);
                                el.push.clearBadgeNumber();
                            }
                        }
                        
                            if (hasMarkAsRead) {
                                var currentCount = $('#inboxMessageCount').html();
                                if (currentCount > 0) {
                                    console.log('currentCount' + currentCount);
                                    count = $('#inboxMessageCount').html() - 1;
                                }
                            }
                            if (!checkSimulator() && !hasClearBadgeCount) {
                                cordova.plugins.notification.badge.set(count);
                            }
                            if (count > 0) {
                                $('#inboxMessageCount').show();
                                $('#inboxMessageCount').html(count);
                            }
                            else {
                                $('#inboxMessageCount').hide();
                            }
                        
                        return true;
                    }

                    var updateClearBadgeCountStatus = function(status)
                    {
                      
                        var userProfileData = localStorageService.get('user-profile');
                        if (userProfileData) {
                            userProfileData.HasClearBadgeCount = status;
                            localStorageService.set('user-profile', userProfileData);
                           
                                getUnReadMessageCount();
                           
                            
                            var organizationDetail = localStorageService.get('organizationDetail');
                            if (typeof (window.navigator.simulator) === 'undefined') {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.UpdateClearBadgeCountStatus." + status);
                                if (organizationDetail.UserName) {
                                    window.plugins.EqatecAnalytics.Monitor.TrackFeature("Inbox.UpdateClearBadgeCountStatus.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                                }
                            }
                        }

                        return false;
                    }

                    var getClearBadgeCountStatus = function () {

                        var userProfileData = localStorageService.get('user-profile');
                        var hasClearBadgeCount = false;
                        if (userProfileData) {
                            hasClearBadgeCount = userProfileData.HasClearBadgeCount;
                            
                        }
                       
                        return hasClearBadgeCount;
                    }

                    var checkSimulator = function ()
                    {
                        if (window.navigator.simulator === true) {
                            return true;
                        } else if (window.cordova === undefined) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    notificationDataServiceFactory.updateNotification = updateNotification;

                    notificationDataServiceFactory.getUserNotifications = getUserNotifications;

                    notificationDataServiceFactory.updateInboxMessage = updateInboxMessage;

                    notificationDataServiceFactory.getInboxMessages = getInboxMessages;

                    notificationDataServiceFactory.getUnReadMessageCount = getUnReadMessageCount;

                    notificationDataServiceFactory.updateClearBadgeCountStatus = updateClearBadgeCountStatus;

                    notificationDataServiceFactory.getClearBadgeCountStatus = getClearBadgeCountStatus;

                    notificationDataServiceFactory.updateMessageStatusWithMarkAll = updateMessageStatusWithMarkAll;
                    
               
                    return notificationDataServiceFactory;
                }
            ]);