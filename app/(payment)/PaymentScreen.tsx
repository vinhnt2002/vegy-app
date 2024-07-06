import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RadioButton } from "react-native-paper"; // Install if you haven't: npm install react-native-paper
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import Colors from "@/constants/Colors";

const paymentMethods = [
  {
    label: "Momo",
    value: "momo",
    image: require("@/assets/images/wallets/MoMo_Logo.png"),
  },
  {
    label: "VNPay",
    value: "vnpay",
    image: require("@/assets/images/wallets/vnpay.png"),
  },
  {
    label: "ZaloPay",
    value: "zalopay",
    image: require("@/assets/images/wallets/ZaloPay.png"),
  },
  {
    label: "Thẻ Visa",
    value: "visa",
    image: require("@/assets/images/wallets/visa.png"),
  },
  { label: "Thanh toán tại nông trại", value: "cash", image: null },
];

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const router = useRouter();
  const { farmName, slot, price } = useLocalSearchParams();

  const handlePayment = () => {
    if (selectedMethod) {
      router.push("/(payment)/PaymentSuccessScreen");
    }
  };

  const handleRadioSelect = (value: string) => {
    console.log(`Selected payment method: ${value}`);
    setSelectedMethod(value);
  };

  return (
    <>
      <Stack.Screen

        options={{
          title: "Thanh toán",
          
        }}
      />
      <View style={styles.orderInfoContainer}>
        <Text style={styles.title}>Thông tin đơn hàng</Text>
        <View style={styles.orderDetails}>
          <View style={styles.orderDetail}>
            <Text style={styles.orderLabel}>Tên nông trại:</Text>
            <Text style={styles.orderValue}>{farmName}</Text>
          </View>
          <View style={styles.orderDetail}>
            <Text style={styles.orderLabel}>Slot đặt:</Text>
            <Text style={styles.orderValue}>{slot}</Text>
          </View>
          <View style={styles.orderDetail}>
            <Text style={styles.orderLabel}>Giá:</Text>
            <Text style={styles.orderValue}>{price} VND</Text>
          </View>
          <View style={styles.orderDetail}>
            <Text style={styles.orderLabel}>Tổng tiền:</Text>
            <Text style={styles.orderValue}>{price} VND</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.value}
            style={styles.radioContainer}
            onPress={() => handleRadioSelect(method.value)}
          >
            <RadioButton
              value={method.value}
              status={selectedMethod === method.value ? "checked" : "unchecked"}
              onPress={() => handleRadioSelect(method.value)}
              color={Colors.primaryColor}
            />
            {method.image && (
              <Image source={method.image} style={styles.image} />
            )}
            <Text style={styles.radioLabel}>{method.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.button, !selectedMethod && styles.buttonDisabled]}
          onPress={handlePayment}
          disabled={!selectedMethod}
        >
          <Text style={styles.buttonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  orderInfoContainer: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderDetails: {
    marginTop: 10,
  },
  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderLabel: {
    fontSize: 18,
  },
  orderValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.blackTransparent,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 18,
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
