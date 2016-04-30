---
layout: post
title: LLVM 和 Program Analysis 杂想
---

之前一直在吐槽 LLVM 后端混乱的架构。比如三万多行的文件、调来调去的各种模块。后来又想想，编译器这种东西的固有复杂度就在那里，也许对于这样一个项目，理想中的的最佳架构也比现在好不上多少。何况如我之前所说 [^1]，在高速发展的今天，一个软件系统停下来修 bug 尚且不能，更别提重构这种没有实质意义的事了。LLVM 圈里的人有足够多的 domain knowledge，可以理清这些头绪。LLVM 外面的人，who cares。

*And it works.*

这学期还学了 [CMPT 479](http://www2.cs.sfu.ca/~wsumner/teaching/886/16/)，主要关于 program analysis。深切认识到我们赖以生存的基础设施质量之差。但凡提出一个新的分析方法，都能找到一坨一坨的 bug。不禁让人思考，在一个复杂软件系统中，实际究竟有多少 bug。答案可能是天文数字。就连 LLVM、GCC 这种基础中的基础，都脆弱得不堪一击 [^2]。

*But it works.*

但我们就在这豆腐渣一般的地基上盖楼。又在摇摇欲坠的楼上再盖上上层建筑。我们就生活在那房顶上，浑然不知。真是工程学的奇迹。

479 是我来 SFU 之后收获最大的一门课，[Nick Sumner](http://www.cs.sfu.ca/~wsumner/) 学识广博、讲课风趣易懂。虽然我作业和 project 都没好好做，但某天晚上连读十几篇 paper 几乎不想睡觉，居然产生了想改行做 research 的幻觉。但是，no，我真的一分钟都不想再上学了。这学期之前的其他课，说老实话，没学到什么东西。

朝闻道，夕毕业可矣。

[^1]: [精工细作](http://blog.xhacker.im/2015/01/21/craftsman.html)
[^2]: Yang, Xuejun, et al. "[Finding and understanding bugs in C compilers](https://www.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf)." *ACM SIGPLAN Notices*. Vol. 46. No. 6. ACM, 2011.
