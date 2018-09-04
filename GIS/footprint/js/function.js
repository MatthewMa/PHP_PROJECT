var availableDates;
var _minYear,_minMonth,_minDay;
var _maxYear,_maxMonth,_maxDay;
var _year,_month,_day,_date,_strDate;
var _type,_value;

var dd = [];  //Trend Analysis Value 

var bLoadMap = false; //Whether the map has been loaded.

//curved line paramters
var defaultParameters = {
		apply: true,
	    legacyOverride : {fit: true},
}

var dayOfWeek = ["Sun=Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

var options = {
    series: {
        //shadowSize: 5,
        curvedLines: { active: true }
    },
    xaxes: [{
    mode: "time",       
    tickFormatter: function (val, axis) {           
        return dayOfWeek[new Date(val).getDay()];
    },
    color: "black",
    position: "top",       
    axisLabel: "Weekday",
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial',
    axisLabelPadding: 5
},
{
    mode: "time",
    timeformat: "%m/%d",
    tickSize: [7, "day"],
    color: "black",       
    axisLabel: "Date",
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial',
    axisLabelPadding: 10
}],
    yaxis: {        
        color: "black",
        tickDecimals: 2,
        axisLabel: "Gold Price  in USD/oz",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 5
    },
    legend: {
        noColumns: 0,
        labelFormatter: function (label, series) {
            return "<font color=\"white\">" + label + "</font>";
        },
        backgroundColor: "#000",
        backgroundOpacity: 0.9,
        labelBoxBorderColor: "#000000",
        position: "nw"
    }
    ,
    grid: {
        hoverable: true,
        borderWidth: 3,
        mouseActiveRadius: 50,
        backgroundColor: { colors: ["#ffffff", "#EDF5FF"] },
        axisMargin: 20
    },
    
};

/*$(document).ready(function () {
    //$.plot($("#placeholder2"), dataset, options);
    $.plot($("#placeholder2"), dd, options);
    $("#placeholder2").UseTooltip();
});*/

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}

var previousPoint = null, previousLabel = null;
//var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();
                
                var x = item.datapoint[0];
                var y = item.datapoint[1];
                var date = new Date(x);
                var color = item.series.color;

                showTooltip(item.pageX, item.pageY, color,
                            "<strong>" + item.series.label + "</strong><br>"  +
                            (date.getMonth() + 1) + "/" + date.getDate() +
                            " : <strong>" + toFixed(y,3) + "</strong>");
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 120,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}

