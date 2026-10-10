import type { Post } from "../types";

// ─── 为什么做 Digital Naturalism (Simplified Chinese translation) ────────────
// Source: D20261010-Why We Built Digital Naturalism.docx
// A translation of "why-we-built-digital-naturalism".
// Paragraph breaks and emphasis follow the manuscript's Chinese section exactly.
// The manuscript's italic subtitle is used as the excerpt (shown under the
// title), so it is not repeated as the first body paragraph.

export const post: Post = {
  slug: "why-we-built-digital-naturalism-zh",
  lang: "zh-Hans",
  translationOf: "why-we-built-digital-naturalism",

  title: "为什么做 Digital Naturalism",
  excerpt:
    "用今天的工具重走达尔文、华莱士和威尔逊的旅程，以及它为什么属于 SOS 教育。",
  cover: "/pics/digital_naturalism.jpg",
  coverAlt:
    "Digital Naturalism：航线地图和野外笔记，旁边是一台为蝴蝶翅膀做数字化拍摄的相机装置",
  date: "2026-10-10",
  authorId: "cong-liu",
  tags: ["education"],
  body: [
    {
      type: "paragraph",
      text: "我们刚刚把 Digital Naturalism 放上了 SOS 网站的教育页面。这是我做的一个交互地图网站，讲三段博物学史上的著名旅程：查尔斯·达尔文随“小猎犬号”的环球航行（1831–1836），阿尔弗雷德·拉塞尔·华莱士在亚马逊（1848–1852）和马来群岛（1854–1862）的考察，以及爱德华·O.威尔逊在二十世纪的野外工作。打开网站，你可以沿着航线一站一站地走，在每一站读到博物学家当年在那里看到了什么、采到了什么、想到了什么。这个项目我一直在业余时间做，这篇文章想说说我为什么做它，以及它为什么属于 SOS 教育。",
    },
    { type: "heading", text: "他们是怎么知道的", level: 2 },
    {
      type: "paragraph",
      text: "达尔文、华莱士和威尔逊改变了我们看待生命世界的方式。达尔文和华莱士各自想到了自然选择。华莱士还发现了亚洲动物和澳洲动物之间那条清晰的分界，也就是今天所说的华莱士线。威尔逊和罗伯特·麦克阿瑟一起，把对岛屿的观察变成了岛屿生物地理学理论，今天规划自然保护区时还在用它。",
    },
    {
      type: "paragraph",
      text: "我最感兴趣的，不是他们说对了什么，而是他们是怎么知道的。流行的说法是，达尔文在加拉帕戈斯群岛看到雀鸟，当场就想通了演化。实际的记录并不是这样。达尔文连大部分雀鸟采自哪个岛都没有记下来。在此之前，先有蓬塔阿尔塔的巨兽化石、安第斯山高处的贝壳化石，还有一场把智利海岸整体抬升的地震；真正的想法，是他回到伦敦之后才慢慢成形的。华莱士得出同样的结论时，既没有家底，也没有大学职位，更没有海军的船。他的旅费，是靠卖自己采集的标本一点点攒出来的。",
    },
    {
      type: "paragraph",
      text: "网站就是围绕这个推理过程设计的。在几个关键站点，学生要先给出自己的解释，然后才能看到博物学家当年的结论。比如，把蓬塔阿尔塔的巨兽化石和今天的动物配对；解释海拔 3,600 多米的山上为什么会有海贝；把巴厘岛和龙目岛的鸟分成亚洲和澳洲两组。答错了，网站不会只打一个叉，而是根据证据告诉你错在哪里。每一站还附有博物学家本人著作的原文链接，可以通过古登堡计划和 The Alfred Russel Wallace Page 免费阅读。另有一个页面专门讲三段旅程之间的联系：达尔文的游记促使华莱士出发；华莱士 1858 年从特尔纳特寄出的一封信，逼着达尔文出版了《物种起源》；一个世纪之后，威尔逊又把他们对岛屿的观察写成了方程。",
    },
    { type: "heading", text: "用今天的工具，继续向自然学习", level: 2 },
    {
      type: "paragraph",
      text: "在 SOS，我们常说一句话：持续向自然学习。当年的博物学家靠的是一枚放大镜、一张捕虫网和一本笔记本，今天我们手里的工具多得多。打开网站时，达尔文会对你说一段话，那是我替他写的：“有你现代的眼光，加上我泛黄的野外笔记，也许这一次，我们能一起找出我当年漏掉的线索。”这句话就是整个项目的核心想法。",
    },
    {
      type: "paragraph",
      text: "举一个例子：网站里的“今昔对照”。对于博物学家在某一站记下的物种，网站会去查全球生物多样性信息网络（GBIF，一个汇集全世界物种记录的开放数据库），看看这个物种今天是否还有人记录到。在福克兰群岛，达尔文遇到过福克兰群岛狼（warrah），样子像狐狸，温顺到人可以把它引到身边直接杀死。达尔文当时就预言它很快会消失。GBIF 上 2000 年以后再没有它的任何记录，这个物种在 19 世纪 70 年代就被捕杀殆尽了。对这些数字，我们读得很小心。记录的多少，主要反映有多少人去找过，所以它说明不了一个物种今天比达尔文那时更多还是更少；它能说明的，是这个物种今天还有没有人见到。学会连同数据的局限一起读数据，本身就是课程的一部分。",
    },
    {
      type: "paragraph",
      text: "同样的思路也贯穿在 SOS 的研究里。我们做了一套多光谱成像系统，可以在紫外、可见光和红外波段记录蝴蝶的翅膀，包括人眼看不到的颜色。博物馆的馆藏也在一批批数字化。威尔逊的很多标本保存在哈佛大学比较动物学博物馆，我目前就在那里做研究，网站可以直接链接到这些标本的馆藏记录。一件一百年前为某个目的采集的标本，今天可以回答采集者当年根本没想到要问的问题。",
    },
    {
      type: "paragraph",
      text: "我还觉得，用新工具重访这些站点，可能会改变重大发现产生的方式。在达尔文的时代，能不能有发现，很大程度上取决于谁能登上一条远航的船。今天，任何地方的学生都可以通过开放数据、博物馆记录和卫星地图研究同样的地方，再加上自己的新观察。如果很多人各自补上一块扎实的拼图，我相信我们能发现单靠一次远航发现不了的东西。",
    },
    { type: "heading", text: "为什么它属于 SOS 教育", level: 2 },
    {
      type: "paragraph",
      text: "SOS 教育的出发点是一句话：教育不应该停在学习，它应该通向真正的贡献。Digital Naturalism 站在这条路上“学习”的一端，同时指向“贡献”的一端。",
    },
    {
      type: "paragraph",
      text: "第一步，向那些伟大的航程学习。学生会看到，一个细心的观察者如何从一个规律出发，去找能解释它的机制。比如华莱士注意到，一道窄窄的海峡两边，鸟完全不一样，于是他开始追问原因。第二步，学会今天的工具：GBIF、博物馆数据库、数字化标本，以及我们“自然数字化”（Digitize Nature）方向教的成像和 AI 方法。第三步，做出贡献：重访一个站点、一件标本，或者家附近的一个地方，留下别人可以接着用的东西，比如一份数据集，或者一组新的观察记录。",
    },
    {
      type: "paragraph",
      text: "最后这一步并不需要一条船。每个地方都有前人走过、写过，记下过那里的草木鸟兽。以中国为例，徐霞客在十七世纪上半叶用三十多年游历了大半个中国，留下了详细的游记。学生可以把这样一段行程画成地图，鉴定古人文字里提到的物种，再和今天的记录对照，就像网站为达尔文做的那样。这正是我们希望和学生一起做的项目。我们一起来做吧。",
    },
    { type: "heading", text: "欢迎来试试", level: 2 },
    {
      type: "paragraph",
      text: "Digital Naturalism 免费使用，不需要注册账号，手机和平板上也能用，航程内容有中文和英文两个版本。网站的教师页面（For Educators，目前为英文）提供了三套现成的课程流程，每套大约 45 分钟。下一步，我正在准备第四段航程：玛丽亚·西比拉·梅里安 1699 年的苏里南之行，她去那里研究昆虫和它们赖以生存的植物。",
    },
    {
      type: "paragraph",
      text: "如果你是老师、学生或博物馆的工作人员，想用这个网站，或者想为家乡的某位博物学家做一段旅程，欢迎通过 SOS 网站联系我们。",
    },
    {
      type: "paragraph",
      text: "Digital Naturalism：<a href=\"https://www.digital-naturalism.com/\" target=\"_blank\" rel=\"noopener noreferrer\">digital-naturalism.com</a>",
    },
    {
      type: "paragraph",
      text: "教师页面（For Educators，三套课程流程）：<a href=\"https://www.digital-naturalism.com/educators\" target=\"_blank\" rel=\"noopener noreferrer\">digital-naturalism.com/educators</a>",
    },
    {
      type: "paragraph",
      text: "<a href=\"/education\">SOS 教育</a>",
    },
  ],
};
