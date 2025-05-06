import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEvn } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";

const Index = () => {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEvn("VITE_API_BASE_URL")}/blog/blogs`, {
    method: "get",
    credentials: "include",
  });

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-violet-50 to-violet-100 pb-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-12 mb-10 animate-fade-in">
        <Link to={RouteIndex} className="flex items-center gap-3 mb-4">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#4F46E5" />
            <rect x="18" y="18" width="28" height="28" rx="8" fill="#fff" />
            <circle cx="32" cy="32" r="8" fill="#4F46E5" />
          </svg>
          <span
            className="text-4xl font-extrabold text-[#4F46E5] tracking-tight"
            style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
          >
            ContentSphere
          </span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Advanced Content Management Platform
        </h1>
        <p className="text-lg text-gray-500 text-center max-w-xl">
          Create, manage, and share your ideas with a modern, collaborative
          blogging experience. Powered by the MERN stack.
        </p>
      </div>
      {/* Blog Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 animate-fade-in-slow">
          {blogData && blogData.blog.length > 0 ? (
            blogData.blog.map((blog) => (
              <BlogCard key={blog._id} props={blog} />
            ))
          ) : (
            <div>Data Not Found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
