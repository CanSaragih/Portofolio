   // my-portofolio/src/app/api/chat/route.ts
   import { chatWithGemini } from "@/lib/gemini";
   import { NextResponse } from "next/server";

   export async function POST(req: Request) {
     try {
       const { message } = await req.json();
       if (!message || typeof message !== "string") {
         return NextResponse.json(
           { error: "Invalid message" },
           { status: 400 }
         );
       }

       const response = await chatWithGemini(message);
       return NextResponse.json({ response });
     } catch (error) {
       console.error("Error in /api/chat:", error);
       return NextResponse.json(
         { error: "Failed to process chat request" },
         { status: 500 }
       );
     }
   }