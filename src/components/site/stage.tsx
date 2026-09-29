import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/components/site/copy";
import { ui } from "@/components/site/copy";
import { stageOrder, stageSets, stageShot, type PreviewShot, type StageFrame } from "@/components/site/library";

const devices = ["phone", "tablet", "fold", "mac"] as const;
type DeviceId = (typeof devices)[number];
type FitMode = "auto" | "fill" | "fit" | "stretch" | "tile" | "center" | "span" | "scroll";

const SCREEN_ASPECT: Record<DeviceId, number> = {
  phone: 9 / 19.5,
  tablet: 3 / 4,
  fold: 4 / 3,
  mac: 16 / 7,
};

const FIT_OPTIONS: { id: FitMode; zh: string; en: string }[] = [
  { id: "auto", zh: "自动", en: "Auto" },
  { id: "fill", zh: "填充", en: "Fill" },
  { id: "fit", zh: "适应", en: "Fit" },
  { id: "stretch", zh: "拉伸", en: "Stretch" },
  { id: "tile", zh: "平铺", en: "Tile" },
  { id: "center", zh: "居中", en: "Center" },
  { id: "span", zh: "跨区", en: "Span" },
];

function parseRatio(ratio?: string) {
  if (!ratio) return null;
  const [a, b] = ratio.split("/").map((n) => Number(n.trim()));
  if (!a || !b) return null;
  return a / b;
}

function resolveFit(mode: FitMode, frame: StageFrame, id: DeviceId): Exclude<FitMode, "auto"> {
  if (mode !== "auto") return mode;
  if (!frame.video && frame.fit === "scroll") return "scroll";
  if (!frame.video) return "fit";
  const va = parseRatio(frame.ratio);
  const sa = SCREEN_ASPECT[id];
  if (!va) return "fill";
  const ratio = va / sa;
  if (ratio > 1.55 || ratio < 0.65) return "fit";
  return "fill";
}

export function DeviceStage({
  lang,
  scope,
  onOpen,
}: {
  lang: Lang;
  scope: number;
  onOpen: (shot: PreviewShot) => void;
}) {
  const t = ui[lang];
  const key = stageOrder[scope] ?? "hero";
  const frames = stageSets[key];
  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [device, setDevice] = useState<DeviceId>("phone");
  const [fits, setFits] = useState<Record<DeviceId, FitMode>>({
    phone: "fill",
    tablet: "fit",
    fold: "stretch",
    mac: "center",
  });
  const names: Record<DeviceId, string> = {
    phone: t.stagePhone,
    tablet: t.stageTablet,
    fold: t.stageFold,
    mac: t.stageMac,
  };

  useEffect(() => {
    setPage(0);
  }, [scope]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const total = root.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-root.getBoundingClientRect().top, 0), total);
      const progress = scrolled / total;
      root.style.setProperty("--glow", progress.toFixed(4));
      const next = Math.min(frames.length - 1, Math.floor(progress * frames.length * 0.999));
      setPage((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [frames.length, scope]);

  const seek = (index: number) => {
    const root = sectionRef.current;
    const next = Math.min(Math.max(index, 0), frames.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reduce) {
      setPage(next);
      return;
    }
    const total = Math.max(root.offsetHeight - window.innerHeight, 1);
    const start = root.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + ((next + 0.45) / frames.length) * total, behavior: "smooth" });
  };

  const frame = frames[Math.min(page, frames.length - 1)];

  return (
    <section className="story stage-block is-scrub" id="stage" ref={sectionRef}>
      <div className="stage-pin">
        <div className="container">
          <h2 className="h2">
            {t.stageTitle}
          </h2>
          <div className="stage-bar">
            <div className="stage-devices" role="tablist" aria-label={t.stageKicker}>
              {devices.map((id) => (
                <button key={id} type="button" role="tab" aria-selected={device === id} className={device === id ? "is-on" : ""} onClick={() => setDevice(id)}>
                  {names[id]}
                </button>
              ))}
            </div>
            <div className="stage-pages">
              <button type="button" onClick={() => seek(page - 1)} disabled={page === 0}>
                {t.stagePrev}
              </button>
              <span>
                {page + 1} / {frames.length}
              </span>
              <button type="button" onClick={() => seek(page + 1)} disabled={page === frames.length - 1}>
                {t.stageNext}
              </button>
            </div>
          </div>
          <div className="device-grid">
            {devices.map((id) => (
              <Device
                key={id}
                id={id}
                name={names[id]}
                frame={frame}
                play={device === id}
                preview={t.stagePreview}
                lang={lang}
                fit={fits[id]}
                onFit={(mode) => setFits((current) => ({ ...current, [id]: mode }))}
                onOpen={() => onOpen(stageShot(frame))}
              />
            ))}
          </div>
          <p className="stage-caption">
            <strong>{frame.title[lang]}</strong>
            <span>{frame.sub[lang]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Device({
  id,
  name,
  frame,
  play,
  preview,
  lang,
  fit,
  onFit,
  onOpen,
}: {
  id: DeviceId;
  name: string;
  frame: StageFrame;
  play: boolean;
  preview: string;
  lang: Lang;
  fit: FitMode;
  onFit: (mode: FitMode) => void;
  onOpen: () => void;
}) {
  const resolved = resolveFit(fit, frame, id);
  const tile = frame.poster || frame.img || "";
  const fitBar = (
    <div className="fit-bar" role="group" aria-label={lang === "zh" ? "画面适应" : "Fit"}>
      {FIT_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={fit === option.id ? "is-on" : ""}
          onClick={() => onFit(option.id)}
        >
          {lang === "zh" ? option.zh : option.en}
        </button>
      ))}
    </div>
  );
  const screen = (
    <div
      className={`device-screen is-${resolved}`}
      style={resolved === "tile" && tile ? { backgroundImage: `url(${tile})` } : undefined}
    >
      {id === "phone" ? <i className="island" aria-hidden="true" /> : null}
      {id === "fold" ? <i className="hinge" aria-hidden="true" /> : null}
      <Screen frame={frame} play={play} />
      <i className="device-glare" aria-hidden="true" />
      <button type="button" className="device-open" onClick={onOpen}>
        {preview}
      </button>
      {fitBar}
    </div>
  );

  if (id === "mac") {
    return (
      <figure className={`device is-mac${play ? " is-current is-shown" : ""}`}>
        <div className="mac-lid">{screen}</div>
        <div className="mac-base" aria-hidden="true" />
        <figcaption>{name}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`device is-${id}${play ? " is-current is-shown" : ""}`}>
      <div className="device-body">{screen}</div>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

function Screen({ frame, play }: { frame: StageFrame; play: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !play) return;
    video.muted = true;
    let tries = 0;
    const start = () => {
      video.play().catch(() => {
        if (tries < 1) {
          tries += 1;
          video.load();
        }
      });
    };
    if (video.readyState >= 2) start();
    else video.addEventListener("loadeddata", start, { once: true });
    return () => video.removeEventListener("loadeddata", start);
  }, [frame.video, play]);

  if (frame.video && play) {
    return (
      <video key={frame.video} ref={videoRef} controls autoPlay muted loop playsInline preload="auto" poster={frame.poster}>
        <source src={frame.video} type="video/mp4" />
      </video>
    );
  }
  if (frame.video) {
    return <img src={frame.poster} alt="" />;
  }
  return (
    <div className={`device-scroll is-${frame.fit}`} key={frame.id}>
      <img src={frame.img} alt="" />
    </div>
  );
}
