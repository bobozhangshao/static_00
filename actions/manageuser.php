<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/12/14 08:55
 * @Desc:
 */
function deleteUser(){
    //取map.xml的内容
    $map = simplexml_load_file(substr(__DIR__,0,-7)."data/map.xml");
    $administrator = $_GET['admin'];
    $username      = $_GET['username'];

    //$mapArr = json_decode(json_encode($map),true);
    foreach ($map as $item){
        if ($item->administrator == $administrator){
            foreach ($item->user as $key=>$value){
                if ($value->username == $username){
                    unset($value);
                }
            }
        }
    }

    return json_encode($map);
}

echo deleteUser();