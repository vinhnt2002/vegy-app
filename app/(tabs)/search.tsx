import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import CategoryFilter from "@/components/category-filter";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <CategoryFilter />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
