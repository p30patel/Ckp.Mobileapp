
app.controller('faqController', [
                   '$scope', '$http', '$sce', 'faqDataService', 'translateService',
                   function ($scope, $http, $sce, faqDataService, translateService) {
                       $scope.form = {};
                     
                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "FAQ";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       var setResources = function () {
                           $scope.form.faqInstructions = {};
                           $scope.form.faqInstructions.resoruceName = "Faq Instructions";
                           $scope.form.faqInstructions.resoruceValue = translateService.getResourceValue($scope.form.faqInstructions.resoruceName);

                           $scope.form.noData = {};
                           $scope.form.noData.resoruceName = "No Data are found";
                           $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);
                       }
                       $scope.faqs = {};
                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);

                               if (typeof (window.navigator.simulator) === 'undefined') {

                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.faq");
                               }
                              
                           }
                       }


                       setResources();
                     


                       var getFaqs = function (selectedCultureName) {

                             kendo.mobile.application.showLoading();

                           faqDataService.getFaqs(selectedCultureName).then(function (result) {
                               console.log('view ' + result);
                               $scope.faqs = result;
                           
                           }).catch(function (error) {
                               $scope.faqs = {};
                           }).finally(function () {
                                kendo.mobile.application.hideLoading();
                           });
                       }

                       var loadFaqs = function () {
                           var cultureName = translateService.getCurrentCultureName();
                           getFaqs(cultureName);
                          
                       }
                       loadFaqs();
                      

                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };

                   }
]);