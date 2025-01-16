import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import GoogleTextInput from "@/components/GoogleTextInput";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {Text,View,TextInput,TouchableOpacity,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "@/components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RideLayout from "@/components/RideLayout";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constant";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";
import React from "react";




const Home = () => {
  const { user } = useUser();
  
  const { signOut } = useAuth();


  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/Sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datee, setLocalDate] = useState(new Date());
  const [seats, setSeats] = useState(1);

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

  
   const { 
       seat, 
       date,setUserLocation, setDestinationLocation ,setSeat,setDate} = useLocationStore();
  
    const handleConfirm = (date:any) => {
      setDate(date.toISOString().split('T')[0])
      hideDatePicker();
    };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };


  return (
    <SafeAreaView className="flex-1 bg-general-500 justify-center px-5 ">
      <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold pb-6">
                Welcome {user?.firstName}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

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

   
        <CustomButton
          title="Find Now"
          onPress={() => router.push(`/(root)/find-ride`)}
          className="mt-5"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;