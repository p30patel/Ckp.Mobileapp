app.factory('timeStampService',
        ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {

        var timeStampFactory = {};
        
        var setLocalDataByKey = function (name, newData) {

            var timeStamp = localStorageService.get("timeStamp");
          
            if (!timeStamp)
            {
                var timeStampData = [];
                var data = {
                    Key: 'orderCount',
                    Value: {
                        persistTime: 1000 * 60 * 5, // Expiration in milliseconds; set to null to never expire
                        timeNow: new Date().getTime(),
                        hasForceRefresh: false,
                        forceRefreshDate: new Date(),
                        data: []
                    }
                };
                timeStampData.push(data);

                timeStamp = localStorageService.set("timeStamp",(timeStampData));
                
            }

            var timeStamp = (localStorageService.get("timeStamp"));
            
            if (timeStamp)
            {
              
                angular.forEach(timeStamp, function (value, key) {
                    console.log(value.Key + '===' + name + ': data : ' + value.Value.data);
                    if (value.Key === name) {
                        
                        value.Value.data = newData;
                        
                        return value.Value.data;
                    }
                });
                localStorageService.remove("timeStamp");
                timeStamp = localStorageService.set("timeStamp", (timeStamp));
            }
            var timeStamp = (localStorageService.get("timeStamp"));
            console.log('new ' + timeStamp);
            
            return true;

        }
        var getLocalDataByKey = function (key) {
            var data = {};
            var timeStamp = localStorageService.get("timeStamp");
       
            if (timeStamp)
            {
                return data;
            }
            
            return data;
        }

        timeStampFactory.setLocalDataByKey = setLocalDataByKey;
        timeStampFactory.getLocalDataByKey = getLocalDataByKey
      

        return timeStampFactory;
    }]);