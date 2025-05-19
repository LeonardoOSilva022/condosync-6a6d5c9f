
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Complaints: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reclamações e Sugestões</h1>
          <p className="text-muted-foreground">
            Gerencie as reclamações e sugestões do condomínio
          </p>
        </div>
        {user?.role === "resident" && <Button>Nova Reclamação</Button>}
      </div>

      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Em Aberto</TabsTrigger>
          <TabsTrigger value="solved">Resolvidas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="open" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  {user?.role === "manager" 
                    ? "Infiltração na parede - Apto 203"
                    : "Infiltração na parede"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Registrado em: 10/05/2025</p>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Estou com uma infiltração na parede da sala que está piorando nos últimos dias. 
                Parece vir do apartamento de cima. Solicito verificação urgente.
              </p>
              <div className="flex space-x-2">
                {user?.role === "manager" ? (
                  <>
                    <Button size="sm">Responder</Button>
                    <Button variant="outline" size="sm">Marcar como Resolvido</Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  {user?.role === "manager" 
                    ? "Barulho excessivo - Apto 101"
                    : "Barulho excessivo"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Registrado em: 12/05/2025</p>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Venho registrar reclamação sobre barulho excessivo do apartamento vizinho após as 22h, 
                principalmente nos finais de semana. Isto tem prejudicado meu descanso.
              </p>
              <div className="flex space-x-2">
                {user?.role === "manager" ? (
                  <>
                    <Button size="sm">Responder</Button>
                    <Button variant="outline" size="sm">Marcar como Resolvido</Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="solved" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  {user?.role === "manager" 
                    ? "Lâmpada queimada na garagem - Apto 304"
                    : "Lâmpada queimada na garagem"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Resolvido em: 05/05/2025</p>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A lâmpada da vaga 10 na garagem está queimada há uma semana, tornando difícil 
                estacionar à noite.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Resolução:</strong> A lâmpada foi substituída pelo zelador no dia 05/05/2025.
              </p>
              <Button variant="outline" size="sm">Ver Detalhes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Complaints;
