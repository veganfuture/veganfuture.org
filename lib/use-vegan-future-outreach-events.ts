"use client";

import { useEffect, useState } from "react";
import { Event } from "./events";
import { fetchVeganFutureOutreachEvents } from "./veganactivists";

export function useVeganFutureOutreachEvents(): Event[] {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchVeganFutureOutreachEvents()
      .then((fetched) => {
        if (!cancelled) setEvents(fetched);
      })
      .catch((error) => {
        console.error("Failed to load veganactivists.nl events", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return events;
}
