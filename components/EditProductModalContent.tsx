import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol"; // Gunakan komponen ikon yang sudah ada

interface EditProductModalContentProps {
  onClose: () => void;
}

const EditProductModalContent: React.FC<EditProductModalContentProps> = ({
  onClose,
}) => {
  // State untuk menyimpan data input dan URI gambar
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState("");
  const [roomDetail, setRoomDetail] = useState("");

  // Fungsi untuk memilih gambar dari galeri
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
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

      {/* Bagian Gambar */}
      <TouchableOpacity
        onPress={pickImage}
        className="mb-6 bg-gray-200 rounded-lg overflow-hidden items-center justify-center"
        style={{ width: "100%", aspectRatio: 1.5 }}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-full h-full" />
        ) : (
          <Text className="text-gray-500 text-lg">Image</Text>
        )}
      </TouchableOpacity>

      {/* Bagian Detail */}
      <Text className="text-lg font-bold mb-2">Details</Text>
      <View className="space-y-4 mb-6">
        <TextInput
          className="bg-gray-100 p-3 rounded-md border border-gray-300"
          placeholder="Item Name"
          value={roomName}
          onChangeText={setRoomName}
        />
        <TextInput
          className="bg-gray-100 p-3 rounded-md border border-gray-300"
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          className="bg-gray-100 p-3 rounded-md border border-gray-300 h-24"
          placeholder="Item Detail"
          multiline={true}
          value={roomDetail}
          onChangeText={setRoomDetail}
        />
      </View>

      {/* Tombol Check Out */}
      <TouchableOpacity
        onPress={() => console.log("Check Out")}
        className="flex-row items-center justify-center p-4 bg-gray-300 rounded-full"
      >
        <Text className="text-lg font-bold mr-2">Check Out</Text>
        <IconSymbol size={20} name="arrow.right" color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default EditProductModalContent;
