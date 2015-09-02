
app.controller('contactusController', ['$scope', '$http', '$sce', 'authService', 'translateService', 'localStorageService',
    function ($scope, $http, $sce, authService, translateService, localStorageService) {

        $scope.form = {};
        $scope.authentication = authService.authentication;
        $scope.helpDesk = ""; //need to set help des

        $scope.helpDeskRegion = "USA";

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Contact US";
        $scope.form.title.resoruceValue = "Contact US";

        $scope.form.titleUS = {};
        $scope.form.titleUS.resoruceName = "United States";
        $scope.form.titleUS.resoruceValue = "United States";


        $scope.form.titleEU = {};
        $scope.form.titleEU.resoruceName = "Europe";
        $scope.form.titleEU.resoruceValue = "Europe";


        $scope.form.titleAsia = {};
        $scope.form.titleAsia.resoruceName = "Asia";
        $scope.form.titleAsia.resoruceValue = "Asia";

        $scope.form.writeEmail = {};
        $scope.form.writeEmail.resoruceName = "Write Email";
        $scope.form.writeEmail.resoruceValue = "Write Email";


        $scope.form.subTitileUS = {};
        $scope.form.subTitileUS.resoruceName = " Checkpoint Systems Corporate Headquarters USA";
        $scope.form.subTitileUS.resoruceValue = " Checkpoint Systems Corporate Headquarters USA";


        $scope.form.subTitileUSStatus = {};
        $scope.form.subTitileUSStatus.resoruceName = "CheckNet Order Information / Order Status USA";
        $scope.form.subTitileUSStatus.resoruceValue = "CheckNet Order Information / Order Status USA";



        $scope.form.subTitileUSCollection = {};
        $scope.form.subTitileUSCollection.resoruceName = "Credit and Collections Department";
        $scope.form.subTitileUSCollection.resoruceValue = "Credit and Collections Department";

        $scope.form.helpDesk = {};
        $scope.form.helpDesk.resoruceName = "Help Desk";
        $scope.form.helpDesk.resoruceValue = "Help Desk";

        $scope.form.address = {};
        $scope.form.address.resoruceName = "Address";
        $scope.form.address.resoruceValue = "Address";

        $scope.form.phone = {};
        $scope.form.phone.resoruceName = "Phone";
        $scope.form.phone.resoruceValue = "Phone";


        $scope.form.fax = {};
        $scope.form.fax.resoruceName = "Fax";
        $scope.form.fax.resoruceValue = "Fax";

        $scope.form.email = {};
        $scope.form.email.resoruceName = "Email";
        $scope.form.email.resoruceValue = "Email";

        $scope.form.toFaxApplication = {};
        $scope.form.toFaxApplication.resoruceName = "To fax applications";
        $scope.form.toFaxApplication.resoruceValue = "To fax applications";

        $scope.form.forSetupStatus = {};
        $scope.form.forSetupStatus.resoruceName = "For set-up status";
        $scope.form.forSetupStatus.resoruceValue = "For set-up status";

        $scope.HelpDesk = {};


        $scope.form.contactus = {};
        $scope.form.contactus.resoruceName = "Contact Us";
        $scope.form.contactus.resoruceValue = "Contact Us";

        var translate = function () {
            $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

            $scope.form.titleUS.resoruceValue = translateService.getResourceValue($scope.form.titleUS.resoruceName);
            $scope.form.titleEU.resoruceValue = translateService.getResourceValue($scope.form.titleEU.resoruceName);
            $scope.form.titleEU.resoruceValue = translateService.getResourceValue($scope.form.titleEU.resoruceName);
            $scope.form.titleAsia.resoruceValue = translateService.getResourceValue($scope.form.titleAsia.resoruceName);

            $scope.form.writeEmail.resoruceValue = translateService.getResourceValue($scope.form.writeEmail.resoruceName);
            $scope.form.subTitileUS.resoruceValue = translateService.getResourceValue($scope.form.subTitileUS.resoruceName);
            $scope.form.subTitileUSStatus.resoruceValue = translateService.getResourceValue($scope.form.subTitileUSStatus.resoruceName);
            $scope.form.subTitileUSCollection.resoruceValue = translateService.getResourceValue($scope.form.subTitileUSCollection.resoruceName);


            $scope.form.helpDesk.resoruceValue = translateService.getResourceValue($scope.form.helpDesk.resoruceName);
            $scope.form.address.resoruceValue = translateService.getResourceValue($scope.form.address.resoruceName);
            $scope.form.phone.resoruceValue = translateService.getResourceValue($scope.form.phone.resoruceName);

            $scope.form.fax.resoruceValue = translateService.getResourceValue($scope.form.fax.resoruceName);
            $scope.form.email.resoruceValue = translateService.getResourceValue($scope.form.email.resoruceName);
            $scope.form.toFaxApplication.resoruceValue = translateService.getResourceValue($scope.form.toFaxApplication.resoruceName);

            $scope.form.forSetupStatus.resoruceValue = translateService.getResourceValue($scope.form.forSetupStatus.resoruceName);


        }
        translate();

        //address
        var getHelpDesk = function () {

            var helpDesk = localStorageService.get("organizationDetail");
            if (helpDesk) {
                $scope.helpDesk = helpDesk.HelpDesk.he;
            }
        }
        getHelpDesk();

        $scope.onSelect = function (selectedClass) {
            $('.contactus').hide();
            $('.' + selectedClass).show();
            $('.contactusHeader').removeClass('km-state-active');
            $('#' + selectedClass).addClass('km-state-active');

        }

        $scope.renderHtml = function (content) {
            return $sce.trustAsHtml(content);
        };
    }
]);