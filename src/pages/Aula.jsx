// Página de aula — modelo padrão com as 12 seções obrigatórias

const aulaStyles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 240px', gap: 28, maxWidth: 1080 },
  header: { marginBottom: 18 },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 12, color: T.terracotta, fontFamily: T.serif,
    fontStyle: 'italic', marginBottom: 8,
  },
  title: {
    fontFamily: T.serif, fontSize: 38, fontWeight: 500,
    letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px',
    color: T.ink, textWrap: 'balance',
  },
  meta: { display: 'flex', gap: 14, alignItems: 'center', fontSize: 13, color: T.inkMuted, marginBottom: 4 },
  metaDot: { width: 3, height: 3, borderRadius: 99, background: T.inkSubtle },

  section: { marginTop: 28 },
  sectionLabel: {
    display: 'flex', alignItems: 'center', gap: 12,
    fontFamily: T.serif, fontSize: 11.5, fontWeight: 600,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: T.terracotta, marginBottom: 8,
  },
  sectionNum: {
    width: 22, height: 22, borderRadius: 6,
    background: T.terracottaSoft, color: T.terracottaInk,
    fontFamily: T.mono, fontWeight: 700, fontSize: 11,
    display: 'grid', placeItems: 'center',
  },
  sectionTitle: {
    fontFamily: T.serif, fontSize: 22, fontWeight: 500,
    letterSpacing: '-0.015em', margin: '0 0 10px', color: T.ink,
  },
  p: { fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 },
  pMuted: { fontSize: 14, lineHeight: 1.65, color: T.inkMuted, margin: 0 },

  callout: (variant) => {
    const v = {
      idea:  { bg: T.skySoft, border: T.sky, ink: T.skyInk, label: 'IDEIA INTUITIVA' },
      apply: { bg: T.sageSoft, border: T.sage, ink: T.sageInk, label: 'ONDE ISSO APARECE' },
      warn:  { bg: T.amberSoft, border: T.amber, ink: T.amberInk, label: 'ERRO COMUM' },
      tip:   { bg: T.terracottaSoft, border: T.terracotta, ink: T.terracottaInk, label: 'DICA' },
    }[variant];
    return {
      background: v.bg, border: `1px solid ${v.border}`,
      borderLeft: `4px solid ${v.border}`,
      borderRadius: T.r2, padding: '14px 18px',
      ...v,
    };
  },

  formulaBlock: {
    background: T.surfaceInk, color: T.inkOnDark,
    fontFamily: T.mono, fontSize: 16,
    padding: '18px 22px', borderRadius: T.r2,
    margin: '12px 0', display: 'flex',
    alignItems: 'center', gap: 16,
  },

  stepRow: {
    display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14,
    padding: '12px 0', borderBottom: `1px dashed ${T.borderSoft}`,
  },
  stepNum: {
    width: 28, height: 28, borderRadius: 99,
    background: T.surface, border: `1px solid ${T.border}`,
    color: T.ink, fontFamily: T.serif, fontWeight: 600,
    display: 'grid', placeItems: 'center', fontSize: 13,
  },

  // sidebar
  toc: {
    position: 'sticky', top: 0,
    fontSize: 13,
  },
  tocLabel: {
    fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: T.inkSubtle, fontWeight: 600, marginBottom: 10,
  },
  tocItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '5px 0',
    color: active ? T.ink : T.inkMuted,
    fontWeight: active ? 600 : 500,
    borderLeft: active ? `2px solid ${T.terracotta}` : `2px solid transparent`,
    paddingLeft: 12,
  }),
};

