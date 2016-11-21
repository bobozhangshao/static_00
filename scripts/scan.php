<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/21 08:32
 * @Desc: scan the document of measure data file
 */
//////////////////////////////////////////////////////////////////////////
//测试数据                                                               //
//$data = [
//    0=>[
//        'MeasureTime'=>'2016-11-21 00:01:09',
//        'Device'=>'ECGICGMONITOR',
//        'DataType'=>'ACC',
//        'Name'=>'admin_ECGICGMONITOR_ACC_2016_11_21_00_01_09_.txt'
//    ],
//    1=>['MeasureTime'=>'2016-11-21 10:01:09',
//        'Device'=>'ECGICGMONITOR',
//        'DataType'=>'ACC',
//        'Name'=>'admin_ECGICGMONITOR_ACC_2016_11_21_10_01_09_.txt'
//    ]
//];
//
//echo json_encode($data);                                              //
//////////////////////////////////////////////////////////////////////////

//get the files
function getFiles()
{
    $dir = substr(__DIR__,0,-7)."data/".$_GET['username'];
    if (file_exists($dir)){
        $files=array_diff(scandir($dir),array('.','..'));
        return $files;
    } else {
        @mkdir($dir,0777);
        return 0;
    }
}

//fix the data
function fixData()
{
    $files = getFiles();
    $result = array();
    if ($files){
        $count = 0;
        foreach ($files as $item){
            $arr = explode('_',substr($item,0,strpos($item,'.')-1));

            $result[$count]['UserName'] = $arr[0];
            $result[$count]['Device'] = $arr[1];
            $result[$count]['DataType'] = $arr[2];
            $result[$count]['MeasureTime'] = $arr[3].'.'.$arr[4].'.'.$arr[5].' '.$arr[6].':'.$arr[7].':'.$arr[8];
            $result[$count]['Name'] = $item;

            $count++;
        }
    }
    return json_encode($result);
}

echo fixData();