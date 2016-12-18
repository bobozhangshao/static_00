<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/12/14 08:55
 * @Desc: 管理名下用户:增加、删除
 */
//删除用户
function deleteUser($file,$map){
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

//删除设备
function deleteDevice($file,$map){
    $administrator = $_GET['admin'];
    $username      = $_GET['username'];
    $device        = $_GET['device'];
    //i,j定位
    $i = 0;
    $j = 0;
    $k = 0;
    foreach ($map->admin as $item) {
        if ($item->administrator == $administrator){
            foreach ($item->user as $itemUser){
                if ($itemUser->username == $username){
                    foreach ($itemUser->device as $itemDevice){
                        if ($itemDevice == $device){
                            unset($map->admin[$i]->user[$j]->device[$k]);
                        }
                        $k++;
                        break;
                    }
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

//增加用户
function addUser($file, $map){
    $administrator = $_GET['admin'];
    $username      = $_GET['username'];
    $password      = $_GET['password'];

    //i,j定位
    $i = 0;
    $j = 0;
    foreach ($map->admin as $item) {
        if ($item->administrator == $administrator){
            foreach ($item->user as $itemUser){
                if ($itemUser->username == $username){
                    return false;
                }
                $j++;
            }

            $map->admin[$i]->user[$j]->username = $username;
            $map->admin[$i]->user[$j]->password = $password;
            break;
        }
        $i++;
    }

    if($map->saveXML($file)){
        return true;
    }

    return false;
}

//增加设备 todo
function addDevice($file,$map){

    return false;
}

function run(){
    //取map.xml的内容
    $file = substr(__DIR__,0,-7)."data/map.xml";
    $map = simplexml_load_file($file);

    $action = $_GET['action'];
    if ($action == 'delUser'){
        echo deleteUser($file,$map);
    }

    if ($action == 'delDevice'){
        echo deleteDevice($file,$map);
    }

    if ($action == 'addUser'){
        echo addUser($file,$map);
    }
}

run();