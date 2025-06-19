"use client";

import { Agenda } from "@/components/agenda/agenda";
import { OutreachDescription } from "./outreach_description";

export default function StreetOureach() {
  return (
    <>
      <div className="text-2xl font-bold p-4 font-comfortaa">
        Street outreach
      </div>
      <OutreachDescription />
      <div className="px-4 pt-4 text-xl">Street outreach Agenda</div>
      <Agenda filterOnTypes={["outreach"]} />
    </>
  );
}
