'use strict';

/* Controllers */
var phonecatApp = angular.module('myApp', ['ngAnimate','xeditable','firebase','ngRoute','ngCookies']);
phonecatApp.config(function($routeProvider,$locationProvider) {

        $routeProvider

            // route for the home page
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mywebCtrl'
            })

            .when('/register', {
                templateUrl : 'pages/register.html',
                controller  : 'RegController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })


            .otherwise({ redirectTo: '/login' });
    });

    // create the controller and inject Angular's $scope
    phonecatApp.controller('mainController', function($rootScope,$location,$scope,$firebase,$firebaseArray,$firebaseObject,$firebaseAuth) {
        // create a message to display in our view
        var ref= new Firebase("https://sonhoang0611.firebaseio.com");
        $scope.Lg=function() {
            ref.authWithPassword({
                email: $scope.username1,
                password: $scope.password1
            }, function(error, authData) {

                if (error) {
                    console.log("Login Failed!", error);

                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $location.path('/home');
                    if (!$rootScope.$$phase) $rootScope.$apply();
                }
            });
        }
    });

    phonecatApp.controller('mywebCtrl', function($scope) {

    });

    phonecatApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    phonecatApp.controller('RegController', function($location,$scope,$firebase,$firebaseArray,$firebaseObject,$firebaseAuth) {
        var ref= new Firebase("https://sonhoang0611.firebaseio.com");
        $scope.SignUp=function() {
            ref.createUser({
                email: $scope.username,
                password: $scope.password
            }, function (error, authData) {
                if (error) {
                    console.log("Error creating user:", error);

                } else {
                    console.log("Successfully created user account with uid:", authData.uid);

                }
            });
        }
    });

	
phonecatApp.run(function (editableOptions) {
    editableOptions.theme='bs3';
});
phonecatApp.controller('mywebCtrl', function ($rootScope,$location,$scope,$firebase,$firebaseArray,$firebaseObject,$firebaseAuth) {

    var ref= new Firebase("https://sonhoang0611.firebaseio.com");
	// $scope.person = $firebaseObject(ref);
    var syncObject = $firebaseObject(ref); //3-way data binding
    syncObject.$bindTo($scope, "person");

    $scope.authObj=$firebaseAuth(ref);
    
    
    $scope.Login=function()
    {

        $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $location.path('/home');
        }).then(function() {
            // Never called because of page redirect
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    };

    $scope.Login2=function()
    {
        $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $location.path('/home');
        }).then(function() {
            // Never called because of page redirect
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    };

    $scope.Logout=function()
    {
        $scope.authObj.$unauth();
        $scope.authObj.$onAuth(function(authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);
            } else {
                console.log("Client unauthenticated.");
              
            }
        });

    };
    
   $scope.addSkill = function () {

                if (angular.isDefined($scope.name) && angular.isDefined($scope.score) && $scope.name != '' && $scope.score != '') 
                {
                    // ADD A NEW ELEMENT.
					
                    $scope.listSkill.push({ name: $scope.name, score: $scope.score });

                    // CLEAR THE FIELDS.
                    $scope.name = '';
                    $scope.score = '';
					
					window.alert('Bạn đã thêm thành công!');
                }
				else{
					window.alert('Bạn chưa nhập đầy đủ thông tin! Yêu cầu nhập lại!');
				}
            };
			
	$scope.addProj = function () {

                if (angular.isDefined($scope.proj) && $scope.proj != '') 
                {
                    // ADD A NEW ELEMENT.
					
                    $scope.listProj.push({ proj: $scope.proj});

                    // CLEAR THE FIELDS.
                    $scope.proj= '';
					
					window.alert('Bạn đã thêm thành công!');
                }
				else{
					window.alert('Bạn chưa nhập đầy đủ thông tin! Yêu cầu nhập lại!');
				}
            };
			
	$scope.addSum = function () {

                if (angular.isDefined($scope.label) && angular.isDefined($scope.information) && $scope.label != '' && $scope.information != '') 
                {
                    // ADD A NEW ELEMENT.
					
                    $scope.listSum.push({ label: $scope.label, information: $scope.information });

                    // CLEAR THE FIELDS.
                    $scope.label = '';
                    $scope.information = '';
					
					window.alert('Bạn đã thêm thành công!');
                }
				else{
					window.alert('Bạn chưa nhập đầy đủ thông tin! Yêu cầu nhập lại!');
				}
            };
			
	$scope.addExp = function () {

                if (angular.isDefined($scope.title) && angular.isDefined($scope.location1) && angular.isDefined($scope.period) && angular.isDefined($scope.description)
					&& $scope.title != '' && $scope.location1 != '' && $scope.period != '' && $scope.description != '') 
                {
                    // ADD A NEW ELEMENT.
					
                    $scope.listExp.push({ title: $scope.title, location1: $scope.location1, period: $scope.period, description: $scope.description });

                    // CLEAR THE FIELDS.
                    $scope.title = '';
                    $scope.location1 = '';
					$scope.period = '';
					$scope.description = '';
					
					window.alert('Bạn đã thêm thành công!');
                }
				else{
					window.alert('Bạn chưa nhập đầy đủ thông tin! Yêu cầu nhập lại!');
				}
            };
			
	$scope.addSchool = function () {

                if (angular.isDefined($scope.school) && angular.isDefined($scope.field) && angular.isDefined($scope.year)
					&& $scope.school != '' && $scope.field != '' && $scope.year != '') 
                {
                    // ADD A NEW ELEMENT.
					
                    $scope.listSchool.push({ school: $scope.school, field: $scope.field, year: $scope.year});

                    // CLEAR THE FIELDS.
                    $scope.school = '';
                    $scope.field = '';
					$scope.year = '';
					
					window.alert('Bạn đã thêm thành công!');
                }
				else{
					window.alert('Bạn chưa nhập đầy đủ thông tin! Yêu cầu nhập lại!');
				}
            };
});