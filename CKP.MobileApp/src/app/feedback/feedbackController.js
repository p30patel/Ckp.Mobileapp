
app.controller('feedbackController', [
                   '$scope', '$http', '$sce', 'feedbackDataService', 'alerting', 'authService', 'translateService',
                   function ($scope, $http, $sce, feedbackDataService, alerting, authService, translateService) {

                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Feedback";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       $scope.form.feedback = {};
                       $scope.form.feedback.resoruceName = "Have something to share? Let us know here";
                       $scope.form.feedback.resoruceValue = translateService.getResourceValue($scope.form.feedback.resoruceName);

                       $scope.form.send = {};
                       $scope.form.send.resoruceName = "Send";
                       $scope.form.send.resoruceValue = translateService.getResourceValue($scope.form.send.resoruceName);



                       $scope.feedbackData = {};                       
                       $scope.feedbackData.webpage = "Mobile App";
                       $scope.feedbackData.comment = "";
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                            //   alerting.addSuccess("Please Login!", 0);
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                           
                       };
                       init();
                    
                       $scope.send = function() {
                           kendo.mobile.application.pane.loader.show();
                          
                         
                           feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
                               if (result === 'success') {
                                   alerting.addSuccess("Thank you for your feedback!", 10000);
                                   $scope.feedbackData.comment = "";
                               } else {
                                   alerting.addSuccess("Faild to post feedback!", 10000);
                               }
                           }).catch(function(error) {
                               $scope.policies = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }
                   }
               ]);