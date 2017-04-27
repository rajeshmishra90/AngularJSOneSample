var myApp = angular.module("myApp", ["ui.bootstrap","ngRoute"]);

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'search.results.html',
        controller: "searchCtrl"
    }).
    when('/productDetails/:id', {
        templateUrl: 'product.details.html',
        controller: "productDetailsCtrl",
        resolve: {
            productData: function (productService) {
                return productService.GetProductDetails();
            }
        }
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
}]);