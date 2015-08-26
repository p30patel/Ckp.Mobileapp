app.controller('menuController', [
                   '$scope', 'authService', 'localStorageService',
                   function ($scope, authService, localStorageService) {
                       $scope.menu = {};
                       $scope.menu.title = 'Check-Net';
                       $scope.menu.contactus = "Contact Us";
                       $scope.menu.faq = "FAQ's";
                       $scope.menu.termsCondition = "Terms \& Conditions";
                       $scope.menu.policies = "Policies";
                       $scope.menu.help = "Help";
                       $scope.menu.notificationSettings = "Notification Settings";
                       $scope.menu.feedback = "Feedback";

                       $scope.authentication = authService.authentication;

                       $scope.organizationDetail = {};
                       $scope.hasAddress = false;
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


                           kendo.mobile.application.navigate("src/app/login/login.html", "slide");

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