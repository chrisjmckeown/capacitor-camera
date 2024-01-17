import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FileUpload } from "../FileUpload/FileUpload";
import { Button } from "@/components/ui/button";

export interface FileAndPhotoUploadProps
  extends InputHTMLAttributes<HTMLInputElement> {
  // returns image url
  onCaptureImage: (captureImage: string) => void;
}

export const FileAndPhotoUpload: React.FC<FileAndPhotoUploadProps> = ({
  onCaptureImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch {
        setCameraError(true);
      }
    };
    setLoading(true);
    getVideo();
    const stream = videoRef.current?.srcObject;
    setLoading(false);
    return () => {
      if (stream) {
        const tracks = (stream as MediaStream).getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, [videoRef]);

  const onCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (canvas === null || video === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    // video.videoWidth and video.videoHeight are the camera's native width and height, not the rendered components width and height
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL("image/png", 1.0);
    onCaptureImage(photoDataUrl);
  };

  const onImageUpload = (uploadedImage: string) => {
    onCaptureImage(uploadedImage);
  };

  return (
    <>
      {!cameraError && (
        <div className="flex mb-5 justify-center">
          {loading && !videoRef ? (
            <div>Loading...</div>
          ) : (
            <div className="flex justify-center">
              <video
                data-cy="FileAndPhotoUpload-Video"
                style={{ objectFit: "initial" }}
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={true}
              ></video>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-row justify-center gap-x-5">
        {!cameraError && <Button onClick={onCapture}>Camera</Button>}
        <FileUpload onPhotoDataUrlChange={onImageUpload} />
      </div>
    </>
  );
};
