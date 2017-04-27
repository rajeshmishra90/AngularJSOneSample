myApp.controller('productDetailsCtrl', ['$scope', '$http', '$location', 'productService', 'productData', function ($scope, $http, $location, productService, productData) {
    console.log(productData);
    $scope.productInfo = productData.Data;

    $scope.GoHome = function () {
        $location.path("/home");
    };


}]);