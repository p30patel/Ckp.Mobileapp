app.factory('translateService',
        ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {

        var translateFactory = {};
        var currentCultureName = 'en-US';
        var refereshPeriod = new Date().getDay() % 2 == 0;
        var forceReferesh = false;



        var forceGetResourceUpdates = function (cultureName, rowVersion) {

            var deferred = $q.defer();

            var url = "https://qachecknet.checkpt.com/webapi/api/core/MobileApp/GetResourceUpdates?cultureName=" + cultureName + "&rowVersion=" + rowVersion;

            $http.get(url).success(function (result) {


                //if (result.CultureResourceList !== null && result.CultureResourceList.length > 0) {
                //    var newResoruces = {};
                //    newResoruces = result.CultureResourceList;
                //    UpdateLocalStorageResource(cultureName, rowVersion, newRowVersion, newResoruces);
                //}

                //else {
                //    //set english if not returns
                //    var resources = getResources('en-US', '');
                //    alert(resources.resourceList);
                //    console.log('eng resources : ' + resources);
                //    UpdateLocalStorageResource(cultureName, rowVersion, newRowVersion, resources);
                //}
                addResources(cultureName, result.CultureResourceList);
                deferred.resolve(result);

            }).error(function (err, status) {
                deferred.reject(err);

            });

            return deferred.promise;


        }

        var addResources = function (cultureName, resource) {
            var oldItems = JSON.parse(localStorage.getItem(cultureName)) || [];

            console.log('old item counts:' + oldItems.length);

            var newResources = []; // storiing resource name and values in Array
            angular.forEach(resource, function (item) {
                var item = {
                    "ResourceName": item.ResourceName,
                    "ResourceValue": item.ResourceValue
                }
                newResources.push(item);
            });

            //check if the resoruce name is existed, if Yes then Update , No then push

            if (newResources.length > 0) {
                var itemExisted = false;
                angular.forEach(newResources, function (newitem) {
                    if (!itemExisted) {
                        angular.forEach(oldItems, function (olditem) {
                            if (olditem.ResourceName === newitem.ResourceName && olditem.ResourceValue == newitem.ResourceValue) {
                                //same item - no action
                                itemExisted = true;
                            }
                            else if (olditem.ResourceName === newitem.ResourceName && olditem.ResourceValue !== newitem.ResourceValue) {
                                //resoruce value are changes - update
                                olditem.ResourceValue = newitem.ResourceValue;
                                itemExisted = true;

                            }//else push entry 
                        });

                        if (!itemExisted) {
                            var ritem = {
                                "ResourceName": newitem.ResourceName,
                                "ResourceValue": newitem.ResourceValue
                            }
                            oldItems.push(ritem);
                            console.log('Item not existed Existed: push new:' + newitem.ResourceValue);
                            itemExisted = false;
                        }
                    }
                });
                localStorage.setItem(cultureName, JSON.stringify(oldItems));


            }
            else {
                //other than en-US set value of en-US for selected culture

                var oldItems = JSON.parse(localStorage.getItem('en-US'));
                console.log('Default en-US:' + oldItems.length);

                localStorage.setItem(cultureName, JSON.stringify(oldItems));

            }

            var oldItems = JSON.parse(localStorage.getItem(cultureName)) || [];
            console.log('getting new resources:' + cultureName + "=" + oldItems.length);
            angular.forEach(oldItems, function (item) {
                console.log(item.ResourceName + "=>" + item.ResourceValue);
            });


            return true;
        }
        var getResources = function (cultureName, rowVersion) {
            // var resources = JSON.parse(localStorage.getItem(cultureName)) || [];
            var resources = JSON.parse(localStorage.getItem('resources')) || [];
            if (resources.length > 0) {
                //existed then retruns the values 
                angular.forEach(resources, function (item) {
                    if (item.CultureName === cultureName) {
                        console.log('culture existed' + item.CultureName + item.RowVersion + item.ResourceList)
                        resourceValue = item.ResourceValue;
                        return resourceValue;
                    }
                });
            }
            else {
                //add new
                var item = {

                    "CultureName": cultureName,
                    "RowVersion": rowVersion,
                    "ResourceList": []
                }
                resources.push(item);
                console.log('culture add new ' + item.RowVersion + item.ResourceList)
            }

            localStorage.setItem('resources', JSON.stringify(resources));

            return resources;
        }

        var getResourceUpdates = function (cultureName, version) {

            currentCultureName = cultureName;
            var deferred = $q.defer();

            var resources = getResources(cultureName, version);

            console.log('get resource:');

            if (resources) {
                deferred.resolve(resources);
            }
            else {
                forceGetResourceUpdates(cultureName, version).then(function (result) {
                    deferred.resolve(result);
                    resources = result;
                });
            }

            return deferred.promise;
        }


        var getResourceValue = function (resourceName) {
            var resourceValue = 'Not : ' + resourceName;
            var resources = getResources(currentCultureName, '');
            angular.forEach(resources.ResourceList, function (item) {
                if (item.ResourceName === resourceName) {
                    resourceValue = item.ResourceValue;
                    return resourceValue;
                }
            });
            return resourceValue;
        }


        translateFactory.addResources = addResources;
        translateFactory.getResourceUpdates = getResourceUpdates;
        translateFactory.forceGetResourceUpdates = forceGetResourceUpdates;
        translateFactory.getResourceValue = getResourceValue;

        return translateFactory;
    }]);