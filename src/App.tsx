
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Units from "./pages/Units";
import Residents from "./pages/Residents";
import Fees from "./pages/Fees";
import Announcements from "./pages/Announcements";
import Reservations from "./pages/Reservations";
import Messages from "./pages/Messages";
import Complaints from "./pages/Complaints";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="units" element={<Units />} />
              <Route path="residents" element={<Residents />} />
              <Route path="fees" element={<Fees />} />
              <Route path="fees/:id" element={<Fees />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="reservations/new" element={<Reservations />} />
              <Route path="reservations/areas" element={<Reservations />} />
              <Route path="messages" element={<Messages />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="complaints/new" element={<Complaints />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
