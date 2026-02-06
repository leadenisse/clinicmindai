import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { lazy, Suspense } from "react"
import { AdminOnly } from "@/features/settings/components/AdminOnly"

const LoginPage = lazy(() => import("@/features/auth/components/LoginPage"))
const SignupPage = lazy(() =>
  import("@/features/auth/pages/SignupPage").then((m) => ({ default: m.SignupPage }))
)
const VerifyEmailPage = lazy(() =>
  import("@/features/auth/pages/VerifyEmailPage").then((m) => ({ default: m.VerifyEmailPage }))
)
const AcceptInvitePage = lazy(() =>
  import("@/features/auth/pages/AcceptInvitePage").then((m) => ({ default: m.AcceptInvitePage }))
)
const AppLayout = lazy(() => import("@/components/layout/AppLayout").then((m) => ({ default: m.AppLayout })))
const DashboardPage = lazy(() => import("@/app/pages/DashboardPage"))
const PatientsPage = lazy(() =>
  import("@/features/patients/pages/PatientsPage").then((m) => ({ default: m.PatientsPage }))
)
const PatientCreatePage = lazy(() =>
  import("@/features/patients/pages/PatientCreatePage").then((m) => ({ default: m.PatientCreatePage }))
)
const PatientDetailPage = lazy(() =>
  import("@/features/patients/pages/PatientDetailPage").then((m) => ({ default: m.PatientDetailPage }))
)
const CalendarPage = lazy(() =>
  import("@/features/appointments/pages/CalendarPage").then((m) => ({ default: m.CalendarPage }))
)
const InvoicesPage = lazy(() =>
  import("@/features/invoicing/pages/InvoicesPage").then((m) => ({ default: m.InvoicesPage }))
)
const InvoiceCreatePage = lazy(() =>
  import("@/features/invoicing/pages/InvoiceCreatePage").then((m) => ({ default: m.InvoiceCreatePage }))
)
const InvoiceDetailPage = lazy(() =>
  import("@/features/invoicing/pages/InvoiceDetailPage").then((m) => ({ default: m.InvoiceDetailPage }))
)
const QuotesPage = lazy(() =>
  import("@/features/invoicing/pages/QuotesPage").then((m) => ({ default: m.QuotesPage }))
)
const QuoteCreatePage = lazy(() =>
  import("@/features/invoicing/pages/QuoteCreatePage").then((m) => ({ default: m.QuoteCreatePage }))
)
const QuoteDetailPage = lazy(() =>
  import("@/features/invoicing/pages/QuoteDetailPage").then((m) => ({ default: m.QuoteDetailPage }))
)
const ProstheticsPage = lazy(() =>
  import("@/features/prosthetics/pages/ProstheticsPage").then((m) => ({ default: m.ProstheticsPage }))
)
const ProstheticOrderCreatePage = lazy(() =>
  import("@/features/prosthetics/pages/ProstheticOrderCreatePage").then((m) => ({ default: m.ProstheticOrderCreatePage }))
)
const ProstheticOrderDetailPage = lazy(() =>
  import("@/features/prosthetics/pages/ProstheticOrderDetailPage").then((m) => ({ default: m.ProstheticOrderDetailPage }))
)

const SettingsLayout = lazy(() =>
  import("@/features/settings/pages/SettingsLayout").then((m) => ({ default: m.SettingsLayout }))
)
const ProfilePage = lazy(() =>
  import("@/features/settings/pages/ProfilePage").then((m) => ({ default: m.ProfilePage }))
)
const SecurityPage = lazy(() =>
  import("@/features/settings/pages/SecurityPage").then((m) => ({ default: m.SecurityPage }))
)
const CabinetPage = lazy(() =>
  import("@/features/settings/pages/CabinetPage").then((m) => ({ default: m.CabinetPage }))
)
const UsersPage = lazy(() =>
  import("@/features/settings/pages/UsersPage").then((m) => ({ default: m.UsersPage }))
)
const UserCreatePage = lazy(() =>
  import("@/features/settings/pages/UserCreatePage").then((m) => ({ default: m.UserCreatePage }))
)
const UserEditPage = lazy(() =>
  import("@/features/settings/pages/UserEditPage").then((m) => ({ default: m.UserEditPage }))
)
const ActsPage = lazy(() =>
  import("@/features/settings/pages/ActsPage").then((m) => ({ default: m.ActsPage }))
)
const LegalPage = lazy(() =>
  import("@/features/settings/pages/LegalPage").then((m) => ({ default: m.LegalPage }))
)

const StockPage = lazy(() =>
  import("@/features/stock/pages/StockPage").then((m) => ({ default: m.StockPage }))
)
const StockAlertsPage = lazy(() =>
  import("@/features/stock/pages/StockAlertsPage").then((m) => ({ default: m.StockAlertsPage }))
)
const StockItemDetailPage = lazy(() =>
  import("@/features/stock/pages/StockItemDetailPage").then((m) => ({ default: m.StockItemDetailPage }))
)

