
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService','$sce', 'translateService', 'feedbackDataService', '$timeout',
                   function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, $timeout) {
                       if (isTrackingActive && typeof (EqatecAnalytics) !== 'undefined') {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderDetail");
                       }
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Order Detail";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);
                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);

                           }
                       }

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);


                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resoruceName = "Have a question or comment about this order?";
                       $scope.form.orderInquiry.resoruceValue = translateService.getResourceValue($scope.form.orderInquiry.resoruceName);


                       $scope.form.faildInquiry = {};
                       $scope.form.faildInquiry.resoruceName = "Failed to Send Inquiry";
                       $scope.form.faildInquiry.resoruceValue = translateService.getResourceValue($scope.form.faildInquiry.resoruceName);


                       $scope.form.thankyou = {};
                       $scope.form.thankyou.resoruceName = "Thank you for your Inquiry, someone will be get back to you";
                       $scope.form.thankyou.resoruceValue = translateService.getResourceValue($scope.form.thankyou.resoruceName);

                       $scope.form.shippingInstruction = {};
                       $scope.form.shippingInstruction.resoruceName = "Shipping and tax charges are estimated at time of checkout. The final shipping and tax amount will be reflected on your invoice";
                       $scope.form.shippingInstruction.resoruceValue = translateService.getResourceValue($scope.form.shippingInstruction.resoruceName);

                       $scope.form.orderDate = {};
                       $scope.form.orderDate.resoruceName = "Order Date";
                       $scope.form.orderDate.resoruceValue = translateService.getResourceValue($scope.form.orderDate.resoruceName);


                       $scope.form.salesOrder = {};
                       $scope.form.salesOrder.resoruceName = "Sales Order";
                       $scope.form.salesOrder.resoruceValue = translateService.getResourceValue($scope.form.salesOrder.resoruceName);


                       $scope.form.orderNumber = {};
                       $scope.form.orderNumber.resoruceName = "Order Number";
                       $scope.form.orderNumber.resoruceValue = translateService.getResourceValue($scope.form.orderNumber.resoruceName);

                       $scope.form.shoppingCart = {};
                       $scope.form.shoppingCart.resoruceName = "Shopping Cart";
                       $scope.form.shoppingCart.resoruceValue = translateService.getResourceValue($scope.form.shoppingCart.resoruceName);

                       $scope.form.vendorRef = {};
                       $scope.form.vendorRef.resoruceName = "Vendor Ref";
                       $scope.form.vendorRef.resoruceValue = translateService.getResourceValue($scope.form.vendorRef.resoruceName);

                       $scope.form.notifyMe = {};
                       $scope.form.notifyMe.resoruceName = "Notify Me";
                       $scope.form.notifyMe.resoruceValue = translateService.getResourceValue($scope.form.notifyMe.resoruceName);

                       $scope.form.billingInfo = {};
                       $scope.form.billingInfo.resoruceName = "Bill To Information";
                       $scope.form.billingInfo.resoruceValue = translateService.getResourceValue($scope.form.billingInfo.resoruceName);


                       $scope.form.shiptoInfo = {};
                       $scope.form.shiptoInfo.resoruceName = "Ship To Information";
                       $scope.form.shiptoInfo.resoruceValue = translateService.getResourceValue($scope.form.shiptoInfo.resoruceName);

                       
                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resoruceName = "Order Inquiry";
                       $scope.form.orderInquiry.resoruceValue = translateService.getResourceValue($scope.form.orderInquiry.resoruceName);


                       $scope.form.sendInquiry = {};
                       $scope.form.sendInquiry.resoruceName = "Send Inquiry";
                       $scope.form.sendInquiry.resoruceValue = translateService.getResourceValue($scope.form.sendInquiry.resoruceName);



                       $scope.form.item = {};
                       $scope.form.item.resoruceName = "Item";
                       $scope.form.item.resoruceValue = translateService.getResourceValue($scope.form.item.resoruceName);


                       $scope.form.quantity = {};
                       $scope.form.quantity.resoruceName = "Quantity";
                       $scope.form.quantity.resoruceValue = translateService.getResourceValue($scope.form.quantity.resoruceName);
                       

                       $scope.form.price = {};
                       $scope.form.price.resoruceName = "Price";
                       $scope.form.price.resoruceValue = translateService.getResourceValue($scope.form.price.resoruceName);

                       $scope.form.orderDetail = {};
                       $scope.form.orderDetail.resoruceName = "Order Detail";
                       $scope.form.orderDetail.resoruceValue = translateService.getResourceValue($scope.form.orderDetail.resoruceName);


                       $scope.form.itemCode = {};
                       $scope.form.itemCode.resoruceName = "Item Code";
                       $scope.form.itemCode.resoruceValue = translateService.getResourceValue($scope.form.itemCode.resoruceName);

                       $scope.form.prodcutionLocation = {};
                       $scope.form.prodcutionLocation.resoruceName = "Production Location";
                       $scope.form.prodcutionLocation.resoruceValue = translateService.getResourceValue($scope.form.prodcutionLocation.resoruceName);

                       $scope.form.trackingList = {};
                       $scope.form.trackingList.resoruceName = "Tracking List";
                       $scope.form.trackingList.resoruceValue = translateService.getResourceValue($scope.form.trackingList.resoruceName);

                       $scope.form.releasedBy = {};
                       $scope.form.releasedBy.resoruceName = "Released by";
                       $scope.form.releasedBy.resoruceValue = translateService.getResourceValue($scope.form.releasedBy.resoruceName);

                       $scope.form.phone = {};
                       $scope.form.phone.resoruceName = "Phone";
                       $scope.form.phone.resoruceValue = translateService.getResourceValue($scope.form.phone.resoruceName);

                       $scope.form.email = {};
                       $scope.form.email.resoruceName = "Email";
                       $scope.form.email.resoruceValue = translateService.getResourceValue($scope.form.email.resoruceName);


                       
                       $scope.order = {};
                  
                       $scope.order.hasApproval = false;
                       $scope.order.hasStaged = false;
                       $scope.order.title = 'Order Detail';
                       $scope.order.detail = {};
                       $scope.inqueryMessage = "";
                       $scope.inqueryComment = "";

                       $scope.feedbackData = {};
                       $scope.feedbackData.webpage = "Mobile App - Order Inquiry";
                       $scope.feedbackData.comment = "";

                       $scope.trackingUrl = "";
                       $scope.trackingList = {};
                       $scope.trackingCount = 0;

                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                             
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var parameterValue = "";
                       $scope.intShow = function (e) {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue = e.view.params.parameterValue;
                           
                           $scope.order.message = orderType + ";" + parameterId + ":" + parameterValue;
                           if (orderType === '1') {
                               $scope.order.hasApproval = true;
                           }
                           else if (orderType === '2')
                           {
                               $scope.order.hasStaged = true;
                           }

                          
                           getOrderDetail(parameterValue);
                           
                          
                       }
                       
                       var getOrderDetail = function (poctrlno) {
                           //poctrlno = 12345; // reomve after DEMO

                           var staticData = {
                               "MobileOrderDetail": {
                                   "OrderNumber": "UO-41072315172", "ShoppingCartId": "11080", "OrganizationName": "MARSHALLS", "SalesOrderNumber": "178007724", "VendorRef": "VendorRef 2", "Status": 120, "DateInSystem": "2014-03-15T00:33:00", "OrderDate": "2015-12-03T21:13:16.727", "POCtrlNo": 409024214, "OrderedBy": "marshall_admin", "Price": "USD 13.00", "IsStagedOrder": false, "BillingAddress": { "AddressType": 102, "PoCtrlNo": 409024214, "IntegrateErpCode": null, "Id": 52072288, "Name": "TJX COMPANY", "Contact": "", "Street1": "The TJX Companies, Inc", "Street2": "", "Street3": "", "Street4": "", "ZipCode": "01701", "City": "Framingham", "County": "", "StateProv": "MA", "CountryName": "UNITED STATES", "Iso3166": "US", "Phone": "0", "Fax": "", "Email": "", "VAT": "", "ERPRefCode": "162389", "StoreNumber": "", "TaxIdNo": "", "POBox": "9133", "CheckSum": 44376563, "Error": "" }, "DeliveryAddress": { "AddressType": 103, "PoCtrlNo": 409024214, "IntegrateErpCode": null, "Id": 52072287, "Name": "Ralph Lauren Childrens", "Contact": "Jill Shockery", "Street1": "4100 Beechwood Drive", "Street2": "", "Street3": "", "Street4": "", "ZipCode": "27410", "City": "Greensboro", "County": "", "StateProv": "NC", "CountryName": "UNITED STATES", "Iso3166": "US", "Phone": "336-323-8868", "Fax": "", "Email": "", "VAT": "", "ERPRefCode": "", "StoreNumber": "", "TaxIdNo": "", "POBox": "", "CheckSum": -1271510762, "Error": "" },
                                   "OrderTrackingNumberList": [{ "ProductionOrderId": 0, "CourierName": "UPS", "TrackingUrl": "http://wwwapps.ups.com/etracking/tracking.cgi?TypeOfInquiryNumber=T&AcceptUPSLicenseAgreement=yes&InquiryNumber1=", "AwbNumber": "1Z146V020460170748", "Id": -1, "Error": "" },
                                   { "ProductionOrderId": 0, "CourierName": "Fedex", "TrackingUrl": "https://www.fedex.com/apps/fedextrack/?action=track&action=track&mps=y&language=english&cntry_code=us&tracknumbers=", "AwbNumber": "640251899563", "Id": -1, "Error": "" }],
                                   "StatusDisplay": "Open", "Id": -1, "Error": ""
                               },
                               "ProductionOrderData": [{ "ProductionOrderLine": { "FormattedTotalWeight": "722.00 PER 1000 PIECES", "ProductionOrderId": 409024214, "Position": 1, "RetailerId": 6884, "SalesOrderLine": 100, "SalesOrderNo": 178007724, "Status": 0, "StatusDate": "2015-12-03T21:13:17.133", "StatusText": "New order", "Quantity": { "Value": 3800, "Uom": { "Name": "Each", "ShortText": "EA", "UOMCode": 101, "SapCode": "PCE", "TypeId": 0, "IntegrateCode": "EA", "UomDisplay": "per Piece", "Id": 101, "Error": "" } }, "LineItemCount": 0, "StagedOrderLineId": 0, "ProductionId": 0, "HasLineItems": false, "InvoiceNumber": "0", "AwbNumber": "", "GrossCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "PriceUnit": 1000, "PriceUom": { "Name": "PER 1000 PIECES", "ShortText": "/1000", "UOMCode": 102, "SapCode": "MIL", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "per 1000 pcs", "Id": 102, "Error": "" }, "GrossPrice": 13.0, "GrossValue": 49.4, "GrossExchangeRate": 1.0, "FreightCost": 0.0, "ErpFreightCost": 0.0, "FreightCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceUnit": 0, "ExpeditedServiceUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "ExpeditedServiceCharge": 0.0, "ExpeditedServiceRate": 0.0, "ExpeditedServiceCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceExchangeRate": 0.0, "DiscountUnit": 0, "DiscountUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "DiscountValue": 0.0, "DiscountRate": 0.0, "DiscountCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "DiscountExchangeRate": 0.0, "Vat": 3.33, "VatRate": 6.75, "ItemNetValue": 49.4, "RetailerProductCode": "8-SH", "BaseCurrency": "USD", "UnitWeight": 0.18999999761581421, "TotalWeight": 722.0, "WeightUOM": { "Name": "PER 1000 PIECES", "ShortText": "/1000", "UOMCode": 102, "SapCode": "MIL", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "per 1000 pcs", "Id": 102, "Error": "" }, "ParcelNumber": null, "Courier": null, "SendToERP": false, "BOD902CtrlNo": 0, "BOD902StatusCode": null, "BOD902Courier": null, "DateAtPrintshop": null, "DatePrinted": null, "BOD902ShipDt": null, "BOD012Status": 0, "ProcessedBOD905": false, "ShipmentEmailStatus": 0, "BOD902QtyShipped": 0, "EstimatedShipDate": null, "ReRoute": false, "OldPrintshop": "", "DateRouted": null, "DivisionCode": "", "LastShipQty": 0, "TotalShipQty": 0, "LastShipFreight": 0.0, "IsPartial": false, "ErpDeliveryDate": null, "ImprintFee": 0.0, "BaseStockPrice": 0.0, "ShippingWeight": 0.0, "RetailerOrderLineId": "", "LineItems": [], "OrderLineFields": [], "DueDate": null, "ProductionDate": null, "ShipDate": null, "CancelDate": null, "IsCancelled": false, "IsProduced": false, "IsShipped": false, "LineItemsTable": [], "ReceiverReference": "", "PriceUomName": "PER 1000 PIECES", "ExpeditedServiceUomName": "Not set", "DiscountUomName": "Not set", "FormattedGrossPrice": "USD 13.00 per 1000 pc", "FormattedFreightCost": "USD 0.00", "FormattedExpeditedServiceCharge": "USD 0.00", "FormattedDiscountValue": "USD 0.00", "FormattedVat": "USD 3.33", "FormattedNetValue": "USD 49.40", "OrderNumber": null, "IsSelected": false, "PrintshopFreightCost": 0.0, "PrintshopFreightCurrency": "", "IsManualFreight": false, "ErpProductionStatus": 0, "ErpDeliveryStatus": 0, "ERPProductionMessage": "", "ERPDeliveryMessage": "", "Surcharge": 0.0, "BackOrderedOrderLine": null, "BackOrderedMessage": null, "FormattedAmount": 49.4, "QuantityMultiplier": 1, "ShoppingCartOrderLineId": 0, "BimSalesOrderNumber": "", "IsExplosionItem": false, "ShipmentWeight": 0.7219999818801881, "OriginalQuantity": 0, "IsRoundUpApplied": false, "IsValidQty": true, "MinimumOrderQty": 0, "RoundUpQty": 0, "ProductId": 56444, "ProductName": "MARSHALLS GUM LABEL ON SHEETS", "ArticleNumber": "1010714", "EndProductId": 26884, "LayoutId": 0, "EndProductName": "", "ErpArticleNumber": "", "NewSalesOrderNo": 0, "OldSalesOrderNo": null, "OldDetailSumm": null, "Id": 37427385, "Error": "" }, "ServiceLevel": { "DeliveryTime": 0, "ErpCode": "0 ", "IsDefault": false, "Description": "Not Set", "FormattedServiceLevel": "0 Hours", "IntegrateCode": null, "Id": 0, "Error": "" }, "PartnerName": "DAYTON OHIO LASER", "OrderDate": "2015-12-03T21:13:16.727", "OrderedBy": null, "ShippingClass": "REGULAR", "OrderTrackingNumber": { "ProductionOrderId": 0, "CourierName": null, "TrackingUrl": null, "AwbNumber": null, "Id": -1, "Error": "" }, "Status": "Open", "IsCatalogPo": false, "InvoiceNumber": null, "Id": -1, "Error": "" }], "StagedOrderLineList": [], "ErrorMessage": "", "ReleasedBy": "marshall_admin", "Email": "prakash.patel@checkpt.com", "Phone": "123456788"
                           };

                           $scope.order.OrderNumber = '';
                           $scope.order.ShoppingCart = '';
                           $scope.order.SalesOrderNo = '';
                         
                         
                           kendo.mobile.application.pane.loader.show();
                         
                           
                           orderDataService.getOrderDetail(poctrlno).then(function (result) {
                               result = staticData; // remove after DEMo
                                   $scope.order.OrderNumber = result.MobileOrderDetail.OrderNumber;
                                   $scope.order.ShoppingCart = result.MobileOrderDetail.ShoppingCartId;
                                   $scope.order.SalesOrderNo = result.MobileOrderDetail.SalesOrderNumber;

                                   $scope.order.detail = result;
                                   $scope.trackingList = result.MobileOrderDetail.OrderTrackingNumberList;
                                  
                                   $scope.trackingCount = $scope.trackingList.length;
                                   $("#btn_tracking").data("kendoMobileButton").badge($scope.trackingCount);

                               }).catch(function (error) {
                                   $scope.order.detail = {};
                                   // reomve after DEMO - below code
                                   var result = staticData; // remove after DEMo
                                   $scope.order.OrderNumber = result.MobileOrderDetail.OrderNumber;
                                   $scope.order.ShoppingCart = result.MobileOrderDetail.ShoppingCartId;
                                   $scope.order.SalesOrderNo = result.MobileOrderDetail.SalesOrderNumber;

                                   $scope.order.detail = result;
                                   $scope.trackingList = result.MobileOrderDetail.OrderTrackingNumberList;

                                   $scope.trackingCount = $scope.trackingList.length;
                                   $("#btn_tracking").data("kendoMobileButton").badge($scope.trackingCount);
                                 
                               }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                         
                       }; // end message

                      
                       $scope.showTrakcingListModal = function () {
                         
                        
                           console.log($scope.trackingList[0].TrackingUrl);
                           if ($scope.trackingCount > 1) {
                               $("#modalview-trackingList").kendoMobileModalView("open");
                           }
                           else {
                               var url = $scope.trackingList[0].TrackingUrl;
                               window.open(url, '_system');
                           }
                       }

                       $scope.showTracking = function (url) {
                          
                           window.open(url, '_system');
                         
                       }
                       $scope.send = function () {
                           if (isTrackingActive && typeof (EqatecAnalytics) !== 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.orderDetail.send");
                           }
                           kendo.mobile.application.pane.loader.show();
                           $scope.feedbackData.comment = $scope.inqueryComment + " Order Information: Order Number : " + $scope.order.OrderNumber + " Shopping Cart Id : " + $scope.order.ShoppingCart + " Sales Order No : " + $scope.order.SalesOrderNo;
                           feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
                               if (result === 'success') {
                                   $scope.inqueryMessage = $scope.form.thankyou.resoruceValue;
                                   $timeout(function () {
                                       $scope.inqueryComment = "";
                                       $scope.feedbackData.comment = "";
                                       $scope.inqueryMessage = "";
                                   }, 7000);

                                   $scope.feedbackData.comment = "";
                               } else {
                                   $scope.feedbackData.comment = "";
                                   $scope.inqueryMessage = "";
                                   $timeout(function () {
                                       $scope.inqueryMessage = "";
                                   }, 7000);
                               }
                           }).catch(function (error) {
                               $scope.feedbackData.comment = "";
                               $scope.inqueryMessage = $scope.form.faildInquiry.resoruceValue;
                               $timeout(function () {
                                   $scope.inqueryMessage = "";
                               }, 7000);

                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }


                       $scope.approved = function (status) {
                           orderApprovalByStatus(status);
                       }

                       //appprove order
                       var orderApprovalByStatus = function (statusUpdate) {
                           var salesorders = [];

                           var solist = {
                               SalesOrderNo: $scope.SalesOrderNo,
                               Comment: $scope.orderApprovalComment
                           };
                           salesorders.push(solist);
                           var data = {
                               RetailerId: $scope.selectedRetailer,
                               Salesorders: salesorders,
                               UpdateStatus: statusUpdate,
                           }
                           kendo.mobile.application.pane.loader.show();
                           orderDataService.approveDecline(data).then(function (result) {
                               $scope.apporvalMessage = "Approve / Decliend Successfully";
                               $timeout(function () {
                                   $scope.apporvalMessage = "";                                   
                                   $scope.order.hasApproval = false;
                               }, 5000);

                               kendo.mobile.application.pane.loader.hide();


                           }).catch(function (error) {
                               kendo.mobile.application.pane.loader.hide();
                               $scope.apporvalMessage = "Approve / Decliend failed";
                               $timeout(function () {
                                   $scope.apporvalMessage = "";
                               }, 7000);
                           });
                          
                       }
                       //tracking modal 
                     
                       $scope.closeTrackingListModel = function () {
                           $("#modalview-trackingList").kendoMobileModalView("close");
                       };
                
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);