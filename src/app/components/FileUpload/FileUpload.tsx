import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { InputHTMLAttributes, useRef } from "react";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  // returning image url
  onPhotoDataUrlChange: (photoDataUrl: string) => void;
  // cature image setting
  capture?: "user" | "environment";
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onPhotoDataUrlChange,
  capture = null,
  accept = "image/*",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          onPhotoDataUrlChange(reader.result);
        }
      };
    }
  };

  const onFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Button onClick={onFileUploadClick}>
      File
      <Input
        type="file"
        {...(accept ? { accept: accept } : {})}
        {...(capture ? { capture: capture } : {})}
        onChange={onImageUpload}
        ref={fileInputRef}
        id="fileInput"
        className="hidden"
      />
    </Button>
  );
};
