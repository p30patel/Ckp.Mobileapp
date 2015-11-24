
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService','$sce', 'translateService', 'feedbackDataService', '$timeout',
                   function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, $timeout) {
                       window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderDetail");
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
                           getOrderDetail();
                       }
                      
                       var getOrderDetail = function () {

                           $scope.order.detail = [{ "OrderNumber": null, "ShoppingCart": null, "SalesOrderNo": null, "VendorRef": null, "Status": null, "DateInSystem": null, "OrderDate": null, "BillToAddress": { "AddressType": 102, "PoCtrlNo": 409021856, "integrateErpCode": null, "Id": 52067644, "Name": "TJX COMPANY", "Contact": "Accounting Dept", "Street1": "The TJX Companies, Inc", "Street2": "", "Street3": "", "Street4": "", "ZipCode": "01701", "City": "Framingham", "County": "", "StateProv": "MA", "CountryName": "UNITED STATES", "Iso3166": "US", "Phone": "610-456-1234", "Fax": "", "Email": "Tjx@Tjx.com", "VAT": "", "ERPRefCode": "162389", "StoreNumber": "", "TaxIdNo": "", "POBox": "9133", "CheckSum": 44376563, "Error": "" }, "ShipToAddress": { "AddressType": 103, "PoCtrlNo": 409021856, "integrateErpCode": null, "Id": 52067643, "Name": "TJX Companies", "Contact": "John Doe", "Street1": "500 Old Connecticut Path#101", "Street2": "Address2", "Street3": "add3", "Street4": "add4", "ZipCode": "01701", "City": "FRAMINGHAM", "County": "MIDDLESEX", "StateProv": "MA", "CountryName": "UNITED STATES", "Iso3166": "US", "Phone": "1-800-203-0293", "Fax": "", "Email": "john.doe@tjx.com", "VAT": "", "ERPRefCode": "", "StoreNumber": "", "TaxIdNo": "", "POBox": "", "CheckSum": -621261430, "Error": "" }, "OrderDetailData": [{ "ProductionOrderLineId": 37424341, "SalesOrderNumber": 178002732, "ItemCode": 26622, "CustItemCode": "52", "ItemDescription": "52 Marshalls Coordinate- Pink Tag - MAR 1103", "Quantity": 1, "Status": "In Process", "EstimatedShipDate": "2014-11-14T04:33:00", "ShipDate": null, "OrderTrackingNumber": { "ProductionOrderId": 0, "CourierName": 'USPS', "TrackingUrl": 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=9505500004115234000055', "AwbNumber": null, "Id": -1, "Error": "" }, "Courier": null, "ServiceLevel": { "DeliveryTime": 0, "ErpCode": "0 ", "IsDefault": false, "Description": "Not Set", "FormattedServiceLevel": "0 Hours", "IntegrateCode": "0 ", "Id": 0, "Error": "" }, "InvoiceNumber": null, "ConsolidatedInvoiceNumbers": [], "BillingLocation": "US Integrate", "PrintingLocation": "DAYTON OHIO LASER", "ShipmentDeliveryInfoList": [], "ProductionId": 0, "ProductionOrderLineFields": [], "Id": -1, "Error": "" }, { "ProductionOrderLineId": 37424342, "SalesOrderNumber": 178002732, "ItemCode": 28932, "CustItemCode": "82R", "ItemDescription": "82R Marshalls Removable Gum on Roll - MR 1351", "Quantity": 1, "Status": "In Process", "EstimatedShipDate": "2014-11-14T04:33:00", "ShipDate": null, "OrderTrackingNumber": { "ProductionOrderId": 0, "CourierName": null, "TrackingUrl": null, "AwbNumber": null, "Id": -1, "Error": "" }, "Courier": null, "ServiceLevel": { "DeliveryTime": 0, "ErpCode": "0 ", "IsDefault": false, "Description": "Not Set", "FormattedServiceLevel": "0 Hours", "IntegrateCode": "0 ", "Id": 0, "Error": "" }, "InvoiceNumber": null, "ConsolidatedInvoiceNumbers": [], "BillingLocation": "US Integrate", "PrintingLocation": "DAYTON OHIO LASER", "ShipmentDeliveryInfoList": [], "ProductionId": 0, "ProductionOrderLineFields": [], "Id": -2, "Error": "" }], "ProductionOrderData": { "RetailerName": "MARSHALLS", "VendorNumber": "", "ShipmentWeight": 1.0299999713897705, "Retailer": { "Name": "MARSHALLS", "Outbound": false, "Id": 6884, "Error": "" }, "Vendor": { "RetailerId": 6884, "VendorNumber": "", "BillingType": 1, "OrganizationId": 6884, "LobId": 0, "Name": null, "Id": 0, "Error": "" }, "OrderNumber": "CAT121200", "OrderReference1": null, "Status": 208, "StatusText": "Processing Data", "StagedOrderId": 0, "OrderLines": [{ "FormattedTotalWeight": "0.84 Kilogramm", "ProductionOrderId": 409021856, "Position": 1, "RetailerId": 6884, "SalesOrderLine": 100, "SalesOrderNo": 178002732, "Status": 0, "StatusDate": "2014-11-11T04:36:16.893", "StatusText": "New order", "Quantity": { "Value": 1, "Uom": { "Name": "Each", "ShortText": "EA", "UOMCode": 101, "SapCode": "PCE", "TypeId": 0, "IntegrateCode": "EA", "UomDisplay": "per Piece", "Id": 101, "Error": "" } }, "LineItemCount": 0, "StagedOrderLineId": 0, "ProductionId": 0, "HasLineItems": false, "InvoiceNumber": "0", "AwbNumber": "", "GrossCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "PriceUnit": 1000, "PriceUom": { "Name": "PER 1000 PIECES", "ShortText": "/1000", "UOMCode": 102, "SapCode": "MIL", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "per 1000 pcs", "Id": 102, "Error": "" }, "GrossPrice": 11.0, "GrossValue": 0.01, "GrossExchangeRate": 1.0, "FreightCost": 0.0, "ErpFreightCost": 0.0, "FreightCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceUnit": 0, "ExpeditedServiceUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "ExpeditedServiceCharge": 0.0, "ExpeditedServiceRate": 0.0, "ExpeditedServiceCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceExchangeRate": 0.0, "DiscountUnit": 0, "DiscountUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "DiscountValue": 0.0, "DiscountRate": 0.0, "DiscountCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "DiscountExchangeRate": 0.0, "Vat": 0.32, "VatRate": 6.25, "ItemNetValue": 5.0, "RetailerProductCode": "52", "BaseCurrency": "USD", "UnitWeight": 0.8399999737739563, "TotalWeight": 0.84, "WeightUOM": { "Name": "Kilogramm", "ShortText": "KG", "UOMCode": 166, "SapCode": "KGM", "TypeId": 0, "IntegrateCode": "KG", "UomDisplay": "per Kgrams", "Id": 166, "Error": "" }, "ParcelNumber": null, "Courier": null, "SendToERP": false, "BOD902CtrlNo": 0, "BOD902StatusCode": null, "BOD902Courier": null, "DateAtPrintshop": null, "DatePrinted": null, "BOD902ShipDt": null, "BOD012Status": 0, "ProcessedBOD905": false, "ShipmentEmailStatus": 0, "BOD902QtyShipped": 0, "EstimatedShipDate": null, "ReRoute": false, "OldPrintshop": "", "DateRouted": null, "DivisionCode": "", "LastShipQty": 0, "TotalShipQty": 0, "LastShipFreight": 0.0, "IsPartial": false, "ErpDeliveryDate": null, "ImprintFee": 0.0, "BaseStockPrice": 0.0, "ShippingWeight": 0.0, "RetailerOrderLineId": "", "LineItems": [], "OrderLineFields": [], "DueDate": null, "ProductionDate": null, "ShipDate": null, "CancelDate": null, "IsCancelled": false, "IsProduced": false, "IsShipped": false, "LineItemsTable": [], "ReceiverReference": "", "PriceUomName": "PER 1000 PIECES", "ExpeditedServiceUomName": "Not set", "DiscountUomName": "Not set", "FormattedGrossPrice": "USD 11.00 per 1000 pc", "FormattedFreightCost": "USD 0.00", "FormattedExpeditedServiceCharge": "USD 0.00", "FormattedDiscountValue": "USD 0.00", "FormattedVat": "USD 0.32", "FormattedNetValue": "USD 5.00", "OrderNumber": null, "IsSelected": false, "PrintshopFreightCost": 0.0, "PrintshopFreightCurrency": "", "IsManualFreight": false, "ErpProductionStatus": 0, "ErpDeliveryStatus": 0, "ERPProductionMessage": "", "ERPDeliveryMessage": "", "Surcharge": 4.99, "BackOrderedOrderLine": null, "BackOrderedMessage": null, "FormattedAmount": 4.9999997711181638, "QuantityMultiplier": 1, "ShoppingCartOrderLineId": 0, "BimSalesOrderNumber": "", "IsExplosionItem": false, "ShipmentWeight": 0.8399999737739563, "ProductId": 26622, "ProductName": "52 Marshalls Coordinate- Pink Tag - MAR 1103", "ArticleNumber": "1011283", "EndProductId": 14519, "LayoutId": 0, "EndProductName": "", "ErpArticleNumber": "", "NewSalesOrderNo": 0, "OldSalesOrderNo": null, "OldDetailSumm": null, "Id": 37424341, "Error": "" }, { "FormattedTotalWeight": "0.19 Kilogramm", "ProductionOrderId": 409021856, "Position": 2, "RetailerId": 6884, "SalesOrderLine": 200, "SalesOrderNo": 178002732, "Status": 0, "StatusDate": "2014-11-11T04:36:16.94", "StatusText": "New order", "Quantity": { "Value": 1, "Uom": { "Name": "Each", "ShortText": "EA", "UOMCode": 101, "SapCode": "PCE", "TypeId": 0, "IntegrateCode": "EA", "UomDisplay": "per Piece", "Id": 101, "Error": "" } }, "LineItemCount": 0, "StagedOrderLineId": 0, "ProductionId": 0, "HasLineItems": false, "InvoiceNumber": "0", "AwbNumber": "", "GrossCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "PriceUnit": 1000, "PriceUom": { "Name": "PER 1000 PIECES", "ShortText": "/1000", "UOMCode": 102, "SapCode": "MIL", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "per 1000 pcs", "Id": 102, "Error": "" }, "GrossPrice": 12.0, "GrossValue": 0.01, "GrossExchangeRate": 1.0, "FreightCost": 0.0, "ErpFreightCost": 0.0, "FreightCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceUnit": 0, "ExpeditedServiceUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "ExpeditedServiceCharge": 0.0, "ExpeditedServiceRate": 0.0, "ExpeditedServiceCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "ExpeditedServiceExchangeRate": 0.0, "DiscountUnit": 0, "DiscountUom": { "Name": "Not set", "ShortText": "N/A", "UOMCode": 0, "SapCode": "0", "TypeId": 0, "IntegrateCode": "", "UomDisplay": "N/A", "Id": 0, "Error": "" }, "DiscountValue": 0.0, "DiscountRate": 0.0, "DiscountCurrency": { "Code": "USD", "Description": "US Dollar", "Id": 1, "Error": "" }, "DiscountExchangeRate": 0.0, "Vat": 0.31, "VatRate": 6.25, "ItemNetValue": 5.0, "RetailerProductCode": "82R", "BaseCurrency": "USD", "UnitWeight": 0.18999999761581421, "TotalWeight": 0.19, "WeightUOM": { "Name": "Kilogramm", "ShortText": "KG", "UOMCode": 166, "SapCode": "KGM", "TypeId": 0, "IntegrateCode": "KG", "UomDisplay": "per Kgrams", "Id": 166, "Error": "" }, "ParcelNumber": null, "Courier": null, "SendToERP": false, "BOD902CtrlNo": 0, "BOD902StatusCode": null, "BOD902Courier": null, "DateAtPrintshop": null, "DatePrinted": null, "BOD902ShipDt": null, "BOD012Status": 0, "ProcessedBOD905": false, "ShipmentEmailStatus": 0, "BOD902QtyShipped": 0, "EstimatedShipDate": null, "ReRoute": false, "OldPrintshop": "", "DateRouted": null, "DivisionCode": "", "LastShipQty": 0, "TotalShipQty": 0, "LastShipFreight": 0.0, "IsPartial": false, "ErpDeliveryDate": null, "ImprintFee": 0.0, "BaseStockPrice": 0.0, "ShippingWeight": 0.0, "RetailerOrderLineId": "", "LineItems": [], "OrderLineFields": [], "DueDate": null, "ProductionDate": null, "ShipDate": null, "CancelDate": null, "IsCancelled": false, "IsProduced": false, "IsShipped": false, "LineItemsTable": [], "ReceiverReference": "", "PriceUomName": "PER 1000 PIECES", "ExpeditedServiceUomName": "Not set", "DiscountUomName": "Not set", "FormattedGrossPrice": "USD 12.00 per 1000 pc", "FormattedFreightCost": "USD 0.00", "FormattedExpeditedServiceCharge": "USD 0.00", "FormattedDiscountValue": "USD 0.00", "FormattedVat": "USD 0.31", "FormattedNetValue": "USD 5.00", "OrderNumber": null, "IsSelected": false, "PrintshopFreightCost": 0.0, "PrintshopFreightCurrency": "", "IsManualFreight": false, "ErpProductionStatus": 0, "ErpDeliveryStatus": 0, "ERPProductionMessage": "", "ERPDeliveryMessage": "", "Surcharge": 4.99, "BackOrderedOrderLine": null, "BackOrderedMessage": null, "FormattedAmount": 4.9999997711181638, "QuantityMultiplier": 1, "ShoppingCartOrderLineId": 0, "BimSalesOrderNumber": "", "IsExplosionItem": false, "ShipmentWeight": 0.18999999761581421, "ProductId": 28932, "ProductName": "82R Marshalls Removable Gum on Roll - MR 1351", "ArticleNumber": "1012000", "EndProductId": 5397, "LayoutId": 0, "EndProductName": "", "ErpArticleNumber": "", "NewSalesOrderNo": 0, "OldSalesOrderNo": null, "OldDetailSumm": null, "Id": 37424342, "Error": "" }], "OrderFields": [], "HasOrderFields": false, "ServiceLevel": { "DeliveryTime": 0, "ErpCode": "0 ", "IsDefault": false, "Description": "Not Set", "FormattedServiceLevel": "0 Hours", "IntegrateCode": null, "Id": 0, "Error": "" }, "ImportDate": null, "FormattedImportDate": "", "DueDate": "2014-11-14T04:32:34.9", "DispatchDate": null, "SalesOrderId": 1205923, "ServiceLevelDescription": "Not Set", "BillingType": 4, "ConcernId": 0, "DepartmentId": 0, "SeasonId": 0, "TotalWeight": 1.03, "MaxPosition": 2, "CustPODateRef": "", "SalesSubId": 123, "ERPPONumber": "", "ERPSystemId": 103, "ShoppingCartId": 7691, "DateInSystem": "2014-11-11T04:36:00", "DateSOCreated": "2014-11-11T04:48:00", "AWBNumber": "", "Courier": "", "ShippingClass": "REGULAR", "PartnerId": 109652, "FreightCharge": 0.0, "DateInvoiced": null, "InvoiceRefNo": "", "PaymentStatus": 0, "PaymentRefNo": 1065882, "UserID": 100396, "SessionNo": 0, "DateStatusChanged": "2014-11-10T20:48:00", "OrderHeaderData": "", "HasText": false, "POHeaderText": "", "IsCatalogPO": true, "AutoReleaseDate": null, "CourierAcctNo": "", "MinOrderCharge": 0.0, "MinOrderCurrency": "USD", "FactoryId": 0, "BOD186PaymentRef": 0, "ReleasedByOrgId": 6884, "SpInvoiceInstrs": "", "IsAutoReOrder": false, "CourierServiceType": "", "CourierServiceOpt": "", "EstimatedShipDate": "2014-11-14T04:33:00", "InstallationSchedReqd": false, "OraOrderTypeID": 0, "RequestedShipDate": null, "HasInstallCharges": false, "InstallationCharge": 0.0, "InstallFeeERPCode": "", "IsReOrder": false, "EDIFileCreated": 0, "CustomerRequestDate": null, "CutNumber": "", "SearchKeyValue": "", "ASNDate": null, "ERPSystemRef": "105", "OracleOrderTypeID": 2453, "OrganizationName": "MARSHALLS", "ERPRefCode": "162389", "PaymentTypeCode": 106, "AmountPaid": 10.63000, "CreditCardType": null, "NameOnCard": null, "PNRef": "", "SalesPersonName": "MC DONNELL, ROBERT", "Description": "Not Set", "ReceiverReference": "", "IsForRelease": true, "SearchKeyValue2": null, "SearchKeyValue3": null, "DeliveryAddress": null, "InvoiceAddress": null, "IsSPP": false, "UserName": null, "QuantityOverage": 0.0, "Id": 409021856, "Error": "" }, "ErrorMessage": "", "ReleasedBy": "rjmarshallsc", "Email": "roland.necor@checkpt.com", "Phone": "1234567890" }];

                           console.log($scope.order.detail[0].ReleasedBy);
                           $scope.order.OrderNumber = $scope.order.detail[0].ProductionOrderData.OrderNumber;
                           $scope.order.ShoppingCart =  $scope.order.detail[0].ProductionOrderData.ShoppingCartId;
                           $scope.order.SalesOrderNo = $scope.order.detail[0].ProductionOrderData.OrderLines[0].SalesOrderNo;
                         
                           var tracking = new Date().getMinutes() % 2 == 0 ? 1 : 2;
                           $scope.trackingCount = tracking;
                           $("#btn_tracking").data("kendoMobileButton").badge(tracking);
                           //kendo.mobile.application.pane.loader.show();
                          
                           //orderDataService.getOrderDetail().then(function (result) {
                           //    $scope.order.detail = result;
                           
                           //}).catch(function(error) {
                           //    $scope.mesages = {};
                           //}).finally(function() {
                           //    kendo.mobile.application.pane.loader.hide();
                           //});
                       }; // end message

                      
                       $scope.showTrakcingListModal = function () {
                         
                           $scope.trackingList = [{
                               'Url': "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=9505500004115234000048",
                               'TrackingNumber': '9505500004115234000048'
                           }, {
                               'Url': "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=9505500004115234000055",
                               'TrackingNumber': '9505500004115234000055'

                           }];
                           console.log($scope.trackingCount);
                           if ($scope.trackingCount > 1) {
                               $("#modalview-trackingList").kendoMobileModalView("open");
                           }
                           else {
                               var url = "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=9505500004115234000055";
                               window.open(url, '_system');
                           }
                       }

                       $scope.showTracking = function (url) {
                          
                           window.open(url, '_system');
                         
                       }
                       $scope.send = function () {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.orderDetail.send");
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