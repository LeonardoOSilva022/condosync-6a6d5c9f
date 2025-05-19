
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const Residents: React.FC = () => {
  const { user, isManager } = useAuth();
  
  // Redirect non-manager users
  if (!isManager) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moradores</h1>
          <p className="text-muted-foreground">
            Gerencie os moradores do condomínio
          </p>
        </div>
        <Button>Adicionar Morador</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lista de Moradores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Nome</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Unidade</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Telefone</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Ana Silva</td>
                  <td className="p-4 align-middle">101</td>
                  <td className="p-4 align-middle">(11) 99123-4567</td>
                  <td className="p-4 align-middle">ana.silva@email.com</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Proprietário</span></td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">Remover</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Roberto Santos</td>
                  <td className="p-4 align-middle">102</td>
                  <td className="p-4 align-middle">(11) 98765-4321</td>
                  <td className="p-4 align-middle">roberto.santos@email.com</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Proprietário</span></td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">Remover</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Carla Mendes</td>
                  <td className="p-4 align-middle">201</td>
                  <td className="p-4 align-middle">(11) 97654-3210</td>
                  <td className="p-4 align-middle">carla.mendes@email.com</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Inquilino</span></td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">Remover</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Carlos Lima</td>
                  <td className="p-4 align-middle">203</td>
                  <td className="p-4 align-middle">(11) 91234-5678</td>
                  <td className="p-4 align-middle">carlos.lima@email.com</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Proprietário</span></td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">Remover</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">Marcos Oliveira</td>
                  <td className="p-4 align-middle">304</td>
                  <td className="p-4 align-middle">(11) 98877-6655</td>
                  <td className="p-4 align-middle">marcos.oliveira@email.com</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Proprietário</span></td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">Remover</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Residents;
