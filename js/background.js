// onLaunched 生命周期
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('../html/main.html', {
        'id': 'main',
        'bounds': {
            'width': 542,
            'height': 360
        },
        // 'resizable': false,
        'frame': 'none'
    })
})
// 媒体库
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('../html/media.html', {
        'id': 'media',
        'bounds': {
            'width': 800,
            'height': 600
        },
    })
})