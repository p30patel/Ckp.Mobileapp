'use strict';
app.controller('loginController', [
                   '$scope', '$http', 'authService', 'translateService', 'localStorageService', 'loginDataService', '$q', '$timeout', 'alerting', '$filter',
                   function ($scope, $http, authService, translateService, localStorageService, loginDataService, $q, $timeout, alerting, $filter) {
                       $scope.title = '';
                      
                       //login page html lables
                       $scope.loginData = {};
                       $scope.form = {};
                       $scope.form.login = {};
                       $scope.form.login.resoruceName = "Login";
                       $scope.form.login.resoruceValue = "Login";
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
                       $scope.form.signin.resoruceName = "[Not Set]";
                       $scope.form.signin.resoruceValue = "Log In";

                       $scope.form.remmberMe = {};
                       $scope.form.remmberMe.resoruceName = "Remmber me";
                       $scope.form.remmberMe.resoruceValue = "Remmber me";


                       $scope.form.email = {};
                       $scope.form.email.resoruceName = "Email";
                       $scope.form.email.resoruceValue = "Email";

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
                       $scope.form.copyRightsDescription.resoruceName = "This app contains confidential and proprietary information. This information is provided for the benefit of authorized users only. Unauthorized access to information on this system may result in criminal and/or civil prosecution. All accesses are logged and this information will be used to support any prosecution";
                       $scope.form.copyRightsDescription.resoruceValue = "This app contains confidential and proprietary information. This information is provided for the benefit of authorized users only. Unauthorized access to information on this system may result in criminal and/or civil prosecution. All accesses are logged and this information will be used to support any prosecution";

                      
                       //end page html 
                       var d = new Date();
                       $scope.year = d.getFullYear();
                       $scope.languages = {};
                       $scope.passwordHint = "";

                       $scope.loginData = {
                           userName: "",
                           password: "",
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
                           kendo.mobile.application.pane.loader.show();
                           var username = $scope.loginData.userName;
                           var email = $scope.loginData.email;
                           var message = "";
                         
                           loginDataService.resetPassword(username, email).then(function (result) {
                               message = (result === 'success') ? "Password sent to your email address!" : "User name and email combination does not match!";

                               alerting.addSuccess(message, -1);
                           
                               $scope.forgotPassworMessage = result;
                               kendo.mobile.application.pane.loader.hide();
                              // $("#modalview-password").kendoMobileModalView("close");
                           },
                                                                                function (err) {
                                                                                    message =  "User name and email combination does not match!";
                                                                                    alerting.addWarning(message, -1);
                                                                                    kendo.mobile.application.pane.loader.hide();
                                                                                    $scope.forgotPassworMessage = err;
                                                                                   // $("#modalview-password").kendoMobileModalView("close");
                                                                                });
                       };
                       //end forgot password

                       var loginData = {
                           userName: '',
                           password: '',
                           remmberme: false

                       };



                       //trsnasaltion

                       var translatePage = function () {

                           var selectedLanague = $scope.selectedLanague;
                           var rowVersion = "";

                           localStorageService.set('selectedLanguage', $scope.selectedLanague);

                           translateService.getResourceUpdates(selectedLanague, rowVersion).then(function () {
                               $scope.form.login.resoruceValue = translateService.getResourceValue($scope.form.login.resoruceName);
                               $scope.form.username.resoruceValue = translateService.getResourceValue($scope.form.username.resoruceName);
                               $scope.form.password.resoruceValue = translateService.getResourceValue($scope.form.password.resoruceName);
                               $scope.form.passwordHint.resoruceValue = translateService.getResourceValue($scope.form.passwordHint.resoruceName);
                               $scope.form.signin.resoruceValue = translateService.getResourceValue($scope.form.signin.resoruceName);
                               $scope.form.remmberMe.resoruceValue = translateService.getResourceValue($scope.form.remmberMe.resoruceName);
                           });
                       }
                       translatePage();

                       $scope.translatePage = function () {
                           translatePage();
                       }
                       //loign event
                       $scope.login = function () {
                           var loginData = {
                               userName: $scope.loginData.userName,
                               password: $scope.loginData.password,
                               remmberme: $scope.loginData.useRefreshTokens
                           }
                           localStorageService.set('loginData', loginData);

                           kendo.mobile.application.pane.loader.show();

                           $scope.passwordHint = "";
                           authService.login($scope.loginData).then(function (response) {
                               kendo.mobile.application.pane.loader.hide();
                               kendo.mobile.application.navigate("src/app/home/home.html");
                           }).catch(function (err) {
                               $scope.message = err.error_description;
                               alerting.addWarning(err.error_description, 5000);
                               kendo.mobile.application.pane.loader.hide();
                           });
                       };

                       $scope.showPasswordHint = function () {
                           var username = $scope.loginData.userName;

                           var baasApiKey = 'uTM7cVvTTvlfDZsu';

                           var baasScheme = 'https';

                           var androidProjectNumber = '1018275522168';

                           var emulatorMode = true;
                           var el = new Everlive({
                               apiKey: baasApiKey,
                               scheme: baasScheme
                           });


                           var pushSettings = {
                               android: {
                                   senderID: androidProjectNumber
                               },
                               iOS: {
                                   badge: "true",
                                   sound: "true",
                                   alert: "true"
                               },
                               wp8: {
                                   channelName: 'EverlivePushChannel'
                               },     
                               customParameters: {
                                   Name: username,
                                   LastLoginDate: new Date()

                               }
                           };
                           el.push.register(pushSettings)
                              .then(
                                  function (data) { alert('Register success' );},
                                  function (err) {
                                      alert('REGISTER ERROR: ' + JSON.stringify(err));
                                  }
                                  );
                    
                           kendo.mobile.application.pane.loader.show();
                        
                           loginDataService.getPasswordHint(username).then(function (result) {
                               $scope.passwordHint = result;
                               alerting.addSuccess('Hint is : ' + result, 5000);
                               kendo.mobile.application.pane.loader.hide();
                           }).catch(function (err) {
                               $scope.message = 'Error while getting the Hint!';
                               alerting.addWarning('Error while getting the Hint!', 5000);
                               kendo.mobile.application.pane.loader.hide();
                           });
                       };
                    
                  
                   }
]);