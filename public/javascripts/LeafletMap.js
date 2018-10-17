var map;
//地图初始化
function init(){	
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.524585 ], 9);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	//openstreetmap底图
	var openstreetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'});
	// mapbox-street底图
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2owOTAyMHo1MDdyMDJxb3VzOTB2czZmNSJ9.5iZSlr7iLwBh9ebR6KMGeg'
	})
	//天地图
	var TDnormalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {//天地图常规地图
			maxZoom: 18,minZoom: 4
		}),
		TDnormala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {//天地图常规地图标注
			maxZoom: 18,minZoom: 4
		}),
		TDimgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {//天地图卫星影像
			maxZoom: 18,minZoom: 4
		}),
		TDimga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {//天地图卫星影像标注
			maxZoom: 18,minZoom: 4
		});
	//天地图、影像与标注图层组合
	var TDnormal = L.layerGroup([TDnormalm, TDnormala]),//地图与标注组合
		    TDimage = L.layerGroup([TDimgm, TDimga]); //影像与标注组合
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
	
	//地图服务地址
	var url='http://47.106.158.161:6060/geoserver/Hubei/wms'
	//构建专题地图服务连接串
	const bounderLayer  = L.tileLayer.wms(url, {
		layers: 'Hubei:JingzhouCountyBoundary',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});//.addTo(map);
	//定义底图
	var baseMaps = {
	    "OpenstreetMap": openstreetmap,
	    "MapboxStreets": mapboxstreet,
	    "天地图": TDnormal,
        "天地图影像": TDimage,
        "谷歌地图": GoogleMap,
        "谷歌影像": Googlesatellite,
        "高德地图": Gaode,
        "高德影像": Gaodeimage
	};
	//定义专题图层
	var overlayMaps = {
		"荆州县行政区边界": bounderLayer 
	};
	//加载底图与专题图层
	//L.control.layers(baseMaps, overlayMaps).addTo(map);
}
