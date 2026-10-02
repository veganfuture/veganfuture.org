"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LiveEventDetail } from "@/components/event-detail/live-event-detail";
import { fetchVeganFutureOutreachEvents } from "@/lib/veganactivists";
import { Event } from "@/lib/events";

// Vegan Future's events fetched live from veganactivists.nl (see
// lib/veganactivists.ts) don't have a page on veganfuture.org known at build
// time, so this one page looks up whichever slug it's asked for client-side,
// rather than every event getting its own statically generated route.
function EventView() {
  const slug = useSearchParams().get("slug");
  const [event, setEvent] = useState<Event | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) {
      setEvent(null);
      return;
    }
    let cancelled = false;
    fetchVeganFutureOutreachEvents()
      .then((events) => {
        if (cancelled) return;
        setEvent(
          events.find((event) => event.eventId === `veganactivists-${slug}`) ??
            null,
        );
      })
      .catch((error) => {
        console.error("Failed to load veganactivists.nl event", error);
        if (!cancelled) setEvent(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (event === undefined) {
    return <div className="p-4">Loading...</div>;
  }
  if (event === null) {
    return <div className="p-4">Event not found.</div>;
  }
  return <LiveEventDetail event={event} />;
}

export default function EventViewPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <EventView />
    </Suspense>
  );
}
