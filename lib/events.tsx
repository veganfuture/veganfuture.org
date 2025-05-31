import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { parse } from "date-fns";

export type Location = "moco" | "EAO" | "rijks" | "buurtsalon";

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
};

const asTime = (str: string): Date => parse(str, "d-M-yyyy H:m", new Date());

export const events: Event[] = provideExtraField([
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
    url: "/raaf",
    location: "buurtsalon",
    startTime: asTime("23-5-2025 18:30"),
    endTime: asTime("23-5-2025 21:30"),
  },
  {
    type: "outreach",
    location: "moco",
    url: "/street_outreach",
    startTime: asTime("1-6-2025 15:30"),
    endTime: asTime("1-6-2025 17:30"),
  },
  {
    type: "outreach",
    location: "rijks",
    url: "/street_outreach",
    startTime: asTime("15-6-2025 14:00"),
    endTime: asTime("15-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "rijks",
    url: "/street_outreach",
    startTime: asTime("29-6-2025 14:00"),
    endTime: asTime("29-6-2025 17:00"),
  },
  {
    type: "outreach",
    location: "rijks",
    url: "/street_outreach",
    startTime: asTime("13-7-2025 14:00"),
    endTime: asTime("13-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "rijks",
    url: "/street_outreach",
    startTime: asTime("27-7-2025 14:00"),
    endTime: asTime("27-7-2025 17:00"),
  },
  {
    type: "outreach",
    location: "rijks",
    url: "/street_outreach",
    startTime: asTime("10-8-2025 14:00"),
    endTime: asTime("10-8-2025 17:00"),
  },
]);

/* automatically set id field based on index */
function provideExtraField(events: Omit<Event, 'id' | 'locationUrl' | 'icon' | 'locationText'>[]): Event[] {
  return events.map((event, idx) => {
    return {
      ...event,
      id: idx, 
      locationUrl: getLocationUrl(event.location), 
      locationText: getLocationText(event.location), 
      icon: getEventIcon(event.type)
    }
  });
}

export function getEventTitle(eventType: EventType): string {
  switch (eventType) {
    case "outreach":
      return "Street Outreach";
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
  }
}

export function getLocationText(location: Location): string {
  switch (location) {
    case "moco":
      return "Museumplein accross the Moco musuem";
    case "rijks":
      return "Sidewalk at RIJKS restaurant";
    case "EAO":
      return "Effective Altruism Office Amsterdam";
    case "buurtsalon":
      return "Buurtsalon Jeltje";
  }
}

export function getLocationUrl(location: Location): string {
  switch (location) {
    case "moco":
      return "https://maps.app.goo.gl/wciocBEZLbGSwyq4A";
    case "rijks":
      return "https://maps.app.goo.gl/UQP221BB2yxwDros7";
    case "EAO":
      return "https://maps.app.goo.gl/YLVoWa3kSzMViz5C9";
    case "buurtsalon":
      return "https://maps.app.goo.gl/Uq8NWo2djUAw7x7H9";
  }
}
