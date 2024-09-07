import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import avatarDefault from "../../../../public/assets/avatar.svg";

import {
  BarChart,
  ManageHistory,
  MapOutlined,
  OndemandVideo,
  People,
  SettingsOutlined,
  VideoCall,
  Web,
  Wysiwyg,
} from "@mui/icons-material";
import Image from "next/image";
import {
  AddHomeOutlinedIcon,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  Groups,
  ReceiptOutlined,
} from "../../../components/Admin/sidebar/Icon";

interface IItemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: IItemsProps) => {
  return (
    <MenuItem
      onClick={() => setSelected(title)}
      active={selected === title}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins dark:text-white text-black">
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

export default function AdminSidebar() {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `
        ${theme === "dark" ? "#111C43  !important" : "#fff !important"},
        `,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`,
        },
        "& .pro-inner-item:hover": {
          color: `#868dfb !important`,
        },
        "& .pro-menu-item.active": {
          color: `#6870fa !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                ml={"15px"}
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosNewOutlined className="text-black dark:text-[#ffffffc1] " />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb={"25px"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  alt="Profile-user"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign={"center"}>
                <Typography
                  variant="h4"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] dark:text-white text-black"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] dark:text-white text-black capitalize "
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? "undefined" : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<AddHomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Course"
              to="/admin/courses"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<People />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Course Analytics"
              to="/admin/courses-analytics"
              icon={<BarChart />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{
                m: "15px 0 5px 25px",
              }}
              className="!text-[18px]  text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}
