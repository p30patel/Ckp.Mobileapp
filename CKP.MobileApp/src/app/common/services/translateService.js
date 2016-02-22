app.factory('translateService',
        ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {

        var translateFactory = {};
        var currentCultureName = 'en-US';
        var refereshPeriod = new Date().getDay();
        var resourceData = [];

        var forceGetResourceUpdates = function (cultureName, rowVersion) {

            var deferred = $q.defer();

            var url = "https://qachecknet.checkpt.com/webapi/api/core/MobileApp/GetResourceUpdates?cultureName=" + cultureName + "&rowVersion=" + rowVersion;

            $http.get(url).success(function (result) {
                              
                var resources = addResources(cultureName, result.RowVersion, result.CultureResourceList);
                deferred.resolve(resources);

            }).error(function (err, status) {
                deferred.reject(err);

            });

            return deferred.promise;


        }

        var addResources = function (cultureName, rowVersion, resourceList) {

            var oldItems = JSON.parse(localStorage.getItem(cultureName)) || [];

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

            var engItems = JSON.parse(localStorage.getItem('en-US')) || [];

            //new logic starts
            if (oldItems.length == 1) // no items
            {
                if (newResources.length > 0) // has new resource but not old - set new resoruces
                {
                    console.log('new' + newResources.length + ' == eng ' + engItems.length);
                    if (newResources.length == engItems.length || engItems.length == 0 || cultureName === 'en-US') {
                        localStorage.setItem(cultureName, JSON.stringify(newResources));
                        console.log('set new list - no old - ' + newResources.length);
                    }
                    else {
                        var itemExisted = false;
                        angular.forEach(newResources, function (newitem) {
                            if (!itemExisted) {
                                angular.forEach(engItems, function (olditem) {
                                    if (olditem.ResourceName === newitem.ResourceName) {
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
                        localStorage.setItem(cultureName, JSON.stringify(newResources));
                        console.log('set new list - no old - updated with eng ' + newResources.length);
                    }
                }
                else {
                    if (cultureName !== 'en-US') // no old - no new - not a en-US culture then copy en-US
                    {
                        localStorage.setItem(cultureName, JSON.stringify(engItems));
                        console.log('set default - eng:' + engItems.length);
                    }
                }
            }
            else {// has old items

                if (newResources.length > 0)
                {
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
                    localStorage.setItem(cultureName, JSON.stringify(oldItems));
                }
                else {               
                    console.log('no changes keep same old  list' );
                }
            
            }

            //update version
            var oldItems = JSON.parse(localStorage.getItem(cultureName)) || [];
           
            var version = getVersion(cultureName, rowVersion, oldItems, refereshPeriod, true);
        
    
            // console.log('final list resources : ' + oldItems.length);
            return oldItems;
        }
       

        var getVersion = function (cultureName, rowVersion, resouceList, refereshPeriod, hasUpdate) {
         
            var versions = JSON.parse(localStorage.getItem('versions')) || [];
            var persistTime = 1000 * 60 * 4320;    // Expiration in milliseconds; set to null to never  // curent is 3 days
            var data = {
                "CultureName":  cultureName,
                "RowVersion": '',
                "RefereshPeriod": refereshPeriod,
                "LastUpdated": 0,
                "ResourceList": '',
                "PersistTime": persistTime
             
             
            };
            
            hasExitedItem = false;
            if (versions.length > 0) {
                //existed then retruns the values 
                angular.forEach(versions, function (item) {
                  
                    if (item.CultureName === cultureName && !hasExitedItem) {
                      
                        hasExitedItem = true;
                        if (hasUpdate) {
                         
                            item.RowVersion = rowVersion;
                            item.RefereshPeriod = refereshPeriod;
                            item.ResourceList = resouceList;
                            item.LastUpdated = new Date().getTime();

                            data.RowVersion = rowVersion;
                            data.RefereshPeriod = refereshPeriod;
                            data.ResourceList = resouceList;
                            data.LastUpdated = new Date().getTime();
                            data.PersistTime = persistTime;
                         
                            }
                        else {
                            
                            data.CultureName = cultureName;
                            data.RowVersion = item.RowVersion;
                            data.RefereshPeriod = item.RefereshPeriod;
                            data.ResourceList = item.ResourceList;
                            data.LastUpdated = item.LastUpdated;
                            data.PersistTime = persistTime;
                        }
                    }

                });
            }

            if (!hasExitedItem) {
                versions.push(data);
                localStorage.setItem('versions', JSON.stringify(versions));
               
            }
            if (hasUpdate && hasExitedItem) {

                localStorage.setItem('versions', JSON.stringify(versions));
              
            
            }
       
            return data;
        }

        var getResourceUpdates = function (cultureName, version) {

            currentCultureName = cultureName;
           
            var deferred = $q.defer();

           //localStorage.clear();

            var versionData = getVersion(cultureName, version, [], refereshPeriod, false);

            version = versionData.RowVersion;

            var forceReferesh = true;
           
            if (versionData) {
                version = versionData.RowVersion;
                var resources = versionData.ResourceList;
               
                if (versionData.PersistTime && new Date().getTime() > Number(versionData.LastUpdated) + versionData.PersistTime) {
                    forceReferesh = true;
                }
                else{
                    if (resources.length > 0)
                    {
                        forceReferesh = false;
                        resourceData = resources;
                      
                        deferred.resolve(resources);
                    }
                    else {
                        forceReferesh = true;
                    }
                    
                }
                  
            }
            if (forceReferesh) {
              
                forceGetResourceUpdates(cultureName, version).then(function (result) {
                
                    resourceData = result;
                   deferred.resolve(result);
                  
                });
            }

            return deferred.promise;
        }

  
        var getResourceValue = function (resourceName) {

          
            var resourceValue =  resourceName ;
            
            angular.forEach(resourceData, function (item) {
             
                if (item.ResourceName === resourceName) {
                  
                    resourceValue = item.ResourceValue ;
                    return resourceValue;
                }
            });
            return resourceValue;
        }

        var getCurrentCultureName = function () {
            var selectedLanguage = localStorageService.get('selectedLanguage');
       
            if (selectedLanguage)
            {
                currentCultureName = selectedLanguage;
            }
            else {
                currentCultureName = 'en-US';
            }
            return currentCultureName;
        }

        translateFactory.getCurrentCultureName = getCurrentCultureName
        translateFactory.addResources = addResources;
        translateFactory.getResourceUpdates = getResourceUpdates;
        translateFactory.forceGetResourceUpdates = forceGetResourceUpdates;
        translateFactory.getResourceValue = getResourceValue;

        return translateFactory;
    }]);