
'use strict';

app.factory("feedbackDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var feedbackDataServiceFactory = {};

                    var postFeedback = function (feedbackData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var userId = authentication.userId;    
                      
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/SendFeedback?webpage=' + feedbackData.webpage + '&comment=' + feedbackData.comment + '&userId=' + userId).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    var contactUsByEmail = function (feedbackData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var userId = authentication.userId;
                        var data = {};
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/ContactUsFormByEmail?webpage=' + feedbackData.webpage + '&comment=' + feedbackData.comment + '&userId=' + userId).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    feedbackDataServiceFactory.postFeedback = postFeedback;
                    feedbackDataServiceFactory.contactUsByEmail = contactUsByEmail;
               
                    return feedbackDataServiceFactory;
                }
            ]);