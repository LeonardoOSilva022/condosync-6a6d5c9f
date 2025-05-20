
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Calendar, AlertTriangle, Bell, Eye } from "lucide-react";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import ResidentDashboard from "@/components/dashboard/ResidentDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, isManager, isResident } = useAuth();
  const navigate = useNavigate();
  const [openFeeDetail, setOpenFeeDetail] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  // Mock fee data
  const mockFee = {
    id: "fee-1",
    description: "Taxa de Condomínio - Maio/2025",
    amount: 350.00,
    dueDate: "10/05/2025",
    status: "pending",
    details: [
      { name: "Taxa de limpeza", value: 100.00 },
      { name: "Segurança", value: 80.00 },
      { name: "Manutenção geral", value: 120.00 },
      { name: "Reserva de contingência", value: 50.00 }
    ]
  };

  const handleViewFeeDetails = () => {
    setSelectedFee(mockFee);
    setOpenFeeDetail(true);
  };

  const goToFeesPage = () => {
    navigate("/fees");
  };

  const getStatusBadge = (status: string) => {
    if (status === "paid") {
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Pago</span>;
    } else if (status === "pending") {
      return <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Pendente</span>;
    } else {
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Atrasado</span>;
    }
  };

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
          <Card className="cursor-pointer" onClick={handleViewFeeDetails}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minhas Taxas Pendentes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Valor total: R$ 560,00</p>
              <div className="mt-2 text-xs flex items-center text-blue-600">
                <Eye className="h-3 w-3 mr-1" /> Ver detalhes
              </div>
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
            <CardTitle className="text-sm font-medium">{isManager ? "Reclamações Abertas" : "Avisos"}</CardTitle>
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

      {/* Modal para detalhes da taxa */}
      <Dialog open={openFeeDetail} onOpenChange={setOpenFeeDetail}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Taxa</DialogTitle>
            <DialogDescription>
              Informações completas sobre a taxa pendente.
            </DialogDescription>
          </DialogHeader>
          
          {selectedFee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm">Descrição</h4>
                  <p>{selectedFee.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Valor Total</h4>
                  <p className="text-lg font-bold">R$ {selectedFee.amount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Data de Vencimento</h4>
                  <p>{selectedFee.dueDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Status</h4>
                  <p>{getStatusBadge(selectedFee.status)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Composição da Taxa</h4>
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left font-medium">Item</th>
                        <th className="p-2 text-right font-medium">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFee.details.map((detail: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 text-left">{detail.name}</td>
                          <td className="p-2 text-right">R$ {detail.value.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="border-t bg-muted">
                        <td className="p-2 text-left font-bold">Total</td>
                        <td className="p-2 text-right font-bold">R$ {selectedFee.amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={goToFeesPage}>
                  Ver Todas as Taxas
                </Button>
                <Button variant="outline" onClick={() => setOpenFeeDetail(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
