

 function gv_wisdom(of){
	var es = document.cookie.indexOf(";",of);
	if(es==-1) es=document.cookie.length;
	return unescape(document.cookie.substring(of,es));
}
function getcookieval(n){
	var arg=n+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen){
	var j=i+alen;
	if(document.cookie.substring(i,j)==arg) return gv_wisdom(j);
	i=document.cookie.indexOf(" ",i)+1;
	if(i==0)	break;
	}
	return -1;
}

var sitecode = "396007fadd0fca6b"; 
var visitorid = sitecode + "-2016913143524294-" + Math.floor(Math.random()*100000000);
var visitTime = new Date();
var now = parseInt(visitTime.getTime());
var pcfristtoday = 0;

var visitor = getcookieval("multicounter_visitorid");
 
if (visitor==-1){
   visitor = visitorid;
}
var lasttime = parseInt(getcookieval("multicounter_" + sitecode + "_lasttime"));
var visitedtimes = parseInt(getcookieval("multicounter_" + sitecode + "_visitedtimes"));
var todayvtimes = parseInt(getcookieval("multicounter_" + sitecode + "_todayvtimes"));
if(lasttime==-1){ lasttime = now; pcfristtoday = 1; }
if(visitedtimes<1){ visitedtimes=1; pcfristtoday = 1; }
if(todayvtimes==-1){todayvtimes =1;}
if((now-lasttime)>1000*86400){
    visitedtimes++;
    lasttime = now;
    pcfristtoday = 1;
    todayvtimes = 1;
}
else{
  todayvtimes++;
} 

visitTime.setTime(now+1000*86400*182); 
if(todayvtimes<=50)
{
  document.write("<script language=javascript src=\"http://counter.seekic.com/counter.aspx?sitecode="+sitecode+"&visitor="+visitor+"&visitedtimes="+visitedtimes+"&pcfristtoday="+pcfristtoday+"&referrer="+escape(document.referrer)+"&visitpage="+escape(document.location.href)+"\"></script>"); 
}
document.cookie = "multicounter_visitorid="+visitor+";expires="+visitTime.toGMTString()+ ";path=/";
document.cookie = "multicounter_" + sitecode + "_lasttime="+lasttime+";expires="+visitTime.toGMTString()+ ";path=/";
document.cookie = "multicounter_" + sitecode + "_visitedtimes="+visitedtimes+";expires="+visitTime.toGMTString()+ ";path=/"; 
document.cookie = "multicounter_" + sitecode + "_todayvtimes="+todayvtimes+";expires="+visitTime.toGMTString()+ ";path=/"; 
