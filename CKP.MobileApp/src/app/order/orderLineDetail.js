
app.controller('orderLineDetailController', [
                   '$scope', 'authService', 'orderDataService', '$sce', 'translateService', 'feedbackDataService', 'notificationDataService' , '$timeout', 'localStorageService', 'ngAuthSettings',
function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, notificationDataService, $timeout, localStorageService, ngAuthSettings) {

                       $scope.form = {};
                       var url = ngAuthSettings.authServiceBaseUri === 'https://qachecknet.checkpt.com/' ? ngAuthSettings.authServiceBaseUri + 'Redesign' : ngAuthSettings.authServiceBaseUri + 'RCNV2';
                       $scope.form.title = {};
                       $scope.form.title.resourceName = "Order Line Detail";
                       $scope.form.title.resourceValue = translateService.getResourceValue($scope.form.title.resourceName);
                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resourceValue);

                               if (typeof (window.navigator.simulator) === 'undefined') {
                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderLineDetail");
                               }
                               $scope.notifyMe = false;
                           }
                       }

                       $scope.form.noData = {};
                       $scope.form.noData.resourceName = "No Data are found";
                       $scope.form.noData.resourceValue = translateService.getResourceValue($scope.form.noData.resourceName);

                       $scope.form.noResults = {};
                       $scope.form.noResults.resourceName = "No Results are found";
                       $scope.form.noResults.resourceValue = translateService.getResourceValue($scope.form.noResults.resourceName);


                       $scope.form.item = {};
                       $scope.form.item.resourceName = "Item";
                       $scope.form.item.resourceValue = translateService.getResourceValue($scope.form.item.resourceName);


                       $scope.form.quantity = {};
                       $scope.form.quantity.resourceName = "Quantity";
                       $scope.form.quantity.resourceValue = translateService.getResourceValue($scope.form.quantity.resourceName);


                       $scope.form.adjustedQuantity = {};
                       $scope.form.adjustedQuantity.resourceName = "Adjusted Quantity";
                       $scope.form.adjustedQuantity.resourceValue = translateService.getResourceValue($scope.form.adjustedQuantity.resourceName);


                       $scope.form.price = {};
                       $scope.form.price.resourceName = "Price";
                       $scope.form.price.resourceValue = translateService.getResourceValue($scope.form.price.resourceName);

                       $scope.form.orderDetail = {};
                       $scope.form.orderDetail.resourceName = "Order Detail";
                       $scope.form.orderDetail.resourceValue = translateService.getResourceValue($scope.form.orderDetail.resourceName);


                       $scope.form.itemCode = {};
                       $scope.form.itemCode.resourceName = "Item Code";
                       $scope.form.itemCode.resourceValue = translateService.getResourceValue($scope.form.itemCode.resourceName);
                       $scope.orderLineDetail = {};
    
                       $scope.retailerId = 0;
                       var orderLineId = 0;
                       var init = function () {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();

                       $scope.intShow = function (e) {                          
                           orderLineId = e.view.params.orderLineId;
                           $scope.retailerId = e.view.params.retailerId;
                       
                           getOrderLineDetail(orderLineId);

                       }


                       var getOrderLineDetail = function (orderLineId) {
                           $scope.orderLineDetail = {
                               "OrderLine": [
                                  {
                                      "__productArticleNumber": "1",
                                      "__productName": "MARSHALLS LARGE' TAG",
                                      "__originalQuantity": 7920,
                                      "__adjustedQuantity": 7920,
                                      "__position": 1,
                                      "__orderLineId": 37404695,
                                      "__productionOrderId": 409014324,
                                      "__quantityOverage": 0.0,
                                      "TicketType": "M     ",
                                      "ChainID": "10",
                                      "VNTBYDATE": "02/27/14",
                                      "DATFIELD1": "994209                                 ",
                                      "DATFIELD2": "WTT-20496                              ",
                                      "DATFIELD3": "666                                    ",
                                      "DATFIELD4": "040325914                              ",
                                      "DATFIELD5": "1                                      ",
                                      "DATFIELD6": "POPPY                                  ",
                                      "DATFIELD7": "$48.00 ",
                                      "TICKINSTFILENAME": "WDMAXUK0217290940.zip",
                                      "DATFIELD17": "",
                                      "DATFIELD8": "$24.99",
                                      "DATFIELD10": "",
                                      "DATFIELD9": "YOU SAVE $23.01",
                                      "DATFIELD12": "1203-040325914-002499- 06 -1",
                                      "DATFIELD11": "",
                                      "DATFIELD13": "",
                                      "DATFIELD14": "0366--666 --994209--CM1",
                                      "DATFIELD16": "D03  994209",
                                      "DATFIELD15": "",
                                      "DATFIELD19": "",
                                      "DATFIELD26": "03",
                                      "DATFIELD27": " 994209",
                                      "DATFIELD28": "0366",
                                      "DATFIELD18": "06",
                                      "DATFIELD20": "120304032591402499",
                                      "DATFIELD21": " ",
                                      "DATFIELD22": "COMPARE AT",
                                      "DATFIELD23": "666",
                                      "DATFIELD24": "666",
                                      "DATFIELD25": ""
                                  },
                                  {
                                      "__productArticleNumber": "1",
                                      "__productName": "MARSHALLS LARGE' TAG",
                                      "__originalQuantity": 7920,
                                      "__adjustedQuantity": 7920,
                                      "__position": 2,
                                      "__orderLineId": 37404695,
                                      "__productionOrderId": 409014324,
                                      "__quantityOverage": 0.0,
                                      "TicketType": "M     ",
                                      "ChainID": "10",
                                      "VNTBYDATE": "02/27/14",
                                      "DATFIELD1": "994212                                 ",
                                      "DATFIELD2": "WTT-20393                              ",
                                      "DATFIELD3": "666                                    ",
                                      "DATFIELD4": "040325921                              ",
                                      "DATFIELD5": "1                                      ",
                                      "DATFIELD6": "MED WASH 102                           ",
                                      "DATFIELD7": "$48.00 ",
                                      "TICKINSTFILENAME": "WDMAXUK0217290940.zip",
                                      "DATFIELD17": "",
                                      "DATFIELD8": "$24.99",
                                      "DATFIELD10": "",
                                      "DATFIELD9": "YOU SAVE $23.01",
                                      "DATFIELD12": "1203-040325921-002499- 06 -1",
                                      "DATFIELD11": "",
                                      "DATFIELD13": "",
                                      "DATFIELD14": "0366--666 --994212--CM1",
                                      "DATFIELD16": "D03  994212",
                                      "DATFIELD15": "",
                                      "DATFIELD19": "",
                                      "DATFIELD26": "03",
                                      "DATFIELD27": " 994212",
                                      "DATFIELD28": "0366",
                                      "DATFIELD18": "06",
                                      "DATFIELD20": "120304032592102499",
                                      "DATFIELD21": " ",
                                      "DATFIELD22": "COMPARE AT",
                                      "DATFIELD23": "666",
                                      "DATFIELD24": "666",
                                      "DATFIELD25": ""
                                  },
                                  {
                                      "__productArticleNumber": "1",
                                      "__productName": "MARSHALLS LARGE' TAG",
                                      "__originalQuantity": 1320,
                                      "__adjustedQuantity": 1320,
                                      "__position": 3,
                                      "__orderLineId": 37404695,
                                      "__productionOrderId": 409014324,
                                      "__quantityOverage": 0.0,
                                      "TicketType": "M     ",
                                      "ChainID": "10",
                                      "VNTBYDATE": "02/27/14",
                                      "DATFIELD1": "994226                                 ",
                                      "DATFIELD2": "WFX-20439                              ",
                                      "DATFIELD3": "666                                    ",
                                      "DATFIELD4": "040325938                              ",
                                      "DATFIELD5": "1                                      ",
                                      "DATFIELD6": "PAISLEY PRIN                           ",
                                      "DATFIELD7": "$48.00 ",
                                      "TICKINSTFILENAME": "WDMAXUK0217290940.zip",
                                      "DATFIELD17": "",
                                      "DATFIELD8": "$24.99",
                                      "DATFIELD10": "",
                                      "DATFIELD9": "YOU SAVE $23.01",
                                      "DATFIELD12": "1203-040325938-002499- 06 -1",
                                      "DATFIELD11": "",
                                      "DATFIELD13": "",
                                      "DATFIELD14": "0366--666 --994226--CM1",
                                      "DATFIELD16": "D03  994226",
                                      "DATFIELD15": "",
                                      "DATFIELD19": "",
                                      "DATFIELD26": "03",
                                      "DATFIELD27": " 994226",
                                      "DATFIELD28": "0366",
                                      "DATFIELD18": "06",
                                      "DATFIELD20": "120304032593802499",
                                      "DATFIELD21": " ",
                                      "DATFIELD22": "COMPARE AT",
                                      "DATFIELD23": "666",
                                      "DATFIELD24": "666",
                                      "DATFIELD25": ""
                                  }
                               ],
                               "Columns": [
                                  {
                                      "Field": "__originalQuantity",
                                      "Title": null
                                  },
                                  {
                                      "Field": "__adjustedQuantity",
                                      "Title": null
                                  },
                                  {
                                      "Field": "TicketType",
                                      "Title": null
                                  },
                                  {
                                      "Field": "ChainID",
                                      "Title": null
                                  },
                                  {
                                      "Field": "VNTBYDATE",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD1",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD2",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD3",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD4",
                                      "Title": null
                                  },
                                  {
                                      "Field": "TYPE",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD6",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD7",
                                      "Title": null
                                  },
                                  {
                                      "Field": "TICKINSTFILENAME",
                                      "Title": null
                                  },
                                  {
                                      "Field": "MESSAGE",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD8",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD10",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD9",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD12",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD11",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD13",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD14",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD16",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD15",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD19",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD26",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD27",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD28",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD18",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD20",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD21",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD22",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD23",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD24",
                                      "Title": null
                                  },
                                  {
                                      "Field": "DATFIELD25",
                                      "Title": null
                                  }
                               ],
                               "ErrorMessage": ""
                           };
                           console.log($scope.orderLineDetail);
                           //kendo.mobile.application.showLoading();

                           //if (typeof (window.navigator.simulator) === 'undefined') {
                           //    window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderLineDetail");
                           //}
                           //orderDataService.getOrderLineDetail(orderLineId, $scope.retailerId).then(function (result) {

                           //    $scope.orderLineDetail = result;
                             
                           //}).catch(function (error) {
                           //    $scope.orderLineDetail = {};

                           //}).finally(function () {
                           //    kendo.mobile.application.hideLoading();
                           //});

                       }; 


                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);

                       };
                   }
]);