import { memo, useState } from "react";
import type { Lang } from "@/components/site/copy";
import { documents } from "@/components/site/docs";
import { aiShots, clips, studioUi, type PreviewShot } from "@/components/site/library";

const CLIP = 180;
const KEEP_DOCS = new Set(["comfy-base", "sd-standard", "negative-clean", "ip-styles", "openers"]);

export const Studio = memo(function Studio({
  lang,
  cursor,
  onOpen,
}: {
  lang: Lang;
  cursor: string;
  onOpen: (shot: PreviewShot) => void;
}) {
  const u = studioUi[lang];
  const [ai, setAi] = useState("all");
  const [docCat, setDocCat] = useState("all");
  const [query, setQuery] = useState("");
  const [openDocs, setOpenDocs] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stills = aiShots.filter((item) => ai === "all" || item.kind === ai);
  const keptDocs = documents.filter((doc) => KEEP_DOCS.has(doc.id));
  const q = query.trim().toLowerCase();
  const notes = keptDocs.filter((doc) => {
    if (docCat !== "all" && doc.cat !== docCat) return false;
    if (!q) return true;
    return `${doc.title.zh}\n${doc.title.en}\n${doc.zh}\n${doc.en}`.toLowerCase().includes(q);
  });

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopiedId(id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 1600);
  };

  return (
    <>
      <section className="story studio" id="ai">
        <div className="container">
          <p className="kicker">{u.aiKicker}</p>
          <h2 className="h2" style={{ marginTop: 12 }}>
            {u.aiTitle}
          </h2>
          <div className="chips" role="tablist" aria-label={u.aiKicker}>
            {u.aiFilters.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={ai === item.id} className={ai === item.id ? "is-on" : ""} onClick={() => setAi(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="shot-grid">
            {stills.map((shot) => (
              <button key={shot.id} type="button" className={`shot is-${shot.fit}${shot.span ? ` is-span${shot.span}` : ""}`} data-cursor={cursor} onClick={() => onOpen(shot)}>
                <figure>
                  <img src={shot.img} alt={`${shot.title[lang]} ${shot.sub[lang]}`} loading="lazy" decoding="async" />
                </figure>
                <p>
                  {shot.title[lang]}
                  {shot.sub[lang] ? <span>{shot.sub[lang]}</span> : null}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="story studio" id="video">
        <div className="container">
          <p className="kicker">{u.videoKicker}</p>
          <h2 className="h2" style={{ marginTop: 12 }}>
            {u.videoTitle}
          </h2>
          <h3 className="studio-sub">{u.hunyuan}</h3>
          <div className="film-grid is-portrait">
            {clips
              .filter((clip) => clip.engine === "hunyuan")
              .map((clip) => (
                <figure className="film" key={clip.id}>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={clip.poster}
                    style={{ aspectRatio: clip.ratio }}
                    onError={(event) => {
                      const node = event.currentTarget;
                      if (node.dataset.retried === "1") return;
                      node.dataset.retried = "1";
                      node.load();
                    }}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                  <figcaption>
                    <strong>{clip.title[lang]}</strong>
                    <span>{clip.sub[lang]}</span>
                  </figcaption>
                </figure>
              ))}
          </div>
          <h3 className="studio-sub">{u.minimax}</h3>
          <div className="film-grid is-wide">
            {clips
              .filter((clip) => clip.engine === "minimax")
              .map((clip) => (
                <figure className="film" key={clip.id}>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={clip.poster}
                    style={{ aspectRatio: clip.ratio }}
                    onError={(event) => {
                      const node = event.currentTarget;
                      if (node.dataset.retried === "1") return;
                      node.dataset.retried = "1";
                      node.load();
                    }}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                  <figcaption>
                    <strong>{clip.title[lang]}</strong>
                    <span>{clip.sub[lang]}</span>
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      </section>

      <section className="story studio" id="docs">
        <div className="container">
          <p className="kicker">{u.docsKicker}</p>
          <h2 className="h2" style={{ marginTop: 12 }}>
            {u.docsTitle}
          </h2>
          <input suppressHydrationWarning className="doc-search" type="text" inputMode="search" value={query} placeholder={u.search} aria-label={u.search} onChange={(event) => setQuery(event.target.value)} />
          <div className="chips" role="tablist" aria-label={u.docsKicker}>
            {u.docFilters
              .filter((item) => item.id === "all" || keptDocs.some((doc) => doc.cat === item.id))
              .map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={docCat === item.id} className={docCat === item.id ? "is-on" : ""} onClick={() => setDocCat(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          {notes.length === 0 ? <p className="body">{u.empty}</p> : null}
          <div className="doc-list">
            {notes.map((doc) => {
              const body = lang === "zh" ? doc.zh : doc.en;
              const long = body.length > CLIP;
              const open = Boolean(openDocs[doc.id]);
              return (
                <article className="doc-card" key={doc.id}>
                  <h3>{doc.title[lang]}</h3>
                  {doc.image ? (
                    <button
                      type="button"
                      className="doc-shot"
                      data-cursor={cursor}
                      onClick={() =>
                        onOpen({
                          img: doc.image ?? "",
                          title: doc.title,
                          sub: { zh: "电源类型对照", en: "PSU types" },
                        })
                      }
                    >
                      <img src={doc.image} alt={doc.title[lang]} loading="lazy" decoding="async" />
                    </button>
                  ) : null}
                  <p className={`doc-body${long && !open ? " is-clip" : ""}`}>{body}</p>
                  <div className="doc-actions">
                    <button type="button" onClick={() => void copyText(doc.id, body)}>
                      {copiedId === doc.id ? u.copied : u.copy}
                    </button>
                    {lang === "en" ? (
                      <button type="button" onClick={() => void copyText(`${doc.id}-zh`, doc.zh)}>
                        {copiedId === `${doc.id}-zh` ? u.copied : u.copyZh}
                      </button>
                    ) : null}
                    {long ? (
                      <button type="button" onClick={() => setOpenDocs((current) => ({ ...current, [doc.id]: !open }))}>
                        {open ? u.less : u.more}
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
});
