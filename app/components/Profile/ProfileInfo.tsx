import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/app/redux/features/user/userApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.svg";
import { styles } from "../styles/styles";

type Props = {
  avatar: string | null;
  user: any;
};

export default function ProfileInfo({ avatar, user }: Props) {
  const [name, setName] = useState(user && user?.name);
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: profileSuccess, error: profileError }] =
    useEditProfileMutation();
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imagehandler = async (event: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const avatar = fileReader.result as string;
      if (fileReader.readyState === 2) {
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || profileSuccess) {
      setLoadUser(true);
    }
    if (error || profileError) {
      console.log("Profile loading error");
    }

    if (profileSuccess) {
      toast.success("Profile updated successfully");
    }
    if (profileError) {
      toast.error("Something went wrong! Your profile not updated");
    }
  }, [isSuccess, error, profileError, profileSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            width={120}
            height={120}
            alt=""
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full "
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imagehandler}
            accept="image/png, image/jpg , image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900  text-white  rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer ">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4 ">
            <div className="w-[100%]">
              <label className="block pb-2 dark:text-white text-black">
                Full Name
              </label>
              <input
                value={name}
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Email Address
              </label>
              <input
                value={user?.email}
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black  rounded-[3px] mt-8 cursor-pointer`}
              required
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
}
