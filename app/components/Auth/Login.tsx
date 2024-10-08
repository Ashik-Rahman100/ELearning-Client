"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { signIn } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/styles";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email."),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      // console.log(email, password);
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // setRoute("Home");
      toast.success("Login Successfully");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { handleSubmit, errors, touched, values, handleChange } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with E-Learning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.lebel}`}>Enter Your Email</label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="john@gmail.com"
          className={`${errors.email && touched.email && "border-red-500 "} ${
            styles.input
          }`}
        />

        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block"> {errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.lebel}`}>
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name=""
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password"
            className={`${
              errors.password && touched.password && "border-red-500 "
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 text-white cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            ></AiOutlineEyeInvisible>
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 text-white z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            ></AiOutlineEye>
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block"> {errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with{" "}
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            onClick={() => signIn("google")}
            size={30}
            className="cursor-pointer ml-2"
          />
          <AiFillGithub
            size={30}
            onClick={() => signIn("github")}
            className="cursor-pointer dark:text-white ml-2"
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] dark:text-white">
          Not have any account?
          <span
            onClick={() => setRoute("Sign-Up")}
            className="text-[#2190ff] pl-1 cursor-pointer"
          >
            Sign Up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
