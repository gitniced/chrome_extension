// 窗体控制事件
var current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = function(){
    current_window.minimize();
}

document.getElementById('close').onclick = function(){
    current_window.close();
}

// 采用webview调用外网资源（运行环境为浏览器，chrome拓展部分的api禁止调用）
// var webview = document.getElementById("foo");
// console.log(webview);
// webview.addEventListener('loadcommit', function() {
//     webview.executeScript({ file: "main.js" },function(result){
//         if(chrome.runtime.lastError) {
//             // Something went wrong
//             console.warn("Whoops.. " + chrome.runtime.lastError.message);
//             // Maybe explain that to the user too?
//           } else {
//             // No errors, you can use entry
//           }
//     });
// });


// 用XMLHttpRequest加script （responseType为blob）
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");  
  console.log(this.response)
  script.setAttribute("src", window.URL.createObjectURL(this.response));  
  document.body.appendChild(script);
  script.onload=script.onreadystatechange=function(){  
    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){  
        var script2 = document.createElement('script');
        script2.setAttribute("type", "text/javascript");  
        script2.setAttribute("src", '../main.js');  
        document.body.appendChild(script2);
    }  
  }
};
xhr.send();



// 用XMLHttpRequest加载图片 （responseType为blob）
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ssl.gstatic.com/images/icons/gplus-16.png', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  var img = document.createElement('img');
  console.log(this.response)
  img.src = window.URL.createObjectURL(this.response);
  document.body.appendChild(img);
};

xhr.send();

// 在页面添加meta标签，设置 csp 允许加载外部资源