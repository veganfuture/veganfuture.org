"use client";

import { events, getEventIcon, getEventTitle, getLocationText } from "../../app/agenda/events";
import { AgendaItem } from "../../app/agenda/agenda-item";
import { compareAsc, isAfter } from "date-fns";

export function NextEvent() {
  const upcomingEvents = events
    .sort((a, b) => compareAsc(a.date, b.date))
    .filter(event => isAfter(event.date, Date.now()));
  const event = upcomingEvents[0];

  return <AgendaItem
    icon={getEventIcon(event.type)}
    url={event.url}
    title={getEventTitle(event.type)}
    location={getLocationText(event.location)}
    date={event.date}
    startTime={event.startTime}
    endTime={event.endTime}
    description={event.description}
  />
}