function toFixed(value, precision) { //Keep 3 decimal digits
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

function OpenDiagramFrag(type){
    //set diagram style
    
    if($("#divDiagram").css("visibility") == "hidden")
    {
		$("#divDiagram").css("visibility","visible");
		$("#btnDiagram").prop('value', 'Hide Diagram');
	    
	    var d1 = [];
	    var xmlDoc=loadXMLDoc('python/tmp/results.xml');
		var x=xmlDoc.getElementsByTagName("row");
	
		for (i=0;i<x.length;i++)
		{ 
			 _strDate = x[i].getAttribute("date");
			 _value = x[i].getAttribute(type);
			 
			 _year =  parseInt(_strDate.split("-")[2]);
   			 _month = parseInt(_strDate.split("-")[0]);
    		 _day =  parseInt(_strDate.split("-")[1]);
	   
			 d1.push([new Date(_year,_month,_day,0,0,0,0).getTime(), parseFloat(_value)]);
			 //d1.push([gd(_year,_month,_day), parseFloat(_value)]);
		}
		$.plot("#divDiagram", [d1], {xaxis: {mode: "time"}});
	}
    else
    {
    	$("#divDiagram").css("visibility","hidden");
    	$("#btnDiagram").prop('value', 'Show Diagram');
    }
}
	
var startYear = 0;	
var basicYear = 0;
var data = [];
var numYear  = 0;


//set diagram style
function OpenDiagram(type){
    
    dd = [];
    data = [];
    numYear = 0;
    
    if($("#divDiagram").css("visibility") == "hidden")
    {
		$("#divDiagram").css("visibility","visible");
		$("#btnDiagram").prop('value', 'Hide Diagram');
	    
	    
	    var xmlDoc = loadXMLDoc('python/tmp/results.xml');
	    
	    var x = xmlDoc.getElementsByTagName("row");
	    
	    for (i=0;i<x.length;i++)
		{ 
			 _strDate = x[i].getAttribute("date");
			 _value = x[i].getAttribute(type);
			 
			 _year =  parseInt(_strDate.split("-")[2]);
   			 _month = parseInt(_strDate.split("-")[0]);
    		 _day =  parseInt(_strDate.split("-")[1]);
    		
    		 
    		 if( i == 0 ){
    		 	
    		 	startYear = _year;
    		 	basicYear = _year;
    		 	
    		 	data.push([gd(basicYear, _month, _day),parseFloat(_value)]); 
    		 	
    		 }
    		 else{
    		 
    		 	if( startYear == _year){
    		 	
    		 		data.push([gd(basicYear, _month, _day),parseFloat(_value)]); 
    		 	}
    		 	else{
    		 	
    		 	    numYear = numYear + 1;
    		 	
    		 		var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
      				bg_colour = "#" + ("000000" + bg_colour).slice(-6);
    		 	    if (data.length > 2){
    		 	    	var a1 = {};
			 			a1.label = _type + startYear.toString();
			 			a1.data = data;
			 			a1.xaxis = 2;
			 			
			 			
			 			a1.color= bg_colour;
             			a1.points = { fillColor: bg_colour, show: false };
             			a1.lines = { show: true };
             			a1.stack = false;
             			a1.curvedLines = defaultParameters;
             			dd.push(a1);
             		}
             		
             		data = [];
    		 	    startYear = _year;
    		 	    data.push([gd(basicYear, _month, _day),parseFloat(_value)]); 
    		 	}
    		}
    	  }
    	  
    	 var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
      	 bg_colour = "#" + ("000000" + bg_colour).slice(-6);
    	
    	 if (data.length > 2){
    	 
    	 	var a1 = {};
		 	a1.label = _type + _year.toString();
		 	a1.data = data;
		 	a1.xaxis = 2;
		 	
		 	a1.color= bg_colour;
         	a1.points = { fillColor: bg_colour, show: false };
         	a1.lines = { show: true };
         	a1.stack = false;
         	a1.curvedLines = defaultParameters;
         	dd.push(a1);
    	 }
    	 
    	//d1.push([new Date(_year,_month,_day,0,0,0,0).getTime(), parseFloat(_value)]);
		//$.plot("#divDiagram", [d1], {xaxis: {mode: "time"}}); 
		
		if( x.length > 0){
			$.plot($("#divDiagram"), dd, options);
    		$("#divDiagram").UseTooltip();
    	}
    }
    else
    {
    	$("#divDiagram").css("visibility","hidden");
    	$("#btnDiagram").prop('value', 'Show Diagram');
    }
}

$(document).ready(function(){ $("#btnGreenAnalysis").click(function(){
	
			  getAJAX('NDVI');
			  });
		   }); 
		   
$(document).ready(function(){ $("#btnNPPAnalysis").click(function(){
			getAJAX('GPP');
	  });
});

$(document).ready(function(){
    $('#txtPassword').keypress(function(e){
      if(e.keyCode==13)
      $('#loginOK').click();
    });
}); 		   

//Execute analyze GPP
function getAJAX(_kind){

   if(document.forms[0].elements[0].value == "")
	{	alert("Please designate study area firstly.");
		return;
	}
	$("#running").css("visibility","visible");
	var url;
	//if XY only has one point.
	var XY = document.forms[0].elements[0].value;
	
	var _array = XY.trim().split(",");
	//alert(_user);
	
	if(_array.length == 2)
	{  
	 //if(_user == "3")
		 url = "python/queryRasterPoint.py";
	   //else 
	   	//url = "python/queryRasterPointNonRapid.py";
	}
	else
	{    //if(_user == "3")
			url = "python/queryRaster.py";
		//else
		  //  url = "python/queryRasterNonRapid.py";	
		    
	}
	
	if(_kind == "NDVI"){
		
		//Check dates
		if($("#inputDateNDVIAnalyzeStart").val().trim() == ""){	
			alert("Please designate available NDVI imagery start date.");
			return;
		}
		
		if($("#inputDateNDVIAnalyzeEnd").val().trim() == ""){	
			alert("Please designate available NDVI imagery end date.");
			return;
		}
		
		var _ndviStart = $("#inputDateNDVIAnalyzeStart").val().trim();
		var _ndviEnd = $("#inputDateNDVIAnalyzeEnd").val().trim();
		
		//alert($("#inputDateNDVIAnalyzeStart").datepicker( "getDate" ));
		
		if($("#inputDateNDVIAnalyzeStart").datepicker( "getDate") > $("#inputDateNDVIAnalyzeEnd").datepicker( "getDate")){	
			alert("The start date must be lower than the end date,please select again.");
			return;
		}
		var _str = "";
		//combine dates string between start date and end date
		for( var i =0; i< availableDates.length; i++){
				_year =  parseInt(availableDates[i].split("-")[2]);
   				_month = parseInt(availableDates[i].split("-")[0]);
    			_day =  parseInt(availableDates[i].split("-")[1]);
    			_date = new Date(_year, _month-1, _day, 0, 0, 0, 0);
    			
    			if(_date >= $("#inputDateNDVIAnalyzeStart").datepicker( "getDate") && _date <= $("#inputDateNDVIAnalyzeEnd").datepicker( "getDate"))
    				_str = _str + availableDates[i] + ",";
    			if( _date > $("#inputDateNDVIAnalyzeSEnd").datepicker( "getDate"))	
    				break;
    			
    	}
    	$.get(url,{"kind":_kind, "XY":XY,"strDates":_str}, processResult);

    }	
    else{ //GPP
    	//Check dates
		if($("#inputDateGPPAnalyzeStart").val().trim() == ""){	
			alert("Please designate available GPP imagery start date.");
			return;
		}
		
		if($("#inputDateGPPAnalyzeEnd").val().trim() == ""){	
			alert("Please designate available GPP imagery end date.");
			return;
		}
		
		var _ndviStart = $("#inputDateGPPAnalyzeStart").val().trim();
		var _ndviEnd = $("#inputDateGPPAnalyzeEnd").val().trim();
		
		//alert($("#inputDateNDVIAnalyzeStart").datepicker( "getDate" ));
		
		if($("#inputDateGPPAnalyzeStart").datepicker( "getDate") > $("#inputDateGPPAnalyzeEnd").datepicker( "getDate")){	
			alert("The start date must be lower than the end date,please select again.");
			return;
		}
		var _str = "";
		//combine dates string between start date and end date
		for( var i =0; i< availableDates.length; i++){
				_year =  parseInt(availableDates[i].split("-")[2]);
   				_month = parseInt(availableDates[i].split("-")[0]);
    			_day =  parseInt(availableDates[i].split("-")[1]);
    			_date = new Date(_year, _month-1, _day, 0, 0, 0, 0);
    			
    			if(_date >= $("#inputDateGPPAnalyzeStart").datepicker( "getDate") && _date <= $("#inputDateGPPAnalyzeEnd").datepicker( "getDate"))
    				_str = _str + availableDates[i] + ",";
    			if( _date > $("#inputDateGPPAnalyzeEnd").datepicker( "getDate"))	
    				break;
    			
    	}
    	
    	$.get(url,{"kind":_kind, "XY":XY,"strDates":_str}, processResult);
    
    
    }
    OpenAttr(); 	
	
}
//get the attribute results
function processResult(data,textStatus){
	$("#divAttribute").html(data);
	$("#running").css("visibility","hidden");
}

function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest){ xhttp=new XMLHttpRequest();}
    else { xhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;

}

