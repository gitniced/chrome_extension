function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(true);
        }
    }
    xhr.onerror = function(){
        callback(false);
    }
    xhr.send();
}

// setInterval(function(){
//     httpRequest('http://www.google.com.hk/', function(status){
//         chrome.browserAction.setIcon({path: 'images/'+(status?'online.png':'offline.png')});
//     });
// },5000);

var imgList = [];
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message = 'Hello'){
        sendResponse(imgList);
    }
})


// 右键菜单
chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu A',
    id: 'a'
});

chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu B',
    id: 'b',
    checked: true
});

chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu C',
    id: 'c'
});

chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu D',
    id: 'd',
    checked: true
});

chrome.contextMenus.create({
    type: 'separator'
});

chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu E',
    id: 'e'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu F',
    id: 'f',
    parentId: 'a'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu G',
    id: 'g',
    parentId: 'a'
});

// 下载 标签注入js
chrome.contextMenus.create({
    type: 'normal',
    title: '保存所有图片',
    id: 'saveall',
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    chrome.browserAction.setIcon({path: 'images/'+(status?'online.png':'offline.png')});
    
    if(info.menuItemId == 'saveall'){
        chrome.tabs.executeScript(tab.id, {
            file: 'js/execute.js',
            allFrames: true,
            runAt: 'document_start',
            // code: 'document.body.style.backgroundColor="red"'
        }, function(results){
            imgList = results;
            if (results && results[0] && results[0].length){
                results[0].forEach(function(url) {
                    chrome.downloads.download({
                        url: url,
                        conflictAction: 'uniquify',
                        saveAs: false
                    });
                });
            }
        });
    }
});
