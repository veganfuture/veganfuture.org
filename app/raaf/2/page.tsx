import { Metadata } from "next";
import Image from "next/image";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";
import { SignupForm } from "../signup_form";
import { DonateRaaf } from "../donate_raaf";
import { getEventByEventId } from "@/lib/events";

const title = "RAAF#2, 22nd of August in Amsterdam";
const description =
  "Join us, once again, for RAAF#2 on the 22nd of August in Amsterdam. Doors open at 18:30!";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: "/raaf/raaf_opengraph.jpg",
        width: 764,
        height: 400,
        alt: "RAAF Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: ["raaf/raaf_opengraph.jpg"],
  },
};

export default function RAAF2() {
  const raaf2 = getEventByEventId("raaf2");

  return (
    <>
      <div className="relative w-full h-[200px]">
        <Image
          src="/raaf/raaf_banner.jpg"
          alt="RAAF banner"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg">
            Revolutionary Animal Advocacy Forum #2
          </h1>
          <p className="absolute bottom-2 w-full text-center text-white text-s drop-shadow-md text-green-200">
            Coming back at ya on the 22<sup>nd</sup> of August in Amsterdam!
          </p>
        </div>
      </div>

      <div className="p-4">
        <p>
          RAAF (Revolutionary Animal Advocacy Forum) is back! Track this page or{" "}
          <Link href="https://www.instagram.com/vf.raaf/" target="_blank">
            follow us on Instagram
          </Link>{" "}
          for updates!
        </p>
      </div>

      <div className="p-4 text-3xl">Signup</div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1">
          <SignupForm eventId="raaf2" expires={raaf2?.startTime} />
        </div>

        <div className="w-full md:w-[350px] md:ml-8">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="pr-2">
                  <strong>Date:</strong>
                </td>
                <td>
                  22<sup>nd</sup> August, 2025
                </td>
              </tr>
              <tr>
                <td className="align-top  pr-2">
                  <strong>Agenda:</strong>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>18:30</td>
                        <td>Doors open</td>
                      </tr>
                      <tr>
                        <td>19:00</td>
                        <td>Presentations start</td>
                      </tr>
                      <tr>
                        <td>21:30</td>
                        <td>Social time</td>
                      </tr>
                      <tr>
                        <td>23:00</td>
                        <td>Doors close</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td rowSpan={4} className="align-top pr-2">
                  <strong>Location:</strong>
                </td>
                <td>Buurtsalon Jeltje</td>
              </tr>
              <tr>
                <td>Eerste Helmersstraat 106-N</td>
              </tr>
              <tr>
                <td>1054 EG Amsterdam</td>
              </tr>
              <tr>
                <td>(wheel chair accessible)</td>
              </tr>
              <tr>
                <td className="pr-2">
                  <strong>Language:</strong>
                </td>
                <td>English</td>
              </tr>
              <tr>
                <td className="pr-2">
                  <strong>Cost:</strong>
                </td>
                <td>Donation based</td>
              </tr>
              <tr>
                <td className="pr-2" colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 pt-4 text-3xl">Speakers:</div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Wouter</span>
          <p className="py-4">
            Wouter has been active within the movement the past 5 years. Their
            work has been primarily focused on speaking with the public using a
            plurality of methods. In the last few years they started to explore
            new ways to frame the victims perspective and incorporate findings
            from scientific research into their advocacy. Wouter has a lot of
            experience with virtue ethics.
          </p>
        </div>
        <Image
          src={"/raaf2/wouter.jpg"}
          width={275}
          height={330}
          alt="Picture of Wouter"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Jasmin Gerrittsma</span>
          <p className="py-4">
            Jasmin Gerritsma helps students in the BeNeLux set up campaigns
            where they call on their university to transition to 100%
            plant-based catering. This is part of the europe wide Plant-Based
            Universities network. Before that she studied cognitive psychology
            at Utrecht University, learning a lot about why we do the things we
            do. And even before that, she grew up vegetarian feeling really
            confused as to why other people were eating animals.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://plantbaseduniversities.org/" target="_blank">
                  Plant Based Universities
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf2/jasmin.jpg"}
          width={275}
          height={330}
          alt="Picture of Jasmin Gerrittsma"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Nicoll Peracha</span>
          <p className="py-4">
            Nicoll is the founder and executive director of{" "}
            <em>The Mission Motor</em>. With The Mission Motor Nicoll supports
            organizations in developing and implementing monitoring and
            evaluation systems within the animal and vegan advocacy community.
            Previously Nicoll worked for 8 years at Proveg. She holds a law
            degree and has 25 years of experience in the international
            non-profit sector.
          </p>
          <p>
            Note: Nicoll was set to speak for RAAF1, but had to cancel due to
            illness.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://www.themissionmotor.org/" target="_blank">
                  The Mission Motor
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nicoll-peracha/"
                  target="_blank"
                >
                  Nicoll&apos;s LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf/nicoll-peracha.jpg"}
          width={275}
          height={330}
          alt="Picture of Nicoll Peracha"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Lodewijk Bogaards</span>
          <p className="py-4">
            Lodewijk Bogaards founded Vegan Future and is an organiser of RAAF.
            Besides advocating veganism, he has been meditating for 27 years,
            completed over a dozen meditation retreats and spent over a year
            meditating in India. His talk will be focused on the nature of
            suffering. How can meditation help make you more effective and
            happy?
          </p>
        </div>
        <Image
          src={"/raaf2/lodewijk.jpg"}
          width={275}
          height={330}
          alt="Picture of Lodewijk Bogaards"
          className="flex-shrink-0"
        />
      </div>

      <div className="px-4 pt-4 text-3xl">Moderators:</div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">That Cip Guy</span>
          <p className="py-4">
            Cip is perhaps the Netherlands most prolific vegan youtuber. His
            live streams are well visited by both vegans and non-vegans, making
            for non-stop vegan discussion in the chat. Cip is also a body
            builder, certified nutritionist and the lead developer for We The
            Free.
          </p>
        </div>

        <Image
          src={"/raaf2/cip.png"}
          width={275}
          height={330}
          alt="Picture of Cip"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Torben (co-founder RAAF)</span>
          <p className="py-4">
            Torben has been an active animal advocate since December 2020.
            Starting with street outreach, he has since explored a wide variety
            of advocacy forms, ranging from public manifestations, civil
            disobedience and pressure campaigning to political lobbying. His
            reflections on social movement strategy - based on his own
            experiences and lessons from history - led him to become a
            co-founder of RAAF.
          </p>
        </div>

        <Image
          src={"/raaf/torben.jpg"}
          width={275}
          height={330}
          alt="Picture of Torben"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 text-3xl">Donation based</div>
      <div className="p-4">
        <DonateRaaf />
      </div>

      <div className="p-4 text-3xl">Learn more</div>
      <div className="p-4">
        You can find more information about RAAF <Link href="/raaf">here</Link>.
      </div>
    </>
  );
}
