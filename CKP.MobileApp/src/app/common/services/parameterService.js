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
                        { id: 1, name : "Approval"},
                        { id: 2, name : "New"},
                        { id: 3, name : "Released"}                  
            
                      ];

                      var groupList = [
                         
                          { searchParamterId: '3', orderTypeId: '3', groupBy: 'ShoppingCartId' },
                        
                          { searchParamterId: '4', orderTypeId: '2', groupBy: 'VendorRef' },
                          { searchParamterId: '4', orderTypeId: '3', groupBy: 'VendorRef' },

                          ];


                    var getSearchParameters = function () {
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

                    var getGroupByName = function (searchParaId, orderTypeId) {
                        var groupByName = "SalesOrderNumber";
                        
                        angular.forEach(groupList, function (item) {
                           
                            if (item.searchParamterId === searchParaId && item.orderTypeId === orderTypeId) {
                                groupByName = item.groupBy;
                                return groupByName;
                            }
                        });
                        return groupByName;
                    }


                    service.getSearchParameters = getSearchParameters;
                    service.getSearchParameterName = getSearchParameterName;
                    
                    service.getOrderTypes = getOrderTypes;
                    service.getOrderTypeName = getOrderTypeName;
                    service.getOrderTypeById = getOrderTypeById;

                    service.getGroupByName = getGroupByName;

                    return service;
                }
            ]);