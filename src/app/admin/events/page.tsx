import PageTitle from "@/components/PageTitle";
import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import Link from "next/link";
import React from "react";
import EventsTable from "./_components/events-table";
import { connectDB } from "@/config/dbConfig";
connectDB();

async function EventsPage() {
  const events: EventType[] = (await EventModel.find().sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Events" />
        <Link
          href="/admin/events/new-event"
          className="bg-primary text-white px-5 py-2 rounded-sm text-sm"
        >
          Create Event
        </Link>
      </div>

      <EventsTable events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}

export default EventsPage;