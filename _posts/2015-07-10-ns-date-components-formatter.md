---
layout: post
title: 使用 NSDateComponentsFormatter 显示相对时间
---

**tl;dr:** 如果你想把「**66233**」转换为「**About 18h 24m remaining**」，使用 [NSDateComponentsFormatter](https://developer.apple.com/library/prerelease/ios/documentation/Foundation/Reference/NSDateComponentsFormatter_class/index.html)。

NSDateComponentsFormatter 可以把 NSTimeInterval 或者 NSDateComponents 转换为易读的形式，非常适合显示相对时间，在 iOS 8 / OS X Yosemite 之后可用。和水果的其他 API 类似，NSDateComponentsFormatter 提供了完整的本地化支持——比如，上例在中文环境会显示为「**大约还剩 18小时24分钟**」。

NSDateComponentsFormatter 有很多属性可以设置，比如：

* unitsStyle：设置单位的样式。比如 `.Abbreviated` 会显示为「**18h 24m**」，而 `.Full` 会显示为「**18 hours, 24 minutes**」。
* maximumUnitCount：设置最多显示几个单位。比如上例中 `maximumUnitCount` 是 2。
* includesApproximationPhrase：设置是否显示「About」。
* includesTimeRemainingPhrase：设置是否显示「remaining」。

完整的代码参考：

{% highlight swift %}
let formatter = NSDateComponentsFormatter()
formatter.unitsStyle = .Abbreviated
formatter.includesApproximationPhrase = true
formatter.includesTimeRemainingPhrase = true
formatter.maximumUnitCount = 2
print(formatter.stringFromTimeInterval(66233))
{% endhighlight %}

更多功能请参阅 [NSDateComponentsFormatter 文档](https://developer.apple.com/library/prerelease/ios/documentation/Foundation/Reference/NSDateComponentsFormatter_class/index.html)。
