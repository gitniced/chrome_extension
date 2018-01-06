// 本地缓存localstorage
var city = localStorage.city || 'beijing';
document.getElementById('city').value = city;
document.getElementById('save').onclick = function(){
    localStorage.city = document.getElementById('city').value;
    chrome.notifications.create({}, function(){
        console.log()
    })
}

// chrome数据存储
chrome.storage.sync.set({array:[1,2,3,4]}, function(){
    chrome.storage.sync.get('array', function(result){
        console.log(result)
    })
    
})