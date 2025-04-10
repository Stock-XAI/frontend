import { useQuery } from "@tanstack/react-query";
import {
  getSearch,
  getStockInfo,
  SearchParams,
  StockInfoParams,
} from "../api/apis";

export const stockKeys = {
  all: ["stock"] as const,
  search: (query: string) => [...stockKeys.all, "search", query] as const,
  stockInfo: (queries: StockInfoParams) =>
    [...stockKeys.all, "stockInfo", queries] as const,
};

export function useStockSearch(params: SearchParams, disabled: boolean) {
  return useQuery({
    queryKey: stockKeys.search(params.keyword || "all"),
    queryFn: () => getSearch(params),
    enabled: !disabled, //요청 보낼지 여부
    staleTime: 1000 * 60 * 60 * 24, //하루동안 캐시 유지
  });
}

export function useStockInfo(params: StockInfoParams) {
  return useQuery({
    queryKey: stockKeys.stockInfo(params),
    queryFn: () => getStockInfo(params),
    enabled: true, //요청 보낼지 여부, 추후 변수로 관리 가능
    staleTime: 1000 * 60 * 60 * 1, //한 시간동안 캐시 유지
  });
}
