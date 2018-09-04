var margin = 5;
var MenuMargin = 1;
var borderWidth = 1;
var TopHeight = 90;
var LeftWidth = 250;
var wWidth;
var wHeight;
var editBarWidth = 120;
var editBarHeight = 23;
var attrWinWidth = 400;
var diagramHeight = 200;

var menuHeight = 30;
var subMenuHeight = 22;
var funcHeight;
var divHead,divFunc,divMaps;
var layer,greeness,fragmentation,productivity;
var greenLoad,greenAnalyze,greenDownload,greenArea;
var divGreenLoad,divAnalysis,divStudyArea,divDownload;
var EditBar;
var divLayer; //Layer control
var divAttr;  //Attribute results
var arrowWidth = 9;
var arrowHeight = 17;
var tmsFolder;
var markersArray = []; //Editbar coordinates
var txtEditCoordinates,point1,point2; //Editbar parameters
var _user = ""; //current user
var mapLegendWidth = 100;
var mapLegendHeight = 350;
var runningWidth = 80;
var runningHeight = 80;

var ConfigureColor = "#E0F8E0";
var ConfigureHeadColor = "#1D965D";
var ConfigFuncFontColor = "#FFFFFF";
var dbWidth = 1000;
var dbHeight = 563;
var ScrollWidth = 15;
var boundary  = 0;

var TopMenuWidth = 500;
var TopMenuHeight = 50;
var mapsiteHeight = 40;

var contactWidth = 720;
var contactHeight = 100;

var demoWidth = 720;
var demoHeight = 100;

var loginHeight = 50;

var introHeight = 200;
var shortHeight = 70;
var bottomHeight = 40;

function init() {

   
   if($("#userID").val().trim() == "") {window.open("http://footprintmonitoring.com/footprint/login.php","_self"); return;}
	getSize(); //***Set the layout
	
	if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight > wHeight) ScrollWidth = 15;
	else ScrollWidth = 0;
	  
	$("#divWhole").css("position","absolute");
	$("#divWhole").css("top", "0px");    
    $("#divWhole").css("left","0px"); 
    $("#divWhole").css("width", wWidth.toString() + "px");  
    //$("#divWhole").css("height", wHeight);    
    $("#divWhole").css("backgroundColor","#E5E8C1"); 
     
    boundary = (wWidth - dbWidth - ScrollWidth)/2;
    
    //Head setting
    divHead = document.getElementById('divHead');
    divHead.style.position= "absolute";
    $("#divHead").css("visibility","visible"); 
    divHead.style.top = "0px";
    divHead.style.height = TopHeight.toString() + "px";;
    divHead.style.backgroundColor = ConfigureHeadColor;
    divHead.style.left = "0px";
    $("#divHead").css("border-radius","5px");
    
    $("#logHead").css("visibility","visible");  
    $("#logHead").css("position","absolute");
    $("#logHead").css("top", "-1px");
    $("#logHead").css("left","-1px");    
    $("#logHead").css("width","312px");
    $("#logHead").css("height","90px");
    $("#logHead").css("border-radius","10px");
	
	$("#divTopMenu").css("position","absolute");
    $("#divTopMenu").css("visibility","visible");
    $("#divTopMenu").css("top",(TopHeight - TopMenuHeight).toString() + "px");
    $("#divTopMenu").css("width",TopMenuWidth.toString());
    $("#divTopMenu").css("height",TopMenuHeight.toString());  
    
    
    $("#divHead").css("left",(boundary).toString() + "px");
    $("#divHead").css("width",dbWidth.toString()); 
    $("#divTopMenu").css("left",(boundary+(dbWidth - TopMenuWidth)).toString() + "px");
    	
    $("#divIntroduction").css("left",(boundary).toString() + "px");
    $("#divIntroduction").css("width",dbWidth.toString()); 
    	
    $("#divBottom").css("left",(boundary).toString() + "px");
    $("#divBottom").css("width",dbWidth.toString());  
    $("#divBContent").css("left",((dbWidth - 400)/2).toString() + "px"); 
        
    $("#loginUser").css("position","absolute");
    $("#loginUser").css("visibility","hidden");
    $("#loginUser").css("left",(dbWidth - 100 + boundary).toString() + "px");
    $("#loginUser").css("top",(TopHeight - TopMenuHeight + margin*5 ).toString() + "px");
    $("#loginUser").css("width","80px");
    $("#loginUser").css("height",TopMenuHeight.toString());
    $("#loginUser").css("font","14px arial,serif");  
    $("#loginUser").css("color","#FFFFFF");
   
	//top Menu Setting
    $("#divSiteMap").css("visibility","hidden");  //three buttons
    $("#divSiteMap").css("position","absolute");
    $("#divSiteMap").css("top",TopHeight.toString() + "px");
    $("#divSiteMap").css("height",mapsiteHeight.toString() + "px");
    $("#divSiteMap").css("backgroundColor","#E6E6E6");
    $("#divSiteMap").css("font","16px arial,serif");   
    $("#divSiteMap").css("left",(boundary).toString()+"px");
    $("#divSiteMap").css("width",dbWidth.toString());    	    
    $("#divSiteMap").css("border-radius","3px");
    
	//Left Function Setting
    divFunc = document.getElementById('divFunctions');
    $("#divFunctions").css("visibility","hidden"); 
    divFunc.style.position= "absolute";
    //divFunc.style.left = margin.toString() + "px";
    divFunc.style.top = (TopHeight + mapsiteHeight + margin).toString() + "px";
    divFunc.style.width = LeftWidth.toString() + "px";
	
	divFunc.style.height = (wHeight - TopHeight - margin * 2 - borderWidth * 2 - mapsiteHeight- 40).toString() + "px";
    funcHeight = wHeight - TopHeight - margin * 2 - borderWidth * 2 - mapsiteHeight- 40; 
    
    divFunc.style.border="1px solid #ff9900";
	divFunc.style.backgroundColor = "#FFFFFF";
	$("#divFunctions").css("left",margin.toString() + "px");
	
	//Map Setting
	$("#divMap").css("visibility","hidden");
    divMaps = document.getElementById('divMap');
    divMaps.style.position= "absolute";
    divMaps.style.top =(TopHeight +  mapsiteHeight + margin).toString() + "px";
    divMaps.style.height = (wHeight - TopHeight - margin * 2 - borderWidth * 2 - mapsiteHeight- 40).toString() + "px";
    divMaps.style.border="1px solid #ff9900";
	divMaps.style.backgroundColor = "#FFFFFF";
	$("#divMap").css("left",(LeftWidth + margin * 2 + borderWidth *3).toString() + "px");
    $("#divMap").css("width",(wWidth-LeftWidth - margin *3 - borderWidth*4-ScrollWidth).toString());    	
      
	//Map Legend Setting
	$("#mapLegend").css("visibility","hidden");
    $("#mapLegend").css("position","absolute");
    $("#mapLegend").css("left",(wWidth - margin - borderWidth - mapLegendWidth).toString() + "px");
    $("#mapLegend").css("top",(TopHeight + mapsiteHeight + margin + borderWidth).toString() + "px"); 
    $("#mapLegend").css("width",(mapLegendWidth).toString() + "px");
    $("#mapLegend").css("height",(mapLegendHeight).toString() + "px");
    
  
    $("#divBottom").css("visibility","visible");
    $("#divBottom").css("position","absolute");
    $("#divBottom").css("height",bottomHeight.toString());
    $("#divBottom").css("backgroundColor","#585858");
    $("#divBottom").css("font","13px arial,serif");
    $("#divBottom").css("border-radius","10px");
     
  
   
    if(TopHeight+ margin + dbHeight + shortHeight + bottomHeight >= wHeight){
    	$("#divBottom").css("top",(TopHeight+ margin + dbHeight + shortHeight).toString() + "px"); 
    	$("#divWhole").css("height", (TopHeight+ margin + dbHeight + shortHeight + bottomHeight+margin).toString() + "px");
    }
    else{
    	$("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    	$("#divWhole").css("height", wHeight.toString() + "px");
    }
    	
    $("#divBContent").css("visibility","visible");
    $("#divBContent").css("position","absolute");
    $("#divBContent").css("width","400px");
    $("#divBContent").css("height","20px");
    $("#divBContent").css("margin-top","10px");
    $("#divBContent").css("color","#FFFFFF");
	
    setInitialPositionForFuncs();
	$("#divWhole").css("visibility","visible");
	

	clickMap(); 

}

