import { MenuManagement } from "@/components/data";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const handleNav = ({ item }: any) => {
  router.push(item);
};
const Management = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <FlatList
        className=" w-[90%]"
        numColumns={2}
        data={MenuManagement}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center p-1 w-[50%] h-20">
            <TouchableOpacity
              onPress={() => handleNav({ item: item.to })}
              className="bg-utility justify-center w-full h-full"
            >
              <Text className="text-center w-[90%] text-title font-bold">
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Management;
