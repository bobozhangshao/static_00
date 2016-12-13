/**
 * Created by zhangshaobo on 2016/12/13.
 */
app.controller('manageUserModalController',['$scope','$uibModalInstance','users',function ($scope,$uibModalInstance,users) {
    $scope.users = users;
    $scope.user = users.username[0]?users.username[0]:'';
    $scope.manageInfo = '';

    //control the variate: manageInfo
    $scope.showNewAlert = function () {
        $scope.manageInfo = 'Click and add a new user!';
    };
    $scope.closeNewAlert = function () {
        $scope.manageInfo = '';
    };
    $scope.showDelAlert = function () {
        $scope.manageInfo = "User, "+$scope.user+", will be destory!";
    };
    $scope.closeDelAlert = function () {
        $scope.manageInfo = '';
    };

    $scope.newUser = function () {
        //todo
    };
    $scope.delUser = function () {
        //todo
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    }
}]);