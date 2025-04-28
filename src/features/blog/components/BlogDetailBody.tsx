import Markdown from "@/components/ui/Markdown";
import { Blog } from "@/types/blog,";
import { FC } from "react";

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetailBody: FC<BlogDetailProps> = ({ blog }) => {
  return (
    <section>
      <Markdown content={blog.content} />
    </section>
  );
};

export default BlogDetailBody;
