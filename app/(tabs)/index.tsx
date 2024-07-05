import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import CategoryButtons from "@/components/category-button";
import Listings from "@/components/listing";
import GroupListings from "@/components/group-listing";
import { useGlobalContext } from "@/context/global-provider";
import useAppwrite from "@/lib/use-appwrite";
import { getAllFarm } from "@/lib/actions/farm";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState("All");

  const { user, isLogged, loading } = useGlobalContext();
  console.log("login: ", isLogged);
  const { data: farms, refetch } = useAppwrite(getAllFarm);

  const onCatChanged = (category: string) => {
    console.log("Categpry: ", category);
    setCategory(category);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1719312744806-22be94e86195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headingTxt}>Chào mừng đến với Vegy</Text>

          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search"
                size={18}
                style={{ marginRight: 5 }}
                color={Colors.black}
              />
              <TextInput placeholder="Tìm kiếm..." />
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-in")}
              style={styles.filterBtn}
            >
              <Ionicons name="options" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <CategoryButtons onCagtegoryChanged={onCatChanged} />

          <Listings listings={farms} category={category} />

          <GroupListings listings={farms} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
});
