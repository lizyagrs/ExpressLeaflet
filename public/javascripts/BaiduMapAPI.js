var map;//定义地图全局变量
function init(){
	// 百度地图API功能
	map = new BMap.Map("baidumap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(114.353622,30.56486), 5);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("武汉");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	// 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
	    // 靠左上角位置
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    // LARGE类型
	    type: BMAP_NAVIGATION_CONTROL_LARGE,
	    // 启用显示定位
	    enableGeolocation: true
    });
    map.addControl(navigationControl);
    
    //--------------------------------------------------切换城市类型--------------------------------------------------------------
    var size = new BMap.Size(55, 15);//设定控件偏移值
    map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: size,//设定控件偏移值
	}));
    
    //----------------------------------------------------全景控件----------------------------------------------------------------
    map.addTileLayer(new BMap.PanoramaCoverageLayer());
    var stCtrl = new BMap.PanoramaControl(); //构造全景控件
	stCtrl.setOffset(new BMap.Size(35, 35));//设定控件偏移值
	map.addControl(stCtrl);//添加全景控件
    
    //-----------------------------------------------------鹰眼------------------------------------------------------------------
    var oveCtrl = new BMap.OverviewMapControl();
    map.addControl(oveCtrl);
    oveCtrl.changeView();
    
    //-------------地图样式控制---------------------------------
	//初始化模板选择的下拉框
	var sel = document.getElementById('stylelist');
	for(var key in mapstyles){
		var style = mapstyles[key];
		var item = new  Option(style.title,key);
		sel.options.add(item);
	}
	//window.map = map;
	changeMapStyle('normal')
	sel.value = 'normal';

   //--------------------输入框自动提示控制--------------------------
	
	//-----------------------起点-------------------------------------------------------------------------------------------
	var aa = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_a"
		,"location" : map
	});
	
	aa.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	aa.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});
	//------------------------------------------------------------------------------------------------------------------
	//----------------------------终点--------------------------------------------------------------------------------------
	var ab = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_b"
		,"location" : map
	});
	
	ab.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ab.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});
	//------------------------------------------------------------------------------------------------------------------
	
	//搜索实时定位
	function setPlace(){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
	}
	//输入提示标签值返回
	function G(id) {
		return document.getElementById(id);
	}
}
//改变地图样式
function changeMapStyle(style){
	map.setMapStyle({style:style});
	$('#desc').html(mapstyles[style].desc);
}




//步行规划函数
function WalkRouteQuery(){
	//alert("这里是测试是否跳进了这个函数里，OK!");
	var a=document.getElementById("tex_a").value;
	//alert("输入的起点是："+a);
	if (a=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入起点位置!";
		return;
	}
	
	var b=document.getElementById("tex_b").value;
	//alert("输入的终点是："+b);
	if (b=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入终点位置!";
		return;
	}
	
	var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
    walking.search(a,b);
    document.getElementById("alertmessage").setAttribute("class","alert alert-success");
	document.getElementById("alertmessage").innerHTML="步行规划查询结果如下：";
}
//驾车路线函数
function DrivingQuery(){
	map.clearOverlays(); 
	var a=document.getElementById("tex_a").value;
	if (a=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入起点位置!";
		return;
	}
	
	var b=document.getElementById("tex_b").value;
	//alert("输入的终点是："+b);
	if (b=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入终点位置!";
		return;
	}
	var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
	driving.search(a,b);
	document.getElementById("alertmessage").setAttribute("class","alert alert-success");
	document.getElementById("alertmessage").innerHTML="驾车路线查询结果如下：";
}
//公交查询函数
function BusQuery(){
	map.clearOverlays(); 
	var a=document.getElementById("tex_a").value;
	if (a=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入起点位置!";
		return;
	}
	
	var b=document.getElementById("tex_b").value;
	//alert("输入的终点是："+b);
	if (b=='')
	{
		document.getElementById("alertmessage").setAttribute("class","alert alert-danger");
		document.getElementById("alertmessage").innerHTML="请输入终点位置!";
		return;
	}
    var transit = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result"}
	});
    transit.search(a, b);
    document.getElementById("alertmessage").setAttribute("class","alert alert-success");
	document.getElementById("alertmessage").innerHTML="公交换乘路线查询结果如下：";
}


//-------------------------------------------------------------------------------------------

