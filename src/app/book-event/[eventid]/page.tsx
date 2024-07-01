import React from "react";
import EventModel from "@/models/event-model";
import { connectDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import TicketSelection from "../_components/ticket-selection";
import BookingModel from "@/models/booking-model";
connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

async function BookEventPage({ params }: Props) {
  const event: EventType = (await EventModel.findById(params.eventid)) as any;
  const eventBookings = await BookingModel.find({
    event: params.eventid,
    status: "booked",
  });

  const getEventProperty = (property: string) => {
    return (
      <div className="flex flex-col text-sm">
        <h1 className="font-semibold capitalize">{property}</h1>
        <h1 className="text-gray-600">{event[property as keyof EventType]}</h1>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-700 p-5 text-white flex flex-col gap-3">
        <h1 className="md:text-3xl text-xl font-semibold">{event.name}</h1>

        <div className="text-sm flex gap-10 text-gray-200">
          <h1>
            <i className="ri-map-pin-line pr-2"></i> {event.location}
          </h1>

          <h1>
            <i className="ri-calendar-line pr-2"></i> {event.date} at{" "}
            {event.time}
          </h1>
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-5 flex-wrap overflow-x-auto mt-7">
          {event.images.map((image) => (
            <img
              src={image}
              alt="Picture of the event"
              height={280}
              width={400}
              className="rounded-l-sm"
            />
          ))}
        </div>

        <p className="text-gray-500 w-full text-sm mt-7">{event.description}</p>

        <div className="mt-7 bg-gray-100 border border-gray-200 p-3 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-5">
          {getEventProperty("organizer")}
          {getEventProperty("location")}
          {getEventProperty("date")}
          {getEventProperty("time")}

          <div className="flex flex-col text-sm">
            <h1 className="font-semibold capitalize">Chief Guests</h1>
            <h1 className="text-gray-600">{event.guests.join(", ")}</h1>
          </div>
        </div>

        <TicketSelection
          event={JSON.parse(JSON.stringify(event))}
          eventBookings={JSON.parse(JSON.stringify(eventBookings))}
        />
      </div>
    </div>
  );
}

export default BookEventPage;