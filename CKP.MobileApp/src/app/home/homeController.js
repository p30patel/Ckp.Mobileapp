
app.controller('homeController', [
                  '$rootScope', '$scope', '$http', 'authService', 'localStorageService', '$timeout', 'homeDataService', 'parameterService', '$filter', 'translateService', 'messageDataService', 'orderDataService', '$sce', '$window',
                   function ($rootScope, $scope, $http, authService, localStorageService, $timeout, homeDataService, parameterService, $filter, translateService, messageDataService, orderDataService, $sce, $window) {
                       $scope.beforeShow = function () {
                           kendo.mobile.application.pane.loader.show();
                           if (!authService.authentication.isAuth) {                               
                               authService.logout();
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                           kendo.mobile.application.pane.loader.hide();

                       };                     
                     
                       $scope.form = {};
                       $scope.mesages = {};
                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Home";
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

                       var setResources = function () {
                           $scope.form.attentionUser = {};
                           $scope.form.attentionUser.resoruceName = "Attension User";
                           $scope.form.attentionUser.resoruceValue = translateService.getResourceValue($scope.form.attentionUser.resoruceName);

                           $scope.form.creditLock = {};
                           $scope.form.creditLock.resoruceName = "Credit Lock";
                           $scope.form.creditLock.resoruceValue = translateService.getResourceValue($scope.form.creditLock.resoruceName);


                           $scope.form.creditLockMessage = {};
                           $scope.form.creditLockMessage.resoruceName = "Credit Lock Message";
                           $scope.form.creditLockMessage.resoruceValue = translateService.getResourceValue($scope.form.creditLockMessage.resoruceName);

                           $scope.form.approval = {};
                           $scope.form.approval.resoruceName = "Approve Orders";
                           $scope.form.approval.resoruceValue = translateService.getResourceValue($scope.form.approval.resoruceName);

                           $scope.form.yes = {};
                           $scope.form.yes.resoruceName = "Approve";
                           $scope.form.yes.resoruceValue = translateService.getResourceValue($scope.form.yes.resoruceName);

                           $scope.form.no = {};
                           $scope.form.no.resoruceName = "Decline";
                           $scope.form.no.resoruceValue = translateService.getResourceValue($scope.form.no.resoruceName);

                           $scope.form.comment = {};
                           $scope.form.comment.resoruceName = "Comment";
                           $scope.form.comment.resoruceValue = translateService.getResourceValue($scope.form.comment.resoruceName);

                           $scope.form.alertsAndNews = {};
                           $scope.form.alertsAndNews.resoruceName = "Alerts and News";
                           $scope.form.alertsAndNews.resoruceValue = translateService.getResourceValue($scope.form.alertsAndNews.resoruceName);

                           $scope.form.viewAll = {};
                           $scope.form.viewAll.resoruceName = "View All";
                           $scope.form.viewAll.resoruceValue = translateService.getResourceValue($scope.form.viewAll.resoruceName);


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

                           $scope.form.orderStatus = {};
                           $scope.form.orderStatus.resoruceName = "Status";
                           $scope.form.orderStatus.resoruceValue = translateService.getResourceValue($scope.form.orderStatus.resoruceName);

                           $scope.form.orderDate = {};
                           $scope.form.orderDate.resoruceName = "Order Date";
                           $scope.form.orderDate.resoruceValue = translateService.getResourceValue($scope.form.orderDate.resoruceName);

                           $scope.form.bulkApprove = {};
                           $scope.form.bulkApprove.resoruceName = "Bulk Approve";
                           $scope.form.bulkApprove.resoruceValue = translateService.getResourceValue($scope.form.bulkApprove.resoruceName);

                           $scope.form.dateInSystem = {};
                           $scope.form.dateInSystem.resoruceName = "Date In System";
                           $scope.form.dateInSystem.resoruceValue = translateService.getResourceValue($scope.form.dateInSystem.resoruceName);

                           $scope.form.releasedOrder = {};
                           $scope.form.releasedOrder.resoruceName = "Released";
                           $scope.form.releasedOrder.resoruceValue = translateService.getResourceValue($scope.form.releasedOrder.resoruceName);

                           $scope.form.newOrder = {};
                           $scope.form.newOrder.resoruceName = "New";
                           $scope.form.newOrder.resoruceValue = translateService.getResourceValue($scope.form.newOrder.resoruceName);

                           $scope.form.approvalOrder = {};
                           $scope.form.approvalOrder.resoruceName = "Approval";
                           $scope.form.approvalOrder.resoruceValue = translateService.getResourceValue($scope.form.approvalOrder.resoruceName);

                           $scope.form.search = {};
                           $scope.form.search.resoruceName = "Search";
                           $scope.form.search.resoruceValue = translateService.getResourceValue($scope.form.search.resoruceName);

                       }

                       setResources();

                       if (isTrackingActive) {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.Home");
                       }
                       if ($window.ga) {
                          
                           $window.ga('send', 'pageview', { page: 'Home View-GA' });
                         
                       }
                       $scope.message = "";
                       $scope.messageCount = 0;

                       $scope.hasCreditLock = false;
                       $scope.hasSearch = false;
                       $scope.hasListView = false;
                       $scope.hasDetailView = false;
                       $scope.selectedRetailer = 0;
                       $scope.selectedOrderType = 0;
                       $scope.currentSearchInput = '';

                       $scope.searchParameterId = 1;                     
                       $scope.parameters = parameterService.getSearchParameters();

                       $scope.isAuth = authService.authentication.isAuth;

                                            
                       var setSelectPara = function () {
                           parameterService.getSearchParameterName($scope.selectedPara)
                           $scope.searchParameterId = $scope.selectedPara;

                           $scope.currentSearchInput = $scope.searchValue;
                       }

                       setSelectPara();

                       $scope.intShow = function (e) {
                           setSelectPara();
                       }
                       $scope.languages = parameterService.getSearchParameters();
                       $scope.clearSearch = function () {
                           $scope.searchValue = "";
                       }

                       //retailers with count
                       $scope.orderCounts = {};

                  

                       var getOrderCounts = function () {
                           $scope.hasSearch = false;
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {

                               $scope.orderCounts = result;

                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });

                       }
                       //get ordetrs
                       var getOrders = function (orderType, searchParamterId, searchInput) {

                           $scope.message = "Loading : Order Type: " + orderType + " SearchParmeter : " + searchParamterId + "Search Input: " + searchInput;

                           $timeout(function () {
                               $scope.message = "";
                           }, 7000);

                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderHeaderData().then(function (result) {
                               kendo.mobile.application.pane.loader.hide();
                               $scope.orders = result;
                           }).catch(function (error) {
                               $scope.orders = {};
                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }


                       //button group events
                       $scope.retailerHeader = function () {
                           var listviews = $("ul.order-header.km-listview");
                           listviews.hide();
                           var buttongroup = $(".buttongroup-home").data("kendoMobileButtonGroup");

                           $(".ck-count-btn").removeClass('km-state-active');
                       }
                       $scope.myOptions = {
                           select: function (e) {

                               var selectedBtnRetailer = e.sender.element.attr('data-btnRetailer');

                               $scope.selectedRetailer = selectedBtnRetailer;

                               var listviews = $("ul.order-header.km-listview");

                               listviews.hide();

                               var listviewsToShow = $("ul.km-listview").filter("[data-retailer='" + selectedBtnRetailer + "']");

                               listviewsToShow.eq(e.index).show();

                               var selectedOrderType = listviewsToShow.eq(e.index).attr('data-orderType');

                               $scope.selectedOrderType = parameterService.getOrderTypeById(selectedOrderType);

                               var buttongroup = $(".buttongroup-home").data("kendoMobileButtonGroup");


                               getOrders(selectedOrderType, $scope.searchParameterId, $scope.currentSearchInput);
                           }
                       }
                       //end button group events
                       //alerts & news - messages

                       var getMessages = function () {
                           var data = localStorageService.get('organizationDetail');
                           if (data !== null) {
                               $scope.hasCreditLock = data.CreditStatus === "Blocked";

                               kendo.mobile.application.pane.loader.show();
                               $("#btn_message").data("kendoMobileButton");

                               messageDataService.getMessages().then(function (result) {
                                   $scope.mesages = result;
                                   $scope.messageCount = result.AnnouncementList.length + result.PartnerHolidayList.length;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);

                               }).catch(function (error) {
                                   $scope.mesages = {};
                                   $scope.messageCount = 0;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);
                               }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                           }


                       }; // end message

                                    
                       getMessages();
                       getOrderCounts();

                       $scope.selectedRetailer = 0;
                       $scope.setSearhParamter = function (para) {
                           $scope.selectedPara = parameterService.getSearchParameterName(para);

                           $scope.searchParameterId = para;
                       }
                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.orderList = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }
                    
                       $scope.key = function ($event) {
                        
                           if ($event.keyCode === 13) {
                               $event.target.blur();
                               forceGetData = true;
                               $scope.hasSearch = true;
                               setSelectPara();
                               getOrderCounts();

                           }
                       }
                       //view more orders
                       $scope.showMoreOrderModel = function () {
                        
                           $("#modalview-moreOrder").kendoMobileModalView("open");
                       };
                       $scope.hideMoreOrderModel = function () {
                         
                           $("#modalview-moreOrder").kendoMobileModalView("close");
                       };
                       $scope.headerClick = function (index)
                       {
                           $('.list-view-detail-' + index).toggle();
                           if ($('.ck-icon-toggge-' + index).hasClass('km-plus'))
                           {
                               $('.ck-icon-toggge-' + index).removeClass('km-plus');
                               $('.ck-icon-toggge-' + index).addClass('km-minus');

                           }
                           else {
                               $('.ck-icon-toggge-' + index).addClass('km-plus');
                               $('.ck-icon-toggge-' + index).removeClass('km-minus');
                           }
                       }
                       $scope.confiramtionConent = "";
                       //confiramtion modal
                       $scope.showConfirmationModel = function () {
                           $scope.confiramtionConent = '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Order Confirmation</title><style type="text/css">{ min-width: 940px; max-width: 1200px; }div.container {max-width: 1200px; width:1000px; margin: 1%; }.hidden{ display: none;}div.prop { width: 100%; height: 60px; background-color: white; margin-left: auto; margin - right; auto; text-align: center; font-size: 8pt; color: black; letter-spacing: 1pt; padding: 10px; }div.graybar { border: 0px; border-radius: 3px; background: #cfcfcf; min-height: 30px; width: 100%; z-index: 0; }div.contents { border: 0px; border-radius: 3px; background: #cfcfcf; width: 100%; }div.notes { top: 40px; right: 20px; text-align: right; font-size: 14pt; }div.notes2 { top: 65px; right: 20px; text-align: right; font-size: 10pt; }table.contactus { width: 800px; font-size: 8pt; margin-left: auto; margin-right: auto; z-index: 0; border:10px; }table.maincontainer { max-width: 1200px;min-width: 820px; margin-left: auto; margin-right: auto; z-index: 0; }.tmp { width: 200px; }.widthZero { width:100%;}.widthSize { width:98%; min-width: 820px; font-size:12px;}tr.confirmationHtmlWidth td { width: 200px; }table.maincontainer .confirmationHtmlWidth td { width: 200px; }.table { text-align : left;}.div-border { border: 1px solid;border-color: #e1e1e1;  padding: 10px;min-width: 820px;}.span3 {width: 14%;}.order-information h5 {  display: inline;}.row-fluid [class*="span"]:first-child {margin-left: 0;} h3 {font-size: 24.5px;}.row-fluid .span10 {width: 82.97872340425532%;} .row-fluid .span2 {width: 14.893617021276595%;} .span9 {width: 700px; } .span5 {width: 380px;  }  .span2 {width: 140px; } .k-block, .k-grid-header, .k-toolbar, .k-grouping-header, .k-pager-wrap, .k-button,.k-draghandle {background-color: #e3e3e3;text-align: left;}.alert { padding: 8px 35px 8px 14px;margin-bottom: 20px;text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);background-color: #fcf8e3; border: 1px solid #fbeed5; -webkit - border-radius: 4px; -moz - border-radius: 4px;border-radius: 4px; }.alert-error {color: #b94a48;background-color: #f2dede;border-color: #eed3d7; font-weight: bold;text-align: center;}.text-left {text-align: left; }.text-center {text-align: center; }.text-right {text-align: right; }  .fontStyle { font-family:"Helvetica", "Arial", "Lucida Grande" } td, th { font-size: 12px;}</style></head><body><div class="container fontStyle"><table class="mainContainer widthSize"><tbody><tr><td><img src="https://checknet.checkpt.com/images/consemail_CheckNet1.png"></td><td><div class="notes"><b>Order Confirmation</b></div><div class="notes2">Wed Nov 04 2015 </div></td></tr><tr><td colspan="2"><div class="graybar"></div></td></tr><tr><td colspan="2"></td></tr><tr><td colspan = "2"><div id="confirmationHeader"><p class="confirmationHeader">Your order has been submitted. Your shopping cart number is # <b><span id="shopCartNo">11161</span></b>.</p><div id="confirmationPage"><div id="headerData"><span class="confirmationHtml" id="orgName"><h4>Abercrombie &amp; Fitch</h4><b>Retailer Name :  </b> Abercrombie &amp; Fitch</span><p class="confirmationHtml"><b>Released by :</b><span id="releaseBy">rjafvendoraf&nbsp;&nbsp;<b> Email :</b> 1@1.ccc&nbsp;&nbsp;<b> Phone Number :</b> 123456789</span></p></div><div id="alertData"></div><div id="girdDataHtml"><div class="confirmationHtml div-border" id="gridHeader0"><table class="row-fluid confirmationHtml"><tbody><tr class="confirmationHtmlWidth" valign="top"><td class="billTo"><b>Bill To Information</b><div id="billToAddress"><p>Abercrombie &amp; Fitch<br>Tim Walker<br>Abercrombie &amp; Fitch<br>6301 Fitch Path<br>NEW ALBANY, OH, 43054, US</p></div></td><td class="shipTo"><b>Ship To Information</b><div id="shipToAddress"><p>Abercrombie &amp; Fitch<br>Rosy Caruso<br>Abercrombie &amp; Fitch<br>101 Wolf Drive<br>NEW ALBANY, 43054, VN</p></div></td><td><b>Shopping Cart : </b> 11161 <br><b>Order Date : </b> 11/4/2015<br></td><td><span><b>Shipping Type :</b> REGULAR <br></span><span><b>Service Level :</b> 3 Days <br></span><span class="confirmationHtml hidden" style="display: inline;"><b>Payment Type : </b><span class="paymentType">Invoice</span><br></span><span><b>Courier :</b><br></span><span><b>Account :</b><br></span></td></tr></tbody></table><br><div class="k-grid k-widget table table-striped row-fluid" id="gridgridHeader0" data-role="grid"><table class="confirmationHtmlWidth" role="grid"><colgroup><col style="width: 170px;"><col style="width: 150px;"><col style="width: 150px;"><col style="width: 170px;"><col style="width: 160px;"><col style="width: 250px;"><col style="width: 70px;"><col style="width: 200px;"><col style="width: 100px;"></colgroup><thead class="k-grid-header" role="rowgroup"><tr role="row"><th class="k-header" id="2894717a-79f0-4f47-af33-b9c04f640879" role="columnheader" rowspan="1" data-field="poNumber" data-title="Order Number" data-index="0">Order Number</th><th class="k-header" id="0fbb0d33-6bd1-4045-9c4e-e7ae929cb7eb" role="columnheader" rowspan="1" data-field="salesOrderNo" data-title="Sales Order" data-index="1">Sales Order</th><th class="k-header" id="be20d16e-9201-4efa-bb0d-4f6f9871e01e" role="columnheader" rowspan="1" data-field="vendorRefNo" data-title="Vendor Ref" data-index="2">Vendor Ref</th><th class="k-header" id="2a8e66c6-21c0-4b3d-9f38-5b2b30237475" role="columnheader" rowspan="1" data-field="prodctionLocation" data-title="Production Location" data-index="3">Production Location</th><th class="k-header" id="70b3ff54-5cc8-424b-83ea-082fc9f0df08" role="columnheader" rowspan="1" data-field="itemCode" data-title="Item Code" data-index="4">Item Code</th><th class="k-header" id="075d8ee1-65a1-40f6-b18e-1076dab1b48d" role="columnheader" rowspan="1" data-field="itemDescription" data-title="Item Description" data-index="5">Item Description</th><th class="k-header" id="2bda2240-b411-4d95-916e-386671313bc0" role="columnheader" rowspan="1" data-field="quantity" data-title="Quantity" data-index="6">Quantity</th><th class="k-header" id="e14ed29e-5aee-41ba-ba82-22bbd41f1157" role="columnheader" rowspan="1" data-field="quantityCurrencyPrice" data-title="Unit Price" data-index="7">Unit Price</th><th class="k-header" id="f1bdf503-324e-4141-b373-50cefa9241f7" role="columnheader" rowspan="1" data-field="amount" data-title="Amount ( USD )" data-index="8">Amount ( USD )</th></tr></thead><tbody role="rowgroup"><tr role="row" data-uid="5f3a7848-993f-4686-88f5-c1d8f129d088"><td role="gridcell"><span class="catalogorderNumber"> CAT123797 <span></span></span></td><td role="gridcell">178007289</td><td role="gridcell"><span class="vendorRefMandatory"> 11159 <span></span></span></td><td role="gridcell">Hong Kong Laser</td><td role="gridcell">H1-1</td><td role="gridcell">H1-1 AF Adult Price Ticket</td><td role="gridcell">1000</td><td role="gridcell">USD 10.00 per 1000 pcs</td><td role="gridcell"><span class="pull-right text-right" style="text-align: right;"> 12.50</span></td></tr><tr class="k-alt" role="row" data-uid="f3b03008-b39d-4683-82a3-ae3658f1c988"><td role="gridcell"><span class="catalogorderNumber"> CAT123797 <span></span></span></td><td role="gridcell">178007289</td><td role="gridcell"><span class="vendorRefMandatory"> 11159 <span></span></span></td><td role="gridcell">Hong Kong Laser</td><td role="gridcell">H1-3</td><td role="gridcell">H1-3 Hollister Price Ticket</td><td role="gridcell">1000</td><td role="gridcell">USD 10.00 per 1000 pcs</td><td role="gridcell"><span class="pull-right text-right" style="text-align: right;"> 12.50</span></td></tr></tbody></table></div><br><div id="gridFooter0"><div class="row-fluid"><table class="widthZero"><tbody><tr><td class="span9 text-right price"></td><td class="span5 text-right price" id="subtotalId" style="padding-right: 40px;"><b>Sub Total :</b></td><td class="span2 text-right price" id="subtotalValueId" style="padding-right: 10px;">25.00</td></tr></tbody></table></div></div></div><br></div><div id="confirmationGrandTotal"><div id="mainFooter"><div class="row-fluid"><table><tbody><tr><td class="span9"><p class="confirmationHtml hidden" style="display: block;">Shipping and tax charges are estimated at time of checkout. The final shipping and tax amount will be reflected on your invoice.</p><p class="confirmationHtml">Please note that customers are responsible to clear customs at destination and cover all charges related to the clearing process.</p><p class="confirmationHtml hidden" style="display: block;"></p><p class="orderInstruction confirmationHtml hidden" style="display: block;"><b>Order Instructions : </b><span id="orderInstruction"></span></p></td><td class="span5 price text-right" style="padding-right: 40px;"><p class="freight" id="freight" style="display: none;"><b>Shipping and Handling :</b></p><p class="taxExempt" id="taxtLable"><b>Taxes / Vat  :</b></p><p id="granTotallabel"><b>Grand Total :</b></p></td><td class="span2 price text-right" style="padding-right: 20px;"><p class="freight" id="frightValue" style="display: none;"><span id="shippingHandling">0.00</span></p><p class="taxExempt"><span id="taxesVat"></span>0.00</p><p><span id="grandTotal"><b>25.00</b></span></p></td></tr></tbody></table><hr></div></div></div><div id="helpDesk"><b>Help Desk </b>:THOROFARE  <b>Phone: </b> +1 (800) 257-5540, +1 (856) 848-1800<b> Fax</b>: +1 (856) 848-0937<b> E-Mail:</b> Checknet@checkpt.com</div></div></div></td ></tr><br><tr><td colspan="2"></td></tr><tr><td colspan="2"><div class="contents"><table class="contactus" style="BACKGROUND-COLOR: rgb(207,207,207)"><tbody><tr><td><span style="FONT-WEIGHT: 600"><b>Europe</b></span><br><br>Phone: +31 (0)880082 400<br>Fax: +31 (0)315 341161<br>E-mail: cs.checknet@eur.checkpt.com</td><td><span style="FONT-WEIGHT: 600"><b>Hong Kong</b></span><br><br>Phone: +852 2995-8272<br>Fax: +852 2527-8408<br></td><td><span style="FONT-WEIGHT: 600"><b>United States</b></span><br><br>Phone: +1 800 - 775 - 1802 <br>Fax: +1 937 - 866 - 1909 <br>E-mail: checknet@checkpt.com </td></tr></tbody></table ></div></td ></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"><div style="HEIGHT: 40px" class="text-center">If you need further assistance with your order, please sign into Checknet.checkpt.com or call/email one of our offices listed above.<br>This mailbox is not monitored.Please do not reply to this email.<br></div></td ></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"><div class="text-center"><img src="https://checknet.checkpt.com/images/consemail_checklogo.jpg"></div></td></tr></tbody></table></div></body></html>';
                      
                           $("#modalview-confirmation").kendoMobileModalView("open");
                       };
                       $scope.hideConfirmationModel = function () {

                           $("#modalview-confirmation").kendoMobileModalView("close");
                       };
                       //so - check box for approval
                       $scope.selection = [];
                       $scope.orderApprovalComment = "";
                       $scope.salesorderList = "";

                       $scope.toggleSelection = function toggleSelection(so) {
                           var idx = $scope.selection.indexOf(so);
                         
                           if (idx > -1) {
                               $scope.selection.splice(idx, 1);
                           } else {
                               $scope.selection.push(so);
                           }

                       };
                       $scope.viewAll = function (orderType, parameterId) {
                           kendo.mobile.application.navigate("src/app/order/order.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + "" + "&orders=" + $scope.orders);
                       }
                       $scope.approve = function () {
                           var salesorders = "";

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               salesorders += value + ',';
                           });
                           kendo.mobile.application.navigate("src/app/order/approve.html?orders=" + salesorders);
                       }
                       $scope.showAlertModel = function () {

                           $("#modalview-alerts").kendoMobileModalView("open");

                       };

                       $scope.hideAlertModel = function () {
                           $("#modalview-alerts").kendoMobileModalView("close");
                       };


                       //credit lock
                       $scope.showCreditModel = function () {
                           $('.order').hide();
                           $("#modalview-credit").kendoMobileModalView("open");
                       };
                       $scope.hideCreditModel = function () {
                           $('.order').hide();
                           $("#modalview-credit").kendoMobileModalView("close");
                       };
                       //approve modal

                       $scope.showApprovalModel = function (retailerId) {
                           var salesorders = "";
                           $scope.selectedRetailer = retailerId;
                          

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               salesorders += value + ',';
                           });
                           $scope.salesorderList = salesorders;
                           $("#modalview-approve").kendoMobileModalView("open");
                       };
                       $scope.hideApporvalModel = function () {
                           $scope.salesorderList = "";
                           $("#modalview-approve").kendoMobileModalView("close");
                       };

                       $scope.approved = function (status) {
                           orderApprovalByStatus(status);

                       }

                       //appprove order
                       var orderApprovalByStatus = function (statusUpdate) {
                           var salesorders = [];

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               if (value !== '') {
                                   var solist = {
                                       SalesOrderNo: value,
                                       Comment: $scope.orderApprovalComment
                                   };
                                   salesorders.push(solist);
                               }
                           });

                           var data = {
                               RetailerId: $scope.selectedRetailer,
                               Salesorders: salesorders,
                               UpdateStatus: statusUpdate,
                           }
                           kendo.mobile.application.pane.loader.show();
                           orderDataService.approveDecline(data).then(function (result) {
                               $scope.message = "Approve / Decliend Successfully";
                               $timeout(function () {
                                   $scope.message = "";
                                   $("#modalview-approve").kendoMobileModalView("close");
                               }, 5000);

                               kendo.mobile.application.pane.loader.hide();


                           }).catch(function (error) {
                               $scope.message = "Approve / Decliend failed";
                               $timeout(function () {
                                   $scope.message = "";
                               }, 7000);

                               kendo.mobile.application.pane.loader.hide();
                               //$("#modalview-approve").kendoMobileModalView("close");
                           });
                       }

                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };

                   }

]);