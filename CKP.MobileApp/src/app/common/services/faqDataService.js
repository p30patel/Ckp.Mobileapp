
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", 'translateService',
                function ($http, $q, localStorageService, ngAuthSettings, authService, translateService) {
                    var faqDataServiceFactory = {};

                    var refereshPeriod = new Date().getDay() % 2 == 0;

                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var cultureName = 'en-US';
                    var faqData = {};

                    var forceGetFaqs = function (cultureName, rowVersion) {
                        var deferred = $q.defer();
                      
                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetFaq?cultureName=' + cultureName + '&rowVersion=' + rowVersion
                            ).success(function (result) {
                                var resources = addFaqs(cultureName, result.RowVersion, result);
                                deferred.resolve(resources);
                             
                            })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                 

                    var addFaqs = function (cultureName, rowVersion, faqList) {

                        var oldItems = JSON.parse(localStorage.getItem('faq-' + cultureName)) || [];

                        var newItem = {
                            'Question': '',
                            'Answer': '',
                            'DisplayOrder' : 0,
                            
                        };
                        if (oldItems.length == 0) { //add blank entry
                            oldItems.push(newItem);
                        }

                        var newResources = []; // storiing resource name and values in Array
                        angular.forEach(faqList.FaqLists, function (item) {
                            var item = {
                                "Question": item.Question,
                                "Answer": item.Answer,
                                'DisplayOrder': item.DisplayOrder
                            }
                            newResources.push(item);
                        });

                        var engItems = JSON.parse(localStorage.getItem('faq-' +  'en-US')) || [];

                        //new logic starts
                        if (oldItems.length == 1) // no items
                        {
                            if (newResources.length > 0) // has new resource but not old - set new resoruces
                            {
                                console.log('new' + newResources.length + ' == eng ' + engItems.length);
                                if (newResources.length == engItems.length || engItems.length == 0 || cultureName === 'en-US') {
                                    localStorage.setItem('faq-' + cultureName, JSON.stringify(newResources));
                                    console.log('set new list - no old - ' + newResources.length);
                                }
                                else {
                                    var itemExisted = false;
                                    angular.forEach(newResources, function (newitem) {
                                        if (!itemExisted) {
                                            angular.forEach(engItems, function (olditem) {
                                                if (olditem.DisplayOrder === newitem.DisplayOrder) {
                                                    // item exist - no actions 
                                                    itemExisted = true;
                                                }
                                            });

                                            if (!itemExisted) {
                                                var ritem = {
                                                    "Question": newitem.Question,
                                                    "Answer": newitem.Answer,
                                                    'DisplayOrder': newitem.DisplayOrder
                                                }
                                                newResources.push(ritem);

                                                itemExisted = false;
                                            }
                                        }
                                    });
                                    localStorage.setItem('faq-' + cultureName, JSON.stringify(newResources));
                                    console.log('set new list - no old - updated with eng ' + newResources.length);
                                }
                            }
                            else {
                                if (cultureName !== 'en-US') // no old - no new - not a en-US culture then copy en-US
                                {
                                    localStorage.setItem('faq-' + cultureName, JSON.stringify(engItems));
                                    console.log('set default - eng:' + engItems.length);
                                }
                            }
                        }
                        else {// has old items

                            if (newResources.length > 0) {
                                console.log('reuired  changes keep list with new list');

                                var itemExisted = false;
                                angular.forEach(newResources, function (newitem) {
                                    if (!itemExisted) {
                                        angular.forEach(oldItems, function (olditem) {
                                            if (olditem.DisplayOrder === newitem.DisplayOrder && newitem.Question.length > 0 ) {
                                                // item exist - no actions 
                                                olditem.Answer = newitem.Answer;
                                                olditem.Question = newitem.Question;
                                                itemExisted = true;
                                            }
                                        });

                                        if (!itemExisted) {
                                            var ritem = {
                                                "Question": newitem.Question,
                                                "Answer": newitem.Answer,
                                                'DisplayOrder': newitem.DisplayOrder
                                            }
                                            oldItems.push(ritem);

                                            itemExisted = false;
                                        }
                                    }

                                });
                                localStorage.setItem('faq-' + cultureName, JSON.stringify(oldItems));
                            }
                            else {
                                console.log('no changes keep same old  list');
                            }

                        }

                        //update version
                        var oldItems = JSON.parse(localStorage.getItem('faq-' + cultureName)) || [];

                        var version = getFaqData(cultureName, rowVersion, oldItems, !refereshPeriod, true);

                        return oldItems;
                    }

                    var getFaqData = function (cultureName, rowVersion, faqList, refereshPeriod, hasUpdate) {

                        var versions = JSON.parse(localStorage.getItem('faqs-version')) || [];

                        var data = {
                            "CultureName": cultureName,
                            "RowVersion": '',
                            "RefereshPeriod": refereshPeriod,
                            "FaqList": ''

                        };

                        var hasExitedItem = false;
                        if (versions.length > 0) {
                            //existed then retruns the values 
                            angular.forEach(versions, function (item) {

                                if (item.CultureName === cultureName && !hasExitedItem) {
                                    hasExitedItem = true;
                                    if (hasUpdate) {
                                        item.RowVersion = rowVersion;
                                        item.RefereshPeriod = refereshPeriod
                                        item.FaqList = faqList
                                        data.RowVersion = rowVersion;
                                        data.RefereshPeriod = refereshPeriod;
                                        data.FaqList = faqList;
                                    }
                                    else {
                                        data.CultureName = cultureName;
                                        data.RowVersion = item.RowVersion;
                                        data.RefereshPeriod = item.RefereshPeriod;
                                        data.FaqList = item.FaqList;
                                    }
                                }

                            });
                        }

                        if (!hasExitedItem) {
                            versions.push(data);
                            localStorage.setItem('faqs-version', JSON.stringify(versions));
                            //  console.log('New Version' + data.CultureName + data.RowVersion);
                        }
                        if (hasUpdate && hasExitedItem) {
                            localStorage.setItem('faqs-version', JSON.stringify(versions));
                            //    console.log('Update Version' + data.CultureName + data.RowVersion)

                        }
                        console.log('ref' + data.RefereshPeriod);
                        return data;
                    }

                    var getFaqs = function () {

                        var deferred = $q.defer();
                        cultureName = translateService.getCurrentCultureName();
                     
                        var version = '';
                        var versionData = getFaqData(cultureName, version, [], refereshPeriod, false);

                        version = versionData.RowVersion;

                        var forceReferesh = false; // refresh the page once a day
                      
                    
                        if (versionData) {
                            version = versionData.RowVersion;
                            var faqs = versionData.FaqList;
                      
                            if (faqs.length > 0 && versionData.RefereshPeriod == refereshPeriod) {
                                faqData = faqs;
                              
                                deferred.resolve(faqs);
                            }
                            else {

                                forceReferesh = true;
                            }

                        }
                        if (forceReferesh) {
                            console.log('force server refrrsh' + forceReferesh);
                            forceGetFaqs(cultureName, version).then(function (result) {

                                faqData = result;
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