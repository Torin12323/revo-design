import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { EMAIL, jobs, masters, PHONE, photos, tools, ui, works, skills, type Cat, type Lang, type WorkItem } from "@/components/site/copy";
import type { PreviewShot } from "@/components/site/library";
import { Studio } from "@/components/site/studio";
import { GlassCube } from "@/components/site/glass-cube";
const ZOOMS = [50, 75, 100, 150, 200] as const;

const MasterRail = memo(function MasterRail({ lang }: { lang: Lang }) {
  const cards = (copy: boolean) =>
    masters.map((person) => (
      <figure className="master-card" key={`${person.en}${copy ? "-b" : ""}`}>
        <img
          src={person.img}
          alt={copy ? "" : lang === "zh" ? person.zh : person.en}
          draggable={false}
          loading={copy ? "lazy" : "eager"}
          decoding="async"
        />
        <figcaption>{lang === "zh" ? person.zh : person.en}</figcaption>
      </figure>
    ));
  return (
    <div className="master-rail" aria-label={lang === "zh" ? "国内外设计大师" : "Design masters"}>
      <div className="master-track">
        <div className="master-set">{cards(false)}</div>
        <div className="master-set" aria-hidden="true">
          {cards(true)}
        </div>
      </div>
    </div>
  );
});

