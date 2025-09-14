import { CartItem, Product as ProductType } from "@/components/data";
import EditProductModalContent from "@/components/EditProductModalContent";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import {
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

  // useEffect(() => {
  //   try {
  //     const storedProducts = productStorage.getString("products");
  //     if (storedProducts) {
  //       setProducts(JSON.parse(storedProducts));
  //     }
  //   } catch (e) {
  //     console.log("Failed to load product from Storage ", e);
  //   }
  // }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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

  const handleSave = (newProductData: Omit<ProductType, "id">) => {
    console.log("Handle Save");
    // const newProduct: ProductType = {
    //   id: Date.now().toString(),
    //   ...newProductData,
    // };

    // const updateProducts = [...products, newProduct];
    // setProducts(updateProducts);

    // productStorage.set("products", JSON.stringify(updateProducts));
    closeModal();
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary items-center">
      <TouchableOpacity
        className="flex-row m-4 items-center gap-1 w-[90%] mt-10"
        onPress={openModal}
      >
        <IconSymbol size={20} name="plus.circle.fill" color={"#080705"} />
        <Text>Add Item</Text>
      </TouchableOpacity>
      <View className="flex-row bg-utility items-center justify-between p-2 w-[90%]">
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: "https://media.istockphoto.com/id/186826982/id/foto/sepiring-nasi-goreng-udang-di-atas-placemat-dan-meja-kayu.webp?a=1&b=1&s=612x612&w=0&k=20&c=WZ4trzDcVMmXPx_Kp_pqaz0kH4ULYP87U00Do5OAJZc=",
          }}
        />
        <View className="justify-between m-2">
          <Text className="text-primary font-bold">Nasi Goreng</Text>
          <Text className="text-title font-bold">Rp. 12.000, 00</Text>
          <Text className="text-title">Nasi Goreng Telur</Text>
        </View>
        <TouchableOpacity
          className = "flex-row"
          onPress   = {() => console.log("Edit")}
        >
          <Text>Edit</Text>
          <IconSymbol size={20} name="arrow.2.circlepath" color={"#080705"} />
        </TouchableOpacity>
      </View>
      <TransactionDetailModal
        isVisible={isModalVisible}
        cart={cart}
        onClose={closeModal}
        onRemoveItem={handleRemoveItem}
        flexible={true}
      >
        <View className="w-full">
          {/* <Text className="text-title">Add Product</Text> */}
          <EditProductModalContent
            onClose={closeModal}
            onSave={() => console.log("Save")}
          />
        </View>
      </TransactionDetailModal>
    </SafeAreaView>
  );
};

export default Product;
