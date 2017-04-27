myApp.controller('AdminCtrl', ['$scope', '$http', '$uibModal', 'productService', function ($scope, $http, $uibModal, productService) {
    productService.GetProducts()
    .then(function (data) {
        $scope.products = data;
    },
    function (error) { console.log(error) });

    $scope.AddProduct = function () {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            size: "lg",
            controller: 'modalController',
            resolve: {
                IsEditMode: function () {
                    return false;
                }
            }
        });
        modalInstance.result.then(function (data) {
            $scope.products = data;
        });
    };

    $scope.EditProduct = function (prod) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            size: "lg",
            controller: 'modalController',
            resolve: {
                product: function () {
                    return prod;
                },
                IsEditMode: function () {
                    return true;
                }
            }
        });
        modalInstance.result.then(function (data) {
            $scope.products = data;
        });
    };
}]);

myApp.controller('modalController', function ($scope, $uibModalInstance, productService) {
    $scope.IsEditMode = $scope.$resolve.IsEditMode;
    $scope.product = angular.copy($scope.$resolve.product);
    $scope.ok = function () {
        if ($scope.IsEditMode === true) {
            productService.EditProduct($scope.product)
                .then(function (data) {
                    productService.GetProducts()
                    .then(function (data) {
                        $uibModalInstance.close(data);
                    },
                    function (error) { console.log(error) });
                },
                function (error) { console.log(error) });
        }
        else {
            productService.AddProduct($scope.product)
                .then(function (data) {
                    productService.GetProducts()
                    .then(function (data) {
                        $uibModalInstance.close(data);
                    },
                    function (error) { console.log(error) });
                },
                function (error) { console.log(error) });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
});