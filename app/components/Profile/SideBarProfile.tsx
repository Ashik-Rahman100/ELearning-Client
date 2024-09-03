import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import avatarDefault from "../../../public/assets/avatar.svg";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

export default function SidebarProfile({
  user,
  active,
  setActive,
  avatar,
  logOutHandler,
}: Props) {
  return (
    <div className="w-full ">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 light:bg-white" : "bg-transparent"
        } `}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          className="w-[20px] h-[20px] 800px:h-[30px] 800px:w-[30px] cursor-pointer rounded-full "
          alt={`${user.name} picture`}
          width={20}
          height={20}
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white light:text-black ">
          My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 light:bg-white" : "bg-transparent"
        } `}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 light:bg-white" : "bg-transparent"
        } `}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 light:bg-white" : "bg-transparent"
        } `}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Log Out
        </h5>
      </div>
    </div>
  );
}
