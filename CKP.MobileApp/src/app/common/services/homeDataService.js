
'use strict';

app.factory("homeDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "timeStampService", "$rootScope",
function ($http, $q, localStorageService, ngAuthSettings, authService, timeStampService, $rootScope) {

    var authServiceBase = ngAuthSettings.authServiceBaseUri;

    var homeDataServiceFactory = {
    };
    var date = kendo.toString(new Date(), "yyyy-MM-dd HH");

    var forceGetOrderCounts = function (data) {
        var deferred = $q.defer();

        var organizationDetail = localStorageService.get('organizationDetail');

        var jsonIn = {
            OrderNumber: data.OrderNumber,
            ShoppingCartId: data.ShoppingCartId,
            SalesOrderNumber: data.SalesOrderNumber,
            VendorRef: data.VendorRef,
            OrganizationDetail: organizationDetail,
            SearchType: data.SearchType
        }


        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderCounts";
        $http.post(url, jsonIn).success(function (result) {

            $rootScope.hasPreviousSearch = $rootScope.hasSearchOrApporval;
            $rootScope.hasSearchOrApporval = false;
            $rootScope.timeStampOrderCount = new Date().getTime();
            console.log('order count loaded from server');
            localStorageService.set('orderCounts', result);

            deferred.resolve(result);

        }).error(function (err, status) {
            deferred.reject(err);

        });


        return deferred.promise;
    };

    var getOrderCounts = function (data) {
        var deferred = $q.defer();
        var organizationDetail = localStorageService.get('organizationDetail');
        var orderCounts = localStorageService.get('orderCounts');
        var hasForceRefresh = true;
        var timeNow = new Date().getTime();
        var persistTime = 1000 * 60 * 2;

        if (orderCounts !== null && !$rootScope.hasSearchOrApporval && !$rootScope.hasPreviousSearch) {
            if (persistTime && timeNow > Number($rootScope.timeStampOrderCount) + persistTime) {
                hasForceRefresh = true;
            }
            else {
                hasForceRefresh = false;
            }
        }

        if (!hasForceRefresh) {
            console.log('order count loaded from local' + orderCounts);
            deferred.resolve(orderCounts);
        }
        else {
            forceGetOrderCounts(data).then(function (result) {
                deferred.resolve(result);
            });
        }


        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("search.SearchType." + data.SearchType);
        }
        return deferred.promise;
    };

    var forceGetOrderSummary = function (jsonIn) {
        var deferred = $q.defer();

        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderSummary";

        var organization = localStorageService.get('organizationDetail');
        if (!organization) {
        }

        jsonIn.UserId = organization.UserId;

        $http.post(url, jsonIn).success(function (result) {

            deferred.resolve(result);
        }).error(function (xhr, status, error) {

            deferred.reject(error);

        });

        return deferred.promise;
    };

    var getOrderSummary = function (jsonIn) {
        var deferred = $q.defer();

        forceGetOrderSummary(jsonIn).then(function (result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    };

    var setDefaultNotifcations = function () {
        var deferred = $q.defer();
        var userProfileData = localStorageService.get('user-profile');

        var organizationDetail = localStorageService.get('organizationDetail');

        if ((typeof userProfileData.HasTrunOnNotifcation !== 'undefined' || !userProfileData.HasTrunOnNotifcation) && organizationDetail) {

            var url = authServiceBase + "webapi/api/core/MobileApp/SetDefaultNotification";
            $http.post(url, organizationDetail).success(function (result) {
                if (result === 'success') {
                    if (typeof userProfileData === 'undefined') {
                        var userProfile = {
                            SearchType: 'OrderNumber',
                            SelectedPara: '1',
                            HasReadNote: true,
                            IsFirtTime: true,
                            HasTrunOnNotifcation: true,
                            HasForceClearAll: false,
                            HasClearBadgeCount : false
                        };
                        localStorageService.set('user-profile', userProfile);
                    }
                    else {
                        userProfileData.HasTrunOnNotifcation = true;
                        localStorageService.set('user-profile', userProfileData);
                    }
                }
                deferred.resolve(result);

            }).error(function (err, status) {
                deferred.reject(err);
            });
        }
        else {
            deferred.resolve('success');
        }

        return deferred.promise;

    };


    homeDataServiceFactory.getOrderCounts = getOrderCounts;
    homeDataServiceFactory.forceGetOrderCounts = forceGetOrderCounts;

    homeDataServiceFactory.getOrderSummary = getOrderSummary;
    homeDataServiceFactory.forceGetOrderSummary = forceGetOrderSummary;

    homeDataServiceFactory.setDefaultNotifcations = setDefaultNotifcations;

    return homeDataServiceFactory;
}
]);