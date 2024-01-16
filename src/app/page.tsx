"use client";
import { Input } from "@/components/ui/input";
import { useDevice } from "./hooks/useHooks";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default function Home() {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useDevice();
  const [photo, setPhoto] = useState<string | null>(null);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(null);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = image.width;
          canvas.height = image.height;
          context?.drawImage(image, 0, 0, canvas.width, canvas.height);
          const photoDataUrl = canvas.toDataURL("image/png");

          setPhoto(photoDataUrl);
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onPhotoUploadClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const onFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const takePicture = async () => {
    setPhoto(null);
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    var imageUrl = `data:image/png;base64,${image.base64String}`;
    console.log(imageUrl);
    setPhoto(imageUrl);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Hello
        </p>
        {isMobile ? <div>Mobile</div> : <div>Desktop</div>}
        <>
          {isMobile && (
            <>
              <Button onClick={onPhotoUploadClick}>
                Photo upload
                <Input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  ref={photoInputRef}
                  id="photoInput"
                  className="hidden"
                  capture="environment"
                />
              </Button>

              <Button onClick={takePicture}>Take Photo</Button>
            </>
          )}
          <Button onClick={onFileUploadClick}>
            File upload
            <Input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              ref={fileInputRef}
              id="fileInput"
              className="hidden"
              capture="user"
            />
          </Button>
        </>
        <p>{photo?.toString()}</p>
        {photo && (
          <div>
            <p>Selected Image:</p>
            <div className="relative mb-md">
              <img
                data-cy="PhotoCollection-Image"
                src={photo}
                alt={"capture"}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
