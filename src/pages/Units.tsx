
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const Units: React.FC = () => {
  const { user, isManager } = useAuth();
  
  // Redirect non-manager users
  if (!isManager) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unidades</h1>
          <p className="text-muted-foreground">
            Gerencie as unidades do condomínio
          </p>
        </div>
        <Button>Adicionar Unidade</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 101</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Ana Silva</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ocupado</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">2 adultos, 1 criança</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 102</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Roberto Santos</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ocupado</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">1 adulto</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 201</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Fernanda Costa</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Alugado</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">2 adultos</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 202</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Marcos Oliveira</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ocupado</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">3 adultos</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 203</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Carlos Lima</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ocupado</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">2 adultos, 2 crianças</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Apto 301</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Proprietário</p>
                <p className="text-sm">Juliana Castro</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm"><span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Vago</span></p>
              </div>
              <div>
                <p className="text-sm font-medium">Moradores</p>
                <p className="text-sm">-</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Units;
