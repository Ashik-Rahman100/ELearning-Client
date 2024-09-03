import { useUpdatePasswordMutation } from "@/app/redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { styles } from "../styles/styles";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Password does not match");
    } else {
      await updatePassword({ variables: { oldPassword, newPassword } });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      //   setNewPassword("");
      //   setOldPassword("");
      //   setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full pl-4 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="old_password"
              className="block pb-2 text-gray-700 dark:text-gray-200"
            >
              Enter Your Old Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-white`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="old_password"
              className="block pb-2 text-gray-700 dark:text-gray-200"
            >
              Enter Your New Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-white`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="old_password"
              className="block pb-2 text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-white`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%]  h-[40px] border border-[#37a39a] text-center dark:text-white text-black  rounded-[3px] mt-8 cursor-pointer`}
              required
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
