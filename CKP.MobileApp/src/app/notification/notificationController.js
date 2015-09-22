
app.controller('notificationController', ['$scope', '$http', '$sce', 'translateService',
    function ($scope, $http, $sce, translateService) {

        $scope.form = {};

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Notification Settings";
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

        $scope.form.orderReceived = {};
        $scope.form.orderReceived.resoruceName = "Order Received";
        $scope.form.orderReceived.resoruceValue = translateService.getResourceValue($scope.form.orderReceived.resoruceName);

        $scope.form.orderReceivedDesc = {};
        $scope.form.orderReceivedDesc.resoruceName = "Order Received Description";
        $scope.form.orderReceivedDesc.resoruceValue = translateService.getResourceValue($scope.form.orderReceivedDesc.resoruceName);



        $scope.form.orderApproval = {};
        $scope.form.orderApproval.resoruceName = "Order Approval";
        $scope.form.orderApproval.resoruceValue = translateService.getResourceValue($scope.form.orderApproval.resoruceName);

        $scope.form.orderApprovalDesc = {};
        $scope.form.orderApprovalDesc.resoruceName = "Order Approval Description";
        $scope.form.orderApprovalDesc.resoruceValue = translateService.getResourceValue($scope.form.orderApprovalDesc.resoruceName);

        $scope.form.orderApprovedStatus = {};
        $scope.form.orderApprovedStatus.resoruceName = "Approved/Declined Order";
        $scope.form.orderApprovedStatus.resoruceValue = translateService.getResourceValue($scope.form.orderApproval.resoruceName);

        $scope.form.orderApprovedStatusDesc = {};
        $scope.form.orderApprovedStatusDesc.resoruceName = "Approved/Declined Order Description";
        $scope.form.orderApprovedStatusDesc.resoruceValue = translateService.getResourceValue($scope.form.orderApprovedStatusDesc.resoruceName);


        $scope.form.shipment = {};
        $scope.form.shipment.resoruceName = "Shipment";
        $scope.form.shipment.resoruceValue = translateService.getResourceValue($scope.form.shipment.resoruceName);

        $scope.form.shipmentDesc = {};
        $scope.form.shipmentDesc.resoruceName = "Shipment Description";
        $scope.form.shipmentDesc.resoruceValue = translateService.getResourceValue($scope.form.shipmentDesc.resoruceName);

        $scope.form.delivery = {};
        $scope.form.delivery.resoruceName = "Delivery";
        $scope.form.delivery.resoruceValue = translateService.getResourceValue($scope.form.delivery.resoruceName);

        $scope.form.deliveryDesc = {};
        $scope.form.deliveryDesc.resoruceName = "Delivery Description";
        $scope.form.deliveryDesc.resoruceValue = translateService.getResourceValue($scope.form.deliveryDesc.resoruceName);


        $scope.form.printshop = {};
        $scope.form.printshop.resoruceName = "Print Shop Hoildays";
        $scope.form.printshop.resoruceValue = translateService.getResourceValue($scope.form.printshop.resoruceName);

        $scope.form.printshopDesc = {};
        $scope.form.printshopDesc.resoruceName = "Print Shop Hoildays Description";
        $scope.form.printshopDesc.resoruceValue = translateService.getResourceValue($scope.form.printshopDesc.resoruceName);

        $scope.form.maintenance = {};
        $scope.form.maintenance.resoruceName = "Maintenance";
        $scope.form.maintenance.resoruceValue = translateService.getResourceValue($scope.form.maintenance.resoruceName);

        $scope.form.maintenanceDesc = {};
        $scope.form.maintenanceDesc.resoruceName = "Maintenance Description";
        $scope.form.maintenanceDesc.resoruceValue = translateService.getResourceValue($scope.form.maintenanceDesc.resoruceName);

        
        var content = '<div id=accordion2 class=accordion><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=1 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-1><i class="icon-plus toggle-plus"></i>I am already a user and I have a feature specific question, where can I find answers?</a></div><div id=collapse-1 class="accordion-body collapse"><div class=accordion-inner>To access information on specific product features first login to CheckNet then view the help file from the menu.</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=2 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-2><i class="icon-plus toggle-plus"></i>Is my account set up yet?</a></div><div id=collapse-2 class="accordion-body collapse"><div class=accordion-inner>To verify if your user account is set-up, you may try to log in using the username and password provided to you via email from Checkpoint Systems. This username and password is provided upon approval. If you did not receive an email with a username and password then your account may not be setup. To determine your account status, please visit our contact us page to find email or phone numbers specific to your region.</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=3 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-3><i class="icon-plus toggle-plus"></i>What should I do if I forget my password?</a></div><div id=collapse-3 class="accordion-body collapse"><div class=accordion-inner>Enter your username in the Login text box provided on the login screen. Select the Forgot Password link. A popup will display your password hint if you provided one in your Account Profile. If you still do not remember your password, type the email address linked to your account in the box provided. Retype the scrambled word and hit Send Request. Your new password will be emailed to you at the email address you provided if the information matched.</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=4 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-4><i class="icon-plus toggle-plus"></i>What should I do if I forget my Username?</a></div><div id=collapse-4 class="accordion-body collapse"><div class=accordion-inner>Please send an email or phone your Checkpoint Customer Service Representative and state that you have lost or forgotten your username and password. Your password will be reset and you will receive an email with your username and password at the email address you provided to Checkpoint when you were setup as a user. Please provide your name, organization, phone number and role when corresponding to Customer Support. Please note that usernames, passwords and other security information will not be provided over the phone. Never provide your username and password to other individuals or organizations. Checkpoint Systems will never ask you for your username and/or password.</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=5 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-5><i class="icon-plus toggle-plus"></i>After I have completed a credit application, how long will it take before I receive my CheckNet username and password?</a></div><div id=collapse-5 class="accordion-body collapse"><div class=accordion-inner>It will take approximately 3 to 5 business days for Checkpoint Systems to process your credit application and assign a username and password. Your username and password will arrive at the email address you provided during the application process.</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=6 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-6><i class="icon-plus toggle-plus"></i>What is the credit application process and where do I find the credit application?</a></div><div id=collapse-6 class="accordion-body collapse"><div class=accordion-inner>Selecting the Apply For New Account link located on the CheckNet Login page will initiate the credit application process. The process is as follows:<p>a. Select the Apply For New Account link from the login page.</p><p>b. Before beginning the application process make sure you have all your company information, credit references, bank information, and address information available. We recommend you quickly review the process and print screens to determine what information you will need during the application process. Note that if you exit the credit application process before providing all required information you will need to start the process over again from scratch when your return.</p><p>c. Select your country from the pull down list.</p><p>d. On the next screen select Company Information and provide all required information. Select the Save button when you have completed filling out this form. Then select the Next button to proceed automatically to the next page.</p><p>e. Complete the Credit References page providing all required information. When complete select the Save button, then select the Next button to proceed automatically to the next page.</p><p>f. Complete the Address Information page providing all required information. When complete select the Save button, then select the Next button to proceed automatically to the next page.</p><p>g. Read the contents of the Credit Agreement page and select I accept. You must accept or the application process will not continue. Upon selecting I accept you will be presented with fields to enter company name, signature, title and date. These fields are required and must be completed by a company representative with authority to process a credit application. When complete select the Save button, then select the Next button to proceed automatically to the next page.</p><p>h. The agreement will be emailed to you. Review, sign and fax the agreement back to Checkpoint Systems at the fax number provided in the email. (This does not apply for Europe.)</p></div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=7 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-7><i class="icon-plus toggle-plus"></i>I am already an Approved Vendor, do I need to complete the credit application process again?</a></div><div id=collapse-7 class="accordion-body collapse"><div class=accordion-inner>No, if you are already an existing and approved CheckNet Customer you will already have a Checkpoint Customer Account Number. Select No Account from the login page and then click the Give Access button under the Existing Customer selection. Fill out the required fields your Customer Account Number can be found on consolidated invoices at the top center of the page next to the customer name. On regular invoices, this number can be found in the upper right hand corner. The Customer Number is 5 or 6 digits in length. Select the Submit button. You will receive your new login information by email in approximately 24 to 48 hours. Select the login link to continue. (This does not apply for Europe.)</div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=8 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-8><i class="icon-plus toggle-plus"></i>How do I know the site has a secure connection?</a></div><div id=collapse-8 class="accordion-body collapse"><div class=accordion-inner>CheckNet is a VeriSign secure site.<n>Your browser should display the green bar information verifying that the connection to our site is encrypted. Ensure the Name, Server ID and Status information are correct and owned by Checkpoint Systems, Inc., Thorofare, NJ.</n></div></div></div><div class=accordion-group><div class=accordion-heading><a class="accordion-toggle collapsed" data-id=9 data-toggle=collapse data-parent=#accordion2 href=/RCNV2/Faq#collapse-9><i class="icon-plus toggle-plus"></i>I did not find what I was looking for here, how do I contact Checkpoint Systems for Support?</a></div><div id=collapse-9 class="accordion-body collapse"><div class=accordion-inner>Our Contact Us page is available in both our login page or inside our side under the About menu. You can choose an email or phone number of a CheckNet representative of your region that is best suited to addressing your question or concern.</div></div></div></div>';

        $scope.renderHtml = function () {
            return $sce.trustAsHtml(content);
        };

    }
]);