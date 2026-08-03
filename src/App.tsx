import { Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { HomePage } from '@/pages/HomePage';
import { IncomesPage } from '@/pages/IncomesPage';
import { RecurringPage } from '@/pages/RecurringPage';

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="gastos" element={<ExpensesPage />} />
        <Route path="ingresos" element={<IncomesPage />} />
        <Route path="plantillas" element={<RecurringPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
}
