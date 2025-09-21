import SalesReport from "@/components/SalesReport";
import React from "react";
import { View } from "react-native";

const ReportScreen = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // karena getMonth() mulai dari 0

  return (
    <View className="flex-1 bg-secondary">
      <SalesReport year={year} month={month} />
    </View>
  );
};

export default ReportScreen;
