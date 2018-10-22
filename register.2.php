<?php   
        header("Content-Type:text/html;charset=utf-8");
        # 1.从前端拿来数据；     
        $username = @$_POST["username"];
        $password = @$_POST["password"];
        if($username=="" || $password == ""){
            die("参数不全");
        }
        # 2.把数据放入到数据库之中；

        // 1. 如何链接数据库;

        //mysql_connect(servername,username,password);
        $con = mysql_connect("localhost","root","123456");
        //echo $con;

        if(!$con){
            die("数据库连接失败");//终止并返回代码
        }
        // 向表中写入东西;
        // 选中数据库
        mysql_select_db("userlist",$con);
        // 判定是否存在相同用户名;
        // $result = mysql_query("SELECT * FROM detaillist");
        // 写sql语句
        $result = mysql_query(
                    "SELECT username FROM
                    detaillist WHERE username='$username'"
        );
        // echo $result;
       
        $count = 0 ;

        while($row = mysql_fetch_array($result)){
            echo json_encode($row)."</br>";
            $count ++;
        }

        // 用户名重命名;
        if($count != 0 ){
            die("用户名重复");
        }
        // 加密密码;
        $password = md5($password);
        mysql_query("INSERT INTO detaillist(password, username )
        VALUE ('$password','$username')");

        
        if(mysql_error()){
            die("数据库错误".mysql_error()); 
        }
        echo "注册成功";
?>