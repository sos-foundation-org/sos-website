import type { Post } from "../types";

// ─── Ecotone：在各種多樣性中，探索理解人類與自然的交界帶 (Traditional Chinese) ─
// Source: D20261125-Ecotone.docx (Chinese section).
// A translation of "ecotone-where-humans-and-nature-meet".
// Text follows the manuscript; the series name is written "Ecotone" throughout,
// as on the event site. Layout follows the house style: the opening line is an
// italic standfirst, and each two-part heading is split into a short section
// heading and an italic dek. The closing call for speakers and the two links
// were added at Ping's request.

export const post: Post = {
  slug: "ecotone-where-humans-and-nature-meet-zh",
  lang: "zh-Hant",
  translationOf: "ecotone-where-humans-and-nature-meet",

  title: "Ecotone：在各種多樣性中，探索理解人類與自然的交界帶",
  excerpt:
    "Ecotone 系列演講第一場：當生態學、文學、歷史與地景設計相遇，我們如何在多樣性之中，練習理解彼此與其他生命？",
  cover: "/pics/ecotone-2026-cover.jpg",
  coverAlt: "Ecotone 演講現場：講者站在投影幕旁，台下參與者坐在桌前聆聽",
  coverCredit: "攝影：SOS Foundation",
  date: "2026-11-25",
  authorId: "sos-foundation",
  tags: ["education", "field-notes"],
  body: [
    {
      type: "paragraph",
      text: "<em>從一場演講到一個持續性的共學平台</em>",
    },
    {
      type: "paragraph",
      text: "從最初的活動網頁設計、議題規劃與演講形式，到最後決定將這次活動定位為 Ecotone 系列演講的第一場，我們在籌備過程中進行了許多新的嘗試。這個決定很大程度上受到王鼎涵、孫烜駿、詹偉平、顏訥，以及來自新加坡的地景設計團隊 SALAD dressing 的鼓勵。他們對跨領域交流的期待與投入，讓我們開始思考如何將一次性的活動發展成一個持續性的共學平台。",
    },
    {
      type: "paragraph",
      text: "Ecotone 在生態學中指的是不同生態系統之間的交界與過渡地帶。在這些地方，不同生態系統彼此接觸、交互作用，形成獨特的生態關係與多樣性。我們希望將這個概念延伸至人類的知識體系與社會，探索不同領域、文化與價值觀相遇時，能夠產生什麼樣的新理解與合作機會。",
    },
    {
      type: "paragraph",
      text: "因此，這次活動在演講形式上也進行了一些不同於傳統學術演講的嘗試。我們鼓勵每一位參與者，不論是講者還是聽眾，都能運用各自的專業背景、知識訓練與生命經驗提出問題，也可以從自己的角度協助講者回答問題。與其說這是一系列演講，不如說是一場由所有參與者共同形塑的大型討論與共學活動。講者不一定是唯一能夠回答問題的人，聽眾也不只是知識的接收者，彼此的角色可以隨著討論自然地轉換。",
    },
    {
      type: "paragraph",
      text: "我們希望這樣的交流能夠跨越不同的界線，包括老師與學生、講者與聽眾、不同世代與專業資歷，以及自然科學、人文與社會科學之間的學科差異。來自不同地區、學校、國家與文化背景的參與者，也各自帶著不同的生活經驗與思考方式。語言同樣是其中重要的一環，無論是英語、華語、閩南語或客語，我們希望這些差異不只是溝通上的挑戰，也能成為拓展彼此理解的機會。",
    },
    {
      type: "paragraph",
      text: "跨領域交流不只是將不同背景的人聚集在一起。我們希望參與者首先能夠親身經歷多樣性，進而練習如何在多樣性之中溝通，最後嘗試站在彼此的角色與視角下思考問題，探索共同研究與合作的可能性。",
    },
    { type: "heading", text: "從自然科學到人文", level: 2 },
    {
      type: "paragraph",
      text: "<em>我們如何理解其他生命？</em>",
    },
    {
      type: "paragraph",
      text: "孫烜駿老師從埋葬蟲的研究出發，介紹如何透過形態性狀（morphological traits）、生理性狀與行為的量測，理解生物個體、群體與環境之間的關係。從埋葬蟲的合作繁殖（cooperative breeding）、親代與子代的品質，到環境條件對這些關係的影響，這些研究讓我們得以跨越不同的生物組織尺度，思考個體性狀、集體行為與繁殖結果之間的交互作用。",
    },
    {
      type: "paragraph",
      text: "詹偉平則從夜間人工光源（Artificial Light at Night, ALAN）對蛾類的影響出發，探討人類所創造的光環境如何影響其他生物。人工照明是現代都市生活中再平常不過的一部分，但對於具有不同感知系統的生物而言，卻可能意味著截然不同的環境變化。人類所認為的便利與進步，在其他物種的感知世界中究竟代表什麼？",
    },
    {
      type: "paragraph",
      text: "如果說自然科學透過觀察、量測與實驗，試圖理解其他生命及其所處的環境，那麼人類是否也曾透過其他方式，探索不同生命之間的關係？",
    },
    {
      type: "paragraph",
      text: "顏訥從文學與歷史文獻出發，帶領我們討論古代文獻中的「化生」概念，而台下參與者也進一步提出了「化身」的問題。兩者在中文語境中的差異，以及與英文 metamorphosis 等概念之間的關係，引發了關於生命形體轉換的討論。當一個生命轉變成另一種形體時，究竟是什麼發生了改變？過去的人又是如何理解這樣的轉變？",
    },
    {
      type: "image",
      src: "/pics/ecotone-2026-na-yen-haicuo-tu.jpg",
      alt: "顏訥手持麥克風講解，身後投影片是《海錯圖》中虎鯊化生為虎的圖文",
      caption: "顏訥介紹《海錯圖》中「虎鯊化生為虎」的記載。攝影：SOS Foundation。",
    },
    {
      type: "paragraph",
      text: "在某些歷史與文化脈絡中，形體並不一定是固定不變的存在，而可能是能量的不同表現形式。人、動物、植物，甚至不同物體之間，都可能透過形體的轉換而產生連結。這樣的世界觀與現代人習慣用來區分不同生命與物質的方式，有著相當有趣的差異，也提供了另一種思考生命關係的途徑。",
    },
    { type: "heading", text: "知識、證據與理解世界的局限", level: 2 },
    {
      type: "paragraph",
      text: "顏訥的分享中，另一個令人印象深刻的部分，是古人如何建立與驗證知識。過去的人在記錄這些現象與案例時，並非全然依靠想像或傳聞。在當時的知識體系中，許多記錄同樣經過嚴謹的考察、辨證與驗證。這些建立知識的過程，在某些層面上與現代科學有著相似之處。",
    },
    {
      type: "paragraph",
      text: "這也引發了現場參與者進一步的哲學討論：我們對科學的信任，是否也包含某種程度的信仰或選擇？不同時代的人可能都透過自己所認為嚴謹的程序建立知識，並根據當時所能取得的證據，決定相信什麼，以及如何解讀這個世界。",
    },
    {
      type: "paragraph",
      text: "以鬼怪的存在為例，現代科學尚未有可靠的證據證實這類現象。但作為一個思想實驗，假如一百年或兩百年後，人類發展出新的感知技術與知識體系，甚至發現某些今日尚無法理解的現象，未來的人是否可能驚訝於我們竟然對這些現象一無所知？我們今日所引以為傲的科學知識，在未來的人眼中，又會呈現出什麼樣的局限？",
    },
    {
      type: "paragraph",
      text: "這樣的討論並不是要證明鬼怪的存在，也不是要否定現代科學的價值，而是讓我們重新思考知識、證據與認知之間的關係。不同知識體系的驗證方法與證據強度未必相同，但理解它們形成的歷史背景與思考邏輯，仍然具有價值。",
    },
    {
      type: "paragraph",
      text: "我們不需要說服任何人接受特定的世界觀，也不必急於對這些問題形成共識。能夠提出這些問題，重新檢視自身的認知框架，並對尚未理解的事物保持開放與好奇，本身就是跨領域交流的重要收穫。",
    },
    { type: "heading", text: "從泛靈思想到地景設計", level: 2 },
    {
      type: "paragraph",
      text: "<em>讓其他生命的視角進入人類世界</em>",
    },
    {
      type: "paragraph",
      text: "如果說顏訥的分享讓我們重新思考不同文化與歷史脈絡下，人類如何理解生命及其形體，那麼來自新加坡的 SALAD dressing，則進一步將這些思考帶入當代的城市化、建築與地景設計。",
    },
    {
      type: "paragraph",
      text: "黃美娜從自身的成長經驗出發，分享了她對泛靈思想（animism）的理解。她在婆羅洲長大，家中經營林場，森林與人類之間的關係對她而言，不只是一個研究或設計上的議題，更是與自身生命經驗密切相關的事情。這樣的背景讓她對泛靈思想有著深刻的感觸，也讓她的分享具有不同於純粹理論探討的深度與說服力。",
    },
    {
      type: "paragraph",
      text: "透過泛靈思想，我們得以重新思考人類與森林、植物、動物及其他自然存在之間的關係，以及這樣的世界觀能夠為當代城市化帶來什麼樣的啟發。其中一句令人印象深刻的話是 <em>Waiting is praying</em>，等待，也是一種祈禱。在一個習慣追求效率、控制與立即成果的社會中，等待或許也是一種讓人類重新學習與自然相處的方式，為其他生命保留時間與空間，讓牠們依循自己的節奏發展。",
    },
    {
      type: "quote",
      text: "Waiting is praying，等待，也是一種祈禱。",
    },
    {
      type: "paragraph",
      text: "何欣蕊與吳煜涵則透過 <em>The Unpleasant Necessity</em> 的主題與一系列地景設計案例，進一步呈現如何將對其他生命的理解轉化為實際的設計。他們嘗試重建那些已經消失或逐漸減少的物種曾經創造的微棲地（microhabitats），並將這些微棲地融入人類所設計的空間之中。",
    },
    {
      type: "paragraph",
      text: "例如，大象行走時在泥地上留下的腳印，可能形成積水的凹陷，成為其他小型生物生存與繁殖的空間；某些鳥類在樹木上啄出的洞穴，也可能成為其他生物棲息、繁殖或躲避天敵的場所。當這些物種的族群逐漸減少時，受到影響的不只是牠們本身，也包括牠們透過日常活動所創造的生態空間，以及其他依賴這些空間而生存的物種。",
    },
    {
      type: "image",
      src: "/pics/ecotone-2026-salad-unpleasant-necessity.jpg",
      alt: "投影片 The Unpleasant Necessity 不悅之美，六張照片分別是樹洞、水窪、落葉層、單寧、泥浴與礦物舔食處",
      caption: "SALAD dressing 簡報中的 The Unpleasant Necessity（不悅之美）：樹洞、水窪、泥浴等由其他生物創造的微棲地。攝影：SOS Foundation。",
    },
    {
      type: "paragraph",
      text: "這些案例提醒我們，生物不只是棲地的使用者，也是棲地的創造者。物種的消失可能伴隨著生態功能與物種間交互作用的消失，而這些變化往往不容易被人類直接察覺。透過將腳印、樹洞等微棲地重新融入地景設計，SALAD dressing 嘗試為其他生物創造生存與繁衍的機會，也讓人類有機會重新認識這些隱藏在環境之中的生態關係。",
    },
    {
      type: "paragraph",
      text: "從黃美娜對泛靈思想的探討，到何欣蕊與吳煜涵的地景設計實踐，我們看見了哲學思考如何逐漸轉化為具體的空間設計。這些分享也與顏訥所討論的化生、化身及形體轉換形成了有趣的呼應。文學透過敘事與想像，讓人類有機會進入其他生命的世界；地景設計則透過實際的空間與感官經驗，讓這樣的視角轉換有機會發生在日常生活之中。",
    },
    {
      type: "paragraph",
      text: "回到自然科學，蛾類對光的感知，以及埋葬蟲與環境之間的交互作用，同樣提醒我們，人類的感知方式並不是理解世界的唯一尺度，而只是眾多可能尺度中的一種。即使生活在同一個物理空間之中，不同物種所經歷的也未必是相同的世界。當我們嘗試從其他生命的角度思考時，不僅可能重新理解許多習以為常的事物，也可能為科學研究、空間設計與環境保育帶來新的方向。",
    },
    { type: "heading", text: "讓跨領域交流成為一種持續的實踐", level: 2 },
    {
      type: "paragraph",
      text: "回顧這兩天的活動，從埋葬蟲的合作繁殖、蛾類的光感知，到歷史文獻中的化生與化身、知識的驗證、泛靈思想，以及消失物種所創造的微棲地，這些看似距離遙遠的主題，卻在參與者的交流過程中逐漸產生了連結。",
    },
    {
      type: "paragraph",
      text: "這些連結並不完全來自事前的活動規劃，而是在討論中逐漸形成的。例如，SALAD dressing 在第一天的交流結束後，根據現場的討論重新調整第二天的演講內容，使原本各自獨立的主題能夠產生更深入的對話。講者與聽眾透過彼此的回應，不斷調整自己的思考，也共同參與了知識形成的過程。",
    },
    {
      type: "paragraph",
      text: "這正是 Ecotone 希望探索的共學形式。不同領域不一定需要使用相同的語言、研究方法或知識框架，也不必對所有問題達成共識。多樣性的價值，在於它讓我們有機會接觸原本不熟悉的觀點，重新檢視自身的假設，並發現單一領域可能無法看見的問題。",
    },
    {
      type: "paragraph",
      text: "從跨越學科、文化、語言與世代的界線，到嘗試跨越物種之間的認知界線，我們希望 Ecotone 能夠成為一個持續練習理解彼此的空間，讓不同的知識體系不只是相遇，也能逐漸發展出新的問題、研究方向與合作機會。",
    },
    {
      type: "paragraph",
      text: "感謝所有講者與參與者共同形塑了這次的討論。當每一位參與者都願意投入自己的知識、經驗與思考時，彼此所獲得的，往往能夠超越原先的期待。",
    },
    {
      type: "image",
      src: "/pics/ecotone-2026-group-day1.jpg",
      alt: "Ecotone 講者與參與者在教室前合影",
      caption: "Ecotone 系列演講第一場的講者與參與者合影。攝影：SOS Foundation。",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "這是 Ecotone 系列演講的第一場，也是我們持續探索這些可能性的起點。",
    },
    {
      type: "paragraph",
      text: "Ecotone 會持續舉辦下去。不論你來自哪個領域、哪個年齡層，是學生、研究者、創作者，或只是帶著一段想分享的經驗與問題，都歡迎報名成為講者，我們會在未來的場次中為你安排。",
    },
    {
      type: "paragraph",
      text: "<em>成為講者：</em><a href=\"https://sustainable-ecotone.vercel.app/call-for-speakers\" target=\"_blank\" rel=\"noopener noreferrer\">Call for Speakers</a>",
    },
    {
      type: "paragraph",
      text: "<em>本次活動網頁：</em><a href=\"https://sustainable-ecotone.vercel.app/events/sustainable-urbanization-rewilding-2026\" target=\"_blank\" rel=\"noopener noreferrer\">Sustainable Urbanization? Rewilding?</a>",
    },
  ],
};
