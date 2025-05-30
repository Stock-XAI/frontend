export interface ChartData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface News {
  title: string;
  summary: string;
  link: string;
  pubDate: string; // UTC (세계 표준시) 날짜-시간 표현
  provider: string;
}

export interface Prediction {
  horizon: number;
  result:
    | "Rise"
    | "Fall"
    | "Strong Rise"
    | "Strong Fall"
    | "Slight Rise"
    | "Slight Fall";
}

export interface Explanation {
  why: string;
  shapValues: number[];
  features: string[];
}

export interface Stock {
  ticker: string;
  name: string;
}

export interface StockInfo {
  ticker: string;
  chartData: ChartData[];
  news: News[];
  prediction: Prediction;
  explanation: Explanation;
}
