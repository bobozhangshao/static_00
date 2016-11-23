<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/21 08:32
 * @Desc: scan the document of measure data file
 */

//get the files
function getFiles()
{
    $dir = substr(__DIR__,0,-7)."data/".$_GET['username'];
    if (file_exists($dir)){
        $files=array_diff(scandir($dir),array('.','..','index.html'));
        return $files;
    } else {
        if($_GET['username']){
            @mkdir($dir,0777,true);
            $indexHTML = $dir."/index.html";
            $fp = fopen($indexHTML,'w');
            fwrite($fp,'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body></body></html>');
            fclose($fp);
        }
        return 0;
    }
}

//fix the data
function fixData()
{
    $dir = substr(__DIR__,0,-7)."data/".$_GET['username'];
    $files = getFiles();
    $result = array();
    if ($files){
        $count = 0;
        foreach ($files as $item){
            $arr = explode('_',substr($item,0,strpos($item,'.')));

            $result[$count]['UserName'] = $arr[0];
            $result[$count]['Device'] = $arr[1];
            $result[$count]['DataType'] = $arr[2];
            $result[$count]['MeasureTime'] = $arr[3].'.'.$arr[4].'.'.$arr[5].' '.$arr[6].':'.$arr[7].':'.$arr[8];
            $result[$count]['Name'] = $item;
            $result[$count]['File'] = $dir.'/'.$item;

            $count++;
        }
    }
    return json_encode($result);
}

echo fixData();