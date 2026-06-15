"use client";

import { getListedEvents } from "../../lib/events";
import { AgendaItem } from "../agenda-item/agenda-item";
import { compareAsc, isAfter } from "date-fns";

export function NextEvent() {
  const allUpcomingEvents = getListedEvents()
    .slice()
    .sort((a, b) => compareAsc(a.startTime, b.startTime))
    .filter((event) => isAfter(event.endTime, Date.now()));

  let seenCities = new Set<string>();
  const upcomingOutreachEvent = allUpcomingEvents
    .filter((event) => event.type == "outreach")
    .filter((event) => {
      if (seenCities.has(event.locationCity)) {
        return false;
      }
      seenCities.add(event.locationCity);
      return true;
    }, []);
  const upcomingOther = allUpcomingEvents
    .filter((event) => event.type != "outreach")
    .slice(0, 1);
  const upcomingEvents = [...upcomingOutreachEvent, ...upcomingOther].sort(
    (a, b) => compareAsc(a.startTime, b.startTime),
  );

  if (upcomingEvents.length == 0) {
    return <div>No upcoming event!</div>;
  } else {
    return (
      <>
        {upcomingEvents.map((event) => (
          <AgendaItem
            key={event.id}
            eventId={event.id}
            icon={event.icon}
            url={event.url}
            title={event.title}
            location={`${event.locationAddress}, ${event.locationCity}`}
            locationUrl={event.locationUrl}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
          />
        ))}
      </>
    );
  }
}
