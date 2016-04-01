
app.controller('inboxController', ['$scope', '$http', '$sce', 'translateService', 'authService', 'notificationDataService', '$timeout', 'localStorageService',
function ($scope, $http, $sce, translateService, authService, notificationDataService, $timeout, localStorageService) {

    $scope.form = {};

    $scope.form.title = {};
    $scope.form.title.resoruceName = "Inbox";
    $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

    $scope.beforeShow = function () {
        kendo.mobile.application.showLoading();
        if (!authService.authentication.isAuth) {
            authService.logout();
            kendo.mobile.application.navigate("src/app/login/login.html");
        }
        kendo.mobile.application.hideLoading();

    };
    $scope.message = "";
    $scope.notifications = [];

    $scope.afterShow = function (e) {

        var view = kendo.mobile.application.view();
        if (view !== null) {
            var navbar = kendo.mobile.application.view()
                         .header
                         .find(".km-navbar")
                         .data("kendo-mobile-nav-bar");
            navbar.title($scope.form.title.resoruceValue);

            if (typeof (window.navigator.simulator) === 'undefined') {
                window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.inbox");
            }

        }
    }

    var setResources = function () {
        $scope.form.noData = {};
        $scope.form.noData.resoruceName = "No Data are found";
        $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

    }

    setResources();
   
    var getNotifications = function () {
        kendo.mobile.application.showLoading();

        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.getInbox");
        }
        notificationDataService.getUserNotifications().then(function (result) {
            kendo.mobile.application.hideLoading();
            $scope.notifications = result;
        }).catch(function (error) {
            kendo.mobile.application.hideLoading();
            $scope.message = "Faild to get notifcation.";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        });
    }
    getNotifications();


    $scope.myTouch = {
        filter: ">li",
        enableSwipe: true,
       
        swipe: function (e) {
            var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
           
            
            if (e.direction === 'left') {
                button.expand().duration(60).play();
            }
            else {
                $(e.touch.currentTarget).find("[data-role=button]:visible").hide();
            }
        },
    }

   
    $scope.delete = function(e, index)
    {
       
       
        $scope.notifications.splice(index, 1); //remove the item from the 'added' observable array
        
    }

    $scope.renderHtml = function (message) {

        return $sce.trustAsHtml(message);
    };

}
]);