
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", 'translateService',
                function ($http, $q, localStorageService, ngAuthSettings, authService, translateService) {
                    var faqDataServiceFactory = {};

                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var cultureName = 'en-US';
                    var faqData = {};

                    // Declare some utility variables
                    //var retrievedDL = '',
                    //    data
                     
                    //    timeNow = new Date().getTime(),
                    //    timeStorage = '',
                    //    persistTime = 1000*60*30; // Expiration in milliseconds; set to null to never expire
    
                    // Only works if browser supports Storage API
                    //if(typeof(Storage)!=='undefined') {
        
                    //    retrievedDL = localStorage.getItem('persistDL');
                    //    timeStorage = localStorage.getItem('persistTime');
      
                    //    // Append current dL with objects from storage
                    //    var loadDL = function() {
                    //        if(retrievedDL) {
                    //            dataLayer.push(JSON.parse(retrievedDL));
                    //            // dataLayer.push({'event': 'DLLoaded'});
                    //        }
                    //    }
      
                    //    // Save specified object in storage
                    //    var storeDL = function () {
                    //        console.log('store Called');
                    //        for (var i = 0; i < dataLayer.length; i++) {
                    //            if (persistEvent.test(dataLayer[i].event)) {
                    //                saveDL = dataLayer[i];
                    //                delete saveDL.event;
                    //                getDL = JSON.parse(retrievedDL) || {};
                    //                for (var key in saveDL) {
                    //                    if (saveDL.hasOwnProperty(key)) {
                    //                        getDL[key] = saveDL[key];
                    //                    }
                    //                }
                    //                localStorage.setItem('persistDL', JSON.stringify(getDL));
                    //            }
                    //        }
                    //    }
                    //    var deleteDL = function () {
                    //        console.log('Delete Called');
                    //        localStorage.removeItem('persistDL');
                    //    }
                      
                      
                    //}


                    var forceGetFaqs = function (cultureName, rowVersion) {
                        var deferred = $q.defer();
                        rowVersion = '';
                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetFaq?cultureName=' + cultureName + '&rowVersion=' + ''
                            ).success(function (result) {
                                //var resources = addFaqs(cultureName, result.RowVersion, result);
                                localStorageService.set('faq-' + cultureName, result);
                                deferred.resolve(result);
                             
                            })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                 

                    var getFaqs = function (selectedCultureName) {
                       

                        var deferred = $q.defer();
                        if (cultureName != '') {
                            cultureName = selectedCultureName;
                        }
                        else {
                            cultureName = translateService.getCurrentCultureName();
                        }
                        
                        var version = '';
                       

                        var refereshPeriod = new Date().getDay();
                        var hasForceRefresh = true;
                        var hasCheckforEnglish = false;
                        var faqs = localStorageService.get('faq-' + cultureName) || [];

                        if (faqs && faqs.lenght > 0 && refereshPeriod == 3) {
                            deferred.resolve(faqs);
                        }
                        if (hasForceRefresh) {
                          
                            forceGetFaqs(cultureName, version).then(function (result) {
                                console.log(result.FaqLists.length);
                                if (result.FaqLists.length === 0 && cultureName !== 'en-US' && !hasCheckforEnglish) {
                                    hasCheckforEnglish = true;
                                    forceGetFaqs('en-US', '').then(function (result) {
                                        console.log('data: ' + result);
                                        faqData = result;
                                        deferred.resolve(result);
                                    });
                                }
                                else {
                                    faqData = result;
                                    deferred.resolve(result);
                                }
                               
                            });
                        }

                        return deferred.promise;
                    }

                    faqDataServiceFactory.getFaqs = getFaqs;
                    faqDataServiceFactory.forceGetFaqs = forceGetFaqs;

                    return faqDataServiceFactory;
                }
]);