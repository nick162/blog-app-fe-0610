import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog,";
import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
import useDeleteBlog from "@/hooks/api/blogs/useDeleteBlog";
import ModalDeletedBlog from "./ModalDeleteBlog";
import { useAuthStore } from "@/store/auth";

interface BlogHeaderProps {
  blog: Blog;
}
const BlogDetailHeader: FC<BlogHeaderProps> = ({ blog }) => {
  const { user } = useAuthStore();
  const { mutateAsync: deleteBlog, isPending } = useDeleteBlog();

  const handleDeleteBlog = async () => {
    await deleteBlog(blog.id);
  };

  return (
    <section className="space-y-2">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {blog.category}
      </Badge>

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <div className="flex items-center justify-between">
        <p className="font-extralight">
          {format(new Date(blog.createdAt), "dd MMM yyy")}-{" "}
          <span className="capitalize">{blog.user?.name}</span>
        </p>

        {user?.id == blog.userId && (
          <ModalDeletedBlog isPending={isPending} onClick={handleDeleteBlog} />
        )}
      </div>
      <div className="relative h-[300px]">
        <Image
          src={blog.thumbnail}
          fill
          className="rounded-sm object-cover"
          alt="thumbnail"
        />
      </div>
    </section>
  );
};

export default BlogDetailHeader;
