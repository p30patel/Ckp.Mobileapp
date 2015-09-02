
app.controller('termsConditionController', [
                   '$scope', '$http', '$sce', 'policyTermsDataService', 'alerting', 'translateService',
                   function ($scope, $http, $sce, policyTermsDataService, alerting, translateService) {

                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Terms & Condition";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);


                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

                       $scope.termsCondition = {};
                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                           policyTermsDataService.getPolicyTerms().then(function (result) {
                               $scope.termsCondition = result;
                            
                           }).catch(function(error) {
                               $scope.termsCondition = {};
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