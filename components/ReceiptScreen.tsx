import { CartItem } from "@/components/data";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface ReceiptScreenProps {
  cart?: CartItem[];
  item?: any;
  totalPrice?: number;
  transactionId?: string;
  timestamp?: string;
  onClose?: () => void;
}

const ReceiptScreen: React.FC<ReceiptScreenProps> = ({
  cart,
  totalPrice,
  transactionId,
  timestamp,
  onClose,
}) => {
  const parsedTotalPrice: number = totalPrice
    ? parseFloat(totalPrice.toString())
    : 0;

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row justify-between py-1">
      <Text className="text-sm">
        {item.name} (x{item.quantity})
      </Text>
      <Text className="text-sm">
        Rp. {(item.price * item.quantity).toLocaleString("id-ID")}
      </Text>
    </View>
  );

  return (
    // <SafeAreaView className = "flex-1 bg-white items-center">
    <View className="w-[90%] p-4 bg-white rounded-lg shadow-md mt-4">
      {/* Header Struk */}
      <View className="items-center mb-4">
        <Text className="text-lg font-bold">Swift Cashier</Text>
        <Text className="text-xs text-gray-600">Jalan Racoon No. 123</Text>
        <Text className="text-xs text-gray-600">Telp: 0812-3456-7890</Text>
      </View>

      {/* Info Transaksi */}
      <View className="mb-4 border-b border-dashed border-gray-400 pb-2">
        <Text className="text-sm">ID Transaksi: {transactionId}</Text>
        <Text className="text-sm">Tanggal: {timestamp}</Text>
      </View>

      {/* Daftar Item */}
      <View className="mb-4 border-b border-dashed border-gray-400 pb-2">
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>

      {/* Ringkasan Harga */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm">Subtotal:</Text>
          <Text className="text-sm">Rp. {totalPrice}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm">Pajak (10%):</Text>
          <Text className="text-sm">
            Rp. {(parsedTotalPrice * 0.1).toLocaleString("id-ID")}
          </Text>
        </View>
        <View className="flex-row justify-between font-bold text-lg pt-2 border-t border-dashed border-gray-400">
          <Text className="text-base font-bold">TOTAL:</Text>
          <Text className="text-base font-bold">
            Rp. {(parsedTotalPrice * 1.1).toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      {/* Footer Struk */}
      <View className="items-center">
        <Text className="text-xs text-center text-gray-600">
          Terima kasih telah berbelanja!
        </Text>
        <Text className="text-xs text-center text-gray-600">
          Semoga harimu menyenangkan.
        </Text>
      </View>
      <TouchableOpacity className="bg-secondary" onPress={onClose}>
        <IconSymbol size={24} name="xmark.circle.fill" color="gray" />
      </TouchableOpacity>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default ReceiptScreen;
