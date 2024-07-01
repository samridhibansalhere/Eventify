import React from "react";
import { Button, Input, Textarea, Chip } from "@nextui-org/react";

export interface EventFormStepProps {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  newlySelectedImages: any[];
  setNewlySelectedImages: React.Dispatch<React.SetStateAction<any[]>>;

  alreadyUploadedImages: string[];
  setAlreadyUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  loading : boolean;
}

function General({
  event,
  activeStep,
  setActiveStep,
  setEvent,
}: EventFormStepProps) {
  const [guest, setGuest] = React.useState<string>("");
  const getCommonProps = (name: string) => {
    return {
      labelPlacement: "outside",
      value: event?.[name],
      onChange: (e: any) => setEvent({ ...event, [name]: e.target.value }),
      isRequired: true,
    } as any;
  };

  const onGuestAdd = () => {
    const newGuests = [];
    const commaSeparatedGuests = guest.split(",");

    // if there are more than one guest in the input , use them
    if (commaSeparatedGuests.length > 1) {
      newGuests.push(...commaSeparatedGuests);
    } else {
      // add the single guest
      newGuests.push(guest);
    }

    // check if there are already guests in the event
    if (event?.guests) {
      newGuests.push(...event.guests);
    }

    setEvent({ ...event, guests: newGuests });
    setGuest("");
  };

  const onGuestRemove = (guestToRemove: number) => {
    const newGuests = event?.guests?.filter(
      (_: string, index: number) => index !== guestToRemove
    );

    setEvent({ ...event, guests: newGuests });
  };

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Event Name"
        placeholder="Enter event name"
        {...getCommonProps("name")}
      />

      <Input
        label="Organizer"
        placeholder="Enter organizer name"
        {...getCommonProps("organizer")}
      />

      <Textarea
        placeholder="Enter description"
        label="Description"
        {...getCommonProps("description")}
      />

      <div className="flex gap-5 items-end">
        <Input
          placeholder="Enter your guests"
          label="Guests"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          labelPlacement="outside"
        />
        <Button onClick={onGuestAdd}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((guest: string, index: number) => (
          <Chip onClose={() => onGuestRemove(index)}>{guest}</Chip>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => {}}>Cancel</Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
          isDisabled={!event?.name || !event?.organizer || !event?.description}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default General;