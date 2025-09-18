import ical, { ICalCalendarMethod, ICalEventData } from "ical-generator";
import { NextResponse } from "next/server";
import { events } from "@/lib/events";
import { withBaseUrl } from "@/lib/metadata";

export const runtime = "nodejs";        // ical-generator needs Node APIs
export const dynamic = "force-static";  // prerender at build time

export async function GET() {
  const cal = ical({
    name: "Vegan Future Events",
    description: "Events hosted by Vegan Future in Amsterdam",
    prodId: { company: "Vegan Future", product: "veganfuture.org", language: "EN" },
    method: ICalCalendarMethod.PUBLISH,
    scale: "GREGORIAN", 
    source:  withBaseUrl("events.ics"),
  });

  for (const event of events) {
    const data: ICalEventData = {
      id: `${event.eventId}@veganfuture.org`,     // stable UID
      start: event.startTime,
      end: event.endTime,
      summary: event.title,
      description: event.description,
      location: event.locationTextWithCity,
      url: event.url,
      timezone: event.startTime.timeZone,
    };
    cal.createEvent(data);
  }

  const body = cal.toString();

  return new NextResponse(body, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": 'attachment; filename="events.ics"',
      "cache-control": "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
