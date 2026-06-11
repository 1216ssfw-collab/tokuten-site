// ============ ヘッダー ＋ 検索 ============

function SearchIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SiteHeader({ brandLeft, brandRight, pageTitle, query, setQuery }) {
  return (
    <header>
      <div className="hdr">
        <div className="hdr-brand">
          <span>{brandLeft}</span>
        </div>
        <div className="hdr-acct">{brandRight}</div>
      </div>

      <h1 className="page-title">{pageTitle}</h1>

      <nav className="navbar">
        <button className="nav-tab home active">HOME</button>

        <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="キーワードで検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="検索"><SearchIcon /></button>
        </form>
      </nav>
    </header>
  );
}

window.SiteHeader = SiteHeader;
