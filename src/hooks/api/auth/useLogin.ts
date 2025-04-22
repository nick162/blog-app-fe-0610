"use client";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Login success");
      // router.push("/login"); // ganti ini kalau mau redirect ke halaman lain
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.massage);
    },
  });
};

export default useLogin;
