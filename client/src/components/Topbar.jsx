import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEvn } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-30 bg-[#23263a] text-[#f4f6fb] px-8 border-b border-border shadow-md rounded-b-2xl">
      <div className="flex justify-center items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden" type="button">
          <AiOutlineMenu />
        </button>
        <Link
          to={RouteIndex}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#4F46E5" />
            <rect x="18" y="18" width="28" height="28" rx="8" fill="#fff" />
            <circle cx="32" cy="32" r="8" fill="#4F46E5" />
          </svg>
          <span
            className="text-2xl font-bold text-[#4F46E5] tracking-tight"
            style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
          >
            ContentSphere
          </span>
        </Link>
      </div>
      <div className="w-[500px]">
        <div
          className={`md:relative md:block absolute bg-white/80 rounded-lg shadow-sm left-0 w-full md:top-0 top-16 md:p-0 p-5 ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <IoMdSearch size={25} />
        </button>

        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="ring-2 ring-violet-200 hover:ring-violet-400 transition-all">
                <AvatarImage src={user.user.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <IoLogOutOutline color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
