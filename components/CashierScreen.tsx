// src/CashierScreen.tsx
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArchiveBoxIcon,
  DocumentTextIcon,
  HomeIcon,
  ShoppingCartIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { ShoppingBagIcon } from "react-native-heroicons/solid";

import { Product, ProductCategory, products } from "./data";

const categories: ProductCategory[] = ["Food", "Drink", "Snack"];

const ProductCard: React.FC<{ item: Product }> = ({ item }) => (
  <View className="w-1/4 p-1">
    <View className="bg-white rounded-lg shadow-sm overflow-hidden aspect-square items-center justify-center">
      {/* Gambar produk akan diletakkan di sini */}
      <View className="w-16 h-16 bg-gray-200 rounded-lg"></View>
    </View>
  </View>
);

const CashierScreen: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(100000); // Contoh nilai total

  return (
    <View className="flex-1 bg-gray-100">
      {/* Search Header */}
      <View className="p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-200 rounded-lg px-4 py-2">
          <TextInput
            placeholder="Search Item..."
            className="flex-1 text-gray-700"
          />
          <StarIcon size={20} color="#9ca3af" />
        </View>
      </View>

      {/* Product Categories */}
      <View className="flex-1 px-2 pt-4">
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: category }) => (
            <View key={category} className="mb-4">
              <Text className="text-xl font-bold text-gray-800 mb-2">
                {category}
              </Text>
              <FlatList
                data={products.filter((p) => p.category === category)}
                keyExtractor={(item) => item.id}
                numColumns={4}
                renderItem={({ item }) => <ProductCard item={item} />}
                contentContainerStyle={{ marginHorizontal: -4 }}
              />
            </View>
          )}
        />
      </View>

      {/* Footer Total & Checkout */}
      <View className="bg-white p-4 shadow-lg border-t border-gray-200">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-gray-600 font-semibold">Total :</Text>
          <Text className="text-lg font-bold text-gray-800">
            Rp. {totalPrice.toLocaleString("id-ID")}
          </Text>
          <TouchableOpacity className="ml-auto flex-row items-center">
            <Text className="text-blue-500 font-semibold mr-1">Detail</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center bg-white border-t border-gray-200 py-2">
        <TouchableOpacity className="items-center">
          <HomeIcon size={24} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <DocumentTextIcon size={24} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center bg-blue-100 p-2 rounded-full">
          <ShoppingBagIcon size={28} color="#2563eb" />
          <Text className="text-blue-600 font-bold text-xs mt-1">CASHIER</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <ArchiveBoxIcon size={24} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <ShoppingCartIcon size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CashierScreen;
