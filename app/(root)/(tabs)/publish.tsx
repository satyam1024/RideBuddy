import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import GoogleTextInput from "@/components/GoogleTextInput";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {Text,View,TextInput,TouchableOpacity,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "@/components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addRides, fetchUsers } from "@/lib/db";
import RideLayout from "@/components/RideLayout";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constant";
import { useFetch } from "@/lib/fetch";
import React, { useRef } from "react";
import { useLocationStore } from "@/store";
import { Ride, User } from "@/types/type";

import MyPublish from "@/components/MyPublish";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";




const Publish = () => {
  const { user } = useUser();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { signOut } = useAuth();
  const[userDetails,setUserDetails]=useState<User>();
      const [loading, setLoading] = useState<boolean>(true);
       const [error, setError] = useState<string | null>(null);
        useEffect(() => {
            if (user?.id) {
             
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
              
              
              fetchUserData();
            }
    
           
          }, []);
          
  
  const handleAddRide = async()=>{
  
    console.log(userLatitude, userLongitude, userAddress);
  console.log(destinationLatitude, destinationLongitude, destinationAddress);
  console.log(seat, date,price);
  console.log(user?.id,userDetails?.name);
  
  if(userAddress && destinationAddress && userLatitude &&  userLongitude && destinationLatitude &&  destinationLongitude && date && price && user?.id && seat && userDetails?.name){
    const dateObj = new Date(date);
  await addRides(userAddress,destinationAddress,userLatitude, userLongitude,destinationLatitude, destinationLongitude,dateObj,price,user?.id,seat,userDetails.name);
  
  router.push("/(root)/(tabs)/rides");
  }
  else{
    console.log("error")
  }
}
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/Sign-in");
  };
  
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const [datee, setLocalDate] = useState(new Date());
  const [price, setprice] = useState(1);

 const { userLatitude, 
     userLongitude, 
     userAddress, 
     destinationLatitude, 
     destinationLongitude, 
     destinationAddress, 
     seat, 
     date,setUserLocation, setDestinationLocation ,setSeat,setDate} = useLocationStore();

  const handleConfirm = (date:any) => {
    setDate(date.toISOString().split('T')[0])
    hideDatePicker();
  };


  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
 
    if (selectedDate) {
      setLocalDate(selectedDate);
      setDate(selectedDate.toISOString());
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-general-500 justify-center px-5 py-10">
     
      <View className="bg-white rounded-xl shadow-lg p-6">
        {/* From Field */}
        <View className="mb-5">
          <Text className="text-xl font-JakartaSemiBold mb-3">From</Text>
          <GoogleTextInput
            icon={icons.target}
            // initialLocation={userLocation}
            containerStyle="bg-neutral-100"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
          />
        </View>

        {/* To Field */}
        <View className="mb-5">
          <Text className="text-xl font-JakartaSemiBold mb-3">To</Text>
          <GoogleTextInput
            icon={icons.map}
            // initialLocation={destinationLocation}
            containerStyle="bg-neutral-100"
            textInputBackgroundColor="transparent"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>
      
      

      
<TouchableOpacity onPress={showDatePicker}>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Date</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          placeholder={`${datee}`}
          value={date? date.toString() :""}
          editable={false}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date" 
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </TouchableOpacity>
    

        <View className="mb-5">
          <Text className="text-xl font-JakartaSemiBold mb-3">Number of Seats</Text>
          <TextInput
            placeholder="Enter number of seats"
            value={seat? seat.toString() :""}
            onChangeText={(text) => setSeat(Number(text))}
            keyboardType="numeric"
            className="p-3 bg-neutral-100 rounded-lg"
          />
        </View>

        <View className="mb-5">
          <Text className="text-xl font-JakartaSemiBold mb-3">Price</Text>
          <TextInput
            placeholder="Enter the Price"
            value={price? price.toString():""}
            onChangeText={(text) => setprice(Number(text))}
            keyboardType="numeric"
            className="p-3 bg-neutral-100 rounded-lg"
          />
        </View>


   
        <CustomButton
          title="Publish Now"
          onPress={handleAddRide}
          className="mt-5"
        />
      </View>

     
        
        
      {/* <MyPublish driverId={user?.id}/> */}
    
    </SafeAreaView>
  );
};

export default Publish;