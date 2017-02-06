/**
 * Created by Sihua on 2017/1/31.
 */
function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var distx=Math.ceil((final_x-xpos)/10);
        xpos+=distx;
    }
    if (xpos > final_x) {
        var distx=Math.ceil((xpos-final_x)/10);
        xpos-=distx;
    }
    if (ypos < final_y) {
        var disty=Math.ceil((final_y-ypos)/10);
        ypos+=disty;
    }
    if (ypos > final_y) {
        var disty=Math.ceil((ypos-final_y)/10);
        ypos-=disty;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

function prepareMove(){
    var preview=document.getElementById("preview");
    preview.style.position="absolute";
    preview.style.left="0px";
    preview.style.top="0px";
    var links=document.getElementById("linklist").getElementsByTagName("a");
    links[0].onmouseover=function(){
      moveElement("preview",-100,0,10);
    };
    links[1].onmouseover=function(){
        moveElement("preview",-200,0,10);
    };
    links[2].onmouseover=function(){
        moveElement("preview",-300,0,10);
    };
}
window.onload=function () {
    prepareMove();
}