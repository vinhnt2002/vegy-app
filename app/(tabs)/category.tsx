import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Blog",
        }}
      />
      <View style={styles.container}>
        <Text>Blog here</Text>
      </View>
    </>
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
