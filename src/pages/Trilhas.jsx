// Trilha de Pré-Cálculo — header + módulos em cards

const trilhaStyles = {
  header: {
    display: 'flex', gap: 28, alignItems: 'flex-start',
    background: T.surfaceWarm, border: `1px solid ${T.border}`,
    borderRadius: T.r3, padding: '28px 32px',
    position: 'relative', overflow: 'hidden',
  },
  eyebrow: {
    fontFamily: T.serif, fontStyle: 'italic',
    fontSize: 13, color: T.terracotta, letterSpacing: '0.04em',
  },
  title: {
    fontFamily: T.serif, fontSize: 38, fontWeight: 500,
    letterSpacing: '-0.02em', margin: '4px 0 8px', lineHeight: 1.1,
  },
  desc: { fontSize: 14, color: T.inkMuted, lineHeight: 1.55, maxWidth: 540 },
  stats: {
    display: 'flex', gap: 24, marginTop: 18, paddingTop: 18,
    borderTop: `1px solid ${T.border}`,
  },
  statN: {
    fontFamily: T.serif, fontSize: 28, fontWeight: 500, color: T.ink,
    letterSpacing: '-0.02em', lineHeight: 1,
  },
  statL: { fontSize: 11.5, color: T.inkSubtle, marginTop: 6, letterSpacing: '0.05em', textTransform: 'uppercase' },

  ringWrap: { flex: '0 0 auto' },
  modulesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 14, marginTop: 22,
  },
  module: (state) => ({
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 20,
    display: 'flex', flexDirection: 'column', gap: 10,
    position: 'relative', overflow: 'hidden',
    boxShadow: T.shadowSm,
    opacity: state === 'locked' ? 0.62 : 1,
  }),
  modNum: {
    fontFamily: T.serif, fontStyle: 'italic',
    fontSize: 13, color: T.inkSubtle,
  },
  modTitle: {
    fontFamily: T.serif, fontSize: 20, fontWeight: 500,
    letterSpacing: '-0.015em', lineHeight: 1.2,
  },
  modDesc: { fontSize: 13, color: T.inkMuted, lineHeight: 1.5 },
  modMeta: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 'auto', paddingTop: 12, fontSize: 12, color: T.inkSubtle,
    borderTop: `1px dashed ${T.borderSoft}`,
  },
  modBar: {
    height: 5, borderRadius: 99, background: T.surfaceWarm, overflow: 'hidden',
  },
  modBarFill: (w, color) => ({ height: '100%', width: `${w}%`, background: color, borderRadius: 99 }),
};

function ProgressRing({ value = 35, size = 92, color = T.terracotta }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke={T.surface} strokeWidth="8" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        fontFamily: T.serif, fontWeight: 500, fontSize: 22, color: T.ink,
      }}>{value}%</div>
    </div>
  );
}

