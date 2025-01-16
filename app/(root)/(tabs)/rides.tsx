import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator,TouchableOpacity, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constant";
import { useFetch } from "@/lib/fetch";
import { Booking, Ride } from "@/types/type";
import React, { useEffect, useState } from "react";
import { fetchMyRides, fetchMyBookings } from "@/lib/db";
import { useRouter } from "expo-router";
import DriverCard from "@/components/DriverCard";
import { useIdStore } from "@/store";


const Rides = () => {
   const { user } = useUser();
const [activeTab, setActiveTab] = useState<"published" | "taken">("published");
const [publishedRides, setPublishedRides] = useState<Ride[]>([]);
const [takenRides, setTakenRides] = useState<Booking[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const setId = useIdStore((state) => state.setId);

const router = useRouter();

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if(user?.id){
      
        const fetchedpubRides = await fetchMyRides(user?.id);
        setPublishedRides(fetchedpubRides);
     
        const fetchedRides = await fetchMyBookings(user?.id);
        setTakenRides(fetchedRides);
      }
      
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user?.id]);


const renderRideItem = ({ item }:{item:Booking | Ride}) => (
  <View className="bg-gray-100 p-4 mb-3 rounded-lg border border-gray-300">
    <Text className="text-lg font-semibold">
      {item.origin_address} 
    </Text>
      <Text className="text-lg font-semibold text-center">
       =={">"}  
    </Text>
    <Text className="text-lg font-semibold">
     {item.destination_address}
    </Text>
    <Text className="text-sm text-gray-600">Date: {item.ride_date}</Text>
    <Text className="text-sm text-gray-600">Price: {item.price}</Text>
    <Text className="text-sm text-gray-600">
      {activeTab === "published" ? `Seats: ${item.seat}` : `Driver: ${item.driver_name}`}
    </Text>
  </View>
);




return (
  <View className="flex-1 pb-16 ">
  {/* Toggle Buttons */}
  <View className="flex-row justify-between mb-4">
    <TouchableOpacity
      className={`flex-1 p-3 mx-1 rounded-lg ${activeTab === "published" ? "bg-blue-500" : "bg-gray-200"}`}
      onPress={() => setActiveTab("published")}
    >
      <Text className={`text-center font-semibold ${activeTab === "published" ? "text-white" : "text-black"}`}>
        Published Rides
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      className={`flex-1 p-3 mx-1 rounded-lg ${activeTab === "taken" ? "bg-blue-500" : "bg-gray-200"}`}
      onPress={() => setActiveTab("taken")}
    >
      <Text className={`text-center font-semibold ${activeTab === "taken" ? "text-white" : "text-black"}`}>
        Taken Rides
      </Text>
    </TouchableOpacity>
  </View>

  {loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : error ? (
    <Text className="text-red-500 text-center mt-4">{error}</Text>
  ) : activeTab === "published" && publishedRides.length > 0 ? (
    <FlatList
      data={publishedRides}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={()=> {
          setId(item.id); 
          router.push(`/(root)/accept-ride` )
        }}>
       
        <RideCard ride={item} />
      </TouchableOpacity>
     
      )}
      
    />
  ) : activeTab === "taken" && takenRides.length > 0 ? (
    <FlatList
      data={takenRides}
      keyExtractor={(item) => item.id}
      renderItem={renderRideItem}
     
    />
  ) : (
    <Text className="text-center text-gray-500 mt-4">No rides found</Text>
  )}
</View>
);
};

export default Rides;
