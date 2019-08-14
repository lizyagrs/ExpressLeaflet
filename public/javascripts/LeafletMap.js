var map;
//地图初始化
function init(){	
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.524585 ], 9);

/*
 * ******************************************底图加载************************************************************************************
 */
	//openstreetmap底图
	var openstreetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	// mapbox-street底图
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2owOTAyMHo1MDdyMDJxb3VzOTB2czZmNSJ9.5iZSlr7iLwBh9ebR6KMGeg'
	}).addTo(map)
	//谷歌
	var GoogleMap = L.tileLayer.chinaProvider('Google.Normal.Map', {//谷歌地图
			maxZoom: 18,minZoom: 4
		}),
		Googlesatellite = L.tileLayer.chinaProvider('Google.Satellite.Map', {//谷歌影像
			maxZoom: 18,minZoom: 4
		}); 
		//高德地图
	var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {//高德地图
		maxZoom: 18,minZoom: 4
	});
	var Gaodeimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {//高德影像
		maxZoom: 18,minZoom: 4
	});
	var Gaodeimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {//高德影像标注
		maxZoom: 18,minZoom: 4
	});
	var Gaodeimage = L.layerGroup([Gaodeimgem, Gaodeimga]);
	
	
/*
 * ******************************************专题图层加载******************************************************************************************************************************
 */
	//地图服务地址
	var url='http://47.92.246.52:8080/geoserver/LightWebGIS/wms'
	//构建专题地图服务连接串
	const bounderLayer  = L.tileLayer.wms(url, {
		layers: 'LightWebGIS:Search_Polygons',
		format: "image/png",
		crs: L.CRS.EPSG4326,
		opacity: 0.5,
		transparent: true
	});
	//Search_Polygons边界GeoJSON服务的完整路径
	var url = "http://47.92.246.52:8080/geoserver/LightWebGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LightWebGIS%3ASearch_Polygons&maxFeatures=50&outputFormat=application%2Fjson"
	var Search_PolygonsGeoJSON = L.geoJson(null, { 
		onEachFeature: function(feature, marker) {
				marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.code);
		}
	}).addTo(map);
	//ajax调用
	$.ajax({
		url: url, //GeoJSON服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			Search_PolygonsGeoJSON.addData(data);
		},
	});

	//GDP_Polygon边界GeoJSON服务的完整路径
	var url = "http://47.92.246.52:8080/geoserver/LightWebGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LightWebGIS%3AGDP_Polygon&maxFeatures=50&outputFormat=application%2Fjson"
	//定义GeoJSON图层
	var GDP_Polygon_GeoJSON = L.geoJson(null, { 
		//回调函数
		onEachFeature: function(feature, marker) {
			//点击弹出信息窗口
			marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.code);
		}
	});//.addTo(map);//默认打开图层
	//ajax调用
	$.ajax({
		url: url, //GeoJSON服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			GDP_Polygon_GeoJSON.addData(data);
		},
	});

	//定义底图
	var baseMaps = {
	    "OpenstreetMap": openstreetmap,
	    "MapboxStreets": mapboxstreet,
        "谷歌地图": GoogleMap,
        "谷歌影像": Googlesatellite,
        "高德地图": Gaode,
        "高德影像": Gaodeimage
	};
	//定义专题图层
	var overlayMaps = {
		"Search_Polygons": Search_PolygonsGeoJSON ,
		"GDP_Polygon": GDP_Polygon_GeoJSON
	};
	//加载底图与专题图层控件
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	
/*
 * *********************************************************地图事件响应************************************************************************************
 */

/*
 * *********************************************************************点击地图弹出经纬度****************************************************************
 */
	//点击地图弹出经纬度
	var popup = L.popup();
	function onMapClick(e) {
	    popup
	        .setLatLng(e.latlng)
	        .setContent("You clicked the map at " + e.latlng.toString())
	        .openOn(map);
	}
	map.on('click', onMapClick);
	
/*
 * *********************************************************************地名解析与查询定位****************************************************************
 *///地名解析与查询定位控件
	map.addControl( new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		//搜索提示Tips
		textPlaceholder:'地名查询搜索...',  
		propertyLoc: ['lat','lon'],
		marker: L.circleMarker([0,0],{radius:30}),
		autoCollapse: true,
		autoType: false,
		minLength: 2
	}) );

/*
 * *********************************************************************空间要素查询与高亮显示****************************************************************
 */
	//定义搜索控件
	var searchControl = new L.Control.Search({
		//定义搜索查询的图层
		layer: Search_PolygonsGeoJSON,
		//定义搜索关键字
		propertyName: 'name',
		//搜索提示Tips
		textPlaceholder:'地图要素搜索...',  
		//是否标记
		marker: false,
		//缩放到图层函数定义
		moveToLocation: function(latlng, title, map) {
			//定义放大并弹出属性窗口
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
			//放大缩放到定义图层
  			map.setView(latlng, zoom); // access the zoom
		}
	});

	//搜索控件响应函数
	searchControl.on('search:locationfound', function(e) {
		//定义高亮样式
		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();
			//搜索回调函数
	}).on('search:collapsed', function(e) {
		//每个要素图层的样式响应函数
		featuresLayer.eachLayer(function(layer) {	//restore feature color
			//重新给要素图层设定样式
			featuresLayer.resetStyle(layer);
		});	
	});
	map.addControl( searchControl );  //inizialize search control
}
