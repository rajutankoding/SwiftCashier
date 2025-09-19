//   // components/TransactionForm.tsx
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert } from "react-native";
// import { saveTransaction } from "@/db/database";

// interface TransactionFormProps {
//   productId: string;
//   price: number;
//   onSuccess: () => void;
// }

// const TransactionForm: React.FC<TransactionFormProps> = ({ productId, price, onSuccess }) => {
//   const [quantity, setQuantity] = useState("1");

//   const handleSave = async () => {
//     const qty = parseInt(quantity, 10);
//     if (isNaN(qty) || qty <= 0) {
//       Alert.alert("Error", "Quantity harus lebih dari 0");
//       return;
//     }

//     const total = qty * price;

//     try {
//       await saveTransaction(productId, qty, total);
//       Alert.alert("Sukses", "Transaksi berhasil disimpan");
//       onSuccess();
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Gagal menyimpan transaksi");
//     }
//   };

//   return (
//     <View className="p-4">
//       <Text className="text-lg font-bold mb-2">Tambah Transaksi</Text>
//       <Text>Harga: Rp {price}</Text>
//       <TextInput
//         className="border p-2 my-2"
//         keyboardType="numeric"
//         placeholder="Jumlah"
//         value={quantity}
//         onChangeText={setQuantity}
//       />
//       <Button title="Simpan" onPress={handleSave} />
//     </View>
//   );
// };

// export default TransactionForm;
