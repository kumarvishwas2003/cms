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
import { Link } from "react-router-dom";
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
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white rounded-t-2xl shadow-md">
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="32" fill="#4F46E5" />
          <rect x="18" y="18" width="28" height="28" rx="8" fill="#fff" />
          <circle cx="32" cy="32" r="8" fill="#4F46E5" />
        </svg>
      </SidebarHeader>
      <SidebarContent className="bg-white/70 backdrop-blur-lg rounded-b-2xl shadow-xl border border-violet-100">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                <IoHomeOutline className="text-[#4F46E5]" />
                <Link
                  to={RouteIndex}
                  className="font-semibold text-gray-700 hover:text-[#4F46E5]"
                >
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                    <GrBlog className="text-[#4F46E5]" />
                    <Link
                      to={RouteBlog}
                      className="font-semibold text-gray-700 hover:text-[#4F46E5]"
                    >
                      Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                    <FaRegComments className="text-[#4F46E5]" />
                    <Link
                      to={RouteCommentDetails}
                      className="font-semibold text-gray-700 hover:text-[#4F46E5]"
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
                  <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                    <BiCategoryAlt className="text-[#4F46E5]" />
                    <Link
                      to={RouteCategoryDetails}
                      className="font-semibold text-gray-700 hover:text-[#4F46E5]"
                    >
                      Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                    <LuUsers className="text-[#4F46E5]" />
                    <Link
                      to={RouteUser}
                      className="font-semibold text-gray-700 hover:text-[#4F46E5]"
                    >
                      Users
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
          <SidebarGroupLabel className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mt-4 mb-2">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton className="hover:bg-violet-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-2">
                    <GoDot className="text-[#4F46E5]" />
                    <Link
                      to={RouteBlogByCategory(category.slug)}
                      className="font-medium text-gray-600 hover:text-[#4F46E5]"
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
