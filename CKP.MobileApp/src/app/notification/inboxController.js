
app.controller('inboxController', ['$scope', '$http', '$sce', 'translateService', 'authService', 'notificationDataService', '$timeout', 'localStorageService',
function ($scope, $http, $sce, translateService, authService, notificationDataService, $timeout, localStorageService) {

    $scope.form = {};

    $scope.form.title = {};
    $scope.form.title.resoruceName = "Inbox";
    $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

    $scope.form.viewAll = {};
    $scope.form.viewAll.resoruceName = "View Next";
    $scope.form.viewAll.resoruceValue = translateService.getResourceValue($scope.form.viewAll.resoruceName);

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
    $scope.PageSize = 5;
    $scope.CurrentPage = 1;
    $scope.hasNext = false;
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
   
    var getInboxMessages = function (hasNext) {
        kendo.mobile.application.showLoading();

        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.getInbox");
        }
        if (hasNext)
        {
            $scope.CurrentPage++;
        }
        var jsonIn = {
            PageSize: $scope.PageSize,
            PageNumber: $scope.CurrentPage,
            UserId: 0,
        };
        notificationDataService.getInboxMessages(jsonIn).then(function (result) {           
            kendo.mobile.application.hideLoading();           
            if (hasNext)
            {
                var currentNotifications = $scope.notifications;
              
                angular.forEach(result, function (value, key) {
                    if (key <= result.length) {
                        currentNotifications.push(value);
                    }
                });

                $scope.notifications = currentNotifications;
            }
            else {
                $scope.notifications = result;
            }
            $scope.hasNext = result.length >= $scope.PageSize;
        }).catch(function (error) {
            kendo.mobile.application.hideLoading();
            $scope.message = "Faild to get notifcation.";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        });
    }
    getInboxMessages(false);

    $scope.delete = function (e, id) {
        var jsonIn = {
            Id: id,
            Status: 105,
            HasDelete: true
        };
        updateInbox(jsonIn);
    }


    var markAsRead = function (e) {
        alert('in');
        //var jsonIn = {
        //    Id: id,
        //    Status: 103,
        //    HasDelete: false
        //};

        //updateInbox(jsonIn);
        // $('#pushTitleId-' + id).removeClass('km-bold-font');

    }

    var touchstart = function(e)
    {
        alert('touch start');

    }

    var touchend = function (e) {
        alert('touch touchend');

    }
    $scope.myTouch = {
        filter: ">li",
        enableSwipe: true,
        touchstart: touchstart,
        touchend: touchend,
        swipe: function (e) {
         
            var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
           
            
            if (e.direction === 'left') {
                if (e.direction === "left") {                  
                    button.expand().duration(200).play();
                    $(e.touch.currentTarget).animate({ "margin-left": "-50px" }, 500)
                    $(e.touch.currentTarget).css({ "width": "130%" });
                }
            }
            else {
                $(e.touch.currentTarget).animate({ "margin-left": "0px" }, 500)
               
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
                    $('#pushId-' + jsonIn.id).addClass('ck-hide');
                }
                
            }
        }).catch(function (error) {

            $scope.message = "Faild to update message.";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        });
    }
   
    $scope.ViewMore = function () {
        getInboxMessages(true);
    }
    $scope.renderHtml = function (message) {

        return $sce.trustAsHtml(message);
    };

}
]);