import { useUser } from "@clerk/clerk-expo";
// import { StripeProvider } from "@stripe/stripe-react-native";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constant";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useIdStore, useLocationStore, useRideStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { router, useRouter } from "expo-router";
import { addBookings, createChat, fetchBookingsRequest, fetchMyBookings, fetchOneRides, fetchUsers, updateBookingStatus, updaterideSeat } from "@/lib/db";
import { Booking, Ride, User } from "@/types/type";

  



const AcceptRide = () => {

    const renderRideItem = ({ item }:{item:Booking }) => (
        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-gray-100 mt-5">
          {/* User Info */}
          <View className="flex flex-row items-center justify-between w-full border-b border-gray-300 py-3">
            <Text className="text-lg font-semibold">From: {item.user_name}</Text>
            <Text className="text-lg font-semibold">{item.seat} Seats</Text>
          </View>
        
          {/* Conditional Rendering Based on Status */}
          {item.status === "Accepted" ? (
            // Chat Button for Accepted Requests
            <View className="flex flex-row items-center justify-between w-full border-b border-gray-300 py-3">
              <TouchableOpacity
                onPress={() => router.push(`/chat`)}
                className="flex rounded-full p-3 bg-blue-500 justify-center items-center w-32"
              >
                <Text className="text-lg font-bold text-white">Chat</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Accept and Reject Buttons for Pending Requests
            <View className="flex flex-row items-center justify-between w-full py-3">
              {/* Accept Button */}
              <TouchableOpacity
                onPress={()=>{handleAcceptRequest(item.user_id,item.ride_id,item.seat)}}
                className="flex rounded-full p-3 bg-green-500 justify-center items-center w-32"
              >
                <Text className="text-lg font-bold text-white">Accept</Text>
              </TouchableOpacity>
        
              {/* Reject Button */}
              <TouchableOpacity
                onPress={()=>{handleRejectRequest(item.user_id,item.ride_id)}}
                className="flex rounded-full p-3 bg-red-500 justify-center items-center w-32"
              >
                <Text className="text-lg font-bold text-white">Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        
        );

    
const handleAcceptRequest = async (userId:string,rideId:string,seat:number) => {
    try {
      if (rideId && seat) {
        const response = await updateBookingStatus(rideId,userId,  "Accepted");
        const response2= await updaterideSeat(rideId,seat);
        const result = await response.json();
  
        if (response.status === 200) {
          console.log("Request Accepted successfully:", result);
          if(user && userId){
          const chatData = await createChat(user.id,userId);
          
          }
          router.push(`/(root)/(tabs)/chat`);
        } else {
          console.error("Error accepting request:", result.error);
        }
      }
    } catch (error) {
      console.error("Error during accepting request:", error);
    }
  };
  
  const handleRejectRequest = async (userId:string,rideId:string) => {
    try {
      if (rideId) {
        const response = await updateBookingStatus(rideId,userId,  "Rejected");
        const result = await response.json();
  
        if (response.status === 200) {
          console.log("Request Rejected successfully:", result);
          router.push(`/(root)/(tabs)/rides`);
        } else {
          console.error("Error rejecting request:", result.error);
        }
      }
    } catch (error) {
      console.error("Error during rejecting request:", error);
    }
  };

    const rideId = useIdStore((state) => state.id);
    const { user } = useUser();
    const router = useRouter();
    const [ride, setRides] = useState<Ride>();
    const [requests, setRequest] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [acceptedRequests, setAcceptedRequests] = useState<Booking[]>([]);
    const [pendingRequests, setPendingRequests] = useState<Booking[]>([]);
    const [availableSeat,setAvailableSeat]= useState(0);
    
    useEffect(()=>{
        
        if(rideId){
        const fetchData = async () => {
            setLoading(true);
            setError(null);
        
            try {
              if(user?.id){
              
                const fetchedRides = await fetchOneRides(rideId);
                setRides(fetchedRides[0]);
             
                const fetchedRequest = await fetchBookingsRequest(rideId);
                setRequest(fetchedRequest);
                const accepted = fetchedRequest.filter((req) => req.status === "Accepted");
            const pending = fetchedRequest.filter((req) => req.status === "Pending");

            setAcceptedRequests(accepted);
            setPendingRequests(pending);
              }
              
            } catch (err) {
              setError("Failed to load data");
            } finally {
              setLoading(false);
            }
          };
        
          fetchData();
        }
        


    },[rideId])

    useEffect(()=>{
        setAvailableSeat(ride?.seat - ride?.occupied_seat);
      
    },[ride])

    return (
     
        
        <View className="flex-1 bg-white px-[15]">
        
            <View className="flex flex-col w-full items-center justify-center mt-10">
             
  
              <View className="flex flex-row items-center justify-center mt-5 space-x-2">
                <Text className="text-lg font-JakartaSemiBold">
                Ride Information
                </Text>

              </View>
            </View>
  
            <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg font-JakartaRegular">Ride Price</Text>
                <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                  ${ride?.price}
                </Text>
              </View>
  
              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg font-JakartaRegular">Ride Date</Text>
                <Text className="text-lg font-JakartaRegular">
                  {ride?.ride_date!}
                </Text>
              </View>
  
              <View className="flex flex-row items-center justify-between w-full py-3">
                {availableSeat > 0 ? (
                    <>
                    <Text className="text-lg font-JakartaRegular">Car Seats Available</Text>
                    <Text className="text-lg font-JakartaRegular">{availableSeat}</Text>
                    </>
                ) : (
                    <Text className="text-lg font-JakartaRegular">Vehicle is full</Text>
                )}
                </View>

            </View>
  
            <View className="flex flex-col w-full items-start justify-center mt-5">
              <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
                <Image source={icons.to} className="w-6 h-6" />
                <Text className="text-lg font-JakartaRegular ml-2">
                  {ride?.origin_address}
                </Text>
              </View>
  
              <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
                <Image source={icons.point} className="w-6 h-6" />
                <Text className="text-lg font-JakartaRegular ml-2">
                  {ride?.destination_address}
                </Text>
              </View>
            </View>

        
            {
  loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : error ? (
    <Text className="text-red-500 text-center mt-4">{error}</Text>
  ) : (
    <>
         <Text className="text-xl font-semibold mt-4">Accepted Requests</Text>
      {acceptedRequests.length > 0 ? (
        <FlatList
          data={acceptedRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderRideItem}
        />
      ) : (
        <Text className="text-center text-gray-500 mt-4">No Request Accepted</Text>
      )}

{availableSeat > 0 && (
  <>
    <Text className="text-xl font-semibold mt-4">Pending Requests</Text>

    {pendingRequests.length > 0 ? (
      <FlatList
        data={pendingRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRideItem}
      />
    ) : (
      <Text className="text-center text-gray-500 mt-4">No Pending Request</Text>
    )}
  </>
)}
    </>
  )
}


        </View>
     
    );
  };
  
  export default AcceptRide;
  
