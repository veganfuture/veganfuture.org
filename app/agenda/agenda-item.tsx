"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";

type AgendaItemProps = {
  url: string;
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
};

export function AgendaItem({
  url,
  title,
  location,
  date,
  startTime,
  endTime,
}: AgendaItemProps) {
  return (
    <div
      onClick={() => {
        window.open(url, "_blank");
      }}
      className="
          p-4 
          my-4 
          bg-gray-100 
          border 
          border-gray-300 
          rounded-lg 
          shadow-md 
          mb-4 
          lg:mb-0 
          lg:mr-4 
          lg:w-[500px]
          hover:shadow-none
          hover:bg-white
          cursor-pointer
          transition-colors
          duration-200
        "
      role="button"
    >
      <p className="text-xl flex">
        <UserGroupIcon aria-hidden="true" className="h-6 w-6 mr-2" />
        {title}
      </p>
      <p>
        <strong>{date}</strong> from{" "}
        <strong>
          {startTime} to {endTime}
        </strong>
      </p>
      <p>Location: {location}</p>
    </div>
  );
}
