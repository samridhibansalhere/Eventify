"use client";
import Steps from "@/components/Steps";
import React, { useEffect } from "react";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";
import { uploadImagesToFirebaseAndGetUrls } from "@/helpers/image-upload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: any;
  type?: "edit" | "create";
}

function EventForm({ initialData, type = "create" }: Props) {
  const [alreadyUploadedImages = [], setAlreadyUploadedImages] = React.useState<
    string[]
  >([]);
  const [activeStep = 0, setActiveStep] = React.useState<number>(0);
  const [newlySelectedImages = [], setNewlySelectedImages] = React.useState<
    any[]
  >([]);
  const [event, setEvent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (type === "create") {
        event.images = await uploadImagesToFirebaseAndGetUrls(
          newlySelectedImages.map((image: any) => image.file)
        );
        await axios.post("/api/admin/events", event);
        toast.success("Event created successfully");
      } else {
        const newlyUploadedImageUrls = await uploadImagesToFirebaseAndGetUrls(
          newlySelectedImages.map((image: any) => image.file)
        );
        event.images = [...alreadyUploadedImages, ...newlyUploadedImageUrls];
        await axios.put(`/api/admin/events/${event._id}`, event);
        toast.success("Event updated successfully");
      }
      router.refresh();
      router.push("/admin/events");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    event,
    setEvent,
    activeStep,
    setActiveStep,
    newlySelectedImages,
    setNewlySelectedImages,

    alreadyUploadedImages,
    setAlreadyUploadedImages,

    loading,
  };

  useEffect(() => {
    if (initialData) {
      setEvent(initialData);
      setAlreadyUploadedImages(initialData.images);
    }
  }, [initialData]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Steps
          stepNames={["General", "Location & Date", "Media", "Tickets"]}
          stepsContent={[
            <General {...commonProps} />,
            <LocationAndDate {...commonProps} />,
            <Media {...commonProps} />,
            <Tickets {...commonProps} />,
          ]}
          activeStep={activeStep}
        />
      </form>
    </div>
  );
}

export default EventForm;