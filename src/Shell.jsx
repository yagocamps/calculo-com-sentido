// Page Shell — sidebar + topbar + main area
// Usado por todas as artboards para garantir consistência visual

const shellStyles = {
  frame: {
    width: '100%', height: '100%',
    background: T.bg,
    display: 'flex',
    fontFamily: T.sans,
    color: T.ink,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  main: {
    flex: 1, display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  },
  topbar: {
    height: 56,
    borderBottom: `1px solid ${T.border}`,
    background: T.bg,
    padding: '0 28px',
    display: 'flex', alignItems: 'center', gap: 16,
    flexShrink: 0,
  },
  crumb: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 13, color: T.inkMuted,
  },
  crumbCurrent: { color: T.ink, fontWeight: 600 },
  topRight: {
    marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12,
  },
  pill: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '5px 10px', borderRadius: 99,
    background: T.surfaceWarm, border: `1px solid ${T.border}`,
    fontSize: 12, color: T.inkMuted, fontWeight: 500,
  },
  avatar: {
    width: 30, height: 30, borderRadius: 99,
    background: T.sageSoft, color: T.sageInk,
    display: 'grid', placeItems: 'center',
    fontFamily: T.serif, fontWeight: 600, fontSize: 13,
    border: `1px solid ${T.border}`,
  },
  content: {
    flex: 1, padding: '28px 36px 36px',
    overflow: 'hidden',
  },
};

function Topbar({ crumbs = [], right }) {
  return (
    <div style={shellStyles.topbar}>
      <div style={shellStyles.crumb}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <span style={i === crumbs.length - 1 ? shellStyles.crumbCurrent : null}>{c}</span>
            {i < crumbs.length - 1 && <span style={{ color: T.inkSubtle }}>›</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={shellStyles.topRight}>
        {right}
        <div style={shellStyles.pill}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: T.sage }}></span>
          Estudo · 38 min hoje
        </div>
        <div style={shellStyles.avatar}>LM</div>
      </div>
    </div>
  );
}

function Shell({ active, crumbs, topRight, children, contentStyle }) {
  return (
    <div style={shellStyles.frame}>
      <Sidebar active={active} />
      <div style={shellStyles.main}>
        <Topbar crumbs={crumbs} right={topRight} />
        <div style={{ ...shellStyles.content, ...(contentStyle || {}) }}>{children}</div>
      </div>
    </div>
  );
}

// Reusable bits
function Tag({ children, color = T.sky, soft = T.skySoft, ink = T.skyInk }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 99,
      background: soft, color: ink,
      fontSize: 11.5, fontWeight: 600, letterSpacing: '0.01em',
    }}>{children}</span>
  );
}

function Btn({ children, variant = 'primary', size = 'md', icon, style }) {
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12.5 },
    md: { padding: '9px 16px', fontSize: 14 },
    lg: { padding: '12px 22px', fontSize: 15 },
  };
  const variants = {
    primary: { background: T.terracotta, color: '#fff', border: '1px solid transparent' },
    dark:    { background: T.ink, color: T.inkOnDark, border: '1px solid transparent' },
    ghost:   { background: 'transparent', color: T.ink, border: `1px solid ${T.border}` },
    soft:    { background: T.surface, color: T.ink, border: `1px solid ${T.border}` },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      borderRadius: 10, fontWeight: 600, cursor: 'pointer',
      ...sizes[size], ...variants[variant],
      boxShadow: variant === 'primary' ? '0 1px 0 rgba(0,0,0,0.08) inset, 0 1px 2px rgba(0,0,0,0.08)' : T.shadowSm,
      ...(style || {}),
    }}>
      {icon}{children}
    </span>
  );
}

function Card({ children, style, pad = 20 }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: T.r2, padding: pad, boxShadow: T.shadowSm,
      ...(style || {}),
    }}>{children}</div>
  );
}

Object.assign(window, { Shell, Topbar, Tag, Btn, Card });
