---
layout: post
title: XcodeGhost 的警示，为何要使用 App Sandboxing 和 Gatekeeper
---

XcodeGhost 给我们带来的教训不止是要从正规的地方下载 Xcode，而是要尽可能只使用在 sandbox 中的（Mac App Store 上的应用都在 sandbox 里）应用。再不济也切记不要关闭 Gatekeeper。

<figure>
    <img alt="Activity Monitor" width="815" src="/static/images/xcodeghost/sandbox.png">
    <figcaption class="with-shadow">使用 Activity Monitor 可以查看一个进程是否在 sandbox 中。如果没有 Sandbox 列，请在表头处右键选中 Sandbox。</figcaption>
</figure>

## App Sandboxing

沙盒的重要性一直被远远低估。事实上，一个不在沙盒里的 app 不需要任何特殊权限，就可以操作当前用户可写的所有文件。假如你的 Xcode 是从官网下载并拖进 /Applications 里的，这个不在沙盒中的 app 就可以愉快地给你的 Xcode 干坏事。就算你的 Xcode 是从 MAS 安装的不可写，这个 app 也可以直接修改你的代码，植入恶意代码。除此之外，app 还可以访问你的所有照片和文件并上传到服务器。

而一个在沙盒中的 app 只能访问自己 container 中的文件和你要求它打开的文件 [^1]。

<figure>
    <img alt="Open Dialog" width="816" src="/static/images/xcodeghost/open-dialog.png">
    <figcaption class="with-shadow">对于一个 sandboxed app 来说，在你用 OS X 自带的打开对话框打开文件时，你就为它授予了读写这个文件的权限。</figcaption>
</figure>

## Gatekeeper

Gatekeeper 是 OS X 上用于筛查恶意软件的机制。Safari、Chrome、Firefox 等「正规」软件会为下载的文件添加 quarantine 属性。对于下载的带有 quarantine 属性的 app，Gatekeeper 会检查其数字签名，确保没有被篡改过。

<figure>
    <img alt="Activity Monitor" width="780" src="/static/images/xcodeghost/gatekeeper.png">
    <figcaption class="with-shadow">请<strong>一定</strong>不要选择第三项，第三项会关闭 Gatekeeper。</figcaption>
</figure>

<figure>
    <img alt="Activity Monitor" width="593" src="/static/images/xcodeghost/valid-sign.png">
    <figcaption class="with-shadow">这个对话框意味着 app 有数字签名且签名合法。</figcaption>
</figure>

<figure>
    <img alt="Activity Monitor" width="532" src="/static/images/xcodeghost/no-sign.png">
    <figcaption class="with-shadow">这个对话框意味着 app 无有效数字签名。</figcaption>
</figure>

虽然存在风险，但你至少可以确认有签名的 app 是签名者编写的且之后没有被篡改过。而一个没有签名的 app 可能被植入任何恶意代码而不被察觉，并且如之前所说，它有访问当前用户所有文件的权限。

### 重签名

Gatekeeper 虽然会检查 app 的数字签名，却没有告诉你签名者的信息。因此，坏人可以向 app 植入恶意代码并使用自己的证书重新签名。如果你极度重视安全，还可以用 `spctl -avv` 确认 app 的签名者就是开发者。

{% highlight bash %}
$ spctl -avv /Applications/Inboard.app
/Applications/Inboard.app: accepted
source=Developer ID
origin=Developer ID Application: Regular SIA (AN5MJ93DEM)
{% endhighlight %}

上面是用 `spctl -avv` 检查 Inboard.app 的结果。`accepted` 说明签名合法，`Regular SIA` 是 app 的签名者。**Regular SIA** 就是 Inboard 的开发商，所以该 app 没有被篡改过。

### 其他下载工具

经我测试，迅雷、wget、aria2c 等工具下载的文件都是不含有 quarantine 的。也就是说 Gatekeeper 即便打开也不会检查内容的数字签名。所以，对于使用第三方下载工具下载的 app，请一定要使用 spctl -avv 手动检查签名。

[^1]: 确切地说，sandboxed app 也可以[通过 entitlements 获取更多的权限](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/AppSandboxTemporaryExceptionEntitlements.html)。而 Apple 会严格审查上架 MAS 的 app，因此同样是启用了沙盒的 app，MAS 上的也更为安全。你可以通过 [SandboxInfo](http://sandboxinfo.paperpilots.com) 这个应用查看一个 sandboxed app 拥有的所有权限。
