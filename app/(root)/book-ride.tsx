import { useUser } from "@clerk/clerk-expo";
// import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constant";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore, useRideStore, useSeatStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { addBookings, fetchMyBookings, fetchUsers } from "@/lib/db";
import { Booking, User } from "@/types/type";


const BookRide = () => {


    const { user } = useUser();
    const{selectedRide,setSelectedRide}=useRideStore();
    const [booking, setBooking] = useState<Booking[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const[userDetails,setUserDetails]=useState<User>();
  const seat = useSeatStore((state) => state.seat);


    const handleRequest=async()=>{

      console.log(selectedRide?.id, seat,selectedRide?.driver_name, selectedRide?.price,selectedRide?.ride_date,selectedRide?.origin_address,selectedRide?.destination_address);
      console.log(userDetails?.clerk_id,userDetails?.name,userDetails?.email);
   
         if(selectedRide?.id &&  userDetails?.clerk_id && userDetails?.name && user?.primaryEmailAddress?.emailAddress && seat && selectedRide?.driver_name && selectedRide?.price && selectedRide?.ride_date && selectedRide?.origin_address && selectedRide?.destination_address){
           
          await addBookings(selectedRide?.id,userDetails?.clerk_id,userDetails?.name,userDetails.email,seat,"Pending",selectedRide?.driver_name,selectedRide?.ride_date,parseInt(selectedRide?.price),selectedRide?.origin_address,selectedRide?.destination_address);

          router.push("/(root)/(tabs)/rides");
          }
    }
    useEffect(() => {
        if (user?.id) {
          const fetchRidesData = async () => {
            try {
              const fetchedBookings = await fetchMyBookings(user?.id);
              
              setBooking(fetchedBookings);
          
              const alreadyBooked = fetchedBookings.some(
                (booking) => booking.ride_id === selectedRide?.id
              );
             
              setIsAlreadyBooked(alreadyBooked);
            } catch (err) {
              setError("Failed to load bookings");
            } finally {
              setLoading(false);
            }
          };
          const fetchUserData = async () => {
            try {
              const fetcheduser = await fetchUsers(user?.id);
              
              setUserDetails(fetcheduser);
            } catch (err) {
              setError("Failed to find user");
            } finally {
              setLoading(false);
            }
          };
          
    
          fetchRidesData();
          
          fetchUserData();
        }

       
      }, []);

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
                    {"Book ride"}
                  </Text>
                </View>
                
           
                
      
      <View className="flex bg-white p-5 ">
        <View className="flex flex-row items-center justify-center space-x-2">
        <Text className="text-xl font-JakartaSemiBold ">
              {"Ride Information"}
        </Text>
        </View>

        <View className="flex flex-col w-full items-center justify-center mt-10">
        

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {selectedRide?.driver_name}
            </Text>

          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Price</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              ${selectedRide?.price}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Date</Text>
            <Text className="text-lg font-JakartaRegular">
              {selectedRide?.ride_date!}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Car Seats</Text>
            <Text className="text-lg font-JakartaRegular">
              {selectedRide?.seat}
            </Text>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {selectedRide?.origin_address}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {selectedRide?.destination_address}
            </Text>
          </View>
        </View>


        <View className="flex-row justify-between mt-5">
          <CustomButton
            title={isAlreadyBooked ? "Request Already Sent" :"Send Request"}
            onPress={handleRequest}
            className="mt-5"
            disabled={isAlreadyBooked} 
        />
        
        
      </View>
      </View>
      </View>
     
    );
  };
  
  export default BookRide;
  