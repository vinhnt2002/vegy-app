import { createPayment } from "@/lib/actions/payment";
import { getCurrentUser } from "@/lib/appwrite";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const Page = () => {
  const qrUrl = "https://img.vietqr.io/image/ACB-14282297-compact.png?amount=100000";

  const handlePayment = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
       
        await createPayment(currentUser.$id, 120000, 'completed', "66851e959863f1a2111f", "BANK");
        Alert.alert("Thành công", "Thanh toán đã được xử lý và lưu thành công!");
      } else {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
      }
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xử lý thanh toán.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quét để Thanh toán</Text>
      <Image
        style={styles.qrImage}
        source={{ uri: qrUrl }}
        onError={(e) => console.log('Lỗi khi tải hình ảnh:', e.nativeEvent.error)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Xác nhận Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});