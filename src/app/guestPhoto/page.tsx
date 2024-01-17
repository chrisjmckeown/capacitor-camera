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
    <div>
      <div>{page.question}</div>
      <div>{page.subquestion}</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full h-full mb-5">
          {photo ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col w-full h-full mb-5"
            >
              <div className="flex mb-5 justify-center">
                <img
                  data-cy="PhotoGuest-Image"
                  src={photo}
                  alt={"capture"}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-row justify-center">
                <Button onClick={onClearPhoto}>X</Button>
              </div>
            </motion.div>
          ) : (
            <PhotoCapture onCaptureImage={onCaptureImage} />
          )}
        </div>
      </form>
    </div>
  );
};
export default PhotoGuest;
