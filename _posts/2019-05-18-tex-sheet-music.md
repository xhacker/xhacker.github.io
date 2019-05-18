---
layout: post
title: 给自己找不自在之用 TeX 排乐谱
---

最近在学钢琴。作为一个工具癖，琴可以不练好，乐谱一定要好看。找打谱软件的时候，我想到了万能的 T<span class="TeX-e">e</span>X。果然有个宏包 [MusiXT<span class="TeX-e">e</span>X](https://ctan.org/pkg/musixtex)。T<span class="TeX-e">e</span>X 打谱效果可能不好，但是难学啊！

这两天在练这首《妈妈您听我说》，就是《小星星变奏曲》的前身。谱是这个样子：

<img class="bordered" width="420" alt="《妈妈您听我说》琴谱照片" src="/static/images/tex-sheet-music/book.jpg">

我就尝试用 MusiXT<span class="TeX-e">e</span>X 排一下吧。

# 配置环境
我最喜欢的 T<span class="TeX-e">e</span>X 工具是 [Texpad](https://www.texpad.com) 的 Mac 版，这次决定试一下 iOS 版。在 **设置** → **包管理器** 里可以安装「Music」相关的宏包（包括了 MusiXT<span class="TeX-e">e</span>X）。用其他工具也一样，只要安装 MusiXT<span class="TeX-e">e</span>X 即可。

<img class="bordered" width="480" alt="安装「Music」相关的宏包（包括了 MusiXTeX）" src="/static/images/tex-sheet-music/install.png">

# 五线谱

下面这段代码生成两行的五线谱，2/4 拍：

{% highlight tex %}
\documentclass{article}
\usepackage{musixtex}
\begin{document}
    \instrumentnumber{1}
    \setstaffs1{2}
    \generalmeter{\meterfrac24}

    \startextract
    \zendextract
\end{document}
{% endhighlight %}

<img width="268" alt="空的五线谱" src="/static/images/tex-sheet-music/staffs.png">

# 音符

音符相对来讲复杂一些，放在 `\startextract` 和 `zendextract` 之间。可以用 `\Notes`、`\en` 等一系列宏用于调整其中音符的间距。实际上有一个叫做 `autosp` 的宏包可以自动调整间距，但 iOS 上不能随便装包，就不用了。

这里用前四个小节示例一下：
{% highlight tex %}
\startextract
    \Notes \ha{c}|\qa{j}\qa{j}\en\bar
    \Notes \ha{e}|\qa{n}\qa{n}\en\bar
    \Notes \ha{f}|\qa{o}\qa{o}\en\bar
    \NOTEs \ha{e}|\ha{n}\en\bar
\zendextract
{% endhighlight %}

`\ha` 和 `\qa` 是代表二分音符和四分音符的宏，`a` 代表符杆方向自动。`\ha` 宏里面包的 `{c}` 是音高。此外还有 `\wh`、`\ca`、`\cca` 等等分别代表全音符、八分音符、十六分音符。`\bar` 用来画小节线。竖线是用来跳到上面的五线谱的——比如第一行的 `\ha{c}` 画的是左下角的二分音符，`|` 之后是上面五线谱的第一小节。

<img width="568" alt="音符" src="/static/images/tex-sheet-music/notes.png">


# 连音线

`\islurd` 和 `\isluru` 分别用于画上面和下面的连音线。`\tslur` 用于结束连音线。语法是这样的：

`\islurd<连音线编号><连音线起始的音高>`
`\tslur<连音线编号><连音线终止的音高>`

编号让 `\tslur` 能结束正确的连音线。

这里加入了两条连音线：
{% highlight tex %}
\startextract
    \Notes \islurd0c\ha{c}|\isluru1j\qa{j}\qa{j}\en\bar
    \Notes \ha{e}|\qa{n}\qa{n}\en\bar
    \Notes \ha{f}|\qa{o}\qa{o}\en\bar
    \NOTEs \tslur0e\ha{e}|\tslur1n\ha{n}\en\bar
\zendextract
{% endhighlight %}

<img width="545" alt="连音线" src="/static/images/tex-sheet-music/slur.png">


# 渐强和渐弱

用 `\icresc` 标记起点，用 `\tcresc`（渐强）或 `\tdecresc`（渐弱）标记终点。由于我们想让渐强出现在两谱中间，要把终点再包在 `\cmidstaff` 里。同理，力度记号 `\p` 也可以包在 `\zmidstaff` 里。（`\lmidstaff`、`\cmidstaff` 和 `\zmidstaff` 的唯一区别是横向的位置。）

{% highlight tex %}
\startextract
    \Notes \zmidstaff{\p}\islurd0c\ha{c}\icresc|\isluru1j\qa{j}\qa{j}\en\bar
    \Notes \ha{e}|\qa{n}\qa{n}\en\bar
    \Notes \ha{f}\cmidstaff{\tcresc}|\qa{o}\qa{o}\en\bar
    \NOTEs \tslur0e\ha{e}|\tslur1n\ha{n}\en\bar
\zendextract
{% endhighlight %}

<img width="543" alt="渐强" src="/static/images/tex-sheet-music/hairpin.png">

# 完整的前八小节

主要的操作就这么多，还有一些其他宏可以绘制重复记号、重音记号、抬高连音线、去掉小节编号等等，用法都比较简单，不再赘述。那么，完整的前八小节如下（[下载 PDF](/static/images/tex-sheet-music/full.pdf)）：

{% highlight tex %}
\documentclass{article}

\usepackage{musixtex}
\usepackage{CJKutf8}

\begin{document}

\begin{CJK}{UTF8}{gbsn}
\title{用\TeX排乐谱《妈妈您听我说》}
\maketitle
\end{CJK}

\instrumentnumber{1}
\setstaffs1{2}
\generalmeter{\meterfrac24}
\nobarnumbers

\startextract
    \Notes \zmidstaff\p\islurd0c\ha{c}\icresc|\isluru1j\qa{j}\qa{j}\en\bar
    \Notes \ha{e}|\qa{n}\qa{n}\en\bar
    \Notes \ha{f}\cmidstaff{\tcresc}|\qa{o}\qa{o}\en\bar
    \NOTEs \tslur0e\ha{e}|\tslur1n\ha{n}\en\bar
    \Notes \icresc\islurd0d\ha{d}|\isluru1m\qa{m}\qa{m}\en\bar
    \Notes \qa{c}\qa{e}|\qa{l}\qa{l}\en\bar
    \Notes \ha{g}|\usf{k}\qa{k}\qa{k}\en\bar
    \NOTes \tslur0c\ha{c}\cmidstaff{\tdecresc}|\midslur4\tslur1j\ha{j}\en
    \rightrepeat
\zendextract

\end{document}
{% endhighlight %}

<img width="620" alt="完整的前八小节" src="/static/images/tex-sheet-music/full.png">

# 进阶或者放弃

可以看出这段代码不仅难写，可读性也极差，所以我放弃了。就排这么八小节吧。人生苦短，干点啥不好。如果你感兴趣，这里有 [MusiXT<span class="TeX-e">e</span>X 的完整文档](http://texdoc.net/texmf-dist/doc/generic/musixtex/musixdoc.pdf)（嗯，154页！）。

实际上，如果真要打谱，前 MusiXT<span class="TeX-e">e</span>X 开发者创建的 [LilyPond](http://lilypond.org/macos-x.html) 会是更好的选择。当然，LilyPond 也是基于代码的。
