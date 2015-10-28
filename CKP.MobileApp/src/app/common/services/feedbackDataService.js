
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

                    var contactUsByEmail = function (contactUsData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var userId = authentication.userId;
                        var username = authentication.userName;
                        var organizationDetail = localStorageService.get('organizationDetail');
                        var orgContext = '';
                        if (organizationDetail)
                        {
                            orgContext = organizationDetail.OrgContext
                        }                       
                        var data = {
                            OrgContext: orgContext,
                            UserName: username,
                            Name: contactUsData.name,
                            Email: contactUsData.email,
                            CompanyName: contactUsData.organization,
                            OrderNumber: contactUsData.orderNumber,
                            MessageBody: contactUsData.messageBody
                        };
                       
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/ContactUsByEmail', data).success(function (result) {
                         
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