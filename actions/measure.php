<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/21 10:01
 * @Desc: store the measure data into a text file
 */

function writeDataTxt(){
    date_default_timezone_set('Asia/Shanghai');
    $dataPiece['username']    = $_POST['username'];
    $dataPiece['data_type']   = $_POST['type'];
    $dataPiece['device_type'] = $_POST['device'];
    $dataPiece['data_piece']  = implode("\n",json_decode($_POST['data'],true))."\n";

    $timeStamp = $_POST['time'];
    $dataPiece['time'] = timeInDocument($timeStamp,$dataPiece['username']);

    $filename = $dataPiece['username'].'_'.$dataPiece['device_type'].'_'.$dataPiece['data_type'].'_'.$dataPiece['time'].'.txt';
	$file     = substr(__DIR__,0,-7).'data\/'.$_POST['username'].'\/'.$filename;

    $res = file_put_contents($file,$dataPiece['data_piece'],FILE_APPEND);
    return $res;
}

function timeInDocument($timeStamp,$username){
    $dir = substr(__DIR__,0,-7).'data\/'.$username;
    $files = array_diff(scandir($dir),array('.','..','index.html'));

    $result = array();
    if ($files){
        $count = 0;
        foreach ($files as $item){
            $arr = explode('_',substr($item,0,strpos($item,'.')));
            $time = $arr[3].'.'.$arr[4].'.'.$arr[5].' '.$arr[6].':'.$arr[7].':'.$arr[8];
            $result[$count] = strtotime($time);
        }
    }

    $minute = ((int)(date("i",$timeStamp)/6))*6;
    $timePre  = date("Y_m_d_H_",$timeStamp);
    $time =  $timePre.$minute.'_00';

    if (key_exists($time,$result)){
        return $time;
    }

    return $timeStamp;
}

echo writeDataTxt();