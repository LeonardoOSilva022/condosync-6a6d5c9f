
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Reservations: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Areas disponíveis para reserva
  const availableAreas = [
    { id: "1", name: "Salão de Festas" },
    { id: "2", name: "Churrasqueira" },
    { id: "3", name: "Espaço Gourmet" },
    { id: "4", name: "Piscina" },
  ];
  
  const handleCreateReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulando criação de reserva
    toast({
      title: "Reserva criada",
      description: "Sua solicitação foi enviada e aguarda aprovação.",
    });
    setIsDialogOpen(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie as reservas dos espaços comuns
          </p>
        </div>
        {user?.role === "resident" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Reserva
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateReservation}>
                <DialogHeader>
                  <DialogTitle>Nova Reserva</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para solicitar a reserva de um espaço comum.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="area" className="text-right">
                      Espaço
                    </Label>
                    <Select required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o espaço" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Data
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">
                      Hora Início
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">
                      Hora Fim
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">
                      Motivo
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Descreva brevemente o motivo da reserva"
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Solicitar Reserva</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
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
