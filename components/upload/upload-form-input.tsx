// "use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { RefObject } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref: RefObject<HTMLFormElement | null>;
  isLoading: boolean;
}

export function UploadFormInput({
  onSubmit,
  ref,
  isLoading,
}: UploadFormInputProps) {
  return (
    <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex items-center justify-end gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "cursor-not-allowed opacity-50")}
          disabled={isLoading}
        />

        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Upload your pdf"
          )}
        </Button>
      </div>
    </form>
  );
}
