
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Calendar, AlertTriangle, Bell } from "lucide-react";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import ResidentDashboard from "@/components/dashboard/ResidentDashboard";

const Dashboard: React.FC = () => {
  const { user, isManager, isResident } = useAuth();

  // Summary cards specific to each role
  const renderRoleSpecificSummary = () => {
    if (isManager) {
      return (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unidades Ocupadas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17/20</div>
              <p className="text-xs text-muted-foreground">85% de ocupação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12%</div>
              <p className="text-xs text-muted-foreground">3 unidades com pendências</p>
            </CardContent>
          </Card>
        </>
      );
    } else {
      return (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minhas Taxas Pendentes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Valor total: R$ 560,00</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minha Unidade</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.unitNumber}</div>
              <p className="text-xs text-muted-foreground">Residente</p>
            </CardContent>
          </Card>
        </>
      );
    }
  };

  // Shared cards for both roles
  const renderSharedSummary = () => {
    return (
      <>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isManager ? "5" : "1"}</div>
            <p className="text-xs text-muted-foreground">Nos próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isManager ? "Reclamações Abertas" : "Avisos Ativos"}</CardTitle>
            {isManager ? (
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Bell className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isManager ? "3" : "4"}</div>
            <p className="text-xs text-muted-foreground">
              {isManager ? "2 novas esta semana" : "Importantes: 1"}
            </p>
          </CardContent>
        </Card>
      </>
    );
  };

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {renderRoleSpecificSummary()}
        {renderSharedSummary()}
      </div>

      {isManager ? <ManagerDashboard /> : <ResidentDashboard />}
    </div>
  );
};

export default Dashboard;
