'use strict';
app.controller('loginController', [
                   '$scope', '$http', 'authService', 'translateService', 'localStorageService', 'loginDataService', '$q', '$timeout', '$filter', 'ngAuthSettings', '$sce', 'faqDataService', 'policyTermsDataService',
function ($scope, $http, authService, translateService, localStorageService, loginDataService, $q, $timeout, $filter, ngAuthSettings, $sce, faqDataService, policyTermsDataService) {
    $scope.title = '';

    //login page html lables
    $scope.loginData = {};
    $scope.form = {};
    window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.login");
    var setResources = function () {
        $scope.form.username = {};
        $scope.form.username.resoruceName = "User Name";
        $scope.form.username.resoruceValue = "User Name";
        $scope.form.password = {};
        $scope.form.password.resoruceName = "Password";
        $scope.form.password.resoruceValue = "Password";

        $scope.form.forgotPassword = {};
        $scope.form.forgotPassword.resoruceName = "Forgot Password";
        $scope.form.forgotPassword.resoruceValue = "Forgot Password";

        $scope.form.passwordHint = {};
        $scope.form.passwordHint.resoruceName = "Password Hint";
        $scope.form.passwordHint.resoruceValue = "Password Hint";

        $scope.form.signin = {};
        $scope.form.signin.resoruceName = "Log In";
        $scope.form.signin.resoruceValue = "Log In";

        $scope.form.remmberMe = {};
        $scope.form.remmberMe.resoruceName = "Remember me";
        $scope.form.remmberMe.resoruceValue = "Remember me";


        $scope.form.email = {};
        $scope.form.email.resoruceName = "Email";

        $scope.form.receiveNewPasswordText = {};
        $scope.form.receiveNewPasswordText.resoruceName = "Please enter your email address to receive a new password";
        $scope.form.receiveNewPasswordText.resoruceValue = "Please enter your email address to receive a new password";

        $scope.form.forgotYourPassword = {};
        $scope.form.forgotYourPassword.resoruceName = "Forgot Your Password";
        $scope.form.forgotYourPassword.resoruceValue = "Forgot Your Password";


        $scope.form.sendNewPassword = {};
        $scope.form.sendNewPassword.resoruceName = "Send New Password";
        $scope.form.sendNewPassword.resoruceValue = "Send New Password";

        $scope.form.copyRightsText = {};
        $scope.form.copyRightsText.resoruceName = "Material contained on this app is Copyright";
        $scope.form.copyRightsText.resoruceValue = "Material contained on this app is Copyright";

        $scope.form.copyRightsDescription = {};
        $scope.form.copyRightsDescription.resoruceName = "Unauthorized access disclaimer";
        $scope.form.copyRightsDescription.resoruceValue = "Unauthorized access disclaimer";


        $scope.form.hint = {};
        $scope.form.hint.resoruceName = "Hint";
        $scope.form.hint.resoruceValue = "Hint";

        $scope.form.passwordSentText = {};
        $scope.form.passwordSentText.resoruceName = "Password sent to your email address";
        $scope.form.passwordSentText.resoruceValue = "Password sent to your email address";
    }

    setResources();
    //end page html 
    var d = new Date();
    $scope.year = d.getFullYear();
    $scope.languages = {};
    $scope.passwordHint = "";

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: true
    };
    $scope.translations = {};
    $scope.message = "";

   
    var languages = function () {
        $scope.languages = [{ Name: "English", Culture: "en-US", Id: 1, Error: "" }];

        var languageData = localStorageService.get('languageData');

        if (languageData) {
            $scope.languages = languageData;
        } else {
            loginDataService.forceGetLanguages().then(function (result) {
                $scope.languages = result;
            });
        }

        var selectedLanguage = localStorageService.get('selectedLanguage');

        if (selectedLanguage) {
            $scope.selectedLanague = selectedLanguage;
        } else {
            $scope.selectedLanague = 'en-US';
            localStorageService.set('selectedLanguage', $scope.selectedLanague);

        }


        //set user name pass if set remmber on.
        var loginData = localStorageService.get('loginData');

        if (loginData) {
            if (loginData.remmberme) {
                $scope.loginData.userName = loginData.userName;
                $scope.loginData.password = loginData.password;
                $scope.loginData.useRefreshTokens = loginData.remmberme
            }
        } else {
            $scope.loginData.userName = ""
            $scope.loginData.password = "";
            $scope.loginData.useRefreshTokens = false;
        }
    };
    languages(); //init languages


    //forgot password 
    $scope.loginData.email = "";
    $scope.forgotPasswordModalOpen = function () {
        $scope.loginData.email = "";
        $scope.forgotPassworMessage = "";
        $("#modalview-password").kendoMobileModalView("open");
    };
    $scope.closeModalViewForgotPassword = function () {
        $("#modalview-password").kendoMobileModalView("close");
    };

    $scope.sendPassword = function () {
        $('#btnSendPassword').focus();
        window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.login.sendPassword");
        kendo.mobile.application.pane.loader.show();
        var username = $scope.loginData.userName;
        var email = $scope.loginData.email;
        var message = "";

        loginDataService.resetPassword(username, email)
            .then(function (result) {
                message = $scope.form.passwordSentText.resoruceValue + ".";
                $scope.forgotPassworMessage = message;
                $timeout(function () {
                    $scope.forgotPassworMessage = "";
                    $("#modalview-password").kendoMobileModalView("close");
                }, 7000);
                kendo.mobile.application.pane.loader.hide();

            })
            .catch(function (err) {
                message = "User name and email combination does not match!";
                kendo.mobile.application.pane.loader.hide();
                $scope.forgotPassworMessage = message;
                $timeout(function () {
                    $scope.forgotPassworMessage = "";
                }, 7000);

            });
    };
    //end forgot password

    var loginData = {
        userName: '',
        password: '',
        remmberme: true

    };



    //trsnasaltion

    var translatePage = function () {

        var selectedLanague = $scope.selectedLanague;
        var rowVersion = "";

        localStorageService.set('selectedLanguage', selectedLanague);
        kendo.mobile.application.pane.loader.show();
        translateService.getResourceUpdates(selectedLanague, rowVersion).then(function (result) {

            $scope.form.username.resoruceValue = translateService.getResourceValue($scope.form.username.resoruceName);
            $scope.form.password.resoruceValue = translateService.getResourceValue($scope.form.password.resoruceName);
            $scope.form.passwordHint.resoruceValue = translateService.getResourceValue($scope.form.passwordHint.resoruceName);
            $scope.form.signin.resoruceValue = translateService.getResourceValue($scope.form.signin.resoruceName);
            $scope.form.remmberMe.resoruceValue = translateService.getResourceValue($scope.form.remmberMe.resoruceName);

            $scope.form.receiveNewPasswordText.resoruceValue = translateService.getResourceValue($scope.form.receiveNewPasswordText.resoruceName);


            $scope.form.copyRightsDescription.resoruceValue = translateService.getResourceValue($scope.form.copyRightsDescription.resoruceName);

            $scope.form.copyRightsText.resoruceValue = translateService.getResourceValue($scope.form.copyRightsText.resoruceName);
            $scope.form.sendNewPassword.resoruceValue = translateService.getResourceValue($scope.form.sendNewPassword.resoruceName);
            $scope.form.forgotYourPassword.resoruceValue = translateService.getResourceValue($scope.form.forgotYourPassword.resoruceName);
            $scope.form.email.resoruceValue = translateService.getResourceValue($scope.form.email.resoruceName);

            $scope.form.hint.resoruceValue = translateService.getResourceValue($scope.form.hint.resoruceName);
            $scope.form.passwordSentText.resoruceValue = translateService.getResourceValue($scope.form.passwordSentText.resoruceName);

            kendo.mobile.application.pane.loader.hide();
        });

        //Faq
    

        faqDataService.getFaqs(selectedLanague).then(function (result) {
            $scope.faqs = result;

        }).catch(function (error) {
            $scope.faqs = {};
        }).finally(function () {
        
        });

        //end faq
        //terms & conditions
        
        policyTermsDataService.getPolicyTerms().then(function (result) {
            $scope.termsCondition = result;

        }).catch(function (error) {
            $scope.termsCondition = {};
        }).finally(function () {
    
        });
        //end
        //policies
    

        policyTermsDataService.getPolicyTerms().then(function (result) {
            $scope.policies = result;

        }).catch(function (error) {
            $scope.policies = {};
        }).finally(function () {
    
        });


    }
 
    $scope.beforeShow = function (e) {
      
    }

    $scope.intShow = function (e) {
        
        translatePage();
    };

    $scope.translatePage = function () {
     
        translatePage();
    };

    $scope.key = function ($event) {
        if ($event.keyCode === 13) {
            $event.target.blur();
            var type = $($event.target).attr("type");
            if (type === 'password') {
                login();
            }
           else{
                $('#password').focus();
            }
        }
    }
    //loign event
    var login = function () {
        var userName = $scope.loginData.userName;
        var password = $scope.loginData.password;

        var loginData = {
            userName: userName,
            password: password,
            remmberme: $scope.loginData.useRefreshTokens
        };

        localStorageService.set('loginData', loginData);

        if (userName !== '' && password !== '') {
            kendo.mobile.application.pane.loader.show();

            $scope.passwordHint = "";
            authService.login($scope.loginData).then(function (response) {

                kendo.mobile.application.navigate("src/app/home/home.html");
                kendo.mobile.application.pane.loader.hide();

            }).catch(function (err) {
                kendo.mobile.application.pane.loader.hide();
                $scope.passwordHint = "<b>" + err.error_description + "</b>";
                $timeout(function () {
                    $scope.passwordHint = "";
                }, 7000);


            });
        }
        else {
            $scope.passwordHint = 'User name and Password is required!';
            $timeout(function () {
                $scope.passwordHint = "";
            }, 5000);

        }
    }
    $scope.login = function () {
        window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.login.login");
        login();
    }

    $scope.showPasswordHint = function () {
        window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.login.passwordHint");
        var username = $scope.loginData.userName;
        if (username !== '') {
            kendo.mobile.application.showLoading();
            loginDataService.getPasswordHint(username)
               .then(
                   function (result) {

                       kendo.mobile.application.hideLoading();
                       $scope.passwordHint = "<b>" + $scope.form.hint.resoruceValue + ": </b>" + result.data;
                       $timeout(function () {
                           $scope.passwordHint = "";
                       }, 5000);
                   },
                   function (err) {
                       $scope.passwordHint = 'Error while getting the Hint!';
                       kendo.mobile.application.hideLoading();
                   }
                   );

        }
        else {
            $scope.passwordHint = 'User name is required!';
            $timeout(function () {
                $scope.passwordHint = "";
            }, 5000);

        }
    };

    $scope.renderHtml = function (content) {
        return $sce.trustAsHtml(content);
    };

}]);