app.controller('menuController', [
                   '$scope', 'authService', 'translateService', 'localStorageService',
                   function ($scope, authService, translateService, localStorageService) {
                       $scope.form = {};

                       $scope.menu = {};

                       $scope.menu.title = 'Check-Net';

                       $scope.form.contactus = {};
                       $scope.form.contactus.resoruceName = "Contact Us";
                       $scope.form.contactus.resoruceValue = "Contact Us";

                       $scope.menu.faq = "FAQ's";
                       $scope.menu.termsCondition = "Terms \& Conditions";
                       $scope.menu.policies = "Policies";
                       $scope.menu.help = "Help";
                       $scope.menu.notificationSettings = "Notification Settings";
                       $scope.menu.feedback = "Feedback";

                       $scope.authentication = authService.authentication;

                       $scope.organizationDetail = {};
                       $scope.hasAddress = false;


                    
                       var translate = function () {                          
                           $scope.form.contactus.resoruceValue = translateService.getResourceValue($scope.form.contactus.resoruceName);
                          
                       }
                       translate();

                       //address
                       var getOrganizationDetail = function () {
                         
                           var organizationDetail = localStorageService.get("organizationDetail");
                           if (organizationDetail)
                           {
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

                       $scope.mnuClick = function (viewName) {


                           switch (viewName) {
                               case "message":
                                   kendo.mobile.application.navigate("src/app/message/message.html");
                                   break;
                               case "login":
                                   kendo.mobile.application.navigate("src/app/login/login.html#userId=12345");
                                   break;
                               case "close":
                                   kendo.mobile.application.navigate("src/app/home/home.html");
                                   break;
                               default:
                                   kendo.mobile.application.navigate("src/app/login/login.html","slide");
                                   break;
                           }
                       }
                   }
]);