//###animation###
var currimg = 0;
var status = false; 
var images = Array("../TileData/Footprint/FA/FA-07-16-2003.png",
					   "../TileData/Footprint/FA/FA-07-25-2007.png",
					   "../TileData/Footprint/FA/FA-07-22-2011.png",
					   "../TileData/Footprint/FA/FA-07-20-2013"
					   );
var dates = Array("07-16-2003","07-25-2007","07-22-2011","07-20-2013");	

function ControlAnimation() //Open or close the animation window
{  
    if($("#divAnimationWindow").css("visibility") == "hidden")
    {
		$("#divAnimationWindow").css("visibility","visible");
		$("#btnAnimation").prop("value", "Close Animation");
		$("#divAttribute2").css("visibility","hidden");
		
		var newimage = images[currimg];
        $('#divAnimation').css("background-image", "url("+newimage+")"); 
        $('#lblAnimation').text(dates[currimg]);
        
        loadimg();
	}
    else
    {
    	$("#divAnimationWindow").css("visibility","hidden");
    	$("#btnAnimation").prop('value', 'Show Animation');
    	$("#divAttribute2").css("visibility","visible");
    	
    }
}

function loadimg(){
	 
	 $('#divAnimation').animate({ opacity: 1}, 1500,function(){
			
				if(status == true){
					currimg++;
					if(currimg > images.length-1){
						currimg=0;
					}
					var newimage = images[currimg];
					$('#divAnimation').css("background-image", "url("+newimage+")");
					$('#lblAnimation').text(dates[currimg]); 
					loadimg();
				}
		 });
	 
}

