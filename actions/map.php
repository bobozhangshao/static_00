<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/25 19:42
 * @Desc: scan the user and device map
 */
function getAllUsers($map,$administrator)
{
    $users = array();
    foreach ($map as $item){
        if ($item->administrator == $administrator){
            $count = 0;
            foreach ($item->user as $userInfo){
                $users['username'][$count] = (string)$userInfo->username;
                $users['password'][$count] = (string)$userInfo->password;
                $users['devices'][$count] = json_decode(json_encode($userInfo->device),true);
                $count++;
            }
        }
    }
    return $users;
}

function provideUserInfo(){
    //取map.xml的内容
    $map = simplexml_load_file(substr(__DIR__,0,-7)."data/map.xml");
    $administrator = $_GET['admin'];
    $users = getAllUsers($map,$administrator);

    return json_encode($users);
}

echo provideUserInfo();