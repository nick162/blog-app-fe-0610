"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Unauthorized from "@/components/Unauthorized";
import { useGetBlogBySlug } from "@/hooks/api/blogs/useGetBlogBySlug";

import useUpdateBlog from "@/hooks/api/blogs/useUpdateBlog";
import { getChangedValues } from "@/utils/getChangedValuse";

import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { ChangeEvent, FC, useRef, useState } from "react";
const TiptapRichtextEditor = dynamic(
  () => import("@/components/TiptapRichtextEditor"),
  { ssr: false },
);

interface EditBlogFormProps {
  slug: string;
}
const EditBlogForm: FC<EditBlogFormProps> = ({ slug }) => {
  const { data: blog, isPending: isPendingGetBlog } = useGetBlogBySlug(slug);
  const { mutateAsync: updateBlog, isPending: isPendingUpdateBlog } =
    useUpdateBlog(blog?.id);
  const session = useSession();

  const initialValues = {
    title: blog?.title || "",
    description: blog?.description || "",
    content: blog?.content || "",
    category: blog?.category || "",
    thumbnail: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = getChangedValues(values, initialValues);

      if (typeof values.thumbnail === "string") {
        delete payload.thumbnail;
      }
      await updateBlog(payload);
    },
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };
  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  if (isPendingGetBlog) {
    return <Loading />;
  }

  if (!blog) {
    return <NoData />;
  }

  if (blog.userId !== Number(session.data?.user.id)) return <Unauthorized />;

  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.title && !!formik.errors.title && (
          <p className="text-xs text-red-600">{formik.errors.title}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          type="text"
          placeholder="category"
          required
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.category && !!formik.errors.category && (
          <p className="text-xs text-red-600">{formik.errors.category}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="description"
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ resize: "none" }}
        />
        {!!formik.touched.description && !!formik.errors.description && (
          <p className="text-xs text-red-600">{formik.errors.description}</p>
        )}
      </div>
      <TiptapRichtextEditor
        label="Content"
        field="content"
        isTouch={formik.touched.content}
        content={formik.values.content}
        onChange={(value: string) => formik.setFieldValue("content", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
      />
      {selectedImage ? (
        <>
          <div className="relative h-[150px] w-[200px]">
            <Image
              src={selectedImage}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <Button variant="destructive" type="button" onClick={removeThumbnail}>
            Remove Image
          </Button>
        </>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
            <p className="text-xs text-red-600">{formik.errors.thumbnail}</p>
          )}
        </div>
      )}
      <div className="flex justify-end">
        <Button
          className="my-10"
          type="submit"
          disabled={isPendingUpdateBlog || !formik.dirty}
        >
          {isPendingUpdateBlog ? "loading" : "submit"}
        </Button>
      </div>
    </form>
  );
};

export default EditBlogForm;
