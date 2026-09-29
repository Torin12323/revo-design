import type { Lang } from "@/components/site/copy";

export type PreviewShot = {
  img: string;
  title: Record<Lang, string>;
  sub: Record<Lang, string>;
  video?: string;
};

export type ShotFit = "poster" | "wide" | "banner" | "hero" | "logo" | "logoWide" | "detail" | "board";
export type ShotGroup = "ram" | "shop" | "brand";
export type AiKind = "fig" | "bag" | "flow";
export type DocCat = "prompt" | "live" | "film" | "gear" | "note";

export type StudioShot = PreviewShot & {
  id: string;
  fit: ShotFit;
  span?: 2 | 3;
  group?: ShotGroup;
  kind?: AiKind;
};

export type Clip = {
  id: string;
  src: string;
  poster: string;
  engine: "hunyuan" | "minimax";
  ratio: string;
  title: Record<Lang, string>;
  sub: Record<Lang, string>;
};

export type DocItem = {
  id: string;
  cat: DocCat;
  title: Record<Lang, string>;
  en: string;
  zh: string;
  image?: string;
};

function shot(
  id: string,
  file: string,
  group: ShotGroup,
  fit: ShotFit,
  zh: string,
  en: string,
  subZh: string,
  subEn: string,
  span?: 2 | 3,
): StudioShot {
  return { id, img: file, group, fit, span, title: { zh, en }, sub: { zh: subZh, en: subEn } };
}

const shop = "邢台玩家 · 授权店";
const shopEn = "Xingtai Wanjia · authorized shop";

export const digitalShots: StudioShot[] = [
  shot("d4-silver", "/media/ram/d4-silver.jpg", "ram", "poster", "银爵 DDR4 16GB 3200", "KingBank DDR4 16GB 3200, silver", shop, shopEn),
  shot("d4-mix", "/media/ram/d4-mix.jpg", "ram", "poster", "黑爵 + 银爵 + 白刃", "Black, silver, and white DDR4", shop, shopEn),
  shot("d4-black", "/media/ram/d4-black.jpg", "ram", "poster", "黑爵 DDR4 32GB 3200", "Black DDR4 32GB 3200", shop, shopEn),
  shot("d5-juhor", "/media/ram/d5-juhor.jpg", "ram", "poster", "玖合 DDR5 6400", "JUHOR DDR5 6400", shop, shopEn),
  shot("d5-white", "/media/ram/d5-white.jpg", "ram", "poster", "白刃 DDR5 7200", "White blade DDR5 7200", shop, shopEn),
  shot("d5-black", "/media/ram/d5-black.jpg", "ram", "poster", "黑刃 DDR5 6800", "Black blade DDR5 6800", shop, shopEn),
  shot("ddr4-asgard", "/media/ram/ddr4-asgard.jpg", "ram", "poster", "阿斯加特 DDR4 3600", "Asgard DDR4 3600", shop, shopEn),
  shot("ddr5-line", "/media/ram/ddr5-line.jpg", "ram", "poster", "金百达 DDR5 三色", "KingBank DDR5, three finishes", shop, shopEn),
  shot("d5-6800", "/media/ram/d5-6800.jpg", "ram", "poster", "DDR5 6800 48GB", "DDR5 6800, 48GB", shop, shopEn),
  shot("biwin", "/media/ram/biwin.jpg", "ram", "poster", "佰维 DDR5 6000", "BIWIN DDR5 6000", shop, shopEn),
  shot("shop-d4", "/media/ram/shop-d4.jpg", "ram", "poster", "授权店 DDR4 3600", "Shop poster, DDR4 3600", shop, shopEn),
  shot("spec-a", "/media/ram/spec-a.jpg", "ram", "poster", "参数表 · 以换代修", "Spec table, exchange warranty", shop, shopEn),
  shot("spec-b", "/media/ram/spec-b.jpg", "ram", "poster", "参数表 · 售后质保", "Spec table, after-sales", shop, shopEn),
  shot("banner-1", "/media/ram/banner-1.jpg", "shop", "banner", "店招横幅 1", "Storefront banner 1", shop, shopEn, 3),
  shot("banner-2", "/media/ram/banner-2.jpg", "shop", "banner", "店招横幅 2", "Storefront banner 2", shop, shopEn, 3),
  shot("hero-1", "/media/ram/hero-1.jpg", "shop", "hero", "首页主视觉 1", "Homepage hero 1", shop, shopEn, 2),
  shot("hero-2", "/media/ram/hero-2.jpg", "shop", "hero", "首页主视觉 2", "Homepage hero 2", shop, shopEn, 2),
  shot("cqsm", "/media/brand/cqsm.jpg", "brand", "logo", "诚启数码", "Chengqi Shuma", "品牌标志", "Wordmark"),
  shot("chuangjiu", "/media/brand/chuangjiu.jpg", "brand", "logo", "创玖数码", "Chuangjiu Shuma", "竖版标志", "Tall wordmark"),
  shot("juhor", "/media/brand/juhor.jpg", "brand", "logoWide", "玖合", "JUHOR", "字标", "Wordmark", 2),
  shot("techspeak", "/media/brand/techspeak.png", "brand", "logo", "今日说机", "TechSpeak", "栏目标志", "Show mark"),
];

