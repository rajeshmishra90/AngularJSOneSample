myApp.service('productService', function ($http, $q) {
    function GetProducts() {
        var defer = $q.defer();
        var productData = [];
        $http({
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: '/Product/List'
        })
        .then(function (response) {
            defer.resolve(response.data.Data);
        }, function (error) {
            defer.reject(error);
            console.log(error);
        });
        return defer.promise;
    };

    function SearchProducts(searchCriteria) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: '/Product/Search',
            data: searchCriteria
        })
        .then(function (response) {
            defer.resolve(response.data.Data);
        }, function (error) {
            defer.reject(error);
            console.log(error);
        });
        return defer.promise;
    };

    function AddProduct(product) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: product,
            url: '/Product/Create'
        })
        .then(function (response) {
            defer.resolve(response);
        }, function (error) {
            defer.reject(error);
            console.log(error);
        });
        return defer.promise;
    };

    function EditProduct(product) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: product,
            url: "/Product/Edit?" + product.Id
        })
        .then(function (response) {
            defer.resolve(response);
        }, function (error) {
            defer.reject(error);
            console.log(error);
        });
        return defer.promise;
    };

    return {
        GetProducts: GetProducts,
        AddProduct: AddProduct,
        EditProduct: EditProduct,
        SearchProducts: SearchProducts
    };
});