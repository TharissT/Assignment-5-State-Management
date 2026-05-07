import { MainLayout } from '@/layouts';
import { HomeView } from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}></Route>
    </Routes>
  );
};
