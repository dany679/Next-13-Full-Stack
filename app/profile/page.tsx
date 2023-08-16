"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `api/prompt?userId=${userId ?? session?.user?.id}`,
      );
      const data = await response.json();
      setPosts(data);
    };
    session?.user?.id && fetchPost();
    return () => {};
  }, [session?.user?.id, reload, userId]);
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <Profile
      name={
        userId && userId !== session?.user?.id ? "user profile" : "my profile"
      }
      description="this is my profile"
      data={posts}
      fetchUserPost={handleReload}
    />
  );
};

export default ProfilePage;
