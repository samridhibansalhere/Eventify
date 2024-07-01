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
import axios from "axios";
import toast from "react-hot-toast";

function EventsTable({ events }: { events: EventType[] }) {
  const router = useRouter();
  const [selectedIdToDelete, setSelectedIdToDelete] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/events/${id}`);
      toast.success("Event Deleted Successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedIdToDelete("");
      setLoading(false);
    }
  };

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
                <div className="flex gap-5">
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={() => {
                      setSelectedIdToDelete(event._id!);
                      onDelete(event._id!);
                    }}
                    isLoading={loading && selectedIdToDelete === event._id!}
                  >
                    {selectedIdToDelete !== event._id! && (
                      <i className="ri-delete-bin-line"></i>
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/events/edit-event/${event._id}`)
                    }
                  >
                    <i className="ri-pencil-line"></i>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EventsTable;