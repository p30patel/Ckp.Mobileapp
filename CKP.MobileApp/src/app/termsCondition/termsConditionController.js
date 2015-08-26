
app.controller('termsConditionController', [
                   '$scope', '$http', '$sce', 'policyTermsDataService', 'alerting',
                   function ($scope, $http, $sce, policyTermsDataService, alerting) {
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