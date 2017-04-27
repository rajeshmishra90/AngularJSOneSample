myApp.controller('searchCtrl', ['$scope', '$http', 'productService', function ($scope, $http, productService) {
    $scope.SearchProductList = [];
    $scope.SearchCriteria = {
        Term: "",
        OnlyAvailable: false
    };

    $scope.SearchProduct = function () {
        //alert($scope.SearchCriteria.Term);
        productService.SearchProducts($scope.SearchCriteria)
            .then(function (data) {
                $scope.SearchProductList = data;
        },
        function (error) { console.log(error) });
    };
}]);