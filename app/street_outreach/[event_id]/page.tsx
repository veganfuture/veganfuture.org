import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns/format";
import { events } from "@/lib/events";
import { OutreachDescription } from "../outreach_description";
import { BASE_METADATA } from "@/lib/metadata";
import { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { event_id: string };
}): Promise<Metadata> {
  const event = events.find((e) => e.id.toString() === params.event_id);
  if (!event) return notFound();

  const formattedDate = format(event.startTime, "do MMMM");
  const formattedTime = format(event.startTime, "HH:mm");
  const isCancelled = event.status === "cancelled";
  const title = isCancelled
    ? `CANCELLED: ${event.title}, ${formattedDate} in ${event.locationCity}`
    : `${event.title}, ${formattedDate} in ${event.locationCity}`;
  const description = isCancelled
    ? `This event has been cancelled. The original time was ${formattedDate} at ${formattedTime} in ${event.locationCity} at ${event.locationAddress}.`
    : event.description
      ? event.description
      : `Join Vegan Future on ${formattedDate} at ${formattedTime} in ${event.locationCity} at ${event.locationAddress} for street outreach.`;

  return {
    ...BASE_METADATA,
    title: title,
    description: description,
    openGraph: {
      ...BASE_METADATA.openGraph,
      title: title,
      description: description,
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title: title,
      description: description,
    },
  };
}

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
  const isCancelled = event.status === "cancelled";

  return (
    <>
      <div className="text-2xl font-bold p-4 font-comfortaa">
        {isCancelled ? "CANCELLED: " : ""}
        {event.title}, {format(event.startTime, "do MMMM yyyy")}
      </div>
      {isCancelled ? (
        <div className="mx-4 mb-2 rounded-lg border-2 border-red-700 bg-red-100 px-4 py-3 text-lg font-bold uppercase tracking-wide text-red-900">
          Cancelled
        </div>
      ) : null}
      <div className="p-4">
        {isCancelled ? (
          <>
            This event was planned for{" "}
            <strong>{format(event.startTime, "do MMMM yyyy")}</strong> at{" "}
            <strong>{format(event.startTime, "HH:mm")}</strong> at 📍
            {event.locationUrl ? (
              <Link href={event.locationUrl}>
                {event.locationAddress}, {event.locationCity}
              </Link>
            ) : (
              <span>
                {event.locationAddress}, {event.locationCity}
              </span>
            )}
            . It has been <strong>cancelled</strong>.
          </>
        ) : (
          <>
            Join us on <strong>{format(event.startTime, "do MMMM yyyy")}</strong>{" "}
            for outreach at 📍
            {event.locationUrl ? (
              <Link href={event.locationUrl}>
                {event.locationAddress}, {event.locationCity}
              </Link>
            ) : (
              <span>
                {event.locationAddress}, {event.locationCity}
              </span>
            )}
            . We <strong>start at {format(event.startTime, "HH:mm")}</strong> and
            will continue until {format(event.endTime, "HH:mm")}. Please{" "}
            <Link href="/join_us">join our Signal group</Link> if you intend to
            join.
          </>
        )}
      </div>
      {event.description ? (
        <div className="p-4">{event.description}</div>
      ) : (
        <></>
      )}
      <div className="text-xl font-bold p-4">
        What is it that we do during outreach?
      </div>
      <OutreachDescription />
    </>
  );
}
