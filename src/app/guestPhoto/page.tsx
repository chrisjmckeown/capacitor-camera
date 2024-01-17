"use client";
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhotoCapture } from "../components/PhotoCapture/PhotoCapture";

const page = {
  question: "Take a photo",
  subquestion: "Take a photo of yourself to be used in the guestbook.",
};

const PhotoGuest = () => {
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    console.log("submit");
  };

  const onClearPhoto = () => {
    setError(null);
    setPhoto(null);
  };

  const onCaptureImage = (newPhotoDataUrl: string) => {
    setError(null);
    setPhoto(newPhotoDataUrl);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-5xl w-full items-center justify-between gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {page.question}
        </h1>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {page.subquestion}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full h-full gap-4">
            {photo ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col w-full h-full gap-4 justify-center"
              >
                <div className="flex justify-center gap-4">
                  <img
                    data-cy="PhotoGuest-Image"
                    src={photo}
                    alt={"capture"}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-row ">
                  <Button onClick={onClearPhoto}>X</Button>
                </div>
              </motion.div>
            ) : (
              <PhotoCapture onCaptureImage={onCaptureImage} />
            )}
          </div>
        </form>
      </div>
    </main>
  );
};
export default PhotoGuest;
