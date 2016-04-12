app.directive('translateElement', function (translateService) {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('translateElement', function (resourceName) {

                var additionalTranslate = element.attr('data-translateText');

                if (additionalTranslate == 'SubscriptionType')
                {
                    var currentSubscriptionType = element.attr('data-SubscriptionType');
                    //check resoruce name is exisited -- then set the text
                    var subscriptionType = [
                        { id: 101, description: "NewOrderReceived" },
                        { id: 102, description: "OrderApproval" },
                        { id: 103, description: "ApprovedOrDeclinedOrder" },
                        { id: 104, description: "ShipmentConfirmation" },
                        { id: 105, description: "DeliveryConfirmation" },
                        { id: 106, description: "PrintshopHoliday" },
                        { id: 107, description: "Maintenance" },
                        { id: 108, description: "OrderStatusChanged" }
                    ];
                   
                    angular.forEach(subscriptionType, function (value, key) {
                        if (value.id == resourceName) {
                            resourceName = value.description;
                            additionalTranslate = '';
                        }
                    });
                }
                if (resourceName) {
                    if (typeof additionalTranslate !== 'undefined') {
                        resourceName = resourceName + additionalTranslate;
                    }
                    resourceName = translateService.getResourceValue(resourceName);
                }
              
                element.text(resourceName == undefined ? '' : resourceName);               
            });           
        }
    };      
});