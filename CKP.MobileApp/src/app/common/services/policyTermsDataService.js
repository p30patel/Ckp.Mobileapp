
'use strict';

app.factory("policyTermsDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var policyTermsDataService = {};

                    var forceGetpolicyTerms = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authData = authService.getUserInfo();
                        var cultureName = "en-US";
                        var rowVersionTerms = '', rowVersionPrivacy = '', rowVersionReturn = '';

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetResourceCultureTextUpdate?cultureName=' + cultureName
                            + '&rowVersionTerms=' + rowVersionTerms + '&rowVersionPrivacy=' + rowVersionPrivacy + '&rowVersionReturn=' + rowVersionReturn
                            ).success(function (result) {
                                localStorageService.set('policyTerms' + new Date().getDay , result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getPolicyTerms = function () {
                        var deferred = $q.defer();

                        var policyTerms = localStorageService.get('policyTerms' + new Date().getDay);
                       
                        if (policyTerms) {
                            deferred.resolve(policyTerms);
                        } else {
                            forceGetpolicyTerms().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }
                  
                    policyTermsDataService.getPolicyTerms = getPolicyTerms;


                    policyTermsDataService.forceGetpolicyTerms = forceGetpolicyTerms;

                    return policyTermsDataService;
                }
            ]);