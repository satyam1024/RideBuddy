import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "@/constant";
import { GeoapifySuggestion,GoogleInputProps  } from "@/types/type";

const geoapifyApiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;





const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps ) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);

  const fetchSuggestions = async (text:string) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${geoapifyApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Geoapify API Error:", error);
    }
  };

  const handleSelect = (item: GeoapifySuggestion) => {
    handlePress({
      latitude: item.properties.lat,
      longitude: item.properties.lon,
      address: item.properties.formatted,
    });
    setQuery(item.properties.formatted);
    setSuggestions([]);
  };

  return (
    <View className={`relative ${containerStyle}`}>
      <View className="flex flex-row items-center bg-white rounded-xl px-4 py-2 shadow">
        {icon && (
          <Image
            source={icon? icon : icons.search}
            className="w-6 h-6 mr-2"
            resizeMode="contain"
          />
        )}
        <TextInput
          className={`bg-white text-base font-semibold mt-1 w-full rounded-full `}
          placeholder="Where do you want to go?"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchSuggestions(text);
          }}
        />
      </View>
      {suggestions.length > 0 && (
        <FlatList
          className={`${textInputBackgroundColor} relative pb-[20] top-0 w-full rounded-lg shadow-md z-[99]`}
          data={suggestions}
          keyExtractor={(item) => item.properties.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              className="px-4 py-2  border-gray-200"
            >
              <Text className="bg-white text-base font-semibold mt-1 w-full rounded-full">{item.properties.formatted}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default GoogleTextInput;
