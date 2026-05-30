// Página de exercícios — listagem + exercício aberto com 9 partes do modelo padrão

const exStyles = {
  layout: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 22, maxWidth: 1080 },

  // left list
  listHead: {
    fontFamily: T.serif, fontSize: 24, fontWeight: 500,
    letterSpacing: '-0.015em', margin: '0 0 6px',
  },
  filterRow: {
    display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14, marginBottom: 14,
  },
  chip: (active) => ({
    padding: '5px 11px', borderRadius: 99, fontSize: 12, fontWeight: 600,
    background: active ? T.ink : T.surface,
    color: active ? T.inkOnDark : T.inkMuted,
    border: `1px solid ${active ? T.ink : T.border}`,
    cursor: 'pointer',
  }),
  listItem: (active) => ({
    padding: '12px 14px', borderRadius: T.r2,
    background: active ? T.surface : 'transparent',
    border: `1px solid ${active ? T.border : 'transparent'}`,
    boxShadow: active ? T.shadowSm : 'none',
    cursor: 'pointer',
    marginBottom: 6,
  }),
  liTop: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  liNum: {
    fontFamily: T.mono, fontSize: 11, color: T.inkSubtle, fontWeight: 600,
  },
  liTitle: {
    fontSize: 13.5, fontWeight: 600, color: T.ink,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  liMeta: { fontSize: 12, color: T.inkMuted, lineHeight: 1.4 },

  // right exercise
  exCard: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r3, padding: 28, boxShadow: T.shadowSm,
  },
  exHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${T.borderSoft}`,
  },
  exTitle: {
    fontFamily: T.serif, fontSize: 22, fontWeight: 500,
    letterSpacing: '-0.015em', margin: '4px 0 6px',
  },
  field: {
    display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14,
    padding: '12px 0', borderBottom: `1px dashed ${T.borderSoft}`,
  },
  fieldLabel: {
    fontFamily: T.serif, fontStyle: 'italic',
    fontSize: 12, color: T.inkSubtle, letterSpacing: '0.04em',
    paddingTop: 2,
  },
  fieldValue: { fontSize: 14, color: T.ink, lineHeight: 1.55 },

  bullets: { margin: 0, paddingLeft: 18, fontSize: 14, color: T.ink, lineHeight: 1.65 },

  // reveal blocks
  reveal: (variant) => {
    const v = {
      hint: { bg: T.amberSoft, border: T.amber, ink: T.amberInk, label: 'Dica' },
      sol: { bg: T.skySoft, border: T.sky, ink: T.skyInk, label: 'Resolução passo a passo' },
      ans: { bg: T.sageSoft, border: T.sage, ink: T.sageInk, label: 'Resposta final' },
      err: { bg: T.terracottaSoft, border: T.terracotta, ink: T.terracottaInk, label: 'Erro comum' },
    }[variant];
    return {
      background: v.bg, border: `1px solid ${v.border}`,
      borderRadius: T.r2, padding: '12px 16px', color: v.ink,
      ...v,
    };
  },
};

function levelTag(level) {
  const map = {
    facil:    { soft: T.sageSoft, ink: T.sageInk, label: 'Fácil' },
    medio:    { soft: T.skySoft, ink: T.skyInk, label: 'Médio' },
    dificil:  { soft: T.amberSoft, ink: T.amberInk, label: 'Difícil' },
    desafio:  { soft: T.terracottaSoft, ink: T.terracottaInk, label: 'Desafio' },
  }[level];
  return <Tag color={map.ink} soft={map.soft} ink={map.ink}>{map.label}</Tag>;
}

function Exercicios() {
  const items = [
    { n: 1, t: 'Conta da corrida de app', area: 'Cotidiano', level: 'facil', active: true },
    { n: 2, t: 'Plano de internet com pacote extra', area: 'Finanças', level: 'facil' },
    { n: 3, t: 'Salário base + comissão por venda', area: 'Administração', level: 'medio' },
    { n: 4, t: 'Custo de produção variável', area: 'Engenharia', level: 'medio' },
    { n: 5, t: 'Comparando dois planos de telefone', area: 'Finanças', level: 'medio' },
    { n: 6, t: 'Ponto de equilíbrio de uma loja', area: 'Administração', level: 'dificil' },
    { n: 7, t: 'Reservatório enchendo a vazão constante', area: 'Física', level: 'dificil' },
    { n: 8, t: 'Otimização de frete com taxa fixa', area: 'Logística', level: 'desafio' },
  ];

  return (
    <Shell active="exerc" crumbs={['Pré-Cálculo', 'Funções', 'Exercícios — Função afim']}>
      <div style={exStyles.layout}>
        {/* Lista */}
        <aside>
          <h2 style={exStyles.listHead}>Exercícios</h2>
          <div style={{ fontSize: 13, color: T.inkMuted }}>
            Função afim · 28 atividades aplicadas
          </div>
          <div style={exStyles.filterRow}>
            {['Todos', 'Fácil', 'Médio', 'Difícil', 'Desafio'].map((c, i) => (
              <div key={c} style={exStyles.chip(i === 0)}>{c}</div>
            ))}
          </div>
          <div style={exStyles.filterRow}>
            {['Cotidiano', 'Finanças', 'Eng.', 'Adm.'].map(c => (
              <div key={c} style={{ ...exStyles.chip(false), fontSize: 11.5 }}>{c}</div>
            ))}
          </div>

          <div>
            {items.map(i => (
              <div key={i.n} style={exStyles.listItem(i.active)}>
                <div style={exStyles.liTop}>
                  <span style={exStyles.liNum}>EX {String(i.n).padStart(2, '0')}</span>
                  {levelTag(i.level)}
                </div>
                <div style={exStyles.liTitle}>{i.t}</div>
                <div style={exStyles.liMeta}>{i.area}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Exercício aberto */}
        <div>
          <div style={exStyles.exCard}>
            <div style={exStyles.exHead}>
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: T.mono, fontSize: 12, color: T.inkSubtle }}>EX 01</span>
                  {levelTag('facil')}
                  <Tag color={T.sky} soft={T.skySoft} ink={T.skyInk}>Aplicada</Tag>
                </div>
                <h2 style={exStyles.exTitle}>Conta da corrida de app</h2>
                <div style={{ fontSize: 13, color: T.inkMuted }}>
                  Tema: Função afim · Área: Cotidiano · Tipo: cálculo direto + interpretação
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" size="sm">↺ Reiniciar</Btn>
                <Btn variant="soft" size="sm">★ Salvar</Btn>
              </div>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>Enunciado</span>
              <div style={exStyles.fieldValue}>
                Uma corrida de aplicativo cobra uma bandeirada de <b>R$ 6,00</b> e
                mais <b>R$ 2,40</b> por quilômetro rodado.
                <br/>(a) Escreva a função que representa o custo total da corrida em
                função da distância. <br/>(b) Calcule o custo para uma corrida de 8&nbsp;km. <br/>
                (c) Quantos quilômetros é possível andar com R$ 30,00?
              </div>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>O que identificar</span>
              <ul style={exStyles.bullets}>
                <li>Qual é a parte fixa (não depende da distância)?</li>
                <li>Qual é a taxa que varia com a distância?</li>
                <li>O que x representa nesse problema?</li>
              </ul>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>Dica</span>
              <div style={exStyles.reveal('hint')}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 6 }}>💡 DICA</div>
                Lembre da estrutura <span style={{ fontFamily: T.mono }}>f(x) = a·x + b</span>:
                <i> b</i> é o que você paga só por pedir, <i>a</i> é o que cresce
                a cada km.
              </div>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>Resolução</span>
              <div style={exStyles.reveal('sol')}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>RESOLUÇÃO PASSO A PASSO</div>
                <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                  <li>Identifico: b = 6 (bandeirada) e a = 2,40 (por km).</li>
                  <li>Função: <span style={{ fontFamily: T.mono }}>C(x) = 2,40·x + 6</span>.</li>
                  <li>Para x = 8: C(8) = 2,40·8 + 6 = <b>R$ 25,20</b>.</li>
                  <li>Para C(x) = 30: 30 = 2,40x + 6 → x = 24/2,40 = <b>10 km</b>.</li>
                </ol>
              </div>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>Resposta</span>
              <div style={exStyles.reveal('ans')}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 4 }}>✓ RESPOSTA FINAL</div>
                <b>(a)</b> C(x) = 2,40x + 6 &nbsp;·&nbsp; <b>(b)</b> R$ 25,20 &nbsp;·&nbsp; <b>(c)</b> 10 km
              </div>
            </div>

            <div style={exStyles.field}>
              <span style={exStyles.fieldLabel}>Interpretação</span>
              <div style={{ ...exStyles.fieldValue, color: T.inkMuted, fontStyle: 'italic' }}>
                Sempre que você anda 1 km a mais, paga R$ 2,40 a mais. Mas mesmo
                que você não saísse do lugar (0 km), pagaria R$ 6,00 — esse é o
                custo de “acionar” o serviço.
              </div>
            </div>

            <div style={{ ...exStyles.field, borderBottom: 'none' }}>
              <span style={exStyles.fieldLabel}>Erro comum</span>
              <div style={exStyles.reveal('err')}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 4 }}>⚠ ERRO COMUM</div>
                Esquecer de somar a bandeirada e responder R$ 19,20. Sempre confira
                se você incluiu o <i>b</i>.
              </div>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 18, paddingTop: 16, borderTop: `1px solid ${T.borderSoft}`,
            }}>
              <span style={{ fontSize: 13, color: T.inkSubtle }}>Quanta segurança você tem nesse?</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="soft" size="sm">😕 Ainda confuso</Btn>
                <Btn variant="soft" size="sm">🙂 Entendi a ideia</Btn>
                <Btn variant="primary" size="sm">💪 Manda o próximo →</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.Exercicios = Exercicios;
