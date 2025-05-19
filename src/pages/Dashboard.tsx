
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Calendar, AlertTriangle, Bell } from "lucide-react";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import ResidentDashboard from "@/components/dashboard/ResidentDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Olá, {user?.name}. Bem-vindo ao CondoSync!
          </p>
        </div>
      </div>

      {user?.role === "manager" ? <ManagerDashboard /> : <ResidentDashboard />}
    </div>
  );
};

export default Dashboard;
