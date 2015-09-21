
app.controller('faqController', [
                   '$scope', '$http', '$sce', 'faqDataService', 'alerting', 'translateService',
                   function ($scope, $http, $sce, faqDataService, alerting, translateService) {
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "FAQ";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       var setTitle = function () {
                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);
                           }
                       };
                       setTitle();
                       $scope.form.faqInstructions = {};
                       $scope.form.faqInstructions.resoruceName = "Faq Instructions";
                       $scope.form.faqInstructions.resoruceValue = translateService.getResourceValue($scope.form.faqInstructions.resoruceName);

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

                       $scope.faqs = {};

                       $scope.intShow = function (e) {                    
                       
                       }

                       var getFaqs = function(selectedCultureName) {
                           
                           kendo.mobile.application.pane.loader.show();
                        
                           faqDataService.getFaqs(selectedCultureName).then(function (result) {
                               $scope.faqs = result;
                            
                           }).catch(function(error) {
                               $scope.faqs = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }

                       var loadFaqs = function () {
                           var cultureName = translateService.getCurrentCultureName();
                          
                           if (cultureName != 'en-US')
                           {
                               kendo.mobile.application.pane.loader.show();

                               faqDataService.getFaqs('en-US').then(function (result) {
                                   getFaqs(cultureName);

                               }).catch(function (error) {
                                   $scope.faqs = {};
                               }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                           }
                           else {
                               getFaqs(cultureName);
                           }
                       }
                       loadFaqs();

                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   
                   }
               ]);