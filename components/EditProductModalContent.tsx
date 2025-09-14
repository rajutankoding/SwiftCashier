import { Product } from "@/components/data";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface EditProductModalContentProps {
  onClose: () => void;
  onSave: (product: Omit<Product, "id">) => void; // biar strong typing
}

const EditProductModalContent: React.FC<EditProductModalContentProps> = ({
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<Product["category"]>("Food");

  // Pilih gambar
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

  // Simpan produk
  const handleSave = () => {
    if (!name || !price || !category) {
      alert("Lengkapi semua data produk!");
      return;
    }

    onSave({
      name,
      price: parseFloat(price),
      image: image ?? "",
      category,
    });

    // Reset form
    setName("");
    setPrice("");
    setImage(null);
    setCategory("Food");
  };

  return (
    <View className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
      {/* Header Modal */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold text-gray-800">Add Item</Text>
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
          <Text className="text-gray-500 text-lg">Choose Image</Text>
        )}
      </TouchableOpacity>

      {/* Form Input */}
      <View className="space-y-4 mb-6">
        <TextInput
          className="bg-gray-100 p-3 rounded-md border border-gray-300"
          placeholder="Item Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="bg-gray-100 p-3 rounded-md border border-gray-300"
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Category - bisa diganti Dropdown */}
        <View className="flex-row justify-around">
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
      </View>

      {/* Tombol Save */}
      <TouchableOpacity
        onPress={handleSave}
        className="flex-row items-center justify-center p-4 bg-gray-300 rounded-full"
      >
        <Text className="text-lg font-bold mr-2">Save</Text>
        <IconSymbol size={20} name="arrow.right" color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default EditProductModalContent;
