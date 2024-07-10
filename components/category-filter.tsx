import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import productData from '@/data/product.json';
import Colors from '@/constants/Colors';
import CategoryButtons from './button-fillter';
import { getAllFarm } from '@/lib/actions/farm';
import useAppwrite from '@/lib/use-appwrite';
import { ListingType } from '@/types/listingType';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

const { width } = Dimensions.get('window');

type Package = {
  id: number;
  name: string;
  type: string;
  category: string;
};

const CategoryFilter = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // Set default value to 'all'
  const { data: farms, refetch } = useAppwrite(getAllFarm);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setPackages(productData);
    setFilteredPackages(productData);
  }, []);

  useEffect(() => {
    filterPackages();
  }, [searchTerm, selectedType]);

  const filterPackages = () => {
    let tempPackages = packages;
    if (searchTerm) {
      tempPackages = tempPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType && selectedType !== 'all') {
      tempPackages = tempPackages.filter(pkg => pkg.type === selectedType);
    }
    setFilteredPackages(tempPackages);
  };

  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setCategory(category);
  };

  // Render từng mục của danh sách
  const renderItems = ({ item }: { item: ListingType }) => {
    return (<>
      <Stack.Screen
        options={{
          title: "",

        }}
      />
      <Link href={`/listing/${item.$id}`} asChild>
        <TouchableOpacity>
          <View style={[styles.item, { width: (width - 60) / 2 }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* <View style={styles.bookmark}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={Colors.white}
              />
            </View> */}
            <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>

            </View>
          </View>
          
        </TouchableOpacity>
      </Link>
    </>


    );
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
        onChangeText={text => setSearchTerm(text)}
      />

      <FlatList
        data={farms}
        renderItem={renderItems}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  pickerContainer: {
    position: 'absolute',
    marginTop: 20,
    top: 20,
    right: 20,
    zIndex: 1,
  },
  flatList: {
    marginTop: 80, // Adjust marginTop to accommodate Picker's height
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 10,
  },
  image: {
    width: '100%',
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
});

export default CategoryFilter;
