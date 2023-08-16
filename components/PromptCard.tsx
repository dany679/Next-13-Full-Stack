"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { IPost } from "./Feed";

const PromptCard = ({
  post,
  handleTagCreator,
  handleEdit,
  handleDelete,
}: {
  post: IPost;
  handleTagCreator?: (data: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState<string>("");
  const handleCopied = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className={`prompt_card `}>
      <div className="flex items-start justify-start  " onClick={() => {}}>
        <Link
          href={`profile?id=${post.creator?._id}`}
          className="	appearance: none min-w-37 min-h-37  "
        >
          <div className="flex w-full h-full items-center justify-between">
            <Image
              src={post.creator?.image ?? "/assets/icons/no-profile.svg"}
              width={37}
              height={37}
              className="rounded-full object-contain  max-w-fit max-h-fit"
              alt="profile image"
            />
          </div>
        </Link>

        <div className="flex flex-col px-2">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-satoshi font-semibold text-gray-500">
            {post.creator.email}
          </p>
        </div>

        <div className=" flex flex-end w-full " onClick={() => handleCopied()}>
          <div className="bg_btn" onClick={() => handleCopied()}>
            <Image
              src={`/assets/icons/${
                copied === post.prompt ? "tick" : "copy"
              }.svg`}
              width={12}
              height={12}
              alt={`${copied === post.prompt ? "tick" : "copy"}`}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-700 text-sm"> {post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagCreator && handleTagCreator(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creator._id && (
        <div className="flex flex-end gap-2">
          <p
            className="green_gradient font-inter text-sm cursor-pointer"
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className="orange_gradient font-inter text-sm cursor-pointer"
            onClick={() => {
              handleDelete(post._id);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
