import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData, Ride } from "@/types/type";


export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  seat: 1, 
  date: null, 

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setSeat: (seat: number) => {
    set(() => ({ seat }));
  },

  setDate: (date: string) => {
    set(() => ({ date }));
  },
}));



export const useDriverStore = create<DriverStore>((set) => ({
  
  selectedDriver: null,
  setSelectedDriver: (driverId: string) =>
    set(() => ({ selectedDriver: driverId })),
  
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));


interface RideStore {
  selectedRide: Ride | null; 
  setSelectedRide: (ride: Ride) => void;
  clearSelectedRide: () => void;
}

export const useRideStore = create<RideStore>((set) => ({
  selectedRide: null,
  setSelectedRide: (ride: Ride) => set(() => ({ selectedRide: ride })),
  clearSelectedRide: () => set(() => ({ selectedRide: null })),
}));




interface IdStore {
  id: string | null; 
  setId: (id: string) => void;
 
}

export const useIdStore = create<IdStore>((set) => ({
  id: null,
  setId: (id: string) => set(() => ({ id: id })),
 
}));

interface SeatStore {
  seat: number | null; 
  setSeat: (id: number) => void;
 
}

export const useSeatStore = create<SeatStore>((set) => ({
  seat: null,
  setSeat: (seat: number) => set(() => ({ seat: seat })),
 
}));


interface ChatStore {
  chat_id: string | null;
  user_id1: string | null; 
  user_id2: string | null;  
  name:string|null;

  setChat: (chat_id: string,user_id1:string,user_id2:string,name:string) => void;
 
}

export const useChatStore = create<ChatStore>((set) => ({
  chat_id: null,
  user_id1: null, 
  user_id2: null,  
  name:null,
  setChat: (chat_id: string,user_id1:string,user_id2:string,name:string) => set(() => ({ chat_id:chat_id,user_id1:user_id1,user_id2:user_id2,name:name})),
 
}));