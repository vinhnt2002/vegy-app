import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ItemProfile from "./items-profiles";
import { useGlobalContext } from "@/context/global-provider";
import { LinearGradient } from "expo-linear-gradient";
import useAppwrite from "@/lib/use-appwrite";
import { getFarmsWithPurchasedSlots, getslotsWithPurchased } from "@/lib/actions/payment";
import { Link, Stack } from "expo-router";
import Loader from "./loader/loader";

const FarmItem = ({ farm }: any) => (
  <Link href={`/farm/${farm.$id}`} asChild>
    <TouchableOpacity>
      <View style={styles.farmItem}>
        <Image source={{ uri: farm.image }} style={styles.farmImage} />
        <Text style={styles.farmName}>{farm.name}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);
const ProfileComponent = () => {
  const {
    data: farms,
    refetch,
    loading,
  } = useAppwrite(getFarmsWithPurchasedSlots);

  const {data:slots} = useAppwrite(getslotsWithPurchased)
  const { user,loading:userLoading } = useGlobalContext();

  const farmCount = farms.length;
  const seedsCount = 50;
  const slotCount = slots.length;

    if (loading || userLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <Loader />
      </>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <LinearGradient
          colors={[Colors.primaryColor, Colors.secondaryColor]}
          style={styles.header}
        >
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color={Colors.white} />
            <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{farmCount}</Text>
            <Text style={styles.statLabel}>Farms</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{seedsCount}</Text>
            <Text style={styles.statLabel}>Seeds</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{slotCount}</Text>
            <Text style={styles.statLabel}>Slots</Text>
          </View>
        </View>

        {/* <View style={styles.infoContainer}>
        <ItemProfile
          farmCount={farmCount}
          seedsCount={seedsCount}
          walletCount={walletCount}
          otherCount={otherCount}
          orderCount={orderCount}
          transportCount={transportCount}
        />
      </View> */}

        <View style={styles.farmListContainer}>
          <Text style={styles.farmListTitle}>Trang trại bạn đã thuê đất</Text>
          <FlatList
            data={farms}
            renderItem={({ item }: any) => <FarmItem farm={item} />}
            keyExtractor={(item: any) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: Colors.lightGrey,
    marginBottom: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    marginLeft: 5,
    color: Colors.white,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: -20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  infoContainer: {
    padding: 20,
  },
  farmListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  farmListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primaryColor,
  },
  farmItem: {
    width: 150,
    marginRight: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  farmImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  farmName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  farmDetails: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
});
