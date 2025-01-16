import { supabase  } from "@/utils/superbase";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error, data } = await supabase.from("users").insert([
      {
        clerk_id: clerkId,
        name,
        email,
      },
    ]);

    if (error) {
      console.error("Error inserting user:", error);
      return Response.json(
        { error: "Failed to save user details" },
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ data }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}