function KeywordRail({ items }: { items: readonly string[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let hot = -1;
    let visible = true;
    let hidden = document.hidden;
    const apply = () => {
      const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      const nodes = track.querySelectorAll<HTMLElement>("[data-kw]");
      let next = 0;
      let best = Number.POSITIVE_INFINITY;
      for (let i = 0; i < nodes.length; i++) {
        const box = nodes[i].getBoundingClientRect();
        const dist = Math.abs(box.left + box.width / 2 - mid);
        if (dist < best) {
          best = dist;
          next = i;
        }
      }
      if (next === hot) return;
      if (hot >= 0) nodes[hot]?.classList.remove("is-on");
      nodes[next]?.classList.add("is-on");
      hot = next;
    };
    const loop = () => {
      if (!visible || hidden) return;
      apply();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (!visible || hidden) return;
      if (reduce) {
        apply();
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        start();
      },
      { threshold: 0 },
    );
    io.observe(rail);
    const onVis = () => {
      hidden = document.hidden;
      start();
    };
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [items]);

  const set = items.map((name) => (
    <span key={name} data-kw>
      {name}
    </span>
  ));

  return (
    <div className="kw-rail" ref={railRef}>
      <div className="kw-track" ref={trackRef}>
        <div className="kw-set">{set}</div>
        <div className="kw-set" aria-hidden="true">
          {items.map((name) => (
            <span key={`${name}-b`} data-kw>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const total = Math.max(rect.height * 0.55, window.innerHeight * 0.45);
      const next = Math.round(Math.min(1, Math.max(0, (start - rect.top) / total)) * 24) / 24;
      setP((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

function Statement({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const statementRef = useRef<HTMLElement>(null);
  const [rail, setRail] = useState(0);
  const [railOn, setRailOn] = useState(false);
  const progress = useScrollProgress(statementRef);
  const railRaf = useRef(0);
  const moveRail = (clientX: number, box: DOMRect) => {
    const x = (clientX - box.left) / box.width;
    const next = Math.round(Math.min(1, Math.max(0, (x - 0.06) / 0.88)) * 48) / 48;
    setRail((prev) => (prev === next ? prev : next));
  };
  return (
    <section className="statement" id="timeline" ref={statementRef}>
      <div className="container">
        <h2 className="statement-line">
          {t.statement.map((token, i) => {
            const on = progress * t.statement.length > i - 0.15;
            return (
              <span key={token.t}>
                <span className="word" style={{ color: on ? "var(--color-ink)" : "color-mix(in srgb, var(--color-ink) 28%, transparent)" }}>
                  {token.t}
                </span>
                {"br" in token && token.br ? <br /> : lang === "en" ? " " : null}
              </span>
            );
          })}
        </h2>
        <div
          className={`timeline${railOn ? " is-scrub" : ""}`}
          style={{ ["--lit" as string]: rail }}
          onPointerMove={(e) => {
            const box = e.currentTarget.getBoundingClientRect();
            const x = e.clientX;
            setRailOn(true);
            cancelAnimationFrame(railRaf.current);
            railRaf.current = requestAnimationFrame(() => moveRail(x, box));
          }}
          onPointerLeave={() => setRailOn(false)}
        >
          <div className="timeline-rail" />
          <div className="timeline-rail-on" />
          <div className="blocks">
            {[...jobs].reverse().map((job, i) => (
              <div
                key={job.org.zh}
                className={`block${progress > i / jobs.length ? " is-in" : ""}${(i + 0.45) / jobs.length <= rail ? " is-lit" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <i className="block-dot" aria-hidden="true" />
                <p>
                  {job.role[lang]}
                  <small>{job.when[lang]}</small>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs">
          <p className="kicker">{t.jobKicker}</p>
          <div className="job-sheet">
            <span className="job-flow" aria-hidden="true" />
            {jobs.map((job) => (
              <article key={job.org.zh} className="job">
                <div>
                  <p className="cap">{job.when[lang]}</p>
                  <h3 className="job-role">{job.role[lang]}</h3>
                </div>
                <div>
                  <p className="body">{job.org[lang]}</p>
                  <ul>
                    {job.points[lang].map((point) => (
                      <li key={point} className="body">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <article className="job">
              <div>
                <p className="cap">{t.eduKicker}</p>
                <h3 className="job-role">{t.eduWhen}</h3>
              </div>
              <div>
                <p className="body">{t.eduOrg}</p>
                <p className="body" style={{ marginTop: 6 }}>
                  {t.eduNote}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [booted, setBooted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [onPoster, setOnPoster] = useState(true);
  const [contact, setContact] = useState(false);
  const [feature, setFeature] = useState(0);
  const [cat, setCat] = useState<Cat>("all");
  const [openWork, setOpenWork] = useState<PreviewShot | null>(null);
  const [zoom, setZoom] = useState(100);
  const [copied, setCopied] = useState(false);
  const tickerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const anchorRef = useRef<{ x: number; y: number; u: number; v: number } | null>(null);
  const zoomRef = useRef(100);
  const shotRef = useRef<PreviewShot | null>(null);
  const [panning, setPanning] = useState(false);
  const t = ui[lang];
  const openShot = useCallback((shot: PreviewShot) => setOpenWork(shot), []);

  useEffect(() => {
    const root = tickerRef.current;
    if (!root) return;
    let raf = 0;
    let hot: HTMLElement | null = null;
    let visible = true;
    let hidden = document.hidden;
    const apply = () => {
      const box = root.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      const band = box.width * 0.16;
      let next: HTMLElement | null = null;
      let best = band;
      const spans = root.querySelectorAll<HTMLElement>(".marquee-track span");
      for (const span of spans) {
        const r = span.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - mid);
        if (dist < best) {
          best = dist;
          next = span;
        }
      }
      if (next !== hot) {
        hot?.classList.remove("is-hot");
        next?.classList.add("is-hot");
        hot = next;
      }
    };
    const loop = () => {
      if (!visible || hidden) return;
      apply();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (visible && !hidden) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        start();
      },
      { threshold: 0 },
    );
    io.observe(root);
    const onVis = () => {
      hidden = document.hidden;
      start();
    };
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("jt-lang");
    if (saved === "en" || saved === "zh") setLang(saved);
    const savedTheme = window.localStorage.getItem("jt-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("jt-lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jt-theme", theme);
  }, [theme]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      setOnPoster(y < window.innerHeight * 0.82);
      if (y < 40) setNavHidden(false);
      else if (y > last + 8) setNavHidden(true);
      else if (y < last - 8) setNavHidden(false);
      else if (y === last) setNavHidden(y > 40);
      last = y;
    };
    update();
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setBooted(true), reduce ? 0 : 1700);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || contact || openWork ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, contact, openWork]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !openWork) {
      shotRef.current = null;
      return;
    }
    if (shotRef.current !== openWork) {
      shotRef.current = openWork;
      anchorRef.current = null;
      if (zoom !== 100) {
        zoomRef.current = 100;
        setZoom(100);
        return;
      }
    }
    const anchor = anchorRef.current;
    const place = () => {
      const media = stage.querySelector("img, video") as HTMLImageElement | HTMLVideoElement | null;
      const canvas = stage.querySelector<HTMLElement>(".viewer-canvas");
      if (!media || !canvas) return;
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const gutter = sw < 720 ? 32 : 56;
      const imgW = Math.max(1, (sw - gutter) * (zoom / 100));
      media.style.width = `${imgW}px`;
      const nw = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
      const nh = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
      const ratio = nw > 0 ? nh / nw : 0;
      const imgH = media.offsetHeight || (ratio ? imgW * ratio : 0);
      canvas.style.width = `${imgW + sw * 2}px`;
      canvas.style.height = `${Math.max(imgH, 1) + sh * 2}px`;
      media.style.left = `${sw}px`;
      media.style.top = `${sh}px`;
      if (!anchor || !imgH) {
        stage.scrollLeft = sw / 2 + imgW / 2;
        stage.scrollTop = sh;
        return;
      }
      const u = Math.min(1, Math.max(0, anchor.u));
      const v = Math.min(1, Math.max(0, anchor.v));
      stage.scrollLeft = sw + u * imgW - anchor.x;
      stage.scrollTop = sh + v * imgH - anchor.y;
    };
    place();
    const media = stage.querySelector("img, video") as HTMLImageElement | HTMLVideoElement | null;
    if (!media) return;
    const ready = media instanceof HTMLVideoElement ? media.readyState >= 2 : media.complete;
    if (ready) return;
    const event = media instanceof HTMLVideoElement ? "loadeddata" : "load";
    media.addEventListener(event, place, { once: true });
    return () => media.removeEventListener(event, place);
  }, [openWork, zoom]);

  const rememberAnchor = (clientX: number, clientY: number) => {
    const stage = stageRef.current;
    const img = stage?.querySelector("img, video");
    if (!stage || !img) return;
    const stageBox = stage.getBoundingClientRect();
    const imgBox = img.getBoundingClientRect();
    anchorRef.current = {
      x: clientX - stageBox.left,
      y: clientY - stageBox.top,
      u: (clientX - imgBox.left) / (imgBox.width || 1),
      v: (clientY - imgBox.top) / (imgBox.height || 1),
    };
    pointerRef.current = { x: clientX, y: clientY };
  };

  const zoomAt = (next: number, clientX?: number, clientY?: number) => {
    const stage = stageRef.current;
    const clamped = Math.min(400, Math.max(50, Math.round(next)));
    if (!stage) {
      zoomRef.current = clamped;
      setZoom(clamped);
      return;
    }
    const box = stage.getBoundingClientRect();
    const saved = pointerRef.current;
    const x = clientX ?? saved?.x ?? box.left + box.width / 2;
    const y = clientY ?? saved?.y ?? box.top + stage.clientHeight / 2;
    rememberAnchor(Math.min(Math.max(x, box.left + 1), box.right - 1), Math.min(Math.max(y, box.top + 1), box.bottom - 1));
    zoomRef.current = clamped;
    setZoom(clamped);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !openWork) return;
    const onWheel = (event: WheelEvent) => {
      if (panRef.current) return;
      event.preventDefault();
      const current = zoomRef.current;
      const next = Math.min(400, Math.max(50, Math.round(current * Math.exp(-event.deltaY * 0.0015))));
      if (next === current) return;
      rememberAnchor(event.clientX, event.clientY);
      zoomRef.current = next;
      setZoom(next);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [openWork]);

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const stage = stageRef.current;
    if (!stage) return;
    const box = stage.getBoundingClientRect();
    if (event.clientX > box.left + stage.clientWidth || event.clientY > box.top + stage.clientHeight) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
    panRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    setPanning(true);
  };

  const onStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    const pan = panRef.current;
    const stage = stageRef.current;
    if (!pan || !stage || pan.id !== event.pointerId) return;
    stage.scrollLeft = pan.left - (event.clientX - pan.x);
    stage.scrollTop = pan.top - (event.clientY - pan.y);
  };

  const endPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!panRef.current || panRef.current.id !== event.pointerId) return;
    panRef.current = null;
    setPanning(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setContact(false);
        setOpenWork(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let moving = false;
    const loop = () => {
      const dx = x - cx;
      const dy = y - cy;
      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        moving = false;
        return;
      }
      cx += dx * 0.22;
      cy += dy * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!moving && !document.hidden) {
        moving = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const over = (e: Event) => {
      const host = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (host) {
        el.classList.add("is-on");
        if (cursorLabel.current) cursorLabel.current.textContent = host.getAttribute("data-cursor") || "";
      } else el.classList.remove("is-on");
    };
    const onVis = () => {
      if (document.hidden) {
        moving = false;
        cancelAnimationFrame(raf);
      }
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const openContact = () => {
    setMenu(false);
    setOpenWork(null);
    setContact(true);
  };

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className={`loader${booted ? " is-out" : ""}`} aria-hidden={booted}>
        <div className="loader-word">
          {"Revo".split("").map((ch, i) => (
            <i key={ch} style={{ animationDelay: `${i * 90}ms` }}>
              {ch}
            </i>
          ))}
        </div>
      </div>

      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <span ref={cursorLabel} />
      </div>

      <div className={`overlay${menu ? " is-on" : ""}`} onClick={() => setMenu(false)} />

      <nav className={`menu-panel${menu ? " is-on" : ""}`} aria-hidden={!menu}>
        <ul className="menu-list">
          {t.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => {
                  setMenu(false);
                  if ((item.href as string) === "#contact") window.setTimeout(openContact, 350);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <span>{t.menuFoot[0]}</span>
          <span>{t.menuFoot[1]}</span>
        </div>
      </nav>

      <header className={`header${booted ? " is-on" : ""}${navHidden && !menu ? " is-hidden" : ""}${onPoster ? " is-poster" : ""}`}>
        <div className="container header-bar">
          <a href="#top" className="logo" data-cursor={t.contact}>
            <span className="logo-mark">
              <img src="/media/work/avatar.jpg" alt="" />
            </span>
            Revo
          </a>
          <nav className="nav" aria-label={lang === "zh" ? "主导航" : "Primary"}>
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if ((item.href as string) === "#contact") {
                    e.preventDefault();
                    openContact();
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-right">
            <div className="lang-switch" role="group" aria-label={lang === "zh" ? "外观" : "Appearance"}>
              <button type="button" className={theme === "dark" ? "is-on" : ""} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
                {lang === "zh" ? "深色" : "Dark"}
              </button>
              <button type="button" className={theme === "light" ? "is-on" : ""} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
                {lang === "zh" ? "浅色" : "Light"}
              </button>
            </div>
            <div className="lang-switch" role="group" aria-label={lang === "zh" ? "语言" : "Language"}>
              <button type="button" className={lang === "zh" ? "is-on" : ""} aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>
                中文
              </button>
              <button type="button" className={lang === "en" ? "is-on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
            <button className="butter-btn" type="button" onClick={openContact}>
              <span className="butter-btn-face">{t.contact}</span>
            </button>
            <button className="menu-btn" type="button" aria-label={menu ? t.menuClose : t.menuOpen} onClick={() => setMenu((v) => !v)}>
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="sheet">
          <section className="hero" aria-label={lang === "zh" ? "开场" : "Intro"}>
            <div className="hero-poster" aria-hidden="true">
              <GlassCube label={t.hero[0]} />
            </div>
            <div className="container hero-copy">
              <h1 className="h1 is-ghost">
                {t.hero.map((line, i) => (
                  <Reveal key={line} delay={i * 80}>
                    {line}
                  </Reveal>
                ))}
              </h1>
              <div className="hero-sub">
                <KeywordRail items={t.heroKeys} />
                <a className="butter-btn" href="#work">
                  <span className="butter-btn-face">{t.heroCta}</span>
                </a>
              </div>
            </div>
            <MasterRail lang={lang} />
            <section className="ticker hero-ticker" aria-label={t.ticker} ref={tickerRef}>
              <div className="marquee">
                <div className="marquee-track">
                  {[...tools, ...tools].map((name, i) => (
                    <span key={name + i}>{name}</span>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <Statement lang={lang} />

          <section className="story" id="skills">
            <div className="container">
              <div className="gallery-head">
                <div>
                  <p className="kicker">{t.scopeKicker}</p>
                  <h2 className="h2" style={{ marginTop: 12 }}>
                    <Reveal>{t.scopeTitle[0]}</Reveal>
                    <Reveal delay={70}>{t.scopeTitle[1]}</Reveal>
                  </h2>
                </div>
                <a className="ghost-link" href="#work">
                  {t.scopeLink}
                </a>
              </div>
              <div className="feature-layout">
                <div className="feature-list">
                  {t.scopes.map((item, i) => (
                    <a key={item.title} href="#work" className={feature === i ? "is-on" : ""} onMouseEnter={() => setFeature(i)} onFocus={() => setFeature(i)} onClick={() => setFeature(i)}>
                      <strong>{item.title}</strong>
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  className="feature-media"
                  data-cursor={t.open}
                  onClick={() => {
                    const zh = ui.zh.scopes[feature];
                    const en = ui.en.scopes[feature];
                    setOpenWork({ img: zh.img, title: { zh: zh.title, en: en.title }, sub: { zh: zh.body, en: en.body } });
                  }}
                >
                  {t.scopes.map((item, i) => (
                    <img key={item.title} src={item.img} alt="" className={feature === i ? "is-on" : ""} decoding="async" />
                  ))}
                  <span className="feature-preview">{t.stagePreview}</span>
                </button>
              </div>
            </div>
          </section>

          <section className="story" style={{ paddingTop: 0 }}>
            <div className="container dial-layout">
              <div>
                <img src="/media/work/portrait.jpg" alt={lang === "zh" ? "Revo" : "Revo Gong"} decoding="async" style={{ width: "min(100%, 420px)", borderRadius: "22%", aspectRatio: "1", objectFit: "cover" }} />
              </div>
              <div>
                <p className="kicker">{t.skillKicker}</p>
                <h2 className="h2" style={{ marginTop: 16 }}>
                  <Reveal>{t.skillTitle[0]}</Reveal>
                  <Reveal delay={70}>{t.skillTitle[1]}</Reveal>
                </h2>
                <div className="skills">
                  {skills.map((skill) => (
                    <div className="skill-row" key={skill.en}>
                      <span>{skill[lang]}</span>
                      <div className="skill-track" aria-hidden="true">
                        <i style={{ width: skill.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="gallery" id="work">
            <div className="container gallery-head">
              <div>
                <p className="kicker">{t.workKicker}</p>
                <h2 className="h2" style={{ marginTop: 12 }}>
                  {t.workTitle.map((line, i) => (
                    <Reveal key={line} delay={i * 70}>
                      {line}
                    </Reveal>
                  ))}
                </h2>
              </div>
            </div>
            <div className="rows">
              <div className="row-track">
                {[...works.slice(0, 7), ...works.slice(0, 7)].map((work, i) => (
                  <WorkCard key={work.id + i} work={work} lang={lang} cursor={t.open} onOpen={openShot} />
                ))}
              </div>
            </div>
            <div className="container" style={{ marginTop: 36 }}>
              <div className="chips" role="tablist" aria-label={t.workKicker}>
                {t.cats.map((item) => (
                  <button key={item.id} type="button" role="tab" aria-selected={cat === item.id} className={cat === item.id ? "is-on" : ""} onClick={() => setCat(item.id)}>
                    {item.label}
                  </button>
                ))}
              </div>
              {(cat === "all" ? t.cats.filter((item) => item.id !== "all") : t.cats.filter((item) => item.id === cat)).map((item) => (
                <div className="work-block" key={item.id}>
                  <h3>{item.label}</h3>
                  <div className="work-grid">
                    {works
                      .filter((work) => work.cat === item.id)
                      .map((work) => (
                        <WorkCard key={work.id} work={work} lang={lang} cursor={t.open} onOpen={openShot} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="gallery" id="photo">
            <div className="container gallery-head">
              <div>
                <p className="kicker">{t.photoKicker}</p>
                <h2 className="h2" style={{ marginTop: 12 }}>
                  <Reveal>{t.photoTitle[0]}</Reveal>
                </h2>
              </div>
            </div>
            <div className="container">
              <div className="photo-grid">
                {photos.map((photo) => (
                  <figure
                    key={photo.id}
                    data-cursor={t.open}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenWork(photo)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenWork(photo);
                      }
                    }}
                  >
                    <img src={photo.img} alt={photo.title[lang]} loading="lazy" decoding="async" />
                    <figcaption>
                      <strong>{photo.title[lang]}</strong>
                      <span>{photo.sub[lang]}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
          <Studio lang={lang} cursor={t.open} onOpen={openShot} />
        </div>

        <footer className="footer" id="contact">
          <div className="container footer-grid">
            <div>
              <p className="kicker">{t.sheetKicker}</p>
              <p className="footer-mark">Revo</p>
            </div>
            <div className="footer-col">
              <strong>{t.footWorks}</strong>
              {t.nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              <a href="#skills">{t.skillKicker}</a>
            </div>
            <div className="footer-col">
              <strong>{t.footContact}</strong>
              <a href={`tel:${PHONE}`}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button type="button" onClick={copyMail} style={{ background: "none", border: 0, padding: 0, font: "inherit", textAlign: "left", color: "inherit" }}>
                {copied ? t.copied : t.copyMail}
              </button>
            </div>
            <div className="footer-col">
              <strong>{t.footPlace}</strong>
              <span>{t.menuFoot[0]}</span>
              <span>{t.eduOrg}</span>
              <span>{t.eduNote}</span>
            </div>
          </div>
          <div className="container legal">
            <span>Revo</span>
            <span>{t.rights}</span>
          </div>
        </footer>
      </main>

      <aside className={`contact${contact ? " is-on" : ""}`} aria-hidden={!contact}>
        <button className="contact-close" type="button" aria-label={t.close} onClick={() => setContact(false)}>
          <X size={18} />
        </button>
        <p className="kicker" style={{ color: "rgba(250,250,250,0.55)" }}>
          {t.sheetKicker}
        </p>
        <h2>{t.sheetTitle}</h2>
        <p>{t.sheetBody}</p>
        <div className="contact-actions">
          <a className="butter-btn" href={`tel:${PHONE}`}>
            <span className="butter-btn-face">{PHONE}</span>
          </a>
          <a className="butter-btn" href={`mailto:${EMAIL}`}>
            <span className="butter-btn-face">{EMAIL}</span>
          </a>
          <button className="butter-btn" type="button" onClick={() => void copyMail()}>
            <span className="butter-btn-face">{copied ? t.copied : t.copyMail}</span>
          </button>
        </div>
      </aside>

      {openWork ? (
        <div className="viewer" role="dialog" aria-modal="true" aria-label={openWork.title[lang]}>
          <div className="viewer-frame">
            <div className="viewer-bar">
              <div className="viewer-meta">
                <strong>{openWork.title[lang]}</strong>
                <span>{openWork.sub[lang]}</span>
              </div>
              <div className="zoom-switch" role="group" aria-label={t.zoom}>
                {ZOOMS.map((value) => (
                  <button key={value} type="button" className={zoom === value ? "is-on" : ""} onClick={() => zoomAt(value)}>
                    {value}%
                  </button>
                ))}
              </div>
              <span className="zoom-now">{zoom}%</span>
              <button className="contact-close viewer-close" type="button" aria-label={t.close} onClick={() => setOpenWork(null)}>
                <X size={18} />
              </button>
            </div>
            <div
              className={`viewer-stage${panning ? " is-panning" : ""}`}
              ref={stageRef}
              onPointerDown={onStagePointerDown}
              onPointerMove={onStagePointerMove}
              onPointerUp={endPan}
              onPointerCancel={endPan}
            >
              <div className="viewer-canvas">
                {openWork.video ? (
                  <video src={openWork.video} poster={openWork.img} controls playsInline />
                ) : (
                  <img src={openWork.img} alt={openWork.title[lang]} draggable={false} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const WorkCard = memo(function WorkCard({
  work,
  lang,
  cursor,
  onOpen,
}: {
  work: WorkItem;
  lang: Lang;
  cursor: string;
  onOpen: (work: WorkItem) => void;
}) {
  return (
    <button type="button" className="work-card" data-cursor={cursor} onClick={() => onOpen(work)} style={{ background: "none", border: 0, padding: 0, textAlign: "left", color: "inherit", font: "inherit" }}>
      <figure style={{ aspectRatio: work.ratio ?? "4 / 5" }}>
        <img src={work.poster ?? work.img} alt={`${work.title[lang]}，${work.sub[lang]}`} loading="lazy" decoding="async" />
      </figure>
      <p>
        {work.title[lang]}
        <span>{work.sub[lang]}</span>
      </p>
    </button>
  );
});