function ai(
  id: string,
  file: string,
  kind: AiKind,
  fit: ShotFit,
  zh: string,
  en: string,
  span?: 2 | 3,
): StudioShot {
  return {
    id,
    img: file,
    kind,
    fit,
    span,
    title: { zh, en },
    sub: { zh: "", en: "" },
  };
}

export const aiShots: StudioShot[] = [
  ai("fig-20", "/media/ai/fig-20.jpg", "fig", "poster", "蓝发贝雷帽手办", "Blue beret figure"),
  ai("fig-33", "/media/ai/fig-33.jpg", "fig", "poster", "坐姿帽衫手办", "Seated cap figure"),
  ai("fig-136", "/media/ai/fig-136.jpg", "fig", "poster", "朋克 Q 版", "Punk chibi"),
  ai("bag-01", "/media/ai/bag-01.jpg", "bag", "poster", "酒红抽绳背包", "Wine drawstring backpack"),
  ai("bag-02", "/media/ai/bag-02.jpg", "bag", "poster", "黑金搭扣背包", "Black backpack, gold clasp"),
  ai("bag-03", "/media/ai/bag-03.jpg", "bag", "poster", "双袋盖背包", "Double-pocket backpack"),
  ai("bag-04", "/media/ai/bag-04.jpg", "bag", "poster", "T 字扣背包", "T-buckle backpack"),
  ai("bag-05", "/media/ai/bag-05.jpg", "bag", "poster", "方扣流苏背包", "Square buckle, tassels"),
  ai("bag-06", "/media/ai/bag-06.jpg", "bag", "poster", "皮带盖背包", "Belt-flap backpack"),
  ai("bag-07", "/media/ai/bag-07.jpg", "bag", "poster", "双前袋背包", "Two front pockets"),
  ai("bag-08", "/media/ai/bag-08.jpg", "bag", "poster", "皮带盖拉链包", "Belt cover, zip pocket"),
  ai("workflow", "/media/ai/workflow.jpg", "flow", "banner", "背包工作流", "Backpack workflow", 3),
  ai("turnaround", "/media/ai/turnaround.jpg", "flow", "wide", "三视图", "Turnaround sheet", 2),
];

function clip(
  id: string,
  engine: Clip["engine"],
  ratio: string,
  zh: string,
  en: string,
): Clip {
  return {
    id,
    engine,
    ratio,
    src: `/media/video/${id}.mp4`,
    poster: `/media/video/${id}.jpg`,
    title: { zh, en },
    sub: {
      zh: engine === "hunyuan" ? "混元 · 练习" : "MiniMax · 练习",
      en: engine === "hunyuan" ? "Hunyuan study" : "MiniMax study",
    },
  };
}