//添加小学
function addPrimary(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(111.65, 40.82);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	var marker = new BMap.Marker(point);
  	map.addOverlay(marker);
  	
  	var content = "这是我的小学";
  	addClickHandler(content,marker);
}

//添加初中
function addJuniormiddle(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(106.71, 26.57);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	var marker = new BMap.Marker(point);
  	map.addOverlay(marker);
  	
  	var content = "这是我的初中";
  	addClickHandler(content,marker);
}

//添加高中
function addSeniormiddle(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(116.46,39.92);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>这是我的高中</h4>"+
    "<iframe width='450px' height='350px' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' scrolling='no' src='Echarts01.html'/>";
  	addClickHandler(content,marker);
  	
}

    
    
//添加大学
function addUniversity(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(114.340553,30.582753);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
    var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker);
    var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>湖北大学</h4>"+
    "<div id='echartsTest' style='width:400px;height:300px;opacity:0.85;'></div>";
    marker.addEventListener("click",function(e){
			openInfo(content,e);
	    	loadEcharts();
    	}
	);
    
}

//显示全部
function fullscreen(){
	//清除地图覆盖物
	map.clearOverlays();
	
	//定义信息点坐标集合
	var data_info = [[111.65, 40.82,"我的小学"],
					 [106.71, 26.57,"我的初中"],
					 [116.46,39.92,"我的高中"],
					 [114.340553,30.582753,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>这是我的大学</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo'" + 
	"src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493525420090&di=4b9b91d42435458f3fdb5ae809c754b2&imgtype=0&src=http%3A%2F%2Fwww.998xulang.com%2Fpic%2Fbig%2F358_0.jpg'"+
	"width='200' height='150' title='湖北大学'/>" +
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址：湖北省武汉市武昌区友谊大道368号;邮政编码：430062</p>"]
					 
					];		
					
	//遍历每个点的经纬度
	//data_info[i][0]，每一个坐标点的第一列，即经度
	//data_info[i][1]，每一个坐标点的第二列，即纬度
	for (var i = 0; i < data_info.length; i ++) {
		var point = new BMap.Point(data_info[i][0],data_info[i][1]);
		//显示内容
		var content = data_info[i][2];
		//调用添加标注点函数，逐个添加标记点
		
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		addClickHandler(content,marker);
	}
	//定义地图的中心点，在中国的中心，西安附近
	var point = new BMap.Point(108.95,34.27);
	//显示中心与地图级别，为了能够看到全国范围
	map.centerAndZoom(point, 5);
	
}

//标注点点击事件调用打开窗口信息
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
	
}

//弹出窗口
function openInfo(content,e){
	
	var opts = {
		width : 450,     // 信息窗口宽度
		height: 380,     // 信息窗口高度
		title : "信息窗口" , // 信息窗口标题
		enableMessage:true//设置允许信息窗发送短息
    }
    
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	
}



//地名检索并返回名称、地址、经纬度
function localsearch(){
	var options = {
		renderOptions: {map: map,autoViewport: true},pageCapacity: 99,
		onSearchComplete: function(results){
			// 判断状态是否正确
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				var s = [];
				map.clearOverlays();
				for (var i = 0; i < results.getCurrentNumPois(); i ++){
					s.push(results.getPoi(i).title + ", " + results.getPoi(i).address+", "+results.getPoi(i).point.lng+", "+results.getPoi(i).point.lat);
					var point = new BMap.Point(results.getPoi(i).point.lng,results.getPoi(i).point.lat);
					var marker = new BMap.Marker(point);
					map.addOverlay(marker);
				}
				document.getElementById("r-result").innerHTML = s.join("<br/>");
			}
		}
	};
	var local = new BMap.LocalSearch(map, options);
	var city = document.getElementById("cityName").value;
	if(city != ""){
		map.centerAndZoom(city,11);      // 用城市名设置地图中心点
	}
	else{
		alert('请输入城市名！');
	}
	var txt_search = document.getElementById("text_search").value;
	if(txt_search!= ""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称！');
	}
}

//地名检索并分页显示结果
function searchpage(){
	var local = new BMap.LocalSearch(map, {
		renderOptions: {map: map, panel: "r-result"}
	});
	var city = document.getElementById("cityName").value;
	if(city != ""){
		map.centerAndZoom(city,11);      // 用城市名设置地图中心点
	}
	else{
		alert('请输入城市名！');
	}
	var txt_search = document.getElementById("text_search").value;
	if(txt_search!= ""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称！');
	}
}