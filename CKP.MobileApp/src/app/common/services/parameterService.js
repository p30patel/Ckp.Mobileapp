app.factory('parameterService', [
                '$http', '$q', 'localStorageService', 'ngAuthSettings', 'translateService',
                function ($http, $q, localStorageService, ngAuthSettings, translateService) {
                    var service = {};

                    var salesOrder = {};
                    salesOrder.resoruceName = "Sales Order";
                    salesOrder.resoruceValue = translateService.getResourceValue(salesOrder.resoruceName);


                    var orderNumber = {};
                    orderNumber.resoruceName = "Order Number";
                    orderNumber.resoruceValue = translateService.getResourceValue(orderNumber.resoruceName);

                    var shoppingCart = {};
                    shoppingCart.resoruceName = "Shopping Cart";
                    shoppingCart.resoruceValue = translateService.getResourceValue(shoppingCart.resoruceName);

                    var vendorRef = {};
                    vendorRef.resoruceName = "Vendor Ref";
                    vendorRef.resoruceName = translateService.getResourceValue(vendorRef.resoruceName);
                    
                    var searchParameters = [
                        { id: '1', name: orderNumber.resoruceValue, value: "OrderNumber", hasListView: true, hasDetailViee: true },
                        { id: '2', name: salesOrder.resoruceValue, value: "SalesOrderNumber", hasListView: true, hasDetailViee: true },
                        { id: '3', name: shoppingCart.resoruceValue, value: "ShoppingCartId", hasListView: true, hasDetailViee: true },
                        { id: '4', name: vendorRef.resoruceName, value: "VendorRef", hasListView: true, hasDetailViee: true },
            
                    ];
                    
                      var orderTypes = [
                        { id: '1', name : "Approval"},
                        { id: '2', name : "New"},
                        { id: '3', name : "Released"}                  
            
                      ];
                      var groupListScreen1 = [

                          { searchParamterId: '1', orderTypeId: '1', groupBy: '-Id', searchParameterScreen2: 'SalesOrderNumber' },
                          { searchParamterId: '1', orderTypeId: '2', groupBy: '-Id', searchParameterScreen2: '' },
                          { searchParamterId: '1', orderTypeId: '3', groupBy: '-Id', searchParameterScreen2: '' },


                          { searchParamterId: '2', orderTypeId: '1', groupBy: 'SalesOrderNumber', searchParameterScreen2: 'SalesOrderNumber' },
                          { searchParamterId: '2', orderTypeId: '3', groupBy: 'SalesOrderNumber', searchParameterScreen2: 'SalesOrderNumber' },

                          { searchParamterId: '3', orderTypeId: '1', groupBy: 'ShoppingCartId', searchParameterScreen2: 'ShoppingCartId' },                          
                          { searchParamterId: '3', orderTypeId: '3', groupBy: 'ShoppingCartId', searchParameterScreen2: 'ShoppingCartId' },


                          { searchParamterId: '4', orderTypeId: '1', groupBy: 'VendorRef', searchParameterScreen2: 'VendorRef' },
                          { searchParamterId: '4', orderTypeId: '2', groupBy: 'VendorRef', searchParameterScreen2: 'VendorRef' },
                          { searchParamterId: '4', orderTypeId: '3', groupBy: 'VendorRef', searchParameterScreen2: 'VendorRef' },
                       
                      ];


                      var groupListScreen2 = [
                          { searchParamterId: '1', orderTypeId: '1', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '1', orderTypeId: '2', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '1', orderTypeId: '3', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },


                          { searchParamterId: '2', orderTypeId: '1', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '2', orderTypeId: '2', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '2', orderTypeId: '3', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },


                          { searchParamterId: '3', orderTypeId: '1', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '3', orderTypeId: '2', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '3', orderTypeId: '3', groupBy: 'ShoppingCartId', searchBy: 'ShoppingCartId' },

                          { searchParamterId: '4', orderTypeId: '1', groupBy: 'SalesOrderNumber', searchBy: 'SalesOrderNumber' },
                          { searchParamterId: '4', orderTypeId: '2', groupBy: 'VendorRef', searchBy: 'VendorRef' },
                          { searchParamterId: '4', orderTypeId: '3', groupBy: 'VendorRef', searchBy: 'VendorRef' },

                          ];


                      var getSearchParameters = function () {
                          salesOrder.resoruceValue = translateService.getResourceValue(salesOrder.resoruceName);
                          orderNumber.resoruceValue = translateService.getResourceValue(orderNumber.resoruceName);
                          shoppingCart.resoruceValue = translateService.getResourceValue(shoppingCart.resoruceName);
                          vendorRef.resoruceName = translateService.getResourceValue(vendorRef.resoruceName);

                      var searchParameters = [
                       { id: '1', name: orderNumber.resoruceValue, value: "OrderNumber", hasListView: true, hasDetailViee: true },
                       { id: '2', name: salesOrder.resoruceValue, value: "SalesOrderNumber", hasListView: true, hasDetailViee: true },
                       { id: '3', name: shoppingCart.resoruceValue, value: "ShoppingCartId", hasListView: true, hasDetailViee: true },
                       { id: '4', name: vendorRef.resoruceName, value: "VendorRef", hasListView: true, hasDetailViee: true },

                          ];


                        return searchParameters;
                    }
        
                    var getSearchParameterName = function (id) {
                        var paramterName = "OrderNumber";
                        angular.forEach(searchParameters, function (item) {
                            if (item.id === id) {
                                paramterName = item.value;
                                return paramterName;
                            }
                        });
                        return paramterName;
                    }
                    
                    
                    var getOrderTypes = function () {
                        return orderTypes;
                    }
        
                    var getOrderTypeName = function (id) {
                        var paramterName = "Released";
                        angular.forEach(orderTypes, function (item) {
                            if (item.id === id) {
                                paramterName = item.name;
                                return paramterName;
                            }
                        });
                        return paramterName;
                    }

                    var getOrderTypeById = function (name) {
                        var id = 0;
                        angular.forEach(orderTypes, function (item) {
                            if (item.name === name) {
                                id = item.id;
                                return id;
                            }
                        });
                        return id;
                    }

                    var getScreen1GroupByName = function (searchParaId, orderTypeId) {
                        var groupByName = "SalesOrderNumber";
                        angular.forEach(groupListScreen1, function (item) {                         
                            if (item.searchParamterId === searchParaId && item.orderTypeId === orderTypeId) {
                                groupByName = item.groupBy;
                                return groupByName;
                            }
                        });
                        return groupByName;
                    }

                    var getScreen2SearchParameter = function (searchParaId, orderTypeId) {
                        var searchParameter = "SalesOrderNumber";

                        angular.forEach(groupListScreen1, function (item) {

                            if (item.searchParamterId === searchParaId && item.orderTypeId === orderTypeId) {
                                searchParameter = item.searchParameterScreen2;
                                return searchParameter;
                            }
                        });
                        return searchParameter;
                    }
                    var getScreen2GroupByName = function (searchParaId, orderTypeId) {
                        var groupByName = "SalesOrderNumber";
                        
                        angular.forEach(groupListScreen2, function (item) {
                           
                            if (item.searchParamterId === searchParaId && item.orderTypeId === orderTypeId) {
                                groupByName = item.groupBy;
                                return groupByName;
                            }
                        });
                        return groupByName;
                    }

                    var getScreen2SearchByName = function (searchParaId, orderTypeId) {
                        var searchByName = "";

                        angular.forEach(groupListScreen2, function (item) {

                            if (item.searchParamterId === searchParaId && item.orderTypeId === orderTypeId) {
                                searchByName = item.searchBy;
                                return searchByName;
                            }
                        });
                        return searchByName;
                    }


                    service.getSearchParameters = getSearchParameters;
                    service.getSearchParameterName = getSearchParameterName;
                    
                    service.getOrderTypes = getOrderTypes;
                    service.getOrderTypeName = getOrderTypeName;
                    service.getOrderTypeById = getOrderTypeById;

                    service.getScreen1GroupByName = getScreen1GroupByName;
                    service.getScreen2SearchParameter = getScreen2SearchParameter;
                    service.getScreen2GroupByName = getScreen2GroupByName;

                    service.getScreen2SearchByName = getScreen2SearchByName;
                    
                    return service;
                }
            ]);