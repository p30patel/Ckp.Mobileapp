
'use strict';

app.factory("indexDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;

                    var indexDataServiceFactory = {};


                    return indexDataServiceFactory;
                }
            ]);