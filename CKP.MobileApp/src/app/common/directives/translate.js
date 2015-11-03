app.directive('translateElement', function (translateService) {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('translateElement', function (resourceName) {

                var additionaTranslate = element.attr('data-translateText');               
                if (resourceName) {
                    if (typeof additionaTranslate !== 'undefined') {
                        resourceName = resourceName + additionaTranslate;
                    }
                 
                    resourceName = translateService.getResourceValue(resourceName);
                    
                }
                element.text(resourceName == undefined ? '' : resourceName);               
            });           
        }
    };      
});