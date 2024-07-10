import React from "react";
import { StyleSheet, View } from "react-native";

import CategoryFilter from "@/components/category-filter";

const Page = () => {
  return (
    <View style={styles.container}>
      <CategoryFilter />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
