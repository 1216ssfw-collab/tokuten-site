// ============ App 本体 ============
const { useState, useMemo } = React;

const THEME_MAP = { "ブルー": "blue", "ティール": "teal", "パープル": "violet" };
const FONT_MAP = {
  "標準ゴシック": '"Noto Sans JP", system-ui, sans-serif',
  "角ゴシック": '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "ブルー",
  "cols": "3",
  "btnStyle": "枠線",
  "radius": 10,
  "shadow": true,
  "uiFont": "標準ゴシック"
}/*EDITMODE-END*/;

function PdfViewer({ item, onClose }) {
  const scrollRef = React.useRef(null);
  const [status, setStatus] = React.useState("loading");
  const [progress, setProgress] = React.useState({ done: 0, total: 0 });
  const [blobUrl, setBlobUrl] = React.useState(null);

  const driveId = item.driveId || null;
  const sheetId = item.sheetId || null;

  React.useEffect(() => {
    if (driveId || sheetId) return; // Drive/Sheets use the embedded preview, no canvas render
    let cancelled = false;
    let objUrl = null;
    const lib = window.pdfjsLib;
    const container = scrollRef.current;
    if (!lib || !container) { setStatus("error"); return; }
    lib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    container.innerHTML = "";
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    (async () => {
      try {
        // fetch once → use for both rendering AND download (blob = same-origin, safe)
        const resp = await fetch(item.pdf);
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const buf = await resp.arrayBuffer();
        if (cancelled) return;
        const blob = new Blob([buf], { type: "application/pdf" });
        objUrl = URL.createObjectURL(blob);
        setBlobUrl(objUrl);

        const pdf = await lib.getDocument({ data: new Uint8Array(buf) }).promise;
        if (cancelled) return;
        setProgress({ done: 0, total: pdf.numPages });
        const cw = Math.max(container.clientWidth - 24, 240);
        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const scale = cw / base.width;
          const vp = page.getViewport({ scale: scale * dpr });
          const canvas = document.createElement("canvas");
          canvas.className = "pdf-page";
          canvas.width = vp.width; canvas.height = vp.height;
          canvas.style.width = (vp.width / dpr) + "px";
          container.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
          if (cancelled) return;
          setProgress({ done: i, total: pdf.numPages });
          if (i === 1) setStatus("ready");
        }
        if (!cancelled) setStatus("done");
      } catch (e) {
        console.error("PDF render error", e);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; if (objUrl) URL.revokeObjectURL(objUrl); };
  }, [item.pdf, driveId, sheetId]);

  const driveDownload = driveId
    ? "https://drive.usercontent.google.com/download?id=" + driveId + "&export=download&confirm=t"
    : null;

  return (
    <div className="pdf-back" onClick={onClose}>
      <div className="pdf-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-head">
          <span className="pdf-title">{item.report}</span>
          <div className="pdf-actions">
            {!driveId && !sheetId && (status === "ready" || status === "done") && progress.total > 0 && (
              <span className="pdf-prog">{progress.done}/{progress.total}p</span>
            )}
            {sheetId ? (
              <a className="pdf-dl" href={"https://docs.google.com/spreadsheets/d/" + sheetId + "/copy"} target="_blank" rel="noopener noreferrer">
                コピーを作成
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
              </a>
            ) : driveId ? (
              <a className="pdf-dl" href={driveDownload} target="_blank" rel="noopener noreferrer">
                ダウンロード
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></svg>
              </a>
            ) : blobUrl ? (
              <a className="pdf-dl" href={blobUrl} download={item.report + ".pdf"}>
                ダウンロード
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></svg>
              </a>
            ) : (
              <span className="pdf-dl loading">準備中…</span>
            )}
            <button className="pdf-x" onClick={onClose} aria-label="閉じる">×</button>
          </div>
        </div>
        {sheetId ? (
          <iframe
            className="pdf-iframe"
            src={"https://docs.google.com/spreadsheets/d/" + sheetId + "/preview"}
            title={item.report}
          ></iframe>
        ) : driveId ? (
          <iframe
            className="pdf-iframe"
            src={"https://drive.google.com/file/d/" + driveId + "/preview"}
            title={item.report}
            allow="autoplay"
          ></iframe>
        ) : (
          <div className="pdf-scroll" ref={scrollRef}></div>
        )}
        {!driveId && !sheetId && status === "loading" && (
          <div className="pdf-status"><div className="pdf-spin"></div>読み込み中…</div>
        )}
        {!driveId && !sheetId && status === "error" && (
          <div className="pdf-status err">
            PDFを読み込めませんでした。<br />時間をおいて再度お試しください。
          </div>
        )}
      </div>
    </div>
  );
}

function DownloadModal({ item, onClose }) {
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="chk">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" />
          </svg>
        </div>
        <h3>準備中です</h3>
        <p>
          <span className="modal-name">「{item.report}」</span><br />
          は現在準備中です。公開まで少々お待ちください。
        </p>
        <button className="modal-btn disabled" disabled>準備中</button>
        <div><button className="modal-x" onClick={onClose}>閉じる</button></div>
      </div>
    </div>
  );
}