export const clips: Clip[] = [
  clip("hy-05", "hunyuan", "2 / 3", "定格姿势", "Pose hold"),
  clip("hy-06", "hunyuan", "2 / 3", "微笑走动", "Smile, then walk"),
  clip("hy-07", "hunyuan", "2 / 3", "转身", "Turn"),
  clip("hy-08", "hunyuan", "2 / 3", "抬手舞", "Arms up"),
  clip("hy-09", "hunyuan", "2 / 3", "下蹲", "Drop"),
  clip("hy-10", "hunyuan", "2 / 3", "坐地张开", "On the floor"),
  clip("mm-01", "minimax", "864 / 480", "楼顶跑酷", "Rooftop parkour"),
  clip("mm-02", "minimax", "864 / 480", "云海轻功", "Leap across clouds"),
  clip("mm-03", "minimax", "1280 / 736", "冰盾对火", "Shield against fire"),
  clip("mm-04", "minimax", "1280 / 736", "火墙", "Fire barrier"),
];

export const stageOrder = ["hero", "detail", "campaign", "live"] as const;
export type StageKey = (typeof stageOrder)[number];
export type StageFit = "cover" | "contain" | "scroll";

export type StageFrame = {
  id: string;
  fit: StageFit;
  title: Record<Lang, string>;
  sub: Record<Lang, string>;
  img?: string;
  video?: string;
  poster?: string;
  ratio?: string;
};

function frame(
  id: string,
  fit: StageFit,
  img: string,
  zh: string,
  en: string,
  subZh: string,
  subEn: string,
): StageFrame {
  return { id, fit, img, title: { zh, en }, sub: { zh: subZh, en: subEn } };
}

function film(
  id: string,
  ratio: string,
  zh: string,
  en: string,
  subZh: string,
  subEn: string,
): StageFrame {
  return {
    id,
    fit: "contain",
    video: `/media/video/${id}.mp4`,
    poster: `/media/video/${id}.jpg`,
    ratio,
    title: { zh, en },
    sub: { zh: subZh, en: subEn },
  };
}

export const stageSets: Record<StageKey, StageFrame[]> = {
  hero: [
    frame("d4-silver", "contain", "/media/ram/d4-silver.jpg", "银爵 DDR4 16GB 3200", "KingBank DDR4 16GB 3200, silver", shop, shopEn),
    frame("d5-juhor", "contain", "/media/ram/d5-juhor.jpg", "玖合 DDR5 6400", "JUHOR DDR5 6400", shop, shopEn),
  ],
  detail: [
    frame("pollen", "scroll", "/media/work/pollen.jpg", "茶花粉", "Camellia pollen", "食品详情页", "Food detail page"),
    frame("dog", "scroll", "/media/work/dogfood.jpg", "鱼油夹心犬粮", "Fish-oil dog food", "宠物详情页", "Pet detail page"),
  ],
  campaign: [
    frame("banner-1", "contain", "/media/ram/banner-1.jpg", "店招横幅", "Storefront banner", shop, shopEn),
    frame("hero-1", "contain", "/media/ram/hero-1.jpg", "首页主视觉", "Homepage hero", shop, shopEn),
    frame("520", "contain", "/media/work/photo-520.jpg", "520 礼遇", "520 campaign", "悦尚摄影", "Yueshang Studio"),
  ],
  live: [
    film("hy-05", "2 / 3", "定格姿势", "Pose hold", "混元 · 练习", "Hunyuan study"),
    film("hy-08", "2 / 3", "抬手舞", "Arms up", "混元 · 练习", "Hunyuan study"),
    film("mm-01", "864 / 480", "楼顶跑酷", "Rooftop parkour", "MiniMax · 练习", "MiniMax study"),
    film("mm-03", "1280 / 736", "冰盾对火", "Shield against fire", "MiniMax · 练习", "MiniMax study"),
  ],
};

