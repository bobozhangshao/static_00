/**
 * Created by zhangshaobo on 2016/11/16.
 */
var app = angular.module('loginApp', ['ngCookies']);

app.config(function($httpProvider){
    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

app.controller('loginController', function($scope, $http, $cookies) {
    $scope.preURL = "http://localhost/HeartCare/";
    $scope.loginURL      = $scope.preURL+"index.php?option=com_heartcare&task=user.login";
    $scope.logoutURL     = $scope.preURL+"index.php?option=com_heartcare&task=user.logout";
    $scope.checkLoginURL = $scope.preURL+"index.php?option=com_heartcare&task=user.user_state";
    $scope.uploadURL     = $scope.preURL+"index.php?option=com_heartcare&task=upload.upload";
    $scope.showList = 0;
    $scope.login = 1;
    $scope.userInfo = {
        username:"",
        password:"",
        autoLogin:true
    };
    $scope.dataFiles = [];

    $scope.checkLogin = function () {
        $scope.userInfo.username = $cookies.get('nameSave');
        $scope.userInfo.password = $cookies.get('pwdSave');
        var loginName = $cookies.get('loginState');
        if (loginName){
            $http({
                method:'POST',
                url:$scope.checkLoginURL,
                data:{username:loginName}
            }).success(function (response) {
                if (response.have_user == 'EXIST' && response.online == 'YES'){
                    $scope.showList = 1;
                    $scope.login = 0;
                } else {
                    $cookies.remove('loginState');
                }
            }).error(function () {
                alert("system error(checkLogin)");
            })
        }
    };
    $scope.checkLogin();

    $scope.clickLogin = function () {
        $http({
            method:'POST',
            url:$scope.loginURL,
            data:{username:$scope.userInfo.username,password:$scope.userInfo.password},
        }).success(function (response) {
            if (response.login == 'OK'){
                $scope.showList = 1;
                $scope.login = 0;

                $cookies.put('loginState',$scope.userInfo.username);

                //save login state
                if ($scope.userInfo.autoLogin){
                    $cookies.put('nameSave',$scope.userInfo.username);
                    $cookies.put('pwdSave',$scope.userInfo.password);
                } else {
                    $cookies.remove('nameSave');
                    $cookies.remove('pwdSave');
                }
            } else {
                alert("login error");
            }
        }).error(function () {
            alert("system error(login)");
        })
    };

    $scope.clickLogout = function () {
        $http({
            method:'POST',
            url: $scope.logoutURL,
            data:{username:$scope.userInfo.username},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

        }).success(function (response) {
            if (response.logout == 'OK'){
                $scope.showList = 0;
                $scope.login = 1;
            }
        }).error(function () {
            alert("system error(logout)");
        })
    };

    //scan the file of measuredata
    $http.get("./scripts/scan.php").success(function (response) {
        $scope.dataFiles = response;
    }).error(function () {
        alert("system error(scan)");
    });
});
