"use client";

import React, { useState } from "react";
import { AgendaItem } from "../../components/agenda-item/agenda-item";
import { isAfter } from "date-fns";
import {
  events,
  getEventIcon,
  getEventTitle,
  getLocationText,
  getLocationUrl,
  Event,
  EventType,
} from "../../lib/events";
import { TabProps, Tabs } from "@/components/tabs/tabs";

export type AgendaProps = {
  filterOnTypes?: Array<EventType>;
};

export function Agenda({ filterOnTypes }: AgendaProps) {
  const [isUpcomingSelected, setUpcomingSelected] = useState(true);

  const tabs: Array<TabProps> = [
    { title: "Upcoming events" },
    { title: "Past events" },
  ];

  const dateFilter = (event: Event) => {
    const currentDate = new Date();
    if (isUpcomingSelected) {
      return isAfter(event.startTime, currentDate);
    } else {
      return !isAfter(event.startTime, currentDate);
    }
  };

  const typeFilter = filterOnTypes
    ? (event: Event) => filterOnTypes.includes(event.type)
    : () => true;

  const eventFilter = (event: Event) => {
    return dateFilter(event) && typeFilter(event);
  };

  return (
    <>
      <div className="pb-4 pl-4">
        <Tabs
          tabs={tabs}
          initialActiveTab={0}
          onActiveTabChange={(idx) => setUpcomingSelected(idx == 0)}
        />
      </div>

      <div className="pl-4">
        {events.filter(eventFilter).map((event, idx) => (
          <AgendaItem
            key={idx}
            eventId={event.id}
            icon={event.icon}
            url={event.url}
            title={event.title}
            location={event.location}
            locationUrl={event.locationUrl}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
          />
        ))}
      </div>
    </>
  );
}
