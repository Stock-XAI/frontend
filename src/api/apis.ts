import { Exp, Pred, Stock, StockInfo } from "../types/stock";
import instance from "./instance";

export async function getStockInfo(params: StockInfoParams) {
  const res = await instance.get<StockInfo>("stock-info/basic", {
    params: params,
  });
  return res.data;
}

export async function getPrediction(params: StockInfoParams) {
  const res = await instance.get<Pred>("stock-info/pred", {
    params: params,
  });
  return res.data;
}

export async function getExplanation(params: StockInfoParams) {
  const res = await instance.get<Exp>("stock-info/exp", {
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

export interface SearchParams {
  keyword?: string;
}
