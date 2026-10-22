import type { Post } from "../types";

// ─── 清潔能源與荒漠生靈：從張掖的兔猻說起 (Traditional Chinese translation) ─
// Source: D20261022-Clean Energy and Desert Wildlife_ The Pallas's Cats of Zhangye.docx
// A translation of "clean-energy-and-desert-wildlife-pallass-cats-of-zhangye".
// The manuscript's Chinese section is in Simplified Chinese; it was converted
// to Traditional (Taiwan usage). Paragraph breaks, emphasis, and links follow
// it exactly. Figure 1 is the cover, credited in `coverCredit`.

export const post: Post = {
  slug: "clean-energy-and-desert-wildlife-pallass-cats-of-zhangye-zh",
  lang: "zh-Hant",
  translationOf: "clean-energy-and-desert-wildlife-pallass-cats-of-zhangye",

  title: "清潔能源與荒漠生靈：從張掖的兔猻說起",
  excerpt:
    "張掖北部荒漠的風電場與兔猻棲地重疊。怎樣才能讓解決一個環境問題的辦法，不帶來新的環境問題？",
  cover: "/pics/pallas-cat-zhangye.jpg",
  coverAlt: "兔猻特寫：一身毛尖發白的灰色厚毛，淡綠色的眼睛",
  coverCredit:
    "圖1　荷蘭鹿特丹動物園（Diergaarde Blijdorp）的兔猻。圖片：Spencer Wright，Creative Commons Attribution 2.0 Generic，來自維基共享資源。",
  date: "2026-10-22",
  authorId: "sos-foundation",
  tags: ["policy", "research"],
  body: [
    {
      type: "paragraph",
      text: "關於「可持續的可持續」的一點思考",
    },
    {
      type: "paragraph",
      text: "2026年10月，張掖北部荒漠中一座在建的風電場受到公眾關注。野生動物保護機構貓盟（CFCA）表示，他們的紅外相機多年來一直在這一帶拍到兔猻，部分風機點位與兔猻的棲息地重疊。當地生態環境部門則表示，開發案已依法履行審批程序，用地不在各級各類自然保護地和生態保護紅線範圍內，建設符合有關規定；同時已組織專家開展資料調查和生態影響研判，將充分吸納各方意見，採取切實有效措施，保護好該區域的野生動物。",
    },
    {
      type: "paragraph",
      text: "寫這篇文章，不是為了評判這個開發案。專家的研判還在進行，我們也沒有掌握全部情況。我們想寫這件事，是因為它觸及了我們基金會名字裡的問題，也就是「可持續的可持續」：怎樣才能讓解決一個環境問題的辦法，不帶來新的環境問題？我們也想借這個機會，介紹一種很多人並不熟悉的動物，和它生活的那片土地。",
    },
    { type: "heading", text: "看似空曠的荒漠裡住著誰", level: 2 },
    {
      type: "paragraph",
      text: "兔猻是一種小型野生貓科動物，個頭只比家貓大一點。它一身灰毛，毛尖發白，看上去像蒙了一層霜；腿短，臉扁，一對小耳朵長得很低，從石頭後面探頭張望時，幾乎不會暴露自己。和家貓不同，兔猻的瞳孔是圓的。分佈區裡有些地方冬季氣溫低至零下50攝氏度，它靠一身又厚又密的毛也能扛得住。白天，兔猻多躲在岩縫或旱獺的洞穴裡；從黃昏到清晨出來捕獵，主要吃鼠兔、沙鼠等小型哺乳動物，常常守在洞口伏擊。在開闊地上，它會貼著地面一動不動，看起來就像一塊灰色的石頭，以躲避草原雕等猛禽。",
    },
    {
      type: "paragraph",
      text: "兔猻生活在中亞寒冷的草原和荒漠裡，全世界一半以上的兔猻生活在中國。在全球範圍內，世界自然保護聯盟（IUCN）將它評為「無危」；在中國，兔猻是國家二級重點保護野生動物，《中國生物多樣性紅色名錄》將它列為瀕危。",
    },
    {
      type: "paragraph",
      text: "張掖北部的荒漠看上去空空蕩蕩，其實住著不少動物。貓盟從2021年起在這片荒漠裡用紅外相機、糞便鑑定和野外觀察調查兔猻。2022年，在約20平方公里的監測區內，紅外相機共拍到兔猻獨立影像351次，識別出12隻個體。貓盟據此估算，這裡的兔猻密度約為每100平方公里18隻，並認為這是國內已知的最高密度；其他分佈區報告的平均密度約為每100平方公里4到6隻。",
    },
    {
      type: "paragraph",
      text: "兔猻在這裡並不孤單。據貓盟介紹，他們在當地記錄到波斑鴇、黑鸛、草原雕、金雕、獵隼等7種國家一級保護動物，以及亞洲野貓、鵝喉羚、狼等28種國家二級保護動物。這些動物透過食物鏈相互聯繫：兔猻和同樣生活在這裡的赤狐都以小型鼠類為食，而草原雕這樣的大型猛禽，又是兔猻的天敵。",
    },
    {
      type: "paragraph",
      text: "這裡還有一些很重要、卻很容易被忽視的生命，就長在地表上。在很多荒漠裡，地表靠一層薄薄的「生物結皮」固定著。它由藍藻、地衣和苔蘚組成，既能防止土壤被風吹走，又能為土壤固氮。這裡還記錄到國家一級保護植物髮菜。髮菜是一種長在乾旱土壤上、形似頭髮的藍藻。",
    },
    { type: "heading", text: "清潔能源為什麼選在荒漠", level: 2 },
    {
      type: "paragraph",
      text: "風電和光電是中國和全世界減少碳排放的重要途徑。2026年7月發布的可再生能源發展「十五五」規劃提出，2026到2030年間在「三北」地區新增3.7億千瓦以上的風電與光電基地裝機，重點就在沙漠、戈壁和荒漠地區。原因不難理解：這些地方風大、日照足、人口少，在這裡建設也基本不佔用耕地。據貓盟統計，截至2024年6月，張掖北部荒漠已有471台風機，此外還有光電、煤礦和道路。這次受到關注的，是甘州區平山湖蒙古族鄉一個裝機10萬千瓦、共16台風機的風電開發案，它只是這一輪建設中很小的一部分。這些地方在地圖上看起來空空蕩蕩，其實是兔猻等動物的家園。隨著建設推進，摸清那裡生活著哪些動物就越發重要。",
    },
    { type: "heading", text: "研究能說明什麼，還不能說明什麼", level: 2 },
    {
      type: "paragraph",
      text: "在同一片荒漠裡，已經有學者研究過風電場與兔猻的關係。一個研究團隊在張掖164個點位佈設紅外相機，成果於2025年發表在《生物保護》（<em>Biological Conservation</em>）上。結果顯示，在風電場內，兔猻更多在夜間活動，獵物更少，與赤狐的食性重疊也更高。不過，這項研究沒有證明風電場導致兔猻離開或數量下降，研究中兔猻的記錄數量也不多。但這個現象仍然值得注意，因為生態學家在很多地方都看到過類似的規律：人類干擾往往對赤狐這類適應力強的「多面手」更有利，而兔猻這類守在洞口伏擊小型哺乳動物的「專才」，就得在行為上做出更大的調整才能適應。",
    },
    {
      type: "paragraph",
      text: "貓盟的監測記錄顯示，2022年之後兔猻明顯減少，2024年只識別出2隻，從2025年下半年開始又出現了恢復的跡象。貓盟認為，當地的風電建設、滅鼠等人類活動可能是原因之一，但這一點還沒有得到證實。可以確定的是，在這樣的地方，各種壓力會不斷疊加：風機、光電、礦山和道路，每一項都會佔去一點空間，帶來一點干擾。",
    },
    { type: "heading", text: "兩個容易被忽略的問題", level: 2 },
    {
      type: "paragraph",
      text: "作為生態學研究者，我們想補充兩點。談到在荒漠裡搞建設，這兩點很容易被忽略。",
    },
    {
      type: "paragraph",
      text: "<strong>第一，沒有看到，不等於不存在。</strong> 兔猻數量少，毛色和荒漠融為一體，又常常躲在岩縫和洞穴裡，調查人員很容易和它擦肩而過。假設在一個確實有兔猻生活的地點，調查隊每天能記錄到兔猻的機率是5%，那麼連續調查10天，一次都沒記錄到的機率仍有60%；調查30天，這個機率也還有約21%（圖2）。所以生態學家報告結果時，不只說「發現了什麼」，還要交代「花了多大力氣去找」。這也是長期監測格外寶貴的原因。無論是科研團隊、保護組織還是管理部門，讓紅外相機連續工作幾個月甚至幾年，都能讓稀有動物有更多機會被記錄下來。",
    },
    {
      type: "chart",
      chart: "detection-probability",
      caption: "圖2　短期調查為什麼容易漏掉稀有動物。本圖為示意，並非張掖開發案的實際資料。製圖：SOS 基金會。",
    },
    {
      type: "paragraph",
      text: "<strong>第二，荒漠受了傷，恢復得非常慢。</strong> 森林被砍出一片空地，幾年內就會開始重新長出植被，荒漠地表的生物結皮卻不一樣。重型車輛一旦壓碎這層結皮，它恢復得極慢。研究人員在美國莫哈韋沙漠調查過二戰時期軍事訓練留下的坦克車轍：大約55年後，車轍依然清晰可見，藍藻只恢復到未擾動地面的46%到65%，空曠地上的一些地衣恢復還不到10%。作者估計，如果按這個速度，完全恢復可能需要將近2000年（圖3）。",
    },
    {
      type: "chart",
      chart: "soil-crust-recovery",
      caption: "圖3　美國莫哈韋沙漠二戰坦克車轍內的生物結皮，受損約55年後的恢復程度。資料：Belnap & Warren (2002)。製圖：SOS 基金會。",
    },
    {
      type: "paragraph",
      text: "中國很早就吸取了這個教訓：2000年，國務院下令禁止採集和銷售髮菜，原因正是摟髮菜導致大片草場退化、沙化。對荒漠裡的工程建設來說，這個教訓的啟示是：要提前規劃。保護結皮最省力的辦法，是從一開始就少修路、縮小施工範圍。事後覆土、種草有幫助，但很難在短時間內恢復結皮和動物的洞穴，所以好的修復還要儘量恢復原有的棲息地結構和動物通道。",
    },
    { type: "heading", text: "加州的一個例子", level: 2 },
    {
      type: "paragraph",
      text: "世界各地都遇到過類似的問題。上世紀80年代至90年代初，美國加州舊金山以東的阿爾塔蒙特山口（Altamont Pass）建起了數千台小型風機，當時沒有充分考慮對鳥類的影響。2008年發表的一項研究估計，這些風機每年撞死約2700隻鳥，其中包括約67隻金雕。後來，風電營運商被要求拆除一批最危險的風機；據當地的鳥類監測估算，2005到2010年間，四種主要猛禽的死亡數量下降了大約一半。此後，許多老風機又被數量更少、單機容量更大的新風機取代，新風機避開了猛禽常常飛過的山脊邊緣和低矮埡口。正因為弄清了鳥類在哪裡生活、從哪裡飛過，這座風電場才能在繼續發電的同時，減少對鳥類的傷害。",
    },
    { type: "heading", text: "這件事為什麼和 SOS 有關", level: 2 },
    {
      type: "paragraph",
      text: "我們基金會的名字叫 Sustainability of Sustainability，意思是「可持續的可持續」。這個名字源於一個樸素的擔心：解決一個環境問題的辦法，可能帶來另一個環境問題。減少碳排放很緊迫，風電和光電是重要的解決辦法之一。問題不在於要不要建，而在於建在哪裡，以及如何在開工之前摸清那裡生活著哪些動物。",
    },
    {
      type: "image",
      src: "/pics/gansu-desert-wind-turbines.jpg",
      alt: "甘肅荒漠中一排風電機組",
      caption: "圖4　甘肅荒漠中的風電機組。圖片：Popolon，Creative Commons Attribution 2.0 Generic，來自維基共享資源。",
    },
    {
      type: "paragraph",
      text: "這在很大程度上是資料的問題。動物分佈的記錄和規劃用的地圖，往往是分開的。無論在中國還是其他國家，野生動物的長期記錄都分散在不同的科研團隊、保護組織和管理部門手裡，彙集起來需要下功夫。中國正在建設全國國土空間規劃「一張圖」，2019年中共中央、國務院印發的《關於建立國土空間規劃體系並監督實施的若干意見》也提出，要推進政府部門之間的資料共享以及政府與社會之間的資訊互動。細緻、長期的野生動物監測資料，很適合成為這類地圖上的一個圖層。這類資料越早進入規劃用圖，就越容易看清哪些地方應當避讓，哪些可以有條件建設，哪些需要嚴格控制。開放、共享的生物多樣性資料，正是 SOS 研究工作關注的方向，我們也希望在這方面出一份力。",
    },
    {
      type: "paragraph",
      text: "當地生態環境部門表示，專家正在開展資料調查和生態影響研判，我們期待看到結果。也希望更多人藉此認識張掖北部的這片荒漠：我們為清潔能源選擇的地方，很少是真正空無一物的；可持續的能源轉型，也需要給已經生活在那裡的動物留出空間。",
    },
    { type: "divider" },
    { type: "heading", text: "參考資料", level: 2 },
    {
      type: "paragraph",
      text: "貓盟 CFCA：調查資料、時間線與訴求（2026年10月1日，虎嗅轉載）：<a href=\"https://www.huxiu.com/article/4895081.html\" target=\"_blank\" rel=\"noopener noreferrer\">huxiu.com/article/4895081</a>",
    },
    {
      type: "paragraph",
      text: "財新：《張掖荒漠兔猻數量銳減 荒漠生態保護亟需關注》（2025年3月12日）：<a href=\"https://science.caixin.com/m/2025-03-12/102297207.html\" target=\"_blank\" rel=\"noopener noreferrer\">science.caixin.com</a>",
    },
    {
      type: "paragraph",
      text: "星島：《甘肅張掖風電場 被指危害兔猻棲地》（含貓盟在當地記錄的保護物種，2026年10月21日）：<a href=\"https://www.stheadline.com/zh-hans/realtime-china/3628280/%E7%94%98%E8%82%83%E5%BC%A0%E6%8E%96%E9%A3%8E%E7%94%B5%E5%9C%BA-%E8%A2%AB%E6%8C%87%E5%8D%B1%E5%AE%B3%E5%85%94%E7%8B%B2%E6%A0%96%E5%9C%B0\" target=\"_blank\" rel=\"noopener noreferrer\">stheadline.com</a>",
    },
    {
      type: "paragraph",
      text: "當地通報（新黃河報道，搜狐轉載，2026年10月20日）：<a href=\"https://www.sohu.com/a/1090029531_121347613\" target=\"_blank\" rel=\"noopener noreferrer\">sohu.com</a>",
    },
    {
      type: "paragraph",
      text: "張掖市政府：平山湖10萬千瓦風電開發案簽約（2025年4月）：<a href=\"https://www.zhangye.gov.cn/sswj/dzdt/gzdt/202504/t20250417_1389165_ghb.html\" target=\"_blank\" rel=\"noopener noreferrer\">zhangye.gov.cn</a>",
    },
    {
      type: "paragraph",
      text: "世界自然基金會（WWF）：“Meet the Pallas’s cat, a wild feline that doesn’t meow”（<em>World Wildlife</em> 雜誌，2026年秋季刊）：<a href=\"https://www.worldwildlife.org/news/magazine/fall-2026/meet-the-pallass-cat-a-wild-feline-that-doesnt-meow/\" target=\"_blank\" rel=\"noopener noreferrer\">worldwildlife.org</a>",
    },
    {
      type: "paragraph",
      text: "Live Science：兔猻的習性（2025年8月23日）：<a href=\"https://www.livescience.com/animals/cats/pallass-cat-one-of-the-worlds-oldest-felines-that-stands-on-its-bushy-tail-to-keep-its-paws-warm\" target=\"_blank\" rel=\"noopener noreferrer\">livescience.com</a>",
    },
    {
      type: "paragraph",
      text: "Dialogue Earth：中國的兔猻保護（2025年4月）：<a href=\"https://dialogue.earth/en/digest/death-of-viral-pallass-cat-sparks-conservation-debate/\" target=\"_blank\" rel=\"noopener noreferrer\">dialogue.earth</a>",
    },
    {
      type: "paragraph",
      text: "Qin, M. 等（2025），<em>Biological Conservation</em> 312: 111458：<a href=\"https://www.sciencedirect.com/science/article/abs/pii/S0006320725004951\" target=\"_blank\" rel=\"noopener noreferrer\">sciencedirect.com</a>",
    },
    {
      type: "paragraph",
      text: "可再生能源發展「十五五」規劃（China Energy Portal 英譯）：<a href=\"https://chinaenergyportal.org/15th-plan-for-renewable-energy-development/\" target=\"_blank\" rel=\"noopener noreferrer\">chinaenergyportal.org</a>",
    },
    {
      type: "paragraph",
      text: "《中共中央 國務院關於建立國土空間規劃體系並監督實施的若干意見》（2019年5月）：<a href=\"https://www.12371.cn/2019/05/24/ARTI1558651486476594.shtml\" target=\"_blank\" rel=\"noopener noreferrer\">12371.cn</a>",
    },
    {
      type: "paragraph",
      text: "Belnap, J. & Warren, S.D. (2002)，莫哈韋沙漠二戰坦克車轍的生態遺留，<em>Arid Land Research and Management</em> 16: 245–258：<a href=\"https://pubs.usgs.gov/publication/70024554\" target=\"_blank\" rel=\"noopener noreferrer\">pubs.usgs.gov</a>",
    },
    {
      type: "paragraph",
      text: "Belnap, J. (2003)，荒漠生物結皮綜述，<em>Frontiers in Ecology and the Environment</em> 1: 181–189：<a href=\"https://esajournals.onlinelibrary.wiley.com/doi/10.1890/1540-9295(2003)001%5B0181:TWAYFD%5D2.0.CO;2\" target=\"_blank\" rel=\"noopener noreferrer\">esajournals.onlinelibrary.wiley.com</a>",
    },
    {
      type: "paragraph",
      text: "《國務院關於禁止採集和銷售髮菜制止濫挖甘草和麻黃草有關問題的通知》（國發〔2000〕13號，2000年6月14日）：<a href=\"https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202307/t20230719_3165943.html\" target=\"_blank\" rel=\"noopener noreferrer\">beijing.gov.cn</a>",
    },
    {
      type: "paragraph",
      text: "Smallwood, K.S. & Thelander, C.G. (2008)，阿爾塔蒙特山口風電場鳥類死亡研究，<em>Journal of Wildlife Management</em> 72(1)：<a href=\"https://bioone.org/journals/journal-of-wildlife-management/volume-72/issue-1/2007-032/Bird-Mortality-in-the-Altamont-Pass-Wind-Resource-Area-California/10.2193/2007-032.short\" target=\"_blank\" rel=\"noopener noreferrer\">bioone.org</a>",
    },
    {
      type: "paragraph",
      text: "國際鳥盟（BirdLife International）：阿爾塔蒙特山口案例：<a href=\"https://datazone.birdlife.org/the-largest-wind-farm-in-the-world-impacts-birds-of-prey-in-california-usa\" target=\"_blank\" rel=\"noopener noreferrer\">datazone.birdlife.org</a>",
    },
    {
      type: "paragraph",
      text: "Golden Gate Bird Alliance：“Good news for birds at the Altamont wind farm”（2013年1月28日）：<a href=\"https://goldengatebirdalliance.org/blog-posts/good-news-for-birds-at-the-altamont-wind-farm/\" target=\"_blank\" rel=\"noopener noreferrer\">goldengatebirdalliance.org</a>",
    },
  ],
};
