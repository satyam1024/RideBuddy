import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constant";
import { formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import {useDriverStore} from "@/store";  // Importing the custom store

const DriverCard = ({ ride }: { ride: Ride }) => {

  return (
<View className="bg-white rounded-lg shadow-lg p-4 mb-4">
  <View className="flex flex-row justify-between items-start mb-4">
    <View className="flex flex-col items-start mx-4 flex-1">
      <Text className="text-lg font-JakartaBold text-gray-800">
        {ride.origin_address.split(' ')[0]}
      </Text>
      
      <Text className="text-lg font-JakartaBold text-gray-800">
        {ride.destination_address.split(' ')[0]}
      </Text>
    </View>

    <View>
      <Text className="text-lg font-JakartaBold text-green-600">₹{ride.price}</Text>
    </View>
  </View>

  <View className="h-[1px] bg-gray-300 my-4"></View>

  <View className="flex flex-row items-center justify-between">
    <View className="flex flex-row items-center">
      <View className="ml-3">
        <Text className="text-xl font-JakartaRegular font-semibold">
          {ride.driver_name}
        </Text>
      </View>
    </View>
  </View>
  <View className="flex flex-row justify-between items-start mb-4">
    <View className="flex flex-col items-start mx-4 flex-1">
      <Text className="text-lg font-JakartaBold text-gray-800">
      {ride.ride_date}
      </Text>
    </View>
    <View>
      <Text className="text-lg font-JakartaBold text-green-600">{ride.seat} seats</Text>
    </View>
  </View>
</View>


  );
}
export default DriverCard;