function getSize(){

	wWidth =window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	wHeight=window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
	
	/*if(wWidth < 1024) 
	{
	   alert("To get good user experience, suggest the desktop resolution is at least 1024 * 768.");
	}*/
}

  window.onresize = function(event) { //window size changed.
  
  var _mapState = $("#divMap").css("visibility");
  init();
  
  if(_mapState == "visible") {
  	$("#divMap").css("visibility","visible");
  	$("#divAttribute2").css("visibility","visible");
  	$("#divFunctions").css("visibility","visible");
  
  }
 };

function setInitialPositionForFuncs() {
    
    layer = document.getElementById('Layer');
    greeness =  document.getElementById('Greeness');
	fragmentation = document.getElementById('Fragmentation');
	productivity = document.getElementById('Productivity');
	
    greenLoad = document.getElementById('GreenessLoad');
	greenAnalyze =  document.getElementById('GreenessAnalyze');
	greenDownload = document.getElementById('GreenessDownload');
	greenArea = document.getElementById('GreenessMyStudyArea');
	
	divGreenLoad = document.getElementById('divGreenessLoad');
	divDownload = document.getElementById('divGreenessDownLoad');

	divStudyArea = document.getElementById('divStudyArea');
	
	divAnalysis = document.getElementById('divGreenessAnalysis');
	divEditbar = document.getElementById('divEditPanel');
	
	divLayer = document.getElementById('divLayerControl'); //Layer control
	divAttr = document.getElementById('divAttribute');     //Attribute window
	divAttr2 = document.getElementById('divAttribute2'); //Coordinates popup window
	
	layer.style.position= "absolute";
    layer.style.left = "1px";
    layer.style.top = MenuMargin.toString() + "px";
    layer.style.width = (LeftWidth-2).toString() + "px";
	layer.style.height = menuHeight.toString() + "px";
    layer.style.border = "1px outset #b37d00";
    layer.style.color = "#000000";
    
    layer.style.backgroundColor = ConfigureColor;
	layer.style.font="15px arial,serif";
	
	divLayer.style.position= "absolute";
    divLayer.style.left = "10px";
    divLayer.style.top = (MenuMargin*2 + menuHeight ).toString() + "px";
    divLayer.style.width = (LeftWidth-20).toString() + "px";
	divLayer.style.height = menuHeight.toString() + "px";

	divLayer.style.font="14px arial,serif";
	divLayer.style.visibility="hidden"; 
	
	//mouse position
	
    $('#divAttribute2').css("visibility","hidden"); //display coordinates
	$("#divAttribute2").css("position","absolute");
    $("#divAttribute2").css("top",(wHeight-margin*2-60).toString() + "px");
    $("#divAttribute2").css("left",(LeftWidth+ margin*2+80).toString() + "px");
    $("#divAttribute2").css("width","145px");
    $("#divAttribute2").css("height","20px");
    $("#divAttribute2").css("backgroundColor","#FFFFFF");
    $("#divAttribute2").css("font","14px arial,serif");
	
	//Diagram position
	
	$("#divDiagram").css("visibility","hidden");
	$("#divDiagram").css("position","absolute");
    $("#divDiagram").css("top",(wHeight-margin-borderWidth*2-diagramHeight - 40).toString() + "px");
    $("#divDiagram").css("left",(LeftWidth+ margin*2+borderWidth*3+margin).toString() + "px");
    $("#divDiagram").css("width",(wWidth-margin*5-borderWidth*5-LeftWidth-attrWinWidth-9-borderWidth).toString() + "px");
    $("#divDiagram").css("height",diagramHeight.toString() + "px");
    $("#divDiagram").css("backgroundColor","#FFFFFF");
    $("#divDiagram").css("font","14px arial,serif");
    $("#divDiagram").css("border","1px solid #000000");
    
	var animationHeight = 500;var animationWidth = 500;
	var btnAnimationWidth = 120; var btnAnimationHeight = 30;
	var animationlabelWidth = 60; var animationlabelHeight = 30;
	var animationWindowWidth = animationWidth + margin * 2 + borderWidth * 2;
	var animationWindowHeight = margin + btnAnimationHeight + margin + animationHeight + margin + animationlabelHeight+ margin;
	 
	$("#divAnimationWindow").css("visibility","hidden");
	$("#divAnimationWindow").css("position","absolute");
    $("#divAnimationWindow").css("top",(wHeight-margin-borderWidth-animationWindowHeight).toString() + "px");
    var left = LeftWidth+ margin*2+borderWidth*3 + (wWidth-margin*5-borderWidth*5-LeftWidth-attrWinWidth-9-borderWidth - animationWindowWidth)/2;
    $("#divAnimationWindow").css("left",left.toString() + "px");
    $("#divAnimationWindow").css("width",animationWindowWidth.toString() + "px");
    $("#divAnimationWindow").css("height",animationWindowHeight.toString() + "px");
    $("#divAnimationWindow").css("backgroundColor","#FFFFFF");
    $("#divAnimationWindow").css("border-radius","15px");
    
	
    $("#btnAnimationControl").css("position","absolute");
    $("#btnAnimationControl").css("top",margin.toString() + "px");
    $("#btnAnimationControl").css("left",((animationWindowWidth - btnAnimationWidth)/2).toString() + "px");
    $("#btnAnimationControl").css("width",btnAnimationWidth.toString() + "px");
    $("#btnAnimationControl").css("height",btnAnimationHeight.toString() + "px");
    
    $("#divAnimation").css("position","absolute");
    $("#divAnimation").css("top",(margin*2 + btnAnimationHeight).toString() + "px");
    $("#divAnimation").css("left",margin.toString()+"px");
    $("#divAnimation").css("width",animationWidth.toString() + "px");
    $("#divAnimation").css("height",animationHeight.toString() + "px");
    $("#divAnimation").css("border","1px solid #ff9900");
   
    $("#lblAnimation").css("position","absolute");
    $("#lblAnimation").css("top",(animationWindowHeight - margin - animationlabelHeight + margin).toString() + "px");
    $("#lblAnimation").css("left",((animationWindowWidth - animationlabelWidth)/2).toString() + "px");
    $("#lblAnimation").css("width",animationlabelWidth.toString() + "px");
    $("#lblAnimation").css("height",animationlabelHeight.toString() + "px");
    $("#lblAnimation").css("font","14px arial,serif");
    
    divAttr.style.position= "absolute";
    divAttr.style.left = (wWidth - margin-attrWinWidth-borderWidth).toString() + "px";
    divAttr.style.top = (margin  + TopHeight + mapsiteHeight).toString() + "px";
    divAttr.style.width = attrWinWidth.toString() + "px";
	divAttr.style.height = (wHeight - TopHeight - margin * 2 - borderWidth * 2 - mapsiteHeight- 40).toString() + "px";
    divAttr.style.border="1px solid #ff9900";
	divAttr.style.backgroundColor = "#FFFFFF";
	divAttr.style.font="14px arial,serif";
	divAttr.style.visibility="hidden"; 
	
	$("#imgRight").css("visibility","hidden");
	$("#imgRight").css("position","absolute");
    $("#imgRight").css("top",(margin  + TopHeight + mapsiteHeight).toString() + "px");
    $("#imgRight").css("left",(wWidth - margin-attrWinWidth-borderWidth * 2-arrowWidth).toString() + "px");
    $("#imgRight").css("width",arrowWidth.toString() + "px");
    $("#imgRight").css("height",arrowHeight.toString() + "px");
    $("#imgRight").css("border","1px solid #ff9900");
    
    $("#imgLeft").css("visibility","hidden");
	$("#imgLeft").css("position","absolute");
    $("#imgLeft").css("top",(margin  + TopHeight + mapsiteHeight).toString() + "px");
    $("#imgLeft").css("left",(wWidth - margin-borderWidth * 2-8).toString() + "px");
    $("#imgLeft").css("width",arrowWidth.toString() + "px");
    $("#imgLeft").css("height",arrowHeight.toString() + "px");
    $("#imgLeft").css("border","1px solid #ff9900");
    
    //green
	greeness.style.position= "absolute";
    greeness.style.left = "1px";
    greeness.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    greeness.style.width = (LeftWidth-2).toString() + "px";
	greeness.style.height = menuHeight.toString() + "px";
    greeness.style.border="1px solid #000000";
	greeness.style.backgroundColor = ConfigureColor;
	greeness.style.font="15px arial,serif";
	
	greenLoad.style.visibility="hidden"; 
    greenLoad.style.position= "absolute";
    greenLoad.style.left = "1px";
    //greenLoad.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    greenLoad.style.width = (LeftWidth-2).toString() + "px";
	greenLoad.style.height = subMenuHeight.toString() + "px";
    greenLoad.style.border="1px solid #000000";
	greenLoad.style.backgroundColor = "#C0FFC0";
	greenLoad.style.font="13px arial,serif";
	
	divGreenLoad.style.visibility="hidden"; 
	divGreenLoad.style.position= "relative";
    divGreenLoad.style.left = "1px";
    divGreenLoad.style.width = (LeftWidth-2).toString() + "px";
	divGreenLoad.style.backgroundColor = "#FFFFFF";
	divGreenLoad.style.font="13px arial,serif";
	
	divAnalysis.style.visibility="hidden"; 
	divAnalysis.style.position= "relative";
    divAnalysis.style.left = "1px";
    divAnalysis.style.width = (LeftWidth-2).toString() + "px";
	divAnalysis.style.backgroundColor = "#FFFFFF";
	divAnalysis.style.font="13px arial,serif";
	
	divDownload.style.visibility="hidden"; 
	divDownload.style.position= "relative";
    divDownload.style.left = "1px";
    divDownload.style.width = (LeftWidth-2).toString() + "px";
	divDownload.style.backgroundColor = "#FFFFFF";
	divDownload.style.font="13px arial,serif";
	
	
	divStudyArea.style.visibility="hidden"; 
	divStudyArea.style.position= "relative";
    divStudyArea.style.left = "1px";
    divStudyArea.style.width = (LeftWidth-2).toString() + "px";
	divStudyArea.style.backgroundColor = "#FFFFFF";
	divStudyArea.style.font="13px arial,serif";
	
	greenAnalyze.style.visibility="hidden";
	greenAnalyze.style.position= "absolute";
    greenAnalyze.style.left = "1px";
    //greenAnalyze.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    greenAnalyze.style.width = (LeftWidth-2).toString() + "px";
	greenAnalyze.style.height = subMenuHeight.toString() + "px";
    greenAnalyze.style.border="1px solid #000000";
	greenAnalyze.style.backgroundColor = "#C0FFC0";
	greenAnalyze.style.font="13px arial,serif";
	
	greenDownload.style.visibility="hidden";
	greenDownload.style.position= "absolute";
    greenDownload.style.left = "1px";
    //greenDownload.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    greenDownload.style.width = (LeftWidth-2).toString() + "px";
	greenDownload.style.height = subMenuHeight.toString() + "px";
    greenDownload.style.border="1px solid #000000";
	greenDownload.style.backgroundColor = "#C0FFC0";
	greenDownload.style.font="13px arial,serif";
	
	greenArea.style.visibility="hidden";
	greenArea.style.position= "absolute";
    greenArea.style.left = "1px";
 
    greenArea.style.width = (LeftWidth-2).toString() + "px";
	greenArea.style.height = subMenuHeight.toString() + "px";
    greenArea.style.border="1px solid #000000";
	greenArea.style.backgroundColor = "#C0FFC0";
	greenArea.style.font="13px arial,serif";
	
	//fragmentation
    fragmentation.style.position= "absolute";
    fragmentation.style.left = "1px";
    fragmentation.style.top = (menuHeight * 3 + MenuMargin* 4).toString() + "px";
    fragmentation.style.width = (LeftWidth-2).toString() + "px";
	fragmentation.style.height = menuHeight.toString() + "px";
    fragmentation.style.border="1px solid #000000";
	fragmentation.style.backgroundColor = ConfigureColor;
	fragmentation.style.font="15px arial,serif";

	productivity.style.position= "absolute";
    productivity.style.left = "1px";
    productivity.style.top = (menuHeight * 2 + MenuMargin* 3).toString() + "px";
    productivity.style.width = (LeftWidth-2).toString() + "px";
	productivity.style.height = menuHeight.toString() + "px";
    productivity.style.border="1px solid #000000";
	productivity.style.backgroundColor = ConfigureColor;
	productivity.style.font="15px arial,serif";
	
	//Edit Bar 
	divEditbar.style.position= "absolute";
    divEditbar.style.left = (LeftWidth+ margin*2+80).toString() + "px";
    divEditbar.style.top = (TopHeight + mapsiteHeight + margin).toString() + "px";
    divEditbar.style.width = editBarWidth.toString()+"px";
	divEditbar.style.height = editBarHeight.toString() + "px";
    divEditbar.style.backgroundColor = "transparent";
	divEditbar.style.visibility="hidden";
	
    //### Inialize the NPP controls' state ###
    $("#NPPLoad").css("visibility","hidden");  //three buttons
    $("#NPPLoad").css("position","absolute");
    $("#NPPLoad").css("left","1px");
    $("#NPPLoad").css("width",(LeftWidth-2).toString() + "px");
    $("#NPPLoad").css("height",subMenuHeight.toString() + "px");
    $("#NPPLoad").css("border","1px solid #000000");
    $("#NPPLoad").css("backgroundColor","#C0FFC0");
    $("#NPPLoad").css("font","13px arial,serif");
    
    $("#NPPAnalyze").css("visibility","hidden");  
    $("#NPPAnalyze").css("position","absolute");
    $("#NPPAnalyze").css("left","1px");
    $("#NPPAnalyze").css("width",(LeftWidth-2).toString() + "px");
    $("#NPPAnalyze").css("height",subMenuHeight.toString() + "px");
    $("#NPPAnalyze").css("border","1px solid #000000");
    $("#NPPAnalyze").css("backgroundColor","#C0FFC0");
    $("#NPPAnalyze").css("font","13px arial,serif");
    
    $("#NPPDownload").css("visibility","hidden");  //three buttons
    $("#NPPDownload").css("position","absolute");
    $("#NPPDownload").css("left","1px");
    $("#NPPDownload").css("width",(LeftWidth-2).toString() + "px");
    $("#NPPDownload").css("height",subMenuHeight.toString() + "px");
    $("#NPPDownload").css("border","1px solid #000000");
    $("#NPPDownload").css("backgroundColor","#C0FFC0");
    $("#NPPDownload").css("font","13px arial,serif");

    $("#divNPPLoad").css("visibility","hidden");
	$("#divNPPLoad").css("position","relative");
	$("#divNPPLoad").css("left","1px");
	$("#divNPPLoad").css("width",(LeftWidth-2).toString() + "px");
	$("#divNPPLoad").css("backgroundColor","FFFFFF");
	$("#divNPPLoad").css("font","13px arial,serif");
	
	$("#divNPPAnalyze").css("visibility","hidden");
	$("#divNPPAnalyze").css("position","relative");
	$("#divNPPAnalyze").css("left","1px");
	$("#divNPPAnalyze").css("width",(LeftWidth-2).toString() + "px");
	$("#divNPPAnalyze").css("backgroundColor","FFFFFF");
	$("#divNPPAnalyze").css("font","13px arial,serif");
	
	$("#divNPPDownLoad").css("visibility","hidden");
	$("#divNPPDownLoad").css("position","relative");
	$("#divNPPDownLoad").css("left","1px");
	$("#divNPPDownLoad").css("width",(LeftWidth-2).toString() + "px");
	$("#divNPPDownLoad").css("backgroundColor","FFFFFF");
	$("#divNPPDownLoad").css("font","13px arial,serif");
	//Inialize the NPP controls' state 
	
	//### Inialize the Footprint controls' state ###
	$("#FootprintLoad").css("visibility","hidden");  //three buttons
    $("#FootprintLoad").css("position","absolute");
    $("#FootprintLoad").css("left","1px");
    $("#FootprintLoad").css("width",(LeftWidth-2).toString() + "px");
    $("#FootprintLoad").css("height",subMenuHeight.toString() + "px");
    $("#FootprintLoad").css("border","1px solid #000000");
    $("#FootprintLoad").css("backgroundColor","#C0FFC0");
    $("#FootprintLoad").css("font","13px arial,serif");
    
    $("#FootprintAnalyze").css("visibility","hidden");  
    $("#FootprintAnalyze").css("position","absolute");
    $("#FootprintAnalyze").css("left","1px");
    $("#FootprintAnalyze").css("width",(LeftWidth-2).toString() + "px");
    $("#FootprintAnalyze").css("height",subMenuHeight.toString() + "px");
    $("#FootprintAnalyze").css("border","1px solid #000000");
    $("#FootprintAnalyze").css("backgroundColor","#C0FFC0");
    $("#FootprintAnalyze").css("font","13px arial,serif");
    
    $("#FootprintDownload").css("visibility","hidden");  //three buttons
    $("#FootprintDownload").css("position","absolute");
    $("#FootprintDownload").css("left","1px");
    $("#FootprintDownload").css("width",(LeftWidth-2).toString() + "px");
    $("#FootprintDownload").css("height",subMenuHeight.toString() + "px");
    $("#FootprintDownload").css("border","1px solid #000000");
    $("#FootprintDownload").css("backgroundColor","#C0FFC0");
    $("#FootprintDownload").css("font","13px arial,serif");

    $("#divFootprintLoad").css("visibility","hidden");
	$("#divFootprintLoad").css("position","relative");
	$("#divFootprintLoad").css("left","1px");
	$("#divFootprintLoad").css("width",(LeftWidth-2).toString() + "px");
	$("#divFootprintLoad").css("backgroundColor","FFFFFF");
	$("#divFootprintLoad").css("font","13px arial,serif");
	
	$("#divFootprintAnalyze").css("visibility","hidden");
	$("#divFootprintAnalyze").css("position","relative");
	$("#divFootprintAnalyze").css("left","1px");
	$("#divFootprintAnalyze").css("width",(LeftWidth-2).toString() + "px");
	$("#divFootprintAnalyze").css("backgroundColor","FFFFFF");
	$("#divFootprintAnalyze").css("font","13px arial,serif");
	
	$("#divFootprintDownload").css("visibility","hidden");
	$("#divFootprintDownload").css("position","relative");
	$("#divFootprintDownload").css("left","1px");
	$("#divFootprintDownload").css("width",(LeftWidth-2).toString() + "px");
	$("#divFootprintDownload").css("backgroundColor","FFFFFF");
	$("#divFootprintDownload").css("font","13px arial,serif");
	//Inialize the Footprint controls' state
	
	//document.forms[0].elements[0].value= "";
	
	$("#running").css("visibility","hidden");
	$("#running").css("position","absolute");
	$("#running").css("left",((wWidth-runningWidth - LeftWidth - margin * 3 - borderWidth * 4)/2 + LeftWidth + margin * 2 + borderWidth * 3).toString() + "px");
	$("#running").css("top",((wHeight-runningHeight)/2 ).toString() + "px");
    $("#running").css("width",runningWidth.toString() + "px");
    $("#running").css("height",runningHeight.toString() + "px");
    
    $("#running").css("z-index","10");
   
}

