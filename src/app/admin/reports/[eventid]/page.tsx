import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import React from "react";
import BookingModel from "@/models/booking-model";
import { connectDB } from "@/config/dbConfig";

connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

async function EventReportPage({ params }: Props) {
  const event: EventType = (await EventModel.findById(params.eventid)) as any;
  const eventBookings = await BookingModel.find({
    event: params.eventid,
    status: "booked",
  });

  let ticketTypesAndTheirRevenue: any = {};

  eventBookings.forEach((booking) => {
    ticketTypesAndTheirRevenue[booking.ticketType] = {
      ticketsSold: ticketTypesAndTheirRevenue[booking.ticketType]
        ? ticketTypesAndTheirRevenue[booking.ticketType] + booking.ticketsCount
        : booking.ticketsCount,

      revenue: ticketTypesAndTheirRevenue[booking.ticketType]
        ? ticketTypesAndTheirRevenue[booking.ticketType] + booking.totalAmount
        : booking.totalAmount,
    };
  });

  const totalRevenue = Object.keys(ticketTypesAndTheirRevenue).reduce(
    (total, ticketType) => {
      return total + ticketTypesAndTheirRevenue[ticketType].revenue;
    },
    0
  );

  console.log(totalRevenue);

  return (
    <div>
      <div className="bg-gray-700 p-5 text-white flex flex-col gap-3">
        <h1 className="md:text-3xl text-xl font-semibold">{event.name} - Reports</h1>

        <div className="text-sm flex md:flex-row flex-col gap-3 md:gap-10 text-gray-200">
          <h1>
            <i className="ri-map-pin-line pr-2"></i> {event.location}
          </h1>

          <h1>
            <i className="ri-calendar-line pr-2"></i> {event.date} at{" "}
            {event.time}
          </h1>
        </div>
      </div>

      <h1 className="text-2xl font-semibold mt-5">
        Ticket Types and Their Revenues
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        {Object.keys(ticketTypesAndTheirRevenue).map((ticketType) => (
          <div className="p-3 bg-white rounded-sm shadow border">
            <h1 className="font-semibold text-lg">{ticketType}</h1>
            <div className="flex flex-col gap-1 mt-2 font-semibold">
              <span className="text-sm text-gray-600 flex justify-between items-center">
                Tickets Sold{" "}
                <b>{ticketTypesAndTheirRevenue[ticketType].ticketsSold}</b>
              </span>
              <span className="text-sm text-gray-600 flex justify-between items-center">
                Revenue{" "}
                <b>$ {ticketTypesAndTheirRevenue[ticketType].revenue}</b>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-white rounded p-5 flex justify-between">
        <h1 className="text-3xl font-semibold">Total Revenue</h1>
        <h1 className="text-3xl font-semibold">${totalRevenue}</h1>
      </div>
    </div>
  );
}

export default EventReportPage;