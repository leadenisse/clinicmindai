import { useExportInvoicesCSV } from "../hooks/useInvoices"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { InvoiceFilters } from "../types/invoicing.types"

interface ExportButtonProps {
  filters?: InvoiceFilters
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ExportButton({
  filters,
  variant = "outline",
  size = "default",
  className,
}: ExportButtonProps) {
  const exportCSV = useExportInvoicesCSV()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => exportCSV.mutate(filters)}
      disabled={exportCSV.isPending}
    >
      <Download className="h-4 w-4 shrink-0" />
      {exportCSV.isPending ? "Export..." : "Export CSV"}
    </Button>
  )
}
