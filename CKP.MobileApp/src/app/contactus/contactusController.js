
app.controller('contactusController', ['$scope', '$http', '$sce', 'authService', 'translateService', 'localStorageService', '$timeout',
    function ($scope, $http, $sce, authService, translateService, localStorageService, $timeout) {

        $scope.form = {};
        $scope.authentication = authService.authentication;
        $scope.helpDesk = ""; //need to set help des

        $scope.helpDeskRegion = "USA";

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Contact Us";
        $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

        $scope.form.titleUS = {};
        $scope.form.titleUS.resoruceName = "USA";
        $scope.form.titleUS.resoruceValue = translateService.getResourceValue($scope.form.titleUS.resoruceName);


        $scope.form.titleEU = {};
        $scope.form.titleEU.resoruceName = "Europe";
        $scope.form.titleEU.resoruceValue = translateService.getResourceValue($scope.form.titleEU.resoruceName);


        $scope.form.titleAsia = {};
        $scope.form.titleAsia.resoruceName = "Asia";
        $scope.form.titleAsia.resoruceValue = translateService.getResourceValue($scope.form.titleAsia.resoruceName);

        $scope.form.writeEmail = {};
        $scope.form.writeEmail.resoruceName = "Write Email";
        $scope.form.writeEmail.resoruceValue = translateService.getResourceValue($scope.form.writeEmail.resoruceName);


        $scope.form.subTitileUS = {};
        $scope.form.subTitileUS.resoruceName = "Checkpoint Systems Corporate Headquarters USA";
        $scope.form.subTitileUS.resoruceValue = translateService.getResourceValue($scope.form.subTitileUS.resoruceName);


        $scope.form.subTitileUSStatus = {};
        $scope.form.subTitileUSStatus.resoruceName = "CheckNet Order Information / Order Status USA";
        $scope.form.subTitileUSStatus.resoruceValue = translateService.getResourceValue($scope.form.subTitileUSStatus.resoruceName);



        $scope.form.subTitileUSCollection = {};
        $scope.form.subTitileUSCollection.resoruceName = "Credit and Collections Department";
        $scope.form.subTitileUSCollection.resoruceValue = translateService.getResourceValue($scope.form.subTitileUSCollection.resoruceName);

        $scope.form.subTitileEU = {};
        $scope.form.subTitileEU.resoruceName = "Checkpoint Systems Europe";
        $scope.form.subTitileEU.resoruceValue = translateService.getResourceValue($scope.form.subTitileEU.resoruceName);


        $scope.form.subTitileEUSetup = {};
        $scope.form.subTitileEUSetup.resoruceName = "Global Printing Set-Up/Credit Applications Europe";
        $scope.form.subTitileEUSetup.resoruceValue = translateService.getResourceValue($scope.form.subTitileEUSetup.resoruceName);



        $scope.form.subTitileEUStatus = {};
        $scope.form.subTitileEUStatus.resoruceName = "CheckNet Global Printing Order Information/Order Status USA";
        $scope.form.subTitileEUStatus.resoruceValue = translateService.getResourceValue($scope.form.subTitileEUStatus.resoruceName);


        $scope.form.subTitileHK = {};
        $scope.form.subTitileHK.resoruceName = "CheckNet Global Printing Order Information/Order Status HK";
        $scope.form.subTitileHK.resoruceValue = translateService.getResourceValue($scope.form.subTitileHK.resoruceName);


        $scope.form.helpDesk = {};
        $scope.form.helpDesk.resoruceName = "Help Desk";
        $scope.form.helpDesk.resoruceValue = translateService.getResourceValue($scope.form.helpDesk.resoruceName);

        $scope.form.address = {};
        $scope.form.address.resoruceName = "Address";
        $scope.form.address.resoruceValue = translateService.getResourceValue($scope.form.address.resoruceName);

        $scope.form.phone = {};
        $scope.form.phone.resoruceName = "Phone";
        $scope.form.phone.resoruceValue = translateService.getResourceValue($scope.form.phone.resoruceName);


        $scope.form.fax = {};
        $scope.form.fax.resoruceName = "Fax";
        $scope.form.fax.resoruceValue = translateService.getResourceValue($scope.form.fax.resoruceName);

        $scope.form.email = {};
        $scope.form.email.resoruceName = "Email";
        $scope.form.email.resoruceValue = translateService.getResourceValue($scope.form.email.resoruceName);

        $scope.form.toFaxApplication = {};
        $scope.form.toFaxApplication.resoruceName = "To fax applications";
        $scope.form.toFaxApplication.resoruceValue = translateService.getResourceValue($scope.form.toFaxApplication.resoruceName);

        $scope.form.forSetupStatus = {};
        $scope.form.forSetupStatus.resoruceName = "For set-up status";
        $scope.form.forSetupStatus.resoruceValue = translateService.getResourceValue($scope.form.forSetupStatus.resoruceName);


        $scope.form.titleAU = {};
        $scope.form.titleAU.resoruceName = "Austraila";
        $scope.form.titleAU.resoruceValue = translateService.getResourceValue($scope.form.titleAU.resoruceName);


        $scope.form.AUTabTitle1 = {};
        $scope.form.AUTabTitle1.resoruceName = "CheckNet MAS Catalog Order Austraila";
        $scope.form.AUTabTitle1.resoruceValue = translateService.getResourceValue($scope.form.AUTabTitle1.resoruceName);

        $scope.form.AsiaMasTabTitle = {};
        $scope.form.AsiaMasTabTitle.resoruceName = "CheckNet MAS Catalog Order Asia";
        $scope.form.AsiaMasTabTitle.resoruceValue = translateService.getResourceValue($scope.form.AsiaMasTabTitle.resoruceName);

        $scope.form.EuropeMasTabTitle = {};
        $scope.form.EuropeMasTabTitle.resoruceName = "CheckNet MAS Catalog Order Europe";
        $scope.form.EuropeMasTabTitle.resoruceValue = translateService.getResourceValue($scope.form.EuropeMasTabTitle.resoruceName);


        $scope.form.send = {};
        $scope.form.send.resoruceName = "Send";
        $scope.form.send.resoruceValue = translateService.getResourceValue($scope.form.send.resoruceName);

        $scope.form.name = {};
        $scope.form.name.resoruceName = "Name";
        $scope.form.name.resoruceValue = translateService.getResourceValue($scope.form.name.resoruceName);

        $scope.form.order = {};
        $scope.form.order.resoruceName = "Order Number";
        $scope.form.order.resoruceValue = translateService.getResourceValue($scope.form.order.resoruceName);

        $scope.form.messageBody = {};
        $scope.form.messageBody.resoruceName = "Message";
        $scope.form.messageBody.resoruceValue = translateService.getResourceValue($scope.form.messageBody.resoruceName);

        $scope.HelpDesk = {};
        $scope.contact = {};
        //address
        var getHelpDesk = function () {

            var helpDesk = localStorageService.get("organizationDetail");

            if (helpDesk) {
                $scope.helpDesk = helpDesk.HelpDesk;
            }
        }
        getHelpDesk();

        $scope.showSendEmailmodal = function () {
       
            $("#modalview-email").kendoMobileModalView("open");
        };
        $scope.hideSendEmailmodal = function () {
            $("#modalview-email").kendoMobileModalView("close");
        };

        $scope.onSelect = function (selectedClass) {
            $('.contactus').hide();
            $('.' + selectedClass).show();
            $('.contactusHeader').removeClass('km-state-active');
            $('#' + selectedClass).addClass('km-state-active');

        }

        $scope.send = function () {

            $scope.message = "We have received your Enquiry. <br> Someone will be get back to you! Thank you!";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

            //kendo.mobile.application.pane.loader.show();


            //feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
            //    if (result === 'success') {
            //        alerting.addSuccess("Thank you for your feedback!", 10000);
            //        $scope.message = "Thank you for your feedback!";
            //        $timeout(function () {
            //            $scope.message = "";
            //        }, 7000);

            //        $scope.feedbackData.comment = "";
            //    } else {
            //        alerting.addSuccess("Faild to post feedback!", 10000);
            //        $scope.message = "Faild to post feedback, Please try later";
            //        $timeout(function () {
            //            $scope.message = "";
            //        }, 7000);
            //    }
            //}).catch(function (error) {

            //    $scope.message = "Faild to post feedback, Please try later";
            //    $timeout(function () {
            //        $scope.message = "";
            //    }, 7000);

            //}).finally(function () {
            //    kendo.mobile.application.pane.loader.hide();
            //});
        }
        $scope.renderHtml = function (content) {
            if (typeof content !== 'undefined') {
                content = content.replace(/<b>/g, '<br><b>');
            }
            return $sce.trustAsHtml(content);
        };
    }
]);