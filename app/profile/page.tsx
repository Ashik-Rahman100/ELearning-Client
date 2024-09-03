"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";

type Props = {};

export default function ProfilePage(props: Props) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} Profile - ELearning`}
          description="E-Learning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
}
