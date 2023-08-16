import Prompt from "@models/prompt";
import connectDB from "@utils/database";
import { NextRequest } from "next/server";
import { BasicGetIdParams } from "./types";

export const GET = async (req: NextRequest, { params }: BasicGetIdParams) => {
  try {
    await connectDB();
    const search = req.nextUrl?.searchParams.get("search");
    const userId = req.nextUrl?.searchParams.get("userId");

    console.log(search);
    const findPrompt = await Prompt.find(
      userId
        ? {
            creator: userId,
          }
        : {
            $or: [{ tag: { $regex: search } }, { prompt: { $regex: search } }],
          },
    ).populate("creator");

    return new Response(JSON.stringify(findPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to create", { status: 500 });
  }
};
