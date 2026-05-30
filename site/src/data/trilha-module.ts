import type { ModuleState } from "@/components/trilhas/ModuleCard";

export type TrilhaAula = {
  slug: string;
  title: string;
  duration: string;
  available: boolean;
};

export type TrilhaModuloData = {
  slug: string;
  n: number;
  shortTitle: string;
  title: string;
  desc: string;
  contents: string[];
  applications: string[];
  lessons: TrilhaAula[];
  defaultState: ModuleState;
  apps: string[];
};
