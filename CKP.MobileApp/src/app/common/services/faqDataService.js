
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var faqDataServiceFactory = {};

                    var forceGetFaqs = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;                        
                        var cultureName = "en-US";
                        var rowVersion = '';

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetFaq?cultureName=' + cultureName + '&rowVersion=' + rowVersion
                            ).success(function (result) {
                          
                            localStorageService.set('faqs', result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getFaqs = function () {
                        var deferred = $q.defer();

                        var faqs = localStorageService.get("faqs");
                        faqs = '';
                        if (faqs) {
                            deferred.resolve(faqs);
                        } else {
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