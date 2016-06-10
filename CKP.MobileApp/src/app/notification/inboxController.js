
app.controller('inboxController', ['$scope', '$http', '$sce', 'translateService', 'authService', 'notificationDataService', '$timeout', 'localStorageService', '$filter',
function ($scope, $http, $sce, translateService, authService, notificationDataService, $timeout, localStorageService, $filter) {

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
    $scope.successMessage = "";
    $scope.notifications = new kendo.data.ObservableArray([]);
    $scope.PageSize = 20;
    $scope.CurrentPage = 1;
    $scope.hasNext = false;

    $scope.total = 0;
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

        $scope.form.noMessages = {};
        $scope.form.noMessages.resoruceName = "No messages are found";
        $scope.form.noMessages.resoruceValue = translateService.getResourceValue($scope.form.noMessages.resoruceName);


        $scope.form.viewAll = {};
        $scope.form.viewAll.resoruceName = "View Next";
        $scope.form.viewAll.resoruceValue = translateService.getResourceValue($scope.form.viewAll.resoruceName);

        $scope.form.loading = {};
        $scope.form.loading.resoruceName = "Loading";
        $scope.form.loading.resoruceValue = translateService.getResourceValue($scope.form.loading.resoruceName);


        $scope.form.markAllAsRead = {};
        $scope.form.markAllAsRead.resoruceName = "Mark All As Read";
        $scope.form.markAllAsRead.resoruceValue = translateService.getResourceValue($scope.form.markAllAsRead.resoruceName);


        $scope.form.markAllAsDelete = {};
        $scope.form.markAllAsDelete.resoruceName = "Delete All";
        $scope.form.markAllAsDelete.resoruceValue = translateService.getResourceValue($scope.form.markAllAsDelete.resoruceName);

        $scope.form.yes = {};
        $scope.form.yes.resoruceName = "Yes";
        $scope.form.yes.resoruceValue = translateService.getResourceValue($scope.form.yes.resoruceName);

        $scope.form.no = {};
        $scope.form.no.resoruceName = "No";
        $scope.form.no.resoruceValue = translateService.getResourceValue($scope.form.no.resoruceName);

        $scope.form.deleteConfirm = {};
        $scope.form.deleteConfirm.resoruceName = "Are you sure want to Delete All?";
        $scope.form.deleteConfirm.resoruceValue = translateService.getResourceValue($scope.form.deleteConfirm.resoruceName);

        $scope.form.deleteConfirmTitle = {};
        $scope.form.deleteConfirmTitle.resoruceName = "Delete Confirmation";
        $scope.form.deleteConfirmTitle.resoruceValue = translateService.getResourceValue($scope.form.deleteConfirmTitle.resoruceName);

        
    }

    setResources();
    $scope.successMessage = $scope.form.loading.resoruceValue;
    var getInboxMessages = function (hasNext) {

        $scope.successMessage = $scope.form.loading.resoruceValue;
        kendo.mobile.application.showLoading();

        if (hasNext) {
            $scope.CurrentPage++;
        }
        var jsonIn = {
            PageSize: $scope.PageSize,
            PageNumber: $scope.CurrentPage,
            UserId: 0,
        };
        notificationDataService.getInboxMessages(jsonIn).then(function (result) {
            kendo.mobile.application.hideLoading();
            $scope.successMessage = $scope.form.noMessages.resoruceValue;
            if (hasNext) {
                var nextNumber = $scope.notifications.length + 1;
                var currentNotifications = $scope.notifications;

                angular.forEach(result, function (value, key) {
                    if (key <= result.length) {
                        value["Id"] = -1 * nextNumber++;
                        currentNotifications.push(value);
                    }
                });
                $scope.notifications = new kendo.data.ObservableArray(currentNotifications);
            }
            else {
                var nextNumber = 1;
                angular.forEach(result, function (value, key) {
                    value["Id"] = -1 * nextNumber++;
                });
                $scope.notifications = new kendo.data.ObservableArray(result);
            }
            $filter('orderBy')($scope.notifications, 'Id', true);
            $scope.hasNext = result.length >= $scope.PageSize;
            $scope.total = $scope.notifications.length;
        }).catch(function (error) {
            kendo.mobile.application.hideLoading();
            $scope.message = "Error while getting data.";
            $timeout(function () {
                $scope.message = "";
            }, 1000);

        });
    }
    getInboxMessages(false);
    
    var updateUnReadMessageCount = function() {
        notificationDataService.getUnReadMessageCount();
    }
    updateUnReadMessageCount();

    var updateStatus = function (jsonIn) {
        var hasFirstMatchFound = false;

        var currentNotifications = $scope.notifications;


        angular.forEach($scope.notifications, function (value, key) {
            if (!hasFirstMatchFound && value.PushNotificationMessageQueueId == jsonIn.Id) {

                if (jsonIn.HasDelete) {
                    hasFirstMatchFound = true;
                    $scope.notifications.splice(key, 1);
                }
                else {
                    value["Status"] = 104;
                }
            }
        });
        if (!jsonIn.hasRead) {
            console.log(currentNotifications);
            $scope.notifications = new kendo.data.ObservableArray(currentNotifications);
        }
    }

    $scope.delete = function ($event, id) {
        // $event.stopPropagation();
        var jsonIn = {
            Id: id,
            Status: 105,
            HasDelete: true
        };
        $('#pushId-' + id).closest('li').hide('slow');
        $('#pushId-' + id).closest('li').remove();
        updateStatus(jsonIn);
        updateInbox(jsonIn);
    }


    var markAsRead = function (id) {

        var jsonIn = {
            Id: id,
            Status: 104,
            HasDelete: false
        };
        updateStatus(jsonIn);
        updateInbox(jsonIn);
        $('#pushTitleId-' + id).removeClass('km-bold-font');
        $('#pushDateId-' + id).removeClass('km-bold-font');

    }


    $scope.myTouch = {
        filter: ">li",
        touchstart: function (e) {
            var id = e.sender.element.attr('data-id');
            var hasRead = e.sender.element.attr('data-status') == 104;
            var span = $(e.touch.currentTarget).closest("li");

            $('.delete').hide();

            $('.pushMessageDescription').addClass('ck-text-overflow');

            $('.pushMessage').closest('li').removeClass('ck-active');

            $('#msg-' + id).removeClass('ck-text-overflow');

            span.addClass('ck-active');

            $('.pushMessage').css({ "margin-left": "0px" });

            if (!hasRead) {
                markAsRead(id);
            }
            e.sender.element.attr('data-status', 104);
            $('#pushTitleId-' + id).removeClass('km-bold-font');
            $('#pushDateId-' + id).removeClass('km-bold-font');
            //
            var target = $(e.touch.initialTouch),
                 listview = $("#edit-listview").data("kendoMobileListView"),
                 model,
                 button = $(e.touch.target).find("[data-role=button]:visible");

            if (target.closest("[data-role=button]")[0]) {
                //delete               

                e.event.stopPropagation();
            } else if (button[0]) {
                button.hide();
                $('#msg-' + id).height('auto');

            } else {
                $('#msg-' + id).height('auto');
                listview.items().find("[data-role=button]:visible").hide();
            }
        },
        touchend: function (e) {

        },
        tap: function (e) {

            var id = e.sender.element.attr('data-id');
            $('#pushTitleId-' + id).removeClass('km-bold-font');
            $('#pushDateId-' + id).removeClass('km-bold-font');
            e.sender.element.attr('data-status', 104);
            // $('.pushMessageDescription').height('18px');
        },
        swipe: function (e) {
            var button = $(e.touch.currentTarget).find("[data-role=button]");
            var span = $(e.touch.currentTarget).closest("li");
            var hasRead = e.sender.element.attr('data-status') == 104;
            var id = e.sender.element.attr('data-id');

            if (e.direction === 'left') {
                $(e.touch.currentTarget).animate({ "margin-left": "-50px" }, 'fast');
                $('#msg-' + id).addClass('ck-text-overflow');
                $('#msg-' + id).width('100%');

                button.show();
            }
            else {
                e.sender.element.attr('data-status', 104);
                $('#pushTitleId-' + id).removeClass('km-bold-font');
                $('#pushDateId-' + id).removeClass('km-bold-font');
                $(e.touch.currentTarget).animate({ "margin-left": "0px" }, "fast");
                button.hide();
                if (!hasRead) {
                    markAsRead(id);
                }

                $('#msg-' + id).height('auto');
                $('#msg-' + id).width('100%');

            }
        },
    }

    var updateInbox = function (jsonIn) {
        $scope.total = $('.pushMessage').length;

        notificationDataService.updateInboxMessage(jsonIn).then(function (result) {

            if (result !== 'success') {
                $scope.message = "Error while saving the data, Please try later<br>";
                $timeout(function () {
                    $scope.message = "";
                }, 1000);
            }
          
        }).catch(function (error) {

            $scope.message = "Error while update the data.";
            $timeout(function () {
                $scope.message = "";
            }, 1000);

        });
    }
    var updateMessageStatusWithMarkAll = function(status)
    {
        var notifcationData = {
            UserId: '',
            Status: status
        };

        notificationDataService.updateMessageStatusWithMarkAll(notifcationData).then(function (result) {

            if (result !== 'success') {
                $scope.message = "Error while update the data, Please try later<br>";
                $timeout(function () {
                    $scope.message = "";
                }, 1000);
            }
            else {
                if (status == 104)
                {
                    $('.pushMessage').attr('data-status', 104);
                    $('.ck-title-setting').removeClass('km-bold-font');
                    $('.push-date').removeClass('km-bold-font');
                }
                if (status == 105) {
                    $scope.notifications = {};
                    $scope.hasNext = false;
                    $scope.total = 0;
                }
            }
           
        }).catch(function (error) {

            $scope.message = "Error while update the data.";
            $timeout(function () {
                $scope.message = "";
            }, 1000);

        });
    }
    $scope.markAllAsRead = function () {
        var status = 104;
        updateMessageStatusWithMarkAll(status);
    }

    $scope.markAllAsDelete = function () {
        var buttons = [];
        buttons.push($scope.form.yes.resoruceValue);
        buttons.push($scope.form.no.resoruceValue);
        
        navigator.notification.confirm($scope.form.deleteConfirm.resoruceValue, onDeleteConfirm, $scope.form.deleteConfirmTitle.resoruceValue, buttons);
    }
    var onDeleteConfirm = function (buttonIndex) {
       
        if (buttonIndex == 1)
        {
            var status = 105;
            updateMessageStatusWithMarkAll(status);
        }
    }
    $scope.ViewMore = function () {
        getInboxMessages(true);
    }
    $scope.renderHtml = function (message) {

        return $sce.trustAsHtml(message);
    };

}
]);



