app.directive('translateElement', function (translateService) {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('translateElement', function (resourceName) {
                var additionaTranslate = element.attr('data-translateText');                
                if (resourceName) {
                    resourceName = resourceName + additionaTranslate;
                    console.log(resourceName);
                    resourceName = translateService.getResourceValue(resourceName);
                    
                }
                element.text(resourceName == undefined ? '' : resourceName);               
            });           
        }
    };      
});