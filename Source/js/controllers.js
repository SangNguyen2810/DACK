'use strict';

/* Controllers */
var phonecatApp = angular.module('myApp', ['ngAnimate','xeditable','firebase','ngRoute','ngCookies']);
phonecatApp.config(function($routeProvider,$locationProvider) {

        $routeProvider

            // route for the home page
            .when('/login', {
                templateUrl : 'login/login.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/home', {
                templateUrl : 'home/home.html',
                controller  : 'mywebCtrl'
            })

            .when('/summary', {
                templateUrl : 'summary/summary.html',
                controller  : 'mywebCtrl'
            })

            .when('/experience', {
                templateUrl : 'experience/experience.html',
                controller  : 'mywebCtrl'
            })

            .when('/project', {
                templateUrl : 'project/project.html',
                controller  : 'mywebCtrl'
            })

            .when('/skill', {
                templateUrl : 'skill/skill.html',
                controller  : 'mywebCtrl'
            })

            .when('/education', {
                templateUrl : 'education/education.html',
                controller  : 'mywebCtrl'
            })

            .when('/hobby', {
                templateUrl : 'hobby/hobby.html',
                controller  : 'mywebCtrl'
            })

            .when('/register', {
                templateUrl : 'register/register.html',
                controller  : 'RegController'
            })

            .otherwise({ redirectTo: '/login' });
    });

    // create the controller and inject Angular's $scope
    phonecatApp.controller('mainController', function($rootScope,$location,$scope,$firebase,$firebaseArray,$firebaseObject,$firebaseAuth) {
        // create a message to display in our view
        var ref= new Firebase("https://sonhoang0611.firebaseio.com");
        $scope.authObj=$firebaseAuth(ref);
        $scope.Lg=function() {
            ref.authWithPassword({
                email: $scope.username1,
                password: $scope.password1
            }, function(error, authData) {

                if (error) {
                    console.log("Login Failed!", error);

                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $rootScope.user = authData.password.email;
                    $location.path('/home');
                    if (!$rootScope.$$phase) $rootScope.$apply();

                }
            });
        };

        $scope.Login=function()
        {

            $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
                console.log("Logged in as:", authData.uid);
                $location.path('/home');
                $rootScope.user = authData.google.displayName;
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
                $rootScope.user = authData.facebook.displayName;
            }).then(function() {
                // Never called because of page redirect
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
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
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            alert("The new user account cannot be created because the email is already in use.");
                            break;
                        case "INVALID_EMAIL":
                            alert("The specified email is not a valid email.");
                            break;
                        default:
                            alert("Error creating user:", error);
                    }

                }
            });
        };
        $scope.CheckConfirmPassword=function(password,password2){
            if(password != password2)
            {
                $scope.THONGBAO2="Bạn phải nhập giống với ô password";
            }
        };
        $scope.Check1=function(){
            var x = $scope.password;
            if(!x)
            {
                $scope.THONGBAO1="Bạn phải điền vào ô password";
            }
            else
            {
                var CheckDigit = false;
                var CheckChar = false;
                for(var i=0;i<x.length;i++)
                {
                    var char = x.charAt(i);
                    if(char>='0'&&char<='9')
                    {
                        CheckDigit = true;
                        break;
                    }
                }
                for(var i=0;i<x.length;i++)
                {
                    var char = x.charAt(i);
                    if((char>='A'&&char<='Z')||(char>='a'&&char<='z'))
                    {
                        CheckChar = true;
                        break;
                    }
                }
                if(CheckChar == false || CheckDigit == false)
                {
                    $scope.THONGBAO1="Chuỗi của bạn phải vừa có chữ vừa có số!";
                }
                else
                {
                    $scope.THONGBAO1="";
                }

            }
        };
        $scope.Check2=function(){
            var x = $scope.password2;
            if(!x)
            {
                $scope.THONGBAO2="Bạn phải điền vào ô xác nhận password";
            }
            else
            {
                $scope.THONGBAO2="";
            }
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
    $scope.Logout=function()
    {

        $scope.authObj.$unauth();
        $scope.authObj.$onAuth(function(authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);
            } else {
                console.log("Client unauthenticated.");
                $location.path('/login');
            }
        });

    };
});