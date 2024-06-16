// Import necessary modules and components
"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";
import Logo from "./logo";


// Define the Props interface for the Header component
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

// Define the Header functional component
const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  // Define component state variables using useState hook
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Fetch user data and authentication status using custom hooks
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  // useEffect hook to perform actions on component mount/update
  useEffect(() => {
    // Check if data is loaded and perform necessary actions
    if (!isLoading) {
      if (!userData) {
        if (data) {
          // Perform social authentication and refetch user data
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      // Display success toast if login is successful
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
      // Set logout flag if user data is null, and data and user data are not loading
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading, socialAuth, refetch, isSuccess]);

  // Event handler to close sidebar
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  // Return JSX for the Header component
  return (
    <>
      {
        // Render Loader component if data is loading, else render Header content
        isLoading ? (
          <Loader />
        ) : (
          <div className="w-full relative">
            {/* Render Header with dynamic classes based on scroll and state */}
            <div
              className={`${active
                ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                }`}
            >
              <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                <div className="w-full h-[80px] flex items-center justify-between p-3">
                  <div>
                    <Link
                      href={"/"}
                    >
                      <Logo />
                    </Link>
                  </div>
                  {/* Navigation items and theme switcher */}
                  <div className="flex items-center">
                    <NavItems activeItem={activeItem} isMobile={false} />
                    <ThemeSwitcher />
                    {/* User profile/avatar or login icon */}
                    {userData ? (
                      <Link href={"/profile"}>
                        <Image
                          src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                          alt=""
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] rounded-full cursor-pointer"
                          style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                        />
                      </Link>
                    ) : (
                      <HiOutlineUserCircle
                        size={25}
                        className="hidden 800px:block cursor-pointer dark:text-white text-black"
                        onClick={() => setOpen(true)}
                      />
                    )}
                    {/* Menu icon for mobile */}
                    <div className="800px:hidden ml-2">
                      <HiOutlineMenuAlt3
                        size={25}
                        className="cursor-pointer dark:text-white text-black"
                        onClick={() => setOpenSidebar(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile sidebar */}
              {openSidebar && (
                <div
                  className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                  onClick={handleClose}
                  id="screen"
                >
                  <div className="w-[80%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                      <div className="flex justify-end p-4">
                        <button onClick={() => setOpenSidebar(false)} className="text-black dark:text-white">
                          X
                        </button>
                      </div>
                    <NavItems activeItem={activeItem} isMobile={true} />
                    {/* User profile/avatar or login icon */}
                    {userData?.user ? (
                      <Link href={"/profile"}>
                        <Image
                          src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                          alt=""
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                          style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                        />
                      </Link>
                    ) : (
                      <HiOutlineUserCircle
                        size={25}
                        className="block cursor-pointer dark:text-white text-black ml-[20px]"
                        onClick={() => setOpen(true)}
                      />
                    )}
                    <br />
                    <br />
                    {/* Footer text */}
                    <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                      Copyright © 2024 LearnHub
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Render appropriate modal based on route */}
            {route === "Login" && (
              <>
                {open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Login}
                    refetch={refetch}
                  />
                )}
              </>
            )}
              {route === "SignUp" && (
              <>
                {open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={SignUp}
                      refetch={refetch}
                  />
                )}
              </>
              )}
            {route === "Verification" && (
              <>
                {open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Verification}
                  />
                )}
              </>
            )}
          </div>
        )
      }
    </>
  );
};

export default Header;
