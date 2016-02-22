
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
                                if (cultureName !== 'en-US')
                                {
                                    var terms = localStorageService.get('policyTerms-' + 'en-US');
                                    if (terms) {
                                        if (result.Resources[0].ResourceValue === null) {
                                            result.Resources[0].ResourceValue = terms.Resources[0].ResourceValue;
                                        }

                                        if (result.Resources[1].ResourceValue === null) {
                                            result.Resources[1].ResourceValue = terms.Resources[1].ResourceValue;
                                        }

                                        if (result.Resources[2].ResourceValue === null) {
                                            result.Resources[2].ResourceValue = terms.Resources[2].ResourceValue;
                                        }
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

                        var refreshPeriod = new Date().getDate();

                        var deferred = $q.defer();
                        var selectedLanguage = localStorageService.get('selectedLanguage');
                        var cultureName = 'en-US';
                        if (selectedLanguage) {
                            cultureName = selectedLanguage;
                        }

                        var hasForceRefresh = true;
                       
                        var policyTerms = localStorageService.get('policyTerms-' + cultureName) || [];
                        
                        if (typeof policyTerms.Resources !== 'undefined' && refreshPeriod !== 1) {

                                if (policyTerms.Resources.length > 0 )
                                {
                                    console.log('local');
                                    hasForceRefresh = false;
                                    deferred.resolve(policyTerms);
                                }
                            }
                            else {
                                hasForceRefresh = true;
                            }
                      

                        if (hasForceRefresh) {
                            console.log('server');
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