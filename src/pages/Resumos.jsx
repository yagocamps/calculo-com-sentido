// Resumos rápidos — galeria de cartões de revisão por tema

const resStyles = {
  header: { marginBottom: 22 },
  title: {
    fontFamily: T.serif, fontSize: 36, fontWeight: 500,
    letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 8px',
  },
  desc: { fontSize: 14, color: T.inkMuted, lineHeight: 1.55, maxWidth: 560 },
  filter: { display: 'flex', gap: 6, marginTop: 18 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 },

  card: (accent) => ({
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 22, boxShadow: T.shadowSm,
    borderTop: `3px solid ${accent}`,
    display: 'flex', flexDirection: 'column', gap: 12,
  }),
  cardHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: {
    fontFamily: T.serif, fontSize: 22, fontWeight: 500,
    letterSpacing: '-0.015em', margin: '0 0 4px',
  },
  cardSub: { fontSize: 12.5, color: T.inkSubtle, fontFamily: T.serif, fontStyle: 'italic' },

  formulaRow: {
    fontFamily: T.mono, fontSize: 13,
    padding: '8px 12px', borderRadius: 8,
    background: T.surfaceWarm, border: `1px solid ${T.borderSoft}`,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    color: T.ink,
  },
  formulaLabel: { fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.inkSubtle },

  when: {
    background: T.skySoft, color: T.skyInk,
    padding: '8px 12px', borderRadius: 8, fontSize: 12.5, lineHeight: 1.5,
    border: `1px solid ${T.sky}`,
  },
};

