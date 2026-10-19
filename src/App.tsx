import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './pages/HomePage';
import { WorkforcePage } from './pages/WorkforcePage';
import { ServicesPage } from './pages/ServicesPage';
import { CoachPage } from './pages/CoachPage';
import { TrainingPage } from './pages/TrainingPage';
import { TrainingDetailPage } from './pages/TrainingDetailPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workforce" element={<WorkforcePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/coaches" element={<CoachPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training/:topicId" element={<TrainingDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
