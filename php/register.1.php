<?php

    header("Content-Type:text/html;charset=utf-8;");
    #1. 从前端拿来数据;
    $username = 'huaizhiY';
    $password = '123456';
    #2. 把数据放入到数据库之中;
    // 1. 如何连接数据;

    // mysql_connect(servername,username,password);
    $con = mysql_connect("localhost","root","123456");
    if(!$con){
        // echo "数据库连接成功";
        die("数据库连接失败");
    }

    // 向某一个表写入一些东西;

    // 1. 选中数据库; 
    mysql_select_db("userlist", $con);
    // 2. 写sql语句;
    mysql_query("INSERT INTO detaillist (password, username ) 
    VALUES ('$password', '$username')");

    // echo mysql_error();
    if(mysql_error()){
        die("数据库错误");
    }

    

?>