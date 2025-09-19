import { CartItem, Product as ProductType } from "@/components/data";
import EditProductModalContent from "@/components/EditProductModalContent";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/db/database";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Food" | "Drink" | "Snack"
  >("All");

  // Ambil data dari SQLite
  const loadProducts = async () => {
    const items = await getProducts();
    setProducts(items);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openModal = (product?: ProductType) => {
    setSelectedProduct(product ?? null);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };

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

  const handleSave = async (data: Omit<ProductType, "id"> | ProductType) => {
    // const isAuth = await authenticateUser();
    // if (!isAuth) {
    //   console.warn("Akses ditolak");
    //   return;
    // }
    try {
      if ("id" in data) {
        // update
        await updateProduct(data);
      } else {
        // tambah baru
        await addProduct(data);
      }
      await loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
    closeModal();
  };

  const handleDelete = async (product: ProductType) => {
    // const isAuth = await authenticateUser();
    // if (!isAuth) {
    //   console.warn("Akses ditolak");
    //   return;
    // }
    try {
      await deleteProduct(product.id);
      await loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    closeModal();
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProduct = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      className="flex-row  items-center justify-between px-4 w-full mb-2"
      onPress={() => openModal(item)}
    >
      <Image
        style={{ width: 80, height: 80 }}
        source={{
          uri: item.image ?? "https://via.placeholder.com/80", // fallback
        }}
      />
      <View className="flex-1 justify-between m-2">
        <Text className="text-primary font-bold">{item.name}</Text>
        <Text className="text-title font-bold">Rp. {item.price}</Text>
      </View>
      {/* <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => openModal(item)}>
          <IconSymbol size={20} name="arrow.2.circlepath" color={"#080705"} />
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary items-center">
      {/* Tambah Item */}
      {/* <TouchableOpacity
        className="flex-row m-4 items-center gap-1 w-[90%] mt-10"
        onPress={() => openModal()}
      >
        <IconSymbol size={20} name="plus.circle.fill" color={"#080705"} />
        <Text>Add Item</Text>
      </TouchableOpacity> */}

      {/* Tombol tambah produk */}
      <TouchableOpacity
        className="flex-row m-4 items-center gap-1 w-[90%] mt-10"
        onPress={() => openModal()}
      >
        <IconSymbol size={20} name="plus.circle.fill" color={"#080705"} />
        <Text>Add Item</Text>
      </TouchableOpacity>

      {/* Input pencarian */}
      <TextInput
        placeholder="Search product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="w-[90%] p-2 mb-2 border border-primary rounded-full bg-utility"
      />

      {/* Filter kategori */}
      <View className="flex-row w-full justify-around mb-4">
        {["All", "Food", "Drink", "Snack"].map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() =>
              setSelectedCategory(cat as "All" | "Food" | "Drink" | "Snack")
            }
            className={`px-3 py-1 rounded-full ${
              selectedCategory === cat ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <Text
              className={`${
                selectedCategory === cat ? "text-white" : "text-black"
              }`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List Produk */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Modal */}
      <TransactionDetailModal
        isVisible={isModalVisible}
        cart={cart}
        onClose={closeModal}
        onRemoveItem={handleRemoveItem}
        flexible={true}
      >
        <View className="w-full">
          <EditProductModalContent
            onClose={closeModal}
            onSave={handleSave}
            onDelete={handleDelete}
            product={selectedProduct}
          />
        </View>
      </TransactionDetailModal>
    </SafeAreaView>
  );
};

export default Product;
