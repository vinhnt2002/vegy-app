import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

type CartProps = {
    farmCount: number;
    seedsCount: number;
    walletCount: number;
    otherCount: number;
    transportCount:number;
    orderCount:number;
};

const ItemProfile = ({ farmCount, seedsCount, walletCount,otherCount ,transportCount,orderCount }: CartProps) => {
    return (<>
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="tractor" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>Farm</Text>
                    </View>
                    <Text style={styles.cartCount}>{farmCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="seedling" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>Seeds</Text>
                    </View>
                    <Text style={styles.cartCount}>{seedsCount}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="receipt" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>
                        order</Text>
                    </View>
                    <Text style={styles.cartCount}>{orderCount}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="shipping-fast" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>transport</Text>
                    </View>
                    <Text style={styles.cartCount}>{transportCount}</Text>
                </TouchableOpacity>
                
            </View>

            <View style={styles.row}>
            
            <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="wallet" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>Wallet</Text>
                    </View>
                    <Text style={styles.cartCount}>{walletCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cartItem} activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="boxes" size={24} color={Colors.primaryColor} />
                        <Text style={styles.cartTitle}>Other</Text>
                    </View>
                    <Text style={styles.cartCount}>{otherCount}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>

    );
};
const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: Colors.bgColor,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    cartItem: {
      flex: 1,
      marginHorizontal: 10,
      backgroundColor: Colors.white,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    cartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      color: Colors.black,
    },
    cartCount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.primaryColor,
    },
  });

export default ItemProfile;
