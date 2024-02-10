"use client";

import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import usePosts from "@/hooks/use-posts";
import { IPost } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PostItem from "@/components/shared/post-item";

const HomePage = () => {
  const { data: session, status }: any = useSession();
  const { data, isLoading } = usePosts();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <>
      <Header label="Home" />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Form
            placeholder="What's on your mind?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            setPosts={setPosts}
          />
          {posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              user={JSON.parse(JSON.stringify(session.currentUser))}
              setPosts={setPosts}
            />
          ))}
        </>
      )}
    </>
  );
};

export default HomePage;
