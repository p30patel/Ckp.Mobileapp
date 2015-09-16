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
                        { id: '1', name: orderNumber.resoruceValue, value: "Purchase Order" },
                        { id: '2', name: salesOrder.resoruceValue, value: "Sales Orderr" },
                        { id: '3', name: shoppingCart.resoruceValue, value: "Shopping Cart" },
                        { id: '4', name: vendorRef.resoruceName, value: "Vendor Ref" },
            
                    ];
                    
                      var orderTypes = [
                        { id: '1', name : "Approval"},
                        { id: '2', name : "New"},
                        { id: '3', name : "Released"}                  
            
                    ];


                    var getSearchParameters = function () {
                        return searchParameters;
                    }
        
                    var getSearchParameterName = function (id) {
                        var paramterName = "Purchase Order";
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
                    service.getSearchParameters = getSearchParameters;
                    service.getSearchParameterName = getSearchParameterName;
                    
                    service.getOrderTypes = getOrderTypes;
                    service.getOrderTypeName = getOrderTypeName;

                    return service;
                }
            ]);