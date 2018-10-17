
        var oBtn = document.getElementById("btn");
        var oUser = document.getElementById("username");
        var oPwd = document.getElementById("pwd");
        var oHello = document.getElementById("hello");
        oBtn.onclick = function(){
            console.log(oUser.value,oPwd.value);
            var url = "http://localhost/jd/php/login.php";
            ajaxPost(url,`username=${oUser.value}&password=${oPwd.value}`)
            .then(function(res){
                if(res){
//              	location.href = "jd.html"
//              	oHello.innerHTML = oUser.value;
                	console.log(oHello)
                }
            })
        }
        //选项卡
        function Tab(btn_selector,item_selector){
            this.abtn = document.querySelectorAll(btn_selector);
            console.log(this.abtn);
            this.aItem = document.querySelectorAll(item_selector);
            console.log(this.aItem);
        }
        Tab.prototype.init = function(){
            
            this.handleEvent();
        }
        Tab.prototype.handleEvent = function(){
        
            for(var i = 0 ; i < this.abtn.length ; i ++){
                // 添加元素标记;
                this.abtn[i].index = i;
                console.log(this.abtn[i]);
                this.abtn[i].onclick = this.changIndex.bind(this);
            }
        }
        Tab.prototype.changIndex = function(event){
            var e = event || window.event;
           
            var target = e.target || e.srcElement;
           
            
            this.index = target.index;
            console.log(this.index);
            this.show();
        }
        Tab.prototype.show = function(){
            for(var i = 0 ; i < this.aItem.length ; i ++){
                this.aItem[i].style.display = "none";
                
            }
            //console.log(this.index);
            this.aItem[this.index].style.display = "block";
            this.abtn[this.index].className +=" current";
            //console.log(this.abtn[this.index])
        }
       
        var tab = new Tab("#btn_list div","#box div");
        tab.init();

