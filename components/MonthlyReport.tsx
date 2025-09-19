import { getMonthlyReport } from "@/db/database";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

interface MonthlyReportProps {
  year: number;
  month: number;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ year, month }) => {
  const [report, setReport] = useState<any[]>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    const fetchReport = async () => {
      const data = await getMonthlyReport(year, month);
      //   const data = await getMonthlyReport(year, month);
      const sum = data.reduce((acc, trx) => acc + trx.totalSales, 0);
      setTotal(sum);
      setReport(data);
    };
    fetchReport();
  }, [year, month]);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row border-b border-gray-200 py-2">
      <Text className="flex-2 text-sm text-gray-800">{item.productName}</Text>
      <Text className="flex-1 text-sm text-center">{item.totalQty}</Text>
      <Text className="flex-1 text-sm text-right text-green-600">
        Rp {item.totalSales.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg mt-10 font-bold mb-3">Monthly Report</Text>

      {/* Header */}
      <View className="flex-row border-y border-gray-300 bg-gray-100 py-2">
        <Text className="flex-2 font-semibold text-gray-700">Produk</Text>
        <Text className="flex-1 font-semibold text-center text-gray-700">
          Qty
        </Text>
        <Text className="flex-1 font-semibold text-right text-gray-700">
          Total
        </Text>
      </View>

      {/* Data */}
      <FlatList
        data={report}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId}
      />
      <Text className="absolute bottom-20 right-4">
        Total Rp {total?.toLocaleString()}
      </Text>
    </View>
  );
};

export default MonthlyReport;
