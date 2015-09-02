
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var faqDataServiceFactory = {};

                    var refereshPeriod = new Date().getDay() % 2 == 0;

                    var forceGetFaqs = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var cultureName = "en-US";
                        var rowVersion = '';

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetFaq?cultureName=' + cultureName + '&rowVersion=' + rowVersion
                            ).success(function (result) {

                                localStorageService.set('faqs' + refereshPeriod, result);
                                deferred.resolve(result);
                            })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getFaqs = function () {
                        var deferred = $q.defer();

                        var faqs = localStorageService.get("faqs" + refereshPeriod);

                        if (faqs) {
                            deferred.resolve(faqs);
                        } else {

                            var previous = localStorageService.get('faqs' + !refereshPeriod);
                            if (previous) {
                                localStorageService.remove('faqs' + !refereshPeriod);
                            }
                            forceGetFaqs().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    faqDataServiceFactory.getFaqs = getFaqs;
                    faqDataServiceFactory.forceGetFaqs = forceGetFaqs;

                    return faqDataServiceFactory;
                }
]);