
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#555555",
    borderBottomStyle: "solid",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  receiptNumber: {
    fontSize: 12,
    textAlign: "right",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 10,
    width: "70%",
  },
  table: {
    marginTop: 10,
    border: "1 solid #CCCCCC",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    borderBottomStyle: "solid",
    minHeight: 20,
    alignItems: "center",
  },
  tableHeaderCell: {
    width: "70%",
    fontWeight: "bold",
    fontSize: 10,
    padding: 5,
  },
  tableHeaderCellValue: {
    width: "30%",
    fontWeight: "bold",
    fontSize: 10,
    padding: 5,
    textAlign: "right",
  },
  tableCell: {
    width: "70%",
    fontSize: 10,
    padding: 5,
  },
  tableCellValue: {
    width: "30%",
    fontSize: 10,
    padding: 5,
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#555555",
    borderTopStyle: "solid",
    paddingTop: 10,
    fontSize: 8,
    textAlign: "center",
    color: "#555555",
  },
});

interface FeeReceiptProps {
  fee: {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    status: string;
    paymentDate?: string;
    paymentMethod?: string;
    details: Array<{
      name: string;
      value: number;
    }>;
  };
}

const FeeReceipt: React.FC<FeeReceiptProps> = ({ fee }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CondoSync</Text>
          <Text style={styles.headerSubtitle}>Recibo de Pagamento</Text>
          <Text style={styles.receiptNumber}>Recibo Nº: {fee.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Taxa</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{fee.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Valor:</Text>
            <Text style={styles.value}>R$ {fee.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data de Vencimento:</Text>
            <Text style={styles.value}>{fee.dueDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data de Pagamento:</Text>
            <Text style={styles.value}>{fee.paymentDate || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Método de Pagamento:</Text>
            <Text style={styles.value}>{fee.paymentMethod || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhamento</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Item</Text>
              <Text style={styles.tableHeaderCellValue}>Valor (R$)</Text>
            </View>
            
            {fee.details.map((detail, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{detail.name}</Text>
                <Text style={styles.tableCellValue}>
                  {detail.value.toFixed(2)}
                </Text>
              </View>
            ))}
            
            <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
              <Text style={styles.tableHeaderCell}>Total</Text>
              <Text style={styles.tableHeaderCellValue}>
                {fee.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Este documento é um recibo digital gerado automaticamente pelo sistema CondoSync.</Text>
          <Text>Emitido em: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FeeReceipt;
