/**
 * Created by zhangshaobo on 2016/11/16.
 */
var app = angular.module('loginApp', ['ngCookies','ui.bootstrap']);

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

app.controller('loginController', ['$scope', '$http', '$cookies','$uibModal',function($scope, $http, $cookies, $uibModal) {
    $scope.preURL = "http://localhost/HeartCare/";
    //$scope.preURL = "http://192.168.1.103/HeartCare/";
    $scope.loginURL      = $scope.preURL+"index.php?option=com_heartcare&task=user.login";
    $scope.logoutURL     = $scope.preURL+"index.php?option=com_heartcare&task=user.logout";
    $scope.checkLoginURL = $scope.preURL+"index.php?option=com_heartcare&task=user.user_state";
    $scope.checkEmailURL = $scope.preURL+"index.php?option=com_heartcare&task=user.find_email";
    $scope.uploadURL     = $scope.preURL+"index.php?option=com_heartcare&task=upload.upload";
    $scope.showList = 0;
    $scope.uploadAlert = 0;
    $scope.login = 1;
    $scope.userInfo = {
        username:$cookies.get('nameSave'),
        password:$cookies.get('pwdSave'),
        autoLogin:true
    };
    $scope.dataFiles = [];
    $scope.users = [];

    $scope.checkLogin = function () {
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

                $cookies.put('loginState',$scope.userInfo.username);//登陆者
                $cookies.put('workUser',$scope.userInfo.username);  //被测者

                //save login state
                if ($scope.userInfo.autoLogin){
                    $cookies.put('nameSave',$scope.userInfo.username);
                    $cookies.put('pwdSave',$scope.userInfo.password);
                } else {
                    $cookies.remove('nameSave');
                    $cookies.remove('pwdSave');
                }

                if ($cookies.get('loginState')){
                    $scope.scanFiles();
                }
            } else {
                alert("login error");
            }

            $scope.usersList();
        }).error(function () {
            alert("system error(login)");
        })
    };

    $scope.clickLogout = function () {
        $scope.userInfo = {
            username:$cookies.get('nameSave'),
            password:$cookies.get('pwdSave'),
            autoLogin:true
        };
        $http({
            method:'POST',
            url: $scope.logoutURL,
            data:{username:$cookies.get('loginState')},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).success(function (response) {
            if (response.logout == 'OK'){
                $scope.showList = 0;
                $scope.login = 1;
                $cookies.remove('loginState');
                $cookies.remove('workUser');
            }
        }).error(function () {
            alert("system error(logout)");
        })
    };

    //scan the file of measuredata
    $scope.scanFiles = function () {
        if ($cookies.get('loginState') != undefined){
            $http.get("./actions/scan.php?username="+$scope.userInfo.username).success(function (response) {
                $scope.dataFiles = response;
            }).error(function () {
                alert("system error(scan)");
            });
        }
    };

    //upload to the platform
    $scope.uploadData = function (itemInfo,num) {
        if (confirm("Confirm upload No. "+num+"?")){
            $http({
                method:'POST',
                url:$scope.checkEmailURL,
                data:{username:itemInfo.UserName},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (response) {
                if (response.have_user == 'EXIST' || response.have_user == 'OK'){
                    $http({
                        method:'POST',
                        url:'./actions/upload.php',
                        data:{
                            username:itemInfo.UserName,
                            user_email:response.email,
                            device_id:itemInfo.Device,
                            datatime:itemInfo.MeasureTime,
                            datatype:itemInfo.DataType,
                            device_type:itemInfo.Device,
                            url:$scope.uploadURL,
                            file:itemInfo.File
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (res) {
                        $http.get("./actions/delete.php?filename="+itemInfo.Name+"&username="+itemInfo.UserName).success(function (response) {
                            if (response == 'OK'){
                                $scope.scanFiles();
                                alert("upload success");
                            }
                        })
                    }).error(function () {
                        alert("system fail(upload)");
                    })
                }
            })
        }
    };

    //delete from the document
    $scope.delData = function (itemInfo,num) {
        if (confirm("Confirm deletion of NO. "+num+"?")){
            $http.get("./actions/delete.php?filename="+itemInfo.Name+"&username="+itemInfo.UserName).success(function (response) {
                if (response == 'OK'){
                    $scope.scanFiles();
                    alert("delete successfully");
                }
            })
        }
    };

    $scope.showUploadAlert = function () {
        $scope.uploadAlert = 1;
    };
    $scope.closeUploadAlert = function () {
        $scope.uploadAlert = 0;
    };
    $scope.backToMeasure = function () {
        window.location.href = "index.html";
    };

    $scope.changeUser = function (user) {
        $cookies.remove('workUser');

        var num = $scope.users.username.indexOf(user);
        if (num >= 0){
            $scope.userInfo = {
                username:$scope.users.username[num],
                password:$scope.users.password[num],
                autoLogin:true
            };
            $cookies.put('workUser',$scope.userInfo.username);//被测者
            $scope.scanFiles();
        }
    };

    $scope.usersList = function () {
        $http.get("./actions/map.php?admin="+$cookies.get('loginState')).success(function (response) {
            $scope.users = response;

            if ($scope.users.length != 0){

                if ($cookies.get('workUser') != ''){
                    var num = $scope.users.username.indexOf($cookies.get('workUser'));
                    $scope.userInfo = {
                        username:$scope.users.username[num],
                        password:$scope.users.password[num],
                        autoLogin:true
                    };
                } else {
                    $scope.userInfo = {
                        username:$scope.users.username[0],
                        password:$scope.users.password[0],
                        autoLogin:true
                    };
                }
            } else {
                $scope.userInfo = {
                    username:$cookies.get('nameSave'),
                    password:$cookies.get('pwdSave'),
                    autoLogin:true
                };
            }

            $scope.user = $scope.userInfo.username;
            $scope.scanFiles();
        }).error(function () {
            $scope.scanFiles();
        });
    };
    $scope.usersList();

    $scope.manageUser = function () {
        var modalInstance = $uibModal.open({
            templateUrl:'./manageuser.html',
            size:'lg',
            controller:'manageUserModalController',
            resolve: {
                users : function(){
                    return $scope.users;
                }
            }
        });

        modalInstance.then();
    };

    $scope.visualizeData = function (dataFile, num) {
        var modalInstance = $uibModal.open({
            templateUrl:'./wave.html',
            size:'lg',
            controller:'waveShowModalController'
        });
    }
}]);