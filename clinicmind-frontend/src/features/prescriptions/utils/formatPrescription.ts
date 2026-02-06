import { FREQUENCY_OPTIONS, DURATION_OPTIONS, MEDICATION_FORMS } from "../constants/prescription.constants"

export function getFrequencyLabel(value: string): string {
  return FREQUENCY_OPTIONS.find((o) => o.value === value)?.label ?? value
}

export function getDurationLabel(value: string): string {
  return DURATION_OPTIONS.find((o) => o.value === value)?.label ?? value
}

export function getFormLabel(value: string): string {
  return MEDICATION_FORMS.find((o) => o.value === value)?.label ?? value
}
