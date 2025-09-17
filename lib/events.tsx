import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { parse } from "date-fns";

// from https://stackoverflow.com/a/54178819/1860591
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Location = "moco" | "EAO" | "rijks" | "buurtsalon" | "ijhallen";

export type EventType = "outreach" | "vaam" | "raaf";

export type Event = {
  startTime: Date;
  endTime: Date;
  type: EventType;
  location: Location;
  locationUrl: string;
  locationText: string;
  url: string;
  description?: string;
  icon: React.ReactNode;
  id: number;
  title: string;
  eventId: string;
};

const asTime = (str: string): Date => parse(str, "d-M-yyyy H:m", new Date());

export function getEventByEventId(eventId: string): Event | undefined {
  return events.find((event) => event.eventId == eventId);
}

export const events: Event[] = populate([
  {
    type: "vaam",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305133967/",
    location: "EAO",
    startTime: asTime("24-01-2025 18:30"),
    endTime: asTime("24-01-2025 21:00"),
    description:
      "A meetup for activists in Amsterdam to come together, inspire each other and talk strategy.",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681981/",
    location: "moco",
    startTime: asTime("26-1-2025 13:00"),
    endTime: asTime("26-1-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681983/",
    location: "moco",
    startTime: asTime("9-2-2025 13:00"),
    endTime: asTime("9-2-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681985/",
    location: "moco",
    startTime: asTime("23-2-2025 13:00"),
    endTime: asTime("23-2-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681987/",
    location: "moco",
    startTime: asTime("9-3-2025 13:00"),
    endTime: asTime("9-3-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681989/",
    location: "moco",
    startTime: asTime("23-3-2025 13:00"),
    endTime: asTime("23-3-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681992/",
    location: "moco",
    startTime: asTime("6-4-2025 13:00"),
    endTime: asTime("6-4-2025 16:00"),
    description: 'Special action: we\'re selling Konink "dogmeat" this time :)',
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681993/",
    location: "moco",
    startTime: asTime("20-4-2025 13:00"),
    endTime: asTime("20-4-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681994/",
    location: "moco",
    startTime: asTime("4-5-2025 13:00"),
    endTime: asTime("4-5-2025 16:00"),
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681995/",
    location: "moco",
    startTime: asTime("18-5-2025 13:00"),
    endTime: asTime("18-5-2025 16:00"),
  },
  {
    type: "raaf",
    title: "RAAF #1",
    url: "/raaf/1",
    location: "buurtsalon",
    startTime: asTime("23-5-2025 18:30"),
    endTime: asTime("23-5-2025 21:30"),
    eventId: "raaf1",
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("1-6-2025 15:30"),
    endTime: asTime("1-6-2025 17:30"),
  },
  {
    type: "outreach",
    location: "rijks",
    startTime: asTime("15-6-2025 14:00"),
    endTime: asTime("15-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("29-6-2025 14:00"),
    endTime: asTime("29-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("13-7-2025 14:00"),
    endTime: asTime("13-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("27-7-2025 14:00"),
    endTime: asTime("27-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "ijhallen",
    startTime: asTime("10-8-2025 14:00"),
    endTime: asTime("10-8-2025 17:00"),
  },
  {
    type: "raaf",
    title: "RAAF #2",
    url: "/raaf/2",
    location: "buurtsalon",
    startTime: asTime("22-8-2025 18:30"),
    endTime: asTime("22-8-2025 21:30"),
    eventId: "raaf2",
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("24-8-2025 14:00"),
    endTime: asTime("24-8-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("7-9-2025 14:00"),
    endTime: asTime("7-9-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("21-9-2025 14:00"),
    endTime: asTime("21-9-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("5-10-2025 14:00"),
    endTime: asTime("5-10-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("19-10-2025 14:00"),
    endTime: asTime("19-10-2025 17:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("2-11-2025 13:00"),
    endTime: asTime("2-11-2025 16:00"),
  },
  {
    type: "outreach",
    location: "moco",
    startTime: asTime("16-11-2025 13:00"),
    endTime: asTime("16-11-2025 16:00"),
  },
  {
    type: "raaf",
    location: "buurtsalon",
    startTime: asTime("28-11-2025 18:30"),
    endTime: asTime("28-11-2025 21:30"),
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
    "url" | "locationUrl" | "icon" | "locationText" | "title" | "eventId"
  >[],
): Event[] {
  return events.map((event, idx) => {
    const url = (event.url || getUrl(event.type))?.replace(
      "[event_id]",
      idx.toString(),
    );
    if (!url) throw new Error(`Missing url for event ${event}`);
    return {
      ...event,
      id: idx,
      locationUrl: event.locationUrl || getLocationUrl(event.location),
      locationText: event.locationText || getLocationText(event.location),
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
      return "Museumplein accross the Moco musuem";
    case "rijks":
      return "Sidewalk at RIJKS restaurant";
    case "EAO":
      return "Effective Altruism Office Amsterdam";
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
