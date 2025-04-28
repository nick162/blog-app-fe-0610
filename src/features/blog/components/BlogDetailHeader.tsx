import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog,";
import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface BlogHeaderProps {
  blog: Blog;
}
const BlogDetailHeader: FC<BlogHeaderProps> = ({ blog }) => {
  return (
    <section className="space-y-2">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {blog.category}
      </Badge>

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <p>
        {format(new Date(blog.createdAt), "dd MMM yyy")}- {blog.user?.name}
      </p>

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
