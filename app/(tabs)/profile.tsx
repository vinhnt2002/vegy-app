import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

import Colors from "@/constants/Colors";
import ProfileComponent from "@/components/profile-component";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const isLogged = true;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ProfileComponent />
      </View>
    </>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
});
