---
layout: post
title: 什么时候不要对齐？
---

在 UI 设计中，一个重要的原则就是保持元素尽量整齐。然而，在有的应用场景我们应该尽可能不对齐。比如一个显示邮件内容和附件的介面，附件放在一个可以横向滑动的 view 里。

<figure>
    <img alt="Bad mail client example" width="300" src="/static/images/not-aligned/bad.png">
    <figcaption style="max-width: 400px;">坏的例子：整齐地显示了三个附件。乍一看很好，然而在附件多于三个的时候，用户可能不会意识到还有更多附件。</figcaption>
</figure>

<figure>
    <img alt="Good mail client example" width="300" src="/static/images/not-aligned/good.png">
    <figcaption style="max-width: 360px;">好的例子：（刻意）让第三个附件和右边缘保持距离。这样，有更多附件的时候就会露出一点。</figcaption>
</figure>

今天在用 Airmail 的时候漏看了两个附件，险些误事，有感而发。
