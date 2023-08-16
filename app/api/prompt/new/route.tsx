import Prompt from "@models/prompt";
import connectDB from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("failed to find prompts", { status: 500 });
  }
};
