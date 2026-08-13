import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/auth/AuthRoutes';
import { AppShell } from '@/components/layout/AppShell';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { MovementsPage } from '@/pages/MovementsPage';
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
          <Route path="movimientos" element={<MovementsPage />} />
          <Route path="gastos" element={<Navigate to="/movimientos" replace />} />
          <Route path="ingresos" element={<Navigate to="/movimientos" replace />} />
          <Route path="plantillas" element={<RecurringPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
