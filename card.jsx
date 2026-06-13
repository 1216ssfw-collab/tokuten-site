// ============ 特典カード ============

function IconDownload() {
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" />
    </svg>
  );
}

function BenefitCard({ item, btnStyle, onDownload }) {
  const Cover = window.Cover;
  return (
    <article className="card">
      <Cover item={item} />
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>

        <div className="report">
          <div className="report-name">{item.report}</div>
          <p className="report-desc">{item.desc}</p>
          <button
            className={"dl-btn" + (btnStyle === "solid" ? " solid" : "")}
            onClick={() => onDownload(item)}
          >
            {item.ctaLabel || "ダウンロード特典"} <IconDownload />
          </button>
        </div>
      </div>
    </article>
  );
}

window.BenefitCard = BenefitCard;
