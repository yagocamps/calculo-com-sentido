// Home / Início — apresenta a proposta, missão e caminhos

const homeStyles = {
  hero: {
    background: `linear-gradient(135deg, ${T.surfaceWarm} 0%, ${T.terracottaSoft} 120%)`,
    borderRadius: T.r3,
    padding: '40px 44px',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${T.border}`,
  },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: T.terracottaInk,
    padding: '5px 10px', borderRadius: 99,
    background: 'rgba(255,255,255,0.7)', border: `1px solid ${T.border}`,
  },
  h1: {
    fontFamily: T.serif, fontSize: 46, lineHeight: 1.05,
    letterSpacing: '-0.025em', fontWeight: 500,
    color: T.ink, margin: '18px 0 14px', maxWidth: 720,
    textWrap: 'balance',
  },
  lede: {
    fontSize: 16, lineHeight: 1.55, color: T.inkMuted, maxWidth: 600,
    marginBottom: 22,
  },
  ctaRow: { display: 'flex', gap: 10, alignItems: 'center' },
  pathGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
    marginTop: 22,
  },
  pathCard: (accent) => ({
    background: T.surface, borderRadius: T.r2,
    padding: 22, border: `1px solid ${T.border}`,
    display: 'flex', flexDirection: 'column', gap: 12,
    boxShadow: T.shadowSm,
    borderLeft: `3px solid ${accent}`,
  }),
  pathTitle: {
    fontFamily: T.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em',
  },
  benefits: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
    marginTop: 22,
  },
  benefit: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 18,
  },
  benefitNum: {
    fontFamily: T.serif, fontSize: 13, color: T.terracotta, fontWeight: 600,
    letterSpacing: '0.05em',
  },
  benefitTitle: {
    fontFamily: T.serif, fontSize: 17, fontWeight: 500, margin: '6px 0 6px',
    letterSpacing: '-0.01em',
  },
  benefitText: { fontSize: 13, color: T.inkMuted, lineHeight: 1.5 },
  audience: {
    background: T.surfaceInk, color: T.inkOnDark,
    borderRadius: T.r3, padding: 28,
    marginTop: 22,
  },
};

function Home() {
  return (
    <Shell active="home" crumbs={['Início']}>
      <div style={{ maxWidth: 1080 }}>
        <section style={homeStyles.hero}>
          {/* decorative math glyphs */}
          <div style={{
            position: 'absolute', right: -40, top: -30, opacity: 0.08,
            fontFamily: T.serif, fontSize: 280, lineHeight: 1, color: T.terracottaInk,
            fontStyle: 'italic', userSelect: 'none', pointerEvents: 'none',
          }}>∫ƒ</div>

          <span style={homeStyles.eyebrow}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: T.terracotta }}></span>
            Para quem chega à faculdade com medo de Cálculo
          </span>
          <h1 style={homeStyles.h1}>
            Aprenda Pré-Cálculo e Cálculo 1 de forma <em style={{ fontStyle: 'italic', color: T.terracotta }}>simples</em>, aplicada e progressiva.
          </h1>
          <p style={homeStyles.lede}>
            Antes de cobrar a fórmula, mostramos o sentido. Antes de ensinar o cálculo,
            mostramos onde ele aparece na vida real. Para alunos que saíram do ensino
            médio com dificuldade — e querem entrar na faculdade com confiança.
          </p>
          <div style={homeStyles.ctaRow}>
            <Btn variant="primary" size="lg">Fazer teste de nível →</Btn>
            <Btn variant="ghost" size="lg">Conhecer as trilhas</Btn>
          </div>
        </section>

        <div style={homeStyles.pathGrid}>
          <div style={homeStyles.pathCard(T.sage)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tag color={T.sage} soft={T.sageSoft} ink={T.sageInk}>Base · 6 módulos</Tag>
              <span style={{ fontSize: 12, color: T.inkSubtle }}>~ 8 semanas</span>
            </div>
            <div style={homeStyles.pathTitle}>Pré-Cálculo</div>
            <p style={{ fontSize: 13.5, color: T.inkMuted, lineHeight: 1.55, margin: 0 }}>
              Funções, gráficos, álgebra e trigonometria. A base sólida que falta
              para entender Cálculo 1 sem trauma.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Btn variant="dark">Acessar trilha</Btn>
              <Btn variant="soft">Ver módulos</Btn>
            </div>
          </div>

          <div style={homeStyles.pathCard(T.terracotta)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tag color={T.terracotta} soft={T.terracottaSoft} ink={T.terracottaInk}>Faculdade · 7 módulos</Tag>
              <span style={{ fontSize: 12, color: T.inkSubtle }}>~ 10 semanas</span>
            </div>
            <div style={homeStyles.pathTitle}>Cálculo 1</div>
            <p style={{ fontSize: 13.5, color: T.inkMuted, lineHeight: 1.55, margin: 0 }}>
              Limites, continuidade, derivadas e integrais. Primeiro a ideia
              intuitiva — depois a fórmula, sempre com aplicação real.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Btn variant="dark">Acessar trilha</Btn>
              <Btn variant="soft">Ver módulos</Btn>
            </div>
          </div>
        </div>

        <div style={homeStyles.benefits}>
          <div style={homeStyles.benefit}>
            <div style={homeStyles.benefitNum}>01 · IDEIA</div>
            <div style={homeStyles.benefitTitle}>Sentido antes da fórmula</div>
            <div style={homeStyles.benefitText}>
              Cada aula começa com o porquê e com onde o conteúdo aparece
              na prática — engenharia, finanças, saúde, cotidiano.
            </div>
          </div>
          <div style={homeStyles.benefit}>
            <div style={homeStyles.benefitNum}>02 · RITMO</div>
            <div style={homeStyles.benefitTitle}>Passo a passo, sem pular</div>
            <div style={homeStyles.benefitText}>
              Aulas curtas, exercícios guiados e desafios. Você só avança
              quando a base está firme.
            </div>
          </div>
          <div style={homeStyles.benefit}>
            <div style={homeStyles.benefitNum}>03 · ERROS</div>
            <div style={homeStyles.benefitTitle}>Aprender com tropeços</div>
            <div style={homeStyles.benefitText}>
              Toda aula mostra os erros comuns. A IA tutora explica
              o conceito antes de entregar a resposta.
            </div>
          </div>
        </div>

        <div style={homeStyles.audience}>
          <div style={{ fontFamily: T.serif, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6 }}>
            Para quem é este site
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 14 }}>
            {[
              ['Iniciante', 'Quer aprender do zero, sem vergonha de não saber o básico.'],
              ['Intermediário', 'Precisa revisar assuntos esquecidos do ensino médio.'],
              ['Avançado', 'Quer revisitar Pré-Cálculo e Cálculo 1 antes da prova.'],
            ].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4, lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.Home = Home;
