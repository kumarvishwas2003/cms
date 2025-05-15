import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";
import Category from "../models/category.model.js";
import Notification from "../models/notification.model.js";

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "yt-mern-blog",
          resource_type: "auto",
        });
        featuredImage = uploadResult.secure_url;
      } catch (error) {
        return next(handleError(500, "Image upload failed: " + error.message));
      }
    } else {
      // Optionally, set a default image or handle missing image gracefully
      featuredImage = ""; // or a default image URL
    }

    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
      status: "pending",
    });

    await blog.save();
    console.log("Blog created:", blog);

    // Add try-catch for notification creation
    try {
      const notification = await Notification.create({
        type: "new_post",
        message: `A new blog post titled '${blog.title}' is awaiting approval.`,
        post: blog._id,
      });
      console.log("Notification created:", notification);
    } catch (notifErr) {
      console.error("Notification creation failed:", notifErr);
    }

    res.status(200).json({
      success: true,
      message: "Blog added successfully and is pending admin approval.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      next(handleError(404, "Data not found."));
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featuredImage = blog.featuredImage;

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "yt-mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    blog.featuredImage = featuredImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog Deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const user = req.user;
    let blog;
    if (user.role === "admin") {
      blog = await Blog.find()
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } else {
      blog = await Blog.find({
        $or: [{ author: user._id }, { status: "approved" }],
      })
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category, blog } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found.");
    }
    const categoryId = categoryData._id;
    const relatedBlog = await Blog.find({
      category: categoryId,
      slug: { $ne: blog },
    })
      .lean()
      .exec();
    res.status(200).json({
      relatedBlog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found.");
    }
    const categoryId = categoryData._id;
    const blog = await Blog.find({ category: categoryId })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
      categoryData,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find({ status: "approved" })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getPendingBlogs = async (req, res, next) => {
  try {
    // Only admin should access this
    if (req.user.role !== "admin") {
      return next(handleError(403, "Access denied."));
    }
    const blogs = await Blog.find({ status: "pending" })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ blogs });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const approveBlog = async (req, res, next) => {
  try {
    console.log("approveBlog called, req.user:", req.user);
    if (req.user.role !== "admin") {
      return next(handleError(403, "Access denied."));
    }
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      blogid,
      { status: "approved" },
      { new: true }
    );
    if (!blog) return next(handleError(404, "Blog not found."));
    res.status(200).json({ success: true, message: "Blog approved." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const denyBlog = async (req, res, next) => {
  try {
    console.log("denyBlog called, req.user:", req.user);
    if (req.user.role !== "admin") {
      return next(handleError(403, "Access denied."));
    }
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      blogid,
      { status: "denied" },
      { new: true }
    );
    if (!blog) return next(handleError(404, "Blog not found."));
    res.status(200).json({ success: true, message: "Blog denied." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
