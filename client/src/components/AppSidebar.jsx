import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
  RouteAdminNotifications,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";
import { MdNotificationsNone } from "react-icons/md";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { data: categoryData } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-[#23263a] shadow-md border-b border-border">
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="32" fill="#001935" />
          <rect x="18" y="18" width="28" height="28" rx="8" fill="#fff" />
          <circle cx="32" cy="32" r="8" fill="#FF61A6" />
        </svg>
      </SidebarHeader>
      <SidebarContent className="bg-[#23263a] text-[#f4f6fb] shadow-xl border border-border">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`hover:bg-accent/20 transition-colors px-3 py-2 flex items-center gap-2 text-[#f4f6fb] ${
                  location.pathname === RouteIndex
                    ? "bg-[#4F46E5] text-white"
                    : ""
                }`}
              >
                <IoHomeOutline className="text-[#4F46E5]" />
                <Link
                  to={RouteIndex}
                  className={`font-semibold ${
                    location.pathname === RouteIndex
                      ? "text-white"
                      : "text-[#f4f6fb] hover:text-[#4F46E5]"
                  }`}
                >
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`hover:bg-accent/20 transition-colors px-3 py-2 flex items-center gap-2 text-[#f4f6fb] ${
                      location.pathname === RouteBlog
                        ? "bg-[#4F46E5] text-white"
                        : ""
                    }`}
                  >
                    <GrBlog className="text-[#4F46E5]" />
                    <Link
                      to={RouteBlog}
                      className={`font-semibold ${
                        location.pathname === RouteBlog
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`hover:bg-accent/20 transition-colors px-3 py-2 flex items-center gap-2 text-[#f4f6fb] ${
                      location.pathname === RouteCommentDetails
                        ? "bg-[#4F46E5] text-white"
                        : ""
                    }`}
                  >
                    <FaRegComments className="text-[#4F46E5]" />
                    <Link
                      to={RouteCommentDetails}
                      className={`font-semibold ${
                        location.pathname === RouteCommentDetails
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      Comments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`hover:bg-accent/20 transition-colors px-3 py-2 flex items-center gap-2 text-[#f4f6fb] ${
                      location.pathname === RouteCategoryDetails
                        ? "bg-[#4F46E5] text-white"
                        : ""
                    }`}
                  >
                    <BiCategoryAlt className="text-[#4F46E5]" />
                    <Link
                      to={RouteCategoryDetails}
                      className={`font-semibold ${
                        location.pathname === RouteCategoryDetails
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`hover:bg-violet-50 transition-colors px-3 py-2 flex items-center gap-2 ${
                      location.pathname === RouteUser
                        ? "bg-[#4F46E5] text-white"
                        : "text-[#f4f6fb]"
                    }`}
                  >
                    <LuUsers className="text-[#4F46E5]" />
                    <Link
                      to={RouteUser}
                      className={`font-semibold ${
                        location.pathname === RouteUser
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`hover:bg-accent/20 transition-colors px-3 py-2 flex items-center gap-2 text-[#f4f6fb] ${
                      location.pathname === RouteAdminNotifications
                        ? "bg-[#4F46E5] text-white"
                        : ""
                    }`}
                  >
                    <MdNotificationsNone className="text-[#4F46E5]" />
                    <Link
                      to={RouteAdminNotifications}
                      className={`font-semibold ${
                        location.pathname === RouteAdminNotifications
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      Admin Notifications
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-[#f4f6fb] uppercase tracking-widest mt-4 mb-2">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton
                    className={`hover:bg-violet-50 transition-colors px-3 py-2 flex items-center gap-2 ${
                      location.pathname === RouteBlogByCategory(category.slug)
                        ? "bg-[#4F46E5] text-white"
                        : "text-[#f4f6fb]"
                    }`}
                  >
                    <GoDot className="text-[#4F46E5]" />
                    <Link
                      to={RouteBlogByCategory(category.slug)}
                      className={`font-medium ${
                        location.pathname === RouteBlogByCategory(category.slug)
                          ? "text-white"
                          : "text-[#f4f6fb] hover:text-[#4F46E5]"
                      }`}
                    >
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
