function showPic(whichPic) {
    if(!document.getElementById("description"))
        return false;
    var txt=document.getElementById("description");
    txt.innerText=whichPic.getAttribute("title");
    var attr=whichPic.getAttribute("href");
    if(!document.getElementById("placeholder")){
        return true;
    }
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",attr);
}
window.onload=function () {
    if(!document.getElementById||!document.getElementsByTagName) return false;
    var p=document.createElement("p");
    p.setAttribute("id","description");
    p.style.position="relative";
    p.innerText="Please choose a picture:";
    document.body.appendChild(p);
    var img=document.createElement("img");
    img.setAttribute("src","images/placeholder.gif");
    img.setAttribute("alt","My Image Gallery");
    img.setAttribute("id","placeholder");
    document.body.appendChild(img);
    var as=document.getElementsByTagName("a");
    for(var i=0;i<as.length;i++) {
        as[i].onclick = function () {
            showPic(this);
            return false;
        }
    }
}