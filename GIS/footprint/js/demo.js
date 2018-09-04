var margin = 5;
var TopHeight = 90;

var wWidth;
var wHeight;
var menuHeight = 30;
var divHead;
var _user = ""; //current user

var ConfigureHeadColor = "#1D965D";

var dbWidth = 1000;
var dbHeight = 563;
var ScrollWidth = 15;
var boundary  = 0;

var TopMenuWidth = 500;
var TopMenuHeight = 50;
var mapsiteHeight = 40;

var demoWidth = 720;
var demoHeight = 450;

var bottomHeight = 40;

function init() {

  	if($("#userID").val().trim() != "") {
   	  $("#hrefLogin").html("Logout <font color='red'>" + $("#userID").val().trim() + "</font>");
    }
   	else
   	{
   	   $("#hrefLogin").html("Account Login");
   	}
	
	getSize(); //***Set the layout
	
    $("#divWhole").css("position","absolute");
	$("#divWhole").css("top", "0px");    
    $("#divWhole").css("left","0px"); 
    $("#divWhole").css("width", wWidth.toString() + "px");  
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
    
    $("#divBottom").css("left",(boundary).toString() + "px");
    $("#divBottom").css("width",dbWidth.toString());  
    $("#divBContent").css("left",((dbWidth - 400)/2).toString() + "px"); 
        
     //top Menu Setting
    $("#divSiteMap").css("visibility","visible");  //three buttons
    $("#divSiteMap").css("position","absolute");
    $("#divSiteMap").css("top",TopHeight.toString() + "px");
    $("#divSiteMap").css("height",mapsiteHeight.toString() + "px");
    $("#divSiteMap").css("backgroundColor","#E6E6E6");
    $("#divSiteMap").css("font","16px arial,serif");   
    $("#divSiteMap").css("left",(boundary).toString()+"px");
    $("#divSiteMap").css("width",dbWidth.toString());    	    
    $("#divSiteMap").css("border-radius","3px");
    
    $("#divDemo").css("visibility","visible");
    $("#divDemo").css("position","absolute");
    $("#divDemo").css("top",(TopHeight + mapsiteHeight + margin).toString() + "px"); 
    $("#divDemo").css("height",demoHeight.toString() + "px");
    $("#divDemo").css("backgroundColor","#E5E8C1");
    $("#divDemo").css("font","13px arial,serif");
    $("#divDemo").css("width",demoWidth.toString() + "px");   
    $("#divDemo").css("left",((wWidth - demoWidth)/2).toString() + "px");
    
    
    $("#divDemo2").css("border","1px solid #ff9900");
    
    $("#divBottom").css("visibility","visible");
    $("#divBottom").css("position","absolute");
    $("#divBottom").css("height",bottomHeight.toString());
    $("#divBottom").css("backgroundColor","#585858");
    $("#divBottom").css("font","13px arial,serif");
    $("#divBottom").css("border-radius","10px");
     
    $("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    $("#divWhole").css("height", wHeight.toString() + "px");
    
    $("#divBContent").css("visibility","visible");
    $("#divBContent").css("position","absolute");
    $("#divBContent").css("width","400px");
    $("#divBContent").css("height","20px");
    $("#divBContent").css("margin-top","10px");
    $("#divBContent").css("color","#FFFFFF");
	
	$("#divWhole").css("visibility","visible");
	$("#sitemapContent").html("<a href='index.php'>&nbsp&nbsp&nbsp&nbspHome</a> / Demo");

}

function getSize(){

	wWidth =window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	wHeight=window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
}

window.onresize = function(event) { //window size changed.
  
  
  var _LoginState =  $("#divLogin").css("visibility");
  
  init();
  
  if(_LoginState == "visible")
  {
  	$("#divLogin").css("visibility","visible");
   
  }
  
};

function demoRequest(){

if($("#txtUser").val().trim().length < 3 || $("#txtUser").val().trim().length > 50) 
{ 
  $("#errorLogin").css("visibility","visible"); 
  $("#errorLogin").html("The user ID entered must be between 3 and 50 characters, and may contain letters, numbers, and/or the following special characters: - (dash), . (period), _ (underscore) or @.");
  return;
}

if($("#txtCom").val().trim() == "")
{  $("#errorLogin").css("visibility","visible"); 
   $("#errorLogin").html("The company entered must not be blank.");
   return;
}

if($("#txtTel").val().trim() == "")
{  $("#errorLogin").css("visibility","visible"); 
   $("#errorLogin").html("The telephone number entered must not be blank.");
   return;
}

if($("#txtEmail").val().trim() == "")
{  $("#errorLogin").css("visibility","visible"); 
   $("#errorLogin").html("The email entered must not be blank.");
   return;
}

var email = $("input#txtEmail").val().trim() ;  
if (!validEmail(email)) {
    $("#errorLogin").css("visibility","visible"); 
    $("#errorLogin").html("The email address is not valid.");
    return;  
}  

if (window.XMLHttpRequest) {
    
    // code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();

  } else { // code for IE6, IE5

    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

  }
  
  xmlhttp.onreadystatechange=function() {

    if (xmlhttp.readyState==4 && xmlhttp.status==200) {

       var strFeedback = xmlhttp.responseText;
       
       $("#errorLogin").css("visibility","visible");
 	   $("#errorLogin").html(strFeedback);
 	   
    }

  }
  
  xmlhttp.open("GET","php/demoRequest.php?p1="+$("#txtUser").val().trim() +"&p2=" + $("#txtCom").val().trim() +"&p3=" + $("#txtTel").val().trim() +"&p4=" + $("#txtEmail").val().trim() +"&p5=" + $("#txtComment").val().trim(),true);
  
  alert("php/queryUser.php?p1="+$("#txtUser").val().trim() +"&p2=" + $("#txtCom").val().trim() +"&p3=" + $("#txtTel").val().trim() +"&p4=" + $("#txtEmail").val().trim() +"&p5=" + $("#txtComment").val().trim());
  
  xmlhttp.send();
  

}

function clickDemoReset()
{
    $("#txtUser").val("");
	$("#txtCom").val("");
	$("#txtTel").val("");
	$("#txtEmail").val("");
	$("#txtComment").val("");
}

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function btnSubmit_over()
{
   $("#btnSubmit").css("background-color","#F3EF29");
} 

function btnSubmit_out()
{
    $("#btnSubmit").css("background-color","#E0F8E0");
}

function btnReset_over()
{
   $("#btnReset").css("background-color","#F3EF29");
} 

function btnReset_out()
{
    $("#btnReset").css("background-color","#E0F8E0");
}	

	

