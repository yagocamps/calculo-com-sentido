import {
  getRecommendation,
  scoreByTopic,
  testQuestions,
  topicoParaModulo,
  topicosParaReforcar,
  type OptionKey,
  type TestRecommendation,
} from "@/data/teste-nivel";
import { getProgress, saveProgress } from "@/lib/progress";

export type TesteNivelResult = {
  scorePercent: number;
  correctCount: number;
  total: number;
  completedAt: string;
  recommendation: TestRecommendation;
  skillScores: ReturnType<typeof scoreByTopic>;
  prioritySkill?: {
    label: string;
    reason: string;
    href: string;
    moduleHref: string;
  };
};

export function calculateScore(answers: Record<string, OptionKey>): TesteNivelResult {
  let correct = 0;
  for (const q of testQuestions) {
    if (answers[q.id] === q.correct) correct += 1;
  }
  const total = testQuestions.length;
  const scorePercent = Math.round((correct / total) * 100);
  const recommendation = getRecommendation(scorePercent);
  const skillScores = scoreByTopic(answers);
  const weakest = topicosParaReforcar(answers)[0];

  return {
    scorePercent,
    correctCount: correct,
    total,
    completedAt: new Date().toISOString(),
    recommendation,
    skillScores,
    prioritySkill: weakest
      ? {
          label: weakest.label,
          reason: `${weakest.correct} de ${weakest.total} acertos: esta é a habilidade que mais destrava seu próximo passo.`,
          href: topicoParaModulo[weakest.topic].firstLessonHref,
          moduleHref: weakest.modulo.href,
        }
      : undefined,
  };
}

export function saveTestResult(result: TesteNivelResult) {
  saveProgress({
    testeNivel: {
      scorePercent: result.scorePercent,
      levelLabel: result.recommendation.levelLabel,
      band: result.recommendation.band,
      completedAt: result.completedAt,
      skillScores: result.skillScores,
    },
  });
}

export function getLastTestResult(): TesteNivelResult | null {
  const p = getProgress();
  if (!p.testeNivel) return null;
  const recommendation = getRecommendation(p.testeNivel.scorePercent);
  return {
    scorePercent: p.testeNivel.scorePercent,
    correctCount: Math.round(
      (p.testeNivel.scorePercent / 100) * testQuestions.length,
    ),
    total: testQuestions.length,
    completedAt: p.testeNivel.completedAt,
    recommendation,
    skillScores: p.testeNivel.skillScores ?? ({} as ReturnType<typeof scoreByTopic>),
  };
}
