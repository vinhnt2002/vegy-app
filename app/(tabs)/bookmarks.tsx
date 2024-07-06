import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import VietQRGenerator from "@/components/payment/vietqr-generator";
import VietQRScanner from "@/components/payment/vietqr-scanner";

const Page = () => {
  const qrUrl = "https://img.vietqr.io/image/ACB-14282297-compact.png?amount=100000";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan to Pay</Text>
      <Image
        style={styles.qrImage}
        source={{ uri: qrUrl }}
        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
      />
    </View>
  )
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
});