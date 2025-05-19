
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Fees: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Taxas Condominiais</h1>
          <p className="text-muted-foreground">
            Gerencie as taxas do condomínio
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pendentes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "manager" ? "R$ 5.400,00" : "R$ 350,00"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "manager" 
                ? "Total de taxas pendentes de todos os moradores" 
                : "Total de taxas pendentes para sua unidade"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pagas (Este Mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "manager" ? "R$ 8.600,00" : "R$ 350,00"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "manager" 
                ? "Total de taxas pagas este mês" 
                : "Total pago este mês por sua unidade"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Taxas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Descrição</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Valor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Vencimento</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa de Condomínio - Maio/2025</td>
                    <td className="p-4 align-middle">R$ 350,00</td>
                    <td className="p-4 align-middle">10/05/2025</td>
                    <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Pago</span></td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa de Condomínio - Junho/2025</td>
                    <td className="p-4 align-middle">R$ 350,00</td>
                    <td className="p-4 align-middle">10/06/2025</td>
                    <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Pendente</span></td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa Extra - Reforma Portaria</td>
                    <td className="p-4 align-middle">R$ 150,00</td>
                    <td className="p-4 align-middle">15/06/2025</td>
                    <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Atrasado</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Fees;
