
'use strict';

app.factory("messageDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var messageDataServiceFactory = {};
                    var refereshPeriod = true;
                    
                    var forceGetMessages = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                        var data = localStorageService.get('organizationDetail');
                       
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/GetMessageListTaskAsync', data).success(function (result) {
                            localStorageService.set('messages', result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getMessages = function () {
                        var deferred = $q.defer();
                        var forceReferesh = true;
                        var messages = localStorageService.get("messages");

                        var refreshData = localStorageService.get('refreshPeriod');
                        if (refreshData) {
                            forceReferesh = refreshData.refereshPeriod;
                        }

                        
                        if (messages && !forceReferesh) {
                            deferred.resolve(messages);
                        } else {
                            forceReferesh = true;
                        }

                        if (forceReferesh)
                        {
                            forceGetMessages().then(function (result) {
                                deferred.resolve(result);
                        });
                        }

                        return deferred.promise;
                    }

                    messageDataServiceFactory.getMessages = getMessages;
                    messageDataServiceFactory.forceGetMessages = forceGetMessages;

                    return messageDataServiceFactory;
                }
            ]);