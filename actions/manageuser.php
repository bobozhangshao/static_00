<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/12/14 08:55
 * @Desc: 删除一个用户
 */
function deleteUser(){
    //取map.xml的内容
    $file = substr(__DIR__,0,-7)."data/map.xml";
    $map = simplexml_load_file($file);
    $administrator = $_GET['admin'];
    $username      = $_GET['username'];

    //i,j定位
    $i = 0;
    $j = 0;
    foreach ($map->admin as $item) {
        if ($item->administrator == $administrator){
            foreach ($item->user as $itemUser){
                if ($itemUser->username == $username){
                    unset($map->admin[$i]->user[$j]);
                    break;
                }
                $j++;
            }
        }
        $i++;
    }
    if($map->asXML($file)){
         return true;
    }
    return false;
}

echo deleteUser();