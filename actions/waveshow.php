<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/12/19 14:01
 * @Desc: 提供波形数据
 */

/**
 *组装数据
 *@return string json
 */
function getDataToJson($data, $type){
    $result = array();
    $len = sizeof($data);

    //删除最后一位空的
    if (end($data) == ""){
        $len = $len - 1;
        unset($data[$len]);
    }

    if ($type == 'ECG'){
        $result['data'] = $data;
        $result['length'] = $len;
        $result['keep'] = $len/250;
        return json_encode($result);
    }
}

function run(){
    $file = $_POST['file'];
    $type = $_POST['type'];
    $username = $_POST['username'];

    $data = explode("\n",file_get_contents($file));

    $result = getDataToJson($data, $type);

    return $result;
}

echo run();

