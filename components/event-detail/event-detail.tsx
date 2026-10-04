import Link from "next/link";
import { format } from "date-fns/format";
import { Event } from "@/lib/events";
import { OutreachDescription } from "@/app/street_outreach/outreach_description";
import { Description } from "@/lib/linkify";

export function EventDetail({ event }: { event: Event }) {
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
        <div className="p-4">
          <Description text={event.description} />
        </div>
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
