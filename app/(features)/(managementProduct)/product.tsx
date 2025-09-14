import { CartItem, Product as ProductType } from "@/components/data";
import EditProductModalContent from "@/components/EditProductModalContent";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { addProduct, deleteProduct, getProducts } from "@/db/database";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  // Ambil data dari SQLite
  const loadProducts = async () => {
    const items = await getProducts();
    setProducts(items);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleRemoveItem = (idToRemove: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === idToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSave = async (newProductData: Omit<ProductType, "id">) => {
    try {
      await addProduct(
        newProductData.name,
        newProductData.price,
        newProductData.image,
        newProductData.category
      );
      await loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    await loadProducts();
  };

  const renderProduct = ({ item }: { item: ProductType }) => (
    <View className="flex-row bg-utility items-center justify-between p-2 w-[90%] mb-2">
      <Image
        style={{ width: 80, height: 80 }}
        source={{
          uri: item.image ?? "https://via.placeholder.com/80", // fallback kalau belum ada gambar
        }}
      />
      <View className="flex-1 justify-between m-2">
        <Text className="text-primary font-bold">{item.name}</Text>
        <Text className="text-title font-bold">Rp. {item.price}</Text>
        {/* <Text className = "text-title">Stok: {item.stock}</Text> */}
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => console.log("Edit produk", item.id)}>
          <IconSymbol size={20} name="arrow.2.circlepath" color={"#080705"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <IconSymbol size={20} name="trash.fill" color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary items-center">
      <TouchableOpacity
        className="flex-row m-4 items-center gap-1 w-[90%] mt-10"
        onPress={openModal}
      >
        <IconSymbol size={20} name="plus.circle.fill" color={"#080705"} />
        <Text>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ alignItems: "center" }}
      />

      <TransactionDetailModal
        isVisible={isModalVisible}
        cart={cart}
        onClose={closeModal}
        onRemoveItem={handleRemoveItem}
        flexible={true}
      >
        <View className="w-full">
          <EditProductModalContent onClose={closeModal} onSave={handleSave} />
        </View>
      </TransactionDetailModal>
    </SafeAreaView>
  );
};

export default Product;
