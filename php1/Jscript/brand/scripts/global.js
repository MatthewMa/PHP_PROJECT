// Global

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}


function highlightPage() {
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById("nav")) return false;
  var nav=document.getElementById("nav");
  var links=nav.getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    var link_url=links[i].getAttribute("href");
    var current_url=window.location.href;
    if(current_url.indexOf(link_url)!=-1) {
      links[i].className = "here";
      //set id for body
      var content = links[i].innerText.toLowerCase();
      document.body.setAttribute("id", content);
    }
  }
}

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function prepareSlideShow(){
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById("intro")) return false;
  var intro=document.getElementById("intro");
  var slideshow=document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var preview=document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  //frame
  var frame=document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(preview);
  slideshow.appendChild(frame);
  insertAfter(slideshow,intro);
  var links=intro.getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    links[i].onmouseover=function () {
      var dest=this.getAttribute("href");
      if(dest.indexOf("index.html")!=-1){
        moveElement("preview",0,0,5);
      }
      if(dest.indexOf("about.html")!=-1){
        moveElement("preview",-150,0,5);
      }
      if(dest.indexOf("photos.html")!=-1){
        moveElement("preview",-300,0,5);
      }
      if(dest.indexOf("live.html")!=-1){
        moveElement("preview",-450,0,5);
      }
      if(dest.indexOf("contact.html")!=-1){
        moveElement("preview",-600,0,5);
      }
    }
  }
}

/**
 * about page:selected section will show
 */
function prepareSection(){
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById("internalnav")) { return false};
  var intervalnav=document.getElementById("internalnav");
  var links=intervalnav.getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute("href");
    var hrefname=href.split("#")[1];
    if(!document.getElementById(hrefname)){
      continue;
    }
    document.getElementById(hrefname).style.display="none";
    links[i].destination=hrefname;
    links[i].onclick=function () {
      showSection(this.destination);
      return false;
    }
  }
}

function showSection(sectionId){
  var sections=document.getElementsByTagName("section");
  for(var i=0;i<sections.length;i++){
    var section=sections[i];
    if(section.getAttribute("id")==sectionId){
      section.style.display="block";
    }else{
      section.style.display="none";
    }
  }
}

function showPic(whichPic) {
  if(!document.getElementById("description"))
    return true;
  var txt=document.getElementById("description");
  txt.innerText=whichPic.getAttribute("title");
  var attr=whichPic.getAttribute("href");
  if(!document.getElementById("placeholder")){
    return true;
  }
  var placeholder=document.getElementById("placeholder");
  placeholder.setAttribute("src",attr);
  return true;
}

function preparePlaceHolder(){
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById("imagegallery")) return false;
  var imagegallery=document.getElementById("imagegallery");
  var placeholder=document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","My Image Gallery");
  var description=document.createElement("p");
  description.setAttribute("id","description");
  description.innerText="Please choose an image!";
  insertAfter(placeholder,imagegallery);
  insertAfter(description,placeholder);
}

function prepareGallery(){
  if(!document.getElementById) return false;
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById("imagegallery")) return false;
  if(!document.getElementById("placeholder")) return false;
  if(!document.getElementById("description")) return false;
  var imagegallery=document.getElementById("imagegallery");
  var links=imagegallery.getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute("href");
    links[i].onmousemove=function () {
      return showPic(this);
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}

function focusLabels(){
  if(!document.getElementsByTagName) return false;
  var labels=document.getElementsByTagName("label");
  for(var i=0;i<labels.length;i++){
    if(!labels[i].getAttribute("for")) continue;
    labels[i].onclick=function () {
      var id=this.getAttribute("for");
      if(!document.getElementById(id)) return false;
      var element=document.getElementById(id);
      element.focus();
    }
  }
}
//check form validity
function isFilled(field) {
  return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}

// Ajax

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
      catch (e) {}
      return false;
    }
  return new XMLHttpRequest();
}

window.onload=function () {
  highlightPage();
  prepareSlideShow();
  prepareSection();
  preparePlaceHolder();
  prepareGallery();
  displayAbbreviations();
  focusLabels();
  prepareForms();
}




