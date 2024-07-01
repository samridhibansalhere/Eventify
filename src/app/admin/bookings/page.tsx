import { getMongoDBUserIDOfLoggedInUser } from "@/actions/users";
import PageTitle from "@/components/PageTitle";
import { connectDB } from "@/config/dbConfig";
import { BookingType, EventType } from "@/interfaces/events";
import BookingModel from "@/models/booking-model";
import dayjs from "dayjs";

import React from "react";
import CancelBookingBtn from "./_components/cancel-booking-button";
connectDB();
async function BookingsPage() {
  const bookedEvents: BookingType[] = (await BookingModel.find({})
    .populate("event")
    .populate("user")) as any;

  const getProperty = ({ key, value }: { key: string; value: any }) => {
    return (
      <div>
        <h1 className="font-semibold">{key}</h1>
        <h1 className="text-gray-700 text-sm">{value}</h1>
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="All Bookings" />
      <div className="flex flex-col gap-5 mt-5">
        {bookedEvents.map((booking) => {
          return (
            <div
              key={booking._id}
              className="border border-gray-300 bg-gray-100 flex flex-col gap-5"
            >
              <div className="bg-gray-700 p-3 text-white flex md:flex-row flex-col justify-between md:items-center">
                <div className="lg:w-full">
                  <h1 className="md:text-2xl text-xl font-semibold w-full">
                    {booking.event.name}
                  </h1>
                  <div className="text-sm flex md:flex-row flex-col gap-5 md:gap-10 text-gray-200">
                    <h1>
                      <i className="ri-map-pin-line pr-2"></i>{" "}
                      {booking.event.location}
                    </h1>

                    <h1>
                      <i className="ri-calendar-line pr-2"></i>{" "}
                      {booking.event.date} at {booking.event.time}
                    </h1>
                  </div>
                </div>

                {booking.status !== "cancelled" && (
                  <CancelBookingBtn
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3">
                {getProperty({ key: "Booking Id", value: booking._id })}
                {getProperty({ key: "User Id", value: booking.user._id })}
                {getProperty({
                  key: "User Name",
                  value: booking.user.userName,
                })}
                {getProperty({ key: "Ticket Type", value: booking.ticketType })}
                {getProperty({
                  key: "Tickets Count",
                  value: booking.ticketsCount,
                })}
                {getProperty({
                  key: "Total Price",
                  value: booking.totalAmount,
                })}
                {getProperty({ key: "Payment Id", value: booking.paymentId })}

                {getProperty({
                  key: "Booked On",
                  value: dayjs(booking.createdAt).format("DD/MM/YYYY hh:mm A"),
                })}
                {getProperty({
                  key: "Status",
                  value: booking.status || "booked",
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingsPage;