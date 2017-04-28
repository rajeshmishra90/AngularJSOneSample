myApp.controller('productDetailsCtrl', ['$scope', '$http', '$location', 'productService', 'productData', function ($scope, $http, $location, productService, productData) {
    $scope.productInfo = productData.Data;

    $scope.GoHome = function () {
        $location.path("/home");
    };


}]);