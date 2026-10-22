import type { Post } from "../types";

// ─── Clean Energy and Desert Wildlife: The Pallas's Cats of Zhangye ─────────
// Source: D20261022-Clean Energy and Desert Wildlife_ The Pallas's Cats of Zhangye.docx
// Paragraph breaks, emphasis, links, and figures follow the manuscript's
// English section. Figure 1 (the Pallas's cat photo) is the cover, so its
// credit lives in `coverCredit` rather than as a body image.

export const post: Post = {
  slug: "clean-energy-and-desert-wildlife-pallass-cats-of-zhangye",
  title: "Clean Energy and Desert Wildlife: The Pallas's Cats of Zhangye",
  excerpt:
    "A wind farm in the desert north of Zhangye overlaps Pallas's cat habitat. How do we keep a solution to one environmental problem from creating another?",
  cover: "/pics/pallas-cat-zhangye.jpg",
  coverAlt: "Close-up of a Pallas's cat with thick, frost-tipped gray fur and pale green eyes",
  coverCredit:
    "Figure 1. A Pallas's cat at Diergaarde Blijdorp, Rotterdam Zoo. Photo: Spencer Wright, Creative Commons Attribution 2.0 Generic, via Wikimedia Commons.",
  date: "2026-10-22",
  authorId: "sos-foundation",
  tags: ["policy", "research"],
  body: [
    {
      type: "paragraph",
      text: "<em>Thoughts on the sustainability of sustainability</em>",
    },
    {
      type: "paragraph",
      text: "In October 2026, a wind farm under construction in the desert north of Zhangye, in Gansu Province, drew public attention. The Chinese Felid Conservation Alliance (貓盟, CFCA), a conservation group, said its cameras had recorded Pallas’s cats in the area for years, and that some of the turbine sites overlap with the cats’ habitat. The local environment bureau said the project had completed the required approvals, that the site lies outside protected areas and ecological protection red lines, and that construction complies with the relevant rules. It also said it has asked experts to collect data and assess the effects on wildlife, and that it will take in views from all sides and take effective measures to protect wildlife in the area.",
    },
    {
      type: "paragraph",
      text: "We are not writing to judge this project. The experts’ assessment is still under way, and we do not have the full picture. We are writing because the case raises the question behind our foundation’s name, the sustainability of sustainability: how do we keep a solution to one environmental problem from creating another? We also want to use it to introduce an animal that most people know little about, and the land it lives in.",
    },
    { type: "heading", text: "Who lives in an “empty” desert", level: 2 },
    {
      type: "paragraph",
      text: "The Pallas’s cat (兔猻) is a small wild cat, only a little bigger than a house cat. Its gray fur has white tips that make it look frosted. It has short legs, a flat face, and small ears set low on its head, so it can peek over a rock without showing much of itself. Unlike a house cat, it has round pupils. Its fur is very dense, enough to keep it warm in winters that can drop to minus 50 degrees Celsius in parts of its range. By day it rests in rock crevices or marmot burrows. From dusk to dawn it hunts pikas, gerbils, and other small mammals, often by waiting at the exit of a burrow. In open ground, it can lie flat and still, looking like a gray rock, to hide from eagles.",
    },
    {
      type: "paragraph",
      text: "The Pallas’s cat lives in cold steppe and desert across Central Asia, and China holds more than half of the world’s population. Globally, the IUCN lists it as Least Concern. In China it is a nationally protected species (Class II), and the China Biodiversity Red List lists it as endangered.",
    },
    {
      type: "paragraph",
      text: "The desert north of Zhangye looks empty, but many animals live there. CFCA has surveyed Pallas’s cats in this desert since 2021, using camera traps, scat analysis, and field observation. In 2022, in a monitoring area of about 20 square kilometers, its cameras recorded 351 independent sightings of 12 individual cats. From these data CFCA estimates about 18 cats per 100 square kilometers, compared with an average of 4 to 6 reported for the species elsewhere, and it says this is the highest known density in China.",
    },
    {
      type: "paragraph",
      text: "The cats are not alone. CFCA says it has recorded 7 species under China’s highest level of protection (Class I) in this part of the desert, including the houbara bustard, black stork, steppe eagle, golden eagle, and saker falcon. It has also recorded 28 species under Class II, including the Asiatic wildcat, goitered gazelle, and wolf. These animals are linked through the food chain. Pallas’s cats and red foxes, which also live here, both eat small rodents, and large eagles such as the steppe eagle are among the Pallas’s cat’s predators.",
    },
    {
      type: "paragraph",
      text: "Some important life here is easy to overlook, because it grows on the ground itself. In many deserts, the soil surface is held together by a thin living crust of cyanobacteria, lichens, and mosses. This crust keeps the soil from blowing away and adds nitrogen to it. Fa cai (髮菜), a hair-like cyanobacterium that grows on these dry soils, has also been recorded here. It is protected in China at Class I.",
    },
    { type: "heading", text: "Why clean energy is coming to the desert", level: 2 },
    {
      type: "paragraph",
      text: "Wind and solar power are a big part of how China and the rest of the world will cut carbon emissions. China’s renewable energy plan for 2026 to 2030, published in July 2026, calls for more than 370 gigawatts of new wind and solar base capacity in the northern regions, with deserts, the Gobi, and other arid lands as the focus. The reasons are easy to see. Deserts have strong wind, plenty of sun, and few people, and building there takes up little farmland. By June 2024 there were already 471 wind turbines in the northern Zhangye desert, according to CFCA, along with solar farms, coal mines, and roads. The project in the news, a 100-megawatt wind farm with 16 turbines in Pingshanhu Mongol Ethnic Township, Ganzhou District, is one small part of this build-out. Many of these places look empty on a map but are home to animals like the Pallas’s cat, so knowing what lives there matters more as building goes on.",
    },
    { type: "heading", text: "What the science says, and what it does not", level: 2 },
    {
      type: "paragraph",
      text: "Researchers have already studied wind farms and Pallas’s cats in this same desert. A 2025 study by Qin and colleagues, published in <em>Biological Conservation</em>, used camera traps at 164 sites around Zhangye. Inside wind farms, Pallas’s cats were more active at night, prey was scarcer, and the cats’ diet overlapped more with that of red foxes. However, the study did not show that wind farms caused the cats to leave or decline, and the number of cat records in it was small. The pattern is still worth noticing, because ecologists see it in many places: human disturbance tends to favor adaptable generalists like the red fox, while specialists like the Pallas’s cat, which ambushes small mammals at their burrows, have to change more of their behavior to cope.",
    },
    {
      type: "paragraph",
      text: "CFCA’s monitoring records show far fewer cats after 2022, with only 2 individuals identified in 2024, and some signs of recovery since the second half of 2025. The group thinks human activities in the area, including wind farm construction and rodent control, may be among the causes, but this has not been proven. What is clear is that pressures in a place like this add up. Turbines, solar farms, mines, and roads each take a little space and bring a little more disturbance.",
    },
    { type: "heading", text: "Two things that are easy to miss", level: 2 },
    {
      type: "paragraph",
      text: "As ecologists, we want to add two points that are easy to miss when we talk about building in the desert.",
    },
    {
      type: "paragraph",
      text: "<strong>First, not seeing an animal is not the same as the animal not being there.</strong> Pallas’s cats are rare, their fur blends into the desert, and they spend much of their time in rock crevices and burrows, so a survey team can easily walk past one. Imagine a team that has a 5 percent chance of recording a cat on any one day at a site where cats really live. After 10 days of survey, the chance that they record no cat at all is still 60 percent. After 30 days it is still about 21 percent (Figure 2). This is why ecologists report how hard they looked, not only what they found. It is also why long-term monitoring is so valuable. Cameras that run for months or years, whether they are set by research teams, conservation groups, or agencies, give rare animals many more chances to show up in the records.",
    },
    {
      type: "chart",
      chart: "detection-probability",
      caption: "Figure 2. How a short survey can miss a rare animal. This is an illustration, not data from the Zhangye project. Chart: SOS Foundation.",
    },
    {
      type: "paragraph",
      text: "<strong>Second, damage in a desert heals on a very slow clock.</strong> A cleared patch of forest starts to grow back within a few years. The living crust on desert soil is different. When heavy vehicles break it, it recovers very slowly. In the Mojave Desert in the United States, researchers studied tank tracks left by army training during the Second World War. About 55 years later, the tracks were still visible. The cyanobacteria had recovered to 46 to 65 percent of the undisturbed level, and some lichens on open ground had recovered less than 10 percent. If recovery continues at that pace, the authors estimated, full recovery could take nearly 2,000 years (Figure 3).",
    },
    {
      type: "chart",
      chart: "soil-crust-recovery",
      caption: "Figure 3. Recovery of desert soil crust inside WWII tank tracks in the Mojave Desert, about 55 years after the damage. Data: Belnap & Warren (2002). Chart: SOS Foundation.",
    },
    {
      type: "paragraph",
      text: "China acted on this lesson early. In 2000 the State Council banned the collection and sale of fa cai, because raking it up for market had degraded and desertified large areas of grassland. For building in the desert, the same lesson points to planning ahead. The easiest way to protect the crust is to keep new roads and work sites small from the start. Covering the soil and planting grass afterwards helps, but it cannot quickly bring back the crust or the burrows animals use, so good restoration also tries to rebuild the structure of the habitat and the routes animals use.",
    },
    { type: "heading", text: "A lesson from California", level: 2 },
    {
      type: "paragraph",
      text: "Other countries have faced the same question. In the 1980s and early 1990s, thousands of small wind turbines were built at Altamont Pass, east of San Francisco, without enough attention to their effect on birds. A study published in 2008 estimated that they killed about 2,700 birds a year, including about 67 golden eagles. Operators were later required to remove some of the most dangerous turbines, and estimates from bird monitoring at the site suggest that deaths of four key raptor species fell by about half between 2005 and 2010. Since then, many old turbines have been replaced with fewer, larger ones, placed away from the ridge edges and low saddles where raptors often fly. Knowing where the birds lived and flew made it possible to reduce the harm while the wind farm kept producing power.",
    },
    { type: "heading", text: "Why this matters to SOS", level: 2 },
    {
      type: "paragraph",
      text: "Our foundation is called Sustainability of Sustainability. The name comes from a simple concern: a solution to one environmental problem can create another. Cutting carbon emissions is urgent, and wind and solar power are an important part of the solution. The question is not whether to build them. It is where to put them, and how to know what lives there before construction starts.",
    },
    {
      type: "image",
      src: "/pics/gansu-desert-wind-turbines.jpg",
      alt: "A row of wind turbines across a flat desert in Gansu",
      caption: "Figure 4. Wind turbines in the Gansu desert. Photo: Popolon, Creative Commons Attribution 2.0 Generic, via Wikimedia Commons.",
    },
    {
      type: "paragraph",
      text: "Much of this comes down to data. Wildlife records and the maps used for planning are often kept apart. In China and elsewhere, long-term wildlife records are held by many research teams, conservation groups, and agencies, and bringing them together takes work. China is building a national “one map” for territorial spatial planning, and the country’s 2019 national guidelines on the planning system call for data sharing among government departments and information exchange between government and society. Detailed, long-term wildlife records fit naturally as a layer on maps like these. The earlier such records are on planners’ maps, the easier it is to see which places to avoid, which can be built on with conditions, and which need strict control. Open and shared biodiversity data is what SOS works on in our research, and this is where we hope to contribute.",
    },
    {
      type: "paragraph",
      text: "The local environment bureau says experts are now collecting data and assessing the effects on wildlife, and we look forward to the results. In the meantime, the desert north of Zhangye is worth getting to know. The places we choose for clean energy are rarely empty, and a sustainable energy transition has to make room for the animals that already live there.",
    },
    { type: "divider" },
    { type: "heading", text: "Sources", level: 2 },
    {
      type: "paragraph",
      text: "CFCA, survey data, timeline, and requests (October 1, 2026, via Huxiu): <a href=\"https://www.huxiu.com/article/4895081.html\" target=\"_blank\" rel=\"noopener noreferrer\">huxiu.com/article/4895081</a>",
    },
    {
      type: "paragraph",
      text: "CFCA’s 2022–2024 counts, as reported by Caixin (March 12, 2025): <a href=\"https://science.caixin.com/m/2025-03-12/102297207.html\" target=\"_blank\" rel=\"noopener noreferrer\">science.caixin.com</a>",
    },
    {
      type: "paragraph",
      text: "CFCA’s records of protected species in the area, as reported by Sing Tao (October 21, 2026): <a href=\"https://www.stheadline.com/zh-hans/realtime-china/3628280/%E7%94%98%E8%82%83%E5%BC%A0%E6%8E%96%E9%A3%8E%E7%94%B5%E5%9C%BA-%E8%A2%AB%E6%8C%87%E5%8D%B1%E5%AE%B3%E5%85%94%E7%8B%B2%E6%A0%96%E5%9C%B0\" target=\"_blank\" rel=\"noopener noreferrer\">stheadline.com</a>",
    },
    {
      type: "paragraph",
      text: "Local government notice, as reported by 新黃河 (Sohu, October 20, 2026): <a href=\"https://www.sohu.com/a/1090029531_121347613\" target=\"_blank\" rel=\"noopener noreferrer\">sohu.com</a>",
    },
    {
      type: "paragraph",
      text: "Zhangye government on the project’s signing, turbines, and investment (April 2025): <a href=\"https://www.zhangye.gov.cn/sswj/dzdt/gzdt/202504/t20250417_1389165_ghb.html\" target=\"_blank\" rel=\"noopener noreferrer\">zhangye.gov.cn</a>",
    },
    {
      type: "paragraph",
      text: "WWF, “Meet the Pallas’s cat, a wild feline that doesn’t meow” (<em>World Wildlife</em> magazine, Fall 2026): <a href=\"https://www.worldwildlife.org/news/magazine/fall-2026/meet-the-pallass-cat-a-wild-feline-that-doesnt-meow/\" target=\"_blank\" rel=\"noopener noreferrer\">worldwildlife.org</a>",
    },
    {
      type: "paragraph",
      text: "Live Science on Pallas’s cat natural history (August 23, 2025): <a href=\"https://www.livescience.com/animals/cats/pallass-cat-one-of-the-worlds-oldest-felines-that-stands-on-its-bushy-tail-to-keep-its-paws-warm\" target=\"_blank\" rel=\"noopener noreferrer\">livescience.com</a>",
    },
    {
      type: "paragraph",
      text: "Dialogue Earth on Pallas’s cats in China (April 2025): <a href=\"https://dialogue.earth/en/digest/death-of-viral-pallass-cat-sparks-conservation-debate/\" target=\"_blank\" rel=\"noopener noreferrer\">dialogue.earth</a>",
    },
    {
      type: "paragraph",
      text: "Qin, M. et al. (2025) “Contrasting effects of wind farm disturbances on multi-dimensional competition and coexistence of sympatric mesocarnivores,” <em>Biological Conservation</em> 312: 111458: <a href=\"https://www.sciencedirect.com/science/article/abs/pii/S0006320725004951\" target=\"_blank\" rel=\"noopener noreferrer\">sciencedirect.com</a>",
    },
    {
      type: "paragraph",
      text: "China’s 15th Five-Year Plan for Renewable Energy Development (China Energy Portal translation): <a href=\"https://chinaenergyportal.org/15th-plan-for-renewable-energy-development/\" target=\"_blank\" rel=\"noopener noreferrer\">chinaenergyportal.org</a>",
    },
    {
      type: "paragraph",
      text: "CPC Central Committee and State Council, guidelines on establishing the territorial spatial planning system, including the national “one map” and data sharing (May 2019): <a href=\"https://www.12371.cn/2019/05/24/ARTI1558651486476594.shtml\" target=\"_blank\" rel=\"noopener noreferrer\">12371.cn</a>",
    },
    {
      type: "paragraph",
      text: "Belnap, J. & Warren, S.D. (2002) “Patton’s tracks in the Mojave Desert, USA: An ecological legacy,” <em>Arid Land Research and Management</em> 16: 245–258: <a href=\"https://pubs.usgs.gov/publication/70024554\" target=\"_blank\" rel=\"noopener noreferrer\">pubs.usgs.gov</a>",
    },
    {
      type: "paragraph",
      text: "Belnap, J. (2003) “The world at your feet: desert biological soil crusts,” <em>Frontiers in Ecology and the Environment</em> 1: 181–189: <a href=\"https://esajournals.onlinelibrary.wiley.com/doi/10.1890/1540-9295(2003)001%5B0181:TWAYFD%5D2.0.CO;2\" target=\"_blank\" rel=\"noopener noreferrer\">esajournals.onlinelibrary.wiley.com</a>",
    },
    {
      type: "paragraph",
      text: "State Council notice banning the collection and sale of fa cai (國發〔2000〕13號, June 14, 2000): <a href=\"https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202307/t20230719_3165943.html\" target=\"_blank\" rel=\"noopener noreferrer\">beijing.gov.cn</a>",
    },
    {
      type: "paragraph",
      text: "Smallwood, K.S. & Thelander, C.G. (2008) “Bird mortality in the Altamont Pass Wind Resource Area, California,” <em>Journal of Wildlife Management</em> 72(1): <a href=\"https://bioone.org/journals/journal-of-wildlife-management/volume-72/issue-1/2007-032/Bird-Mortality-in-the-Altamont-Pass-Wind-Resource-Area-California/10.2193/2007-032.short\" target=\"_blank\" rel=\"noopener noreferrer\">bioone.org</a>",
    },
    {
      type: "paragraph",
      text: "BirdLife International, Altamont Pass case study: <a href=\"https://datazone.birdlife.org/the-largest-wind-farm-in-the-world-impacts-birds-of-prey-in-california-usa\" target=\"_blank\" rel=\"noopener noreferrer\">datazone.birdlife.org</a>",
    },
    {
      type: "paragraph",
      text: "Golden Gate Bird Alliance, “Good news for birds at the Altamont wind farm” (January 28, 2013): <a href=\"https://goldengatebirdalliance.org/blog-posts/good-news-for-birds-at-the-altamont-wind-farm/\" target=\"_blank\" rel=\"noopener noreferrer\">goldengatebirdalliance.org</a>",
    },
  ],
};
