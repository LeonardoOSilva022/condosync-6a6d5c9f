
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus, Send } from "lucide-react";
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

const Messages: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState<string | null>(null);
  
  // Mock de destinatários para o síndico
  const recipients = [
    { id: "1", name: "Ana Silva", unit: "101" },
    { id: "2", name: "Carlos Lima", unit: "203" },
    { id: "3", name: "Marcos Oliveira", unit: "304" },
  ];
  
  const handleNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso!",
    });
    setIsNewMessageOpen(false);
  };

  const handleReply = (e: React.FormEvent<HTMLFormElement>, messageId: string) => {
    e.preventDefault();
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi enviada com sucesso!",
    });
    setIsReplyOpen(null);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">
            Comunicação interna do condomínio
          </p>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleNewMessage}>
              <DialogHeader>
                <DialogTitle>Nova Mensagem</DialogTitle>
                <DialogDescription>
                  Envie uma mensagem interna para comunicação no condomínio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {user?.role === "manager" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="recipient" className="text-right">
                      Destinatário
                    </Label>
                    <Select required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o destinatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os moradores</SelectItem>
                        {recipients.map((recipient) => (
                          <SelectItem key={recipient.id} value={recipient.id}>
                            {recipient.name} (Apto {recipient.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Informe o assunto"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escreva sua mensagem"
                    className="col-span-3"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">{user?.role === "manager" ? "Ana Silva (Apto 101)" : "Síndico"}</CardTitle>
              <p className="text-sm text-muted-foreground">15/05/2025 às 14:30</p>
            </div>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {user?.role === "manager" 
                ? "Olá, gostaria de saber se a manutenção do elevador foi agendada. Obrigada!"
                : "Olá, gostaria de informar que a manutenção do elevador será realizada na próxima terça-feira, das 14h às 16h. O uso do elevador ficará indisponível durante este período."}
            </p>
            <Dialog open={isReplyOpen === "1"} onOpenChange={(open) => setIsReplyOpen(open ? "1" : null)}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Responder</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={(e) => handleReply(e, "1")}>
                  <DialogHeader>
                    <DialogTitle>Responder Mensagem</DialogTitle>
                    <DialogDescription>
                      Para: {user?.role === "manager" ? "Ana Silva (Apto 101)" : "Síndico"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="reply" className="text-right">
                        Resposta
                      </Label>
                      <Textarea
                        id="reply"
                        placeholder="Escreva sua resposta"
                        className="col-span-3"
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Resposta
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">{user?.role === "manager" ? "Carlos Lima (Apto 203)" : "Síndico"}</CardTitle>
              <p className="text-sm text-muted-foreground">10/05/2025 às 09:15</p>
            </div>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {user?.role === "manager" 
                ? "Bom dia! Poderia me informar se há alguma restrição para visitantes usarem a churrasqueira no próximo final de semana?"
                : "Prezado morador, lembro que as taxas de condomínio vencem na próxima segunda-feira. Por favor, mantenha seus pagamentos em dia para evitar multas."}
            </p>
            <Dialog open={isReplyOpen === "2"} onOpenChange={(open) => setIsReplyOpen(open ? "2" : null)}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Responder</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={(e) => handleReply(e, "2")}>
                  <DialogHeader>
                    <DialogTitle>Responder Mensagem</DialogTitle>
                    <DialogDescription>
                      Para: {user?.role === "manager" ? "Carlos Lima (Apto 203)" : "Síndico"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="reply" className="text-right">
                        Resposta
                      </Label>
                      <Textarea
                        id="reply"
                        placeholder="Escreva sua resposta"
                        className="col-span-3"
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Resposta
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">{user?.role === "manager" ? "Marcos Oliveira (Apto 304)" : "Síndico"}</CardTitle>
              <p className="text-sm text-muted-foreground">05/05/2025 às 17:45</p>
            </div>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {user?.role === "manager" 
                ? "Boa tarde, gostaria de solicitar a troca da lâmpada do corredor próximo ao meu apartamento que está queimada há alguns dias."
                : "Olá! Gostaria de lembrar sobre as regras de silêncio após as 22h. Temos recebido algumas reclamações de barulho excessivo."}
            </p>
            <Dialog open={isReplyOpen === "3"} onOpenChange={(open) => setIsReplyOpen(open ? "3" : null)}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Responder</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={(e) => handleReply(e, "3")}>
                  <DialogHeader>
                    <DialogTitle>Responder Mensagem</DialogTitle>
                    <DialogDescription>
                      Para: {user?.role === "manager" ? "Marcos Oliveira (Apto 304)" : "Síndico"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="reply" className="text-right">
                        Resposta
                      </Label>
                      <Textarea
                        id="reply"
                        placeholder="Escreva sua resposta"
                        className="col-span-3"
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Resposta
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
