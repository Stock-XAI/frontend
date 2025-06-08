import { useQuery } from "@tanstack/react-query";
import {
  getExplanation,
  getPrediction,
  getSearch,
  getStockInfo,
  SearchParams,
  StockInfoParams,
} from "../api/apis";

export const stockKeys = {
  all: ["stock"] as const,
  search: (query: string) => [...stockKeys.all, "search", query] as const,
  basic: (queries: StockInfoParams) =>
    [...stockKeys.all, "basic", queries] as const,
  pred: (queries: StockInfoParams) =>
    [...stockKeys.all, "prediction", queries] as const,
  exp: (queries: StockInfoParams) =>
    [...stockKeys.all, "explanation", queries] as const,
};

export function useStockSearch(params: SearchParams, disabled: boolean) {
  return useQuery({
    queryKey: stockKeys.search(params.keyword || "all"),
    queryFn: () => getSearch(params),
    enabled: !disabled, //요청 보낼지 여부
    staleTime: 1000 * 60 * 60 * 24, //하루동안 캐시 유지
    retry: 2, //요청 실패시 재요청 횟수
  });
}

export function useStockBasic(params: StockInfoParams) {
  return useQuery({
    queryKey: stockKeys.basic(params),
    queryFn: () => getStockInfo(params),
    enabled: true, //요청 보낼지 여부, 추후 변수로 관리 가능
    staleTime: 1000 * 60 * 60 * 1, //한 시간동안 캐시 유지
    retry: 2,
  });
}

export function useStockPrediction(params: StockInfoParams) {
  return useQuery({
    queryKey: stockKeys.pred(params),
    queryFn: () => getPrediction(params),
    enabled: true, //요청 보낼지 여부, 추후 변수로 관리 가능
    staleTime: 1000 * 60 * 60 * 1, //한 시간동안 캐시 유지
    retry: 2,
  });
}

export function useStockExplanation(params: StockInfoParams) {
  return useQuery({
    queryKey: stockKeys.exp(params),
    queryFn: () => getExplanation(params),
    enabled: true, //요청 보낼지 여부, 추후 변수로 관리 가능
    staleTime: 1000 * 60 * 60 * 1, //한 시간동안 캐시 유지
    retry: 2,
  });
}
