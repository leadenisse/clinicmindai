import { PLANS, COMPARISON_FEATURE_IDS } from "../constants/plans"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlanBadge } from "./PlanBadge"
import { Check, X } from "lucide-react"
import type { BillingCycle } from "../types/subscription.types"
import { cn } from "@/lib/utils"

const FEATURE_LABELS: Record<string, string> = {
  patients: "Patients illimités",
  agenda: "Agenda & RDV",
  documents: "Documents",
  facturation: "Facturation",
  users: "Utilisateurs",
  stock: "Stock",
  prothesiste: "Prothésiste",
  comptabilite: "Comptabilité",
  ia_dictée: "IA Dictée",
  ia_cr: "IA Génération CR",
  ia_chat: "IA Chat patient",
  ia_radio: "IA Analyse radio",
  multi_sites: "Multi-sites",
  api: "API",
  support: "Support",
}

interface PricingTableProps {
  billingCycle: BillingCycle
  className?: string
}

function getFeatureDisplay(planId: string, featureId: string): string | boolean | null {
  const plan = PLANS.find((p) => p.id === planId)
  if (!plan) return null
  const f = plan.features.find((x) => x.id === featureId)
  if (!f) return null
  if (!f.included) return false
  return f.value ?? true
}

export function PricingTable({ billingCycle, className }: PricingTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Fonctionnalité</TableHead>
            {PLANS.filter((p) => p.id !== "groupe").map((plan) => (
              <TableHead key={plan.id} className="text-center min-w-[120px]">
                <div className="flex flex-col items-center gap-1">
                  <span>{plan.name}</span>
                  {plan.recommended && <PlanBadge />}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMPARISON_FEATURE_IDS.map((fid) => (
            <TableRow key={fid}>
              <TableCell className="font-medium">
                {FEATURE_LABELS[fid] ?? fid}
              </TableCell>
              {PLANS.filter((p) => p.id !== "groupe").map((plan) => {
                const val = getFeatureDisplay(plan.id, fid)
                return (
                  <TableCell key={plan.id} className="text-center">
                    {val === true && (
                      <Check className="inline h-5 w-5 text-green-600" />
                    )}
                    {val === false && (
                      <X className="inline h-5 w-5 text-muted-foreground" />
                    )}
                    {typeof val === "string" && (
                      <span className="text-sm">{val}</span>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Prix/mois</TableCell>
            {PLANS.filter((p) => p.id !== "groupe").map((plan) => (
              <TableCell key={plan.id} className="text-center font-semibold">
                {billingCycle === "monthly"
                  ? `${plan.priceMonthly} €`
                  : `${Math.round(plan.priceAnnual / 12)} €`}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Prix/an</TableCell>
            {PLANS.filter((p) => p.id !== "groupe").map((plan) => (
              <TableCell key={plan.id} className="text-center text-muted-foreground">
                {plan.priceAnnual} €
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
