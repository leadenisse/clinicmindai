export { PatientDocumentsTab } from "./pages/PatientDocumentsTab"
export {
  DocumentList,
  DocumentCard,
  DocumentUploader,
  DocumentViewer,
  DocumentTypeSelect,
  DocumentTypeBadge,
  DocumentGroupedList,
  AIGeneratedBadge,
  AIValidationBanner,
  DocumentActions,
} from "./components"
export {
  useDocuments,
  usePatientDocuments,
  usePatientDocumentsGrouped,
  useDocument,
  useCreateDocument,
  useUploadDocument,
  useValidateDocument,
  useSignDocument,
  useDeleteDocument,
  documentKeys,
} from "./hooks/useDocuments"
export type { Document, DocumentType, DocumentFilters } from "./types/document.types"
export { DOCUMENT_TYPES, DOCUMENT_TYPE_LIST, getDocumentTypeConfig } from "./constants/documentTypes"
