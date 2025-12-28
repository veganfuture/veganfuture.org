import React from "react";
import Image from "next/image";

export default function ActivismJoinedForces() {
  return (
    <>
      <div className="text-2xl p-4 font-comfortaa">
        Activism Joined Forces & Vegan Hangout
      </div>

      {/* Responsive container */}
      <div className="flex flex-col md:flex-row-reverse md:items-start md:gap-6">
        {/* Image */}
        <div className="p-4 md:w-[480px] shrink-0">
          <Image
            alt=""
            src="/event_images/activism_joined_forces.jpg"
            width={480}
            height={600}
            className="rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <div className="p-4 pb-0">
            On the 18th of January we will kick off the new year with an awesome
            Community Event.
          </div>

          <div className="p-4 pb-0">
            We will spend the afternoon joining different local campaigns and
            outreach efforts. Let’s work together and strengthen our bonds and
            our protests! If you’re new to activism this is a good opportunity
            to see in what kinds of activism local activists are involved.
          </div>

          <div className="p-4 pb-0">
            In the evening it’s time to hang out, meet each other, share ideas
            and make plans together for the new year! In the spirit of the Dutch
            ‘nieuwjaarsborrel’.
          </div>

          <div className="p-4">
            <strong>Timetable</strong>
            <ul className="list-disc pl-5">
              <li>13:00 - 14:00 Anti foie-gras protest by Active for Justice. <strong>Meeting point</strong>: in front of McDonald’s Albert Cuypstraat, corner Ferdinand Bolstraat.</li>
              <li>14:15 - 15:45 Vegan outreach at Museumplein by Vegan Future x We The Free x Anonymous for the Voiceless x Neon Protest. <strong>Meeting point</strong>: In front of the Moco museum.</li>
              <li>16:00 - 17:00 Anti-fur protest by Dutch Anti-fur Movement. <strong>Meeting point</strong>: P.C. Hooftstraat at Loro Piana.</li>
              <li>17:15 - 20:30 Vegan hangout at Café Gilde. <strong>Meeting point:</strong> OT301, Overtoom 301.</li>
            </ul>
          </div>

          <div className="p-4 pb-0">Hope to see you all on Sunday January 18th!</div>

          <div className="p-4 text-xs text-gray-600">Organised by Vegan Amsterdam x Vegan Future of Amsterdam x Revolutionary Animal Rights Forum x Active for Justice x Anonymous for the Voiceless x We The Free x Neon Protest x Dutch Anti-fur Movement x Fellow Vegans x Duurzame
          Dates  x Vegan Taalcafé x Café Gilde</div>
        </div>
      </div>
    </>
  );
}
