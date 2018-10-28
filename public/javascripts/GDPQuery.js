//查询数据库中对应省的GDP信息===================================================================================
function showGDP(str) {
	var xmlhttp;
	if(str == "") {
		document.getElementById("popForm").innerHTML = "";
		return;
	}
	if(window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
			var jsonObj = JSON.parse(xmlhttp.responseText)
			
			document.getElementById("popForm").innerHTML = "【省名称】"+jsonObj.data[0].pro_name + '<br/>' 
			+"【行政区代码】" + jsonObj.data[0].pro_code+ '<br/>' 
			+"【GDP】"+jsonObj.data[0].GDP + '<br/>'
			+"【年份】"+jsonObj.data[0].DataYear;
			console.log(jsonObj.data[0].pro_name);
		}
	}
	console.log('str：：：'+str);
	xmlhttp.open("GET", "http://47.106.158.161:3000/GDPQuery?code=" + str, true);
	xmlhttp.send();
}

function getNews(URL) {
        let promise = new Promise((resolve,reject)=>{
            //状态初始化
            //执行异步任务
            let xmlHttp = new XMLHttpRequest();//创建对象
            console.log(xmlHttp.readyState);//初始状态 为0 一步一步变为4
            // 绑定监听
            xmlHttp.onreadystatechange = ()=>{
                if(xmlHttp.readyState === 4) {//请求成功
                    if (xmlHttp.status == 200) {
                        console.log(xmlHttp.responseText);
                        //修改状态
                        resolve(xmlHttp.responseText);
                    } else {//请求失败
                        reject(`暂时没有新闻`);
                    }
                }
            }

            // open 设置请求的方式及url
            xmlHttp.open('GET',URL);
            xmlHttp.send();
        });

        return promise;

    }

function testAjax(url,code){ 
	  var text={"code":code}; //这是一个json对象
	  console.log('参数传递函数text.code:::'+text.code);
	  var xmlhttp;
	  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	  } else { // code for IE6, IE5
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	      console.log('服务器响应成功');
	      document.getElementById("popForm").innerHTML=xmlhttp.responseText;
	    }
	  }
	  xmlhttp.open("GET", url, true);
	  xmlhttp.setRequestHeader("Content-type","application/json");//需要设置成application/json
	  xmlhttp.send(JSON.stringify(text)); //body-parser解析的是字符串，所以需要把json对象转换成字符串
	  
	  console.log(JSON.stringify(text));
	  console.log(typeof JSON.stringify(text));
}