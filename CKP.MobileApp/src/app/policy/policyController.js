
app.controller('policyController', [
                   '$scope', '$http', '$sce', 'policyTermsDataService', 'translateService',
                   function ($scope, $http, $sce, policyTermsDataService, translateService) {
                    
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Policies";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       var setResources = function () {

                           $scope.form.policyInstructions = {};
                           $scope.form.policyInstructions.resoruceName = "Policy Instructions";
                           $scope.form.policyInstructions.resoruceValue = translateService.getResourceValue($scope.form.policyInstructions.resoruceName);

                           $scope.form.noData = {};
                           $scope.form.noData.resoruceName = "No Data are found";
                           $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

                           $scope.form.policyInstructions = {};
                           $scope.form.policyInstructions.resoruceName = "Policy Instructions";
                           $scope.form.policyInstructions.resoruceValue = translateService.getResourceValue($scope.form.policyInstructions.resoruceName);

                           $scope.form.noData = {};
                           $scope.form.noData.resoruceName = "No Data are found";
                           $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);
                       }
                       setResources();

                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);
                               if (typeof (window.navigator.simulator) === 'undefined') {
                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.policy");
                               }
                           }
                       }


                       $scope.policies = {};
                       var init = function () {
                             kendo.mobile.application.showLoading();
                         
                           policyTermsDataService.getPolicyTerms().then(function (result) {
                               console.log(result);
                               $scope.policies = result;

                           }).catch(function (error) {
                               $scope.policies = {};
                           }).finally(function () {
                                kendo.mobile.application.hideLoading();
                           });
                       }
                       init();
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
]);