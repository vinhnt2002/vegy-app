import React from "react";
import { View, StyleSheet } from "react-native";

// @ts-ignore
import AnimatedLoader from "react-native-animated-loader";

export default function OverlayLoader() {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("@/assets/animation/loader.json")}
        animationStyle={styles.lottieAnimation}
        speed={1.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
});