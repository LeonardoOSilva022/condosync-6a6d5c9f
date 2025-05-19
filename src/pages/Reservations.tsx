
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Reservations: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie as reservas dos espaços comuns
          </p>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Reservas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          {user?.role === "manager" && (
            <TabsTrigger value="pending">Pendentes de Aprovação</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">Salão de Festas</CardTitle>
                <p className="text-sm text-muted-foreground">Reservado por: {user?.role === "manager" ? "Ana Silva (Apto 101)" : "Você"}</p>
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Data</p>
                  <p className="text-sm">25/05/2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Horário</p>
                  <p className="text-sm">18:00 - 23:00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Motivo</p>
                  <p className="text-sm">Aniversário</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Confirmado</span></p>
                </div>
              </div>
              {user?.role === "resident" && (
                <Button variant="outline" className="mt-4" size="sm">Cancelar Reserva</Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">Churrasqueira</CardTitle>
                <p className="text-sm text-muted-foreground">Reservado por: {user?.role === "manager" ? "Carlos Lima (Apto 203)" : "Você"}</p>
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Data</p>
                  <p className="text-sm">01/05/2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Horário</p>
                  <p className="text-sm">12:00 - 18:00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Motivo</p>
                  <p className="text-sm">Almoço em família</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm"><span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">Concluído</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {user?.role === "manager" && (
          <TabsContent value="pending" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">Salão de Festas</CardTitle>
                  <p className="text-sm text-muted-foreground">Solicitado por: Marcos Oliveira (Apto 304)</p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-sm">15/06/2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Horário</p>
                    <p className="text-sm">19:00 - 23:00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Motivo</p>
                    <p className="text-sm">Reunião familiar</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm"><span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Aguardando aprovação</span></p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm">Aprovar</Button>
                  <Button variant="outline" size="sm">Recusar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Reservations;
