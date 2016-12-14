/**
 * Created by zhangshaobo on 2016/12/13.
 */
app.controller('manageUserModalController',['$http','$scope','$cookies','$uibModalInstance','users','choosedUser',function ($http,$scope,$cookies,$uibModalInstance,users,choosedUser) {
    $scope.modalUsers = users;
    $scope.modalUser = choosedUser?choosedUser:($scope.modalUsers.username&&$scope.modalUsers.username[0]?$scope.modalUsers.username[0]:'');
    $scope.manageInfo = '';

    $scope.changeUserMap = function () {
        var num = $scope.modalUsers.username?$scope.modalUsers.username.indexOf($scope.modalUser):0;
        $scope.devices = $scope.modalUsers.devices?$scope.modalUsers.devices[num]:[];
    };
    $scope.changeUserMap();

    //control the variate: manageInfo
    $scope.showDelAlert = function () {
        $scope.manageInfo = "User named "+$scope.modalUser+" will be destory!";
    };
    $scope.closeDelAlert = function () {
        $scope.manageInfo = '';
    };

    $scope.delUser = function () {
        if (confirm("Confirm delete map of "+$scope.modalUser+"?")){
            $http.get("./actions/manageuser.php?username="+$scope.modalUser+"&admin="+$cookies.get('loginState')).success(function (response) {
                if (response == "OK"){
                    alert($scope.modalUser+" has been deleted!");
                    //delete from the users list
                    var num = $scope.modalUsers.username?$scope.modalUsers.username.indexOf($scope.modalUser):0;
                    angular.forEach($scope.modalUsers,function (value, key) {
                        value.splice(num,1);
                    });

                    //make up the devices list
                    $scope.modalUser = $scope.modalUsers.username&&$scope.modalUsers.username[0]?$scope.modalUsers.username[0]:'';
                    $scope.changeUserMap();
                }
            })
        }
    };

    //devices table
    $scope.deleteDevice = function (num, device) {
        if (confirm("You confirm remove "+$scope.modalUser+"'s device: "+device+" ?")){
            //todo

        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);