function clickLayer() { 

	if($("#divMap").css("visibility") == "hidden"){
	
		alert("Please switch to map view via clicking 'Maps' button on the right.");
		return;
	}

	divFunc = document.getElementById('divFunctions');
    layer.style.top = MenuMargin.toString() + "px";
    greeness.style.top = (funcHeight - menuHeight*3 - MenuMargin* 3).toString() + "px";
    productivity.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2).toString() + "px";
    fragmentation.style.top = (funcHeight- menuHeight - MenuMargin).toString() + "px";
    
    greenLoad.style.visibility="hidden"; 
    greenAnalyze.style.visibility="hidden";
    greenDownload.style.visibility="hidden";
    greenArea.style.visibility="hidden";
    
    divGreenLoad.style.visibility="hidden"; 
    divStudyArea.style.visibility="hidden"; 
    divDownload.style.visibility="hidden"; 
    divAnalysis.style.visibility="hidden"; 
    
    divEditbar.style.visibility="hidden";
    divLayer.style.visibility="visible";
    
    $("#NPPLoad").css("visibility","hidden");  
    $("#NPPAnalyze").css("visibility","hidden");
	$("#NPPDownload").css("visibility","hidden");
	
	$("#divNPPLoad").css("visibility","hidden");
	$("#divNPPAnalyze").css("visibility","hidden");
    $("#divNPPDownLoad").css("visibility","hidden");
    
    $("#FootprintLoad").css("visibility","hidden"); 
    $("#FootprintAnalyze").css("visibility","hidden");  
    $("#FootprintDownload").css("visibility","hidden");
    $("#divFootprintLoad").css("visibility","hidden"); 
    $("#divFootprintAnalyze").css("visibility","hidden");  
    $("#divFootprintDownload").css("visibility","hidden");


}

