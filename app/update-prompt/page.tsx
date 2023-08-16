"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface FormStatePrompt {
  prompt: string;
  tag: string;
}
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<FormStatePrompt>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // return;
    setSubmitting(true);

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
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

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      if (response.ok) {
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } else {
        toast.error(response.statusText);
      }
    };
    getPromptDetail();
    return () => {};
  }, [promptId]);

  return (
    <>
      <Toaster />
      <Form
        type={"Edit"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmitting={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
