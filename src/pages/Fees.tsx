
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Eye, FileText, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FeeReceipt from "@/components/fees/FeeReceipt";

// Dados fixos para demonstração
const mockFeeDetail = {
  id: "fee-1",
  description: "Taxa de Condomínio - Maio/2025",
  amount: 350.00,
  dueDate: "10/05/2025",
  status: "paid",
  paymentDate: "05/05/2025",
  paymentMethod: "Boleto Bancário",
  receiptUrl: "#",
  details: [
    { name: "Taxa de limpeza", value: 100.00 },
    { name: "Segurança", value: 80.00 },
    { name: "Manutenção geral", value: 120.00 },
    { name: "Reserva de contingência", value: 50.00 }
  ],
  attachments: []
};

const Fees: React.FC = () => {
  const { user } = useAuth();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleViewFee = (feeId: string) => {
    // Em uma aplicação real, buscaríamos os detalhes da taxa pelo ID
    setSelectedFee({...mockFeeDetail, attachments: []});
    setOpenDetail(true);
  };

  const handlePayFee = () => {
    toast.success("Pagamento realizado com sucesso!");
    setOpenDetail(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      
      // Simular upload
      setTimeout(() => {
        if (selectedFee) {
          const newFiles = Array.from(files);
          setUploadedFiles(prev => [...prev, ...newFiles]);
          
          // Update the selected fee with new attachments
          setSelectedFee({
            ...selectedFee,
            attachments: [
              ...(selectedFee.attachments || []),
              ...Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toLocaleDateString()
              }))
            ]
          });
          
          toast.success("Documento anexado com sucesso!");
          setIsUploading(false);
        }
      }, 1000);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "paid") {
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Pago</span>;
    } else if (status === "pending") {
      return <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Pendente</span>;
    } else {
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Atrasado</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Taxas Condominiais</h1>
          <p className="text-muted-foreground">
            Gerencie as taxas do condomínio
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pendentes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "manager" ? "R$ 5.400,00" : "R$ 350,00"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "manager" 
                ? "Total de taxas pendentes de todos os moradores" 
                : "Total de taxas pendentes para sua unidade"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxas Pagas (Este Mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "manager" ? "R$ 8.600,00" : "R$ 350,00"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === "manager" 
                ? "Total de taxas pagas este mês" 
                : "Total pago este mês por sua unidade"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Taxas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Descrição</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Valor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Vencimento</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa de Condomínio - Maio/2025</td>
                    <td className="p-4 align-middle">R$ 350,00</td>
                    <td className="p-4 align-middle">10/05/2025</td>
                    <td className="p-4 align-middle">{getStatusBadge("paid")}</td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="icon" onClick={() => handleViewFee("fee-1")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa de Condomínio - Junho/2025</td>
                    <td className="p-4 align-middle">R$ 350,00</td>
                    <td className="p-4 align-middle">10/06/2025</td>
                    <td className="p-4 align-middle">{getStatusBadge("pending")}</td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="icon" onClick={() => handleViewFee("fee-2")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">Taxa Extra - Reforma Portaria</td>
                    <td className="p-4 align-middle">R$ 150,00</td>
                    <td className="p-4 align-middle">15/06/2025</td>
                    <td className="p-4 align-middle">{getStatusBadge("overdue")}</td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="icon" onClick={() => handleViewFee("fee-3")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Detalhes da Taxa */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Taxa</DialogTitle>
            <DialogDescription>
              Informações completas sobre a taxa selecionada.
            </DialogDescription>
          </DialogHeader>
          
          {selectedFee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm">Descrição</h4>
                  <p>{selectedFee.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Valor Total</h4>
                  <p className="text-lg font-bold">R$ {selectedFee.amount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Data de Vencimento</h4>
                  <p>{selectedFee.dueDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Status</h4>
                  <p>{getStatusBadge(selectedFee.status)}</p>
                </div>
                {selectedFee.paymentDate && (
                  <>
                    <div>
                      <h4 className="font-semibold text-sm">Data do Pagamento</h4>
                      <p>{selectedFee.paymentDate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Método de Pagamento</h4>
                      <p>{selectedFee.paymentMethod}</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Composição da Taxa</h4>
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left font-medium">Item</th>
                        <th className="p-2 text-right font-medium">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFee.details.map((detail: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 text-left">{detail.name}</td>
                          <td className="p-2 text-right">R$ {detail.value.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="border-t bg-muted">
                        <td className="p-2 text-left font-bold">Total</td>
                        <td className="p-2 text-right font-bold">R$ {selectedFee.amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Anexar documentos */}
              {selectedFee.status === "paid" && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Documentos Anexados</h4>
                  
                  {selectedFee.attachments && selectedFee.attachments.length > 0 ? (
                    <div className="border rounded-md p-3 space-y-2">
                      {selectedFee.attachments.map((file: any, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{file.uploadDate}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum documento anexado.</p>
                  )}
                  
                  <div className="mt-3">
                    <Label htmlFor="document" className="text-sm">Anexar Documento</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input 
                        id="document" 
                        type="file" 
                        className="text-sm" 
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                      <Button size="sm" disabled={isUploading} onClick={() => document.getElementById('document')?.click()}>
                        <Paperclip className="h-4 w-4 mr-1" />
                        Anexar
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                {selectedFee.status === "pending" && (
                  <Button onClick={handlePayFee}>Pagar Taxa</Button>
                )}
                {selectedFee.status === "paid" && (
                  <PDFDownloadLink
                    document={<FeeReceipt fee={selectedFee} />}
                    fileName={`recibo-${selectedFee.id}.pdf`}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Recibo PDF
                  </PDFDownloadLink>
                )}
                <Button variant="outline" onClick={() => setOpenDetail(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Fees;
