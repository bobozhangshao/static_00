/**
 * Created by zhangshaobo on 2016/12/13.
 */
app.controller('manageUserModalController',['$http','$scope','$cookies','$uibModalInstance','users','choosedUser',function ($http,$scope,$cookies,$uibModalInstance,users,choosedUser) {
    $scope.modalUsers = users;
    $scope.modalUser = choosedUser?choosedUser:($scope.modalUsers.username&&$scope.modalUsers.username[0]?$scope.modalUsers.username[0]:'');
    $scope.manageInfo = '';
    $scope.showTable = true;
    $scope.newName = '';
    $scope.newPwd = '';

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
    $scope.showNewAlert = function () {
        $scope.manageInfo = 'Click and add a new user!';
    };
    $scope.closeNewAlert = function () {
        $scope.manageInfo = '';
    };

    $scope.newUser = function () {
        $scope.showTable = false;
    };
    $scope.clearAdd = function () {
        $scope.showTable = true;
        $scope.newName = '';
        $scope.newPwd = '';
    };
    $scope.saveAdd = function () {
        if (confirm("Are you sure to add new user?\nusername : "+$scope.newName)){
            $http.get("./actions/manageuser.php?action=addUser&username="+$scope.newName+"&password="+$scope.newPwd+"&admin="+$cookies.get('loginState')).success(function (response) {
                if (response){
                    alert("Add "+$scope.newName+" scuccess");
                    $http.get("./actions/map.php?admin="+$cookies.get('loginState')).success(function (res) {
                        $scope.modalUsers = res;
                    })
                }
                $scope.clearAdd();
            });
        }
    };

    $scope.delUser = function () {
        if (confirm("Confirm delete map of "+$scope.modalUser+"?")){
            $http.get("./actions/manageuser.php?action=delUser&username="+$scope.modalUser+"&admin="+$cookies.get('loginState')).success(function (response) {
                if (response){
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
            $http.get("./actions/manageuser.php?action=delDevice&username="+$scope.modalUser+"&admin="+$cookies.get('loginState')+"&device="+device).success(function (response) {
                if (response){
                    alert($scope.modalUser+"'s device '"+device+"' has been removed!");
                    $scope.devices.splice(num,1);
                }
            });

        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);