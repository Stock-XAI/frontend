import {
  ChartData,
  Explanation,
  News,
  Prediction,
  Stock,
} from "../types/stock";
import instance from "./instance";

export async function getStockInfo(params: StockInfoParams) {
  const res = await instance.get<StockInfoResponse>("stock-info", {
    params: params,
  });
  return res.data;
}

export async function getSearch(params: SearchParams) {
  const res = await instance.get<Stock[]>("search", {
    params: params,
  });
  return res.data;
}

export interface StockInfoParams {
  ticker: string;
  horizon?: number;
  includeNews?: boolean;
  includeXAI?: boolean;
}

export interface StockInfoResponse {
  success: boolean;
  message: string;
  data: {
    ticker: string;
    chartData: ChartData[];
    news: News[];
    prediction: Prediction;
    explanation: Explanation;
  };
}
export interface SearchParams {
  keyword?: string;
}
