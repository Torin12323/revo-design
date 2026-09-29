import type { DocItem } from "@/components/site/library";

const productNegative = `lowres, bad anatomy, extra digits, fewer digits, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, username, blurry, out of focus, deformed, disfigured, mutated, ugly, malformed limbs, extra limbs, fused fingers, bad proportions, overexposed, underexposed, bad lighting, noisy, text, logo`;

export const documents: DocItem[] = [
  {
    id: "comfy-base",
    cat: "prompt",
    title: { zh: "ComfyUI 基础提示词", en: "ComfyUI prompt structure" },
    en: "Split a prompt into positive and negative. Positive describes the picture. Negative lists what to avoid. A bilingual template covers subject, clothing, scene, light, and props.",
    zh: `ComfyUI 通常把提示词分成正向和反向。

【正向】把画面描述填在这里。
masterpiece, best quality, extremely detailed, 1girl, solo, Gothic lolita dress, silver-white twin tails, heterochromatic eyes, indifferent expression, backlighting, cool blue light, moonlit castle courtyard, spired bell tower, silver pocket watch, highly detailed, intricate, professional lighting, cinematic composition, 8k, RAW photo

【反向】写出不要出现的东西。
low quality, worst quality, blurry, pixelated, bad anatomy, extra fingers, missing fingers, malformed hands, poorly drawn face, cropped, jpeg artifacts, signature, watermark, username, text, EasyNegative

图片元素模板
主体：一位身着［颜色］［风格］连衣裙的［身份］，［发型］，［眼睛］，表情是［情绪］。
服饰：纹样、领口。
场景：环境，以及背景里的建筑。
光影：逆光或硬光，冷蓝或暖金，氛围。
道具：手里的物件。

英文对照按同样五段写：Subject, Clothing, Background, Lighting, Props.

反推一张图时，按四点收：01 创作形式；02 核心视觉元素；03 风格与细节；04 逻辑与术语。
产品稿另外写清：中英对照、正反向、步数、CFG、采样器、调度器、降噪。`,
  },
  {
    id: "sd-standard",
    cat: "prompt",
    title: { zh: "标准描述词", en: "Standard description order" },
    en: "Five beats: subject, style, detail, optional quality, then a full sentence. Keep a small library for style, light, and effects.",
    zh: `标准结构

01 主体：对象 + 核心特征。
例：一位穿着未来机械装甲的赛博朋克少女。

02 风格：艺术风格 + 参考。
例：虚幻引擎渲染，带 Greg Rutkowski 的光影。

03 细节
外观：银色短发，霓虹眼镜。
环境：雨夜东京街道，霓虹倒映在湿地面。

04 质量（可选）：8K，超精细，OC 渲染。

05 完整示例
赛博朋克猫娘，猫耳机械义体，渐变荧光蓝发，透明材质外套，站在全息广告前，未来都市夜景，赛璐璐，宫崎骏色彩，4K。

常用词
风格：水墨 / 厚涂 / 低多边形 / 蒸汽波
光照：体积光 / 丁达尔 / 霓虹辉光
特效：粒子 / 动态模糊 / 故障艺术`,
  },
  {
    id: "negative-clean",
    cat: "prompt",
    title: { zh: "产品图反向词", en: "Clean product negative" },
    en: "A short negative for product stills. It skips the garbled dump and the NSFW block.",
    zh: productNegative,
  },
  {
    id: "ip-styles",
    cat: "prompt",
    title: { zh: "IP 风格提示词", en: "Seven IP style prompts" },
    en: "Seven copyable style lines: two anime looks, cyber, flat minimal, Pop Mart, Chinese, and chibi.",
    zh: `1 动漫风 A
Character design of a girl inspired by dolphins, V-tuber, neon color, light blue, 5 life size --ar 3:4 --s 250 --niji 5

2 动漫风 B
translucent material jacket, jellyfish decoration, futuristic, Popmart blind box, IP design, soft light, transparent light, clean and bright background, front view, whole body, C4D, OC rendering, 8k, super delicate --ar 3:4 --style expressive --niji 5 --s 250

3 赛博风
Blind box design, style reference, random neon lights, cyberpunk colors, neon effects, lights, reflective clothing, clean background, Prism, PVC, fine gloss, oc renderer, c4d render, 3D model, best quality, super detailed, 8k

4 极简平面风
delicate body lines, minimalism, and looks very adorable. illustration style doodles in the style of Keith Haring, sharpie illustration --ar 3:4 --niji 6

5 Pop Mart A
POP MART blind box, ultra-realistic fashion, elaborate clothing, realistic and lovely facial features, hand-painted, delicate face, bright color, soft light, solid color background, high quality, super detail, god-level cinema edge light, 8K, 3D, Blender, OC renderer --ar 3:4 --niji 5 --style expressive --s 400

6 中国风
Blind Box IP, Full body, Tang Dynasty girl image, Chinese style, popmart toy, 3D rendering, exquisite luster, physical model, bright colors, high saturation, sample background, best quality, 8K --iw 1.5 --niji 6 --ar 3:4

7 Chibi
blind box baby, in the style of Chibi, full body, eyes that resemble cartoon characters, short hair, round head, detailed character design, furry art, delicate luster, studio soft lighting, isolated against a white background, C4D, oc render, best quality, UHD --niji 6`,
  },
  {
    id: "mj-styles",
    cat: "prompt",
    title: { zh: "Midjourney 风格关键词", en: "Midjourney style words" },
    en: "Style words grouped by medium, movement, East Asian art, games, and render. Copy a group, not the whole pile.",
    zh: `绘画与印刷
宫崎骏 / Ghibli Studio / Miyazaki Hayao
油画 oil painting · 水彩 watercolor · 调色刀 Palette Knife
浮世绘 Ukiyo-e · 东方山水 Tradition Chinese Ink Painting
像素 Pixel Art · 版画 risograph · 线艺术 Line Art · 点彩 pointillism
海报 poster style · 矢量 vector illustration · 涂鸦 doodle

流派
印象派 Impressionism · 后印象 post-impressionism · 梵高 Van Gogh · 莫奈 Monet
新艺术 Art Nouveau · 巴洛克 Baroque · 文艺复兴 Renaissance
野兽派 Fauvism · 立体派 Cubism · 抽象表现 Abstract Art
极简 Minimalist · 包豪斯 Bauhaus · 粗犷主义 brutalist · 构成主义 Constructivist
蒸汽朋克 Steampunk · 赛博朋克 Cyberpunk · 废土 Wasteland Punk

动画与厂牌
皮克斯 Pixar · 梦工厂 DreamWorks · 新海诚 Makoto Shinkai
日本漫画 Manga · 吉卜力 Ghibli

游戏气质
旷野之息 botw · 宝可梦 Pokemon · 魂系 From Software · 英雄联盟 · JOJO
90s video game

成片质感
photoreal · hyperrealism · cinematic · national geographic
concept art · character concept art · film photography
full details · limited palette · black and white`,
  },
  {
    id: "four-beats",
    cat: "prompt",
    title: { zh: "图片转文字四段法", en: "Picture to four beats" },
    en: "Read a still as subject, space, material and light, then mood. The positive line is those four beats in order.",
    zh: `先按四段看图，再写成提示词。

主体：核心对象、材质、形态。
环境：构图、空间关系、背景。
风格：流派和渲染方式。
技术：分辨率、光的种类。

正向公式
［主体］+［环境］+［风格］+［技术］

例
3D 渲染的白色圆形展台，表面光滑带轻微反光，置于浅蓝色水面反射平面，背景中上有白色波浪丝绸，极简，柔和漫射光，8K。

反向只挡常见问题：不对称乱构图、低清、模糊、噪点、卡通化、过饱和。
权重：(highly detailed:1.3) 加强，[cyberpunk style:0.7] 减弱。

咖啡馆拆图示例
主体：做旧实木吧台、高光黄铜咖啡机、碎花布沙发。
空间：吧台沿墙，沙发与吧台呈 L 型，墙上海报是焦点。
材质：哑光旧木、金属高光、软布碎花。
光：顶上暖黄直射，吧台有圆光斑，墙面漫反射。
色彩：暖棕 + 米黄，碎花里少量红蓝。
氛围：复古工业，温暖、怀旧。

ComfyUI 文生图主链
Load Checkpoint → CLIP Text Encode → Empty Latent → KSampler → VAE Decode → Save Image`,
  },
  {
    id: "lovart-cutout",
    cat: "prompt",
    title: { zh: "Lovart 透明底抠图", en: "Lovart transparent cutout" },
    en: "One cutout note: prompt by subject type, export PNG, and fix hair, glass, and white-background exports.",
    zh: `公式：主体 + 抠图要求 + 透明底 + 边缘处理。

通用
移除图片背景，生成透明背景 PNG，保留主体边缘清晰，无杂色残留。
Remove the background, generate a transparent PNG, keep edges sharp, no color residue.

人像
抠出人物，保留头发丝，背景透明，边缘自然过渡。

产品
提取产品主体，去掉背景，出透明底 PNG，修边缘反光和阴影。

Logo
抠出 Logo，背景透明，颜色和线条完整，无锯齿。

网页步骤
1 登录 Lovart，上传到画布。
2 选中图片，点「抠图 / 移除背景」。
3 局部微调：按住 Ctrl（Mac 用 Command）点区域，补一句，例如「保留手部细节，去除背景」。
4 导出选 PNG。JPG 没有透明通道。
5 复杂边缘先用擦除工具，再抠一次。

常见问题
透明底有杂色：提示词加「边缘去噪，无杂色残留」，或手动擦。
头发、玻璃不准：拆图层，单独提前景。
导出变白：确认是 PNG，并关掉「添加白色背景」。

进阶
多图批量移除背景，统一出 PNG。
透明图拖进样机，直接做效果图。`,
  },
  {
    id: "qwen-lens",
    cat: "prompt",
    title: { zh: "千问镜头角度", en: "Qwen camera lines" },
    en: "Nine camera lines for Qwen image edits: move, rotate, top view, wide, close-up.",
    zh: `将镜头向前移动 (Move the camera forward.)
将镜头向左移动 (Move the camera left.)
将镜头向右移动 (Move the camera right.)
将镜头向下移动 (Move the camera down.)
将镜头向左旋转 45 度 (Rotate the camera 45 degrees to the left.)
将镜头向右旋转 45 度 (Rotate the camera 45 degrees to the right.)
将镜头转为俯视 (Turn the camera to a top-down view.)
将镜头转为广角镜头 (Turn the camera to a wide-angle lens.)
将镜头转为特写镜头 (Turn the camera to a close-up.)`,
  },
  {
    id: "openers",
    cat: "live",
    title: { zh: "抖音开场白", en: "Short-video openers" },
    en: "Six opener types: question, pain, result, insider, command, and a cut with no talk. Each has a sentence pattern.",
    zh: `1 悬念提问
句式：你有没有遇到过……？ / 为什么他……？ / 你敢相信……？
例：为什么同样的文案，别人能上热门，你却没有播放量？
适合：知识、反转、冷知识。

2 痛点共鸣
句式：为什么别人……，你却……？ / 是不是总觉得……？
例：为什么别人学历比你低，但是混得比你好？

3 结果展示
句式：从……到……，我只用了…… / 看我如何实现……
例：从月薪三千到月薪三万，我只做对了一件事。

4 行业内幕
句式：揭秘……背后的真相 / 行业内不会告诉你的……
例：美容行业背后真相大揭秘。

5 命令刺激
句式：所有……，必须……！ / 不想……，就给我……！
例：不想让你的孩子恨你一辈子，他们做错事的时候，你一定要这样做。

6 直接开头
不铺垫。前 3 秒用爆炸音效、快切、前后对比。美食先给成品，再倒回去做。

补充句
你有没有发现，明明做了同样的努力，结果却差很远？
你敢相信吗？90% 的人都做错了，难怪一直没效果。
他只用了一个小技巧，就从……变成了……你知道怎么做吗？
你以为……是因为……？其实 90% 的人都被骗了。`,
  },
  {
    id: "titles-draft",
    cat: "live",
    title: { zh: "装机避坑标题草稿", en: "PC-build title drafts" },
    en: "Ten Douyin title drafts about build mistakes. Tone is loud on purpose. Treat them as drafts, not claims.",
    zh: `血泪警告！2025 年装机十大「自杀式」操作，第一个就毁主板
新手必看！这些装机动作会让你的 CPU 当场「去世」
装机萌新哭诉：我亲手把万元主机变成废铁的 5 个瞬间
防坑指南｜2025 年最全装机「死亡名单」，商家绝不会告诉你
紧急避雷！全网疯传的装机误区动图合集，手慢无
笑到哭！B 站百万播放的装机翻车现场，你中招几个？
绝望瞬间：小白装机时最想砸电脑的 10 个时刻
2025 新版！这些装机操作等于给电脑喂毒药，速删收藏
救命文档！装机老鸟用血汗总结的 20 条保命法则
反向教学｜跟着做绝对翻车的装机骚操作大全

写法：强画面 + 悬念 + 对比。标题是草稿，直播里不要说成绝对化承诺。`,
  },
  {
    id: "series-can",
    cat: "film",
    title: { zh: "短视频系列 · 可以做", en: "Series you can shoot" },
    en: "Series that fit a shop setup: pitfall guides, nerd versus beginner, cold facts, myth-busting, fault stories, dialect explainers.",
    zh: `装机避坑指南 · 可以做
定位：新手，实用避雷。
单集：《电源瓦数怎么选》《双通道和单通道，帧数差多少》
拍法：正确 / 错误分屏，夸张标出翻车点，请一位小白真的装一次。

硬核玩家 VS 小白 · 可以做
反差任务：万元主机玩扫雷，或十年前的机器跑 3A。
分屏对比两边的操作和表情。

硬件冷知识 · 可以做
《主板电池没电，时间为什么会重置》
《显卡挖矿和比特币是什么关系》
用实拍或简单动画讲原理，结尾留一个问题。

硬件玄学 · 可以做
《插上 RGB，性能会不会涨》
《硅脂涂太多会不会烧主板》
先演谣言，再实测打脸。一句收：玄学不可信，但帅是另一件事。

硬件侦探 · 可以做
深夜自动开机、蓝屏代码。
把驱动、内存、电源写成「嫌疑人」，用日志和温度把原因找出来。
反转可以是线被拔了。

方言解说 · 可以做
四川话、东北话讲装机。
字幕写出方言对应的普通话。比喻生活化：CPU 像大脑，散热器像空调。

通用节奏
前 5 秒给悬念。中间快剪卡点。结尾留一个二选一。
新硬件发布时做对比。周更比一次堆十条有用。`,
  },
  {
    id: "series-skip",
    cat: "film",
    title: { zh: "短视频系列 · 做不了", en: "Series to skip" },
    en: "Index only. These need a lab, dangerous tests, or footage you do not have.",
    zh: `先不做，缺设备或缺安全条件：

硬件拆解实验室：暴力拆卡、看热管和钎焊。
极限超频 / 液氮：烧机和低温风险。
二手硬件淘金：线下市场、矿卡鉴别。
未来硬件黑科技：要样机和白皮书，不是柜台能拍的。
硬核工坊 / 自制电脑：乐高主机、旧手机改服务器。
硬件变形记：机箱改猫窝、显卡改风扇。
硬件极限测试：微波炉、液氮冻内存。不要拍。
硬件博物馆：古董卡和三十年进化，素材不在手上。
硬件环保：电路板熔炼。不要在店里做。

有实验室或样机之前，不要把这些写成已开拍的栏目。`,
  },
  {
    id: "shoot-angles",
    cat: "film",
    title: { zh: "拍摄角度", en: "Camera angles for hardware" },
    en: "Seven angles: overhead build, split performance, thermal, RGB, POV repair, ITX, and a short future beat.",
    zh: `1 拆装
俯拍 + 微距。CPU 安装、显卡插拔、防呆缺口。适合新手。

2 性能对比
同一游戏不同显卡，或 Cinebench 单核 / 多核。温度和噪音放在同一张曲线里。

3 散热
侧拍。有热成像更好。讲风道、热管、鳍片。高负载时再给温度。

4 灯光和外观
暗环境环绕。RGB 同步、阳极氧化、侧透。服务颜值，不堆参数。

5 故障
第一人称。内存没插紧、清灰、电源不亮。先讲原因，再换件。

6 迷你主机
特写走线。SFX 电源、ITX 板。把体积和性能的取舍说清楚。

7 下一代
只作为展望：PCIe、内存代数、模块化。没有样机就不要拍成评测。

技巧
微距拍板子纹理。慢动作拍风扇。箭头标出供电。分屏比新旧。
观众是新手、极客还是颜值，只选一种主线。`,
  },
  {
    id: "auction",
    cat: "live",
    title: { zh: "竞拍脚本 · 可复制骨架", en: "Auction script, usable skeleton" },
    en: "A 2.5 hour, 15-lot skeleton: open, a fast low-price template, one mid example, one closer, then the sign-off. Not the full verbatim show.",
    zh: `总长约 150 分钟，15 件。
前 5 件低价引流（内存、机箱、电源、散热，起拍约 99–299）。
中间 8 件主力（显卡、CPU，起拍约 800–2500）。
后 2 件压轴（高价卡或整机）。

开场（开播前到 0:10）
画面循环商品和字幕：今晚硬件竞拍，低价起拍。
「家人们晚上好，欢迎来到硬件竞拍。15 件，现拆现测。低价起拍，加价随意，一口价可以直接带走。规则：加价幅度按商品，出价后倒计时 15 秒重计。高价商品收保证金，拍完不付会扣。矿卡会标明，保 7 天无理由。」

低价模板（每件约 4 分钟）
出镜拆箱：「第一件，全新内存，市场价多少，今晚起拍多少，加价多少。我拆给你们看，再跑一次读写。」
竞价：「目前无人？1 号加了。15 秒。最后 10 秒。成交。扣一波。」
成交后：「支付提醒在后台，30 分钟内付。下一件。」

中段示例：RTX 4070，起拍 1999，加价 100，一口价 3999
讲外观、跑分、4K 光追大概帧数、市场价和二手价、保修和成色。
冷场就说「这个价我自己留」。接近一口价时问还有没有人直接秒。

压轴示例：RTX 4090，起拍 5999，加价 200，一口价 9999
慢拆，压力温度，再说使用场景。倒计时拉长，成交后报价格。

收尾（2:20–2:30）
成交清单在后台。未付款超时取消。预告下一场，提醒关注。

应急
冷场：这价格没人要，我自己留。
恶意出价：拉黑，下次走保证金。
流拍：下场再上。

数字是脚本里的例子，开口前改成当晚的真实标价和实测。`,
  },
  {
    id: "auction-fun",
    cat: "live",
    title: { zh: "幽默直播 · 结构", en: "Humor live, structure only" },
    en: "Same 15-lot order, with room for jokes. Copy the beats, not a fake two-hour transcript.",
    zh: `顺序不变：5 件引流，8 件主力，2 件压轴。

开场
自嘲一句库存，再三秒讲完规则：起拍低、15 秒倒计时、高价保证金、矿卡标明。

一件货的三段
1 拆箱：夸张看一眼品相，再给一个真实测试。
2 竞价：无人就说自己留；有人跳价就重复当前价和剩余秒数。
3 成交：提醒 30 分钟付款，马上接下一件。

中段每件只插一个笑点，然后回到跑分、市场价、保修。
压轴放慢，价格接近一口价时再抬高声音。

福利
人气到了再抽。礼物和连麦都说清楚规则。没人气就不要临时加码。

收尾
报总成交，催未付款，预告下一场。

表情可以大，参数不行。笑点让路给价格和成色。`,
  },
  {
    id: "deal-king",
    cat: "live",
    title: { zh: "今日特价王", en: "Tonight's one deal" },
    en: "One or two SKUs, a public price comparison, a hard quantity, and a one-tap cart.",
    zh: `核心是清库存，不讲情怀。

1 每天只推 1–2 款真有价差的货：CPU、显卡、SSD、内存。认得出的型号。
2 标题写死：今晚 8 点，某型号直降多少，限量多少。
3 实物出镜，最好未拆封。打开京东 / 天猫 / 拼多多同屏比价。重点是价，不是故事。
4 限时限量：只有今晚，售完恢复。
5 购物车第 1 个链接。口令：拍下备注「直播」。
6 报剩余件数。

10–15 分钟讲透一个品。价格没有优势就不要上这一档。`,
  },
  {
    id: "bios",
    cat: "live",
    title: { zh: "骆驼装机 · 抖音简介五案", en: "Five Douyin bios" },
    en: "Five bios for a PC-build account: expert, value, buddy, service, and a one-liner. Emoji stays inside the bio text.",
    zh: `方案一 · 专业
骆驼装机DIY
装机不迷路，骆驼带你上高速！
专注高性价比 DIY 方案 | 1 对 1 配置优化
从百元办公到万元主机，为你量身定制
每日分享装机干货与硬件知识
#装机 #电脑配置 #diy电脑 #数码

方案二 · 性价比
骆驼装机DIY
不卖最贵的，只装最适合你的！
专治选择困难，把预算花在刀刃上
游戏、设计、办公，都可以问
评论区写出需求和预算
#高性价比装机 #电脑推荐 #组装电脑

方案三 · 搭子
骆驼装机DIY
你的线上装机搭子
游戏党、设计师、程序员，都能对上配置
关注我，装机少踩坑
#数码 #电脑配置 #装机 #游戏主机

方案四 · 服务
骆驼装机DIY
装机有骆驼，省心又稳妥
配置推荐 | 硬件科普 | 装机指导 | 售后说清楚
不做一锤子买卖
私信预约咨询
#组装电脑 #电脑配置 #装机服务

方案五 · 短
骆驼装机DIY
说人话，讲干货，帮你装机。
游戏、办公、直播，按预算给方案。
#装机 #diy电脑 #电脑配置

专业用一，主打价格用二，要互动用三，强调售后用四，主页干净用五。`,
  },
  {
    id: "banned",
    cat: "live",
    title: { zh: "电脑直播违禁词", en: "PC livestream wording" },
    en: "Replacements for absolute claims, fake performance, fake urgency, and PC-specific promises. Check the script against the product page before going live.",
    zh: `绝对化
不说：全网最佳、最便宜、最高性价比、销量第一、全国首款、国家级、军工级。
改说：强劲表现、亲民价位、高性价比、热销机型。奖项和专利要有编号。

功效
不说：永不卡顿、100% 兼容、故障率 0%、跑分超越 99%。
改说：流畅运行主流软件、实测跑分是多少，并给出截图。

促销
不说：最后 3 台亏本、明天涨价 1000、刷屏抽奖、点链接免单。
改说：限时价写清截止时间，活动结束恢复哪一个价。抽奖只用站内功能。

硬件
不说：顶级显卡却不报型号、破解版系统、终身保修、原装进口却没有单据、没有授权却说官方合作。
改说：写出具体型号，正版系统，质保年限和售后政策一致。

竞品
不要「某品牌不如我们」。参数和页面不一致，处罚更重。
开播前用抖音电商学习中心再过一遍词。`,
  },
  {
    id: "action4",
    cat: "film",
    title: { zh: "Action4 装机拍摄", en: "Action4 build shooting" },
    en: "A checklist for DJI Action 4: 4K, 50 fps under lights, POV plus a second camera, and file names.",
    zh: `画质
4K，30 或 60 帧。室内灯闪就用 50 帧。
Mimo 导出先不要改帧率，进剪辑软件再定。
色彩用普通，不拍 Log。竖拍 9:16，横拍给全景。
机位：正面 90 度，侧面 30 度或 45 度。

景别
全景：三脚架，距离约 1.5 米，看整机灯光。防抖开着，不要大幅甩。
中景：0.5–1 米，看显卡或水冷头。固定机位，白平衡约 5500K。4K/30，ISO 约 100–800。
特写：微距会关电子增稳，用迷你三脚架，对焦大约 10–30 厘米。内存灯、风扇灯可以贴近。过曝就减曝光。

运镜
推、拉、摇、移、绕。环绕时开超强增稳。从机箱里往外拍要先拆侧板。
冷暖色温不要混。暗的时候优先脚架，不要先拉 ISO。

双机位直播
Action4 做第一人称，挂脖或头盔，竖拍要装竖拍框。
另一台手机拍装机全景。抖音直播伴侣里加两个画面，画中画或左右分屏。
两台设备同一网络。结束时先停大疆推流，再关直播。
声音只用主画面。开播前先测 10 分钟稳不稳。

文件名
日期_场景_帧率_灯光。例：20250820_海景_60fps_流光
1080P 代理用来剪，原片另存。`,
  },
  {
    id: "office-builds",
    cat: "gear",
    title: { zh: "四套办公主机 · 当时底稿", en: "Four office builds, old draft" },
    en: "Four office quotes kept as a draft: 2449, 2999, 2488, 3088. Those totals were the sheet at the time, not today's prices.",
    zh: `下面四套是当时的底稿合计，不是现在的售价。报价前重核。

INTEL1 · 底稿 2449
i5-10500
金百达银爵 DDR4 8G 3200
金百达 KP230 512G
华硕 H510M-F
核显
航嘉 GS400 额定 300W
航嘉 408 机箱
天极风 S50

INTEL2 · 底稿 2999
i5-12400
金百达黑爵 DDR4 16G 3200
KP230 512G
华硕 H610M-F
核显
航嘉 GS400 / 408 / 天极风 S50

AMD1 · 底稿 2488
锐龙 5 5600GT
银爵 DDR4 8G 3200
KP230 512G
华硕 A520M-K
航嘉 GS400 / 408 / 天极风 S50

AMD2 · 底稿 3088
锐龙 7 5700G
黑爵 DDR4 16G 3200
KP230 512G
华硕 B550M-K
航嘉 GS400 / 408 / 天极风 S50

表里写的是：全新，三年质保，系统激活，装机理线。升级另计。`,
  },
  {
    id: "msi-fan",
    cat: "gear",
    title: { zh: "微星风扇转速", en: "MSI fan curve" },
    en: "Quiet, balanced, and performance ranges, plus the MSI BIOS path and a note to fix airflow before maxing RPM.",
    zh: `档位
静音 800–1200 转：办公，大概 35 分贝以下。
平衡 1200–1800 转：游戏和剪辑。
性能 1800–2200 转：高负载，噪音会上去。

曲线
40℃ 以下：800–1000。
40–70℃：线性拉到 1200–1800。
70℃ 以上：先查风道，再考虑全速。

BIOS
开机按 Del。语言可切中文。
简易模式左侧「风扇」，勾选智能风扇。
节点建议 30 / 50 / 70 / 90℃。

噪音
橡胶垫减共振。前进后出，顶部排风。
Fan Control 可以按 GPU 温度联动，并加延迟，避免转速来回跳。
RGB 亮度不要跟负载闪。日常 1200–1500 转通常够用。`,
  },
  {
    id: "psu-types",
    cat: "gear",
    title: { zh: "电源三种对照", en: "Three PSU control types" },
    en: "Analog, digital, and switching supplies: how they control voltage, and where each one fits. The photo is the same note.",
    image: "/media/gear/psu.png",
    zh: `1 控制方式
模拟电源：运放、PWM 控制器给出连续信号，靠硬件反馈。
数字电源：MCU 或 DSP 用算法调参数，可以升级，也可以远程看。
开关电源：MOSFET / IGBT 快速通断，靠占空比变电压。它是实现方式，不是和前两种并列的第三套控制学。

2 特点
模拟：纹波小，短时过载好，成本低。精度怕温度，不能远程调。
数字：精度高，抗干扰，多路和保护更灵活。设计复杂，成本高。
开关：效率可以到 80% 以上，体积小，输入范围宽。高频噪声大，常常要再滤波。

3 场景
模拟：音频、实验室一类怕噪声的地方。
数字：服务器、数据中心、要细调的仪器。
开关：充电器、工业设备、要小要高效的地方。

口头记住一句：AMD 看时序，Intel 看频率。`,
  },
  {
    id: "amd-line",
    cat: "gear",
    title: { zh: "AMD 看时序", en: "AMD timing, Intel clocks" },
    en: "One line from the shop notes: for AMD look at timings, for Intel look at frequency.",
    zh: `AMD 看时序，Intel 看频率。

给客人讲内存时先问平台。AMD 平台把时序说清楚。Intel 平台把频率和是否 XMP 说清楚。不要只报一个 MHz。`,
  },
  {
    id: "sites",
    cat: "note",
    title: { zh: "硬件信息网站", en: "Hardware sites" },
    en: "A deduped list of review, price, and parts sites used for research.",
    zh: `评测
https://www.tomshardware.com/
https://www.techpowerup.com/
https://www.anandtech.com/
https://www.pcworld.com/
https://www.techradar.com/
https://www.ithome.com/
http://diy.yesky.com/

性能和价格
https://www.3dmark.com/
https://www.passmark.com/
https://pcpartpicker.com/
https://www.trendforce.cn/price
https://www.dramx.com/
https://www.chinaflashmarket.com/review

其他
https://www.donews.com/
https://www.digitimes.com.tw/
https://www.esmchina.com/
https://www.365pcbuy.com/
https://www.lotpc.com/
https://congwuku.com/
VideoCardz`,
  },
  {
    id: "schedule",
    cat: "film",
    title: { zh: "超能课堂 · 近期标题", en: "Recent class titles" },
    en: "Recent 超能课堂 titles only, newest first. A reference list, not a claim that these were published by this studio.",
    zh: `340 怎样的 PC 电源可以叫做数字电源？ 2025.07.07
339 H.264、H.265、H.266、VP9 和 AV1 对比 2025.05.22
338 RTX 50 系的电源需求 2025.01.23
337 Arrow Lake，酷睿 Ultra 2024.10.10
336 PC 主机的噪音从哪来 2024.09.23
335 不同负载下的真实功耗 2024.08.06
334 还能只看 TDP 选电源吗 2024.07.25
333 锐龙 9000 和锐龙 AI 300 2024.07.16
332 何为 CAMM2 2024.07.03
331 Lunar Lake 2024.06.06
330 ATX 3 为何能到 200% 峰值 2024.04.12

这些是收集的选题，不是本页作者的已发布栏目。`,
  },
  {
    id: "type-spec",
    cat: "film",
    title: { zh: "片头文本规范", en: "Title-card type spec" },
    en: "Two five-second title cards: canvas 1080×1920, 29.97 fps, 8-bit, with the type sizes used on the templates.",
    zh: `视频
1080×1920
29.97 fps
8bit

片头 A · 5 秒
TextA：真正懂 CPU 的人都选了什么 CPU
字体 HarmonyOS Sans SC Bold，大小 0.14，tracking 1.0，行距 1.2
TextB：HarmonyOS Sans SC Light，大小 0.036，tracking 1.0，行距 1.2，水平锚点 -1.0
TextC：价格公道，服务周到，售后有保
Bold，大小 0.06，tracking 1.0，行距 1.2，水平锚点 1.0
字色白，底色黑
Logo size 0.12

片头 B · 5 秒
模板 mHelloDV Avatar
TextA：jinrishuoji
HarmonyOS Sans SC Regular，大小 0.05，tracking 1.0，行距 1.0
模板 26 MAIN_TITLE
文字：感谢您的点赞、评论、加关注！
Bold，大小 0.09，tracking 1.0，行距 1.0
背景：Fusion Title - mHelloDV Avatar`,
  },
  {
    id: "tags",
    cat: "live",
    title: { zh: "话题标签", en: "Hashtags" },
    en: "Two tag lines kept from the shop notes: CPU talk, and Steam.",
    zh: `真正懂 CPU 的人，都选了什么 CPU？

#电脑知识 #电脑小技巧 #电脑配置 #电脑装机 #电脑

#steam #steam游戏 #steam热门游戏推荐 #steam喜加一 #steam史低`,
  },
  {
    id: "film-art",
    cat: "note",
    title: { zh: "影片美术 · 学习笔记", en: "Film art, study note" },
    en: "A condensed study note: sets, costume, props, color, and light. Not a client filmography.",
    zh: `这是读书笔记，不是做过的电影项目。

场景
时代和地域要能被认出来。氛围靠布局、色彩、光，不靠贴标语。动作场面要给身体留得出去的空间和合理的障碍。

人物
服装对身份、职业和年代。化妆改变的是年龄和状态，不是另一张脸。发型同样是年代信息。

道具
有的道具推动情节，有的只说明这个人是谁。一件道具最好同时是那个年代的物件。

色彩
主色定情绪。搭配要和场景一起看。一种跳出主色的颜色可以当符号，但一部片子里不要用太多次。

光
自然光和人工光分开想。侧光和逆光用来把脸从背景里切出来。同一场里光变了，时间和情绪也应该变。`,
  },
  {
    id: "shop-ops",
    cat: "note",
    title: { zh: "运营与申报笔记", en: "Shop ops and filing notes" },
    en: "Split, bundles, and a plain note of public small-scale VAT and income-tax rules. Not a tax-avoidance guide. Confirm with the tax office before you file.",
    zh: `适用场景：厂家代发，分成是厂家大头。下面是经营和申报备忘，不是避税方案。数字以税务机关当时的口径为准，申报前再核对。

分成和货盘
用销量和售后重新谈比例，例如把 3:7 谈到更接近对半。
争取指导价上下一档的定价空间。套餐差价归店铺的，写进协议。
阶梯：月销到一档，分成改一档。写进书面代销协议，写清发货和售后各归谁。

货
引流款用低价球拉人。利润在拍、手胶、护具。
穿线、印字、会员可以单独收费。
套餐按新手和进阶各做一套，不要只堆单品。

申报备忘（邢台襄都区个体户笔记）
增值税：笔记里的口径是小规模纳税人月销售额不超过 10 万元可以免征。超过再按当时的征收率。这是公开规则，不是把销售额拆到很多店里去卡线。
个人所得税：经营所得超额累进，笔记中的区间是 5%–35%。笔记还写了邢台对年应纳税所得额不超过 200 万元的部分有减半。是否仍有效，以当期公告为准。
附加：城建税、教育费附加、地方教育附加，笔记里写了六税两费减半。同样要核对当年名单。

征收方式
查账：有进项和费用发票时更合适。
核定：账不完整时的选项。笔记里零售业应税所得率大约 4%–6%，以当地核定为准。

票
采购、快递、平台佣金、推广，都留发票、合同和转账记录。没有凭证就不要自己减。
销售能开普票就开普票。专票对应的部分按规则计税。

执照范围写上体育用品零售和互联网销售。有对公账户更方便对账。每天记销量、收入和支出。`,
  },
];
