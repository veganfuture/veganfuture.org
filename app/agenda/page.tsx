import { AgendaItem } from "./agenda-item";

type Location = "moco" | "EAO";

type EventType = "outreach" | "vaam";

type Event = {
  date: string;
  startTime: string;
  endTime: string;
  type: EventType;
  location: Location;
  url: string;
};

const events: Event[] = [
  {
    type: "vaam",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305133967/",
    location: "EAO",
    date: "24th Jan, 2025",
    startTime: "18:30",
    endTime: "22:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681981/",
    location: "moco",
    date: "26th Jan, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681983/",
    location: "moco",
    date: "9th Feb, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681985/",
    location: "moco",
    date: "23th Feb, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681987/",
    location: "moco",
    date: "9th March, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681989/",
    location: "moco",
    date: "23th Match, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681992/",
    location: "moco",
    date: "6th April, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681993/",
    location: "moco",
    date: "20th April, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681994/",
    location: "moco",
    date: "4th May, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681995/",
    location: "moco",
    date: "18th May, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681996/",
    location: "moco",
    date: "1th June, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305681998/",
    location: "moco",
    date: "15th June, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
  {
    type: "outreach",
    url: "https://www.meetup.com/vegan-future-amsterdam/events/305682001/",
    location: "moco",
    date: "28th June, 2025",
    startTime: "13:00",
    endTime: "16:00",
  },
];

function getEventTitle(eventType: EventType): string {
  switch (eventType) {
    case "outreach":
      return "Street Outreach";
    case "vaam":
      return "Vegan Activists of Amsterdam Meetup";
  }
}

function getLocationText(location: Location): string {
  switch (location) {
    case "moco":
      return "Museumplein accross the Moco musuem";
    case "EAO":
      return "Effective Altruism Office Amsterdam";
  }
}

export default function Agenda() {
  return (
    <>
      <div className="text-xl py-2">Agenda</div>
      <div>
        {events.map((event, idx) => (
          <AgendaItem
            key={idx}
            url={event.url}
            title={getEventTitle(event.type)}
            location={getLocationText(event.location)}
            date={event.date}
            startTime={event.startTime}
            endTime={event.endTime}
          />
        ))}
      </div>
    </>
  );
}
