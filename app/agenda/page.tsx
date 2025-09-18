import React from "react";
import { Agenda as AgendaComponent } from "../../components/agenda/agenda";

export default function Agenda() {
  return (
    <>
      <div className="text-2xl p-4 font-comfortaa">Agenda</div>

      <AgendaComponent />

      <div className="p-4">
      You can also sync with our agenda via our <a href="/events.ics">iCalendar</a>.
      </div>
    </>
  );
}
