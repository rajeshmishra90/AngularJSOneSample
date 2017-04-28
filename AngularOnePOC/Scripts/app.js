var myApp = angular.module("myApp", ["ui.bootstrap", "ngRoute"]);

myApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
    $httpProvider.interceptors.push('myInterceptor');

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
    when('/Admin', {
        templateUrl: '/Admin/Index',
        controller: "searchCtrl"
    })
        .otherwise({
            redirectTo: '/home'
        });

    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);

myApp.service('authService', ['$q', function ($q) {
    var factory = {};
    factory.IsUserAuthenticated = false;
    factory.IsAuthenticated = function (http, credential) {
        var defer = $q.defer();
        http({
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: credential,
            url: '/Home/IsAuthenticated'
        })
        .then(function (response) {
            defer.resolve(response.data);
        }, function (error) {
            defer.reject(error);
            console.log(error);
        });
        return defer.promise;
    };

    return factory;
}]);

myApp.factory('myInterceptor', ['authService', '$injector', function (authService, $injector) {
    var myInterceptor = {
        request: function (config) {
            console.log(config.url);
            if (config.url.indexOf('auth.login.html') == 0 || config.url.indexOf('uib/template/modal/window.html') == 0
                    || config.url.indexOf('/Home/IsAuthenticated') == 0) {
                console.log('ignoring ' + config.url);
                return config;
            }
            var q = $injector.get('$q');
            var deferred = q.defer();
            if (!authService.IsUserAuthenticated) {
                var uiModal = $injector.get('$uibModal');
                var modalInstance = uiModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'auth.login.html',
                    size: "sm",
                    modal: "static",
                    controller: 'authModalController'
                });
                modalInstance.result.then(function (data) {
                    if (data.isSuccess) {
                        authService.IsUserAuthenticated = true;
                        deferred.resolve(config);
                    }
                    else {
                        deferred.reject('reject');
                    }
                },
                 function (error) { console.log(error); deferred.reject('reject'); });
            }
            else {
                deferred.resolve(config);
            }
            return deferred.promise;
        }
    };
    return myInterceptor;
}]);

myApp.controller('authModalController', ['$http', '$scope', '$uibModalInstance', 'authService', function ($http, $scope, $uibModalInstance, authService) {
    $scope.credential = { userName: "", password: "" };
    $scope.IsWrongCredentials = false;
    $scope.ok = function () {
        authService.IsAuthenticated($http, $scope.credential)
                .then(function (data) {
                    if (!data.isSuccess) {
                        $scope.IsWrongCredentials = true;
                        return;
                    }
                    else {
                        $scope.IsWrongCredentials = false;
                        $uibModalInstance.close(data);
                    }
                },
                function (error) { console.log(error) });
    };
}]);