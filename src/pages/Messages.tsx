
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Messages: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">
            Comunicação interna do condomínio
          </p>
        </div>
        <Button>Nova Mensagem</Button>
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
            <Button variant="outline" size="sm">Responder</Button>
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
            <Button variant="outline" size="sm">Responder</Button>
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
            <Button variant="outline" size="sm">Responder</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
