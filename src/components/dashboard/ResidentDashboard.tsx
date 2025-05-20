
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Bell, Calendar, AlertTriangle, MessageSquare, Home, Building, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Esquema de validação para o formulário de reclamação
const complaintSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
});

const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [isAreasModalOpen, setIsAreasModalOpen] = useState(false);
  
  // Mock data
  const stats = {
    pendingFees: 2,
    totalPendingAmount: 560,
    upcomingReservations: 1,
  };

  // Mock data for common areas
  const commonAreas = [
    { id: 1, name: "Salão de Festas", available: true, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Salão+de+Festas", description: "Capacidade para até 50 pessoas. Equipado com cozinha completa." },
    { id: 2, name: "Piscina", available: true, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Piscina", description: "Adulto e infantil, com área de descanso." },
    { id: 3, name: "Academia", available: true, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Academia", description: "Esteiras, bicicletas, pesos livres e aparelhos." },
    { id: 4, name: "Espaço Gourmet", available: false, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Espaço+Gourmet", description: "Churrasqueira, forno de pizza e mesa para 12 pessoas." },
  ];

  // Configuração do formulário de reclamação
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmitComplaint = (values: z.infer<typeof complaintSchema>) => {
    console.log("Reclamação enviada:", values);
    toast.success("Reclamação registrada com sucesso!");
    setIsNewComplaintOpen(false);
    form.reset();
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
                    <Link to="/fees">Ver Detalhes</Link>
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
                    <Link to="/fees">Ver Detalhes</Link>
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
                  <Link to="/reservations">
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
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => setIsNewComplaintOpen(true)}>
                <AlertTriangle className="h-5 w-5 mb-1" />
                <span>Nova Reclamação</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                <Link to="/messages">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span>Mensagens</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => setIsAreasModalOpen(true)}>
                <Building className="h-5 w-5 mb-1" />
                <span>Áreas Comuns</span>
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

      {/* Modal para criar nova reclamação */}
      <Dialog open={isNewComplaintOpen} onOpenChange={setIsNewComplaintOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Reclamação</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para registrar uma nova reclamação ou sugestão.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitComplaint)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da reclamação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva detalhadamente sua reclamação ou sugestão..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Enviar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal para áreas comuns */}
      <Dialog open={isAreasModalOpen} onOpenChange={setIsAreasModalOpen} className="sm:max-w-[800px]">
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Áreas Comuns do Condomínio</DialogTitle>
            <DialogDescription>
              Conheça as áreas comuns disponíveis para uso e reserva
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-h-[60vh] overflow-y-auto pr-2">
            {commonAreas.map((area) => (
              <div key={area.id} className="border rounded-md overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.name} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{area.name}</h3>
                    {area.available ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Disponível</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Em Manutenção</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                  <Button size="sm" variant="outline" className="w-full" disabled={!area.available} asChild>
                    <Link to="/reservations">
                      <Calendar className="h-4 w-4 mr-2" />
                      {area.available ? "Fazer Reserva" : "Indisponível"}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
            <Button variant="outline" onClick={() => setIsAreasModalOpen(false)}>
              Fechar
            </Button>
            <Button asChild>
              <Link to="/reservations">
                Ir para Reservas
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResidentDashboard;
