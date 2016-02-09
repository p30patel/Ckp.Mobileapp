
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

                            result = checkNotifcationByPermisson(result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    var checkNotifcationByPermisson = function(result){

                        var organizationDetail = localStorageService.get('organizationDetail');
                        var orderCounts = localStorageService.get('orderCounts');
                        var newResults = result;
                        if (organizationDetail)
                        {
                            newResults = [];
                            angular.forEach(result, function (value, key) {
                              
                                switch (value.SubscriptionType)
                                {
                                    case 101:
                                        
                                        if (orderCounts.MobileOrderCountList[0].HasStagedOrder)
                                        {
                                         
                                            newResults.push(value);                                          
                                        }
                                        break;

                                 
                                    case 102: 
                                    case 103:                                        
                                        if (orderCounts.MobileOrderCountList[0].HasApproval)
                                        {
                                            
                                            newResults.push(value);
                                            
                                        }
                                        break;
                                    case 104:
                                        {
                                            newResults.push(value);

                                        }
                                        break;

                                    case 105:
                                        if (organizationDetail.OrgContext.EnableShipmentDeliveryInfo)
                                        {

                                            newResults.push(value);

                                        }
                                        break;
                                        
                                    case 106:
                                        {
                                            newResults.push(value);

                                        }
                                        break;

                                    case 107:
                                        {
                                            newResults.push(value);

                                        }
                                        break;

                                    default:
                                        break;
                                }
                              
                                
                            });
                        }
                       
                        return newResults;
                    }

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

                    notificationDataServiceFactory.updateNotification = updateNotification;

                    notificationDataServiceFactory.getUserNotifications = getUserNotifications;
               
                    return notificationDataServiceFactory;
                }
            ]);