function App() {
  const { BENEFITS } = window.SITE_DATA;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [query, setQuery] = useState("");
  const [dlItem, setDlItem] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return BENEFITS;
    return BENEFITS.filter((it) =>
      (it.title + it.report + it.desc).includes(q)
    );
  }, [query, BENEFITS]);

  const siteStyle = {
    "--cols": t.cols,
    "--card-radius": t.radius + "px",
    "--card-shadow": t.shadow ? "0 10px 30px rgba(0,0,0,0.22)" : "0 1px 3px rgba(0,0,0,0.12)",
    "--ui-font": FONT_MAP[t.uiFont] || FONT_MAP["標準ゴシック"],
  };

  return (
    <div className="site" data-theme={THEME_MAP[t.theme] || "blue"} style={siteStyle}>
      <SiteHeader
        brandLeft="LINE登録限定特典"
        brandRight="菅谷秀翔"
        pageTitle="お役立ちコンテンツ集"
        query={query} setQuery={setQuery}
      />

      {query.trim() && (
        <div className="filters">
          <span className="fchip">「{query.trim()}」 <button onClick={() => setQuery("")}>×</button></span>
          <span className="count">{filtered.length}件</span>
          <button className="clear-all" onClick={() => setQuery("")}>すべてをクリア</button>
        </div>
      )}

      <main className="grid">
        {filtered.length === 0 ? (
          <div className="empty">
            <b>該当する特典が見つかりませんでした</b>
            キーワードを変えるか、「すべてをクリア」でリセットしてください。
          </div>
        ) : (
          filtered.map((it) => (
            <BenefitCard
              key={it.id}
              item={it}
              btnStyle={t.btnStyle === "塗りつぶし" ? "solid" : "outline"}
              onDownload={setDlItem}
            />
          ))
        )}
      </main>

      {dlItem && ((dlItem.pdf || dlItem.driveId || dlItem.sheetId)
        ? <PdfViewer item={dlItem} onClose={() => setDlItem(null)} />
        : <DownloadModal item={dlItem} onClose={() => setDlItem(null)} />)}

      <TweaksPanel title="Tweaks">
        <TweakSection label="カラー" />
        <TweakRadio
          label="カラーテーマ" value={t.theme}
          options={["ブルー", "ティール", "パープル"]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSection label="カード" />
        <TweakRadio
          label="1行のカード数" value={t.cols}
          options={["2", "3", "4"]}
          onChange={(v) => setTweak("cols", v)}
        />
        <TweakSlider
          label="角丸" value={t.radius} min={0} max={22} unit="px"
          onChange={(v) => setTweak("radius", v)}
        />
        <TweakToggle
          label="カードの影" value={t.shadow}
          onChange={(v) => setTweak("shadow", v)}
        />
        <TweakSection label="ボタン・文字" />
        <TweakRadio
          label="DLボタン" value={t.btnStyle}
          options={["枠線", "塗りつぶし"]}
          onChange={(v) => setTweak("btnStyle", v)}
        />
        <TweakRadio
          label="本文フォント" value={t.uiFont}
          options={["標準ゴシック", "角ゴシック"]}
          onChange={(v) => setTweak("uiFont", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
