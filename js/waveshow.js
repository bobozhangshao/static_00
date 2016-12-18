/**
 * Created by zhangshaobo on 2016/12/12.
 */
app.controller('waveShowModalController',['$scope','$uibModalInstance', 'dataInfo', 'num',function ($scope,$uibModalInstance,dataInfo,num) {
    $scope.dataInfo = dataInfo;
    $scope.dataInfo.num = num;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);


// {
//     "UserName":"hello",
//     "Device":"ECGICGMONITOR",
//     "DataType":"ECG",
//     "MeasureTime":"2016.01.07 12:36:11",
//     "Name":"hello_ECGICGMONITOR_ECG_2016_01_07_12_36_11_.txt",
//     "File":"/Users/zhangshaobo/Sites/static_00/data/hello/hello_ECGICGMONITOR_ECG_2016_01_07_12_36_11_.txt",
//     "$$hashKey":"object:28"
// }