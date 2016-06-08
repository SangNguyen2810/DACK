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

        $scope.CheckChuSo=function(ChuSo){
            var CheckDigit = false;//CheckSo
            var CheckChar = false;//CheckChu
            for(var i=0;i<ChuSo.length;i++)
            {
                var char = ChuSo.charAt(i);
                if(char>='0'&&char<='9')
                {
                    CheckDigit = true;
                    break;
                }
            }
            for(var i=0;i<ChuSo.length;i++)
            {
                var char = ChuSo.charAt(i);
                if((char>='A'&&char<='Z')||(char>='a'&&char<='z'))
                {
                    CheckChar = true;
                    break;
                }
            }
            if(CheckChar == false || CheckDigit == false)
            {
                return false;
            }
            else return true;
        };
        $scope.Check1=function() {
            var x = $scope.password;
            var Check = $scope.CheckChuSo($scope.password);

            if (Check == false) {
                $scope.THONGBAO1 = "Ô password phải có đầy đủ chữ (a,b,c) hoặc số (0,1,2)";
                return false;
            }
            else {
                $scope.THONGBAO1 = "";
                return true;
            }

        };
        $scope.Check2=function() {

            if($scope.password!=$scope.password2)
            {
                $scope.THONGBAO2="Bạn phải nhập giống với ô password";
                return false;
            }
            else {
                $scope.THONGBAO2="";
                return true;
            }

        };

        $scope.SignUp=function() {
            var CheckPass1 = $scope.Check1();
            var CheckPass2 = $scope.Check2();
            if(CheckPass1 == false || CheckPass2==false)
            {
                $scope.THONGBAO3="Bạn phải điền đúng password và xác nhận password trước khi đăng ký tài khoản!";

            }
            else {
                $scope.THONGBAO3 = "";

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
            }
        };

        
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