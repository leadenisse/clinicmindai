import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, History, FileStack, Image, Receipt, Calendar, Package } from "lucide-react"
import type { ReactNode } from "react"

const TAB_ITEMS = [
  { value: "observation", label: "Observation initiale", icon: FileText },
  { value: "suivi", label: "Suivi", icon: History },
  { value: "documents", label: "Documents", icon: FileStack },
  { value: "imagerie", label: "Imagerie", icon: Image },
  { value: "devis", label: "Devis", icon: Receipt },
  { value: "protheses", label: "Prothèses", icon: Package },
  { value: "rdv", label: "RDV", icon: Calendar },
] as const

interface PatientTabsProps {
  defaultTab?: string
  observationContent: ReactNode
  suiviContent: ReactNode
  documentsContent: ReactNode
  imagerieContent: ReactNode
  devisContent: ReactNode
  prothesesContent: ReactNode
  rdvContent: ReactNode
}

export function PatientTabs({
  defaultTab = "observation",
  observationContent,
  suiviContent,
  documentsContent,
  imagerieContent,
  devisContent,
  prothesesContent,
  rdvContent,
}: PatientTabsProps) {
  const content: Record<string, ReactNode> = {
    observation: observationContent,
    suivi: suiviContent,
    documents: documentsContent,
    imagerie: imagerieContent,
    devis: devisContent,
    protheses: prothesesContent,
    rdv: rdvContent,
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex h-auto flex-wrap gap-1 bg-muted/50 p-1">
        {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
          <TabsTrigger key={value} value={value} className="gap-1.5">
            <Icon className="h-4 w-4" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_ITEMS.map(({ value }) => (
        <TabsContent key={value} value={value} className="mt-4">
          {content[value]}
        </TabsContent>
      ))}
    </Tabs>
  )
}
