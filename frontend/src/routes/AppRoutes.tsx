// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginPage from '../components/auth/LoginPage';
import Dashboard from '../components/layouts/Dashboard';
import Tickets from '../components/layouts/Tickets';
import TicketDetail from '../components/layouts/TicketDetail';
import Companies from '../components/layouts/Companies';
import Contacts from '../components/layouts/Contacts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/tickets" element={<Layout><Tickets /></Layout>} />
      <Route path="/ticket/:id" element={<Layout><TicketDetail /></Layout>} />
      <Route path="/companies" element={<Layout><Companies /></Layout>} />
      <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
    </Routes>
  );
};

export default AppRoutes;
