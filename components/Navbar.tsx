"use client";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  type Repo = {
    name: string;
    id: string;
    stargazers_count: number;
  };
  type T = null;
  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  useLayoutEffect(() => {
    const findProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    findProviders();

    return () => {};
  }, []);

  const UserImage = ({ onClick }: { onClick?: () => void }) => (
    <Image
      src={session?.user?.image ?? "/assets/icons/no-profile.svg"}
      width={37}
      height={37}
      className="rounded-full"
      alt="profile image"
      onClick={onClick && onClick}
    />
  );
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt=" Promtopia logo"
        />
        <p className="logo_text"> Promtopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-3">
            <Link href="/prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <UserImage />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers as Repo[]).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <UserImage onClick={() => setToggleDropdown((prev) => !prev)} />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers as Repo[]).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
