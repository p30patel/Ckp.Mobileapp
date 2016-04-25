app.factory('surveyDataService',
    ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {
        var authServiceBase = ngAuthSettings.authServiceBaseUri;
        var surveyDataFactory = {};

        var forceGetSurvey = function () {
            var organizationDetail = localStorageService.get('organizationDetail');

            var deferred = $q.defer();

            var url = authServiceBase + "webapi/api/core/MobileApp/GetActiveSurvey";
            $http.post(url, organizationDetail).success(function (result) {
               
                deferred.resolve(result);
            }).error(function (err, status) {

                deferred.reject(err);
            });

            return deferred.promise;
        };

        var getSurvey = function () {
            var deferred = $q.defer();
            var forceReferesh = true;
            var surveyData = localStorageService.get('survey');
            var persistTime = 1000 * 60 * 1440;    // Expiration in milliseconds; set to null to never  // curent is 1 days
           
            console.log(surveyData);
            if (!surveyData)
            {
                var data = {
                    "SurveyData": [],                 
                    "LastUpdated": 0,
                    "PersistTime": persistTime,
                    "HasRemindMeLater": false
                };
                localStorageService.set('survey', data);
            }
         
            if (surveyData) {
                console.log(surveyData);
                if (surveyData.PersistTime && new Date().getTime() > Number(surveyData.LastUpdated) + surveyData.PersistTime) {
                    forceReferesh = true;
                }
                else {
                    var survey = surveyData.SurveyData;
                    var hasRemindMeLater = surveyData.HasRemindMeLater;
                    setSurveyLocalStorage(survey, hasRemindMeLater);
                    deferred.resolve(surveyData.SurveyData);
                }                  
            }

            
            if (forceReferesh) {

                forceGetSurvey().then(function (result) {   
                 
                    setSurveyLocalStorage(result, false);
                    deferred.resolve(result);

                });
            }

          
            console.log(surveyData);
            return deferred.promise;
        };
 
            var updateSurveyStatus = function (surveyId, status) {
             
                var deferred = $q.defer();
                var userId = 0;
                var organizationDetail = localStorageService.get('organizationDetail');
                if (organizationDetail)
                {
                    userId = organizationDetail.UserId;
                }
                if (status == 3)
                {
                    //mark as remind me later = 3  if status = 0 means declined and status = 1 then accpeted the survery
                    deferred.resolve("Marked as Remind me Later");
                }
                var url = authServiceBase + "webapi/api/core/MobileApp/UpdateSurveyStatus?userId=" + userId + "&surveyId=" + surveyId + "&status=" + status;
         
                $http.post(url).success(function (result) {
                    deferred.resolve(result);
                }).error(function (err, status) {
                    deferred.reject(err, status);

                }).catch(function (err) {
                    deferred.reject(err);

                });
                return deferred.promise;
            };

            var setSurveyLocalStorage = function (data, hasRemindMeLater) {

                var surveyData = localStorageService.get('survey');
                surveyData.SurveyData = data;
                surveyData.HasRemindMeLater = hasRemindMeLater;
                surveyData.LastUpdated = new Date().getTime();

                localStorageService.set('survey', surveyData);
                return true;
            }
        
            surveyDataFactory.updateSurveyStatus = updateSurveyStatus;
            surveyDataFactory.getSurvey = getSurvey;
            surveyDataFactory.forceGetSurvey = forceGetSurvey;
     
            return surveyDataFactory;
        }
    ]);