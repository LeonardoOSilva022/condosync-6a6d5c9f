
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Bell, Calendar, AlertTriangle, MessageSquare, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data
  const stats = {
    pendingFees: 2,
    totalPendingAmount: 560,
    upcomingReservations: 1,
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pendentes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingFees}</div>
            <p className="text-xs text-muted-foreground">
              R$ {stats.totalPendingAmount.toFixed(2)} a pagar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingReservations}</div>
            <p className="text-xs text-muted-foreground">
              Reservas agendadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unidade</CardTitle>
            <span className="text-lg font-bold">{user?.unitNumber}</span>
          </CardHeader>
          <CardContent>
            <div className="text-sm">Morador</div>
            <p className="text-xs text-muted-foreground">
              {user?.name}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Avisos Recentes</CardTitle>
            <CardDescription>
              Últimos avisos do condomínio
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
              <div className="mt-4 text-right">
                <Button variant="outline" asChild>
                  <Link to="/announcements">
                    <Bell className="mr-2 h-4 w-4" />
                    Ver Todos
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxas Pendentes</CardTitle>
            <CardDescription>
              Taxas condominiais a pagar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Taxa Condominial - Maio/2025</h3>
                    <p className="text-sm text-muted-foreground">Vencimento: 10/05/2025</p>
                  </div>
                  <span className="font-medium">R$ 350,00</span>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/fees/1">Ver Detalhes</Link>
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Taxa Extra - Pintura Fachada</h3>
                    <p className="text-sm text-muted-foreground">Vencimento: 15/05/2025</p>
                  </div>
                  <span className="font-medium">R$ 210,00</span>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/fees/2">Ver Detalhes</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" asChild>
                  <Link to="/fees">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Ver Todas
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Reservas</CardTitle>
            <CardDescription>
              Suas reservas de áreas comuns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Salão de Festas</h3>
                    <p className="text-sm text-muted-foreground">28/05/2025, 18:00 - 22:00</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded-full">Aguardando</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" asChild>
                  <Link to="/reservations">Ver Minhas Reservas</Link>
                </Button>
                <Button className="ml-2" asChild>
                  <Link to="/reservations/new">
                    <Calendar className="mr-2 h-4 w-4" />
                    Nova Reserva
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                <Link to="/complaints/new">
                  <AlertTriangle className="h-5 w-5 mb-1" />
                  <span>Nova Reclamação</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                <Link to="/messages">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span>Mensagens</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                <Link to="/reservations/areas">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span>Áreas Comuns</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                <Link to="/settings">
                  <Home className="h-5 w-5 mb-1" />
                  <span>Minha Unidade</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResidentDashboard;
