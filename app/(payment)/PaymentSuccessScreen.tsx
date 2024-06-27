import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons"; // Install if you haven't: npm install @expo/vector-icons

const PaymentSuccessScreen = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3); // Countdown starts from 3 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      console.log("thanh toán thành công");
      router.push("/"); // Navigate to the home screen
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Thanh toán",
        }}
      />
      <View style={styles.container}>
        <MaterialIcons
          name="check-circle"
          size={100}
          color={Colors.primaryColor}
        />
        <Text style={styles.successMessage}>Thanh toán thành công!</Text>
        <Text style={styles.countdownMessage}>
          Trở về trang chủ trong {countdown} giây
        </Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            console.log("thanh toán thành công");
            router.push("/");
          }}
        >
          <Text style={styles.buttonText}>Trở về trang chủ</Text>
        </Button>
      </View>
    </>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.white,
  },
  successMessage: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginTop: 20,
    textAlign: "center",
  },
  countdownMessage: {
    fontSize: 18,
    color: Colors.darkGrey,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
