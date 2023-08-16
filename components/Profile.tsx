import { useRouter } from "next/navigation";
import { IPost } from "./Feed";
import PromptCardList from "./PromptCardList";

interface IProfileComponent {
  data: IPost[];
  name: string;
  description: string;
  fetchUserPost: () => void;
  // handleEdit: (id: string) => void;
}
const Profile = ({
  name,
  description,
  data,
  fetchUserPost,
}: IProfileComponent) => {
  const router = useRouter();

  // const PromptCardList = () => (
  //   <div className="mt-16 prompt_layout">
  //     {data.map((post) => (
  //       <PromptCard
  //         key={post._id}
  //         post={post}
  //         // handleEdit={() => handleEdit(post._id)}
  //         // handleDelete={() => {}}
  //       />
  //     ))}
  //   </div>
  // );
  return (
    <section className="w-full">
      <h1 className="head_text text_left"> Profile {name}</h1>
      <PromptCardList
        data={data}
        handleTagList={() => {}}
        cbRefresh={() => {
          fetchUserPost();
        }}
      />
    </section>
  );
};

export default Profile;
