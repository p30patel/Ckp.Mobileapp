
app.controller('policyController', [
                   '$scope', '$http', '$sce', 'policyTermsDataService',  'translateService',
                   function ($scope, $http, $sce, policyTermsDataService, translateService) {
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Policies";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);

                           }
                       }
                       $scope.form.policyInstructions = {};
                       $scope.form.policyInstructions.resoruceName = "Policy Instructions";
                       $scope.form.policyInstructions.resoruceValue = translateService.getResourceValue($scope.form.policyInstructions.resoruceName);

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

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