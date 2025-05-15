import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const user = useSelector((state) => state.user);

  const handleDelete = (id) => {
    const response = deleteData(
      `${getEvn("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted.");
    } else {
      showToast("error", "Data not deleted.");
    }
  };

  const filteredBlogs =
    blogData && blogData.blog.length > 0
      ? blogData.blog.filter((blog) => {
          if (user.user.role === "admin") return true;
          if (blog.status === "approved") return true;
          if (blog.author && blog.author._id === user.user._id) return true;
          return false;
        })
      : [];

  if (loading) return <Loading />;
  return (
    <div>
      {user.user.role === "admin" && (
        <div style={{ marginBottom: 16 }}>
          <Button asChild>
            <Link to="/blog/admin-notifications">View Admin Notifications</Link>
          </Button>
        </div>
      )}
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author </TableHead>
                <TableHead>Category </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <span style={{ textTransform: "capitalize" }}>
                        {blog.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