function StartStopAnimation()
{
  if($("#btnAnimationControl").val() == "Start"){
  	status = true;
  	loadimg();
  
  	$("#btnAnimationControl").prop('value', 'Stop');
  }
  else{
    status = false;
  	$("#btnAnimationControl").prop('value', 'Start');
  
  }

}
//Animation

function SaveAs(){
	alert("Save query results as csv file or PDF file.");
}
function SelectAOI(){
	
	var XY = document.forms[0].elements[0].value.trim();
	if(XY == "")
	{	alert("Please designate study area firstly.");
		return;
	}
	
	var _array = XY.trim().split(",");
	if(_array.length == 2){
	
		alert("Your area of interest should not be point, please select polyline or polygon");
		return;
	}
	alert("Save User's study area.");
}

function OpenAttr(){
 $("#imgRight").css("visibility","visible");
 $("#imgLeft").css("visibility","hidden");
 
 $("#divMap").css("width",(wWidth - margin * 3 - LeftWidth - borderWidth * 4 - attrWinWidth-arrowWidth-borderWidth*2).toString() + "px");
 $("#divMenu").css("width",(wWidth - margin * 3 - LeftWidth - borderWidth * 4 - attrWinWidth-arrowWidth-borderWidth*2).toString() + "px");
 $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth - attrWinWidth-arrowWidth-borderWidth*2).toString() + "px");
 
 $("#running").css("left",((wWidth-runningWidth - LeftWidth - margin * 3 - borderWidth * 4 - attrWinWidth-arrowWidth-borderWidth*2 )/2 + LeftWidth + margin * 2 + borderWidth * 3).toString() + "px");
 $("#divAttribute").css("visibility","visible");
 map.updateSize();
 
 
}

function CloseAttr(){

 $("#imgRight").css("visibility","hidden");
 $("#imgLeft").css("visibility","visible");
 $("#divDiagram").css("visibility","hidden");
 
 $("#divMap").css("width",(wWidth - margin * 3 - LeftWidth - borderWidth * 4).toString() + "px");
 $("#divMenu").css("width",(wWidth - margin * 3 - LeftWidth - borderWidth * 4).toString() + "px");
 $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
 $("#running").css("left",((wWidth-runningWidth - LeftWidth - margin * 3 - borderWidth * 4)/2 + LeftWidth + margin * 2 + borderWidth * 3).toString() + "px");
 $("#divAttribute").css("visibility","hidden");
 map.updateSize();
 
}

