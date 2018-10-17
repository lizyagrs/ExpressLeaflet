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
	
	
	//荆州行政区边界WFS服务的完整路径
	var url = "http://47.106.158.161:6060/geoserver/Hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Hubei%3AJingzhouCountyBoundary&maxFeatures=50&outputFormat=application%2Fjson"
	var JingZhou=loadWFS('Hubei:JingzhouCountyBoundary',url) ;
	
	//斧头湖三县边界WFS服务的完整路径
	var url = "http://47.106.158.161:6060/geoserver/Hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Hubei%3AThreeCountyBoundary&maxFeatures=50&outputFormat=application%2Fjson"
	var futouhu3county=loadWFS('Hubei:ThreeCountyBoundary',url) ;

	//斧头湖咸安境内规划打点位置WFS服务的完整路径
	var url = "http://47.106.158.161:6060/geoserver/Hubei/wms?"
	var FuTouLake_XianAnPoint= L.tileLayer.wms(url, {
		layers: 'Hubei:FuTouLake_XianAnPoint',
		format: "image/png",
		crs: L.CRS.EPSG4326,
		opacity: 0.5,
		transparent: true
	});//.addTo(map);

	//定义专题图层
	var overlayMaps = {
		"荆州县行政区边界": JingZhou,
		//"环斧头湖三县行政区边界": futouhu3county,
		//"斧头湖咸安境内早期规划打点位置": FuTouLake_XianAnPoint
	};
	//加载底图与专题图层
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	


	
}

//加载WFS的GeoJSON函数
function loadWFS(layerName,url) {
	var param = {
		service: 'WFS',
		version: '1.0.0',
		request: 'GetFeature',
		typeName: layerName,//图层名称
		outputFormat: 'application/json'
	};
	$.ajax({
		url : url,//WFS服务的完整路径
		dataType: 'json',
		success: loadWfsHandler,
	});
	var layer;
	function loadWfsHandler(data) {
		console.log(data);
		layer = L.geoJson(data, { 
			onEachFeature: function(feature, marker) {
	        		marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.pac);
			}
			//style: style,
			//onEachFeature: EachFeatureFunction
		}).addTo(map);
	}
}

// get color depending on pac value
	function getColor(d) {
 		return d > 421080 ? '#800026' :
			       d > 421070  ? '#BD0026' :
			       d > 421060  ? '#E31A1C' :
			       d > 421050  ? '#FC4E2A' :
			       d > 421040   ? '#FD8D3C' :
			       d > 421030   ? '#FEB24C' :
			       d > 421020   ? '#FED976' :
		                 					 '#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.pac)
		};
	}


function EachFeatureFunction(feature, layer){
	    if (feature.properties.name) {
	        layer.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.pac);
	        layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        //click: zoomToFeature
		    });
	    }
	}


	// HIGHLIGHT FEATURE = MOUSEOVER
	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        //click: zoomToFeature
	    });
	  }

	  // HIGHLIGHT FEATURE = MOUSEOVER
	  function highlightFeature(e) {
	      var layer = e.target;
	      layer.setStyle({
	          weight: 5,
	          color: '#888',
	          dashArray: '3',
	          fillOpacity: 0.5
	      });
	      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
	  };
	
	  // HIGHLIGHT FEATURE = MOUSE LEFT
	function resetHighlight(e) {
	      geojson.resetStyle(e.target);
	  };
	
	// ZOOM TO THE REGION
	  function zoomToFeature(e) {
	    map.fitBounds(e.target.getBounds());
	}