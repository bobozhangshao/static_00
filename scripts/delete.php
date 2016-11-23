<?php
/**
 * @Created by PhpStorm.
 * @User: zhangshaobo | bobozhangshao@gmail.com
 * @Time: 2016/11/21 11:39
 * @Desc: delete one file
 */
function deleteItem()
{
    $file = substr(__DIR__,0,-7)."data/".$_GET['username']."/".$_GET['filename'];
    if (file_exists($file)){
        unlink($file);
        return "OK";
    }
}

echo deleteItem();
