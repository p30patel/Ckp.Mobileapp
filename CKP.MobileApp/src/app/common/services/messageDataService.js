
'use strict';

app.factory("messageDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var messageDataServiceFactory = {};
                    var refereshPeriod = new Date().getDay() % 2 == 0;
                    
                    var forceGetMessages = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                        localStorageService.get('organizationDetail');
                        var data = localStorageService.get('organizationDetail');

                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/GetMessageListTaskAsync', data).success(function (result) {
                            localStorageService.set('messages' + refereshPeriod, result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getMessages = function () {
                        var deferred = $q.defer();
                        var forceReferesh = false; // refresh the page once a day
                        var messages = localStorageService.get("messages" + refereshPeriod);
                       
                        if (messages) {
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