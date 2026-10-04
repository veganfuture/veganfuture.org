import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { parse } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { withBaseUrl } from "./metadata";

// from https://stackoverflow.com/a/54178819/1860591
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Location = "EAO" | "buurtsalon" | "pdz";

export type EventType = "outreach" | "vaam" | "raaf" | "community" | "other";
export type EventStatus = "scheduled" | "cancelled";

export type Event = {
  startTime: TZDate;
  endTime: TZDate;
  type: EventType;
  status: EventStatus;
  location?: Location;
  locationUrl: string;
  locationEmbedUrl?: string;
  flyerImageUrl?: string;
  locationAddress: string;
  locationCity: string;
  url: string;
  description?: string;
  icon: React.ReactNode;
  id: number;
  title: string;
  eventId: string;
};

type PartialEVent = PartialBy<
  Omit<Event, "id">,
  | "url"
  | "locationUrl"
  | "icon"
  | "locationAddress"
  | "locationCity"
  | "title"
  | "eventId"
  | "status"
>;

/**
 * Parse "24-01-2025 18:30" as Amsterdam wall-clock time
 * and return a TZDate bound to Europe/Amsterdam.
 */
const fromAmsTime = (str: string): TZDate => {
  const parsed = parse(str, "d-M-yyyy H:mm", new Date());

  // reconstruct as TZDate in Europe/Amsterdam
  return new TZDate(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
    parsed.getHours(),
    parsed.getMinutes(),
    "Europe/Amsterdam",
  );
};
export function getEventByEventId(eventId: string): Event | undefined {
  return events.find((event) => event.eventId == eventId);
}

// Includes cancelled events - callers decide whether/how to show them
// (e.g. the agenda marks them as cancelled rather than hiding them).
export function getListedEvents(): Event[] {
  return events;
}

/**
 * Street outreach ("outreach") events used to be hardcoded here too, but are
 * now fetched client-side from veganactivists.nl instead - see
 * lib/veganactivists.ts. This file only keeps events that don't have a
 * matching entry over there (VAAM meetups, RAAF editions, one-off community
 * events with their own write-up page).
 */
export const events: Event[] = populate([
  {
    type: "vaam",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305133967/",
    location: "EAO",
    startTime: fromAmsTime("24-01-2025 18:30"),
    endTime: fromAmsTime("24-01-2025 21:00"),
    description:
      "A meetup for activists in Amsterdam to come together, inspire each other and talk strategy.",
  },
  {
    type: "raaf",
    title: "RAAF #1",
    url: "/raaf/1",
    location: "buurtsalon",
    startTime: fromAmsTime("23-5-2025 18:30"),
    endTime: fromAmsTime("23-5-2025 21:30"),
    eventId: "raaf1",
  },
  {
    type: "raaf",
    title: "RAAF #2",
    url: "/raaf/2",
    location: "buurtsalon",
    startTime: fromAmsTime("22-8-2025 18:30"),
    endTime: fromAmsTime("22-8-2025 21:30"),
    eventId: "raaf2",
  },
  {
    type: "raaf",
    location: "buurtsalon",
    title: "RAAF 3rd edition",
    startTime: fromAmsTime("28-11-2025 18:30"),
    endTime: fromAmsTime("28-11-2025 21:30"),
    url: "/raaf/3",
    eventId: "raaf3",
  },
  {
    type: "community",
    title: "Activism Joined Forces",
    locationAddress: "In front of the McDonalds Albert Cuypstraat",
    locationCity: "Amsterdam",
    locationUrl: "https://maps.app.goo.gl/yds8tbYXDYdrX6f17",
    url: "/events/activism_joined_forces",
    startTime: fromAmsTime("18-01-2026 13:00"),
    endTime: fromAmsTime("18-01-2026 20:30"),
  },
  {
    type: "raaf",
    location: "pdz",
    title: "RAAF 4th edition",
    startTime: fromAmsTime("22-05-2026 18:30"),
    endTime: fromAmsTime("22-05-2026 21:30"),
    url: "/raaf/4",
    eventId: "raaf4",
  },
]);

/**
 * Automatically populates the events with a bunch of properties that
 * I don't want to repeat and am afraid to mess up :)
 */
function populate(events: PartialEVent[]): Event[] {
  return events.map((event, idx) => {
    const relUrl = (event.url || getUrl(event.type))?.replace(
      "[event_id]",
      idx.toString(),
    );
    if (!relUrl) throw new Error(`Missing url for event ${event}`);

    const locationUrl =
      event.locationUrl || (event.location && getLocationUrl(event.location));
    const locationAddress =
      event.locationAddress ||
      (event.location && getLocationAddress(event.location));
    const locationCity =
      event.locationCity || (event.location && getLocationCity(event.location));
    if (!locationUrl)
      throw new Error(
        `Event ${JSON.stringify(event)} is missing a location url`,
      );
    if (!locationCity)
      throw new Error(
        `Event ${JSON.stringify(event)} is missing a location city`,
      );
    if (!locationAddress)
      throw new Error(
        `Event ${JSON.stringify(event)} is missing a location text`,
      );
    const title = event.title || getEventTitle(event.type, locationCity);
    if (title === undefined) {
      throw new Error(`Event ${JSON.stringify(event)} does not have a title!`);
    }
    const url = withBaseUrl(relUrl);

    return {
      ...event,
      id: idx,
      locationUrl: locationUrl,
      locationAddress: locationAddress,
      locationCity: locationCity,
      icon: event.icon || getEventIcon(event.type),
      status: event.status || "scheduled",
      title: title,
      url: url,
      eventId: event.eventId || getEventId(event.type, idx),
    };
  });
}

function getEventId(eventType: EventType, id: number): string {
  return `${eventType}${id}`;
}

function getEventTitle(
  eventType: EventType,
  locationCity: string,
): string | undefined {
  switch (eventType) {
    case "outreach":
      return `Street Outreach (${locationCity})`;
    case "vaam":
      return "VAAM (Vegan Activists of Amsterdam Meetup)";
    case "raaf":
      return "RAAF (Revolutionary Animal Advocacy Forum)";
  }
}

export function getEventIcon(eventType: EventType): React.ReactNode {
  switch (eventType) {
    case "outreach":
      return <MegaphoneIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
    case "vaam":
      return <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
    case "raaf":
      return <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
    case "community":
    case "other":
      return <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
  }
}

function getLocationAddress(location: Location): string {
  switch (location) {
    case "EAO":
      return "Effective Altruism Office";
    case "buurtsalon":
      return "Buurtsalon Jeltje";
    case "pdz":
      return "Pakhuis de Zwijger";
  }
}

function getLocationCity(location: Location): string {
  switch (location) {
    case "EAO":
    case "buurtsalon":
    case "pdz":
      return "Amsterdam";
  }
}

function getLocationUrl(location: Location): string {
  switch (location) {
    case "EAO":
      return "https://maps.app.goo.gl/YLVoWa3kSzMViz5C9";
    case "buurtsalon":
      return "https://maps.app.goo.gl/Uq8NWo2djUAw7x7H9";
    case "pdz":
      return "https://maps.app.goo.gl/uzTNpxkQ4xVZMBoE8";
  }
}

function getUrl(eventType: EventType): string | undefined {
  switch (eventType) {
    case "outreach":
      return "/street_outreach/[event_id]";
  }
  return undefined;
}
