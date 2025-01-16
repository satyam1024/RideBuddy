import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/db";
import { User } from "@/types/type";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser();
    
    const { signOut } = useAuth();
  
  
    const handleSignOut = () => {
      signOut();
      router.replace("/(auth)/Sign-in");
    };
   const[userDetails,setUserDetails]=useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);
     const [firstName,setFirstName]=useState<string>("Not Found");
     const [lastName,setLastName]=useState<string>("Not Found");
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
        
        useEffect(()=>{
          const [fName, lName] =  userDetails?.name ? userDetails?.name.split(' '):[];
          setFirstName(fName);
          setLastName(lName)
        },[userDetails])
        

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={firstName }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={lastName}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
        <CustomButton
          title="Sign Out"
          onPress={handleSignOut}
          className="mt-5"
          bgVariant="danger"

        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
