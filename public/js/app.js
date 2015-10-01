angular.module("recordsapp", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("list", {
            "url": "/list",
            "templateUrl": "templates/list.html",
            "controller": "MainController",
            "cache": false
        })
        .state("item", {
            "url": "/item/:documentId",
            "templateUrl": "templates/item.html",
            "controller": "MainController",
            "cache": false
        });
    $urlRouterProvider.otherwise("list");
})

.controller("MainController", function($scope, $http, $state, $stateParams) {

    $scope.items = {};

    $scope.fetchAll = function() {
        $http(
            {
                method: "GET",
                url: "/api/getAll"
            }
        )
        .success(function(result) {
            for(var i = 0; i < result.length; i++) {
                $scope.items[result[i].id] = result[i];
            }
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    // Look up a document if we landed in the info screen for editing a document
    if($stateParams.documentId) {
        $http(
            {
                method: "GET",
                url: "/api/get",
                params: {
                    document_id: $stateParams.documentId
                }
            }
        )
        .success(function(result) {
            $scope.inputForm = result[0];
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.delete = function(documentId) {
        $http(
            {
                method: "POST",
                url: "/api/delete",
                data: {
                    document_id: documentId
                }
            }
        )
        .success(function(result) {
            delete $scope.items[documentId];
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.save = function(firstname, lastname, email) {
        $http(
            {
                method: "POST",
                url: "/api/save",
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    document_id: $stateParams.documentId
                }
            }
        )
        .success(function(result) {
            $state.go("list");
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

});
