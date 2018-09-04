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

var loginWidth = 750;
var loginHeight = 400;
var bottomHeight = 40;

function init() {

    $("#userID").val(""); //Clear Session objects
    
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
    
   $("#loginUser").css("position","absolute");
    $("#loginUser").css("visibility","hidden");
    $("#loginUser").css("left",(dbWidth - 100 + boundary).toString() + "px");
    $("#loginUser").css("top",(TopHeight - TopMenuHeight + margin*5 ).toString() + "px");
    $("#loginUser").css("width","80px");
    $("#loginUser").css("height",TopMenuHeight.toString());
    $("#loginUser").css("font","14px arial,serif");  
    $("#loginUser").css("color","#FFFFFF");
   
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
    
    $("#divLogin").css("visibility","visible");
    $("#divLogin").css("position","absolute");
    $("#divLogin").css("top",(TopHeight + mapsiteHeight + margin).toString() + "px"); 
    $("#divLogin").css("height", loginHeight.toString());
    $("#divLogin").css("backgroundColor","#E5E8C1");
    $("#divLogin").css("font","13px arial,serif");
    $("#divLogin").css("width",loginWidth.toString());   
    $("#divLogin").css("left",((wWidth - loginWidth)/2).toString() + "px"); 
    
    $("#divLoginContents").css("visibility","visible");
    $("#divLoginContents").css("position","absolute");
    $("#divLoginContents").css("top","20px"); 
    $("#divLoginContents").css("height", "450px");
    $("#divLoginContents").css("backgroundColor","#E5E8C1");
    $("#divLoginContents").css("width","750px");   
    $("#divLoginContents").css("left","0px");   
    $("#divLoginContents").css("border","1px solid #ff9900");

   
    $("#registerHint").css("visibility","visible");
    $("#registerHint").css("position","absolute");
    $("#registerHint").css("top","0px"); 
    $("#registerHint").css("left", "350px");
    $("#registerHint").css("width","400px");
    $("#registerHint").css("height", "300px");
    
    $("#errorLogin").css("visibility","hidden");
    
    $("#divBottom").css("visibility","visible");
    $("#divBottom").css("position","absolute");
    $("#divBottom").css("height",bottomHeight.toString());
    $("#divBottom").css("backgroundColor","#585858");
    $("#divBottom").css("font","13px arial,serif");
    $("#divBottom").css("border-radius","10px");
    $("#divBottom").css("top",(wHeight - bottomHeight - margin).toString() + "px"); 
    $("#divBottom").css("left", boundary.toString() + "px");
    $("#divBottom").css("width",dbWidth.toString());  
    
    $("#divBContent").css("visibility","visible");
    $("#divBContent").css("position","absolute");
    $("#divBContent").css("width","400px");
    $("#divBContent").css("height","20px");
    $("#divBContent").css("margin-top","10px");
    $("#divBContent").css("color","#FFFFFF");
    $("#divBContent").css("left",((dbWidth - 400)/2).toString() + "px"); 
	
	$("#divWhole").css("visibility","visible");
	$("#divWhole").css("height", wHeight.toString() + "px");
	$("#sitemapContent").html("<a href='index.php'>&nbsp&nbsp&nbsp&nbspHome</a> / Register");

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


function register(){

if($("#txtUser").val().trim().length < 3 || $("#txtUser").val().trim().length > 50) 
{ 
  $("#errorLogin").css("visibility","visible"); 
  $("#errorLogin").html("The user ID entered must be between 3 and 50 characters, and may contain letters, numbers, and/or the following special characters: - (dash), . (period), _ (underscore) or @.");
  return;

}

if($("#txtPassword").val().trim().length < 4 || $("#txtPassword").val().trim().length > 15 )
{

  $("#errorLogin").css("visibility","visible"); 
  $("#errorLogin").html("The password entered must be between 4 and 15 characters, and may contain letters, numbers, and/or the following special characters: - (dash), . (period), _ (underscore) or @.");
  return;
}   

if($("#txtPassword").val().trim() != $("#txtPassword2").val().trim())

{  $("#errorLogin").css("visibility","visible"); 
  $("#errorLogin").html("The password entered does not match the password confirm. Both fields must be identical.");
  return;
}

if($("#txtEmail").val().trim() == "")
{  $("#errorLogin").css("visibility","visible"); 
   $("#errorLogin").html("The email entered must not be blank.");
   return;
}

if($("#txtCom").val().trim() == "")
{  $("#errorLogin").css("visibility","visible"); 
   $("#errorLogin").html("The company entered must not be blank.");
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
  
  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState==4 && xmlhttp.status==200) {

       var strFeedback = xmlhttp.responseText;
       
       //alert(strFeedback);
       
       if(strFeedback == "YES") { $("#errorLogin").css("visibility","visible"); $("#errorLogin").html("The User ID entered has existed, please try another one.");}
       else if(strFeedback == "NO")  { $("#errorLogin").css("visibility","hidden"); window.open("http://footprintmonitoring.com/footprint/login.php","_self");}
       else {$("#errorLogin").css("visibility","visible");$("#errorLogin").html(strFeedback);;}
    }

  }
  
  xmlhttp.open("GET","php/createUser.php?p1="+$("#txtUser").val().trim() +"&p2=" + $("#txtPassword").val().trim() + "&p3=" + $("#txtCom").val().trim() + "&p4="+$("#txtEmail").val().trim() +"&p5=" + $("#txtTel").val().trim() + "&p6="+$("#txtComments").val().trim(),true);
  
  //alert("php/createUser.php?p1="+$("#txtUser").val().trim() +"&p2=" + $("#txtPassword").val().trim() + "&p3=" + $("#txtCom").val().trim() + "&p4="+$("#txtEmail").val().trim() +"&p5=" + $("#txtTel").val().trim() + "&p6="+$("#txtComments").val().trim());
  
  xmlhttp.send();
  
}

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function btn_over()
{
   $("#btnRegister").css("background-color","#F3EF29");
} 

function btn_out()
{
    $("#btnRegister").css("background-color","#E0F8E0");
}
