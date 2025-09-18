import { BASE_URL, withoutBaseUrl } from "@/lib/metadata";
import { format } from "date-fns";
import Link from "next/link";

type AgendaItemProps = {
  url: string;
  title: string;
  location: string;
  locationUrl?: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  icon: React.ReactNode;
  eventId: number;
};

export function AgendaItem({
  url,
  title,
  location,
  locationUrl,
  startTime,
  endTime,
  icon,
  description,
}: AgendaItemProps) {
  return (
    <div
      onClick={() => {
        if (url.startsWith(BASE_URL)) {
          document.location = withoutBaseUrl(url);
        } else {
          // external URL, load in new tab
          window.open(url, "_blank");
        }
      }}
      className="
          p-4 
          my-4 
          bg-green-100 
          border 
          border-gray-300 
          rounded-lg 
          shadow-md 
          mb-4 
          lg:mb-0 
          lg:mr-4 
          lg:w-full
          hover:shadow-none
          hover:bg-white
          cursor-pointer
          transition-colors
          duration-200
        "
      role="button"
    >
      <p className="text-xl flex">
        {icon}
        {title}
      </p>
      <p>
        <strong>{format(startTime, "do MMMM yyyy")}</strong> from{" "}
        <strong>
          {format(startTime, "HH:mm")} to {format(endTime, "HH:mm")}
        </strong>
      </p>
      {description ? <p>{description}</p> : <></>}
      <p>
        Location:{" "}
        {locationUrl ? <Link href={locationUrl}>{location}</Link> : location}
      </p>
    </div>
  );
}
