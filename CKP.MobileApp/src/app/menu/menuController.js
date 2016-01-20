app.controller('menuController', [
                   '$scope', 'authService', 'translateService', 'localStorageService',
                   function ($scope, authService, translateService, localStorageService) {

                       $scope.form = {};

                       $scope.menu = {};

                       $scope.menu.title = 'Check-Net';

                       $scope.form.contactus = {};
                       $scope.form.contactus.resoruceName = "Contact Us";
                       $scope.form.contactus.resoruceValue = translateService.getResourceValue($scope.form.contactus.resoruceName);

                       $scope.form.faq = {};
                       $scope.form.faq.resoruceName = "FAQ";
                       $scope.form.faq.resoruceValue = translateService.getResourceValue($scope.form.faq.resoruceName);


                       $scope.menu.termsCondition = "Terms & Conditions";

                       $scope.form.termsCondition = {};
                       $scope.form.termsCondition.resoruceName = "Terms & Conditions";
                       $scope.form.termsCondition.resoruceValue = translateService.getResourceValue($scope.form.termsCondition.resoruceName);


                       $scope.form.policies = {};
                       $scope.form.policies.resoruceName = "Policies";
                       $scope.form.policies.resoruceValue = translateService.getResourceValue($scope.form.policies.resoruceName);


                       $scope.form.help = {};
                       $scope.form.help.resoruceName = "Help";
                       $scope.form.help.resoruceValue = translateService.getResourceValue($scope.form.help.resoruceName);


                       $scope.form.notificationSettings = {};
                       $scope.form.notificationSettings.resoruceName = "Notification Settings";
                       $scope.form.notificationSettings.resoruceValue = translateService.getResourceValue($scope.form.notificationSettings.resoruceName);


                       $scope.form.feedback = {};
                       $scope.form.feedback.resoruceName = "Feedback";
                       $scope.form.feedback.resoruceValue = translateService.getResourceValue($scope.form.feedback.resoruceName);

                       $scope.authentication = authService.authentication;

                       $scope.organizationDetail = {};
                       $scope.hasAddress = false;
                       //address
                       var getOrganizationDetail = function () {

                           var organizationDetail = localStorageService.get("organizationDetail");
                           if (organizationDetail) {
                               $scope.organizationDetail = organizationDetail;

                               $scope.hasAddress = true;
                           }
                           else {
                               $scope.hasAddress = false;
                           }

                       }
                       getOrganizationDetail();
                       //logout
                       $scope.logout = function () {
                           authService.logout();
                           $scope.authentication.isAuth = false;

                           kendo.mobile.application.navigate("src/app/login/login.html");

                       }

                       if (isTrackingActive) {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.menu");
                       }
                       $scope.home = function () {
                           kendo.mobile.application.navigate("src/app/home/home.html");
                       }
                       $scope.mnuClick = function (viewName) {


                           switch (viewName) {                                                     
                               default:
                                   kendo.mobile.application.navigate("src/app/login/login.html");
                                   break;
                           }
                       }
                   }
]);