export function stageShot(frameItem: StageFrame): PreviewShot {
  return {
    img: frameItem.img ?? frameItem.poster ?? "",
    video: frameItem.video,
    title: frameItem.title,
    sub: frameItem.sub,
  };
}

export const studioUi = {
  zh: {
    digitalKicker: "数码",
    digitalTitle: "数码授权店",
    digitalNote: "内存、店招和品牌是邢台玩家定制的授权店稿。",
    aiKicker: "AI 生图",
    aiTitle: "ComfyUI 生图",
    aiNote: "手办、背包、三视图和工作流，都是自己练的，不写进客户项目。",
    videoKicker: "AI 生视频",
    videoTitle: "混元，和 MiniMax",
    videoNote: "竖屏人物是混元，横屏动作是 MiniMax。练习片，页面里直接播放。",
    docsKicker: "文稿",
    docsTitle: "能读，也能复制",
    docsNote: "中文是原文。切到英文时，页面上是摘要，需要原文就复制中文。",
    hunyuan: "混元 · 竖屏",
    minimax: "MiniMax · 横屏",
    search: "搜索文稿",
    empty: "没有对上的文稿",
    copy: "复制这段",
    copyZh: "复制中文原文",
    more: "展开全文",
    less: "收起",
    copied: "已复制",
    digFilters: [
      { id: "all", label: "全部" },
      { id: "ram", label: "内存" },
      { id: "shop", label: "店招" },
      { id: "brand", label: "品牌" },
    ],
    aiFilters: [
      { id: "all", label: "全部" },
      { id: "fig", label: "手办" },
      { id: "bag", label: "背包" },
      { id: "flow", label: "流程" },
    ],
    docFilters: [
      { id: "all", label: "全部" },
      { id: "prompt", label: "提示词" },
      { id: "live", label: "直播" },
      { id: "film", label: "拍摄" },
      { id: "gear", label: "硬件" },
      { id: "note", label: "笔记" },
    ],
  },
  en: {
    digitalKicker: "Digital",
    digitalTitle: "Authorized RAM shop",
    digitalNote: "RAM, banners, and marks are Xingtai Wanjia shop work.",
    aiKicker: "AI stills",
    aiTitle: "ComfyUI stills.",
    aiNote: "Figures, bags, turnarounds, and the node graph are personal studies.",
    videoKicker: "AI video",
    videoTitle: "Hunyuan, and MiniMax.",
    videoNote: "Portrait clips are Hunyuan. Wide action clips are MiniMax. Studies, with playback on the page.",
    docsKicker: "Notes",
    docsTitle: "Read it. Copy it.",
    docsNote: "Chinese is the source. English on this page is a short summary. Copy Chinese when you need the original.",
    hunyuan: "Hunyuan · portrait",
    minimax: "MiniMax · wide",
    search: "Search notes",
    empty: "No notes match",
    copy: "Copy this",
    copyZh: "Copy Chinese",
    more: "Expand",
    less: "Collapse",
    copied: "Copied",
    digFilters: [
      { id: "all", label: "All" },
      { id: "ram", label: "RAM" },
      { id: "shop", label: "Shop" },
      { id: "brand", label: "Brand" },
    ],
    aiFilters: [
      { id: "all", label: "All" },
      { id: "fig", label: "Figures" },
      { id: "bag", label: "Bags" },
      { id: "flow", label: "Flow" },
    ],
    docFilters: [
      { id: "all", label: "All" },
      { id: "prompt", label: "Prompts" },
      { id: "live", label: "Live" },
      { id: "film", label: "Film" },
      { id: "gear", label: "Gear" },
      { id: "note", label: "Notes" },
    ],
  },
} as const;
