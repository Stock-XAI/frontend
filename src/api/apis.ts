import { Stock, StockInfo } from "../types/stock";
import instance from "./instance";

export async function getStockInfo(params: StockInfoParams) {
  console.log("getStockInfo", params);
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
  data: StockInfo;
}
export interface SearchParams {
  keyword?: string;
}
