<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/22 15:22
 * @Desc:
 */

function doUploadCurl()
{
    $url = "http://localhost/HeartCare/index.php?option=com_heartcare&task=upload.upload";

    $fileInfo['username']   = $_POST['username'];
    $fileInfo['user_email'] = $_POST['user_email'];
    $fileInfo['device_id']  = $_POST['device_id'];
    $fileInfo['datatime']   = $_POST['datatime'];
    $fileInfo['datatype']   = $_POST['datatype'];
    $fileInfo['device_type']= $_POST['device_type'];
    $fileInfo['file']       = "@".$_POST['file'].";type=text/plain";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,$fileInfo);
    curl_setopt($ch, CURLOPT_URL, $url);
    $info= curl_exec($ch);
    curl_close($ch);
    return $info;
}

echo doUploadCurl();