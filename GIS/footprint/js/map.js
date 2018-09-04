var map;
var mapBounds = new OpenLayers.Bounds( -120.223814941, 48.9163372542, -101.115304623, 58.6447052875);
var mapMinZoom = 0;
var mapMaxZoom = 14;
var markersArray = []; 
var point1,point2;
var aoi;

// avoid pink tiles
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
OpenLayers.Util.onImageLoadErrorColor = "transparent";
//("EPSG:900913"),
function initMap() {
   	//Load map
    map = new OpenLayers.Map('divMap', {
        projection: new OpenLayers.Projection("EPSG:900913"),
	    displayProjection: new OpenLayers.Projection("EPSG:4326"),
        layers: [
        	new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
            ),
            new OpenLayers.Layer.Google(
                "Google Streets", // the default
                {numZoomLevels: 20}
            ),
            new OpenLayers.Layer.Google(
                "Google Hybrid",
                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
            )
            
        ],
        zoom: 3,
        units: "m",
		maxResolution: 156543.0339,
		maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
		controls: [
        new OpenLayers.Control.PanZoomBar()
        ]
    });
     
     //load tms layer
     //LoadTMS('NDVI');
     //$("#inputDateGPP").val('07-20-2012');
     //LoadTMS('GPP');
     
     /*$("#mapLegend").attr("src","TileData/Legend/legend_GPP.png");
	 $("#mapLegend").css("visibility","visible");
	 $mapLegendWidth = 100; mapLegendHeight = 350;
	 $("#mapLegend").css("width",(mapLegendWidth).toString() + "px");
	 $("#mapLegend").css("height",(mapLegendHeight).toString() + "px");
	 $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
	 $("#mapLegend").css("visibility","visible");
     
     $("#inputDateFootprintLoad").val('07-20-2012');
     LoadTMS('Footprint'); */
     
     //var layer = map.getLayersByName("Footprint-07-20-2013")[0];
     //layer.setVisibility(false);
     
    //Add Edit Toolbar
    vlayer = new OpenLayers.Layer.Vector("Editable");
    
    map.addLayer(vlayer);
	var container = document.getElementById("divEditPanel");
	var panel = new OpenLayers.Control.EditingToolbar(
		vlayer, {div: container}
	);
	
	map.addControl(panel);
    
    //attach to events
	vlayer.events.on({
		"sketchcomplete": OpenLayers.Function.bind(report_1, this)
	});
	
	var switcherControl = new OpenLayers.Control.LayerSwitcher({div: divLayer });
	map.addControl(switcherControl);
	switcherControl.maximizeControl();
	
	map.zoomToExtent(mapBounds.transform(map.displayProjection, map.projection ));
    //map.addControl(new OpenLayers.Control.PanZoomBar());
    //map.addControl(new OpenLayers.Control.KeyboardDefaults());
    
    var mousePositionControl = new OpenLayers.Control.MousePosition({div: divAttr2 });
	map.addControl(mousePositionControl);
	
	$("#divAttribute2").css("visibility","visible");
	
	if($("#siteID").val() != "")
	{
	
		aoi = new OpenLayers.Layer.Vector("AOI", {
	 		projection: "EPSG:4326",
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                //url: "User_Data/" + $("#aoi").val().trim(),
                url: "User_Data/" + $("#aoi").val(),
                format: new OpenLayers.Format.GeoJSON()
            })
    	});           
    	map.addLayer(aoi);        
		aoi.events.register('loadend', aoi, function(evt){map.zoomToExtent(aoi.getDataExtent())});
		mapBounds = new OpenLayers.Bounds(111.93713937817878,57.0344909278445,-111.86588922957873,57.073415802705114);
	
		map.setLayerIndex(vlayer, map.layers.length - 1); 
		map.setLayerIndex(aoi, map.layers.length-2);		
	}
	else
	{
		map.zoomToExtent(mapBounds.transform(map.displayProjection, map.projection));
	}	
	bLoadMap = true; //map has been loaded	
	
}
//callback function
function report_1(event) {
    vlayer.removeAllFeatures({});
	if(markersArray.length!=0) markersArray = [];
	
	markersArray = event.feature.geometry.getVertices(); 
    if(markersArray.length ==1)
    {
    	point1 = event.feature.geometry;
    	point2 = point1.transform(map.getProjectionObject(), new OpenLayers.Projection("EPSG:900913"));
    	//point2 = point1.transform(new OpenLayers.Projection("EPSG:9001"),new OpenLayers.Projection("EPSG:9001"));
    	document.forms[0].elements[0].value = point2.x + "," + point2.y;
    	//alert(document.forms[0].elements[0].value);
    }
    else
    {
    	for (i=0;i<markersArray.length;i++)
    	{
			point1 = markersArray[i];
			//point2 = point1.transform(map.getProjectionObject(), new OpenLayers.Projection("EPSG:900913"));
			//point2 = point1.transform(new OpenLayers.Projection("EPSG:9001"),map.getProjectionObject());
			
			if(i==0) document.forms[0].elements[0].value = point1.x + "," + point1.y;
			else document.forms[0].elements[0].value = document.forms[0].elements[0].value + "," + point1.x + "," + point1.y;
		}
		
		//alert(document.forms[0].elements[0].value);
    }
}

