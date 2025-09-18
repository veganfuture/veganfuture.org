import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { parse } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { withBaseUrl } from "./metadata";

// from https://stackoverflow.com/a/54178819/1860591
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Location = "moco" | "EAO" | "rijks" | "buurtsalon" | "ijhallen";

export type EventType = "outreach" | "vaam" | "raaf";

export type Event = {
  startTime: TZDate;
  endTime: TZDate;
  type: EventType;
  location: Location;
  locationUrl: string;
  locationText: string;
  locationTextWithCity: string;
  url: string;
  description?: string;
  icon: React.ReactNode;
  id: number;
  title: string;
  eventId: string;
};

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
    "Europe/Amsterdam"
  );
};
export function getEventByEventId(eventId: string): Event | undefined {
  return events.find((event) => event.eventId == eventId);
}

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
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681981/",
    location: "moco",
    startTime: fromAmsTime("26-1-2025 13:00"),
    endTime: fromAmsTime("26-1-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681983/",
    location: "moco",
    startTime: fromAmsTime("9-2-2025 13:00"),
    endTime: fromAmsTime("9-2-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681985/",
    location: "moco",
    startTime: fromAmsTime("23-2-2025 13:00"),
    endTime: fromAmsTime("23-2-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681987/",
    location: "moco",
    startTime: fromAmsTime("9-3-2025 13:00"),
    endTime: fromAmsTime("9-3-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681989/",
    location: "moco",
    startTime: fromAmsTime("23-3-2025 13:00"),
    endTime: fromAmsTime("23-3-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681992/",
    location: "moco",
    startTime: fromAmsTime("6-4-2025 13:00"),
    endTime: fromAmsTime("6-4-2025 16:00"),
    description: 'Special action: we\'re selling Konink "dogmeat" this time :)',
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681993/",
    location: "moco",
    startTime: fromAmsTime("20-4-2025 13:00"),
    endTime: fromAmsTime("20-4-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681994/",
    location: "moco",
    startTime: fromAmsTime("4-5-2025 13:00"),
    endTime: fromAmsTime("4-5-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681995/",
    location: "moco",
    startTime: fromAmsTime("18-5-2025 13:00"),
    endTime: fromAmsTime("18-5-2025 16:00"),
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
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("1-6-2025 15:30"),
    endTime: fromAmsTime("1-6-2025 17:30"),
  },
  {
    type: "outreach",
    location: "rijks",
    startTime: fromAmsTime("15-6-2025 14:00"),
    endTime: fromAmsTime("15-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("29-6-2025 14:00"),
    endTime: fromAmsTime("29-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("13-7-2025 14:00"),
    endTime: fromAmsTime("13-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("27-7-2025 14:00"),
    endTime: fromAmsTime("27-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "ijhallen",
    startTime: fromAmsTime("10-8-2025 14:00"),
    endTime: fromAmsTime("10-8-2025 17:00"),
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
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("24-8-2025 14:00"),
    endTime: fromAmsTime("24-8-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("7-9-2025 14:00"),
    endTime: fromAmsTime("7-9-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("21-9-2025 14:00"),
    endTime: fromAmsTime("21-9-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("5-10-2025 14:00"),
    endTime: fromAmsTime("5-10-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("19-10-2025 14:00"),
    endTime: fromAmsTime("19-10-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("2-11-2025 13:00"),
    endTime: fromAmsTime("2-11-2025 16:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: fromAmsTime("16-11-2025 13:00"),
    endTime: fromAmsTime("16-11-2025 16:00"),
  },
  {
    type: "raaf",
    location: "buurtsalon",
    startTime: fromAmsTime("28-11-2025 18:30"),
    endTime: fromAmsTime("28-11-2025 21:30"),
    url: "/raaf/3",
    eventId: "raaf3",
  },
]);

/**
 * Automatically populates the events with a bunch of properties that
 * I don't want to repeat and am afraid to mess up :)
 */
function populate(
  events: PartialBy<
    Omit<Event, "id">,
    "url" | "locationUrl" | "icon" | "locationText"| "locationTextWithCity" | "title" | "eventId"
  >[],
): Event[] {
  return events.map((event, idx) => {
    const relUrl = (event.url || getUrl(event.type))?.replace(
      "[event_id]",
      idx.toString(),
    );
    if (!relUrl) throw new Error(`Missing url for event ${event}`);
    const url = withBaseUrl(relUrl);
    return {
      ...event,
      id: idx,
      locationUrl: event.locationUrl || getLocationUrl(event.location),
      locationText: event.locationText || getLocationText(event.location),
      locationTextWithCity: event.locationText || getLocationText(event.location) + ", Amsterdam",
      icon: event.icon || getEventIcon(event.type),
      title: event.title || getEventTitle(event.type),
      url: url,
      eventId: event.eventId || getEventId(event.type, idx),
    };
  });
}

function getEventId(eventType: EventType, id: number): string {
  return `${eventType}${id}`;
}

function getEventTitle(eventType: EventType): string {
  switch (eventType) {
    case "outreach":
      return "Street Outreach";
    case "vaam":
      return "VAAM (Vegan Activists of Amsterdam Meetup)";
    case "raaf":
      return "RAAF (Revolutionary Animal Advocacy Forum)";
  }
}

function getEventIcon(eventType: EventType): React.ReactNode {
  switch (eventType) {
    case "outreach":
      return <MegaphoneIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
    case "vaam":
      return <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
    case "raaf":
      return <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />;
  }
}

function getLocationText(location: Location): string {
  switch (location) {
    case "moco":
      return "Museumplein across the Moco museum";
    case "rijks":
      return "Sidewalk at RIJKS restaurant";
    case "EAO":
      return "Effective Altruism Office";
    case "buurtsalon":
      return "Buurtsalon Jeltje";
    case "ijhallen":
      return "Ijhallen (NDSM)";
  }
}

function getLocationUrl(location: Location): string {
  switch (location) {
    case "moco":
      return "https://maps.app.goo.gl/wciocBEZLbGSwyq4A";
    case "rijks":
      return "https://maps.app.goo.gl/UQP221BB2yxwDros7";
    case "EAO":
      return "https://maps.app.goo.gl/YLVoWa3kSzMViz5C9";
    case "buurtsalon":
      return "https://maps.app.goo.gl/Uq8NWo2djUAw7x7H9";
    case "ijhallen":
      return "https://maps.app.goo.gl/PkjLaBFM4zrPC8eX6";
  }
}

function getUrl(eventType: EventType): string | undefined {
  switch (eventType) {
    case "outreach":
      return "/street_outreach/[event_id]";
  }
  return undefined;
}
