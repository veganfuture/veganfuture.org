"use client";

import React, { useState } from "react";
import { AgendaItem } from "./agenda-item";
import { isAfter } from "date-fns";
import {
  events,
  getEventIcon,
  getEventTitle,
  getLocationText,
  getLocationUrl,
  Event,
} from "./events";
import { TabProps, Tabs } from "@/components/tabs/tabs";

export default function Agenda() {
  const [isUpcomingSelected, setUpcomingSelected] = useState(true);

  const tabs: Array<TabProps> = [
    { title: "Upcoming events" },
    { title: "Past events" },
  ];

  const dateFilter = (event: Event) => {
    const currentDate = new Date();
    if (isUpcomingSelected) {
      return isAfter(event.date, currentDate);
    } else {
      return !isAfter(event.date, currentDate);
    }
  };

  return (
    <>
      <div className="text-xl p-4">Agenda</div>

      <div className="pb-4 pl-4">
        <Tabs
          tabs={tabs}
          initialActiveTab={0}
          onActiveTabChange={(idx) => setUpcomingSelected(idx == 0)}
        />
      </div>

      <div className="pl-4">
        {events.filter(dateFilter).map((event, idx) => (
          <AgendaItem
            key={idx}
            icon={getEventIcon(event.type)}
            url={event.url}
            title={getEventTitle(event.type)}
            location={getLocationText(event.location)}
            locationUrl={getLocationUrl(event.location)}
            date={event.date}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
          />
        ))}
      </div>
    </>
  );
}
