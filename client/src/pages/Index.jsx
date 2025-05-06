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
    <div className="min-h-screen w-full bg-background pb-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-6 mb-4 animate-fade-in">
        <Link to={RouteIndex} className="flex items-center gap-2 mb-2">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#001935" />
            <rect x="18" y="18" width="28" height="28" rx="8" fill="#fff" />
            <circle cx="32" cy="32" r="8" fill="#FF61A6" />
          </svg>
          <span
            className="text-2xl font-extrabold text-[#f4f6fb] tracking-tight"
            style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
          >
            ContentSphere
          </span>
        </Link>
        <h1 className="text-lg font-bold text-foreground text-center mb-1">
          Advanced Content Management Platform
        </h1>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Create, manage, and share your ideas with a modern, collaborative
          blogging experience.
        </p>
      </div>
      {/* Blog Grid */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 animate-fade-in-slow">
          {blogData && blogData.blog.length > 0 ? (
            blogData.blog.map((blog) => (
              <BlogCard key={blog._id} props={blog} />
            ))
          ) : (
            <div className="text-foreground">Data Not Found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
