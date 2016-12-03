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

	
    $minute = ((int)(date("i",$_POST['time'])/6))*6;
    $dataPiece['time_pre']  = date("Y_m_d_H_",$_POST['time']);

    $dataPiece['time'] = $dataPiece['time_pre'].$minute.'_00';

    $filename = $dataPiece['username'].'_'.$dataPiece['device_type'].'_'.$dataPiece['data_type'].'_'.$dataPiece['time'];
	$file     = substr(__DIR__,0,-7)."data\/".$_POST['username']."\/".$filename;  

    $res = file_put_contents($file,$dataPiece['data_piece'],FILE_APPEND);
    return $res;
}

echo writeDataTxt();