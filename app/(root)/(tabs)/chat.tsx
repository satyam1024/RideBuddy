import { Image, ScrollView, Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constant";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { fetchChats, fetchUsers } from "@/lib/db";
import { chat, User } from "@/types/type";
import { router } from "expo-router";
import { useChatStore } from "@/store";


const Chat = () => {
  
  const { user } = useUser();
  const [chats, setChats] = useState<chat[]>([]);
  const [loading, setLoading] = useState(true);
  const setChat = useChatStore((state) => state.setChat);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
         const [error, setError] = useState<string | null>(null);
         useEffect(() => {
          const loadChats = async () => {
            setLoading(true);
            if (user) {
              try {
                const chatList = await fetchChats(user.id);
                setChats(chatList);
      
                // Pre-fetch usernames for all other users in chats
                const userIds = Array.from(
                  new Set(
                    chatList.map((chat) =>
                      chat.user_id1 === user.id ? chat.user_id2 : chat.user_id1
                    )
                  )
                );
      
                const fetchedUsernames: Record<string, string> = {};
                await Promise.all(
                  userIds.map(async (id) => {
                    try {
                      const fetchedUser = await fetchUsers(id);
                      fetchedUsernames[id] = fetchedUser.name;
                    } catch (error) {
                      fetchedUsernames[id] = "Unknown User";
                    }
                  })
                );
      
                setUsernames(fetchedUsernames);
              } catch (error) {
                console.error("Error loading chats:", error);
              } finally {
                setLoading(false);
              }
            }
          };
      
          loadChats();
        }, [user]);


  const renderChatItem = ({ item }:{item:chat}) => {
    
    const otherUserId = item.user_id1 === user?.id ? item.user_id2 : item.user_id1;
    const username = usernames[otherUserId] || "Loading...";
    
    return (
      <TouchableOpacity
        onPress={()=>{
          setChat(item.chat_id,item.user_id1,item.user_id2,username);
          router.push("/(root)/users-chat")
        }}
        className="p-4 border-b border-gray-200"
      >
        <Text className="text-lg font-JakartaBold">{username}</Text>
        <Text className="text-sm text-gray-500">Tap to open chat</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View>
      <Text className="text-2xl font-JakartaBold my-1">Inbox</Text>
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-JakartaBold">Loading...</Text>
        </View>
      ) : chats.length === 0 ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          
          <View className="flex-1 h-fit flex justify-center items-center">
            <Image
              source={images.message}
              alt="message"
              className="w-full h-40"
              resizeMode="contain"
            />
            <Text className="text-3xl font-JakartaBold mt-3">No Messages Yet</Text>
            <Text className="text-base mt-2 text-center px-7">
              Start a conversation with your friends and family
            </Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={renderChatItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Chat;
