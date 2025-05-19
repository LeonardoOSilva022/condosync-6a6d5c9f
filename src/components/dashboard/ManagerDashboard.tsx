
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, DollarSign, Bell, Calendar, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ManagerDashboard: React.FC = () => {
  // Mock data
  const stats = {
    units: 20,
    occupiedUnits: 18,
    residents: 32,
    pendingFees: 5,
    totalFees: 12500,
    pendingReservations: 3,
    activeAnnouncements: 4,
    pendingComplaints: 2,
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unidades</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.occupiedUnits}/{stats.units}
            </div>
            <p className="text-xs text-muted-foreground">
              Unidades ocupadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Moradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.residents}</div>
            <p className="text-xs text-muted-foreground">
              Moradores cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pendentes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingFees}</div>
            <p className="text-xs text-muted-foreground">
              R$ {stats.totalFees.toFixed(2)} a receber
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando aprovação
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Avisos Recentes</CardTitle>
            <CardDescription>
              Últimos avisos enviados aos moradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Reunião de Condomínio</h3>
                    <p className="text-sm text-muted-foreground">15/05/2025, 19:00 - Salão de Festas</p>
                  </div>
                  <span className="bg-secondary/20 text-secondary text-xs py-1 px-2 rounded-full">Importante</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Manutenção do Elevador</h3>
                    <p className="text-sm text-muted-foreground">20/05/2025, 08:00 - 12:00</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Limpeza da Caixa d'Água</h3>
                    <p className="text-sm text-muted-foreground">25/05/2025</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" asChild>
                  <Link to="/announcements">Ver Todos</Link>
                </Button>
                <Button className="ml-2" asChild>
                  <Link to="/announcements/new">
                    <Bell className="mr-2 h-4 w-4" />
                    Novo Aviso
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reclamações Recentes</CardTitle>
            <CardDescription>
              Reclamações pendentes de moradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vazamento no Teto</h3>
                    <p className="text-xs text-muted-foreground">Unidade 202 - 18/05/2025</p>
                  </div>
                  <span className="bg-destructive/20 text-destructive text-xs py-1 px-2 rounded-full">Pendente</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Barulho após 22h</h3>
                    <p className="text-xs text-muted-foreground">Unidade 101 - 17/05/2025</p>
                  </div>
                  <span className="bg-destructive/20 text-destructive text-xs py-1 px-2 rounded-full">Pendente</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" asChild>
                  <Link to="/complaints">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Ver Todas
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ManagerDashboard;
