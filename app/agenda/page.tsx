'use client'

import { UserGroupIcon } from "@heroicons/react/24/outline";
import { addWeeks, isAfter, format } from "date-fns";

export default function Agenda() {

  const startDate = new Date(2024, 7, 25);
  const dates = Array.from(Array(10).keys()).map(i => {
    return addWeeks(startDate, i * 2);
  }).filter(date => isAfter(date, Date.now()));

  return <>
    <div className="text-xl py-2">Agenda</div>
    {dates.map((date, idx) => {
      return <div key={idx} className="p-4 my-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4 lg:w-[500px]">
        <p className="text-xl flex"><UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />Outreach</p>
        <p>
          <strong>{format(date, "dd-MM-yyyy")}</strong> from <strong>13:00 to 16:00</strong>
        </p>
        <p>
          Location: across the <a href="https://maps.app.goo.gl/oeFDx9fhKTZK13QM9">Moco museum</a> at Museumplein, Amsterdam.
        </p>
      </div>;
    })}
  </>;
}
