
'use strict';

app.factory("policyTermsDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var policyTermsDataService = {};                 
                   

                    var forceGetpolicyTerms = function (cultureName) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authData = authService.getUserInfo();
                     
                        var rowVersionTerms = '', rowVersionPrivacy = '', rowVersionReturn = '';

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetResourceCultureTextUpdate?cultureName=' + cultureName
                            + '&rowVersionTerms=' + rowVersionTerms + '&rowVersionPrivacy=' + rowVersionPrivacy + '&rowVersionReturn=' + rowVersionReturn
                            ).success(function (result) {

                                if (cultureName !== 'en-US' && result.Resources[2].ResourceValue === null)
                                {
                                    var terms = localStorageService.get('policyTerms-' + 'en-US');
                                    if (terms) {
                                        result.Resources[2].ResourceValue = terms.Resources[2].ResourceValue;
                                    }
                                }
                                localStorageService.set('policyTerms-' + cultureName, result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getPolicyTerms = function () {

                        var refereshPeriod = new Date().getDay();

                        var deferred = $q.defer();
                        var selectedLanguage = localStorageService.get('selectedLanguage');
                        var cultureName = 'en-US';
                        if (selectedLanguage) {
                            cultureName = selectedLanguage;
                        }

                        var hasForceRefresh = true;
                       
                        var policyTerms = localStorageService.get('policyTerms-' + cultureName) || [];
                       
                        if (policyTerms && policyTerms.lenght > 0 && refereshPeriod == 3) {                          
                            deferred.resolve(policyTerms);
                        }
                        if (hasForceRefresh) {
                           
                            forceGetpolicyTerms(cultureName).then(function (result) {
                           
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