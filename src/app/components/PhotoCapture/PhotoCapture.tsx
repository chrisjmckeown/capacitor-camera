import React, { InputHTMLAttributes } from "react";

import { Capacitor } from "@capacitor/core";
import { motion } from "framer-motion";
import { FileUpload } from "../FileUpload/FileUpload";
import { FileAndPhotoUpload } from "../FileAndPhotoUpload/FileAndPhotoUpload";
import { useDevice } from "@/app/hooks/useDevice";

/*
 - Desktop web:
    Photo upload use canvas a
    File upload use <Input type="file" accept="image/*" without capture, which will allow for file upload dialog to open
 - Mobile web:
    Photo & file upload use <Input type="file" accept="image/*" without capture, which will allow for the native camera/file upload methodology to be used
 - Native app:
    Photo upload use <Input type="file" accept="image/*" capture="environment" with capture, which will allow for the camera to be used
*/

export interface PhotoUploaderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  // returns image url
  onCaptureImage: (captureImage: string) => void;
}

export const PhotoCapture: React.FC<PhotoUploaderProps> = ({
  onCaptureImage,
}) => {
  const { isMobile } = useDevice();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col w-full h-full mb-5"
    >
      {!Capacitor.isNativePlatform() && !isMobile && (
        <FileAndPhotoUpload onCaptureImage={onCaptureImage} />
      )}
      {!Capacitor.isNativePlatform() && isMobile && (
        <div className="flex flex-row justify-center">
          <FileUpload onPhotoDataUrlChange={onCaptureImage} />
        </div>
      )}
      {Capacitor.isNativePlatform() && (
        <div className="flex flex-row justify-center">
          <FileUpload
            onPhotoDataUrlChange={onCaptureImage}
            capture={"environment"}
          />
        </div>
      )}
    </motion.div>
  );
};
