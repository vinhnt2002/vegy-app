import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

const { width } = Dimensions.get("window");

const GrowthStages = [
  "Hạt giống",
  "Nảy mầm",
  "Cây con",
  "Cây trưởng thành",
  "Thu hoạch",
];

const FarmSlotDetails = ({ route }: any) => {
  // const { farmName, slots } = route.params;
  const slots = [
    {
      number: 1,
      plants: [
        {
          name: "Cà chua",
          image: require("@/assets/images/seeds/tomato.png"),
          age: 15,
        },
        {
          name: "Ớt",
          image: require("@/assets/images/seeds/pepper.png"),
          age: 10,
        },
        {
          name: "Ớt",
          image: require("@/assets/images/seeds/pepper.png"),
          age: 10,
        },
        {
          name: "Ớt",
          image: require("@/assets/images/seeds/pepper.png"),
          age: 10,
        },
      ],
    },
    {
      number: 2,
      plants: [
        {
          name: "Dưa chuột",
          image: require("@/assets/images/seeds/cucumber.png"),
          age: 20,
        },
      ],
    },
  ];
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const seeds = [
    { name: "Cà chua", image: require("@/assets/images/seeds/tomato.png") },
    { name: "Dưa chuột", image: require("@/assets/images/seeds/cucumber.png") },
    { name: "Ớt", image: require("@/assets/images/seeds/pepper.png") },
    // Thêm các loại hạt giống khác ở đây
  ];

  const renderGrowthStage = () => (
    <View style={styles.growthStageContainer}>
      {GrowthStages.map((stage, index) => (
        <View key={index} style={styles.stageItem}>
          <LinearGradient
            colors={
              index <= currentStage
                ? ["#4CAF50", "#8BC34A"]
                : ["#E0E0E0", "#BDBDBD"]
            }
            style={styles.stageCircle}
          >
            <Image
              source={
                index === 0
                  ? require("@/assets/images/icons/1372083.png")
                  : index === 1
                  ? require("@/assets/images/icons/1372083.png")
                  : index === 2
                  ? require("@/assets/images/icons/1372083.png")
                  : index === 3
                  ? require("@/assets/images/icons/1372083.png")
                  : require("@/assets/images/icons/1372083.png")
              }
              style={styles.stageIcon}
            />
          </LinearGradient>
          <Text style={styles.stageName}>{stage}</Text>
        </View>
      ))}
    </View>
  );

  const renderSlot = ({ item, index }: any) => (
    <View style={styles.slotContainer}>
      <ImageBackground
        source={require("@/assets/images/farm/farm-bg.png")}
        style={styles.slotCard}
        imageStyle={styles.slotCardImage}
      >
        <View style={styles.slotHeader}>
          <Text style={styles.slotTitle}>Mảnh đất {item.number}</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.plantsContainer}>
          {item.plants.map((plant: any, plantIndex: any) => (
            <View key={plantIndex} style={styles.plantInfoContainer}>
              <Image source={plant.image} style={styles.plantImage} />
              <View style={styles.plantDetails}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantStage}>
                  Giai đoạn: {GrowthStages[currentStage]}
                </Text>
                <Text style={styles.plantAge}>Tuổi: {plant.age} ngày</Text>
              </View>
            </View>
          ))}
        </View>

        {renderGrowthStage()}

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Ionicons name="water-outline" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Ionicons name="sunny-outline" size={30} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@/assets/images/farm/farm-bg.png")}
        style={styles.container}
      >
        <Text style={styles.title}>Trang trại của tôi</Text>

        <FlatList
          data={slots}
          renderItem={renderSlot}
          keyExtractor={(item) => item.number.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentSlotIndex(slideIndex);
          }}
        />

        <View style={styles.paginationContainer}>
          {slots.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlotIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chọn hạt giống</Text>
              <FlatList
                data={seeds}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.seedItem}
                    onPress={() => setModalVisible(false)}
                  >
                    <Image source={item.image} style={styles.seedImage} />
                    <Text style={styles.seedName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 20,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  growthStageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  stageItem: {
    alignItems: "center",
  },
  stageCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  stageName: {
    fontSize: 12,
    marginTop: 5,
    color: Colors.darkGrey,
  },

  actionText: {
    color: Colors.white,
    marginTop: 5,
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: Colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  seedItem: {
    alignItems: "center",
    margin: 10,
    width: "45%",
  },
  seedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  seedName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  closeButton: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  stageIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  slotContainer: {
    width: width,
    padding: 10,
  },
  slotCard: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  slotCardImage: {
    borderRadius: 20,
  },
  slotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  slotTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryColor,
    textShadowColor: "rgba(255, 255, 255, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoButton: {
    padding: 5,
  },
  plantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  plantInfoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  plantImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  plantDetails: {
    alignItems: "center",
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  plantStage: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  plantAge: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default FarmSlotDetails;
