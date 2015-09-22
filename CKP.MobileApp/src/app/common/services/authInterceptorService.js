'use strict';
app.factory('authInterceptorService', [
                '$q', '$injector',
                'localStorageService', function ($q, $injector, localStorageService) {
                    
                    var authInterceptorServiceFactory = {};
                    var request = function (config) {
                        config.headers = config.headers || {};
     
                        var authData = localStorageService.get('authorizationData');
                        if (authData) {
                            config.headers.Authorization = 'Bearer ' + authData.token ;
                        }
       
                        return config;
                    }
                    var response = function (response) {
                        return response || $q.when(response);
                    }

                    var responseError = function (rejection) {
                        var authService = $injector.get('authService');
                        //console.log('current view : ' + kendo.mobile.application.view().id);
                        kendo.mobile.application.pane.loader.hide();
                        authService.logout();
                   
                        if (rejection.status === 401) {
                           
                            var authData = localStorageService.get('authorizationData');

                            if (authData) {
                                if (authData.useRefreshTokens) {
                                    //   $location.path('/refresh');
                                    kendo.mobile.application.navigate("src/app/login/login.html");
                                    return $q.reject(rejection);
                                }
                            }
                           
             
                            //$location.path('/login');
                            kendo.mobile.application.navigate("src/app/login/login.html");

                            aconsole.log("Un-Authorized Access, Please login to access! Error: 401");
                        } else if (rejection.status === 404) {
                            console.log("There is an error while proccessing this request! Error: 404");
                        } else if (rejection.status === 0) {
                            authService.logout();
                            kendo.mobile.application.navigate("src/app/login/login.html");
                            console.log("Server is unavailable. Please try later or contact customer service. Error:" + 0);
                        }
                        return $q.reject(rejection);
                    }

                    authInterceptorServiceFactory.request = request;
                    authInterceptorServiceFactory.response = response;
                    authInterceptorServiceFactory.responseError = responseError;

                    return authInterceptorServiceFactory;
                }
            ]);