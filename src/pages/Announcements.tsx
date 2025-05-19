
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Announcements: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Avisos</h1>
          <p className="text-muted-foreground">
            Fique por dentro dos comunicados do condomínio
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Limpeza da Caixa D'água</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Publicado em: 15/05/2025
            </p>
            <p>
              Informamos que será realizada a limpeza da caixa d'água do condomínio no próximo sábado, 
              dia 24/05/2025, entre 8h e 15h. Durante esse período, o fornecimento de água será interrompido. 
              Solicitamos que todos os moradores providenciem reserva de água para suas necessidades durante 
              esse intervalo.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Manutenção do Portão da Garagem</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Publicado em: 10/05/2025
            </p>
            <p>
              Informamos que na próxima segunda-feira, dia 19/05/2025, será realizada a manutenção do portão 
              da garagem. O serviço está previsto para ocorrer entre 13h e 17h. Durante esse período, o acesso 
              de veículos estará temporariamente indisponível. Pedimos que os moradores que precisarem utilizar 
              seus veículos nesse horário, deixem-nos estacionados fora do condomínio previamente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Reunião de Condomínio</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Publicado em: 05/05/2025
            </p>
            <p>
              Convocamos todos os condôminos para reunião ordinária a ser realizada no dia 30/05/2025, 
              às 19h30, no salão de festas do condomínio. Pauta: prestação de contas do primeiro trimestre,
              discussão sobre a reforma da área da piscina e assuntos gerais. Sua presença é fundamental 
              para as tomadas de decisão.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Announcements;
