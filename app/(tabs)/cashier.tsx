import CashierScreen from "@/components/CashierScreen";
import React from "react";
import { View } from "react-native";
import "../global.css";
const Cashier = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <CashierScreen />
    </View>
  );
};

export default Cashier;
