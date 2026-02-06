import { useState, useEffect } from "react"
import type { Invoice, PaymentMethod } from "../types/invoicing.types"
import { useRecordPayment } from "../hooks/useInvoices"
import { PAYMENT_METHODS } from "../constants/invoicingConfig"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"

interface PaymentModalProps {
  invoice: Invoice
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({
  invoice,
  isOpen,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [amount, setAmount] = useState(invoice.remainingBalance)
  const [method, setMethod] = useState<PaymentMethod>("card")
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [reference, setReference] = useState("")
  const [notes, setNotes] = useState("")

  const recordPayment = useRecordPayment()

  useEffect(() => {
    if (isOpen) {
      setAmount(invoice.remainingBalance)
      setDate(format(new Date(), "yyyy-MM-dd"))
      setReference("")
      setNotes("")
    }
  }, [isOpen, invoice.remainingBalance])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount <= 0) return
    recordPayment.mutate(
      {
        invoiceId: invoice.id,
        amount,
        method,
        date,
        reference: reference || undefined,
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          onSuccess()
          onClose()
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enregistrer un paiement</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Facture {invoice.invoiceNumber} — Reste à payer :{" "}
          {invoice.remainingBalance.toFixed(2)} €
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payment-amount">Montant (€) *</Label>
            <Input
              id="payment-amount"
              type="number"
              min={0.01}
              step={0.01}
              value={amount}
              onChange={(e) =>
                setAmount(Math.max(0, parseFloat(e.target.value) || 0))
              }
              required
            />
          </div>
          <div>
            <Label>Mode de paiement *</Label>
            <Select
              value={method}
              onValueChange={(v) => setMethod(v as PaymentMethod)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(PAYMENT_METHODS) as [PaymentMethod, { label: string }][]).map(
                  ([value, { label }]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="payment-date">Date *</Label>
            <Input
              id="payment-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="payment-ref">Référence (chèque, virement)</Label>
            <Input
              id="payment-ref"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="N° chèque ou référence"
            />
          </div>
          <div>
            <Label htmlFor="payment-notes">Notes</Label>
            <Textarea
              id="payment-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={recordPayment.isPending}>
              {recordPayment.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
