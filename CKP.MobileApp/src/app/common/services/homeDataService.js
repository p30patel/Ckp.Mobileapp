
'use strict';

app.factory("homeDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings",
                function ($http, $q, localStorageService, ngAuthSettings) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var homeDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd HH");

                    var data = localStorageService.get('organizationDetail');
                    if (data === null) {
                        deferred.reject('failed to get data');
                    }
                   
                    var forceGetOrderCounts = function () {
                        var deferred = $q.defer();
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderCounts";
                        $http.post(url, data).success(function (result) {
                            deferred.resolve(result);
                          
                        }).error(function (err, status) {
                            deferred.reject(err);
                        
                        });
                        

                        return deferred.promise;
                    };
                    
                    var getOrderCounts = function () {
                        var deferred = $q.defer();


                        forceGetOrderCounts().then(function (result) {
                            deferred.resolve(result);
                        });

                        return deferred.promise;
                    };

                    var forceGetOrderHeaderData = function () {
                        var deferred = $q.defer();
            
                        //var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderHeaderDataTaskAsync?userId=" + 1 + "&client_id=" + ngAuthSettings.clientId;
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderSummary";

                        var data = {
                            PageSize: 1,
                            PageNumber: 1,

                            OrderNumber: '',
                            ShoppingCartId: '773849',
                            SalesOrderNumber: '',
                            VendorRef: '',

                            RetailerId: 6884,

                            UserId: 1,
                            OrderType: 1
                        };
                        $http.post(url, data).success(function (result) {
                          
                            deferred.resolve(result);
                            console.log(result);
                        }).error(function (xhr, status, error) {   
                           
                            deferred.reject(error);
                      
                        });

                        return deferred.promise;
                    };

                    var getOrderHeaderData = function () {
                        var deferred = $q.defer();
                            forceGetOrderHeaderData().then(function (result) {
                                deferred.resolve(result);
                            });
                        return deferred.promise;
                    };

                    homeDataServiceFactory.getOrderCounts = getOrderCounts;
                    homeDataServiceFactory.forceGetOrderCounts = forceGetOrderCounts;

                    homeDataServiceFactory.getOrderHeaderData = getOrderHeaderData;
                    homeDataServiceFactory.forceGetOrderHeaderData = forceGetOrderHeaderData;

                    return homeDataServiceFactory;
                }
            ]);