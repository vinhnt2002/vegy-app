
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "@/constants/Colors";
import CategoryButtons from "./button-fillter";
import { getAllFarm } from "@/lib/actions/farm";
import useAppwrite from "@/lib/use-appwrite";
import { ListingType } from "@/types/listingType";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import StarRating from "./loader/star-rating";

const { width } = Dimensions.get("window");

const CategoryFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: farms, refetch } = useAppwrite(getAllFarm);
  const [category, setCategory] = useState("Tất cả");
  const [filteredFarms, setFilteredFarms] = useState<ListingType[]>([]);

  useEffect(() => {
    if (farms) {
      filterFarms();
    }
  }, [category, searchTerm, farms]);

  const filterFarms = () => {
    if (!farms) return;

    let tempFarms = farms as ListingType[];

    // Filter by category
    if (category !== "Tất cả") {
      tempFarms = tempFarms.filter((farm) => {
        const farmLocation = farm.location.split(',')[0].trim().toLowerCase();
        return farmLocation === category.toLowerCase();
      });
    }

    // Filter by search term
    if (searchTerm) {
      tempFarms = tempFarms.filter((farm) =>
        farm.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFarms(tempFarms);
  };

  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setCategory(category);
  };

  const renderItems = ({ item }: { item: ListingType }) => {
    return (
      <>
        <Stack.Screen
          options={{
            title: "",
          }}
        />
        <Link href={`/listing/${item.$id}`} asChild>
          <TouchableOpacity>
            <View style={[styles.item, { width: (width - 60) / 2 }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text
                style={styles.itemTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <View style={styles.row}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>
              <View style={styles.row}>
                <StarRating rating={item.rating} />
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </>
    );
  };

  const renderContent = () => {
    if (filteredFarms.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found.</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={filteredFarms}
          renderItem={renderItems}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <CategoryButtons onCagtegoryChanged={onCatChanged} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      {renderContent()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  pickerContainer: {
    position: "absolute",
    marginTop: 20,
    top: 20,
    right: 20,
    zIndex: 1,
  },
  flatList: {
    marginTop: 80,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  bookmark: {
    position: "absolute",
    top: 135,
    right: 20,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  itemLocationTxt: {
    fontSize: 12,
    marginLeft: 5,
  },
  itemPriceTxt: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primaryColor,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: Colors.black,
  },
});

export default CategoryFilter;
