var map;
//地图初始化
function init(){
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.924585 ], 6);
	//openstreetmap底图
	var openstreetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	// mapbox-street底图
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2owOTAyMHo1MDdyMDJxb3VzOTB2czZmNSJ9.5iZSlr7iLwBh9ebR6KMGeg'
	});
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
	
	
	//WFS服务GeoJSON的完整路径
	var url = "http://47.106.158.161:6060/geoserver/Hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Hubei%3AYangziRiver_MiddlePro&maxFeatures=50&outputFormat=application%2Fjson"
	//创建一个空的GeoJSON图层并将其分配给变量，以便以后可以添加更多功能
	var YangziRiver_MiddlePro_GeoJSON = L.geoJson(null, { 
		onEachFeature: function(feature, marker) {
				marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.code);
		}
		
	}).addTo(map);
	//ajax调用
	$.ajax({
		url: url, //WFS服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			YangziRiver_MiddlePro_GeoJSON.addData(data);
		},
	});

	//定义专题图层
	var overlayMaps = {
		"长江中游四省边界": YangziRiver_MiddlePro_GeoJSON
	};
	//加载底图与专题图层
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	
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