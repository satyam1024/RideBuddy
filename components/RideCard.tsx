import { RefreshControl,Image, Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import { icons } from "@/constant";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";


const RideCard = ({ ride }: { ride: Ride }) => {
  
  const [imageUri, setImageUri] = useState<string | null>(null);

  const availableSeat = ride.seat - ride.occupied_seat;

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{ uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`}}
           
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-1 h-1" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-1 h-1" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(ride.ride_date)}
            </Text>
          </View>
          
            {availableSeat > 0 ? (
              <>
              <View className="flex flex-row items-center w-full justify-between mb-1">
                <Text className="text-md font-JakartaMedium text-gray-500">Car Seats</Text>
                <Text className="text-md font-JakartaBold">{ride.seat}</Text>

                <Text className="text-md font-JakartaMedium text-gray-500">Price</Text>
                <Text className="text-md capitalize font-JakartaBold text-green-500">
                  {ride.price}
                </Text>
              </View>
              </>
            ) : (
              <View className="flex flex-row items-center w-full justify-center mb-1">
              <Text className="text-md font-JakartaBold">Vehicle is full</Text>
              </View>

            )}
          

        </View>
      </View>
    </View>
  );
};

export default RideCard;