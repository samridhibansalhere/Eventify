import React from "react";
import { EventFormStepProps } from "./General";
import { Button, Input } from "@nextui-org/react";

function LocationAndDate({
  event,
  setEvent,
  activeStep,
  setActiveStep,
}: EventFormStepProps) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Location"
        label="Location"
        value={event?.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        isRequired
        labelPlacement="outside"
      />

      <div className="flex gap-5">
        <Input
          placeholder="Date"
          label="Date"
          isRequired
          labelPlacement="outside"
          value={event?.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          type="date"
          min={today} // Set minimum date to today's date
        />

        <Input
          placeholder="Time"
          label="Time"
          isRequired
          labelPlacement="outside"
          value={event?.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
          type="time"
        />
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
          isDisabled={!event?.location || !event?.date || !event?.time}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LocationAndDate;
