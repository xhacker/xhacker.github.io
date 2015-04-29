---
layout: post
title: Quark Shell：用 HTML + JS 编写 Mac Menubar App
---

[Quark Shell](https://github.com/HackPlan/quark-shell-mac) 可以让你用 HTML 和 JavaScript 编写 Mac menubar app，有点像 Electron（原 Atom Shell）和 MacGap，但专注于 menubar app。

<img alt="Screenshot" width="455" src="/static/images/pomotodo-mac.png">

Quark Shell 通过一套非常简洁的 JavaScript API 提供系统功能，比如通知、修改 menubar 图标、设置自动启动。Quark Shell 还提供了一个原生的偏好设置面板，甚至可以添加 native 的快捷键录制组件。

API 大概长这样：

{% highlight js linenos=table %}
quark.setLabel("03:14 AM")
quark.setLaunchAtLogin(true)

quark.notify({
  title: "Test",
  content: "I am completely operational",
  time: "2038-01-19T03:14:07Z",
  popupOnClick: true
})
{% endhighlight %}

这个项目是一年前为了 Pomotodo for Mac 而开发的。当时 Pomotodo 只有我一个 Cocoa 开发者，但大多数人都会写 JavaScript。我自觉精力有限，于是就受到 MacGap 的启发开发了 Menubar WebKit，这样就可以直接把 Mac 版丢给其他人了😅。之后 [orzFly](https://orzfly.com) 基于相同的 API 和 Atom Shell 做出了 Windows 版，于是我们就改名叫 Quark Shell 了。

如果你想看看 Quark Shell 的实际效果，可以下载 [Pomotodo for Mac 或者 Windows](https://pomotodo.com/apps) 体验。相信大多数人看不出来这不是 native 的。:)
