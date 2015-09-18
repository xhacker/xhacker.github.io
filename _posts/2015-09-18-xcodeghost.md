---
layout: post
title: XcodeGhost 的警示，App Sandboxing 和 Gatekeeper
---

XcodeGhost 给我们带来的教训不止是要从正规的地方下载 Xcode，而是要尽可能只使用在 sandbox 中的（Mac App Store 上的 app 都在 sandbox 里）app。再不济也切记不要关闭 Gatekeeper。

<figure>
    <img alt="Activity Monitor" width="815" src="/static/images/xcodeghost/sandbox.png">
    <figcaption>使用 Activity Monitor 可以查看一个进程是否在 sandbox 中。</figcaption>
</figure>

沙盒的重要性远远被低估了。事实上，一个不在沙盒里的 app 不需要任何特殊权限，就可以操作当前用户可写的所有文件。假如你的 Xcode 是从官网下载并拖进 /Applications 里的，这个不在沙盒中的 app 就可以愉快地给你的 Xcode 干坏事。就算你的 Xcode 是从 MAS 安装的不可写，这个 app 也可以直接修改你的代码，植入恶意代码。除此之外，app 还可以访问你的所有照片和文件并上传到服务器。

而一个在沙盒中的 app 只能访问自己 container 中的文件和你要求它打开的文件。

<figure>
    <img alt="Open Dialog" width="816" src="/static/images/xcodeghost/open-dialog.png">
    <figcaption>对于一个 sandboxed app 来说，在你用 OS X 自带的打开对话框打开文件时，你就为它授予了读写这个文件的权限。</figcaption>
</figure>

如果你一定要用一个不在沙盒中的 app，切记不要关闭 Gatekeeper（OS X 上用于检查 app 签名的机制），并确保该 app 有数字签名。

<figure>
    <img alt="Activity Monitor" width="780" src="/static/images/xcodeghost/gatekeeper.png">
    <figcaption>请<strong>一定</strong>不要选择第三项，第三项会关闭 Gatekeeper。</figcaption>
</figure>

<figure>
    <img alt="Activity Monitor" width="593" src="/static/images/xcodeghost/valid-sign.png">
    <figcaption>这个对话框意味着 app 有数字签名。<br>（Inboard 是在 sandbox 里的，请大家放心使用。）</figcaption>
</figure>

<figure>
    <img alt="Activity Monitor" width="532" src="/static/images/xcodeghost/no-sign.png">
    <figcaption>这个对话框意味着 app 无数字签名。</figcaption>
</figure>

虽然存在风险，但你至少可以确认这个 app 是签名者编写的且之后没有被篡改过。如果你信赖这个 app 的开发者，没问题。而一个没有签名的 app 可能被植入任何恶意代码，并且如之前所说，它有访问当前用户所有文件的权限。
