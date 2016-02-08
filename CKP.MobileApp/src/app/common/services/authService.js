'use strict';
app.factory('authService', [
                '$http', '$q', 'localStorageService', 'ngAuthSettings',
                function ($http, $q, localStorageService, ngAuthSettings) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
      
                    var authServiceFactory = {};
                    var _authentication = {
                        isAuth: false,
                        userName: "",
                        useRefreshTokens: false,
                        organizationId: 0,
                        userId: 0,
                        groupType: 0,
                        permissions: {}
          
                    };       

                    var _login = function (loginData) {
                        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                        data = data + "&client_id=" + ngAuthSettings.clientId;

                        var deferred = $q.defer();

                        $http.post(authServiceBase + 'authorization/oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                            var loggedIn = true;
               
                            if (loginData.useRefreshTokens) {
                                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                            } else {
                                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
                            }
            
                            if (loggedIn === true) {
                                _authentication.isAuth = true;
                                _authentication.userName = loginData.userName;
                                _authentication.useRefreshTokens = loginData.useRefreshTokens;
                            //    _forceGetPrincipalData();

                                    forceGetOrganizationData().then(function (result) {
                                        var logo = (result.Logo !== '') ? authServiceBase + "/Images/" + result.Logo : "";
                                        result.Logo = logo;                                        
                                        deferred.resolve(result);
                                    }).catch(function (err, status) {
                                        loggedIn = false;
                                        _logout();
                                        deferred.reject(err);
                                    });


                            }
                         
                         
                        }).error(function (err, status, headers, config) {
                            _logout();
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    }

                    var _logout = function () {
                        localStorageService.remove('authorizationData');
                        localStorageService.remove('userProfileData');
                   //     localStorageService.remove('organizationDetail');
                      
                        
                        _authentication.isAuth = false;
                        _authentication.userName = "";
                        _authentication.useRefreshTokens = true;
                    };

                    var _getPrincipalData = function (loginData) {
                        if (!_authentication.isAuth || _authentication.userName === "") {
                            _forceGetPrincipalData();  
                        }
                    };

                    var forceGetOrganizationData = function () {

                        var deviceData = localStorageService.get('deviceData');
                        var loginData = localStorageService.get('loginData');
                        var organizationDetail = localStorageService.get('organizationDetail');       

                        var uuId = '';
                        var model = '';
                        var platform = '';
                        var version = '';
                        var active = true;
                        var hasForceRefresh = true;

                        if (deviceData)
                        {
                            uuId = deviceData.result.Id;
                            model = deviceData.result.HardwareModel;
                            platform = deviceData.result.PlatformType;
                            version = deviceData.result.PlatformVersion;
                            active = deviceData.result.Active;
                        }
                    
                   
                        var data = {
                            UserName: _authentication.userName,
                            DeviceUUId: uuId,
                            DeviceModel: model,
                            DevicePlatform: platform,
                            DeviceVersion: version,
                            IsActive: active
                        }
                        
                        if (organizationDetail)
                        {                            
                            var hasSameUserName = angular.equals(loginData.userName, organizationDetail.UserName);
                            var hasSameUUID = angular.equals(uuId, organizationDetail.DeviceId);

                            hasForceRefresh = !(hasSameUserName && hasSameUUID);
                        }
                        var deferred = $q.defer();
                        alert('orgConext Force Refresh:' + hasForceRefresh);
                        if (hasForceRefresh)
                        {
                            var url = authServiceBase + "webapi/api/core/MobileApp/OrganizationDetail";
                            $http.post(url, data).success(function (result) {
                                localStorageService.set('organizationDetail', result);
                                localStorageService.remove("messages");
                                deferred.resolve(result);
                            }).error(function (err, status) {
                                deferred.reject(err);
                            });
                        }
                        else {
                            deferred.resolve(organizationDetail);
                            console.log('org detail from local stoarge');
                        }

                        return deferred.promise;
                    };

                    var _forceGetPrincipalData = function () {
                        var deferred = $q.defer();
                        var url = authServiceBase + "webapi/api/authorization/principaldata?userName=" + _authentication.userName + "&applicationName=Ckp.CheckNet.Website";
                        $http.get(url).success(function (result) {
                            _authentication.organizationId = result.OrganizationId;
                            _authentication.userId = result.UserId;
                            _authentication.groupType = result.GroupType;
                            _authentication.permissions = result.Permissions;
                  
                            localStorageService.add('userProfileData', _authentication);
                
                            deferred.resolve(result);
                        }).error(function (err, status) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    };

                    var _fillAuthData = function () {
                        var authData = localStorageService.get('authorizationData');
                        var userProfileData = localStorageService.get('userProfileData');
                        
                        if (authData) {
                            _authentication.isAuth = true;
                            _authentication.userName = authData.userName;
                            _authentication.useRefreshTokens = authData.useRefreshTokens;
                            if (userProfileData) {
                                _authentication.userId = userProfileData.userId;
                                _authentication.organizationId = userProfileData.OrganizationId;
                            }
                        }
                    };
      
                    var _refreshToken = function () {
                        var deferred = $q.defer();

                        var authData = localStorageService.get('authorizationData');

                        if (authData) {
                            if (authData.useRefreshTokens) {
                                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                                localStorageService.remove('authorizationData');

                                $http.post(authServiceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                                    deferred.resolve(response);
                                }).error(function (err, status) {
                                    _logout();
                                    deferred.reject(err);
                                });
                            }
                        }

                        return deferred.promise;
                    };

                    var _obtainAccessToken = function (externalData) {
                        var deferred = $q.defer();

                        $http.get(authServiceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {
                            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                            _authentication.isAuth = true;
                            _authentication.userName = response.userName;
                            _authentication.useRefreshTokens = false;

                            deferred.resolve(response);
                        }).error(function (err, status) {
                            _logout();
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    };

                    var _getUserInfo = function () {
                        return _authentication;
                    }
                    var _hasPermission = function (permission) {
                        var result = false;
                        if (permission) {
                            var permissions = localStorageService.get("permissions");
                            angular.forEach(permissions, function (value, key) {
                                if (value.name === permission) {
                                    result = true;
                                    return;
                                }
                            });
                        } else {
                            result = true;
                        }
                        return result;
                    };

                    authServiceFactory.login = _login;
                    authServiceFactory.logout = _logout;
                    authServiceFactory.getPrincipalData = _getPrincipalData;

                    authServiceFactory.forceGetOrganizationData = forceGetOrganizationData;

                    authServiceFactory.forceGetPrincipalData = _forceGetPrincipalData;
                    authServiceFactory.fillAuthData = _fillAuthData;
       
                    authServiceFactory.authentication = _authentication;
                    authServiceFactory.refreshToken = _refreshToken;

                    authServiceFactory.obtainAccessToken = _obtainAccessToken;
                    authServiceFactory.getUserInfo = _getUserInfo;

                    return authServiceFactory;
                }
            ]);