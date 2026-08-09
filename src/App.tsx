import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/auth/AuthRoutes';
import { AppShell } from '@/components/layout/AppShell';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { HomePage } from '@/pages/HomePage';
import { IncomesPage } from '@/pages/IncomesPage';
import { LoginPage } from '@/pages/LoginPage';
import { RecurringPage } from '@/pages/RecurringPage';
import { RegisterPage } from '@/pages/RegisterPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="gastos" element={<ExpensesPage />} />
          <Route path="ingresos" element={<IncomesPage />} />
          <Route path="plantillas" element={<RecurringPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
