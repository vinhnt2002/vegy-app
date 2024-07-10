import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";
import destinationCategories from "@/data/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onCagtegoryChanged: (category: string) => void;
};

const CategoryButtons = ({ onCagtegoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRefs = useRef<TouchableOpacity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);

    itemRefs.current[index]?.measureLayout(
      scrollRef.current!,
      (x, y, width, height) => {
        const screenWidth = Dimensions.get("window").width;
        const scrollToX = x - (screenWidth - width) / 2;
        scrollRef.current?.scrollTo({ x: scrollToX, y: 0, animated: true });
      }
    );

    onCagtegoryChanged(destinationCategories[index].title);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(ref) => (itemRefs.current[index] = ref!)}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex === index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={activeIndex === index ? Colors.white : Colors.black}
            />
            <Text
              style={
                activeIndex === index
                  ? styles.categoryBtnTxtActive
                  : styles.categoryBtnTxt
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});
