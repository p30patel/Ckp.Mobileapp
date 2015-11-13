
'use strict';

app.factory("homeDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings",
                function ($http, $q, localStorageService, ngAuthSettings) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var homeDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd HH");
                   
                    var forceGetOrderCounts = function () {
                        var deferred = $q.defer();
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderCountsTaskAsync?userId=" + 1;
                        $http.get(url).success(function (result) {
                           
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
            
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderHeaderDataTaskAsync?userId=" + 1 + "&client_id=" + ngAuthSettings.clientId;
                        $http.get(url).success(function (result) {
                          
                            deferred.resolve(result);
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