//*************************************
//Clear edit toolbar coordinates pair
//*************************************
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    //markersArray[i].setMap(null);
  }
  //markersArray.length = 0;
  markersArray = [];
}
//Load Imagery TMS service
function LoadTMS(_kind)
{
   if(_kind == "NDVI"){
		if($("#inputDateNDVI").val().trim() == ""){	
			alert("Please designate available NDVI imagery date.");
			return;
		}
		tmsFolder = _kind + "-" + $("#inputDateNDVI").val().trim();
		if(checkLayerExist(tmsFolder) == true){
			alert("The layer can not be loaded as it has existed.");
			return;
		}
		
		$("#running").css("visibility","visible");
		
   	}
   	else if(_kind == "Footprint"){
		if($("#inputDateFootprintLoad").val().trim() == ""){	
			alert("Please designate available classification imagery date.");
			return;
		}
		
		tmsFolder = _kind + "-" + $("#inputDateFootprintLoad").val().trim();
		if(checkLayerExist(tmsFolder) == true){
			alert("The layer can not be loaded as it has existed.");
			return;
		}
		$("#running").css("visibility","visible");
		
   	}
    else{ 
        if($("#inputDateGPP").val().trim() == ""){	
			alert("Please designate available GPP imagery date.");
			return;
		}
		tmsFolder = _kind + "-" + $("#inputDateGPP").val().trim();
		if(checkLayerExist(tmsFolder) == true){
			alert("The layer can not be loaded as it has existed.");
			return;
		}
		$("#running").css("visibility", "visible");
	}
    //mapBounds = aoi.getDataExtent().transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    var  tmsOverlay = new OpenLayers.Layer.TMS(tmsFolder, "http://www.footprintmonitoring.com/footprint/TileData/"+tmsFolder+"/",
		{   
			type: 'png', getURL: overlay_getTileURL, alpha: true, 
			isBaseLayer: false
		});
	
	//if (OpenLayers.Util.alphaHack() == false) { tmsOverlay.setOpacity(0.7); }
	map.addLayer(tmsOverlay);
	var layer = map.getLayersByName("AOI")[0];   
	map.setLayerIndex(layer, map.layers.length); 
	
	$("#running").css("visibility","hidden");
	
}

function overlay_getTileURL(bounds) {
    
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   //return this.url + z + "/" + x + "/" + y + "." + this.type;
	  return this.url + z + "/" + x + "/" + y + "." + this.type;
	  
	} else {
	   return "http://www.maptiler.org/img/none.png";
	}
}		