function clickGreeness() { 
	
 
    layer.style.top = MenuMargin.toString() + "px";
    greeness.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    productivity.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2).toString() + "px";
    fragmentation.style.top = (funcHeight- menuHeight - MenuMargin).toString() + "px";
    
    greenLoad.style.visibility="visible"; 
    greenLoad.style.top = (menuHeight*2 + MenuMargin* 3).toString() + "px";
    
    greenAnalyze.style.visibility="visible";  
    greenAnalyze.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight*3-MenuMargin*3).toString() + "px";
    
    greenDownload.style.visibility="visible";
    greenDownload.style.top =(funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight*2-MenuMargin*2).toString() + "px";
    
    greenArea.style.visibility="visible";
    greenArea.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight-MenuMargin).toString() + "px";
    
    divGreenLoad.style.visibility="visible"; 
    divGreenLoad.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight + MenuMargin+MenuMargin).toString() + "px";
   
    divStudyArea.style.visibility="hidden"; 
    
    divDownload.style.visibility="hidden"; 
    
    divAnalysis.style.visibility="hidden"; 
    
    divEditbar.style.visibility="hidden";
    divLayer.style.visibility="hidden";
    
    $("#NPPLoad").css("visibility","hidden");  
    $("#NPPAnalyze").css("visibility","hidden");
	$("#NPPDownload").css("visibility","hidden");
	
	$("#divNPPLoad").css("visibility","hidden");
	$("#divNPPAnalyze").css("visibility","hidden");
    $("#divNPPDownLoad").css("visibility","hidden");
    
    $("#FootprintLoad").css("visibility","hidden"); 
    $("#FootprintAnalyze").css("visibility","hidden");  
    $("#FootprintDownload").css("visibility","hidden");
    $("#divFootprintLoad").css("visibility","hidden"); 
    $("#divFootprintAnalyze").css("visibility","hidden");  
    $("#divFootprintDownload").css("visibility","hidden");
    
    SendPHP("NDVI"); //Populate the date textbox
    
}
//Load imagery
function clickGreenessLoad() { 

	greenLoad.style.top = (menuHeight*2 + MenuMargin* 3).toString() + "px";
    greenAnalyze.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight*3-MenuMargin*3).toString() + "px";
    greenDownload.style.top =(funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight*2-MenuMargin*2).toString() + "px";
    greenArea.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight-MenuMargin).toString() + "px";
    
    divGreenLoad.style.visibility="visible"; 
    divStudyArea.style.visibility="hidden"; 
    divDownload.style.visibility="hidden"; 
    divAnalysis.style.visibility="hidden"; 
    
    $("#divEditPanel").css("visibility","hidden");
    //divLayer.style.visibility="hidden";
}

