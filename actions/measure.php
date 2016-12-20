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
	$file     = substr(__DIR__,0,-7).'data/'.$_POST['username'].'/'.$filename;

    $res = file_put_contents($file,$dataPiece['data_piece'],FILE_APPEND);
    return $res;
}

/**
 * 判断时间标记
 * @return string
 */
function timeInDocument($timeStamp,$username){
    $dir = substr(__DIR__,0,-7).'data/'.$username;
    $files = array_diff(scandir($dir),array('.','..','index.html','.DS_Store'));
    $timeMix = 0;    //最新的时间
    $timeMixKey = 0; //最新的时间的key

    $result = array();
    if (sizeof($files) != 0){
        $count = 0;
        foreach ($files as $item){
            $arr = explode('_',substr($item,0,strpos($item,'.')));
            $time = $arr[3].'-'.$arr[4].'-'.$arr[5].' '.$arr[6].':'.$arr[7].':'.$arr[8];
            $result['time'][$count]     = strtotime($time);
            $result['filename'][$count] = $item;
            $result['type'][$count]     = $arr[2];
            $result['device'][$count]   = $arr[1];

            //标记最大时间
            $flag = $timeMix<$result['time'][$count];
            $timeMix = $flag?$result['time'][$count]:$timeMix;
            $timeMixKey = $flag?$count:$timeMixKey;

            $count++;
        }
    } else {
        return date("Y_m_d_H_i_s",$timeStamp);
    }

    //最近测量的文件
    $lastTime = fileTime($result['filename'][$timeMixKey],$result['type'][$timeMixKey]);
    $timeLast = $lastTime + $result['time'][$timeMixKey];
    $minite = (int) date("i",$timeStamp)%6;//六分钟为一个文件
    $second = (int) date("s",$timeStamp);  //秒
    //上下浮动一秒的数据都存到文件中
    if ((int) $timeLast <= (int) $timeStamp +1 && (int) $timeLast >= (int) $timeStamp -1 && !($minite==0 && $second==0)){
        return date("Y_m_d_H_i_s",$result['time'][$timeMixKey]);
    }
    return date("Y_m_d_H_i_s",$timeStamp);
}

/**
 * 文件记录的数据时间长度
 * @return int
 */
function fileTime($filename, $type){
    $file = substr(__DIR__,0,-7).'data/'.$_POST['username'].'/'.$filename;
    $rate = 250;

    if ($type == 'ECG'){
        $len = sizeof(explode("\n",file_get_contents($file)));
        return ($len-1)/$rate;
    }

    return false;
}

echo writeDataTxt();