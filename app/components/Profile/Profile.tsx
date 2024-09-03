"use client";

import { useLogOutQuery } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SidebarProfile from "./SideBarProfile";

type Props = {};

export default function Profile({ user }: any) {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white light bg-opacity-90 border dark:border-[#ffffff1d] border:[#ffffff1d] rounded-[5px] shadow-md dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } `}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      <div className="w-full h-full  bg-transparent mt-[80px]">
        {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
      </div>
    </div>
  );
}