//Load analyze
function clickGreenessAnalyze() { 

	greenLoad.style.top = (menuHeight*2 + MenuMargin* 3).toString() + "px";
    greenAnalyze.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight + MenuMargin).toString() + "px";
    greenDownload.style.top =(funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight*2-MenuMargin*2).toString() + "px";
    greenArea.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight-MenuMargin).toString() + "px";
    
    divGreenLoad.style.visibility="hidden"; 
    divStudyArea.style.visibility="hidden"; 
    divDownload.style.visibility="hidden"; 
    divAnalysis.style.visibility="visible"; 
    divAnalysis.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight * 2 + MenuMargin*2).toString() + "px";
    
   divEditbar.style.visibility="visible";
    
    //divLayer.style.visibility="hidden";
    //map.setLayerIndex(vlayer, map.layers.length-1);
    
}

//Load green download
function clickGreenessDownload() { 

	greenLoad.style.top = (menuHeight*2 + MenuMargin* 3).toString() + "px";
    greenAnalyze.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight + MenuMargin).toString() + "px";
    greenDownload.style.top =(menuHeight*2 + MenuMargin* 3 + subMenuHeight*2 + MenuMargin*2).toString() + "px";
    greenArea.style.top = (funcHeight - menuHeight * 2 - MenuMargin* 2-subMenuHeight-MenuMargin).toString() + "px";
    
    divGreenLoad.style.visibility="hidden"; 
    divStudyArea.style.visibility="hidden"; 
    
    divDownload.style.visibility="visible"; 
    divDownload.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight * 3 + MenuMargin*3).toString() + "px";
    divAnalysis.style.visibility="hidden"; 
    
    divEditbar.style.visibility="visible";
    //map.setLayerIndex(vlayer, map.layers.length-1);
    
    //document.forms[0].elements[0].value= "";
}

