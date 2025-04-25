import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Blog } from "@/types/blog,";
import { FC } from "react";

interface BlogCardsProps {
  blog: Blog;
}
const BlogCard: FC<BlogCardsProps> = ({ blog }) => {
  return (
    <Card>
      <CardHeader>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
          <Image
            src={blog.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="text-lg font-semibold">
        <Badge
          variant="outline"
          className="rounded-lg bg-green-100 text-green-600 capitalize"
        >
          {blog.category}
        </Badge>

        <p>{blog.title}</p>

        <p className="mt-1 text-sm font-light">{blog.user?.name}</p>

        <p className="line-clamp-4">{blog.description}</p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
