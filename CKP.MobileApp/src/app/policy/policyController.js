
app.controller('policyController', [
                   '$scope', '$http', '$sce', 'policyTermsDataService', 'alerting',
                   function ($scope, $http, $sce, policyTermsDataService, alerting) {
                       $scope.policies = {};
                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                       
                           policyTermsDataService.getPolicyTerms().then(function (result) {
                               $scope.policies = result;
                         
                           }).catch(function(error) {
                               $scope.policies = {};
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