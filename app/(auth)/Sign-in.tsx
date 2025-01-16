import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";

const SignIn=()=>{
    const { signIn, setActive, isLoaded } = useSignIn();
    const [form,setForm]=useState({
        email:"",
        password:"",
    })
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;
    
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          });
    
          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.replace("/(root)/(tabs)/home");
          } else {
            
            console.log(JSON.stringify(signInAttempt, null, 2));
            Alert.alert("Error", "Log in failed. Please try again.");
          }
        } catch (err: any) {
          console.log(JSON.stringify(err, null, 2));
          Alert.alert("Error", err.errors[0].longMessage);
        }
      }, [isLoaded, form]);
   
    return(
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]"/>
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Welcome Back
                    </Text>
                </View>
                <View className="p-5">
                    
                    <InputField  
                    label="Email" 
                    placeholder="Enter your email"
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value: any)=>setForm({ ...form,email : value})}
                    />
                    <InputField  
                    label="Password" 
                    placeholder="Enter your password"
                    icon={icons.lock}
                    secureTextEntry={true}
                    value={form.password}
                    onChangeText={(value: any)=>setForm({ ...form,password : value})}
                    />
                    <CustomButton 
                    title="Sign in" 
                    onPress={onSignInPress}
                    className="mt-6"
                    />

                    <OAuth/>
                    <Link 
                    href="/Sign-up"
                    className="text-lg text-general-200 mt-10"
                    >
                        <Text >Don't have an Acount?</Text>
                        <Text className="text-primary-500">Sign up</Text>
                    </Link>
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default SignIn;