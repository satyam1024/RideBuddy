import { getChat, sendMessage } from "@/lib/db";
import { useChatStore } from "@/store";
import { Message } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { FlatList, TextInput, Button, View,Image, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import React from 'react'
import { router } from "expo-router";
import { icons } from "@/constant";


const ChatWindow = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
const { chat_id,user_id1,user_id2,name} = useChatStore();
  


const fetchMessages = async()=>{
    if(chat_id){
    const chatHistort = await getChat(chat_id);
    setMessages(chatHistort);
    }
}

const sendNewMessage = async () => {
    if (!newMessage.trim() ) return;
        if(user && chat_id){

        await sendMessage(chat_id,user.id,newMessage)
        setNewMessage("");
        fetchMessages(); 
    };
}


  useEffect(() => {
    setLoading(true);
    fetchMessages();
    setLoading(false);

  }, [chat_id]);
  
    const handleSignOut = () => {
      
      router.replace("/(root)/(tabs)/chat");
    };

  return (
    <>
    

    <KeyboardAvoidingView
    behavior="padding"
    className="flex-1 p-4 bg-white"
  >
    <View className="flex flex-row w-full">
    <TouchableOpacity
        onPress={handleSignOut}
        className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
      </TouchableOpacity>
  <Text className="text-2xl font-JakartaBold mb-5  text-center">{name}</Text>
</View>
    
    {loading ? (
      <Text className="text-center">Loading messages...</Text>
    ) : (
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }:{item:Message}) => {
          
          return (
            <View
              className={`p-3 my-1 rounded-lg w-1/2 ${
                item.sender === user?.id
                  ? "self-end bg-green-200"
                  : "self-start bg-gray-200"
              }`}
            >
              <Text>{item.message}</Text>
              <Text className="text-xs text-gray-600">
                {new Date(item.send_at).toLocaleTimeString()}
              </Text>
            </View>
          );
        }}
        
      />
    )}
    <View className="flex-row items-center mt-2 mb-5">
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-3"
      />
      <Button title="Send" onPress={sendNewMessage} />
    </View>
  </KeyboardAvoidingView>
  </>
);
};



export default ChatWindow;
