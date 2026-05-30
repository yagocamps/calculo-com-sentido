// Sobre o projeto — missão, filosofia, princípios pedagógicos

const sobreStyles = {
  wrap: { maxWidth: 760, margin: '0 auto' },
  eyebrow: {
    fontFamily: T.serif, fontStyle: 'italic', fontSize: 13,
    color: T.terracotta, letterSpacing: '0.04em', marginBottom: 8,
    display: 'block',
  },
  h1: {
    fontFamily: T.serif, fontSize: 48, fontWeight: 500,
    letterSpacing: '-0.025em', lineHeight: 1.05,
    margin: '0 0 18px', textWrap: 'balance',
  },
  lede: {
    fontSize: 18, lineHeight: 1.55, color: T.inkMuted,
    fontFamily: T.serif, textWrap: 'pretty',
  },
  pull: {
    fontFamily: T.serif, fontSize: 26, fontWeight: 400,
    fontStyle: 'italic', lineHeight: 1.35,
    color: T.ink, padding: '22px 28px',
    borderLeft: `4px solid ${T.terracotta}`,
    background: T.surfaceWarm, borderRadius: '0 14px 14px 0',
    margin: '32px 0',
    textWrap: 'balance',
  },
  section: { marginTop: 40 },
  sectionLabel: {
    fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: T.terracotta, marginBottom: 8,
  },
  sectionH: {
    fontFamily: T.serif, fontSize: 28, fontWeight: 500,
    letterSpacing: '-0.02em', margin: '0 0 14px',
  },
  p: { fontSize: 15, lineHeight: 1.7, color: T.ink, margin: '0 0 14px' },

  five: {
    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10,
    marginTop: 16,
  },
  stepBox: {
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, padding: 16, boxShadow: T.shadowSm,
  },
  stepNum: {
    fontFamily: T.serif, fontStyle: 'italic',
    fontSize: 11, color: T.terracotta, letterSpacing: '0.05em',
  },
  stepT: {
    fontFamily: T.serif, fontSize: 16, fontWeight: 500,
    marginTop: 4, marginBottom: 6, lineHeight: 1.2,
  },
  stepD: { fontSize: 12.5, color: T.inkMuted, lineHeight: 1.5 },

  table: {
    width: '100%', borderCollapse: 'collapse', marginTop: 12,
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: T.r2, overflow: 'hidden',
  },
  th: {
    fontFamily: T.serif, fontStyle: 'italic',
    fontSize: 12, color: T.inkSubtle, textAlign: 'left',
    padding: '12px 16px', borderBottom: `1px solid ${T.border}`,
    background: T.surfaceWarm,
  },
  td: {
    fontSize: 13.5, color: T.ink, padding: '12px 16px',
    borderBottom: `1px solid ${T.borderSoft}`, verticalAlign: 'top',
  },

  ctaBox: {
    marginTop: 44, background: T.surfaceInk, color: T.inkOnDark,
    borderRadius: T.r3, padding: '32px 36px',
    display: 'flex', alignItems: 'center', gap: 24,
  },
};

function Sobre() {
  return (
    <Shell active="sobre" crumbs={['Início', 'Sobre o projeto']}>
      <div style={sobreStyles.wrap}>
        <span style={sobreStyles.eyebrow}>O manifesto</span>
        <h1 style={sobreStyles.h1}>
          Ensinar matemática com sentido, aplicação e clareza.
        </h1>
        <p style={sobreStyles.lede}>
          Cálculo 1 é uma das matérias que mais assusta alunos no início da
          faculdade. Muitos não reprovam porque são incapazes — reprovam
          porque chegam sem base e sem entender o sentido do conteúdo.
        </p>

        <div style={sobreStyles.pull}>
          “Antes de ensinar a fórmula, ensine o sentido. Antes de cobrar o cálculo,
          mostre a aplicação.”
        </div>

        <div style={sobreStyles.section}>
          <div style={sobreStyles.sectionLabel}>01 · A filosofia</div>
          <h2 style={sobreStyles.sectionH}>Toda aula responde 5 perguntas</h2>
          <p style={sobreStyles.p}>
            Não basta saber a fórmula. O aluno precisa entender o que está
            fazendo. Por isso, toda explicação responde, nessa ordem:
          </p>
          <div style={sobreStyles.five}>
            {[
              ['01', 'O que é?', 'A definição em linguagem simples, sem academiquês.'],
              ['02', 'Para que serve?', 'O propósito — em uma frase clara.'],
              ['03', 'Onde aparece?', 'Aplicação real: cotidiano, profissão, ciência.'],
              ['04', 'Como uso?', 'Exemplo resolvido passo a passo.'],
              ['05', 'O que significa?', 'Interpretação do resultado.'],
            ].map(([n, t, d]) => (
              <div key={n} style={sobreStyles.stepBox}>
                <div style={sobreStyles.stepNum}>{n}</div>
                <div style={sobreStyles.stepT}>{t}</div>
                <div style={sobreStyles.stepD}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={sobreStyles.section}>
          <div style={sobreStyles.sectionLabel}>02 · Para quem é</div>
          <h2 style={sobreStyles.sectionH}>Três tipos de aluno — uma mesma trilha</h2>
          <table style={sobreStyles.table}>
            <thead>
              <tr>
                <th style={sobreStyles.th}>Tipo de aluno</th>
                <th style={sobreStyles.th}>Necessidade</th>
                <th style={sobreStyles.th}>Por onde começar</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={sobreStyles.td}><b>Iniciante</b></td>
                  <td style={sobreStyles.td}>Aprender do zero, sem vergonha do básico</td>
                  <td style={sobreStyles.td}>Fundamentos matemáticos</td></tr>
              <tr><td style={sobreStyles.td}><b>Intermediário</b></td>
                  <td style={sobreStyles.td}>Revisar o ensino médio</td>
                  <td style={sobreStyles.td}>Pré-Cálculo — módulo de Funções</td></tr>
              <tr><td style={sobreStyles.td}><b>Avançado</b></td>
                  <td style={sobreStyles.td}>Revisitar antes da prova</td>
                  <td style={sobreStyles.td}>Resumos rápidos e Cálculo 1</td></tr>
            </tbody>
          </table>
        </div>

        <div style={sobreStyles.section}>
          <div style={sobreStyles.sectionLabel}>03 · Como funcionam as aulas</div>
          <h2 style={sobreStyles.sectionH}>O caminho do aluno</h2>
          <p style={sobreStyles.p}>
            Você entra no site, faz um teste de nível (não conta nota), recebe
            uma trilha recomendada, estuda aulas curtas com exemplos aplicados,
            pratica em quatro níveis de dificuldade e — em breve — pode pedir
            ajuda para uma IA tutora que <b>explica</b> antes de entregar a resposta.
          </p>
        </div>

        <div style={sobreStyles.ctaBox}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: T.serif, fontStyle: 'italic',
              fontSize: 12, opacity: 0.65, letterSpacing: '0.04em',
            }}>O próximo passo</div>
            <div style={{
              fontFamily: T.serif, fontSize: 22, fontWeight: 500,
              letterSpacing: '-0.015em', margin: '4px 0',
            }}>Descubra por onde começar — leva 8 minutos.</div>
            <div style={{ fontSize: 13.5, opacity: 0.7 }}>
              Sem cadastro, sem nota, sem pegadinha. Só uma recomendação honesta.
            </div>
          </div>
          <Btn variant="primary" size="lg">Fazer teste de nível →</Btn>
        </div>
      </div>
    </Shell>
  );
}

window.Sobre = Sobre;
