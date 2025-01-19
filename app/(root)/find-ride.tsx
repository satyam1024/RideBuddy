import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text,Image, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useIdStore, useLocationStore, useRideStore, useSeatStore } from "@/store";
import { useEffect, useState } from "react";
import { useDriverStore } from "@/store";
import { fetchRides } from "@/lib/db";
import { Ride } from "@/types/type";
import DriverCard from "@/components/DriverCard";
import { icons } from "@/constant";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    seat,date,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const{selectedRide,setSelectedRide}=useRideStore();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const setSeat = useSeatStore((state) => state.setSeat);

  const filterRidesByDate = (rides: any[], date: string) => {
    const targetDate = new Date(date);
    return rides.filter((ride) => {
      const rideDate = new Date(ride.ride_date); 
      return rideDate >= targetDate;
    });
  };
  useEffect(() => {
    if (userAddress && destinationAddress && seat && date) {
      setSeat(seat);
      const fetchRidesData = async () => {
        try {
          const fetchedRides = await fetchRides(userAddress, destinationAddress, seat);
          const filterRides = filterRidesByDate(fetchedRides,date);
          setRides(filterRides);
        } catch (err) {
          setError("Failed to load rides");
        } finally {
          setLoading(false);
        }
      };

      fetchRidesData();
    }
  }, [userAddress, destinationAddress, seat]);

  const handleSelectRide = (ride: Ride) => {
    console.log('in')
    setSelectedRide(ride);
    router.push("/(root)/book-ride"); 

  }
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
     <View className="flex-1 bg-white">
            
              <View className="flex flex-row my-8 ">
                <TouchableOpacity onPress={() => router.back()}>
                  <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                    <Image
                      source={icons.backArrow}
                      resizeMode="contain"
                      className="w-6 h-6"
                    />
                  </View>
                </TouchableOpacity>
                <Text className="text-xl font-JakartaSemiBold ml-5">
                  {"Choose the ride"}
                </Text>
              </View>


              {rides.length > 0 ? (
        <FlatList
          data={rides}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleSelectRide(item)}>
           
            <DriverCard ride={item} />
          </TouchableOpacity>
         
          )}
          
        />
      ) : (
        <Text className="text-center mt-10">No rides found</Text>
      )}

              </View>
   
         
   
      

  );
};

export default FindRide;
