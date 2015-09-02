
app.controller('faqController', [
                   '$scope', '$http', '$sce', 'faqDataService', 'alerting', 'translateService',
                   function ($scope, $http, $sce, faqDataService, alerting, translateService) {
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "FAQ";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       $scope.form.faqInstructions = {};
                       $scope.form.faqInstructions.resoruceName = "Faq Instructions";
                       $scope.form.faqInstructions.resoruceValue = translateService.getResourceValue($scope.form.faqInstructions.resoruceName);

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

                       $scope.faqs = {};

                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                        
                           faqDataService.getFaqs().then(function (result) {
                               $scope.faqs = result;
                            
                           }).catch(function(error) {
                               $scope.faqs = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }
                       init();
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   
                   }
               ]);