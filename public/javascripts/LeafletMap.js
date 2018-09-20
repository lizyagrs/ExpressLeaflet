var LeafletMap;
function init(){
	LeafletMap = L.map("map").setView([30.56486,114.353622 ], 10);  
	L.esri.basemapLayer("Topographic").addTo(LeafletMap);
}
