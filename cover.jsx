// ============ 表紙（カバー）コンポーネント ============
// 実画像があれば <img>、なければ同スタイルの仮表紙インフォグラフィックを描画。

function CoverIcon({ name }) {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round" };
  const head = (<g><circle cx="12" cy="8.5" r="3.1" /><path d="M6 19c.6-3.4 3-5 6-5s5.4 1.6 6 5" /></g>);
  switch (name) {
    case "price": return (<svg {...p}><path d="M12 6v12M8 7l4 5 4-5M9 12h6M9.5 15h5" /></svg>);
    case "compare": return (<svg {...p}><path d="M12 4v16M5 9l-2.5 5h5zM19 9l-2.5 5h5zM7 7h10" /></svg>);
    case "time": case "later": return (<svg {...p}><circle cx="12" cy="12" r="8" /><path d="M12 8v4.5l3 1.7" /></svg>);
    case "trust": return (<svg {...p}><path d="M12 3l7 3v5c0 4.4-3 7-7 8-4-1-7-3.6-7-8V6z" /><path d="M9 12l2 2 4-4" /></svg>);
    case "decision": return (<svg {...p}><path d="M3 12l4-1 5 4 2-1.5M21 12l-4-1-3 2.4M7 11l2.5-2.5 3 1 3-3 3 2" /></svg>);
    case "no": return (<svg {...p}><circle cx="12" cy="12" r="8" /><path d="M7 7l10 10" /></svg>);
    case "hello": return (<svg {...p}>{head}<path d="M17 5l1.4-1.4M19 8h2M17 11l1.4 1.4" /></svg>);
    case "search": return (<svg {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M20 20l-5-5" /></svg>);
    case "problem": return (<svg {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M20 20l-4-4M10.5 8v3M10.5 13.4v.1" /></svg>);
    case "idea": return (<svg {...p}><path d="M9 16h6M10 19h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.1H9c0-.8-.4-1.5-1-2.1A6 6 0 0 1 12 3z" /></svg>);
    case "talk": return (<svg {...p}><path d="M4 5h16v10H9l-4 3v-3H4z" /><path d="M8 9h8M8 12h5" /></svg>);
    case "worry": return (<svg {...p}>{head}<path d="M16.5 4.5c1.6 0 2.4 1 2.4 2 0 1.3-1.6 1.4-1.6 2.7M16.9 11.4v.1" /></svg>);
    case "show": return (<svg {...p}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.6" /></svg>);
    case "choice": return (<svg {...p}><path d="M12 4v6M12 10l-4 4v4M12 10l4 4v4" /><circle cx="12" cy="4" r="1.4" /></svg>);
    case "silence": return (<svg {...p}><path d="M4 5h16v10H9l-4 3v-3H4z" /><path d="M9 8l6 4M15 8l-6 4" /></svg>);
    case "push": return (<svg {...p}><path d="M12 20V8M7 13l5-5 5 5M6 5h12" /></svg>);
    case "check": return (<svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M8 12.2l2.6 2.6L16 9.5" /></svg>);
    case "clipboard": return (<svg {...p}><rect x="6" y="4.5" width="12" height="16" rx="2" /><path d="M9 4.5h6v2H9z" /><path d="M9 11l1.4 1.4L13 9.8M9 15.5h6" /></svg>);
    case "bulb": return (<svg {...p}><path d="M9.2 17h5.6M10 20h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.1H9c0-.8-.4-1.5-1-2.1A6 6 0 0 1 12 3z" /></svg>);
    default: return (<svg {...p}><circle cx="12" cy="12" r="8" /></svg>);
  }
}

function Chevron() {
  return (
    <svg className="step-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function InfographicCover({ cover }) {
  const c = cover;
  return (
    <div className="cover">
      <div className="cover-corner"><span>{c.num}</span></div>
      <div className="cover-save">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 4h10v16l-5-3.5L7 20z" />
        </svg>
        保存版
      </div>

      <div className="cover-hook">
        <span className="spark">＼</span>
        <div className="hk1">{c.hook.l1}</div>
        <div className="hk2">
          {c.hook.l2.map((s, i) => s.e
            ? <span key={i} className="emph">{s.t}</span>
            : <span key={i}>{s.t}</span>)}
        </div>
      </div>

      <div className="cover-title">
        <span>{c.titlePre}</span>
        <span className="num">{c.titleNum}</span>
        <span className="suf">{c.titlePost}</span>
      </div>

      <div className="cover-sub">
        <div className="cover-sub-ic"><CoverIcon name="clipboard" /></div>
        <div className="cover-sub-tx">
          <div className="sm-main">
            {c.subMain.map((ln, i) => (
              <div key={i}>
                {ln.t}
                {ln.em && <span className="emph">“{ln.em}”</span>}
                {ln.t2}
              </div>
            ))}
          </div>
          <div className="sm-small">
            {c.subSmall.map((ln, i) => <div key={i}>{ln}</div>)}
          </div>
        </div>
      </div>

      <div className="cover-steps">
        {c.steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="step">
              <div className="circle"><CoverIcon name={s.icon} /></div>
              <div className="step-label">{s.label}</div>
            </div>
            {i < c.steps.length - 1 && <Chevron />}
          </React.Fragment>
        ))}
      </div>

      <div className="cover-bottom">
        <CoverIcon name="bulb" />
        <span>{c.bottom}</span>
      </div>
    </div>
  );
}

const __coverCache = {};
const __COVER_LS_PREFIX = "coverpdf:v2:";

function loadCachedCover(pdf) {
  if (__coverCache[pdf]) return __coverCache[pdf];
  try {
    const v = localStorage.getItem(__COVER_LS_PREFIX + pdf);
    if (v) { __coverCache[pdf] = v; return v; }
  } catch (e) {}
  return null;
}

function CoverFromPdf({ pdf, label, fallback }) {
  const ref = React.useRef(null);
  const [state, setState] = React.useState(loadCachedCover(pdf) ? "loaded" : "loading");

  React.useEffect(() => {
    let cancelled = false;
    const host = ref.current;
    if (!host) return;
    const lib = window.pdfjsLib;

    const place = (url) => {
      if (cancelled) return;
      host.style.backgroundImage = "url(" + url + ")";
      setState("loaded");
    };

    const cached = loadCachedCover(pdf);
    if (cached) { place(cached); return; }
    if (!lib) { setState("error"); return; }
    lib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    (async () => {
      try {
        const doc = await lib.getDocument(pdf).promise;
        if (cancelled) return;
        const page = await doc.getPage(1);
        const base = page.getViewport({ scale: 1 });
        const cssW = Math.min(host.clientWidth || 360, 480);
        const RES = 2.0; // supersample for a crisp cover
        const vp = page.getViewport({ scale: (cssW / base.width) * RES });
        const canvas = document.createElement("canvas");
        canvas.className = "cover-canvas";
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
        host.appendChild(canvas); // on-screen: off-screen canvases get throttled
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        if (cancelled) { canvas.remove(); return; }
        try {
          const url = canvas.toDataURL("image/jpeg", 0.92);
          __coverCache[pdf] = url;
          try { localStorage.setItem(__COVER_LS_PREFIX + pdf, url); } catch (e) {}
        } catch (e) {}
        if (!cancelled) setState("loaded");
      } catch (e) {
        console.error("cover render error", e);
        if (!cancelled) setState("error");
      }
    })();
    return () => { cancelled = true; };
  }, [pdf]);

  return (
    <div className={"cover-img cover-pdf " + state}>
      <div className="cover-canvas-host" ref={ref}></div>
      {state !== "loaded" && (
        <div className="cover-overlay">
          {fallback
            ? <InfographicCover cover={fallback} />
            : <div className="cover-load">
                {state === "error" ? "表紙を読み込めませんでした" : <><span className="cover-spin"></span>表紙を生成中…</>}
              </div>}
        </div>
      )}
    </div>
  );
}

function Cover({ item }) {
  if (item.coverImg) {
    return (
      <div className="cover-img">
        <img src={item.coverImg} alt={item.report} loading="lazy" />
      </div>
    );
  }
  if (item.coverPdf || item.pdf) {
    return <CoverFromPdf pdf={item.coverPdf || item.pdf} label={item.report} fallback={item.cover} />;
  }
  return <InfographicCover cover={item.cover} />;
}

window.Cover = Cover;
