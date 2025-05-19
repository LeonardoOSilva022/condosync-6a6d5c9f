
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Settings: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações e preferências
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          {user?.role === "manager" && (
            <TabsTrigger value="condo">Configurações do Condomínio</TabsTrigger>
          )}
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      defaultValue="usuario@exemplo.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone</label>
                    <input 
                      type="text" 
                      defaultValue="(11) 98765-4321"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      {user?.role === "manager" ? "Cargo" : "Apartamento"}
                    </label>
                    <input 
                      type="text" 
                      defaultValue={user?.role === "manager" ? "Síndico" : user?.unitNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                </div>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Avisos do Condomínio</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novos avisos
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Taxas e Pagamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre vencimentos e pagamentos
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reservas</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre status de reservas
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mensagens</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novas mensagens
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {user?.role === "manager" && (
          <TabsContent value="condo" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Condomínio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome do Condomínio</label>
                      <input 
                        type="text" 
                        defaultValue="Residencial Jardim das Flores"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CNPJ</label>
                      <input 
                        type="text" 
                        defaultValue="12.345.678/0001-90"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Endereço</label>
                      <input 
                        type="text" 
                        defaultValue="Rua das Margaridas, 123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cidade/UF</label>
                      <input 
                        type="text" 
                        defaultValue="São Paulo/SP"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Senha Atual</label>
                  <input 
                    type="password" 
                    placeholder="Digite sua senha atual"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="Digite sua nova senha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="Confirme sua nova senha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button>Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
