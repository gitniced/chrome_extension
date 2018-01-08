官方demo学习
======

参考 [官方文档](https://crxdoc-zh.appspot.com/extensions/getstarted) , [图灵文档](http://www.ituring.com.cn/book/miniarticle/60134)


本分支为 Chrome 应用

应用的runtime
------
* <strong>onInstalled</strong>  &nbsp;&nbsp;&nbsp;&nbsp;应用首次被安装或者更新到新版本时，会触发onInstalled事件

生命周期（app.runtime）
-------

* <strong>onLaunched</strong>  &nbsp;&nbsp;&nbsp;&nbsp;当用户运行应用，Event Page加载完成后，onLaunched事件就会被触发
* <strong>onSuspend</strong>  &nbsp;&nbsp;&nbsp;&nbsp;这个事件可以提醒应用的后台脚本应用即将被关闭

窗口事件
-------
应用窗口有6种事件，其中有4种用于监听窗口状态，分别是  <code> onFullscreened </code>、<code> onMaximized </code>、<code> onMinimized </code>和<code> onRestored </code>，另外两种事件一个用于监听窗口尺寸变化<code> onBoundsChanged </code>，另一个用于监听窗口被关闭<code> onClosed </code>


内容安全策略
======
新版本不支持沙盒执行，使用webview代替，
可以注入 js,css 但是要注意监听 Dom Event 在加载完成后注入