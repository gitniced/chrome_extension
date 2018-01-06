function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);


// 跨域相关 permissions
function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

httpRequest('http://2017.ip138.com/ic.asp', function(res){
    var reg = /(?<=\[).*?(?=\])/
    var ip = res.match(reg);
    document.getElementById('ip_div').innerText = ip;
});


// 拓展js间的交互
chrome.runtime.sendMessage('Hello', function(res){
    document.getElementById('runtime_div').innerText = JSON.stringify(res);
})