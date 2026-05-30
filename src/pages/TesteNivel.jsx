// Teste de nível — mostra a pergunta atual + barra de progresso + sidebar de tópicos

const testeStyles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: 22, maxWidth: 1080 },
  card: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r3, padding: '28px 32px', boxShadow: T.shadowSm,
  },
  topMeta: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 22,
  },
  qNum: {
    fontFamily: T.serif, fontSize: 13, letterSpacing: '0.06em',
    color: T.inkMuted, fontStyle: 'italic',
  },
  progress: {
    flex: 1, margin: '0 16px', height: 6, borderRadius: 99,
    background: T.surfaceWarm, overflow: 'hidden', maxWidth: 320,
  },
  fill: { height: '100%', width: '45%', background: T.terracotta, borderRadius: 99 },
  topic: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', borderRadius: 99,
    background: T.skySoft, color: T.skyInk,
    fontSize: 11.5, fontWeight: 600,
  },
  question: {
    fontFamily: T.serif, fontSize: 26, lineHeight: 1.3,
    letterSpacing: '-0.015em', fontWeight: 500,
    color: T.ink, margin: '8px 0 6px',
  },
  qContext: { fontSize: 14, color: T.inkMuted, lineHeight: 1.55, marginBottom: 22 },
  formula: {
    display: 'inline-block',
    fontFamily: T.mono, fontSize: 15,
    background: T.surfaceWarm, color: T.ink,
    padding: '8px 14px', borderRadius: 8,
    border: `1px solid ${T.borderSoft}`,
    margin: '4px 0 18px',
  },
  options: { display: 'flex', flexDirection: 'column', gap: 10 },
  opt: (selected) => ({
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '14px 16px', borderRadius: T.r2,
    background: selected ? T.terracottaSoft : T.surfaceSoft,
    border: `1px solid ${selected ? T.terracotta : T.border}`,
    cursor: 'pointer',
    fontSize: 14.5, color: T.ink,
  }),
  optKey: (selected) => ({
    width: 28, height: 28, borderRadius: 8,
    background: selected ? T.terracotta : T.surface,
    color: selected ? '#fff' : T.inkMuted,
    border: `1px solid ${selected ? T.terracotta : T.border}`,
    fontFamily: T.mono, fontWeight: 600,
    display: 'grid', placeItems: 'center', fontSize: 13,
    flex: '0 0 auto',
  }),
  bottom: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.borderSoft}`,
  },
  sideTitle: {
    fontFamily: T.serif, fontSize: 16, fontWeight: 500, marginBottom: 10,
  },
  topicRow: (state) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 8,
    background: state === 'current' ? T.surfaceSoft : 'transparent',
    border: state === 'current' ? `1px solid ${T.border}` : '1px solid transparent',
    fontSize: 13,
    color: state === 'done' ? T.inkMuted : T.ink,
    fontWeight: state === 'current' ? 600 : 500,
  }),
  topicMark: (state) => ({
    width: 18, height: 18, borderRadius: 99,
    background: state === 'done' ? T.sage : state === 'current' ? T.terracotta : T.surfaceWarm,
    border: `1px solid ${state === 'pending' ? T.border : 'transparent'}`,
    color: '#fff', fontSize: 11, fontWeight: 700,
    display: 'grid', placeItems: 'center',
    flex: '0 0 auto',
  }),
};

function TesteNivel() {
  const opts = [
    { k: 'A', v: 'A função cresce 5 unidades a cada acréscimo de 1 em x', sel: false },
    { k: 'B', v: 'O valor inicial é 5 e a taxa de crescimento é 40', sel: true },
    { k: 'C', v: 'A reta passa pela origem com inclinação 45', sel: false },
    { k: 'D', v: 'O número 40 é o salário base e 5 é o bônus por venda', sel: false },
  ];
  const topics = [
    ['done', 'Operações básicas'],
    ['done', 'Frações'],
    ['done', 'Potências e raízes'],
    ['done', 'Equações do 1º grau'],
    ['done', 'Equações do 2º grau'],
    ['current', 'Funções'],
    ['pending', 'Gráficos'],
    ['pending', 'Trigonometria'],
    ['pending', 'Noções de limite'],
  ];

  return (
    <Shell active="teste" crumbs={['Início', 'Teste de nível']}>
      <div style={testeStyles.layout}>
        <div>
          <div style={testeStyles.card}>
            <div style={testeStyles.topMeta}>
              <span style={testeStyles.qNum}>Pergunta 06 / 12</span>
              <div style={testeStyles.progress}><div style={testeStyles.fill}></div></div>
              <span style={{ fontSize: 12, color: T.inkMuted }}>45% completo</span>
            </div>

            <span style={testeStyles.topic}>Funções · Função afim</span>
            <h2 style={testeStyles.question}>
              Um plano de internet cobra R$&nbsp;40,00 fixos mais R$&nbsp;5,00 por
              pacote extra de dados.
            </h2>
            <p style={testeStyles.qContext}>
              Considerando a função que descreve o custo total, qual interpretação
              dos coeficientes está correta?
            </p>
            <div style={testeStyles.formula}>C(x) = 5x + 40</div>

            <div style={testeStyles.options}>
              {opts.map(o => (
                <div key={o.k} style={testeStyles.opt(o.sel)}>
                  <div style={testeStyles.optKey(o.sel)}>{o.k}</div>
                  <span>{o.v}</span>
                </div>
              ))}
            </div>

            <div style={testeStyles.bottom}>
              <Btn variant="ghost" size="md">← Anterior</Btn>
              <span style={{ fontSize: 13, color: T.inkSubtle }}>
                Após responder, mostraremos uma explicação curta.
              </span>
              <Btn variant="primary" size="md">Confirmar →</Btn>
            </div>
          </div>

          <div style={{
            marginTop: 14, background: T.amberSoft, border: `1px solid ${T.amber}`,
            borderRadius: T.r2, padding: '12px 16px', display: 'flex', gap: 12,
            alignItems: 'center', fontSize: 13, color: T.amberInk,
          }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <span><b>Dica:</b> não se preocupe se errar — o teste só serve para
            recomendar por onde começar. Não conta nota.</span>
          </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <div style={testeStyles.sideTitle}>Tópicos avaliados</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {topics.map(([s, t]) => (
                <div key={t} style={testeStyles.topicRow(s)}>
                  <div style={testeStyles.topicMark(s)}>{s === 'done' ? '✓' : ''}</div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={testeStyles.sideTitle}>O que acontece depois</div>
            <ol style={{ fontSize: 13, color: T.inkMuted, lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
              <li>Veja sua pontuação por área</li>
              <li>Receba uma trilha recomendada</li>
              <li>Comece pela aula certa para você</li>
            </ol>
          </Card>
        </aside>
      </div>
    </Shell>
  );
}

window.TesteNivel = TesteNivel;
