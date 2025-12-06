export enum MineType {
  AP_MINE = "AP Mine",
  AT_MINE = "AT Mine",
  UXO = "UXO"
}

export interface Mine {
  id: string;
  xPct: number; // 0-100 percentage relative to image width
  yPct: number; // 0-100 percentage relative to image height
  lat: number;
  lon: number;
  confidence: number;
  type: MineType;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'ALERT' | 'ERROR';
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  footer?: string;
  type: 'info' | 'warning' | 'error' | 'success';
}