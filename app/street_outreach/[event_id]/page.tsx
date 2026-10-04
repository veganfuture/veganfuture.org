import { notFound } from "next/navigation";
import { format } from "date-fns/format";
import { events } from "@/lib/events";
import { EventDetail } from "@/components/event-detail/event-detail";
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

  return <EventDetail event={event} />;
}
