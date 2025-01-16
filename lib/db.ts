import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { supabase } from'../utils/superbase';

export const fetchUsers = async (clerk_id:string) => {
  const { data, error } = await supabase.from('users').select('*').eq('clerk_id',clerk_id);
  if (error) {
    console.error('Error fetching users:', error.message);
    return ;
  }
  return data[0];
};


export const addUserDetails = async (clerk_id: string, name: string, email: string) => {
    try {
       
        const { error, data } = await supabase.from("users").insert([
            {
              clerk_id: clerk_id,
              name : name,
              email: email,
            },
        ]
          );
          
          if (error) {
            console.error("Error inserting user:", error);
            return Response.json(
              { error: "Failed to save user details" },
              { status: 500 }
            );
          }
          console.log("User details saved successfully!");
      
          return new Response(
            JSON.stringify({ data }),
            {
              status: 201,
            }
          );
      
      
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };
  

  export const fetchRides = async (originalAddress:string,destinationAddress:string,seat:number) => {
    const { data, error } = await supabase.from('ride').select('*')
    .eq('origin_address', originalAddress)
    .eq('destination_address', destinationAddress)
    .gte('seat', seat);
    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
    return data;
  };

  export const fetchMyRides = async (driver_id: string) => {
    const { data, error } = await supabase.from('ride').select('*')
    .eq('driver_id', driver_id)
   
    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
    return data;
  };

  export const fetchOneRides = async (id: string) => {
    const { data, error } = await supabase.from('ride').select('*')
    .eq('id', id)
   
    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
    return data;
  };
  
  
  
  
  export const addRides = async (
    origin_address: string,
    destination_address: string,
    origin_latitude: number,
    origin_longitude: number,
    destination_latitude: number,
    destination_longitude: number,
    ride_date: Date,
    price: number,
    driver_id: string,
    seat: number,
    driver_name:string
    
  ) => {
    try {
    
      const { data, error } = await supabase.from("ride").insert([
        {
          origin_address,
          destination_address,
          origin_latitude,
          origin_longitude,
          destination_latitude,
          destination_longitude,
          ride_date,
          price,
          driver_id,
          seat,
          driver_name,
         
        },
      ]);
  
      if (error) {
        console.error("Error inserting ride:", error);
        return new Response(
          JSON.stringify({ error: "Failed to save ride details" }),
          { status: 500 }
        );
      }
  
      console.log("Ride details saved successfully!");
      return new Response(JSON.stringify({ data }), {
        status: 201,
      });
    } catch (error) {
      console.error("Error saving ride details:", error);
      return new Response(
        JSON.stringify({ error: "An unexpected error occurred" }),
        { status: 500 }
      );
    }
  };
  
  
    export const fetchMyBookings = async (user_id: string) => {
      const { data, error } = await supabase.from('booking').select('*').eq('user_id', user_id);
      if (error) {
        console.error('Error fetching users Booking:', error.message);
        return [];
      }
      return data;
    };

    export const fetchBookingsRequest = async (ride_id: string) => {
      const { data, error } = await supabase.from('booking').select('*').eq('ride_id', ride_id);
      if (error) {
        console.error('Error fetching users Booking:', error.message);
        return [];
      }
      return data;
    };
    
    
    
    export const addBookings= async (ride_id: string, user_id: string, user_name:string,user_email: string,seat:number,status:string,driver_name:string,
      ride_date:string,
      price:number,
      origin_address: string,
      destination_address: string,) => {
        try {
           
            const { error, data } = await supabase.from("booking").insert([
                {
                  ride_id: ride_id, 
                  user_id: user_id, 
                  user_name:user_name,
                  user_email: user_email,
                  seat:seat,
                  status:status,
                  driver_name:driver_name,
                  ride_date:ride_date,
                  price:price,
                  origin_address: origin_address,
                  destination_address: destination_address,
                },
            ]
              );
              
              if (error) {
                console.error("Error inserting Booking:", error);
                return Response.json(
                  { error: "Failed to Make Booking request " },
                  { status: 500 }
                );
              }
              console.log("User Make Booking request  successfully!");
          
              return new Response(
                JSON.stringify({ data }),
                {
                  status: 201,
                }
              );
          
          
        } catch (error) {
          console.error("Error saving user details:", error);
        }
      };



      export const updateBookingStatus = async (ride_id: string,userId:string,status: string
      ) => {
        try {
          // Update the status of the booking
          const { error, data } = await supabase
            .from("booking")
            .update({ status: status }).eq("ride_id", ride_id).eq("user_id",userId) ;   
      
          if (error) {
            console.error("Error updating Booking:", error);
            return new Response(
              JSON.stringify({ error: "Failed to update booking status" }),
              { status: 500 }
            );
          }
      
          console.log("Booking status updated successfully!");
          return new Response(JSON.stringify({ data }), { status: 200 });
        } catch (error) {
          console.error("Error updating booking status:", error);
          return new Response(
            JSON.stringify({ error: "Failed to update booking status" }),
            { status: 500 }
          );
        }
      };
      

      export const updaterideSeat = async (ride_id: string,seat: number
      ) => {
        try {
          // Update the status of the booking
          const { error, data } = await supabase
            .from("ride")
            .update({ occupied_seat: seat }).eq("id", ride_id) ;   
      
          if (error) {
            console.error("Error updating ride:", error);
            return new Response(
              JSON.stringify({ error: "Failed to update ride occupied seat" }),
              { status: 500 }
            );
          }
      
          console.log("ride updated successfully!");
          return new Response(JSON.stringify({ data }), { status: 200 });
        } catch (error) {
          console.error("Error updating rides:", error);
          return new Response(
            JSON.stringify({ error: "Failed to update ride" }),
            { status: 500 }
          );
        }
      };
      




/* CHAT
*/




export const createChat= async (user1:string, user2:string) => {
 
  const orderedUsers = [user1, user2].sort();
  const { data, error } = await supabase
    .from('chat').select('*')
    .eq('user_id1', orderedUsers[0])
    .eq('user_id2', orderedUsers[1]);


  if (data && data.length > 0) {

    return data[0].chat_id;
  } else {
   
    const { data: newConversation, error: insertError } = await supabase
      .from('chat')
      .insert([{ "user_id1": orderedUsers[0], "user_id2": orderedUsers[1] }])
      .select();
    if (insertError) console.error(insertError);
    if(newConversation)
    return newConversation[0].chat_id;
  }
};


export const sendMessage = async (chatId:string, u1:string, content:string) => {
  const { error } = await supabase
    .from('message')
    .insert([{ "chat_id": chatId, "sender": u1, "message":content }]);
  if (error) console.error(error);
};


export const getChat = async (chat_id:string) => {
 
  

  const { data: messages, error: msgError } = await supabase
    .from('message')
    .select('*')
    .eq('chat_id', chat_id)
    .order('send_at', { ascending: true });

  if (msgError) {
    console.error(msgError);
    console.log("getChat");
  }
  return messages || [];
};

export const fetchChats = async (userId:string) => {
   

    const { data, error } = await supabase
      .from("chat")
      .select("chat_id, user_id1, user_id2")
      .or(`user_id1.eq.${userId},user_id2.eq.${userId}`);

    if (error) {
      console.error("Error fetching chats:", error);
      console.log(userId);
      return [];
    } else {
      return data || [];
    }


  };