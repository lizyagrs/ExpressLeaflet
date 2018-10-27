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
	xmlhttp.open("GET", "http://47.106.158.161:3000/GDPQuery?code=" + str, true);
	xmlhttp.send();
}