var _link;
//Download image WCS service
function DownLoadWCS(_kind)
{
	if(document.forms[0].elements[0].value == "")
	{	alert("Please designate study area firstly.");
		return;
	}
	
	var XY = document.forms[0].elements[0].value;
    var _array = XY.trim().split(",");
	if(_array.length == 2){
	
		alert("Your area of interest should not be point, please select polyline or polygon");
		return;
	}
	
	if(_kind == "NDVI"){
		if($("#inputDateNDVIDownload").val().trim() == ""){	
			alert("Please designate available NDVI imagery date to download.");
			return;
		}
		
		$("#running").css("visibility","visible");
		 
		 var url = "python/queryPoint2.py";
		_link = _kind + "-" + $("#inputDateNDVIDownload").val().trim();
		
		$.get(url,{"_name":_link, "_kind":"NDVI","XY":XY},processResult);
		OpenAttr(); 
   	}
   	else if(_kind == "Footprint"){
   		if($("#inputDateFootprintDownload").val().trim() == ""){	
			alert("Please designate available classification imagery date to download.");
			return;
		}
		$("#running").css("visibility","visible");
		var url = "python/queryPoint2.py";
		_link = _kind + "-" + $("#inputDateFootprintDownload").val().trim();
		$.get(url,{"_name":_link, "_kind":"Footprint","XY":XY},processResult);
		OpenAttr(); 
   	}
    else{ 
      if($("#inputDateGPPDownload").val().trim() == ""){	
			alert("Please designate available GPP imagery date.");
			return;
		}
		$("#running").css("visibility","visible");
		var url = "python/queryPoint2.py";
		_link = _kind + "-" + $("#inputDateGPPDownload").val().trim();
		$.get(url,{"_name":_link, "_kind":"GPP","XY":XY},processResult);
		OpenAttr(); 
		
      }

}
//Exexute footprint execution
var _strDate;
function ExexuteFootprint(_footprintType)
{
   
	if(document.forms[0].elements[0].value == "")
	{	alert("Please designate study area firstly.");
		return;
	}
	
	var XY = document.forms[0].elements[0].value;
    var _array = XY.trim().split(",");
	if(_array.length == 2){
	
		alert("Your area of interest should not be point, please select polyline or polygon");
		return;
	}
	
	if($("#inputDateFootprintStart").val().trim() == ""){	
		alert("Please designate available classification imagery date.");
		return;
	}
	
	if($("#inputDateFootprintEnd").val().trim() != ""){	
	   
	   if($("#inputDateFootprintStart").datepicker( "getDate") > $("#inputDateFootprintEnd").datepicker( "getDate")){	
			alert("The start date must be lower than the end date,please select again.");
			return;
		}
	
	}
	$("#running").css("visibility","visible");
	
	var _footprintType = $('select[id="sltFootprint"]').val()
			if(_footprintType == "Footprint Indicators"){
			  alert("Please select footprint indicator.");
			  return;
	}
	
	var _str = "";
	
	/*var url = "";
	if(_user == 2) 
		url = "python/executeFootprint_"+_footprintType+".py";
	else if (_user == 3)*/
	
	var url = "python/executeFootprint_"+_footprintType+"Rapid.py";
	
	//alert(url);
	
	if($("#inputDateFootprintEnd").val().trim() == ""){	
		_str = $("#inputDateFootprintStart").val().trim();
		//_str = "07-20-2013,";
		$.get(url,{"XY":XY,"strDates":_str},processResult);
	}
	else{
	
		//combine dates string between start date and end date
		for( var i =0; i< availableDates.length; i++){
				_year =  parseInt(availableDates[i].split("-")[2]);
				_month = parseInt(availableDates[i].split("-")[0]);
				_day =  parseInt(availableDates[i].split("-")[1]);
				_date = new Date(_year, _month-1, _day, 0, 0, 0, 0);
			
				if(_date >= $("#inputDateFootprintStart").datepicker( "getDate") && _date <= $("#inputDateFootprintEnd").datepicker( "getDate"))
					_str = _str + availableDates[i] + ",";
				if( _date > $("#inputDateFootprintEnd").datepicker( "getDate"))	
					break;
			
		}
		$.get(url,{"XY":XY,"strDates":_str}, processResult);
	}
	
	OpenAttr(); 
}

