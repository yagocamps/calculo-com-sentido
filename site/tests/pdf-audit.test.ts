import assert from "node:assert/strict";
import { test } from "node:test";
import { auditPrerequisites } from "@/data/aulas/auditoria-pdf";
import { getAulaContent } from "@/lib/aulas";
import { buildLearningEvidence, evidenceSkills, prerequisiteRecovery } from "@/lib/learning-evidence";
import type { ExerciseAttemptEvent } from "@/lib/progress";
import { exercisePath } from "@/lib/exercise-url";
import { exercicios } from "@/data/exercicios";
import sitemap from "@/app/sitemap";
import { catalogStats } from "@/lib/catalog-stats";
import { resumos } from "@/data/resumos";
import { calculo1Modulos } from "@/data/calculo-1";
import { preCalculoModulos } from "@/data/pre-calculo";

test("audit prerequisite graph resolves real lessons and has no cycles", () => {
  for (const [id, refs] of Object.entries(auditPrerequisites)) {
    const read = (id: string) => { const [t,m,s] = id.split("/"); return getAulaContent(t,m,s); };
    assert.ok(read(id), id);
    for (const [,target] of refs) assert.ok(read(target), target);
    const visit = (current: string, ancestors: string[]) => {
      assert.ok(!ancestors.includes(current), `${ancestors.join(" → ")} → ${current}`);
      for (const [,child] of auditPrerequisites[current] ?? []) visit(child,[...ancestors,current]);
    };
    visit(id,[]);
  }
});

const skill = evidenceSkills.find(s => s.id === "calculo-1/derivadas/derivada-composta")!;
const now = new Date("2026-09-12T12:00:00Z");
const event = (exerciseId: string, hours: number, outcome: "correct" | "incorrect" = "correct", method: "automatic" | "self-assessment" = "automatic"): ExerciseAttemptEvent =>
  ({ exerciseId, outcome, method, attemptedAt: new Date(now.getTime() - hours * 3600000).toISOString() });
const status = (attemptHistory: ExerciseAttemptEvent[], completedLessons = [skill.id]) => buildLearningEvidence({ completedLessons, attemptHistory },now).find(s => s.id === skill.id)!;

test("mastery requires distinct verified success plus delayed review, never manual completion", () => {
  assert.equal(status([]).state,"Estudado");
  const sameDay = skill.exerciseIds.slice(0,3).map(id => event(id,1));
  assert.equal(status(sameDay).state,"Estudado");
  const verified = skill.exerciseIds.slice(0,3).map(id => event(id,48));
  verified.push(event(skill.exerciseIds[0],1));
  assert.equal(status(verified).state,"Dominado");
  assert.equal(status(verified.map(e => ({...e,method:"self-assessment"}))).state,"Estudado");
  assert.equal(status([...verified,event(skill.exerciseIds[1],0,"incorrect")]).state,"Estudado");
  assert.equal(status([event(skill.exerciseIds[0],48),event(skill.exerciseIds[0],1)]).state,"Estudado");
  assert.equal(status([...verified.slice(0,3),event(skill.exerciseIds[0],-1)]).state,"Estudado");
});

test("errors are revisited after an interval and prerequisite recovery uses actual evidence", () => {
  assert.equal(status([event(skill.exerciseIds[0],1,"incorrect")]).dueErrors.length,0);
  assert.equal(status([event(skill.exerciseIds[0],48,"incorrect")]).dueErrors.length,1);
  const base = evidenceSkills.find(s => s.id === "pre-calculo/funcoes/composicao-funcoes")!;
  const state = { completedLessons: [], attemptHistory: [event(skill.exerciseIds[0],48,"incorrect")] };
  assert.equal(prerequisiteRecovery(state,now),null);
  state.attemptHistory.push(event(base.exerciseIds[0],48,"incorrect"));
  assert.equal(prerequisiteRecovery(state,now)?.prerequisite.id,base.id);
});

test("published exercises have unique canonical paths and sitemap entries", () => {
  const paths = exercicios.map(e => exercisePath(e.id));
  assert.equal(new Set(paths).size,exercicios.length);
  const entries = sitemap().map(e => new URL(e.url).pathname);
  for (const path of paths) assert.equal(entries.filter(p => p === path).length,1,path);
  assert.equal(catalogStats.exerciseCount,exercicios.length);
  for (const mod of [...preCalculoModulos,...calculo1Modulos]) assert.ok(resumos.some(r => r.slug === mod.slug),mod.slug);
});

test("multilayer derivative and fence maximum agree with independent calculations", () => {
  const f = (x: number) => ((2*x+1)**2+3)**4;
  const h=1e-6;
  assert.ok(Math.abs((f(h)-f(-h))/(2*h)-1024)<1e-5);
  const area = (parallel: number) => parallel*(40-parallel)/2;
  assert.equal(20+2*10,40);
  assert.equal(area(20),200);
  for (let x=0;x<=40;x+=.25) assert.ok(area(x)<=area(20));
});
