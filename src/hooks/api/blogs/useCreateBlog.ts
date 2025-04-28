"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateBlogPayload {
  title: string;
  category: string;
  description: string;
  thumbnail: File | null;
  content: string;
}

const useCreateBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const createBlogFrom = new FormData();

      createBlogFrom.append("title", payload.title);
      createBlogFrom.append("category", payload.category);
      createBlogFrom.append("description", payload.description);
      createBlogFrom.append("content", payload.content);
      createBlogFrom.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post("/blogs", createBlogFrom);
      return data;
    },
    onSuccess: async () => {
      toast.success("Write a blog Success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
