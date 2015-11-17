
app.controller('orderlistController', [
                   '$scope', 'authService', 'orderDataService', 'homeDataService','$sce',  'translateService',
                   function ($scope, authService, orderDataService, homeDataService, $sce,  translateService) {
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Order List";
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



                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;

                       $scope.order.title = 'Order List';
                       $scope.order.detail = {};
                       $scope.order.orders = {};
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
                              $scope.order.title = 'Shopping Cart Detail';
                              $scope.order.orderType = orderType;
                              $scope.searchParameterId = parameterId;
                         
                           if (orderType === '1'){
                                  $scope.order.hasApproval = true;
                           }
                           getOrderList();
                       }
                        //retailers with count
                   


                       homeDataService.getOrderHeaderData().then(function (result) {
                           $scope.order.orders = result;
                     
                       });
                        var getOrderList = function () {
                            
                           kendo.mobile.application.pane.loader.show();
                        
                           orderDataService.getOrderList().then(function (result) {
                               $scope.order.list = result;
                             
                           }).catch(function(error) {
                               $scope.mesages = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                        }; // end message

                      
                       //
                        $scope.headerClick = function (index) {
                            $('.list-view-detail-' + index).toggle();
                            if ($('.ck-icon-toggge-' + index).hasClass('km-plus')) {
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