"use client";

import { IPrompt } from "@models/prompt";
import { IUser } from "@models/user";
import React, { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

export interface IPost extends IPrompt {
  creator: IUser;
}

// const PromptCardList = ({ data, handleTagList }: ICardList) => (
//   <div className="mt-16 prompt_layout">
//     {data.map((post) => (
//       <PromptCard key={post._id} post={post} handleTagCreator={() => {}} />
//     ))}
//   </div>
// );
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [reload, setReload] = useState(false);

  const [posts, setPosts] = useState([]);
  const handleSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleReload = () => {
    setReload((prev) => !prev);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`api/prompt?search=${searchText}`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPost();
    return () => {};
  }, [searchText, reload]);

  return (
    <section className="feed">
      {/* <ModalDelete
        setOpen={setDeletePromptId}
        open={deletePromptId}
        handleConfirm={handleDeleteModal}
      /> */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search the tag or prompt hi..."
          value={searchText}
          onChange={handleSearchText}
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagList={() => {}}
        cbRefresh={() => {
          handleReload();
        }}
      />
    </section>
  );
};

export default Feed;
