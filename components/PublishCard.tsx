import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constant";

interface RideCardProps {
  item: {
    id: string;
    original_address: string;
    destination_address: string;
    seat: number;
    price: number;
    ride_date:string;
   

  };
  
}
const handlepress=()=>{
  console.log("why")
}
 const formatTime = (time: string): string => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};
const MyPublishCard: React.FC<RideCardProps> = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={handlepress}
      // className={`${
      //   selected === item.id ? "bg-general-600" : "bg-white"
      // } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      {/* Ride Location */}
      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <Text className="text-lg font-JakartaRegular mb-1">
          {item.original_address} to {item.destination_address}
        </Text>

        <View className="flex flex-row items-center space-x-1 mb-1">
          <Image source={icons.map} className="w-3.5 h-3.5" />
          <Text className="text-sm font-JakartaRegular">Ride</Text>
        </View>

        <View className="flex flex-row items-center justify-start">
          {/* Price */}
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="text-sm font-JakartaRegular ml-1">${item.price}</Text>
          </View>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">|</Text>

          {/* Time */}
          <Text className="text-sm font-JakartaRegular text-general-800">
            {formatTime(item.ride_date)}
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">|</Text>

          {/* Seats */}
          <Text className="text-sm font-JakartaRegular text-general-800">
            {item.seat} seats
          </Text>
        </View>
      </View>

    
    </TouchableOpacity>
  );
};

export default MyPublishCard;
