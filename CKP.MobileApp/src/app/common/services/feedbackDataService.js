
'use strict';

app.factory("feedbackDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var feedbackDataServiceFactory = {};

                    var postFeedback = function (feedbackData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;
                        var organizationDetail = localStorageService.get('organizationDetail');
                        var userId = organizationDetail.UserId;
                      
                        $http.post(authServiceBase + 'webapi/api/core/MobileApp/SendFeedback?webpage=' + feedbackData.webpage + '&version=' + feedbackData.version + '&comment=' + feedbackData.comment + '&userId=' + userId).success(function (result) {
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });

                        if (typeof (window.navigator.simulator) === 'undefined') {
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.Feedback.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                        }

                        return deferred.promise;
                    };

                    var contactUsByEmail = function (contactUsData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authentication = authService.authentication;                       
                        var username = authentication.userName;
                        var organizationDetail = localStorageService.get('organizationDetail');
                       
                        var userId = 0;
                   
                        var orgContext = '';
                        if (organizationDetail)
                        {
                            orgContext = organizationDetail.OrgContext;
                            userId = organizationDetail.UserId;
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

                        if (typeof (window.navigator.simulator) === 'undefined') {
                         
                            window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.ContactUsByEmail.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
                        }
                        return deferred.promise;
                    };

                    feedbackDataServiceFactory.postFeedback = postFeedback;
                    feedbackDataServiceFactory.contactUsByEmail = contactUsByEmail;
               
                    return feedbackDataServiceFactory;
                }
            ]);