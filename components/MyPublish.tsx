import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import { fetchMyRides } from "@/lib/db";
import MyPublishCard from '@/components/PublishCard'

import { Ride } from "@/types/type";
import RideCard from "@/components/RideCard";

interface MyRidesProps {
  driverId: string|undefined;
}

const MyPublish: React.FC<MyRidesProps> = ({ driverId }) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(driverId){
    const fetchRidesData = async () => {
       
      try {
        const fetchedRides = await fetchMyRides(driverId);
        setRides(fetchedRides);
     
       
      } catch (err) {
        setError("Failed to load rides");
      } finally {
        setLoading(false);
      }
    };
    

    fetchRidesData();
}
  }, [driverId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View className="flex-1 justify-center px-5 bg-white rounded-xl shadow-lg p-6 mt-10">
      <Text className="text-xl font-bold text-center mb-5 ">My Rides</Text>
   
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) =>{
          
          return <RideCard ride={item} />;
        }}
        
      />
    </View>



  );
};

export default MyPublish;