function ResumoCard({ accent, eyebrow, title, sub, formulas, when, tip }) {
  return (
    <div style={resStyles.card(accent)}>
      <div style={resStyles.cardHead}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: accent,
        }}>{eyebrow}</span>
        <span style={{ fontSize: 12, color: T.inkSubtle }}>4 min</span>
      </div>
      <div>
        <h3 style={resStyles.cardTitle}>{title}</h3>
        <div style={resStyles.cardSub}>{sub}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {formulas.map(([l, f], i) => (
          <div key={i} style={resStyles.formulaRow}>
            <span style={resStyles.formulaLabel}>{l}</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div style={resStyles.when}>
        <b>Quando usar:</b> {when}
      </div>
      {tip && (
        <div style={{ fontSize: 12.5, color: T.inkMuted, fontStyle: 'italic', borderLeft: `2px solid ${T.amber}`, paddingLeft: 10 }}>
          {tip}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 6 }}>
        <Btn variant="ghost" size="sm">Ver mapa mental</Btn>
        <Btn variant="soft" size="sm">Imprimir</Btn>
      </div>
    </div>
  );
}

function Resumos() {
  return (
    <Shell active="resumos" crumbs={['Início', 'Resumos rápidos']}>
      <div style={{ maxWidth: 1080 }}>
        <header style={resStyles.header}>
          <h1 style={resStyles.title}>Resumos rápidos</h1>
          <p style={resStyles.desc}>
            Fórmulas principais, mapas mentais e tabelas para você revisar
            antes da prova. Cada cartão também mostra <b>quando usar</b> aquele
            conteúdo — porque saber a fórmula não basta.
          </p>
          <div style={resStyles.filter}>
            {['Todos', 'Pré-Cálculo', 'Cálculo 1', 'Fórmulas', 'Mapas mentais', 'Erros comuns'].map((c, i) => (
              <div key={c} style={{
                padding: '6px 12px', borderRadius: 99, fontSize: 12.5, fontWeight: 600,
                background: i === 0 ? T.ink : T.surface,
                color: i === 0 ? T.inkOnDark : T.inkMuted,
                border: `1px solid ${i === 0 ? T.ink : T.border}`,
              }}>{c}</div>
            ))}
          </div>
        </header>

        <div style={resStyles.grid}>
          <ResumoCard
            accent={T.sage}
            eyebrow="Pré-Cálculo · Funções"
            title="Função afim e quadrática"
            sub="A reta e a parábola, lado a lado"
            formulas={[
              ['Afim', 'f(x) = a·x + b'],
              ['Quadrática', 'f(x) = a·x² + b·x + c'],
              ['Vértice', 'xv = −b/(2a)'],
              ['Δ', 'Δ = b² − 4ac'],
            ]}
            when="Sempre que houver crescimento constante (afim) ou um valor máximo/mínimo (quadrática)."
            tip="Lembre: o sinal de a indica concavidade. a > 0 → boca pra cima."
          />
          <ResumoCard
            accent={T.amber}
            eyebrow="Pré-Cálculo · Funções"
            title="Exponencial e logaritmo"
            sub="Crescimento rápido e a operação inversa"
            formulas={[
              ['Exponencial', 'f(x) = a · bˣ'],
              ['Logaritmo', 'log_b(x) = y ↔ bʸ = x'],
              ['Propriedade-chave', 'log(a·b) = log(a) + log(b)'],
            ]}
            when="Juros compostos, crescimento populacional, escalas (pH, Richter, decibéis)."
            tip="Logaritmo é a pergunta: 'a que potência elevar a base para chegar nesse número?'"
          />
          <ResumoCard
            accent={T.sky}
            eyebrow="Cálculo 1 · Limites"
            title="Limites e indeterminações"
            sub="O que fazer quando substituir não basta"
            formulas={[
              ['Substituição', 'lim x→a f(x) = f(a)'],
              ['Caso 0/0', 'Fatorar e simplificar'],
              ['Caso ∞/∞', 'Dividir pelo maior grau'],
              ['Lim. fundamental', 'lim x→0 (sen x)/x = 1'],
            ]}
            when="Calcular velocidade instantânea, comportamento de assíntotas, tendência no infinito."
            tip="Limite ≠ valor no ponto. Limite é a tendência ao chegar perto."
          />
          <ResumoCard
            accent={T.terracotta}
            eyebrow="Cálculo 1 · Derivadas"
            title="Regras de derivação"
            sub="As 6 que resolvem 90% das provas"
            formulas={[
              ['Constante', "d/dx [c] = 0"],
              ['Potência', "d/dx [xⁿ] = n·xⁿ⁻¹"],
              ['Soma', "(f + g)' = f' + g'"],
              ['Produto', "(f·g)' = f'·g + f·g'"],
              ['Quociente', "(f/g)' = (f'g − fg')/g²"],
              ['Cadeia', "[f(g(x))]' = f'(g)·g'(x)"],
            ]}
            when="Calcular taxa de variação, velocidade, lucro marginal, máximos/mínimos."
            tip="Derivar é responder: 'com que velocidade isso está mudando agora?'"
          />
          <ResumoCard
            accent={T.terracotta}
            eyebrow="Cálculo 1 · Aplicações"
            title="Máximos, mínimos e otimização"
            sub="Onde a derivada vira decisão"
            formulas={[
              ["Ponto crítico", "f'(x) = 0"],
              ["Mínimo local", "f''(x) > 0"],
              ["Máximo local", "f''(x) < 0"],
              ["Inflexão", "f''(x) = 0"],
            ]}
            when="Lucro máximo, custo mínimo, melhor aproveitamento de material, área/volume ótimo."
            tip="Sempre verifique se o ponto crítico está dentro do intervalo do problema."
          />
          <ResumoCard
            accent={T.sage}
            eyebrow="Cálculo 1 · Integrais"
            title="Integrais básicas"
            sub="Acumular, somar, calcular área"
            formulas={[
              ['Potência', '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C'],
              ['Constante', '∫ k dx = k·x + C'],
              ['Exponencial', '∫ eˣ dx = eˣ + C'],
              ['T. Fundamental', '∫ₐᵇ f(x) dx = F(b) − F(a)'],
            ]}
            when="Calcular área sob curva, distância total, consumo acumulado, volume."
            tip="Integrar é o inverso de derivar. Sempre some o +C no caso indefinido."
          />
        </div>
      </div>
    </Shell>
  );
}

window.Resumos = Resumos;
