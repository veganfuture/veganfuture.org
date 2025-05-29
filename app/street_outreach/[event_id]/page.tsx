import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns/format";
import { events } from "@/lib/events";
import { OutreachDescription } from "../outreach_description";

export async function generateStaticParams() {
  return events.map((event) => ({ event_id: event.id.toString() }));
}

export default function EventPage({
  params,
}: {
  params: { event_id: string };
}) {
  const event = events.find((e) => e.id.toString() === params.event_id);
  if (!event) return notFound();

  return (
    <>
      <div className="text-2xl font-bold p-4 font-comfortaa">
        Street outreach, {format(event.startTime, "do MMMM yyyy")}
      </div>
      <div className="p-4">
        Join us on <strong>{format(event.startTime, "do MMMM yyyy")}</strong>{" "}
        for outreach at 📍
        {event.locationUrl ? (
          <Link href={event.locationUrl}>{event.locationText}</Link>
        ) : (
          event.locationText
        )}
        . We <strong>start at {format(event.startTime, "H:m")}</strong> and will
        continue until {format(event.endTime, "H:m")}. Please{" "}
        <Link href="/contact">join our WhatsApp group</Link> if you intend to
        join.
      </div>
      <div className="p-4">
        Bonus: If you can bring a tablet with{" "}
        <Link href="/content">outreach content</Link> downloaded on it, that
        would be great.
      </div>
      <div className="text-xl font-bold p-4">
        What is it that we do during outreach?
      </div>
      <OutreachDescription />
    </>
  );
}
