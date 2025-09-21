import { getReportByDateRange } from "@/db/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface SalesReportProps {
  year: number;
  month: number;
}

const SalesReport: React.FC<SalesReportProps> = ({ year, month }) => {
  const [report, setReport] = useState<any[]>([]);
  const [total, setTotal] = useState<number>();
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(1))
  ); // default awal bulan
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const fetchReport = async () => {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    const data = await getReportByDateRange(start, end);
    const sum = data.reduce((acc, trx) => acc + trx.totalSales, 0);
    setTotal(sum);
    setReport(data);
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  // useEffect(() => {
  //   const fetchReport = async () => {
  //     const data = await getSalesReport(year, month);
  //     //   const data = await getSalesReport(year, month);
  //     const sum = data.reduce((acc, trx) => acc + trx.totalSales, 0);
  //     setTotal(sum);
  //     setReport(data);
  //   };
  //   fetchReport();
  // }, [year, month]);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row border-b border-gray-200 py-2">
      <Text className="flex-2 text-sm text-gray-800">{item.productName}</Text>
      <Text className="flex-1 text-sm text-center">{item.totalQty}</Text>
      <Text className="flex-1 text-sm text-right text-primary">
        Rp {item.totalSales.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg mt-10 font-bold mb-3">Sales Report</Text>
      {/* Tombol pilih tanggal */}
      <View className="flex-row justify-between mb-3">
        <TouchableOpacity
          className="bg-primary h-full rounded-full p-2 px-2"
          onPress={() => setShowStartPicker(true)}
        >
          <Text className="text-tersier">
            Mulai: {startDate.toLocaleDateString("id-ID")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-primary h-full rounded-full p-2 px-2"
          onPress={() => setShowEndPicker(true)}
        >
          <Text className="text-tersier">
            Akhir: {endDate.toLocaleDateString("id-ID")}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View className="flex-row border-y border-primary bg-tersier py-2">
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
      <Text className="absolute bottom-20 right-4 text-primary font-bold underline">
        Total Rp {total?.toLocaleString()}
      </Text>
      <View>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
      </View>
      <View>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SalesReport;
