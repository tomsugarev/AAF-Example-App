'use strict';

/**
* @ngdoc function
* @name assignmentApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the assignmentApp
*/
angular.module('assignmentApp')
.controller('postRecipeCtrl', function ($scope, $http, $window) {

	$scope.requestJSON = {};
	$scope.stepInputs = [];
	$scope.ingredientInputs = [];
	$scope.requestJSON.tags = ['vegan'];

	$scope.addStepField=function(){
		$scope.stepInputs.push({});
	};

	$scope.addIngredientField=function(){
		$scope.ingredientInputs.push({});
	};

	$scope.generateBody = function(){
		var filteredSteps = [];

		for (var i = 0; i < $scope.stepInputs.length; i++) 
		{
			filteredSteps.push($scope.stepInputs[i].step);
		}

		$scope.requestJSON.instructions.steps = filteredSteps;
		$scope.requestJSON.ingredients = angular.copy($scope.ingredientInputs);
		return $scope.requestJSON;
	};
	
	$scope.postRecipe = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/recipes',
			data: $scope.generateBody(),
			headers: {'Content-Type': 'application/json',
			'authorization': 'Bearer ' + $window.sessionStorage.token
		}
		}).then(function successCallback(response) {
			console.log('Recipe Added');
			console.log(response);
			// $location.path('/login');

		}, function errorCallback(response) {
			console.log(response);
		});
	};

});