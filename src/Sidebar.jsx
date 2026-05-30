// Sidebar fixa — estilo documentação (Notion-like)
// Recebe `active` para marcar o item ativo.

const sidebarStyles = {
  root: {
    width: 264,
    minWidth: 264,
    background: T.surfaceWarm,
    borderRight: `1px solid ${T.border}`,
    padding: '22px 16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    fontFamily: T.sans,
    fontSize: 14,
    color: T.ink,
    boxSizing: 'border-box',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '4px 8px 6px',
  },
  brandMark: {
    width: 34, height: 34, borderRadius: 10,
    background: T.terracotta, color: '#fff',
    display: 'grid', placeItems: 'center',
    fontFamily: T.serif, fontWeight: 600, fontSize: 18,
    letterSpacing: '-0.02em',
    boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)',
  },
  brandText: {
    fontFamily: T.serif, fontSize: 17, fontWeight: 500,
    letterSpacing: '-0.01em', lineHeight: 1,
  },
  brandSub: {
    fontSize: 11, color: T.inkSubtle, marginTop: 3, letterSpacing: '0.02em',
  },
  search: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 10, padding: '8px 10px',
    color: T.inkSubtle, fontSize: 13,
  },
  kbd: {
    marginLeft: 'auto', fontFamily: T.mono, fontSize: 11,
    background: T.surfaceWarm, padding: '2px 6px', borderRadius: 6,
    border: `1px solid ${T.borderSoft}`, color: T.inkMuted,
  },
  groupLabel: {
    fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: T.inkSubtle, padding: '8px 10px 4px', fontWeight: 600,
  },
  item: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '7px 10px', borderRadius: 8,
    background: active ? T.surface : 'transparent',
    color: active ? T.ink : T.inkMuted,
    fontWeight: active ? 600 : 500,
    boxShadow: active ? T.shadowSm : 'none',
    border: active ? `1px solid ${T.border}` : '1px solid transparent',
    cursor: 'pointer',
  }),
  sub: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '5px 10px 5px 30px', borderRadius: 6,
    color: active ? T.ink : T.inkMuted,
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    background: active ? T.terracottaSoft : 'transparent',
  }),
  dot: (color) => ({
    width: 6, height: 6, borderRadius: 99, background: color,
    flex: '0 0 auto',
  }),
  progress: {
    marginTop: 'auto',
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 12, padding: 12,
  },
  bar: {
    height: 6, borderRadius: 99, background: T.surfaceWarm,
    overflow: 'hidden', marginTop: 8,
  },
  fill: (w, color) => ({
    height: '100%', width: `${w}%`, background: color, borderRadius: 99,
  }),
};

function SidebarIcon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d}></path>
    </svg>
  );
}

function Sidebar({ active = 'home' }) {
  const isA = (k) => active === k;
  return (
    <aside style={sidebarStyles.root}>
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.brandMark}>α</div>
        <div>
          <div style={sidebarStyles.brandText}>Cálculo com Sentido</div>
          <div style={sidebarStyles.brandSub}>Pré-Cálculo · Cálculo 1</div>
        </div>
      </div>

      <div style={sidebarStyles.search}>
        <SidebarIcon d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        <span>Buscar aulas, termos…</span>
        <span style={sidebarStyles.kbd}>⌘K</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={sidebarStyles.item(isA('home'))}>
          <SidebarIcon d="M3 11l9-8 9 8M5 10v10h14V10" /> Início
        </div>
        <div style={sidebarStyles.item(isA('teste'))}>
          <SidebarIcon d="M9 11l3 3 8-8M20 12v7H4V5h9" /> Teste de nível
        </div>

        <div style={sidebarStyles.groupLabel}>Pré-Cálculo</div>
        <div style={sidebarStyles.item(isA('pre'))}>
          <span style={sidebarStyles.dot(T.sage)}></span> Trilha completa
        </div>
        <div style={sidebarStyles.sub(false)}>Fundamentos</div>
        <div style={sidebarStyles.sub(false)}>Álgebra essencial</div>
        <div style={sidebarStyles.sub(isA('aula'))}>Funções</div>
        <div style={sidebarStyles.sub(false)}>Gráficos</div>
        <div style={sidebarStyles.sub(false)}>Trigonometria</div>
        <div style={sidebarStyles.sub(false)}>Preparação p/ limites</div>

        <div style={sidebarStyles.groupLabel}>Cálculo 1</div>
        <div style={sidebarStyles.item(isA('calc'))}>
          <span style={sidebarStyles.dot(T.terracotta)}></span> Trilha completa
        </div>
        <div style={sidebarStyles.sub(false)}>Antes do Cálculo</div>
        <div style={sidebarStyles.sub(false)}>Funções p/ Cálculo</div>
        <div style={sidebarStyles.sub(false)}>Limites sem trauma</div>
        <div style={sidebarStyles.sub(false)}>Continuidade</div>
        <div style={sidebarStyles.sub(false)}>Derivadas</div>
        <div style={sidebarStyles.sub(false)}>Integrais</div>

        <div style={sidebarStyles.groupLabel}>Prática & Referência</div>
        <div style={sidebarStyles.item(isA('exerc'))}>
          <SidebarIcon d="M4 6h16M4 12h10M4 18h16" /> Exercícios
        </div>
        <div style={sidebarStyles.item(isA('resumos'))}>
          <SidebarIcon d="M8 4h9l3 3v13H8zM8 4v3H5v13h3" /> Resumos rápidos
        </div>
        <div style={sidebarStyles.item(isA('gloss'))}>
          <SidebarIcon d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" /> Glossário
        </div>

        <div style={sidebarStyles.groupLabel}>Você</div>
        <div style={sidebarStyles.item(isA('prog'))}>
          <SidebarIcon d="M3 17l6-6 4 4 8-8" /> Meu progresso
        </div>
        <div style={sidebarStyles.item(isA('sobre'))}>
          <SidebarIcon d="M12 8v4M12 16h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" /> Sobre o projeto
        </div>
      </nav>

      <div style={sidebarStyles.progress}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.inkMuted }}>
          <span>Seu progresso</span>
          <span style={{ fontWeight: 600, color: T.ink }}>42%</span>
        </div>
        <div style={sidebarStyles.bar}>
          <div style={sidebarStyles.fill(42, T.terracotta)}></div>
        </div>
        <div style={{ fontSize: 11, color: T.inkSubtle, marginTop: 8 }}>
          Próximo: <span style={{ color: T.ink, fontWeight: 600 }}>Função quadrática</span>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.SidebarIcon = SidebarIcon;
