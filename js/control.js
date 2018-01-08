// 窗体控制事件
var current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = function(){
    current_window.minimize();
}

document.getElementById('close').onclick = function(){
    current_window.close();
}
var webview = document.getElementById("foo");
console.log(webview);
webview.addEventListener('loadcommit', function() {
    webview.executeScript({ file: "main.js" });
});
