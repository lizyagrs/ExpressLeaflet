var map;//定义地图全局变量
function init(){
	// 百度地图API功能
	map = new BMap.Map("baidumap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(114.339626,30.583379), 16);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("武汉");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	var marker = new BMap.Marker(new BMap.Point(114.339626,30.583379));
  	map.addOverlay(marker);
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
    
    //-----------------------------------------------------鹰眼------------------------------------------------------------------
    var oveCtrl = new BMap.OverviewMapControl();
    map.addControl(oveCtrl);
    oveCtrl.changeView();
}