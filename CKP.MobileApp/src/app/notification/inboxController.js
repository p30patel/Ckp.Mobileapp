
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
    $scope.PageSize = 30;
    $scope.CurrentPage = 1;

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
   
    var getInboxMessages = function () {
        kendo.mobile.application.showLoading();

        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.getInbox");
        }
        var jsonIn = {
            PageSize: $scope.PageSize,
            PageNumber: $scope.CurrentPage,
            UserId: 0,
        };
        notificationDataService.getInboxMessages(jsonIn).then(function (result) {
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
    getInboxMessages();


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

    var updateInbox = function(jsonIn)
    {
        notificationDataService.updateInboxMessage(jsonIn).then(function (result) {
            if (result !== 'success') {
                $scope.message = "Faild to save data, Please try later<br>";
                $timeout(function () {
                    $scope.message = "";
                }, 7000);
            }
            else {
                if (jsonIn.HasDelete)
                {
                    //mark as delete
                }
                else {
                    // mark as read
                }
            }
        }).catch(function (error) {

            $scope.message = "Faild to update message.";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        });
    }
    $scope.delete = function(e, id)
    {
        var jsonIn = {
            Id: id,
            Status: 105,
            HasDelete : true
        };
        updateInbox(jsonIn);
    }

    $scope.read = function(e, id)
    {
        var jsonIn = {
            Id: id,
            Status: 103,
            HasDelete: false
        };
        updateInbox(jsonIn);
    }

    $scope.renderHtml = function (message) {

        return $sce.trustAsHtml(message);
    };

}
]);