//set Maplegend
function setMapLegend()
{
	var mLayers = map.layers;
	for(var a = mLayers.length -1; a >=0; a--){
		var res = mLayers[a].name.substring(0, 3);
		var layer = map.getLayersByName(mLayers[a].name)[0];
		var bVisi = layer.getVisibility();
		
		if(res == "GPP" && bVisi == true){ 
			$("#mapLegend").attr("src","TileData/Legend/legend_GPP.png");
            mapLegendWidth = 100; mapLegendHeight = 350;
			$("#mapLegend").css("width",(mapLegendWidth).toString() + "px");
            $("#mapLegend").css("height",(mapLegendHeight).toString() + "px");
            $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
            $("#mapLegend").css("visibility","visible");
            
            break;
		}
		else if(res == "NDV" && bVisi == true) {
			$("#mapLegend").attr("src","TileData/Legend/legend_NDVI.png");
            mapLegendWidth = 100; mapLegendHeight = 350;
			$("#mapLegend").css("width",(mapLegendWidth).toString() + "px");
            $("#mapLegend").css("height",(mapLegendHeight).toString() + "px");
            $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
            $("#mapLegend").css("visibility","visible");
            
            break;
		}
		else if (res == "Foo" && bVisi == true){
			$("#mapLegend").attr("src","TileData/Legend/legend_Footprint.png");
            mapLegendWidth = 150; mapLegendHeight = 147;
			$("#mapLegend").css("width",(mapLegendWidth).toString() + "px");
            $("#mapLegend").css("height",(mapLegendHeight).toString() + "px");
            $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
            $("#mapLegend").css("visibility","visible");
            
            break;
		}
	};
}

// Check whether the layer has been in the layer control list
function checkLayerExist(layername)
{
		var mLayers = map.layers; //openlayers
        for(var a = 0; a < mLayers.length; a++ ){
			
			var res = mLayers[a].name;
			if(res == layername) {
				return true;
			}
		}
		return false;
}

//Execute Load NDVI
$("#btnLoadNDVI").click(function(){
			
			LoadTMS('NDVI');
			//map.setLayerIndex(aoi, map.layers.length-2); 
			map.setLayerIndex(vlayer, map.layers.length-1); 
			setMapLegend();
});

//Execute download NDVI
$("#btnOKDownLoadNDVI").click(function(){
			
			DownLoadWCS('NDVI');
			
	  });
	  
	  
//Execute load NPP
$("#btnOKNPPLoad").click(function(){
			
			LoadTMS('GPP');
			map.setLayerIndex(vlayer, map.layers.length-1);
			setMapLegend();
			
	  });

//Execute download NPP
$("#btnOKNPPDownLoad").click(function(){
			
			DownLoadWCS('GPP');
			
	  });
	  
//Execute footprint
$("#btnFootprint").click(function(){
		  ExexuteFootprint();
	  });
	  
//footprint load
$("#btnOKFootprintLoad").click(function(){
			
			LoadTMS('Footprint');
			map.setLayerIndex(vlayer, map.layers.length-1); 
			setMapLegend();
			
	  });

//footprint download
$("#btnOKFootprintDownLoad").click(function(){
			DownLoadWCS('Footprint');
	});	  

//Switch attribute window
$("#imgLeft").click(function(){
			OpenAttr();
	  });
$("#imgRight").click(function(){
			CloseAttr();
	  });

