import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";
const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5 pb-4 px-4 bg-white rounded-2xl shadow-md border border-border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-accent/80 group cursor-pointer">
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 ring-2 ring-accent/40">
                <AvatarImage src={props.author.avatar || usericon} />
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-base">
                  {props.author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {props.author.role === "admin" ? "Admin" : "User"}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/30 text-primary capitalize">
              {props.category?.name || "Category"}
            </span>
          </div>
          <div className="mb-3">
            <img
              src={props.featuredImage}
              className="rounded-xl w-full h-48 object-cover bg-muted"
              alt={props.title}
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-primary mb-2 group-hover:underline">
              {props.title}
            </h2>
            <p className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FaRegCalendarAlt className="text-accent" />
              <span>{moment(props.createdAt).format("DD MMM YYYY")}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
