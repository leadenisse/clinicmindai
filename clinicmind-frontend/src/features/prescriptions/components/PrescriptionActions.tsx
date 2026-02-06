import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Printer, Mail, CheckCircle } from "lucide-react"
import type { Prescription } from "../types/prescription.types"
import { useValidatePrescription, useSendPrescription } from "../hooks/usePrescriptionMutations"

interface PrescriptionActionsProps {
  prescription: Prescription
  onView: (p: Prescription) => void
}

export function PrescriptionActions({ prescription, onView }: PrescriptionActionsProps) {
  const [open, setOpen] = useState(false)
  const validatePrescription = useValidatePrescription()
  const sendPrescription = useSendPrescription()

  const handlePrint = () => {
    onView(prescription)
    setOpen(false)
  }

  const handleSend = () => {
    sendPrescription.mutate({ id: prescription.id, method: "email" })
    setOpen(false)
  }

  const handleValidate = () => {
    validatePrescription.mutate(prescription.id)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSend}>
          <Mail className="mr-2 h-4 w-4" />
          Envoyer par email
        </DropdownMenuItem>
        {prescription.requiresValidation && !prescription.isValidated && (
          <DropdownMenuItem
            onClick={handleValidate}
            disabled={validatePrescription.isPending}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Valider
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
