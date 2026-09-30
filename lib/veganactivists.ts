import { TZDate } from "@date-fns/tz";
import { Event, getEventIcon } from "./events";

// This is called client-side (see lib/use-vegan-future-outreach-events.ts),
// which requires veganactivists.nl to send an
// `Access-Control-Allow-Origin: https://veganfuture.org` (or `*`) header on
// GET /api/events - it doesn't today, since that endpoint is otherwise only
// used server-to-server by the Signal bot.
const VEGANACTIVISTS_EVENTS_API_URL = "https://veganactivists.nl/api/events";

// Vegan Future's organization id on veganactivists.nl. The public events API
// doesn't expose an org-slug filter (organizerOrgSlug is always null on that
// endpoint), so this id was found by matching Vegan Future's known events
// against https://veganactivists.nl/nl/organizations/vegan-future.
const VEGAN_FUTURE_ORG_ID = "7ee05a90-135c-43d9-9f7a-28a7d88dc871";

type VeganActivistsEvent = {
  slug: string;
  titleNl: string | null;
  titleEn: string | null;
  descriptionNl: string | null;
  descriptionEn: string | null;
  startAt: string;
  endAt: string | null;
  municipalityName: string | null;
  locationDescription: string;
  publisherOrgId: string | null;
  status: "draft" | "hidden" | "visible" | "cancelled";
};

type ListEventsResponse = {
  events: VeganActivistsEvent[];
};

function stripTrailingCity(
  locationDescription: string,
  municipalityName: string | null,
): string {
  if (!municipalityName) return locationDescription;
  const suffix = `, ${municipalityName}`;
  return locationDescription.endsWith(suffix)
    ? locationDescription.slice(0, -suffix.length)
    : locationDescription;
}

function toEvent(event: VeganActivistsEvent, idx: number): Event {
  const locationCity = event.municipalityName || "Amsterdam";
  const eventUrl = `https://veganactivists.nl/nl/events/${event.slug}`;

  return {
    type: "outreach",
    status: event.status === "cancelled" ? "cancelled" : "scheduled",
    startTime: new TZDate(event.startAt, "Europe/Amsterdam"),
    endTime: new TZDate(event.endAt || event.startAt, "Europe/Amsterdam"),
    locationAddress: stripTrailingCity(
      event.locationDescription,
      event.municipalityName,
    ),
    locationCity,
    locationUrl: eventUrl,
    url: eventUrl,
    title: event.titleEn || event.titleNl || `Street Outreach (${locationCity})`,
    description: event.descriptionEn || event.descriptionNl || undefined,
    icon: getEventIcon("outreach"),
    // Negative, since ids assigned locally in lib/events.tsx start at 0.
    id: -(idx + 1),
    eventId: `outreach-${event.slug}`,
  };
}

/**
 * Fetches Vegan Future's street outreach events straight from
 * veganactivists.nl, so new events show up here without a deploy.
 */
export async function fetchVeganFutureOutreachEvents(): Promise<Event[]> {
  const response = await fetch(VEGANACTIVISTS_EVENTS_API_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch events from veganactivists.nl: ${response.status}`,
    );
  }
  const data: ListEventsResponse = await response.json();

  return data.events
    .filter((event) => event.publisherOrgId === VEGAN_FUTURE_ORG_ID)
    .filter((event) => event.status === "visible" || event.status === "cancelled")
    .map(toEvent);
}
