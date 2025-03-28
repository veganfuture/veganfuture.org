import { format } from "date-fns";

type AgendaItemProps = {
  url: string;
  title: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  icon: React.ReactNode;
};

export function AgendaItem({
  url,
  title,
  location,
  date,
  startTime,
  endTime,
  icon, 
  description,
}: AgendaItemProps) {
  return (
    <div
      onClick={() => {
        if (url.startsWith("http")) {
          window.open(url, "_blank");
        } else {
          document.location = url;
        }
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
          lg:w-[720px]
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
        <strong>{format(date, "do MMMM yyyy")}</strong> from{" "}
        <strong>
          {startTime} to {endTime}
        </strong>
      </p>
      { description ? <p>{description}</p> : <></>}
      <p>Location: {location}</p>
    </div>
  );
}
