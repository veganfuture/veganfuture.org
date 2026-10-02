import { TZDate } from "@date-fns/tz";
import { Event, getEventIcon } from "./events";
import { withBaseUrl } from "./metadata";

// This is called client-side (see lib/use-vegan-future-outreach-events.ts).
// veganactivists.nl sends `Access-Control-Allow-Origin: https://veganfuture.org`
// on GET /api/events to allow that, since that endpoint is otherwise only
// used server-to-server by the Signal bot.
const VEGANACTIVISTS_EVENTS_API_URL = "https://veganactivists.nl/api/events";

// Vegan Future's organization id on veganactivists.nl, used to filter the
// otherwise site-wide /api/events feed down to Vegan Future's own events.
// The public events API doesn't expose an org-slug filter (organizerOrgSlug
// is always null on that endpoint), so this id was found by matching Vegan
// Future's known events against
// https://veganactivists.nl/nl/organizations/vegan-future.
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
  locationLat: number | null;
  locationLng: number | null;
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

// Imported events carry over a leaked link back to their old
// veganfuture.org/street_outreach/N page as a first line, and use the
// placeholder text below when there never was a description. Both are
// import artifacts, not real content, so strip them before displaying.
function cleanDescription(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.replace(/^https?:\/\/\S+\n/, "").trim();
  return trimmed && trimmed !== "(No description available)"
    ? trimmed
    : undefined;
}

function toEvent(event: VeganActivistsEvent, idx: number): Event {
  const locationCity = event.municipalityName || "Amsterdam";
  const title =
    event.titleEn || event.titleNl || `Street Outreach (${locationCity})`;
  // Vegan Future's org feed isn't exclusively Street Outreach (e.g. a demo
  // it co-organizes could show up here too), so only treat it as outreach -
  // with the outreach icon and listing on /street_outreach - when the title
  // says so; anything else falls back to a generic "other" event.
  const type = /outreach/i.test(title) ? "outreach" : "other";

  // Shown as a veganfuture.org page rather than linking out to
  // veganactivists.nl - see app/street_outreach/view/page.tsx, which looks
  // this event back up by slug client-side.
  const url = withBaseUrl(`/street_outreach/view?slug=${event.slug}`);
  const locationUrl =
    event.locationLat != null && event.locationLng != null
      ? `https://www.google.com/maps/search/?api=1&query=${event.locationLat},${event.locationLng}`
      : `https://veganactivists.nl/nl/events/${event.slug}`;

  return {
    type,
    status: event.status === "cancelled" ? "cancelled" : "scheduled",
    startTime: new TZDate(event.startAt, "Europe/Amsterdam"),
    endTime: new TZDate(event.endAt || event.startAt, "Europe/Amsterdam"),
    locationAddress: stripTrailingCity(
      event.locationDescription,
      event.municipalityName,
    ),
    locationCity,
    locationUrl,
    url,
    title,
    description:
      cleanDescription(event.descriptionEn) ||
      cleanDescription(event.descriptionNl),
    icon: getEventIcon(type),
    // Negative, since ids assigned locally in lib/events.tsx start at 0.
    id: -(idx + 1),
    eventId: `veganactivists-${event.slug}`,
  };
}

/**
 * Fetches Vegan Future's street outreach events straight from
 * veganactivists.nl, so new events show up here without a deploy.
 */
export async function fetchVeganFutureOutreachEvents(): Promise<Event[]> {
  const url = new URL(VEGANACTIVISTS_EVENTS_API_URL);
  url.searchParams.set("orgIds", VEGAN_FUTURE_ORG_ID);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch events from veganactivists.nl: ${response.status}`,
    );
  }
  const data: ListEventsResponse = await response.json();

  // Don't filter out cancelled events - they're still shown, just marked as
  // cancelled. Only draft/hidden events (not meant to be public) are dropped;
  // the `orgIds` filter above already means every event here is ours.
  return data.events
    .filter((event) => event.status !== "draft" && event.status !== "hidden")
    .map(toEvent);
}
