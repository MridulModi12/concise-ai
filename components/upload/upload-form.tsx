"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { UploadFormInput } from "@/components/upload/upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

//schema with zod
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields
      const validatedFields = schema.safeParse({ file });

      console.log(validatedFields);

      if (!validatedFields.success) {
        toast.error("Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      const uploadLoader = toast.loading("📄 Uploading PDF...", {
        description: "We are uploading your PDF! ",
      });

      //upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }
      toast.dismiss(uploadLoader);

      const processingLoader = toast.loading("📄 Processing PDF", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      //parse the pdf using langchain
      const result = await generatePdfSummary(resp);
      toast.dismiss(processingLoader);

      const { data = null, message = null } = result || {};

      if (data) {
        const savingLoader = toast.loading("📄 Saving PDF...", {
          description: "Hang tight! We are saving your summary! ✨",
        });
        formRef.current?.reset();
        if (data.summary) {
          //save the summary to the database
        }
      }
      //Summarize the pdf using AI
      //redirect to the [id] summary page
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    }
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
