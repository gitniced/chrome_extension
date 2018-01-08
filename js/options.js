// 本地缓存localstorage
var city = localStorage.city || 'beijing';
document.getElementById('city').value = city;
document.getElementById('music').value = 'Una Mattina.mp3';
document.getElementById('save').onclick = function(){
    localStorage.city = document.getElementById('city').value;
    chrome.notifications.create({
        type: "image",
        title: "主要标题",
        message: "要显示的主要消息",
        iconUrl: "images/icon1.png",
        imageUrl: "images/icon2.png",
        // progress: 44,
    }, function(id){
        setTimeout(function(){
            chrome.notifications.clear(id, function(){
                console.log('clear');
            })
        }, 2000)
    })
}

document.getElementById('download').onclick = function(){
    var url = 'http://113.215.224.116/file3.data.weipan.cn/45958533/81dc3ee49530a5b288765952ecf8b0a18b05e7eb?ip=1515378240,218.108.191.129&ssig=K83rKBU0wa&Expires=1515378840&KID=sae,l30zoo1wmz&fn=Una%20Mattina.mp3&skiprd=2&se_ip_debug=218.108.191.129&corp=2&from=1221134&wsrid_tag=5a52d192_PSzjhsgdtx113_5758-19032&wsiphost=local';

    chrome.downloads.download({
        url: url,
        filename: document.getElementById('music').value,
        conflictAction: 'uniquify',
        saveAs: false,
        method: 'GET',
        // headers: 自定义header数组,
        // body: POST的数据
    }, function(downloadId){
        console.log(downloadId);
    })
}
// chrome数据存储
chrome.storage.sync.set({array:[1,2,3,4]}, function(){
    chrome.storage.sync.get('array', function(result){
        console.log(result)
    })
    
})