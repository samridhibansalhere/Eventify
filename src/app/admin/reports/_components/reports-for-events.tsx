"use client";
import { EventType } from "@/interfaces/events";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

function EventsTableForReports({ events }: { events: EventType[] }) {
  const router = useRouter();
  return (
    <div className="mt-5">
      <Table aria-label="Example static collection table" shadow="sm">
        <TableHeader>
          {["Name", "Organizer", "Date", "Time", "Location", "Actions"].map(
            (column) => (
              <TableColumn className="bg-gray-400 text-white" key={column}>
                {column}
              </TableColumn>
            )
          )}
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id!}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.organizer}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => {
                    router.push(`/admin/reports/${event._id}`);
                  }}
                >
                  View Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EventsTableForReports;