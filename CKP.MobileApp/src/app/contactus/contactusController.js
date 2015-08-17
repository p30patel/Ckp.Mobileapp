
app.controller('contactusController', ['$scope', '$http', 'authService',
    function ($scope, $http, authService) {
        $scope.form = {};
        $scope.authentication = authService.authentication;
        $scope.helpDesk = ""; //need to set help des
        $scope.helpDeskRegion = "USA";

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
        
        
        $scope.onSelect = function (e) {
            $('.contactus').hide();
            $('.' + e).show();
        }
    }
]);