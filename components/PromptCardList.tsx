import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPost } from "./Feed";
import ModalDelete from "./Modals/ModalDelete";

import PromptCard from "./PromptCard";
interface ICardList {
  data: IPost[];
  fatherPath?: string;
  handleTagList: () => void;
  cbRefresh: () => void;
}
const PromptCardList = ({ data, handleTagList, cbRefresh }: ICardList) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = async (id: string) => {
    router.push(`/update-prompt?id=${id}`);
  };
  const [deletePromptId, setDeletePromptId] = useState<null | string>(null);
  const handleDelete = (id: string) => {
    setDeletePromptId((prev) => (prev === id ? null : id));
  };
  const handleCopied = (post: IPost) => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const [copied, setCopied] = useState<string>("");

  const handleDeleteModal = async () => {
    try {
      const response = await fetch(`api/prompt/${deletePromptId}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      });
      if (response.ok) {
        cbRefresh();
      }
    } catch (error) {}
  };

  return (
    <>
      <ModalDelete
        setOpen={setDeletePromptId}
        open={deletePromptId}
        handleConfirm={handleDeleteModal}
      />

      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagCreator={() => {}}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default PromptCardList;
