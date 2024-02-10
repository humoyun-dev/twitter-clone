import { NextResponse } from "next/server";
import Post from "@/database/post.model";
import User from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectToDatabase();
    const { postId } = route.params;

    const post = await Post.findById(postId).populate({
      path: "user",
      model: User,
      select: "name email profileImage _id username",
    });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}