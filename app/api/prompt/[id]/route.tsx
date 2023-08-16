import Prompt from "@models/prompt";
import connectDB from "@utils/database";
import { NextRequest } from "next/server";
import { BasicIdParams } from "../types";

export const GET = async (req: NextRequest, { params }: BasicIdParams) => {
  try {
    await connectDB();
    const findPrompt = await Prompt.findById(params?.id);
    if (!findPrompt)
      return new Response(JSON.stringify("prompt not found"), { status: 404 });
    return new Response(JSON.stringify(findPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to found", { status: 500 });
  }
};
export const PATCH = async (req: NextRequest, { params }: BasicIdParams) => {
  try {
    await connectDB();
    const { prompt, tag } = await req.json();

    const findPrompt = await Prompt.findById(params?.id);
    if (!findPrompt)
      return new Response(JSON.stringify("prompt not found"), { status: 404 });
    findPrompt.tag = tag;
    findPrompt.prompt = prompt;
    await findPrompt.save();
    return new Response(JSON.stringify(findPrompt), { status: 202 });
  } catch (error) {
    console.log(error);
    return new Response("failed to create", { status: 500 });
  }
};
export const DELETE = async (req: NextRequest, { params }: BasicIdParams) => {
  try {
    const { userId } = await req.json();
    await connectDB();
    const findPrompt = await Prompt.findOneAndDelete({
      _id: params?.id,
      creator: userId,
    });
    if (!findPrompt)
      return new Response(JSON.stringify("prompt not found"), { status: 404 });
    return new Response(JSON.stringify(findPrompt._doc), { status: 202 });
  } catch (error) {
    console.log(error);
    return new Response("failed to create", { status: 500 });
  }
};