function ModuleCard({ n, title, desc, state, lessons, progress, accent, apps }) {
  const stateBadge = {
    done: <Tag color={T.sage} soft={T.sageSoft} ink={T.sageInk}>✓ Concluído</Tag>,
    current: <Tag color={T.terracotta} soft={T.terracottaSoft} ink={T.terracottaInk}>● Em curso</Tag>,
    open: <Tag color={T.sky} soft={T.skySoft} ink={T.skyInk}>Disponível</Tag>,
    locked: <Tag color={T.inkMuted} soft={T.surfaceWarm} ink={T.inkMuted}>🔒 Em breve</Tag>,
  }[state];

  return (
    <div style={trilhaStyles.module(state)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={trilhaStyles.modNum}>Módulo {n}</span>
        {stateBadge}
      </div>
      <div style={trilhaStyles.modTitle}>{title}</div>
      <div style={trilhaStyles.modDesc}>{desc}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
        {apps.map(a => (
          <span key={a} style={{
            fontSize: 11, color: T.inkMuted, padding: '2px 8px',
            background: T.surfaceWarm, borderRadius: 99,
            border: `1px solid ${T.borderSoft}`,
          }}>{a}</span>
        ))}
      </div>
      {state !== 'locked' && (
        <div style={{ marginTop: 6 }}>
          <div style={trilhaStyles.modBar}>
            <div style={trilhaStyles.modBarFill(progress, accent)}></div>
          </div>
        </div>
      )}
      <div style={trilhaStyles.modMeta}>
        <span>{lessons} aulas</span>
        <span style={{ color: T.ink, fontWeight: 600 }}>
          {state === 'done' ? 'Revisar' : state === 'locked' ? '—' : 'Continuar →'}
        </span>
      </div>
    </div>
  );
}

function TrilhaPreCalculo() {
  const mods = [
    { n: 1, title: 'Fundamentos matemáticos', desc: 'Operações, frações, potências, raízes, produtos notáveis, fatoração e equações.', state: 'done', lessons: 14, progress: 100, apps: ['descontos', 'orçamento', 'medidas'] },
    { n: 2, title: 'Álgebra essencial', desc: 'Manipulação de expressões, isolamento, inequações e sistemas de equações.', state: 'done', lessons: 9, progress: 100, apps: ['custos', 'produção', 'receita'] },
    { n: 3, title: 'Funções', desc: 'Domínio, imagem, afim, quadrática, modular, exponencial e logarítmica.', state: 'current', lessons: 12, progress: 58, apps: ['corrida de app', 'juros', 'crescimento'] },
    { n: 4, title: 'Gráficos', desc: 'Plano cartesiano, leitura, crescimento, decrescimento e translação.', state: 'open', lessons: 8, progress: 0, apps: ['vendas', 'preços', 'temperatura'] },
    { n: 5, title: 'Trigonometria básica', desc: 'Seno, cosseno, tangente, ciclo trigonométrico e identidades básicas.', state: 'open', lessons: 10, progress: 0, apps: ['rampas', 'ondas', 'arquitetura'] },
    { n: 6, title: 'Preparação para limites', desc: 'Aproximação, comportamento de funções e tendência — a porta de entrada para Cálculo 1.', state: 'locked', lessons: 6, progress: 0, apps: ['velocidade', 'tendências'] },
  ];

  return (
    <Shell active="pre" crumbs={['Início', 'Pré-Cálculo']}>
      <div style={{ maxWidth: 1080 }}>
        <header style={trilhaStyles.header}>
          <div style={{ flex: 1 }}>
            <div style={trilhaStyles.eyebrow}>Trilha · A base que faltava</div>
            <h1 style={trilhaStyles.title}>Pré-Cálculo</h1>
            <p style={trilhaStyles.desc}>
              Seis módulos para você revisar (ou aprender do zero) tudo que o ensino
              médio deveria ter ensinado. Cada módulo tem aulas curtas, exemplos
              aplicados e exercícios em quatro níveis.
            </p>
            <div style={trilhaStyles.stats}>
              <div><div style={trilhaStyles.statN}>6</div><div style={trilhaStyles.statL}>Módulos</div></div>
              <div><div style={trilhaStyles.statN}>59</div><div style={trilhaStyles.statL}>Aulas</div></div>
              <div><div style={trilhaStyles.statN}>240+</div><div style={trilhaStyles.statL}>Exercícios</div></div>
              <div><div style={trilhaStyles.statN}>~8</div><div style={trilhaStyles.statL}>Semanas</div></div>
            </div>
          </div>
          <div style={trilhaStyles.ringWrap}>
            <ProgressRing value={35} color={T.terracotta} size={112} />
            <div style={{ textAlign: 'center', fontSize: 11.5, color: T.inkMuted, marginTop: 8, letterSpacing: '0.04em' }}>
              SEU PROGRESSO
            </div>
          </div>
        </header>

        <div style={trilhaStyles.modulesGrid}>
          {mods.map(m => <ModuleCard key={m.n} {...m} accent={T.terracotta} />)}
        </div>
      </div>
    </Shell>
  );
}

function TrilhaCalculo1() {
  const mods = [
    { n: 1, title: 'Antes do Cálculo', desc: 'O que é Cálculo 1, por que assusta, e como estudar sem trauma.', state: 'open', lessons: 5, progress: 0, apps: ['orientação', 'estudo'] },
    { n: 2, title: 'Funções para Cálculo', desc: 'Revisão focada: domínio, imagem, crescimento e interpretação aplicada.', state: 'open', lessons: 8, progress: 0, apps: ['custo', 'lucro', 'velocidade'] },
    { n: 3, title: 'Limites sem trauma', desc: 'Aproximação, limites por tabela, gráfico, laterais, infinitos e assíntotas.', state: 'open', lessons: 11, progress: 0, apps: ['velocidade instantânea', 'tendência'] },
    { n: 4, title: 'Continuidade', desc: 'Quando uma função não tem quebras. Furos, saltos e assíntotas.', state: 'locked', lessons: 6, progress: 0, apps: ['movimento', 'sinais'] },
    { n: 5, title: 'Derivadas com sentido', desc: 'Taxa de variação, reta tangente, regras e interpretação prática.', state: 'locked', lessons: 12, progress: 0, apps: ['velocidade', 'lucro marginal'] },
    { n: 6, title: 'Aplicações de derivadas', desc: 'Crescimento, máximos/mínimos, otimização, área e volume.', state: 'locked', lessons: 9, progress: 0, apps: ['otimização', 'produção'] },
    { n: 7, title: 'Integrais com sentido', desc: 'Soma acumulada, área sob o gráfico, integral definida e o TFC.', state: 'locked', lessons: 11, progress: 0, apps: ['área', 'consumo', 'distância'] },
  ];

  return (
    <Shell active="calc" crumbs={['Início', 'Cálculo 1']}>
      <div style={{ maxWidth: 1080 }}>
        <header style={{
          ...trilhaStyles.header,
          background: `linear-gradient(135deg, ${T.surfaceInk} 0%, #3a2a1f 100%)`,
          color: T.inkOnDark,
          border: 'none',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...trilhaStyles.eyebrow, color: T.terracottaSoft }}>Trilha · A faculdade sem medo</div>
            <h1 style={{ ...trilhaStyles.title, color: '#fff' }}>Cálculo 1</h1>
            <p style={{ ...trilhaStyles.desc, color: 'rgba(250,246,239,0.78)' }}>
              Limites, derivadas e integrais explicados primeiro pela ideia, depois
              pela fórmula. Sete módulos, sempre com aplicação real em engenharia,
              economia, física e cotidiano.
            </p>
            <div style={{ ...trilhaStyles.stats, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div><div style={{ ...trilhaStyles.statN, color: '#fff' }}>7</div><div style={{ ...trilhaStyles.statL, color: 'rgba(250,246,239,0.55)' }}>Módulos</div></div>
              <div><div style={{ ...trilhaStyles.statN, color: '#fff' }}>62</div><div style={{ ...trilhaStyles.statL, color: 'rgba(250,246,239,0.55)' }}>Aulas</div></div>
              <div><div style={{ ...trilhaStyles.statN, color: '#fff' }}>320+</div><div style={{ ...trilhaStyles.statL, color: 'rgba(250,246,239,0.55)' }}>Exercícios</div></div>
              <div><div style={{ ...trilhaStyles.statN, color: '#fff' }}>~10</div><div style={{ ...trilhaStyles.statL, color: 'rgba(250,246,239,0.55)' }}>Semanas</div></div>
            </div>
          </div>
          <div style={trilhaStyles.ringWrap}>
            <ProgressRing value={0} color={T.terracottaSoft} size={112} />
            <div style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(250,246,239,0.65)', marginTop: 8, letterSpacing: '0.04em' }}>
              AINDA NÃO INICIADO
            </div>
          </div>
        </header>

        <div style={trilhaStyles.modulesGrid}>
          {mods.map(m => <ModuleCard key={m.n} {...m} accent={T.terracotta} />)}
        </div>
      </div>
    </Shell>
  );
}

Object.assign(window, { TrilhaPreCalculo, TrilhaCalculo1, ProgressRing, ModuleCard });
