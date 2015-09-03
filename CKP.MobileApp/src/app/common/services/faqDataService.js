
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", 'translateService',
                function ($http, $q, localStorageService, ngAuthSettings, authService, translateService) {
                    var faqDataServiceFactory = {};

                    var refereshPeriod = new Date().getDay() % 2 == 0;

                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var cultureName = 'en-US';
                    
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
                    //var getFaqs = function () {

                    //    var deferred = $q.defer();

                    //    cultureName = translateService.getCurrentCultureName();
                    //    var faqs = localStorageService.get("faqs" + cultureName + refereshPeriod);
                     

                    //    if (faqs) {
                    //        deferred.resolve(faqs);
                    //    } else {

                    //        var previous = localStorageService.get('faqs' + !refereshPeriod);
                    //        if (previous) {
                    //            localStorageService.remove('faqs' + !refereshPeriod);
                    //        }
                    //        forceGetFaqs().then(function (result) {
                    //            deferred.resolve(result);
                    //        });
                    //    }

                    //    return deferred.promise;
                    //}

                    var addFaqs = function (cultureName, rowVersion, faqList) {

                        var oldItems = JSON.parse(localStorage.getItem('faq-' + cultureName)) || [];

                        var newItem = {
                            'ResourceName': '',
                            'ResourceValue': ''
                        };
                        if (oldItems.length == 0) { //add blank entry
                            oldItems.push(newItem);
                        }

                        var newResources = []; // storiing resource name and values in Array
                        angular.forEach(resourceList, function (item) {
                            var item = {
                                "ResourceName": item.ResourceName,
                                "ResourceValue": item.ResourceValue
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
                                    angular.forEach(engItems, function (newitem) {
                                        if (!itemExisted) {
                                            angular.forEach(engItems, function (olditem) {
                                                if (engItems.ResourceName === newitem.ResourceName) {
                                                    // item exist - no actions 
                                                    itemExisted = true;
                                                }
                                            });

                                            if (!itemExisted) {
                                                var ritem = {
                                                    "ResourceName": newitem.ResourceName,
                                                    "ResourceValue": newitem.ResourceValue
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
                                            if (olditem.ResourceName === newitem.ResourceName && olditem.resourceValue != newitem.ResourceValue) {
                                                // item exist - no actions 
                                                olditem.ResourceValue = newitem.ResourceValue;
                                                itemExisted = true;
                                            }
                                        });

                                        if (!itemExisted) {
                                            var ritem = {
                                                "ResourceName": newitem.ResourceName,
                                                "ResourceValue": newitem.ResourceValue
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

                        var version = getFaqData(cultureName, rowVersion, oldItems, refereshPeriod, true);

                       
                        return oldItems;
                    }
                    var getFaqData = function (cultureName, rowVersion, faqList, refereshPeriod, hasUpdate) {

                        var versions = JSON.parse(localStorage.getItem('faqs')) || [];

                        var data = {
                            "CultureName": cultureName,
                            "RowVersion": '',
                            "RefereshPeriod": refereshPeriod,
                            "FaqList": ''

                        };

                        hasExitedItem = false;
                        if (versions.length > 0) {
                            //existed then retruns the values 
                            angular.forEach(versions, function (item) {

                                if (item.CultureName === cultureName && !hasExitedItem) {
                                    hasExitedItem = true;
                                    if (hasUpdate) {
                                        item.RowVersion = rowVersion;
                                        item.RefereshPeriod = refereshPeriod
                                        item.ResourceList = resouceList
                                        data.RowVersion = rowVersion;
                                        data.RefereshPeriod = refereshPeriod;
                                        data.ResourceList = resouceList;
                                    }
                                    else {
                                        data.CultureName = cultureName;
                                        data.RowVersion = item.RowVersion;
                                        data.RefereshPeriod = item.RefereshPeriod;
                                        data.ResourceList = item.ResourceList;
                                    }
                                }

                            });
                        }

                        if (!hasExitedItem) {
                            versions.push(data);
                            localStorage.setItem('faqs', JSON.stringify(versions));
                            //  console.log('New Version' + data.CultureName + data.RowVersion);
                        }
                        if (hasUpdate && hasExitedItem) {
                            localStorage.setItem('faqs', JSON.stringify(versions));
                            //    console.log('Update Version' + data.CultureName + data.RowVersion)

                        }
                        console.log('ref' + data.RefereshPeriod);
                        return data;
                    }

                    var getFaqs = function () {

                        currentCultureName = cultureName;

                        var deferred = $q.defer();

                        //localStorage.clear();

                        var versionData = getFaqData(cultureName, version, [], refereshPeriod, false);

                        version = versionData.RowVersion;

                        var forceReferesh = false; // refresh the page once a day

                        if (versionData) {
                            version = versionData.RowVersion;
                            var resources = versionData.ResourceList;

                            if (resources.length > 0 && versionData.RefereshPeriod == refereshPeriod) {
                                resourceData = resources;

                                deferred.resolve(resources);
                            }
                            else {

                                forceReferesh = true;
                            }

                        }
                        if (forceReferesh) {
                            console.log('force server refrrsh' + forceReferesh);
                            forceGetFaqs(cultureName, version).then(function (result) {

                                resourceData = result;
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