import React, { useRef } from "react";
import { EventFormStepProps } from "./General";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast/headless";

function Media({
  newlySelectedImages,
  setNewlySelectedImages,
  event,
  activeStep,
  setActiveStep,
  alreadyUploadedImages,
  setAlreadyUploadedImages,
}: EventFormStepProps) {
  const uploadFilesRef = useRef<HTMLInputElement>(null);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      const filesArray = Array.from(files || []);

      // Set the newly selected images with URLs
      const existingNewlySelectedImages = newlySelectedImages || [];
      const newImages = filesArray.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setNewlySelectedImages([...existingNewlySelectedImages, ...newImages]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onNewUploadedRemove = (index: number) => {
    const tempImages = [...newlySelectedImages];
    tempImages.splice(index, 1);
    setNewlySelectedImages(tempImages);
  };

  const onAlreadyUploadedRemove = (index: number) => {
    const tempImages = [...alreadyUploadedImages];
    tempImages.splice(index, 1);
    setAlreadyUploadedImages(tempImages);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 flex-wrap">
        {alreadyUploadedImages?.map((image, index) => (
          <div key={index} className="border flex flex-col gap-5 rounded pb-5">
            <img
              src={image}
              alt="already uploaded"
              className="w-40 h-40 object-cover"
            />
            <h1
              className="text-center cursor-pointer text-sm underline"
              onClick={() => onAlreadyUploadedRemove(index)}
            >
              Remove
            </h1>
          </div>
        ))}
        {newlySelectedImages?.map((image, index) => (
          <div key={index} className="border flex flex-col gap-5 rounded pb-5">
            <img
              src={image.url}
              alt="newly selected"
              className="w-40 h-40 object-cover"
            />
            <h1
              className="text-center cursor-pointer text-sm underline"
              onClick={() => onNewUploadedRemove(index)}
            >
              Remove
            </h1>
          </div>
        ))}
        <div
          className="border border-dashed border-gray-400 p-5 flex flex-col items-center justify-center cursor-pointer w-40 h-40 rounded"
          onClick={() => uploadFilesRef.current?.click()}
          style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
        >
          <input
            type="file"
            ref={uploadFilesRef}
            hidden
            multiple
            onChange={onFileSelect}
          />
          <div style={{ fontSize: '32px', color: 'rgba(0, 0, 0, 0.45)' }}>
            +
          </div>
          <div style={{ marginTop: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>
            Upload Media
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)} color="primary">
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
