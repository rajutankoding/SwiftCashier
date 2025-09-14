import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Product } from "./data";
import { IconSymbol } from "./ui/IconSymbol";

interface EditProductModalContentProps {
  onClose: () => void;
  onSave: (product: Omit<Product, "id"> | Product) => void;
  onDelete?: (product: Product) => void; // ⬅️ Delete hanya untuk produk yang ada
  product?: Product | null;
}

const EditProductModalContent: React.FC<EditProductModalContentProps> = ({
  onClose,
  onSave,
  onDelete,
  product,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");

  // kalau ada product (edit mode), isi state dari data produk
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImage(product.image);
      setCategory(product.category);
    } else {
      setName("");
      setPrice("");
      setImage(null);
      setCategory("");
    }
  }, [product]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSavePress = () => {
    if (product) {
      onSave({
        ...product,
        name,
        price: parseFloat(price),
        image: image ?? "",
        category: category as Product["category"],
      });
    } else {
      onSave({
        name,
        price: parseFloat(price),
        image: image ?? "",
        category: category as Product["category"],
      });
    }
  };

  const handleDeletePress = () => {
    if (product && onDelete) {
      onDelete(product);
    }
  };

  return (
    <View className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold text-gray-800">
          {product ? "Edit Item" : "Add Item"}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <IconSymbol size={24} name="xmark.circle.fill" color="gray" />
        </TouchableOpacity>
      </View>

      {/* Gambar */}
      <TouchableOpacity
        onPress={pickImage}
        className="mb-6 bg-gray-200 rounded-lg overflow-hidden items-center justify-center"
        style={{ width: "100%", aspectRatio: 1.5 }}
      >
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" />
        ) : (
          <Text className="text-gray-500 text-lg">Image</Text>
        )}
      </TouchableOpacity>

      {/* Input */}
      <TextInput
        className="bg-gray-100 p-3 rounded-md border border-gray-300 mb-4"
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-gray-100 p-3 rounded-md border border-gray-300 mb-4"
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <View className="flex-row justify-around mb-4">
        {(["Food", "Drink", "Snack"] as Product["category"][]).map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            className={`px-4 py-2 rounded-md ${
              category === c ? "bg-gray-400" : "bg-gray-200"
            }`}
          >
            <Text className="font-bold">{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Save */}
      <TouchableOpacity
        onPress={handleSavePress}
        className="flex-row items-center justify-center p-4 bg-primary rounded-full"
      >
        <Text className="text-lg font-bold text-white mr-2">Save</Text>
        <IconSymbol size={20} name="arrow.right" color="white" />
      </TouchableOpacity>

      {/* Tombol Delete (hanya kalau edit) */}
      {product && (
        <TouchableOpacity
          onPress={handleDeletePress}
          className="flex-row items-center justify-center mt-3 p-4 bg-red-500 rounded-full"
        >
          <Text className="text-lg font-bold text-white mr-2">Delete</Text>
          <IconSymbol size={20} name="trash.fill" color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EditProductModalContent;
