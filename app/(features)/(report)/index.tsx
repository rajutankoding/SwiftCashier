import MonthlyReport from "@/components/MonthlyReport";
import React from "react";

const ReportScreen = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // karena getMonth() mulai dari 0

  return (
    // <ScrollView className="flex-1 bg-gray-50 p-4">
    <MonthlyReport year={year} month={month} />
    // </ScrollView>
  );
};

export default ReportScreen;
