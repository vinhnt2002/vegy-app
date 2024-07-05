import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const ProfileComponent = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/farm/farm-bg.png')}
        style={styles.header}
      >
        <Image
          source={require('@/assets/images/avatarUser/user1.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color={Colors.white} />
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </ImageBackground>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Họ và tên:</Text>
          <Text style={styles.value}>Nguyễn Văn A</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Tuổi:</Text>
          <Text style={styles.value}>30</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Giới tính:</Text>
          <Text style={styles.value}>Nam</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>0123456789</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>123 Đường ABC, Phường XYZ, TP. Hồ Chí Minh</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.bgColor,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    // Không cần backgroundColor nữa vì đã có hình nền
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Giữ nguyên borderRadius để tạo hình tròn
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Colors.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  editButtonText: {
    marginLeft: 5,
    color: Colors.white,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
  },
  value: {
    fontSize: 16,
    color: Colors.darkGrey,
  },
});