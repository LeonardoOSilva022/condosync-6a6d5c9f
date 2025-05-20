
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Complaint } from "@/types";

// Esquema de validação para o formulário de reclamação
const complaintSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
});

const Complaints: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "1",
      title: "Infiltração na parede",
      description: "Estou com uma infiltração na parede da sala que está piorando nos últimos dias. Parece vir do apartamento de cima. Solicito verificação urgente.",
      unitNumber: "203",
      residentId: "res1",
      residentName: "Carlos Silva",
      createdAt: "10/05/2025",
      status: "pending"
    },
    {
      id: "2",
      title: "Barulho excessivo",
      description: "Venho registrar reclamação sobre barulho excessivo do apartamento vizinho após as 22h, principalmente nos finais de semana. Isto tem prejudicado meu descanso.",
      unitNumber: "101",
      residentId: "res2",
      residentName: "Ana Pereira",
      createdAt: "12/05/2025",
      status: "pending"
    },
    {
      id: "3",
      title: "Lâmpada queimada na garagem",
      description: "A lâmpada da vaga 10 na garagem está queimada há uma semana, tornando difícil estacionar à noite.",
      unitNumber: "304",
      residentId: "res3",
      residentName: "Pedro Souza",
      createdAt: "01/05/2025",
      status: "resolved",
      response: "A lâmpada foi substituída pelo zelador no dia 05/05/2025.",
      responseDate: "05/05/2025"
    }
  ]);
  
  // Estados para controle dos modais
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [isViewComplaintOpen, setIsViewComplaintOpen] = useState(false);
  const [isRespondComplaintOpen, setIsRespondComplaintOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [responseText, setResponseText] = useState("");
  
  // Configuração do formulário
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Manipuladores de eventos
  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsViewComplaintOpen(true);
  };

  const handleRespondComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsRespondComplaintOpen(true);
  };

  const handleMarkAsResolved = (complaint: Complaint) => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaint.id) {
        return {
          ...c,
          status: "resolved" as "pending" | "in-progress" | "resolved",
          response: responseText || "Reclamação resolvida pelo síndico.",
          responseDate: new Date().toLocaleDateString()
        };
      }
      return c;
    });
    
    setComplaints(updatedComplaints);
    toast.success("Reclamação marcada como resolvida!");
    setIsRespondComplaintOpen(false);
    setResponseText("");
  };

  const onSubmitComplaint = (values: z.infer<typeof complaintSchema>) => {
    const newComplaint: Complaint = {
      id: `${complaints.length + 1}`,
      title: values.title,
      description: values.description,
      unitNumber: user?.unitNumber || "N/A",
      residentId: user?.id || "unknown",
      residentName: user?.name || "Morador",
      createdAt: new Date().toLocaleDateString(),
      status: "pending"
    };
    
    setComplaints([...complaints, newComplaint]);
    toast.success("Reclamação registrada com sucesso!");
    setIsNewComplaintOpen(false);
    form.reset();
  };
  
  // Filtros de reclamações
  const openComplaints = complaints.filter(c => c.status !== "resolved");
  const solvedComplaints = complaints.filter(c => c.status === "resolved");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reclamações e Sugestões</h1>
          <p className="text-muted-foreground">
            Gerencie as reclamações e sugestões do condomínio
          </p>
        </div>
        {user?.role === "resident" && (
          <Button onClick={() => setIsNewComplaintOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Nova Reclamação
          </Button>
        )}
      </div>

      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Em Aberto</TabsTrigger>
          <TabsTrigger value="solved">Resolvidas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="open" className="mt-4 space-y-4">
          {openComplaints.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                Não há reclamações em aberto no momento.
              </CardContent>
            </Card>
          ) : (
            openComplaints.map(complaint => (
              <Card key={complaint.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {user?.role === "manager" 
                        ? `${complaint.title} - Apto ${complaint.unitNumber}`
                        : complaint.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Registrado em: {complaint.createdAt}</p>
                  </div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {complaint.description.length > 150 
                      ? `${complaint.description.substring(0, 150)}...` 
                      : complaint.description}
                  </p>
                  <div className="flex space-x-2">
                    {user?.role === "manager" ? (
                      <>
                        <Button size="sm" onClick={() => handleRespondComplaint(complaint)}>Responder</Button>
                        <Button variant="outline" size="sm" onClick={() => handleViewComplaint(complaint)}>Ver Detalhes</Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleViewComplaint(complaint)}>Ver Detalhes</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="solved" className="mt-4 space-y-4">
          {solvedComplaints.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                Não há reclamações resolvidas no momento.
              </CardContent>
            </Card>
          ) : (
            solvedComplaints.map(complaint => (
              <Card key={complaint.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {user?.role === "manager" 
                        ? `${complaint.title} - Apto ${complaint.unitNumber}`
                        : complaint.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Resolvido em: {complaint.responseDate}</p>
                  </div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {complaint.description.length > 150 
                      ? `${complaint.description.substring(0, 150)}...` 
                      : complaint.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Resolução:</strong> {complaint.response}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => handleViewComplaint(complaint)}>Ver Detalhes</Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

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

      {/* Modal para visualizar detalhes da reclamação */}
      <Dialog open={isViewComplaintOpen} onOpenChange={setIsViewComplaintOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Reclamação</DialogTitle>
          </DialogHeader>
          
          {selectedComplaint && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedComplaint.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.role === "manager" && `Unidade: ${selectedComplaint.unitNumber} • `}
                  Registrado em: {selectedComplaint.createdAt}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Descrição</h4>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedComplaint.description}</p>
              </div>
              
              {selectedComplaint.status === "resolved" && (
                <div>
                  <h4 className="font-medium text-sm mb-1">Resolução</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">
                    {selectedComplaint.response}
                    <span className="block mt-2 text-muted-foreground">
                      Resolvido em: {selectedComplaint.responseDate}
                    </span>
                  </p>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                {user?.role === "manager" && selectedComplaint.status !== "resolved" && (
                  <Button onClick={() => handleRespondComplaint(selectedComplaint)} className="mr-2">
                    Responder
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewComplaintOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para responder a uma reclamação */}
      <Dialog open={isRespondComplaintOpen} onOpenChange={setIsRespondComplaintOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Responder Reclamação</DialogTitle>
            <DialogDescription>
              Forneça uma resposta ou solução para esta reclamação.
            </DialogDescription>
          </DialogHeader>
          
          {selectedComplaint && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Reclamação</h4>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedComplaint.description}</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="response" className="text-sm font-medium">
                  Resposta
                </label>
                <Textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Digite sua resposta ou solução..."
                  className="min-h-[120px]"
                />
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRespondComplaintOpen(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button onClick={() => handleMarkAsResolved(selectedComplaint)}>
                  Marcar como Resolvido
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Complaints;