function Section({ n, label, title, children }) {
  return (
    <section style={aulaStyles.section}>
      <div style={aulaStyles.sectionLabel}>
        <span style={aulaStyles.sectionNum}>{String(n).padStart(2, '0')}</span>
        {label}
      </div>
      <h3 style={aulaStyles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
}

function Aula() {
  const toc = [
    [1, 'Por que aprender'], [2, 'Explicação simples'], [3, 'Onde aparece'],
    [4, 'Exemplo aplicado'], [5, 'Passo a passo'], [6, 'Interpretação'],
    [7, 'Erros comuns'], [8, 'Exercícios guiados'], [9, 'Exercícios aplicados'],
    [10, 'Resumo'], [11, 'Próxima aula'],
  ];

  return (
    <Shell
      active="aula"
      crumbs={['Pré-Cálculo', 'Funções', 'Função afim']}
      topRight={<Btn variant="ghost" size="sm">Marcar como concluída</Btn>}
    >
      <div style={aulaStyles.layout}>
        <article>
          <header style={aulaStyles.header}>
            <div style={aulaStyles.eyebrow}>Aula 03 · Módulo Funções</div>
            <h1 style={aulaStyles.title}>Função afim: a equação que descreve quase tudo no dia a dia</h1>
            <div style={aulaStyles.meta}>
              <span>⏱ 12 min de leitura</span>
              <span style={aulaStyles.metaDot}></span>
              <span>5 exemplos resolvidos</span>
              <span style={aulaStyles.metaDot}></span>
              <span>4 níveis de exercícios</span>
              <span style={aulaStyles.metaDot}></span>
              <Tag color={T.sage} soft={T.sageSoft} ink={T.sageInk}>Nível: iniciante</Tag>
            </div>
          </header>

          <Section n={1} label="Por que aprender isso" title="Antes da fórmula, o sentido">
            <p style={aulaStyles.p}>
              A função afim é o jeito matemático de dizer: <em>“tem uma parte fixa
              e uma parte que depende de quanto você usa”</em>. É a corrida de
              aplicativo, o salário com comissão, a conta de luz — tudo que tem
              taxa básica + variável.
            </p>
          </Section>

          <Section n={2} label="Explicação simples" title="A ideia em uma frase">
            <div style={aulaStyles.callout('idea')}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 6 }}>IDEIA INTUITIVA</div>
              <p style={{ ...aulaStyles.p, color: 'inherit' }}>
                Quando algo cresce de forma <b>constante</b> — sempre o mesmo tanto a
                cada passo — você está olhando para uma função afim.
              </p>
            </div>
            <div style={aulaStyles.formulaBlock}>
              <span style={{ opacity: 0.5, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13 }}>fórmula</span>
              <span>f(x) = a·x + b</span>
              <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: 12 }}>
                <i>a</i> = taxa &nbsp;·&nbsp; <i>b</i> = valor inicial
              </span>
            </div>
          </Section>

          <Section n={3} label="Onde isso aparece" title="Aplicações reais">
            <div style={aulaStyles.callout('apply')}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>ONDE ISSO APARECE</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {[
                  ['Corrida de app', 'Bandeirada + R$/km'],
                  ['Salário', 'Fixo + comissão por venda'],
                  ['Conta de luz', 'Tarifa fixa + consumo'],
                  ['Aluguel de bicicleta', 'Liberação + minutos'],
                ].map(([t, d]) => (
                  <div key={t} style={{ fontSize: 13 }}>
                    <b>{t}</b> <span style={{ opacity: 0.75 }}>· {d}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section n={4} label="Exemplo aplicado" title="Uma situação concreta">
            <p style={aulaStyles.p}>
              Uma corrida de aplicativo cobra uma bandeirada de <b>R$ 6,00</b> e
              mais <b>R$ 2,40</b> por quilômetro rodado. Quanto custa uma corrida
              de 8&nbsp;km?
            </p>
          </Section>

          <Section n={5} label="Resolução passo a passo" title="Como pensar">
            {[
              ['Identificar a parte fixa', 'A bandeirada não muda → é o b = 6.'],
              ['Identificar a taxa', 'A cada km, soma R$ 2,40 → é o a = 2,40.'],
              ['Montar a função', 'C(x) = 2,40·x + 6'],
              ['Substituir x = 8', 'C(8) = 2,40·8 + 6 = 19,20 + 6'],
              ['Calcular', 'C(8) = R$ 25,20'],
            ].map(([t, d], i) => (
              <div key={i} style={aulaStyles.stepRow}>
                <div style={aulaStyles.stepNum}>{i+1}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{t}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 13.5, color: T.inkMuted }}>{d}</div>
                </div>
              </div>
            ))}
          </Section>

          <Section n={6} label="Interpretação" title="O que esse número significa?">
            <p style={aulaStyles.p}>
              <b>R$ 25,20</b> é o que o cliente paga. Os <b>R$ 6,00</b> são pagos só
              por ter pedido o carro. Os outros <b>R$ 19,20</b> dependem da distância
              — quanto mais longe, maior. Se a corrida tivesse <b>0 km</b>, ainda
              custaria R$ 6,00. Essa é a leitura física do <i>b</i>.
            </p>
          </Section>

          <Section n={7} label="Erros comuns" title="Cuidado com">
            <div style={aulaStyles.callout('warn')}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>ERRO COMUM</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>
                <li>Esquecer de somar a parte fixa <i>b</i> no final.</li>
                <li>Trocar <i>a</i> e <i>b</i> ao identificar na situação.</li>
                <li>Achar que se x = 0, o resultado também é 0.</li>
              </ul>
            </div>
          </Section>

          <Section n={8} label="Exercícios" title="Pratique agora">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Btn variant="primary">Começar exercícios guiados →</Btn>
              <Btn variant="ghost">Ver 12 exercícios aplicados</Btn>
            </div>
          </Section>

          <div style={{
            marginTop: 36, padding: 20, borderRadius: T.r2,
            background: T.surfaceWarm, border: `1px solid ${T.border}`,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, color: T.inkSubtle, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Próxima aula</div>
              <div style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 500 }}>
                Função quadrática: quando o gráfico vira parábola
              </div>
            </div>
            <Btn variant="dark">Continuar →</Btn>
          </div>
        </article>

        <aside style={aulaStyles.toc}>
          <div style={aulaStyles.tocLabel}>Nesta aula</div>
          <div>
            {toc.map(([n, t]) => (
              <div key={n} style={aulaStyles.tocItem(n === 2)}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.inkSubtle, width: 18 }}>
                  {String(n).padStart(2, '0')}
                </span>
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <div style={aulaStyles.tocLabel}>Termos novos</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Coeficiente', 'Taxa', 'Variável', 'Domínio'].map(t => (
                <span key={t} style={{
                  fontSize: 11.5, padding: '3px 8px',
                  background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 99, color: T.inkMuted,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Shell>
  );
}

window.Aula = Aula;
