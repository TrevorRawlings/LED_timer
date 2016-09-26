

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


addLoadEvent(function() {
    var time = 0;
    if (typeof st != "undefined") { time = new Date().getTime() - st.getTime(); }
    $.post("/stat.aspx?url=" + encodeURIComponent(window.location) + "&rurl=" + encodeURIComponent(top.document.referrer) + "&time=" + time + "&t=" + new Date().getTime());
});