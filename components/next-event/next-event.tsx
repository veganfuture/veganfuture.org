"use client";

import {
  events,
  getEventTitle,
  getLocationText,
  getLocationUrl,
} from "../../lib/events";
import { AgendaItem } from "../agenda-item/agenda-item";
import { compareAsc, isAfter } from "date-fns";

export function NextEvent() {
  const upcomingEvents = events
    .sort((a, b) => compareAsc(a.startTime, b.startTime))
    .filter((event) => isAfter(event.endTime, Date.now()));
  const event = upcomingEvents[0];

  if (upcomingEvents.length == 0) {
    return <div>No upcoming event!</div>;
  } else {
    return (
      <AgendaItem
        eventId={event.id}
        icon={event.icon}
        url={event.url}
        title={event.title}
        location={event.locationText}
        locationUrl={event.locationUrl}
        startTime={event.startTime}
        endTime={event.endTime}
        description={event.description}
      />
    );
  }
}
