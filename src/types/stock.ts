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
  sentiment: "positive" | "negative" | "neutral";
}

export interface Prediction {
  horizon: number;
  result: "Rise" | "Fall";
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
