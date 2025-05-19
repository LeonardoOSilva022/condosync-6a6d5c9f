
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { Loader2 } from "lucide-react";

const MainLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="container py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
