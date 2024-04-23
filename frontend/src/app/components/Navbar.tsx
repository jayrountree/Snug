import React, { MouseEventHandler, useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useParams, usePathname, useRouter } from "next/navigation";
import { User } from "@firebase/auth";

interface NavProps {
  user: User;
  handleSignIn: MouseEventHandler<HTMLButtonElement>;
}
const Navbar: React.FC<NavProps> = ({ user, handleSignIn }) => {
  const router = useRouter();
  const p = usePathname();

  return (
    <div className=" fixed top-0 w-full z-50  bg-green py-2 ">
      <div className=" text-white max-w-7xl m-auto px-4 flex justify-between">
        <button
          onClick={() => {
            if (p != "/") {
              router.push("/");
            }
            window.scrollTo({
              top: 0,
              behavior: "smooth", // Optional, adds smooth scrolling effect
            });
          }}
        >
          Snug
        </button>
        <div className="flex gap-4">
          <button onClick={() => router.push("/upload")}>
            Upload{" "}
            <span>
              <PlusSquareIcon fontSize={22} />
            </span>
          </button>
          {user ? (
            <button onClick={handleSignIn}>Sign Out</button>
          ) : (
            <button onClick={handleSignIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
