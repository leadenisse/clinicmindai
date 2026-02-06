import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Suspense } from "react"

function PageFallback() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="text-muted-foreground">Chargement...</div>
    </div>
  )
}

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Suspense fallback={<PageFallback />}>
            <Outlet key={location.pathname} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
