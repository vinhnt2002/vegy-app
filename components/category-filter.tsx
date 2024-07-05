import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import productData from '@/data/product.json';
import Colors from '@/constants/Colors';


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

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          {[...new Set(packages.map(pkg => pkg.type))].map(type => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
          <Picker.Item label="Fill All Types" value="all" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FlatList
            style={styles.flatList}
            data={filteredPackages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            )}
          />

        </View>

      </ScrollView>

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
    top: 20,
    right: 20,
    zIndex: 1,
  },
  picker: {
    height: 50,
    width: 180,
    marginTop: 20,
    padding: 8,
    backgroundColor: Colors.white, // Ensure background color to avoid transparency issues
  },
  flatList: {
    marginTop: 80, // Adjust marginTop to accommodate Picker's height
  },
  item: {
    width: width - 40,
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 16,
    color: '#666',
  },
  category: {
    fontSize: 14,
    color: '#999',
  },
});

export default CategoryFilter;
