import { ProductCategory, products } from "@/components/data";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mengubah ProductCard menjadi komponen terpisah
interface ProductCardProps {
  item: any; // Ganti 'any' dengan tipe data Product yang sudah Anda definisikan
  onAdd: (price: number) => void;
}

const ProductCard = ({ item, onAdd }: ProductCardProps) => (
  <View className="w-1/4 p-1">
    <TouchableOpacity onPress={() => onAdd(item.price)}>
      <View className="bg-white rounded-lg shadow-sm overflow-hidden aspect-square items-center justify-center">
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <Text className="text-primary">{item.name}</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const categories: ProductCategory[] = ["Food", "Drink", "Snack"];
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Fungsi untuk menambah total harga dengan cara yang lebih aman (callback function)
  const handleAddProduct = (price: number) => {
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="mt-10 flex-row bg-primeGrey rounded-full w-[90%]">
        <TextInput className="mx-2" placeholder="Search Item..."></TextInput>
      </View>
      <FlatList
        className="w-[90%] mt-4"
        data={categories}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: category }) => (
          <View className="mb-4" key={category}>
            <Text className="text-title font-extrabold">{category}</Text>
            <FlatList
              data={products.filter((p) => p.category === category)}
              keyExtractor={(item) => item.id}
              numColumns={4}
              renderItem={({ item }) => (
                <ProductCard item={item} onAdd={handleAddProduct} />
              )}
              contentContainerStyle={{ marginHorizontal: -4 }}
            />
          </View>
        )}
      />
      <View className="flex-row bg-primary w-full h-20 items-center justify-between px-4">
        <Text className="text-title font-extrabold">Total :</Text>
        <Text className="text-title font-extrabold">
          Rp. {totalPrice.toLocaleString("id-ID")}, 00
        </Text>
        <TouchableOpacity onPress={openModal} className="flex-row gap-1">
          <Text className="text-title font-extrabold">Detail</Text>
          <IconSymbol size={20} name="arrow.2.circlepath" color={"#080705"} />
        </TouchableOpacity>
      </View>
      <TransactionDetailModal
        isVisible={isModalVisible}
        totalPrice={totalPrice}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}
