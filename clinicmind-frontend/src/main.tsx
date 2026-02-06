import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "sonner"
import "./index.css"
import { Providers } from "./app/providers"
import { AppRouter } from "./app/router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </Providers>
  </StrictMode>
)
