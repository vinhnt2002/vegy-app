import { View, Text } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'

const FarmSelf = () => {
    const { $id } = useLocalSearchParams();

    console.log("farmid",$id)
  return (
    <View>
       
        
      <Text>FarmSelf</Text>
    </View>
  )
}

export default FarmSelf