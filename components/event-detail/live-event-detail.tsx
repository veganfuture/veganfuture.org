import Link from "next/link";
import { format } from "date-fns/format";
import { Event } from "@/lib/events";
import { linkify } from "@/lib/linkify";

// Unlike EventDetail (used for our own hand-authored events), this doesn't
// assume the event is a Vegan Future street outreach: the text shown here is
// whatever veganactivists.nl has for the event, not canned outreach copy.
export function LiveEventDetail({ event }: { event: Event }) {
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
        <strong>{format(event.startTime, "do MMMM yyyy")}</strong> from{" "}
        <strong>
          {format(event.startTime, "HH:mm")} to {format(event.endTime, "HH:mm")}
        </strong>{" "}
        at 📍
        <Link href={event.locationUrl}>
          {event.locationAddress}, {event.locationCity}
        </Link>
      </div>
      {event.flyerImageUrl ? (
        <div className="px-4 pb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.flyerImageUrl}
            alt={`Flyer for ${event.title}`}
            className="w-full rounded-lg"
          />
        </div>
      ) : null}
      {event.locationEmbedUrl ? (
        <div className="px-4 pb-4">
          <iframe
            src={event.locationEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${event.locationAddress}, ${event.locationCity}`}
          />
        </div>
      ) : null}
      {event.description ? (
        <div className="p-4 whitespace-pre-line">
          {linkify(event.description)}
        </div>
      ) : null}
      <div className="p-4">
        Want to join? <Link href="/join_us">Join our Signal group</Link>.
      </div>
    </>
  );
}
