/**
 * Created by zhangshaobo on 2016/12/12.
 */
app.controller('waveShowModalController',['$scope','$http','$uibModalInstance', 'dataInfo', 'num',function ($scope,$http,$uibModalInstance,dataInfo,num) {
    $scope.dataInfo = dataInfo;
    $scope.dataInfo.num = num;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $http({
        method:'POST',
        url: "./actions/waveshow.php",
        data:{type:dataInfo.DataType,file:dataInfo.File},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (response) {
        var measureTime = +new Date(dataInfo.MeasureTime);
        var xAxisData = [];
        for (var i = 0; i < response.length;i=i+1){
            var now = new Date(measureTime+=4);
            xAxisData.push([now.getFullYear(), now.getMonth(), now.getDate()].join('/')+ " " +[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
        }


        var yAxisData = response.data;
        var zoomData  = (1250/response.length)*100;//默认显示5秒

/////////////////ECharts//start//////////
        var myChart = echarts.init(document.getElementById('wave'));
        var option = {
            animation:false,
            title: {
                text: dataInfo.MeasureTime+"——"+dataInfo.DataType
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show : true,
                data:[dataInfo.DataType]
            },
            xAxis: {
                data: xAxisData,
                offset : 0
            },
            yAxis: {
                splitLine: {
                    show: true
                },
                min : 'auto'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end:zoomData
                },
                {
                    type: 'slider',
                    show: true
                }
            ],
            series: [{
                name: dataInfo.DataType,
                type: 'line',
                smooth: true,
                data: yAxisData
            }]
        };

        myChart.setOption(option);
        console.log(document.getElementById('wave'));
/////////ECharts//end  //////////

    }).error(function () {
        alert("error(wave system)");
    });
}]);