---
layout: post
title: 视网膜图片
---

之前注意到一个现象，在用「预览」打开 Retina 显示屏上的截图时，截图会以相同的物理尺寸显示。也就是说，一张实际分辨率为 800×600 的 Retina 显示屏上的截图，在 Retina 显示屏上会以 800×600 的物理分辨率显示，图片是完全清晰的。而在 1× 的显示器上，则会以 400×300 的物理分辨率显示。这个行为是非常理想的，因为我们希望图片的物理尺寸保持一致，不希望在 1× 设备上看到一张巨大的截图。

然而，对于一张自己制作的 2× 图片，情况就不那么理想——在所有显示器上，图片都会以两倍的物理尺寸显示，而且在 2× 显示器上是糊的。在预览中看了图片的属性后，我发现 Retina 显示屏截图的「图像 DPI」是「144 像素/英寸」，而一般的图片是「72 像素/英寸」。这个属性就决定了预览会用什么样的物理尺寸显示图片。

<figure>
    <img alt="一张 Retina 显示屏上的截图" width="354" src="/static/images/image-dpi.png">
    <figcaption>一张 Retina 显示屏上的截图</figcaption>
</figure>

那么，如何改这个值呢？如果你装了 ImageMagick（`brew install imagemagick`），如下命令可以把图片变成一张「视网膜图片」（144 像素/英寸）：

{% highlight bash %}
convert -density 144 -units pixelsperinch input.png output.png
{% endhighlight %}

这条命令不会改变图片的实际尺寸，只会影响软件默认怎样显示这张图片。

