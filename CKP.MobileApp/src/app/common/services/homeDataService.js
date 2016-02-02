
'use strict';

app.factory("homeDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                   
                    var homeDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd HH");
                   
                   
                    var forceGetOrderCounts = function (data) {
                        var deferred = $q.defer();

                        var organizationDetail = localStorageService.get('organizationDetail');

                        if (organizationDetail === null) {
                            deferred.reject('failed to get data');
                        }
                       
                        var jsonIn = {
                            OrderNumber: data.OrderNumber,
                            ShoppingCartId: data.ShoppingCartId,
                            SalesOrderNumber: data.SalesOrderNumber,
                            VendorRef: data.VendorRef,
                            OrganizationDetail: organizationDetail,

                        }
                    
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderCounts";
                        $http.post(url, jsonIn).success(function (result) {
                           
                            deferred.resolve(result);
                          
                        }).error(function (err, status) {
                            deferred.reject(err);
                        
                        });
                        

                        return deferred.promise;
                    };
                    
                    var getOrderCounts = function (data) {
                        var deferred = $q.defer();

                        forceGetOrderCounts(data).then(function (result) {
                            deferred.resolve(result);
                            
                        });

                        return deferred.promise;
                    };

                    var forceGetOrderSummary = function (jsonIn) {
                        var deferred = $q.defer();
                        var authentication = authService.authentication;


                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderSummary";

                        var organization = localStorageService.get('organizationDetail');

                        jsonIn.UserId = organization.UserId;
                     
                        $http.post(url, jsonIn).success(function (result) {
                            console.log(result);
                            deferred.resolve(result);                           
                        }).error(function (xhr, status, error) {   
                           
                            deferred.reject(error);
                      
                        });

                        return deferred.promise;
                    };

                    var getOrderSummary = function (jsonIn) {
                        var deferred = $q.defer();
                       
                        forceGetOrderSummary(jsonIn).then(function (result) {
                                deferred.resolve(result);
                            });
                        return deferred.promise;
                    };

                    homeDataServiceFactory.getOrderCounts = getOrderCounts;
                    homeDataServiceFactory.forceGetOrderCounts = forceGetOrderCounts;

                    homeDataServiceFactory.getOrderSummary = getOrderSummary;
                    homeDataServiceFactory.forceGetOrderSummary = forceGetOrderSummary;

                    return homeDataServiceFactory;
                }
            ]);