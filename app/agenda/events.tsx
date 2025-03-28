import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { parse } from "date-fns";

export type Location = "moco" | "EAO" | "rijks" | "buurtsalon";

export type EventType = "outreach" | "vaam" | "raaf";

export type Event = {
  date: Date;
  startTime: string;
  endTime: string;
  type: EventType;
  location: Location;
  url: string;
  description?: string;
};

const asDate = (str: string): Date => parse(str, "d-M-yyyy", new Date());

export const events: Event[] = [
  {
    type: "vaam",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305133967/",
    location: "EAO",
    date: asDate("24-01-2025"),
    startTime: "18:30",
    endTime: "22:00",
    description: "A meetup for activists in Amsterdam to come together, inspire each other and talk strategy."
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681981/",
    location: "moco",
    date: asDate("26-1-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681983/",
    location: "moco",
    date: asDate("9-2-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681985/",
    location: "moco",
    date: asDate("23-2-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681987/",
    location: "moco",
    date: asDate("9-3-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681989/",
    location: "moco",
    date: asDate("23-3-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681992/",
    location: "moco",
    date: asDate("6-4-2025"),
    startTime: "13:00",
    endTime: "16:00",
    description: "Special action: we're selling Konink \"dogmeat\" this time :)"
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681993/",
    location: "moco",
    date: asDate("20-4-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681994/",
    location: "moco",
    date: asDate("4-5-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681995/",
    location: "moco",
    date: asDate("18-5-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "raaf",
    url: "/raaf",
    location: "buurtsalon",
    date: asDate("23-5-2025"),
    startTime: "18:30",
    endTime: "21:30",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681996/",
    location: "moco",
    date: asDate("1-6-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681998/",
    location: "moco",
    date: asDate("15-6-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305682001/",
    location: "moco",
    date: asDate("28-6-2025"),
    startTime: "13:00",
    endTime: "16:00",
  },
];

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
      return "Buurtsalon Jeltje"
  }
}
