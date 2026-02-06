import { searchDentalActs, DENTAL_ACTS } from "../constants/dentalActs"
import type { DentalAct } from "../types/invoicing.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const dentalActsApi = {
  async getAll(): Promise<DentalAct[]> {
    await delay(150)
    return DENTAL_ACTS
  },

  async search(query: string): Promise<DentalAct[]> {
    await delay(200)
    if (!query || query.length < 2) return []
    return searchDentalActs(query)
  },
}
