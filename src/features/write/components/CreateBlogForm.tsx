"use client";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blogs/useCreateBlog";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import { BlogSchema } from "../schema";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CreateBlogForm = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      thumbnail: null,
    },
    validationSchema: BlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  //   console.log(formik.errors);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangethumbnail = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <form onSubmit={formik.handleSubmit} className="mt-10 space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.title && !!formik.errors.title && (
          <p className="text-xs text-red-500">{formik.errors.title}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">category</Label>
        <Input
          id="category"
          type="text"
          name="category"
          placeholder="category"
          required
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.category && !!formik.errors.category && (
          <p className="text-xs text-red-500">{formik.errors.category}</p>
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
          <p className="text-xs text-red-500">{formik.errors.description}</p>
        )}
      </div>

      <TiptapRichtextEditor
        label="Content"
        content={formik.values.content}
        isTouch={formik.touched.content}
        field="content"
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
            {" "}
            Remove{" "}
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
            onChange={onChangethumbnail}
          />
          {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
            <p className="text-xs text-red-500">{formik.errors.thumbnail}</p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button className="my-10" type="submit" disabled={isPending}>
          {" "}
          {isPending ? "loading" : "Sumbit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
