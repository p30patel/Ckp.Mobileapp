
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

                                getPolicyTermsData(cultureName, '', result.Resources, true);

                                deferred.resolve(result.Resources);
                            })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };

                    var getPolicyTermsData = function (cultureName, rowVersion, resources, hasUpdate) {

                        var versions = JSON.parse(localStorage.getItem('policyTerms')) || [];

                        var persistTime = 1000 * 60 * 1440;    // Expiration in milliseconds; set to null to never  // current is 1 days
                        var data = {
                            "CultureName": cultureName,
                            "RowVersion": '',

                            "LastUpdated": 0,
                            "PolicyTerms": '',
                            "PersistTime": persistTime


                        };


                        var hasExitedItem = false;
                        var termsPolicyEnglish = [];

                        //if update -- get english to use terms and condition to set

                        if (hasUpdate && versions.length > 0) {
                            //existed then retruns the values 
                            angular.forEach(versions, function (item) {

                                if (item.CultureName === 'en-US') {
                                   
                                    termsPolicyEnglish = item.PolicyTerms;
                                }
                            });
                        }
                        //update items
                        if (versions.length > 0) {
                            //existed then retruns the values 
                            angular.forEach(versions, function (item) {
                              
                                if (item.CultureName === cultureName && !hasExitedItem) {
                                    hasExitedItem = true;
                                    if (hasUpdate) {
                                     
                                        if (typeof termsPolicyEnglish !== 'undefined' && cultureName !== 'en-US' && termsPolicyEnglish.length > 0) {
                                            if (resources[0].ResourceValue === null) {
                                                resources[0].ResourceValue = termsPolicyEnglish[0].ResourceValue;
                                            }

                                            if (resources[1].ResourceValue === null) {
                                                resources[1].ResourceValue = termsPolicyEnglish[1].ResourceValue;
                                            }

                                            if (resources[2].ResourceValue === null) {
                                                resources[2].ResourceValue = termsPolicyEnglish[2].ResourceValue;
                                            }
                                        }
                                        console.log(resources[2].ResourceValue);
                                        item.RowVersion = rowVersion;

                                        item.PolicyTerms = resources;
                                        item.LastUpdated = new Date().getTime();

                                        data.RowVersion = rowVersion;

                                        data.PolicyTerms = resources;

                                        data.LastUpdated = new Date().getTime();
                                        data.PersistTime = persistTime;

                                    }
                                    else {
                                        data.CultureName = cultureName;
                                        data.RowVersion = item.RowVersion;

                                        data.PolicyTerms = item.PolicyTerms;
                                        data.LastUpdated = item.LastUpdated;
                                        data.PersistTime = persistTime;
                                    }
                                }

                            });
                        }

                        if (!hasExitedItem) {
                            versions.push(data);
                            localStorage.setItem('policyTerms', JSON.stringify(versions));
                            //  console.log('New Version' + data.CultureName + data.RowVersion);
                        }
                        if (hasUpdate && hasExitedItem) {                           
                            localStorage.setItem('policyTerms', JSON.stringify(versions));
                            //    console.log('Update Version' + data.CultureName + data.RowVersion)

                        }

                        return data;
                    }
                    var getPolicyTerms = function () {

                        var refreshPeriod = new Date().getDate();

                        var deferred = $q.defer();
                        var selectedLanguage = localStorageService.get('selectedLanguage');
                        var cultureName = 'en-US';

                        if (selectedLanguage) {
                            cultureName = selectedLanguage;
                        }

                        var refereshPeriod = false;
                        var version = '';
                        var policyTermsData = getPolicyTermsData(cultureName, version, [], false);

                        var forceReferesh = true;

                   

                        if (policyTermsData) {

                            var policyTerms = policyTermsData.PolicyTerms;

                            if (policyTermsData.PersistTime && new Date().getTime() > Number(policyTermsData.LastUpdated) + policyTermsData.PersistTime) {
                                forceReferesh = true;
                            }
                            else {

                                if (typeof policyTerms !== 'undefined' && policyTerms.length > 0) {
                                    forceReferesh = false;
                                 
                                    deferred.resolve(policyTerms);
                                }
                                else {
                                    forceReferesh = true;
                                }

                            }

                        }
                        if (forceReferesh) {
                           
                            forceGetpolicyTerms(cultureName).then(function (result) {

                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    policyTermsDataService.getPolicyTerms = getPolicyTerms;

                    policyTermsDataService.forceGetpolicyTerms = forceGetpolicyTerms;

                    policyTermsDataService.getPolicyTermsData = getPolicyTermsData;

                    return policyTermsDataService;
                }
]);