export interface OptimizationStats {
  ramFreed: number; // in MB
  latencyReduced: number; // in ms
  lastOptimized: Date | null;
}

export interface CrosshairSettings {
  size: number;
  thickness: number;
  opacity: number;
  color: string;
  shape: 'cross' | 'dot' | 'circle';
}

export interface NetworkConfig {
  region: string;
  isOptimized: boolean;
  currentPing: number;
}

export interface SensitivityProfile {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  dpi: number;
}

export enum GameIssue {
  OVERSHOOT = "Mira passando da cabeça",
  CHEST_LOCK = "Mira grudando no peito",
  SHAKY = "Mira tremendo muito",
  SLOW = "Movimentação lenta"
}