function LoadDate(data,textStatus)
{   
    //alert(data);
    if(data == "")return;  
    
    var str = "Available images in the database:\n"
    availableDates = []
    var fields = data.split(",");
    for ( var i =0; i< fields.length - 1; i++)
       {
       		availableDates.push(fields[i].trim());
       		str = str + fields[i].trim() + "\n";
       }       
    $("#dateGreenessLoad").text(str);     
    $("#dateGreenessAnalysis").text(str); 
    $("#dateGreenessDownLoad").text(str); 
    $("#dateNPPLoad").text(str);     
    $("#dateNPPAnalysis").text(str); 
    $("#dateNPPDownLoad").text(str); 
    
    //get _minYear,_minMonth,_minDay, _maxYear,_maxMonth,_maxDay
    _minYear =  availableDates[0].split("-")[2];
    _minMonth =  availableDates[0].split("-")[0];
    _minDay =  availableDates[0].split("-")[1];
      
    _maxYear =  availableDates[fields.length - 2].split("-")[2]; 
    _maxMonth =  availableDates[fields.length - 2].split("-")[0];
    _maxDay =  availableDates[fields.length - 2].split("-")[1];
    if(_type == "NDVI"){
   	$("#inputDateNDVI").datepicker({ //load ndvi
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
		
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
	  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		//inputDateNDVIAnalyzeStart
		
		$("#inputDateNDVIAnalyzeStart").datepicker({ //analyze ndvi start
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
		
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
	  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy;
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		$("#inputDateNDVIAnalyzeEnd").datepicker({ //analyze ndvi end
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
		
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
	  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy;
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		$("#inputDateNDVIDownload").datepicker({ //download ndvi
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
		
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
	  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy;
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		
    }
    else if(_type == "GPP"){
    
		$("#inputDateGPP").datepicker({ //GPP load  
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
   
   
   	//inputDateGPPAnalyzeStart
   	
   	$("#inputDateGPPAnalyzeStart").datepicker({ //GPP Analyze start
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		$("#inputDateGPPAnalyzeEnd").datepicker({ //GPP Download
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
    
    $("#inputDateGPPDownload").datepicker({ //GPP Download
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
    }
    else{ //Footprint
    
    	$("#inputDateFootprintLoad").datepicker({ //Footprint load
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		$("#inputDateFootprintStart").datepicker({ //Footprint analyze  start
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
   
     $("#inputDateFootprintEnd").datepicker({ //Footprint analyze end
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
		$("#inputDateFootprintDownload").datepicker({ //Footprint download
			dateFormat: 'mm-dd-yy',
			showButtonPanel: false,
			changeMonth: true,
			changeYear: true,
	
			minDate: new Date(parseInt(_minYear), parseInt(_minMonth) - 1, parseInt(_minDay)),
			maxDate: new Date(parseInt(_maxYear), parseInt(_maxMonth) - 1, parseInt(_maxDay)),
  
			beforeShowDay: function(d) {
				var dmy = (d.getMonth()+1); 
				if(d.getMonth()<9) 
					dmy="0"+dmy; 
				dmy+= "-"; 

				if(d.getDate()<10) dmy+="0"; 
					dmy+=d.getDate() + "-" + d.getFullYear(); 

				if ($.inArray(dmy, availableDates) != -1) {
					return [true, "","Available"]; 
				} else{
					 return [false,"","unAvailable"]; 
				}
			}
		});
		
	}
}

function SendPHP(_kind)  //Load date from database
{
    var url = "php/loadDate.php";
    _type = _kind;
    //_user = $("#userID").val().trim();
    //alert(_user);
    //if(_user == ""){alert("Please designate current user.");return; }
    $.get(url,{"_kind":_kind,"_user":_user},LoadDate);
}

var _load = true;

function clickLogin(){

  divEditbar.style.visibility="hidden";
  
  $("#divIntroduction").css("visibility","hidden");
  $("#divMap").css("visibility","hidden"); 
  $("#divContact").css("visibility","hidden"); 
  $("#divAttribute2").css("visibility","hidden"); 
  $("#mapLegend").css("visibility","hidden");
  $("#imgLeft").css("visibility","hidden");
  
  $("#divFunctions").css("visibility","hidden");
  closeAllRelatedMap();
  
  $("#dashboard").hide();
  $("#divSiteMap").css("visibility","visible");
 
  $("#sitemapContent").css("visibility","visible");
  $("#sitemapContent").html("<a href='#' onclick = 'clickHome(); return false;'>&nbsp&nbsp&nbsp&nbspHome</a> / Login");
  
  $("#divLogin").css("visibility","visible");
  $("#divDemo").css("visibility","hidden");
  
  if($("#hrefLogin").text().trim() == "Logout"){
  
     $("#hrefLogin").text("Login")
     $("#loginUser").css("visibility","hidden");
  }
  
   if(TopHeight+ margin + dbHeight + loginHeight + bottomHeight >= wHeight){
    	$("#divBottom").css("top",(TopHeight+ margin + dbHeight + loginHeight).toString() + "px"); 
    	$("#divWhole").css("height", (TopHeight+ margin + dbHeight + loginHeight + bottomHeight+margin).toString() + "px");
    }
    else{
    	$("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    	$("#divWhole").css("height", wHeight.toString() + "px");
    }
    
     if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	  else ScrollWidth = 0;
 }

function closeAllRelatedMap(){
 
  $("#Layer").css("visibility","hidden");
  $("#divLayerControl").css("visibility","hidden");
  
  $("#Greeness").css("visibility","hidden");
  $("#GreenessLoad").css("visibility","hidden");
  $("#GreenessAnalyze").css("visibility","hidden");
  $("#GreenessDownload").css("visibility","hidden"); 
  $("#GreenessMyStudyArea").css("visibility","hidden");
  $("#divGreenessLoad").css("visibility","hidden");
  $("#divGreenessAnalysis").css("visibility","hidden");
  $("#divGreenessDownLoad").css("visibility","hidden");
  $("#divStudyArea").css("visibility","hidden");
  
  
  
  $("#Productivity").css("visibility","hidden");
  $("#NPPLoad").css("visibility","hidden");
  $("#NPPAnalyze").css("visibility","hidden");
  $("#NPPDownload").css("visibility","hidden"); 
  $("#divNPPLoad").css("visibility","hidden");
  $("#divNPPAnalyze").css("visibility","hidden");
  $("#divNPPDownLoad").css("visibility","hidden");
  
  
  $("#Fragmentation").css("visibility","hidden");
  $("#FootprintLoad").css("visibility","hidden");
  $("#FootprintAnalyze").css("visibility","hidden");
  $("#FootprintDownload").css("visibility","hidden"); 
  $("#divFootprintLoad").css("visibility","hidden");
  $("#divFootprintAnalyze").css("visibility","hidden");
  $("#divFootprintDownload").css("visibility","hidden");
  
  divEditbar.style.visibility="hidden";
  $("#divMap").css("visibility","hidden");
  $("#divAttribute2").css("visibility","hidden"); 
  $("#mapLegend").css("visibility","hidden");
  $("#imgLeft").css("visibility","hidden");
  $("#imgRight").css("visibility","hidden");
  $("#divFunctions").css("visibility","hidden");
  $("#divAttribute").css("visibility","hidden");
  
  if(bLoadMap) vlayer.setVisibility(false);
  $("#divDiagram").css("visibility","hidden");
  
}

function openRelatedMap(){

  $("#divMap").css("visibility","visible");
  $("#divFunctions").css("visibility","visible");
  $("#Layer").css("visibility","visible");  
  $("#Greeness").css("visibility","visible"); 
  $("#Productivity").css("visibility","visible"); 
  $("#Fragmentation").css("visibility","visible");
  
}

function clickHome()
{
  $("#dashboard").show();
  $("#divSiteMap").css("visibility","hidden");
  $("#divFunctions").css("visibility","hidden");
  $("#divIntroduction").css("visibility","hidden");
  $("#divContact").css("visibility","hidden"); 
  $("#sitemapContent").html("");
  $("#divLogin").css("visibility","hidden");
  closeAllRelatedMap();
  
   if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	  else ScrollWidth = 0;
  
}

function clickAbout()
{
  divEditbar.style.visibility="hidden";
 
  $("#divIntroduction").css("visibility","visible");
  
  $("#divContact").css("visibility","hidden"); 
 
  closeAllRelatedMap();
  
  $("#dashboard").hide();
  $("#divSiteMap").css("visibility","visible");
  $("#divSiteMap").css("visibility","40px");
  $("#sitemapContent").css("visibility","visible");
  $("#sitemapContent").html("<a href='#' onclick = 'clickHome(); return false;'>&nbsp&nbsp&nbsp&nbspHome</a> / About");
  
   $("#divLogin").css("visibility","hidden");
   $("#divDemo").css("visibility","hidden");
   
   if(TopHeight+ margin + dbHeight + introHeight + bottomHeight >= wHeight){
    	$("#divBottom").css("top",(TopHeight+ margin + dbHeight + introHeight).toString() + "px"); 
    	$("#divWhole").css("height", (TopHeight+ margin + dbHeight + introHeight + bottomHeight+margin).toString() + "px");
    }
    else{
    	$("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    	$("#divWhole").css("height", wHeight.toString() + "px");
    }
    
     if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	  else ScrollWidth = 0;
}

function clickContact()
{
 
  $("#divIntroduction").css("visibility","hidden");
 
  $("#divContact").css("visibility","visible");
 
  closeAllRelatedMap();
  
  $("#dashboard").hide();
  $("#divSiteMap").css("visibility","visible");
  $("#divSiteMap").css("visibility","40px");
  $("#sitemapContent").css("visibility","visible");
  $("#sitemapContent").html("<a href='#' onclick = 'clickHome(); return false;'>&nbsp&nbsp&nbsp&nbspHome</a> / Contact ");

  $("#divLogin").css("visibility","hidden");
   $("#divDemo").css("visibility","hidden");
   
   if(TopHeight+ margin + dbHeight + contactHeight + bottomHeight >= wHeight){
    	$("#divBottom").css("top",(TopHeight+ margin + dbHeight + contactHeight).toString() + "px"); 
    	$("#divWhole").css("height", (TopHeight+ margin + dbHeight + contactHeight + bottomHeight+margin).toString() + "px");
    }
    else{
    	$("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    	$("#divWhole").css("height", wHeight.toString() + "px");
    }
    
     if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	  else ScrollWidth = 0;

}

function clickDemo(){

  $("#divDemo").css("visibility","visible");
  $("#divIntroduction").css("visibility","hidden");
  $("#divContact").css("visibility","hidden");
  $("#divLogin").css("visibility","hidden");

  closeAllRelatedMap();
  $("#dashboard").hide();
  $("#divSiteMap").css("visibility","visible");
  $("#divSiteMap").css("visibility","40px");
  $("#sitemapContent").css("visibility","visible");
  $("#sitemapContent").html("<a href='#' onclick = 'clickHome(); return false;'>&nbsp&nbsp&nbsp&nbspHome</a> / Demo ");
  $("#divBottom").css("top",(wHeight - 40).toString() + "px");
  
  if(TopHeight+ margin + dbHeight + demoHeight + bottomHeight >= wHeight){
    	$("#divBottom").css("top",(TopHeight+ margin + dbHeight + demoHeight).toString() + "px"); 
    	$("#divWhole").css("height", (TopHeight+ margin + dbHeight + demoHeight + bottomHeight+margin).toString() + "px");
    }
    else{
    	$("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    	$("#divWhole").css("height", wHeight.toString() + "px");
    }
  
   if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	  else ScrollWidth = 0;
  
}

function clickDemoOK(){

   if($("#txtName").val().trim() == "")
   {
		alert("Please intput your name.");
	    return;
   }
   if($("#txtCompany").val().trim() == "")
   {
		alert("Please intput your Company name.");
	    return;
   }
   if($("#txtTel").val().trim() == "")
   {
		alert("Please intput your telphone number.");
	    return;
   }
   
   if($("#txtEmail").val().trim() == "")
   {
		alert("Please intput your Email acount.");
	    return;
   }
   
   alert("Thanks for your information, and we will contact you.");
   
}

function clickDemoReset(){

	$("#txtName").val("");
	$("#txtCompany").val("");
	$("#txtTel").val("");
	$("#txtEmail").val("");
	$("#txtHow").val("");
	$("#txtComment").val("");
	
}

function SelectAOI(){
	
	if(document.forms[0].elements[0].value == "")
	{	alert("Please designate study area firstly.");
		return;
	}
	alert("Save User's study area.");
}