import {TextInputProps, TouchableOpacityProps} from "react-native";

declare interface Driver {
    driver_id: number;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: number;
}

declare interface MarkerData {
    latitude: number;
    longitude: number;
    id: number;
    title: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: number;
    first_name: string;
    last_name: string;
    time?: number;
    price?: string;
}

declare interface MapProps {
    destinationLatitude?: number;
    destinationLongitude?: number;
    onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
    selectedDriver?: number | null;
    onMapReady?: () => void;
}

declare interface Ride {
    id:string;
    origin_address: string;
    destination_address: string;
    origin_latitude: number;
    origin_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
    ride_date: string;
    price: string;
    seat:string;
    driver_name:string;
    occupied_seat:string;
}
declare interface User {
    name:string;
    email:string;
    clerk_id:string;
}
declare interface chat {
    chat_id:string;
    user_id1:string;
    user_id2:string;
}
interface Message {
    id:string;
    chat_id: string;
    sender: string;
    message: string;
    send_at:string;
    
  }
declare interface Booking {
    id:string;
    ride_id: string;
    user_id: string;
    user_name: string;
    user_email: string;
    seat: number;
    status:string;
    driver_name:string;
    ride_date:string;
    price:number;
    origin_address: string;
    destination_address: string;
}

declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "default" | "success"|"outline";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
}

declare interface GoogleInputProps {
    icon?: string;
    initialLocation?: string;
    containerStyle?: string;
    textInputBackgroundColor?: string;
    handlePress: ({
                      latitude,
                      longitude,
                      address,
                  }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

declare interface GeoapifySuggestion  {
    
    properties:  {
      lat: number;
      lon: number;
      formatted: string;
      place_id: string;
    };
  };

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}

declare interface PaymentProps {
    fullName: string;
    email: string;
    amount: string;
    driverId: number;
    rideTime: number;
}

declare interface LocationStore {
    userLatitude: number | null;
    userLongitude: number | null;
    userAddress: string | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
    destinationAddress: string | null;
    seat: number | null; // New seat variable
  date: string | null;
    setUserLocation: ({
                          latitude,
                          longitude,
                          address,
                      }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
    setDestinationLocation: ({
                                 latitude,
                                 longitude,
                                 address,
                             }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
    setSeat: (seat: number) => void; // New function to set the seat value
  setDate: (date: string) => void;
}

declare interface DriverStore {
    
    selectedDriver: string | null;
    setSelectedDriver: (driverId: string) => void;
    clearSelectedDriver: () => void;
}

  

declare interface DriverCardProps {
    item: MarkerData;
    selected: number;
    setSelected: () => void;
}