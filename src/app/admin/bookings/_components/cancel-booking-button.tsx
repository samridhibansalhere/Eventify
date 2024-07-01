"use client";
import { BookingType } from "@/interfaces/events";
import { Button } from "@nextui-org/react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CancelBookingBtn({ booking }: { booking: BookingType }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const cancelBooking = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/bookings/${booking._id}`, {
        status: "cancelled",
      });
      toast.success("Booking Cancelled Successfully");
      router.refresh();
    } catch (error) {
      toast.error("Error Cancelling Booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 flex justify-end w-full">
      <Button color="warning" isLoading={loading} onClick={cancelBooking}>
        Cancel Booking
      </Button>
    </div>
  );
}

export default CancelBookingBtn;