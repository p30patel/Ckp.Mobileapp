
app.controller('feedbackController', [
                   '$scope', '$http', '$sce', 'feedbackDataService', 'authService', 'translateService', '$timeout',
function ($scope, $http, $sce, feedbackDataService, authService, translateService, $timeout) {

    $scope.form = {};

    $scope.form.title = {};
    $scope.form.title.resoruceName = "Feedback";
    $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);
    $scope.afterShow = function (e) {

        var view = kendo.mobile.application.view();
        if (view !== null) {
            var navbar = kendo.mobile.application.view()
                         .header
                         .find(".km-navbar")
                         .data("kendo-mobile-nav-bar");
            navbar.title($scope.form.title.resoruceValue);

        }
    }

    var setResources = function () {

        $scope.form.feedback = {};
        $scope.form.feedback.resoruceName = "Have something to share? Let us know here";
        $scope.form.feedback.resoruceValue = translateService.getResourceValue($scope.form.feedback.resoruceName);

        $scope.form.send = {};
        $scope.form.send.resoruceName = "Send";
        $scope.form.send.resoruceValue = translateService.getResourceValue($scope.form.send.resoruceName);

        $scope.form.thankyou = {};
        $scope.form.thankyou.resoruceName = "Thank you for your feedback";
        $scope.form.thankyou.resoruceValue = translateService.getResourceValue($scope.form.thankyou.resoruceName);

        $scope.form.failFeedback = {};
        $scope.form.failFeedback.resoruceName = "Faild to post feedback, Please try later";
        $scope.form.failFeedback.resoruceValue = translateService.getResourceValue($scope.form.failFeedback.resoruceName);

    }
    setResources();

    $scope.feedbackData = {};
    $scope.feedbackData.webpage = "Mobile App";
    $scope.feedbackData.comment = "";

    $scope.message = "";
    var init = function () {
        if (!authService.authentication.isAuth) {
            authService.logout();
          
            kendo.mobile.application.navigate("src/app/login/login.html");
        }

    };
    init();
    $scope.renderHtml = function (content) {
        return $sce.trustAsHtml(content);
    };

    $scope.send = function () {
        kendo.mobile.application.pane.loader.show();
        feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
            if (result === 'success') {

                $scope.message = $scope.form.thankyou.resoruceValue;
                $timeout(function () {
                    $scope.message = "";
                }, 7000);

                $scope.feedbackData.comment = "";
            } else {

                $scope.message = "";
                $timeout(function () {
                    $scope.message = "";
                }, 7000);
            }
        }).catch(function (error) {

            $scope.message = $scope.form.failFeedback.resoruceValue;
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        }).finally(function () {
            kendo.mobile.application.pane.loader.hide();
        });
    }
}
]);