// Meu progresso — dashboard com % concluído, pontos fortes, revisões, histórico

const progStyles = {
  layout: { maxWidth: 1080, display: 'flex', flexDirection: 'column', gap: 18 },

  hero: {
    display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18,
  },
  bigCard: {
    background: `linear-gradient(135deg, ${T.surfaceWarm} 0%, ${T.terracottaSoft} 130%)`,
    border: `1px solid ${T.border}`, borderRadius: T.r3, padding: 28,
    position: 'relative', overflow: 'hidden',
  },
  eyebrow: {
    fontFamily: T.serif, fontStyle: 'italic', fontSize: 13,
    color: T.terracotta, letterSpacing: '0.04em',
  },
  greeting: {
    fontFamily: T.serif, fontSize: 32, fontWeight: 500,
    letterSpacing: '-0.02em', lineHeight: 1.15, margin: '6px 0 6px',
    textWrap: 'balance',
  },
  greetingSub: { fontSize: 14, color: T.inkMuted, maxWidth: 460, lineHeight: 1.55 },

  trailsRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20,
  },
  trailMini: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 14,
  },
  trailName: { fontFamily: T.serif, fontSize: 16, fontWeight: 500, marginBottom: 8 },
  bar: { height: 6, borderRadius: 99, background: T.surfaceWarm, overflow: 'hidden' },
  fill: (w, c) => ({ height: '100%', width: `${w}%`, background: c, borderRadius: 99 }),

  stats: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r3, padding: 22,
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22,
  },
  statBlock: { display: 'flex', flexDirection: 'column', gap: 4 },
  statN: {
    fontFamily: T.serif, fontSize: 36, fontWeight: 500,
    letterSpacing: '-0.02em', color: T.ink, lineHeight: 1,
  },
  statL: { fontSize: 12, color: T.inkSubtle, letterSpacing: '0.04em', textTransform: 'uppercase' },
  statSub: { fontSize: 12, color: T.sageInk, marginTop: 2 },

  cols: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 },
  panel: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r3, padding: 22, boxShadow: T.shadowSm,
  },
  panelTitle: {
    fontFamily: T.serif, fontSize: 18, fontWeight: 500,
    letterSpacing: '-0.01em', marginBottom: 4,
  },
  panelSub: { fontSize: 13, color: T.inkMuted, marginBottom: 16 },

  topicRow: {
    display: 'grid', gridTemplateColumns: '1fr 80px 60px', gap: 12,
    alignItems: 'center', padding: '10px 0',
    borderBottom: `1px dashed ${T.borderSoft}`, fontSize: 13.5,
  },

  heat: {
    display: 'flex', gap: 4, marginTop: 4,
  },
  heatCell: (level) => ({
    width: 14, height: 14, borderRadius: 3,
    background: [T.surfaceWarm, '#EAD8C0', '#DBA988', T.terracotta, T.terracottaInk][level],
  }),

  recCard: (accent) => ({
    background: T.surface, border: `1px solid ${T.border}`,
    borderLeft: `3px solid ${accent}`,
    borderRadius: T.r2, padding: 14,
    display: 'flex', alignItems: 'center', gap: 12,
    marginBottom: 8,
  }),
};

