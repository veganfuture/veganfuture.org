"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

import { OutreachDescription } from "./outreach_description";
import { events } from "@/lib/events";
import { format } from "date-fns/format";

export default function StreetOureach() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event_id') || -1;
  const event = events.find(event => event.id == eventId)

  return (
    <>

      {event ?
        <>
      <div className="text-2xl font-bold p-4">Street outreach, {format(event.startTime, "do MMMM yyyy")}</div>
      <div className="p-4">
            Join us on <strong>{format(event.startTime, "do MMMM yyyy")}</strong> for outreach
            at 📍{event.locationUrl ? <Link href={event.locationUrl}>{event.locationText}</Link> : event.locationText}. We <strong>start at {format(event.startTime, "H:m")}</strong> and will continue until {format(event.endTime, "H:m")}. Please <Link href="/contact">join our WhatsApp group</Link> if you intend to join, so you can stay up to date and get any last minute updates.
          </div>
          <div className="p-4">
            Bonus: If you can bring a tablet with <Link href="/content">outreach content</Link> downloaded on it then that would be great. Don't worry if you don't have a tablet though, we've got you covered!
          </div>
          <div className="text-2xl font-bold p-4">What is it that we do during outreach?</div>
        </>
        :       <div className="text-2xl font-bold p-4">Street outreach</div>}
      <OutreachDescription />
    </>
  );
}
