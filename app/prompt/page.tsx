"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface FormStatePrompt {
  prompt: string;
  tag: string;
}
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<FormStatePrompt>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.id,
          tag: post.tag,
          prompt: post.prompt,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Form
        type={"Create"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmitting={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
