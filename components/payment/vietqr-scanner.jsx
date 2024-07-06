import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const VietQRGenerator = ({ paymentInfo }) => {
  const { bankId, accountNo, template, amount, description, accountName } =
    paymentInfo;
  // const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`;
  const qrUrl = "https://img.vietqr.io/image/ACB-14282297-compact.png";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan to Pay</Text>
      <Image style={styles.qrImage} source={{ uri: qrUrl }} />
    </View>
  );
};

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

export default VietQRGenerator;