const PricingPage = lazy(() =>
  import("@/features/subscription/pages/PricingPage").then((m) => ({ default: m.PricingPage }))
)
const BillingPage = lazy(() =>
  import("@/features/subscription/pages/BillingPage").then((m) => ({ default: m.BillingPage }))
)
const PrescriptionsPage = lazy(() =>
  import("@/features/prescriptions/pages/PrescriptionsPage").then((m) => ({ default: m.PrescriptionsPage }))
)
const NewPrescriptionPage = lazy(() =>
  import("@/features/prescriptions/pages/NewPrescriptionPage").then((m) => ({ default: m.NewPrescriptionPage }))
)
const PrescriptionDetailPage = lazy(() =>
  import("@/features/prescriptions/pages/PrescriptionDetailPage").then((m) => ({ default: m.PrescriptionDetailPage }))
)
const OnboardingPage = lazy(() =>
  import("@/features/onboarding/pages/OnboardingPage").then((m) => ({ default: m.OnboardingPage }))
)
const AccountingPage = lazy(() =>
  import("@/features/accounting/pages/AccountingPage").then((m) => ({ default: m.AccountingPage }))
)
const ExpensesPage = lazy(() =>
  import("@/features/accounting/pages/ExpensesPage").then((m) => ({ default: m.ExpensesPage }))
)

const SettingsFallback = () => <div className="p-4">Chargement...</div>

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

const AuthFallback = () => (
  <div className="flex min-h-screen items-center justify-center">Chargement...</div>
)

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<AuthFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<AuthFallback />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <Suspense fallback={<AuthFallback />}>
        <VerifyEmailPage />
      </Suspense>
    ),
  },
  {
    path: "/accept-invite/:token",
    element: (
      <Suspense fallback={<AuthFallback />}>
        <AcceptInvitePage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/onboarding",
        element: (
          <Suspense fallback={<AuthFallback />}>
            <OnboardingPage />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Chargement...</div>}>
            <AppLayout />
          </Suspense>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: "patients",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <PatientsPage /> },
              { path: "new", element: <PatientCreatePage /> },
              { path: ":id", element: <PatientDetailPage /> },
            ],
          },
          {
            path: "appointments",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <CalendarPage />
              </Suspense>
            ),
          },
          {
            path: "prescriptions",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <PrescriptionsPage /> },
              { path: "new", element: <NewPrescriptionPage /> },
              { path: ":id", element: <PrescriptionDetailPage /> },
            ],
          },
          {
            path: "invoices",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <InvoicesPage /> },
              { path: "new", element: <InvoiceCreatePage /> },
              { path: ":id", element: <InvoiceDetailPage /> },
            ],
          },
          {
            path: "quotes",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <QuotesPage /> },
              { path: "new", element: <QuoteCreatePage /> },
              { path: ":id", element: <QuoteDetailPage /> },
            ],
          },
          {
            path: "prosthetics",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <ProstheticsPage /> },
              { path: "new", element: <ProstheticOrderCreatePage /> },
              { path: ":id", element: <ProstheticOrderDetailPage /> },
            ],
          },
          {
            path: "stock",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <StockPage /> },
              { path: "alerts", element: <StockAlertsPage /> },
              { path: ":id", element: <StockItemDetailPage /> },
            ],
          },
          {
            path: "accounting",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <Outlet />
              </Suspense>
            ),
            children: [
              { index: true, element: <AccountingPage /> },
              { path: "expenses", element: <ExpensesPage /> },
            ],
          },
          {
            path: "pricing",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <PricingPage />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<div className="p-6">Chargement...</div>}>
                <SettingsLayout />
              </Suspense>
            ),
            children: [
              { index: true, element: <Navigate to="/settings/profile" replace /> },
              {
                path: "profile",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <ProfilePage />
                  </Suspense>
                ),
              },
              {
                path: "security",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <SecurityPage />
                  </Suspense>
                ),
              },
              {
                path: "cabinet",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <AdminOnly>
                      <CabinetPage />
                    </AdminOnly>
                  </Suspense>
                ),
              },
              {
                path: "users",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <Outlet />
                  </Suspense>
                ),
                children: [
                  {
                    index: true,
                    element: (
                      <AdminOnly>
                        <UsersPage />
                      </AdminOnly>
                    ),
                  },
                  {
                    path: "new",
                    element: (
                      <AdminOnly>
                        <UserCreatePage />
                      </AdminOnly>
                    ),
                  },
                  {
                    path: ":id",
                    element: (
                      <AdminOnly>
                        <UserEditPage />
                      </AdminOnly>
                    ),
                  },
                ],
              },
              {
                path: "acts",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <AdminOnly>
                      <ActsPage />
                    </AdminOnly>
                  </Suspense>
                ),
              },
              {
                path: "legal",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <AdminOnly>
                      <LegalPage />
                    </AdminOnly>
                  </Suspense>
                ),
              },
              {
                path: "billing",
                element: (
                  <Suspense fallback={<SettingsFallback />}>
                    <AdminOnly>
                      <BillingPage />
                    </AdminOnly>
                  </Suspense>
                ),
              },
            ],
          },
          { path: "help", element: <PlaceholderPage title="Aide & Support" /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
])

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted-foreground">Module en construction.</p>
    </div>
  )
}

export function AppRouter() {
  return <RouterProvider router={router} />
}
