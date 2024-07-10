import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import ProfileComponent from "@/components/profile-component";
import { Redirect, Stack, router } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";

const ProfilePage = () => {
  const { loading: userLoading, isLogged } = useGlobalContext();
  if (!userLoading && !isLogged) return <Redirect href="/sign-in/" />;
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
