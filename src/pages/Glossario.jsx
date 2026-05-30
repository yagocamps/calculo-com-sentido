// Glossário — navegação alfabética + lista de termos

const glossStyles = {
  layout: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, maxWidth: 1080 },
  alphabet: {
    position: 'sticky', top: 0,
  },
  alphaLabel: {
    fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: T.inkSubtle, fontWeight: 600, marginBottom: 10,
  },
  alphaGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4,
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 10,
  },
  alphaCell: (active, disabled) => ({
    padding: '6px 0', textAlign: 'center',
    fontFamily: T.serif, fontSize: 13, fontWeight: 500,
    borderRadius: 6,
    background: active ? T.terracotta : 'transparent',
    color: active ? '#fff' : disabled ? T.inkSubtle : T.ink,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'default' : 'pointer',
  }),
  title: {
    fontFamily: T.serif, fontSize: 36, fontWeight: 500,
    letterSpacing: '-0.02em', margin: '0 0 6px',
  },
  desc: { fontSize: 14, color: T.inkMuted, marginBottom: 22 },

  letterGroup: { marginTop: 22 },
  letterMark: {
    fontFamily: T.serif, fontSize: 64, fontWeight: 500,
    color: T.terracotta, letterSpacing: '-0.04em',
    lineHeight: 1, marginBottom: 12,
  },

  term: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 18, marginBottom: 10,
    boxShadow: T.shadowSm,
  },
  termHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 },
  termName: {
    fontFamily: T.serif, fontSize: 20, fontWeight: 500,
    letterSpacing: '-0.015em',
  },
  termGramm: { fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.inkSubtle },
  termDef: { fontSize: 14, color: T.ink, lineHeight: 1.6, margin: '4px 0 10px' },
  termExample: {
    background: T.surfaceSoft, borderLeft: `3px solid ${T.amber}`,
    padding: '8px 12px', borderRadius: 6, fontSize: 13,
    color: T.inkMuted, lineHeight: 1.55, fontStyle: 'italic',
  },
  termFooter: {
    display: 'flex', alignItems: 'center', gap: 10, marginTop: 10,
    fontSize: 12, color: T.inkSubtle,
  },
};

function Termo({ name, gramm, def, example, where, link }) {
  return (
    <div style={glossStyles.term}>
      <div style={glossStyles.termHead}>
        <span style={glossStyles.termName}>{name}</span>
        <span style={glossStyles.termGramm}>{gramm}</span>
      </div>
      <div style={glossStyles.termDef}>{def}</div>
      <div style={glossStyles.termExample}><b>Exemplo: </b>{example}</div>
      <div style={glossStyles.termFooter}>
        <span>📍 Aparece em: <b style={{ color: T.ink }}>{where}</b></span>
        <span style={{ marginLeft: 'auto', color: T.terracotta, fontWeight: 600 }}>
          {link} →
        </span>
      </div>
    </div>
  );
}

function Glossario() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const has = new Set('ACDFGIPRTV'.split(''));
  const active = 'C';

  return (
    <Shell active="gloss" crumbs={['Início', 'Glossário']}>
      <div style={glossStyles.layout}>
        <aside style={glossStyles.alphabet}>
          <div style={glossStyles.alphaLabel}>Letra</div>
          <div style={glossStyles.alphaGrid}>
            {letters.map(l => (
              <div key={l} style={glossStyles.alphaCell(l === active, !has.has(l))}>
                {l}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={glossStyles.alphaLabel}>Filtrar por</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Tudo', 'Pré-Cálculo', 'Cálculo 1', 'Notação'].map((c, i) => (
                <div key={c} style={{
                  padding: '6px 10px', fontSize: 13, fontWeight: 600,
                  borderRadius: 8, cursor: 'pointer',
                  background: i === 0 ? T.surface : 'transparent',
                  color: i === 0 ? T.ink : T.inkMuted,
                  border: `1px solid ${i === 0 ? T.border : 'transparent'}`,
                }}>{c}</div>
              ))}
            </div>
          </div>

          <Card style={{ marginTop: 22 }}>
            <div style={{ fontSize: 12.5, color: T.inkMuted, lineHeight: 1.5 }}>
              <b style={{ color: T.ink }}>Não achou um termo?</b>
              <br />Pode pedir para a IA tutora explicar — em linguagem simples,
              com exemplo do cotidiano.
            </div>
            <Btn variant="soft" size="sm" style={{ marginTop: 10 }}>Perguntar à IA</Btn>
          </Card>
        </aside>

        <div>
          <h1 style={glossStyles.title}>Glossário matemático</h1>
          <p style={glossStyles.desc}>
            15 termos essenciais explicados em <b>linguagem simples</b>, sem
            definição acadêmica pesada. Cada um tem exemplo e link para a aula.
          </p>

          <div style={glossStyles.letterGroup}>
            <div style={glossStyles.letterMark}>C</div>

            <Termo
              name="Coeficiente"
              gramm="substantivo masculino"
              def="É o número que multiplica uma variável em uma expressão. Ele diz quanto a variável 'pesa' no resultado."
              example="Em f(x) = 5x + 2, o coeficiente de x é 5 — significa que cada unidade de x soma 5 ao resultado."
              where="Funções afim e quadrática"
              link="Ir para a aula"
            />
            <Termo
              name="Constante"
              gramm="substantivo feminino"
              def="É um número que não muda. Diferente de uma variável, a constante mantém o mesmo valor o tempo todo."
              example="O número π é uma constante — vale sempre 3,14159…, em qualquer cálculo."
              where="Funções, derivadas, integrais"
              link="Ver mais"
            />
            <Termo
              name="Continuidade"
              gramm="substantivo feminino"
              def="Uma função é contínua quando o gráfico dela não tem 'furos' nem 'saltos' — você consegue desenhá-la sem tirar o lápis do papel."
              example="A temperatura ao longo do dia é contínua: passa de 25°C para 26°C sem pular valores no meio."
              where="Cálculo 1, Módulo 4"
              link="Ir para a aula"
            />
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.Glossario = Glossario;
