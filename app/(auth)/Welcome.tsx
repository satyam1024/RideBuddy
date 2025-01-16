import { SafeAreaView } from "react-native-safe-area-context";
import {Text, View,Image,TouchableOpacity} from "react-native";
import {router} from "expo-router";
import Swiper from "react-native-swiper";
import { useRef ,useState} from "react";
import { onboarding } from "@/constant";
import CustomButton from "@/components/CustomButton";
import {addUserDetails} from '@/lib/db';

const Welcome=()=>{
    
   
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex,setActiveIndex]=useState(0);
    const isLastSlide= activeIndex === onboarding.length -1;
    return(
        <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <TouchableOpacity onPress={()=>{
                router.replace("/(auth)/Sign-up");
            }} 
            className="w-full flex justify-end items-end p-5 ">
            <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>
            {/* <Image
            source={{ uri:"https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:78.0436813,30.3255646&zoom=14&apiKey=9a4d8572ea594d7abc617c06bfa62a87"}}
           
            className="w-[80px] h-[90px] rounded-lg"
          /> */}

            {/* <TouchableOpacity onPress={()=>{
              fun()
            }} 
            className="w-full flex justify-end items-end p-5 ">
            <Text className="text-black text-md font-JakartaBold">debugging</Text>
            </TouchableOpacity> */}
            
            <Swiper ref={swiperRef}
            loop={false}
            dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"/>}
            activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"/>
            }
            onIndexChanged={(index)=>setActiveIndex(index)}
            >
                {onboarding.map((item)=>(

                    <View key={item.id} className="flex item-center justify-center p-5">
                        <Image
                            source ={item.image}
                            className="w-full h-[280px]"
                            resizeMode="contain"
                            />
                        <View className="flex flex-row item-center justify-center w-full mt-10">
                             <Text className="text-black text-3xl font-bold mx-10 text-center">
                                {item.title}
                            </Text>

                        </View>
                        <Text className="text-md font-JakarSemiBold text-center text-[#858585] mx-10 mt-3">
                            {item.description}
                        </Text>
                        
                    </View>
                )
                )}

            </Swiper>
            <CustomButton title={isLastSlide ?"Get Started":"Next"} onPress ={()=>isLastSlide ? router.replace('/(auth)/Sign-up'):swiperRef.current?.scrollBy(1)} className="w-11/12 mt-10 mb-5"/>

        </SafeAreaView>
    )
}

export default Welcome;