function MeuProgresso() {
  const topicos = [
    ['Equações do 1º grau', 96, 'sage'],
    ['Função afim', 88, 'sage'],
    ['Frações e potências', 75, 'sky'],
    ['Função quadrática', 52, 'amber'],
    ['Logaritmos', 28, 'terracotta'],
    ['Gráficos', 18, 'terracotta'],
  ];

  return (
    <Shell active="prog" crumbs={['Início', 'Meu progresso']}>
      <div style={progStyles.layout}>
        <div style={progStyles.hero}>
          <div style={progStyles.bigCard}>
            <div style={{
              position: 'absolute', right: -30, top: -20, opacity: 0.07,
              fontFamily: T.serif, fontSize: 220, lineHeight: 1, color: T.terracottaInk,
              fontStyle: 'italic',
            }}>%</div>
            <span style={progStyles.eyebrow}>Olá, Lara</span>
            <h1 style={progStyles.greeting}>
              Você está em <span style={{ color: T.terracotta }}>42%</span> do plano completo.
            </h1>
            <p style={progStyles.greetingSub}>
              Boa! Já passou da metade de Pré-Cálculo. Antes de entrar em Cálculo 1,
              dá uma força em <b>logaritmos</b> e <b>função quadrática</b> — você
              vai precisar deles em limites e derivadas.
            </p>
            <div style={progStyles.trailsRow}>
              <div style={progStyles.trailMini}>
                <div style={progStyles.trailName}>Pré-Cálculo</div>
                <div style={progStyles.bar}><div style={progStyles.fill(68, T.sage)}></div></div>
                <div style={{ fontSize: 12, color: T.inkSubtle, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>4 de 6 módulos</span><b style={{ color: T.ink }}>68%</b>
                </div>
              </div>
              <div style={progStyles.trailMini}>
                <div style={progStyles.trailName}>Cálculo 1</div>
                <div style={progStyles.bar}><div style={progStyles.fill(15, T.terracotta)}></div></div>
                <div style={{ fontSize: 12, color: T.inkSubtle, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>1 de 7 módulos</span><b style={{ color: T.ink }}>15%</b>
                </div>
              </div>
            </div>
          </div>

          <div style={progStyles.stats}>
            <div style={progStyles.statBlock}>
              <div style={progStyles.statN}>47</div>
              <div style={progStyles.statL}>Aulas concluídas</div>
              <div style={progStyles.statSub}>+3 esta semana</div>
            </div>
            <div style={progStyles.statBlock}>
              <div style={progStyles.statN}>186</div>
              <div style={progStyles.statL}>Exercícios feitos</div>
              <div style={progStyles.statSub}>74% de acerto</div>
            </div>
            <div style={progStyles.statBlock}>
              <div style={progStyles.statN}>12<span style={{ fontSize: 18, color: T.inkSubtle }}>d</span></div>
              <div style={progStyles.statL}>Sequência atual</div>
              <div style={progStyles.statSub}>Recorde: 19 dias</div>
            </div>
            <div style={progStyles.statBlock}>
              <div style={progStyles.statN}>6<span style={{ fontSize: 18, color: T.inkSubtle }}>h 24</span></div>
              <div style={progStyles.statL}>Esta semana</div>
              <div style={progStyles.statSub}>Meta: 8h</div>
            </div>
            <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12 }}>
              <div style={{ fontSize: 11.5, color: T.inkSubtle, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                Atividade — últimas 12 semanas
              </div>
              <div style={progStyles.heat}>
                {[0,1,2,1,3,2,0,1,3,4,2,1,2,3,4,3,2,1,0,1,2,3,2,4].map((l, i) => (
                  <div key={i} style={progStyles.heatCell(l)}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={progStyles.cols}>
          <div style={progStyles.panel}>
            <h3 style={progStyles.panelTitle}>Por tópico</h3>
            <p style={progStyles.panelSub}>Onde você está firme e onde precisa de mais atenção.</p>
            {topicos.map(([t, v, c]) => (
              <div key={t} style={progStyles.topicRow}>
                <span style={{ fontWeight: 500 }}>{t}</span>
                <div style={progStyles.bar}>
                  <div style={progStyles.fill(v, T[c])}></div>
                </div>
                <span style={{ fontFamily: T.mono, fontSize: 12, color: T.inkMuted, textAlign: 'right' }}>{v}%</span>
              </div>
            ))}
          </div>

          <div style={progStyles.panel}>
            <h3 style={progStyles.panelTitle}>Recomendado para você</h3>
            <p style={progStyles.panelSub}>Baseado nos seus erros recentes e no plano da trilha.</p>

            <div style={progStyles.recCard(T.terracotta)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.terracotta, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Revisão sugerida
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500, margin: '2px 0' }}>
                  Logaritmos: ideia e propriedades
                </div>
                <div style={{ fontSize: 12.5, color: T.inkMuted }}>
                  Você errou 4 de 7 exercícios deste tópico.
                </div>
              </div>
              <Btn variant="primary" size="sm">Revisar</Btn>
            </div>

            <div style={progStyles.recCard(T.sage)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.sageInk, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Próximo passo
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500, margin: '2px 0' }}>
                  Função quadrática · Aula 02
                </div>
                <div style={{ fontSize: 12.5, color: T.inkMuted }}>
                  Continuar de onde parou ontem.
                </div>
              </div>
              <Btn variant="soft" size="sm">Continuar</Btn>
            </div>

            <div style={progStyles.recCard(T.sky)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.skyInk, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Desafio da semana
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500, margin: '2px 0' }}>
                  Otimização de embalagem
                </div>
                <div style={{ fontSize: 12.5, color: T.inkMuted }}>
                  Aplica afim + quadrática. ~15 min.
                </div>
              </div>
              <Btn variant="soft" size="sm">Tentar</Btn>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.MeuProgresso = MeuProgresso;
