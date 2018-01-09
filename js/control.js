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


// 读取文件
// chrome.fileSystem.chooseEntry({type: 'openFile'}, function(fileEntry){
//     fileEntry.file(function(file){
//         var reader = new FileReader();
//         reader.onload = function(){
//             var text = this.result;
//             console.log(text);
//         }
//         reader.readAsText(file);
//     });
// });


// 遍历目录
var loopEntriesButton = document.getElementById('le');

loopEntriesButton.addEventListener('click', function(e) {
    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry) {
        document.getElementById('loopEntry').innerText = Entry.fullPath;
        getSubEntries(0, Entry, document.getElementById('loopEntry'));
    });
});

// 递归获取子目录 
function getSubEntries(depth, Entry, parent){
    var dirReader = Entry.createReader();
    dirReader.readEntries(function(Entries) {
        for(var i=0; i<Entries.length; i++){
            var newParent = document.createElement('div');
            newParent.id = Date.now();
            newParent.innerText = echoEntry(depth+1, Entries[i]);
            parent.appendChild(newParent);
            if(Entries[i].isDirectory){
                getSubEntries(depth+1, Entries[i], newParent);
            }
        }
    }, errorHandler);
}
// 例：
// ├── config                      // 配置
// │   ├── default.json
// │   ├── dev.json                // 开发环境
// │   ├── experiment.json         // 实验
// │   ├── index.js                // 配置控制
// │   ├── local.json              // 本地
// │   ├── production.json         // 生产环境
// │   └── test.json               // 测试环境
// ├── data
// ├── doc                         // 文档
// ├── environment

function echoEntry(depth, Entry){
    var tree = depth > 1 ? '│ ' : '├──';
    for(var i=0; i<depth-1; i++){
        tree += ' ─';
    }
    return (tree+' '+ Entry.name);
}

function errorHandler(e){
    console.log(e.message);
}


// 创建，删除目录 exclusive存在返回错误
// chrome.fileSystem.chooseEntry({type:'openDirectory'}, function(Entry){
//     Entry.getDirectory('new_folder', {create: true, exclusive: true}, function(sunEntry){
//     }, errorHandler);
// })

// chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry) {
//     Entry.getDirectory('new_folder', {}, function(subEntry) {
//         subEntry.remove(function(){
//             console.log('Directory has been removed.');
//         }, errorHandler);
//     }, errorHandler);
// });

// // 文件另存为
// chrome.fileSystem.chooseEntry({type:'saveFile', suggestedName: 'README.md'}, function(Entry){

// });

// 创建，删除文件
// chrome.fileSystem.chooseEntry({type:'openDirectory'}, function(Entry){
//     if(chrome.runtime.lastError){
//         console.warn('Wooops...' + chrome.runtime.lastError.message);
//         return ;
//     }
//     Entry.getFile('log.txt', {create: true, exclusive: true}, function(sunEntry){
//     }, errorHandler);
// })

// chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry) {
//     Entry.getFile('log.txt', {}, function(fileEntry) {
//         fileEntry.remove(function(){
//             console.log('File has been removed.');
//         }, errorHandler);
//     }, errorHandler);
// });


// 全部删除
// chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry) {
//     Entry.getDirectory('new_folder', {}, function(subEntry) {
//         subEntry.removeRecursively(function(){
//             console.log('Directory has been removed.');
//         }, errorHandler);
//     }, errorHandler);
// });

// 文件写入
// chrome.fileSystem.chooseEntry({
//     type: 'saveFile',
//     suggestedName: 'log1.txt'
// }, function(fileEntry) {
//     fileEntry.createWriter(function(fileWriter) {
//         fileWriter.write(new Blob([
//             `├── config                      // 配置\r
// │   ├── default.json\r
// │   ├── dev.json                // 开发环境\r
// │   ├── experiment.json         // 实验\r
// │   ├── index.js                // 配置控制\r
// │   ├── local.json              // 本地\r
// │   ├── production.json         // 生产环境\r
// │   └── test.json               // 测试环境\r
// ├── data\r
// ├── doc                         // 文档\r
// ├── environment`
//         ], {type: 'text/plain'}));
//     }, errorHandler);
// }); 