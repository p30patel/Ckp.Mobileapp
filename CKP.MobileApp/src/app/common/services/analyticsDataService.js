
'use strict';

app.factory("analyticsDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var analyticsDataServiceFactory = {};

                    var checkSimulatorMode = function () {
                        if (window.navigator.simulator === true) {
                            return true;
                        } else if (window.cordova === undefined) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    var addAnalytics = function (pageEvent, value) {

                        var hasSimlulator = checkSimulator();
                        if (!hasSimlulator) {
                            var orgData = localStorageService.get('organizationDetail');
                            if (orgData) {
                                var user = $filter('uppercase')(orgData.UserName) + "-" + orgData.UserId;
                                var organization = $filter('uppercase')(orgData.OrgContext.Name) + "-" + orgData.OrgContext.Id;
                                var retailer = $filter('uppercase')(orgData.OrgContext.RetailerName) + "-" + orgData.OrgContext.RetailerId;
                            }

                            window.plugins.EqatecAnalytics.Monitor.Start();
                            switch (pageEvent) {

                                case "login.login":
                                    window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.login.login");
                                    if (orgData.UserName) {
                                        window.plugins.EqatecAnalytics.Monitor.TrackFeature("User." + user);
                                        window.plugins.EqatecAnalytics.Monitor.TrackFeature("Organization." + organization);
                                        window.plugins.EqatecAnalytics.Monitor.TrackFeature("Retailer." + retailer);
                                        window.plugins.EqatecAnalytics.Monitor.TrackFeature("Language.User." + user);
                                    }
                                    break;
                                default:
                                    window.plugins.EqatecAnalytics.Monitor.TrackFeature(pageEvent + "." + value);
                                    break;

                            }
                            window.plugins.EqatecAnalytics.Monitor.Stop();

                        }
                        return true;
                    }

                    analyticsDataServiceFactory.addAnalytics = addAnalytics;
                    analyticsDataServiceFactory.checkSimulatorMode = checkSimulatorMode;

                    return analyticsDataServiceFactory;
                }
]);