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
  predicted_date: string;
  result: number;
}

export interface Explanation {
  tokens: string[];
  token_scores: number[];
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
