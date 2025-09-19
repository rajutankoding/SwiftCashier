import { CartItem, Product, ProductCategory } from "@/components/data";
import ReceiptScreen from "@/components/ReceiptScreen";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { getProducts, saveTransaction } from "@/db/database";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const categories: ProductCategory[] = ["Food", "Drink", "Snack"];
  const [product, setProduct] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [receipt, setReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadProducts = async () => {
    const items = await getProducts();
    setProduct(items);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const ProductCard = ({ item }: { item: Product }) => (
    <View className="w-1/4 p-1">
      <TouchableOpacity onPress={() => handleAddProduct(item)}>
        <View className="bg-white rounded-lg shadow-sm overflow-hidden aspect-square items-center justify-center">
          <Image
            style={{ width: 80, height: 80 }}
            source={{ uri: item.image }}
          />
        </View>
        <Text className="text-primary">{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddProduct = (itemToAdd: Product) => {
    setCart((prevCart) => {
      // Cari apakah item sudah ada di keranjang
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        // Jika ada, buat array baru dengan kuantitas yang diperbarui
        return prevCart.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Jika belum ada, tambahkan item baru dengan kuantitas 1
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (idToRemove: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === idToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Filter untuk menghapus item dengan kuantitas 0
    });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const checkOut = async () => {
    // const isAuth = await authenticateUser();
    // if (!isAuth) {
    //   console.warn("Akses ditolak");
    //   return;
    // }
    setReceipt(true);
  };
  const closeReceipt = () => {
    setReceipt(false);
    setIsModalVisible(false);
    setCart([]);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // simpan transaksi ke DB
      await saveTransaction(
        cart.map((item) => ({
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
          },
          quantity: item.quantity,
        }))
      );
      setReceipt(true);
    } catch (err) {
      console.error("Gagal menyimpan transaksi:", err);
      alert("Terjadi kesalahan saat menyimpan transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="mt-10 flex-row bg-utility rounded-full w-[90%]">
        <TextInput
          className="mx-2"
          placeholder="Search Item..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
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
              data={filteredProducts.filter((p) => p.category === category)}
              keyExtractor={(item) => item.id}
              numColumns={4}
              renderItem={({ item }) => <ProductCard item={item} />}
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
        <TouchableOpacity
          onPress={openModal}
          className="flex-row h-full items-center gap-1"
        >
          <Text className="text-title font-extrabold">Detail</Text>
          <IconSymbol size={20} name="arrow.2.circlepath" color={"#080705"} />
        </TouchableOpacity>
      </View>
      <TransactionDetailModal
        isVisible={isModalVisible}
        cart={cart}
        onClose={closeModal}
        checkOut={handleCheckout}
        flexible={receipt}
        onRemoveItem={handleRemoveItem}
      >
        <ReceiptScreen
          cart={cart}
          totalPrice={totalPrice}
          transactionId={"ID Transaction"}
          timestamp={Date.now().toString()}
          onClose={closeReceipt}
        />
      </TransactionDetailModal>
    </SafeAreaView>
  );
}