function clickMap()
{ 
 	$("#hrefLogin").text("Logout");
 	$("#loginUser").css("visibility","visible");
 	
 	_user = $("#userID").val().trim();
 	
 	$("#hrefLogin").html("Logout <font color='red'>" + $("#userName").val().trim() + "</font>");
    
 	$("#sitemapContent").css("visibility","visible");
    $("#sitemapContent").html("<a href='index.php'>&nbsp&nbsp&nbsp&nbspHome</a> / Maps");
     	
    openRelatedMap();
    if(_load){
		$("#running").css("visibility","visible");
		initMap();
		_load = false;
		$("#running").css("visibility","hidden");
	}
	
	//var res = $("#boundary").val().trim().split(","); 
	//mapBounds = new OpenLayers.Bounds(111.93713937817878,57.0344909278445,-111.86588922957873,57.073415802705114);
	mapBounds = new OpenLayers.Bounds(-111.9666638, 56.9668527, -111.6466333, 57.1400944);
	//mapBounds = new OpenLayers.Bounds(parseFloat(res[0].trim()), parseFloat(res[1].trim()), parseFloat(res[2].trim()), parseFloat(res[3].trim()));
	//mapMaxZoom = parseInt($("#zoomMax").val().trim()); 
	map.zoomToExtent(mapBounds.transform(map.displayProjection, map.projection));	

    if($("#ndviDate").val().trim() != ""){
   
		$("#inputDateNDVI").val($("#ndviDate").val().trim());
		LoadTMS('NDVI');
		map.setLayerIndex(vlayer, map.layers.length-1); 
		setMapLegend();
	}
}

//Call back function to add geojson layer
function addAOI(data, textStatus)
{  	
   if(data == "") return;    
    //Added geojson_layer and zoom to its extent on May 5, 2017 by Michael start    
    //alert(data);
    //var layer = map.getLayersByName("AOI");	
	//if(layer !== null && layer !== undefined) map.removeLayer(layer);
	
	var aoi = new OpenLayers.Layer.Vector("AOI", {
	 		projection: "EPSG:4326",
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                //url: "User_Data/" + $("#aoi").val().trim(),
                url: "User_Data/" + data ,
                format: new OpenLayers.Format.GeoJSON()
            })
    }); 
        
    map.addLayer(aoi);        
	aoi.events.register('loadend', aoi, function(evt)
	{
		map.zoomToExtent(aoi.getDataExtent());
	 	//mapBounds = aoi.getDataExtent().transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
	 	//alert(mapBounds);   
	});
	
	$('.dimmer').removeClass('active');
	$('#preview').addClass('disabled');
	$('#epsg').val('');
	$('#encoding').val('');
	$('#info').addClass('picInfo');
	$('#option').slideUp(500); 
	
	map.setLayerIndex(vlayer, map.layers.length - 1); 
	//map.setLayerIndex(aoi, map.layers.length - 2); 
	//Added geojson_layer and zoom to its extent end
}

//Load Shp to Zip File  4326
function loadShpZip() {
			var epsg = ($('#epsg').val() == '') ? 4326 : $('#epsg').val(),
			encoding = ($('#encoding').val() == '') ? 'UTF-8' : $('#encoding').val();
			if(file.name.split('.')[1] == 'zip') {
				if(file) $('.dimmer').addClass('active');
				loadshp({
					url: file,
					encoding: encoding,
					EPSG: epsg
				}, function(data) {
					var URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
					url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type: "application/json"}));
					//alert(JSON.stringify(data));
					$('.shp-modal').toggleClass('effect');				
					
					if(_user == ""){alert("Please designate current user.");return; }
					$.get("php/saveGeoJson.php",{"geojson":JSON.stringify(data), "_user": _user}, addAOI);
					//$.get("php/saveGeoJson.php",{"geojson":JSON.stringify(data)}, addAOI);					
					
				});
			} else {
				$('.modal').modal('show');
			}
		}
$("#file").change(function(evt) {
	file = evt.target.files[0];
		if(file.size > 0) {
			$('#dataInfo').text(' ').append(file.name+' , '+file.size+' kb');
			//$('#option').slideDown(500);
			$('#preview').removeClass('disabled');
		}
});
		
$('#downloadfile').click(function() {
	window.location.href = 'User_Data/test.json';
});
		
$('#preview').click(function() {
	loadShpZip();
});

$('#cancel').click(function() {
	$('.shp-modal').toggleClass('effect');
	$('.overlay').toggleClass('effect');
	$('#wrap').toggleClass('blur');
});