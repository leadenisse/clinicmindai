import { useQuery } from "@tanstack/react-query"
import { dentalActsApi } from "../api/dentalActs.api"

export const dentalActKeys = {
  all: ["dentalActs"] as const,
  list: () => [...dentalActKeys.all, "list"] as const,
  search: (query: string) => [...dentalActKeys.all, "search", query] as const,
}

export const useDentalActs = () => {
  return useQuery({
    queryKey: dentalActKeys.list(),
    queryFn: () => dentalActsApi.getAll(),
  })
}

export const useDentalActsSearch = (query: string) => {
  return useQuery({
    queryKey: dentalActKeys.search(query),
    queryFn: () => dentalActsApi.search(query),
    enabled: query.length >= 2,
  })
}