//Load green download
function clickGreenessMyStudyArea() { 

	greenLoad.style.top = (menuHeight*2 + MenuMargin* 3).toString() + "px";
    greenAnalyze.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight + MenuMargin).toString() + "px";
    greenDownload.style.top =(menuHeight*2 + MenuMargin* 3 + subMenuHeight*2 + MenuMargin*2).toString() + "px";
    greenArea.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight*3 + MenuMargin*3).toString() + "px";
    
    divGreenLoad.style.visibility="hidden"; 
    divDownload.style.visibility="hidden";
    
    
    divStudyArea.style.visibility="visible"; 
    divStudyArea.style.top = (menuHeight*2 + MenuMargin* 3 + subMenuHeight*4 + MenuMargin*4).toString() + "px";
    
    divAnalysis.style.visibility="hidden"; 
    
    divEditbar.style.visibility="visible";
    //map.setLayerIndex(vlayer, map.layers.length-1);
    
    $('.shp-modal').toggleClass('effect');
    $('.dimmer').removeClass('active');
	$('#preview').addClass('disabled');
	$('#epsg').val('');
	$('#encoding').val('');
	$('#info').addClass('picInfo');
	$('#option').slideUp(500); 

}

function clickProductivity(){

 	 /*if($("#userID").val().trim() == "2"){
        alert("There is no current productivity data in 2 user acount. ");
		return;
   }*/

	layer.style.top = MenuMargin.toString() + "px";
    greeness.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    productivity.style.top = (menuHeight * 2 + MenuMargin* 3).toString() + "px";
    fragmentation.style.top = (funcHeight - menuHeight - MenuMargin).toString() + "px";
    
    $("#NPPLoad").css("visibility","visible");  //three buttons
    $("#NPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4).toString() + "px");
    
    $("#NPPAnalyze").css("visibility","visible");
    $("#NPPAnalyze").css("top",(funcHeight - menuHeight - MenuMargin - subMenuHeight*2-MenuMargin*2).toString() + "px");
	
	$("#NPPDownload").css("visibility","visible");
	$("#NPPDownload").css("top",(funcHeight - menuHeight - MenuMargin - subMenuHeight-MenuMargin).toString() + "px"); 
	
	$("#divNPPLoad").css("visibility","visible");
	$("#divNPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4 + subMenuHeight + MenuMargin*2).toString() + "px"); 
    
    greenLoad.style.visibility="hidden"; 
    greenAnalyze.style.visibility="hidden";
    greenDownload.style.visibility="hidden";
    greenArea.style.visibility="hidden";
    
    divGreenLoad.style.visibility="hidden"; 
    divStudyArea.style.visibility="hidden";
    divDownload.style.visibility="hidden";
    divAnalysis.style.visibility="hidden"; 
    
    divEditbar.style.visibility="hidden";
    divLayer.style.visibility="hidden";
    
    $("#divNPPDownLoad").css("visibility","hidden");
	$("#divNPPAnalyze").css("visibility","hidden");
	
	$("#FootprintLoad").css("visibility","hidden"); 
    $("#FootprintAnalyze").css("visibility","hidden");  
    $("#FootprintDownload").css("visibility","hidden");
    $("#divFootprintLoad").css("visibility","hidden"); 
    $("#divFootprintAnalyze").css("visibility","hidden");  
    $("#divFootprintDownload").css("visibility","hidden");
	
	SendPHP("GPP"); //Populate the date textbox
}

function clickNPPLoad()
{
    $("#NPPLoad").css("visibility","visible");  //three buttons
    $("#NPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4).toString() + "px");
    
    $("#NPPAnalyze").css("visibility","visible");
    $("#NPPAnalyze").css("top",(funcHeight - menuHeight - MenuMargin - subMenuHeight*2-MenuMargin*2).toString() + "px");
	
	$("#NPPDownload").css("visibility","visible");
	$("#NPPDownload").css("top",(funcHeight - menuHeight - MenuMargin - subMenuHeight-MenuMargin).toString() + "px"); 
	
	$("#divNPPLoad").css("visibility","visible");
	$("#divNPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4 + subMenuHeight + MenuMargin*2).toString() + "px"); 

	$("#divNPPAnalyze").css("visibility","hidden");
	$("#divNPPDownLoad").css("visibility","hidden");
	
	divEditbar.style.visibility="hidden";
}

function clickNPPAnalyze()
{
    $("#NPPLoad").css("visibility","visible");  //three buttons
    $("#NPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4).toString() + "px");
    
    $("#NPPAnalyze").css("visibility","visible");
    $("#NPPAnalyze").css("top",(menuHeight * 3 + MenuMargin* 4+subMenuHeight+MenuMargin).toString() + "px");
	
	$("#NPPDownload").css("visibility","visible");
	$("#NPPDownload").css("top",(funcHeight - menuHeight - MenuMargin - subMenuHeight-MenuMargin).toString() + "px"); 
    
    $("#divNPPAnalyze").css("visibility","visible");
    $("#divNPPAnalyze").css("top",(menuHeight * 3 + MenuMargin* 4 + subMenuHeight*2 + MenuMargin*3).toString() + "px"); 
    
    $("#divNPPLoad").css("visibility","hidden");
    $("#divNPPDownLoad").css("visibility","hidden");
    
    divEditbar.style.visibility="visible";
    
  }

function clickNPPDownload()
{
    $("#NPPLoad").css("visibility","visible");  //three buttons
    $("#NPPLoad").css("top",(menuHeight * 3 + MenuMargin* 4).toString() + "px");
    
    $("#NPPAnalyze").css("visibility","visible");
    $("#NPPAnalyze").css("top",(menuHeight * 3 + MenuMargin* 4+subMenuHeight+MenuMargin).toString() + "px");
	
	$("#NPPDownload").css("visibility","visible");
	$("#NPPDownload").css("top",(menuHeight * 3 + MenuMargin* 4+subMenuHeight * 2+MenuMargin*2).toString() + "px"); 
	
	$("#divNPPLoad").css("visibility","hidden");
    $("#divNPPAnalyze").css("visibility","hidden");
    
    $("#divNPPDownLoad").css("visibility","visible");
    $("#divNPPDownLoad").css("top",(menuHeight * 3 + MenuMargin* 4 + subMenuHeight*3 + MenuMargin*4).toString() + "px"); 
    
    divEditbar.style.visibility="visible";
    //map.setLayerIndex(vlayer, map.layers.length-1);
    
    //document.forms[0].elements[0].value= "";
}


function clickFragmentation(){  

   //if($("#userID").val().trim() == "2"){
    alert("There is no current fragmentation data in this study area.");
	return;
   //}
   
    //clickMap();
	layer.style.top = MenuMargin.toString() + "px";
	divLayer.style.visibility="hidden";
	
    greeness.style.top = (menuHeight + MenuMargin* 2).toString() + "px";
    greenLoad.style.visibility="hidden"; 
    greenAnalyze.style.visibility="hidden";
    greenDownload.style.visibility="hidden";
    greenArea.style.visibility="hidden";
    
    divGreenLoad.style.visibility="hidden"; 
    divAnalysis.style.visibility="hidden"; 
    divStudyArea.style.visibility="hidden";
    divDownload.style.visibility="hidden";
    
    productivity.style.top = (menuHeight * 2 + MenuMargin* 3).toString() + "px";
    $("#NPPLoad").css("visibility","hidden");  
    $("#NPPAnalyze").css("visibility","hidden");
	$("#NPPDownload").css("visibility","hidden");
	
	$("#divNPPLoad").css("visibility","hidden");
	$("#divNPPAnalyze").css("visibility","hidden");
    $("#divNPPDownLoad").css("visibility","hidden");
    
    fragmentation.style.top =(menuHeight * 3 + MenuMargin* 4).toString() + "px";
  
	$("#FootprintLoad").css("visibility","visible");  //three buttons
    $("#FootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin).toString() + "px");
    
    $("#FootprintAnalyze").css("visibility","visible");
    $("#FootprintAnalyze").css("top",(funcHeight - subMenuHeight*2 - MenuMargin *2).toString() + "px");
	
	$("#FootprintDownload").css("visibility","visible");
	$("#FootprintDownload").css("top",(funcHeight - subMenuHeight - MenuMargin).toString() + "px"); 
	
	$("#divFootprintLoad").css("visibility","visible");
	$("#divFootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin+subMenuHeight).toString() + "px"); 
	
	$("#divFootprintAnalyze").css("visibility","hidden");
	$("#divFootprintDownload").css("visibility","hidden");
	
    divEditbar.style.visibility="hidden";
    
    SendPHP("Footprint"); //Populate the date textbox
}

function clickFootprintLoad()
{
    $("#FootprintLoad").css("visibility","visible");  //three buttons
    $("#FootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin).toString() + "px");
    
    $("#FootprintAnalyze").css("visibility","visible");
    $("#FootprintAnalyze").css("top",(funcHeight - subMenuHeight*2 - MenuMargin *2).toString() + "px");
	
	$("#FootprintDownload").css("visibility","visible");
	$("#FootprintDownload").css("top",(funcHeight - subMenuHeight - MenuMargin).toString() + "px"); 
	
	$("#divFootprintLoad").css("visibility","visible");
	$("#divFootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin+subMenuHeight).toString() + "px"); 
	$("#divFootprintAnalyze").css("visibility","hidden");
    $("#divFootprintDownload").css("visibility","hidden");
	
	divEditbar.style.visibility="hidden";
}

function clickFootprintAnalyze()
{
	$("#FootprintLoad").css("visibility","visible");  //three buttons
    $("#FootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin).toString() + "px");
    
    $("#FootprintAnalyze").css("visibility","visible");
    $("#FootprintAnalyze").css("top",(menuHeight * 3 + MenuMargin* 4 + menuHeight+ MenuMargin + subMenuHeight + MenuMargin).toString() + "px");
	
	$("#FootprintDownload").css("visibility","visible");
	$("#FootprintDownload").css("top",(funcHeight - subMenuHeight - MenuMargin).toString() + "px"); 
	
	$("#divFootprintLoad").css("visibility","hidden");
	$("#divFootprintAnalyze").css("visibility","visible");
	$("#divFootprintAnalyze").css("top",(menuHeight * 4 + MenuMargin* 6 + subMenuHeight*2).toString() + "px"); 
	
	$("#divFootprintDownload").css("visibility","hidden");
    
    divEditbar.style.visibility="visible";

}

function clickFootprintDownload()
{
	$("#FootprintLoad").css("visibility","visible");  //three buttons
    $("#FootprintLoad").css("top",(menuHeight * 3 + MenuMargin* 4+menuHeight+MenuMargin).toString() + "px");
    
    $("#FootprintAnalyze").css("visibility","visible");
    $("#FootprintAnalyze").css("top",(menuHeight * 3 + MenuMargin* 4 + menuHeight+ MenuMargin + subMenuHeight + MenuMargin).toString() + "px");
	
	$("#FootprintDownload").css("visibility","visible");
	$("#FootprintDownload").css("top",(menuHeight * 3 + MenuMargin* 4 + menuHeight+ MenuMargin + subMenuHeight*2 + MenuMargin*2).toString() + "px"); 
	
	$("#divFootprintLoad").css("visibility","hidden");
	$("#divFootprintAnalyze").css("visibility","hidden");
	
	$("#divFootprintDownload").css("visibility","visible");
	$("#divFootprintDownload").css("top",(menuHeight * 3 + MenuMargin* 4 + menuHeight+ MenuMargin + subMenuHeight*3 + MenuMargin*2).toString() + "px"); 
    
    
    divEditbar.style.visibility="visible";
    


}
				

	

