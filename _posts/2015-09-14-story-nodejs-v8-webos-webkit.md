---
layout: post
title: Node.js、V8、webOS 和 WebKit 的故事
---

<p class="comment">/* 这篇文章于一年多前写就，我也忘了是为什么写的了。没有什么主题，就是像讲故事一样随便聊聊 Node.js、V8、webOS 和 WebKit。*/</p>

「其实你们后端可以用 Express.js，这样就可以只用 JavaScript 一门语言了。」

「什么？JS 不是只能用在浏览器里么？」

我的小伙伴惊呼。其实，拜 Node.js 所赐，JavaScript 早已从一个只存在于浏览器里的语言变成了一门全端语言。Node.js 说简单一点，就是 JavaScript 加上一个额外的 runtime——这个 runtime 提供了操作 DOM 以外的能力，这样就能在浏览器之外用 JavaScript 了。那么，究竟为什么要给 JS 写这么个 runtime 呢？毕竟 JavaScript 是个 good parts 只有薄薄一册的语言，据说她老爸只花了一个星期设计。究其原因，是 Chrome 带来的 V8 引擎。Chrome 是 2008 年 Google 对浏览器重新思考的产物，Google 认为现有的 JavaScript 引擎都太慢了，不能满足自家的 Gmail、Maps 等应用的需求。于是一怒之下写出了 V8 引擎，将 JS 先编译为 machine code 再运行 [^1]，经过多年的优化已经达到了接近 C 语言的效率。Node.js 的作者 Ryan Dahl 忽然想到，这么碉堡的引擎光放在浏览器里岂不是太浪费了？不如拿出来写一些配套的模块，就可以开发服务器端应用了。

眼馋 V8 性能的不止 Ryan Dahl，Palm 曾经昙花一现的 webOS 也是基于 V8 引擎的。Palm 是曾经 PDA 和智能手机的老大哥，可是老旧的 Palm OS 逐渐赶不上互联网时代的变化。就在 iPhone 一代推出之际，他们也在准备自己全新的系统。新的系统代号 Prima，基于已经开发了几年的底层系统 Nova。然而，由于设计缺陷，系统很难实现华丽的 UI——设计师哪怕提出微小的改变，程序员也要花上很长时间实现。几个头头们灵光一闪，说我们不如直接用 HTML 和 JavaScript 构建 UI，HTML 的灵活性使得设计师甚至可以自己修改 UI。他们很快开始尝试，代号 Luna。这个想法在今天看来太正常不过，可在当时却是十分大胆，毕竟手机的性能大不如今。Palm 的高管决定赌一把，他们对 Luna 的团队说，你们放马去干，只是只有一个月时间。于是 Luna 团队如同公司里的创业公司，夜以继日，成品非常惊艳，只是性能不够。恰逢 Chrome 推出，Luna 团队看到了希望，他们用 V8 驱动整个 UI，性能和内存占用的问题迎刃而解[^2]。彼时 Google 也处于开发 Android 的关键阶段，Palm 的工程师只得化名在 Google 的邮件列表询问问题。其后 Matias Duarte 等人基于 Luna 实现了卡片式多任务等至今为人津津乐道的设计，之后的故事则无比伤感 [^3]。

Chrome 超高的效率一部分归功于 V8 引擎，一部分也要归功于 WebKit 内核。Google 的工程师也曾考虑过使用 Firefox 的 Gecko 内核，然而他们最终被 Android 团队说服采用了 WebKit。Android 团队说 WebKit 轻快、易扩展、代码结构清晰。WebKit 是 Safari 浏览器的内核，主要由苹果开发 [^4]，可能是苹果对开源界最知名的贡献。而 WebKit 也不是苹果从头写就，这就要说到 Safari 的早期开发过程。2003 年，体态依旧丰盈的乔布斯在 Macworld 上发布了 Safari。在说到采用的技术时，满场的人都在等待一个词，Gecko（Netscape 和 Firefox 采用的排版引擎）。可是屏幕上出现了另一个词——KHTML。据称当时场内爆出了「what the fuck!?」的声音 [^5]。KHTML 在 Linux 世界其实并不新鲜，是 KDE 采用的 HTML 渲染引擎。Safari 的负责人 Don Melton 之前曾在 Netscape 工作，更是参与了 Netscape 的开源过程 [^7]。这么一个熟悉 Gecko 的人居然选择了当时不如 Gecko 成熟的 KHTML，也是因为 KHTML 清晰的设计和精炼的代码 [^6]。Safari 和多年后的 Chrome 一样，第一要务是追求速度。Safari 团队为每个 commit 运行 benchmark，一旦速度有降低就要回炉重炼。在这样对速度的压榨下，苹果基于 KHTML、KJS 开发出 WebKit 并且开源。如今一去十年，我们看到 Don Melton 的决定无比正确，WebKit 更是出现在几乎每一个移动平台——iOS、Android、BlackBerry、以及其他。

[^1]: 参见 Google Chrome 发布时一同发布的漫画，[第 14 页](http://www.google.com/googlebooks/chrome/med_14.html)。
[^2]: 采用 webOS 的第一款手机 Palm Prē 只有 256 MB 内存，却可以流畅打开很多个基于 web 的卡片。
[^3]: The Verge 的长篇 [Pre to postmortem: the inside story of the death of Palm and webOS](http://www.theverge.com/2012/6/5/3062611/palm-webos-hp-inside-story-pre-postmortem) 详细讲述了 webOS 的兴衰。
[^4]: 随后 Google 日渐成为 WebKit 开发的主力，后来更是 fork 出自己的内核 Blink，与苹果分道扬镳。
[^5]: Don Melton 的博文 [Safari is released to the world](http://donmelton.com/2013/01/10/safari-is-released-to-the-world/)。
[^6]: Don Melton 在 Steve Jobs 发布 Safari 后，向 KDE 项目[发邮件](http://marc.info/?m=104197092318639)致谢。
[^7]: 2000 年的纪录片《[Code Rush](https://en.wikipedia.org/wiki/Code_Rush)》记载了这一过程。
