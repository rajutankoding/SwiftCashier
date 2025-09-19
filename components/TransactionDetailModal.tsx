import React from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MinusCircleIcon } from "react-native-heroicons/outline";
import { CartItem } from "./data";
import { IconSymbol } from "./ui/IconSymbol";

interface TransactionDetailModalProps {
  isVisible: boolean;
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  checkOut?: () => void;
  flexible?: boolean;
  children?: React.ReactElement;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isVisible,
  cart,
  onClose,
  onRemoveItem,
  checkOut,
  flexible,
  children,
}) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row items-center justify-between p-2 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-2">
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-md mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-600">
          Rp {item.price.toLocaleString("id-ID")}
        </Text>
        <Text className="text-base font-bold text-gray-700 mr-4">
          x {item.quantity}
        </Text>
      </View>
      {/* Tombol Hapus Item */}
      <TouchableOpacity onPress={() => onRemoveItem(item.id)} className="p-1">
        <MinusCircleIcon size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        {flexible ? (
          children
        ) : (
          <>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Detail Transaksi</Text>

              <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id + Math.random()} // Gunakan key unik karena item bisa ganda
                style={styles.cartList}
                ListEmptyComponent={<Text>Keranjang kosong.</Text>}
              />

              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalText}>
                  Rp. {totalPrice.toLocaleString("id-ID")}
                </Text>
              </View>

              <TouchableOpacity
                className=" flex-row bg-primary rounded-full w-1/2 h-10 items-center px-4 gap-1 mt-4"
                onPress={checkOut}
              >
                <Text className="text-center font-bold">Check Out</Text>
                <IconSymbol
                  size={20}
                  name="arrow.2.circlepath"
                  color={"#080705"}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-secondary" onPress={onClose}>
              <IconSymbol size={24} name="xmark.circle.fill" color="gray" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
  },

  cartList: {
    maxHeight: 400, // Batasi tinggi daftar agar bisa digulir
    width: "100%",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    fontSize: 14,
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TransactionDetailModal;
