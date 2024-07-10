import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating }) => {
  const fullStar = '★';
  const halfStar = '☆';
  const emptyStar = '☆';
  const maxStars = 5;

  const renderStars = () => {
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        stars += fullStar;
      } else if (i - rating <= 0.5) {
        stars += halfStar;
      } else {
        stars += emptyStar;
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stars}>{renderStars()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stars: {
    fontSize: 20, // Adjust the size of the stars here
    color: '#FFD700', // Color of the stars, you can change the color here
  },
});

export default StarRating;
