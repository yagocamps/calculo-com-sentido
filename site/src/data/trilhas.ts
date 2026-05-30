import type { ModuleState } from "@/components/trilhas/ModuleCard";

export type TrilhaModulo = {
  slug?: string;
  n: number;
  title: string;
  desc: string;
  state: ModuleState;
  lessons: number;
  progress: number;
  apps: string[];
  href?: string;
};

