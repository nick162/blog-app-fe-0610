import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const BlogSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),

  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),

  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),

  content: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),

  category: Yup.string().required("Category is required"),

  //   userId: Yup.number()
  //     .required("User ID is required")
  //     .positive("User ID must be a positive number")
  //     .integer("User ID must be an integer"),
});
