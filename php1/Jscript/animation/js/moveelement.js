/**
 * Created by Sihua on 2017/1/31.
 */
function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        xpos++;
    }
    if (xpos > final_x) {
        xpos--;
    }
    if (ypos < final_y) {
        ypos++;
    }
    if (ypos > final_y) {
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement = setTimeout(repeat,interval);
}

window.onload=function () {
    if(!document.createElement) return false;
    var p=document.createElement("p");
    p.innerText="Hello,world and I will move";
    p.id="p";
    p.className="p";
    document.body.appendChild(p);
    p.style.left=50+"px";
    p.style.top=100+"px";
    moveElement("p",150,200,100);
}