"use client";
import { useGetBlogs } from "@/hooks/api/blogs/useGetBlogs";
import BlogCard from "./BlogCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: blogs, isPending } = useGetBlogs({
    page,
    take: 2,
    search: debounceSearch,
  });
  //   console.log("ini adalah data blog", blogs);

  const onChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <Input
        className="m-10 mx-auto max-w-xl"
        placeholder="Search ...."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading ...</h2>
        </div>
      )}

      {!isPending && !blogs?.data.length && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No data ...</h2>
        </div>
      )}

      {!!blogs && !!blogs.data.length && (
        <>
          <section className="mt-q0 grid grid-cols-3 gap-8">
            {blogs.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
          <PaginationSection
            page={blogs.meta.page}
            take={blogs.meta.take}
            total={blogs.meta.total}
            onChangePage={onChangePage}
          />
        </>
      )}
    </>
  );
};

export default BlogList;
