/**
 * Created by Sihua on 2016/11/19.
 */
onmessage=function (event) {
    var data=JSON.parse(event.data);
    var start=data.start;
    var end=data.end;
    var result="";
    for(var i=start;i<=end;i++){
        if(i%2==0){
            result+=(i+",");
        }
    }
    postMessage(result);
}
