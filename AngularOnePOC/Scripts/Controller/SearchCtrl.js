myApp.controller('searchCtrl', ['$scope', '$http', '$location', 'productService', function ($scope, $http, $location, productService) {
    $scope.SearchProductList = [];
    $scope.IsSeachCompleted = false;

    $scope.SearchProduct = function () {
        productService.SearchProducts($scope.SearchCriteria)
            .then(function (data) {
                $scope.SearchProductList = data;
                $scope.IsSeachCompleted = true;
            },
        function (error) { console.log(error) });
    };

    if (productService.searchObj != null) {
        $scope.SearchCriteria = productService.searchObj;
        $scope.SearchProduct();
    }
    else {
        $scope.SearchCriteria = {
            Term: "",
            OnlyAvailable: false
        };
    }

    $scope.$watch("SearchCriteria.OnlyAvailable", function (newValue) {
        if ($scope.IsSeachCompleted && $scope.SearchCriteria.Term != "") {
            $scope.SearchProduct();
        }
    });

    $scope.ViewProductDetails = function (product) {
        productService.searchObj = $scope.SearchCriteria;
        $location.path("/productDetails/" + product.Id);
    };
}]);