import { Metadata } from "next";
import Image from "next/image";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";
import { SignupForm } from "../signup_form";
import { DonateRaaf } from "../donate_raaf";
import { getEventByEventId } from "@/lib/events";
import { format } from "date-fns";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";

const raaf4 = getEventByEventId("raaf4");
const eventDateShort = raaf4 ? format(raaf4.startTime, "do 'of' MMMM") : "TBA";
const eventDateLong = raaf4 ? format(raaf4.startTime, "do MMMM, yyyy") : "TBA";
const eventCity = raaf4?.locationCity ?? "TBA";
const eventLocation = raaf4?.locationAddress ?? "TBA";
const eventImagePath = raaf4?.eventId ?? "raaf4";

const title = `RAAF #4, ${eventDateShort} in ${eventCity}`;
const description =
  "Join RAAF’s fourth edition to get inspired by some of the best in animal rights activism!";

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

type Link = {
  text: string;
  url: string;
};

type PersonInfo = {
  fullName: string;
  title: string;
  organization?: string;
  description: string;
  pictureName: string;
  links: Array<Link>;
};

const MORE_SPEAKER_TO_BE_ANNOUNCED = true;

const SPEAKERS: Array<PersonInfo> = [
  {
    fullName: "Kasia Mask",
    title: "Community Builder",
    organization: "Vegan Girls Club",
    description: `Kasia Mak is a food strategist and marketer, working at the intersection of food innovation, sustainability, and behavior change. With over a decade of experience across companies such as Carlsberg, Burger King, and Just Eat, she has led international marketing initiatives that promote plant-based eating and more sustainable food systems. Beyond her professional work, she is the founder of the Vegan Girls Club, a fast-growing Amsterdam-based community that brings together vegan and vegan-curious women through dinners, events, and collaborations with plant-based brands. Through this community—now connecting more than 1,300 people online and over 150 members locally—she creates a space for connection, inspiration, and collective action towards veganism.`,
    pictureName: "kasia_mak.jpg",
    links: [
      {
        text: "Vegan Girls Club",
        url: "https://www.instagram.com/vegangirls_club/",
      },
    ],
  },
  {
    fullName: "Lenneke van Gaal",
    title: "Lawyer For The Animals",
    organization: "Stop Humane Washing",
    description: `Lenneke van Gaal is a lawyer specializing in trademark law, advertising law, and unlawful publications, with nearly fifteen years of experience examining how communication shapes public perception. After becoming vegan, she began critically analyzing the claims made by the animal industry, such as “animal-friendly meat” and idyllic images of farm life, which suggest that the use of animals can be ethical. This led her to found Stop Humane Washing, an initiative that challenges misleading marketing around animal products and exposes how such narratives conceal the realities of animal agriculture.`,
    pictureName: "lenneke_van_gaal.jpg",
    links: [
      {
        text: "Stop Humane Washing",
        url: "https://stophumanewashing.nl/",
      },
    ],
  },
];

const MODERATORS: Array<PersonInfo> = [];

export default function RAAF4() {
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
            {raaf4?.title ?? "Revolutionary Animal Advocacy Forum"}
          </h1>
          <p className="absolute bottom-2 w-full text-center text-white text-s drop-shadow-md text-green-200">
            Back again on {eventDateShort} in {eventCity}!
          </p>
        </div>
      </div>

      <div className="p-4">
        <p>
          RAAF is back with a fourth edition! We're very excited to announce our
          first set of speakers, who come from an incredibly broad range of
          animal advocacy styles.
        </p>
        <p>
          If you are not yet an activist yourself or find yourself wondering how
          to energize or level up your activism, then RAAF is the #1 event for
          you. Some of the best animal rights activists will explain how they
          got into activism, how they found their groove, what drives them, what
          challenges they faced, and what keeps them busy. They'll inspire you
          to get going to build the future we all desire — one in which humanity
          will recognize that animals are here with us, not for us.
        </p>
        <p>
          After the talks, there will be plenty of time to socialize. We'll
          enjoy some music, vegan snacks, and new connections with like-minded
          people. We hope to see you there!
        </p>
        <p>
          P.S. If you have any questions about the event, please don't hestitate
          to <Link href="/contact">contact us</Link>.
        </p>
      </div>

      <div className="p-4 text-3xl">Free Signup (required)</div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1">
          <SignupForm eventId="raaf4" expires={raaf4?.startTime} />
        </div>

        <div className="w-full md:w-[350px] md:ml-8">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="pr-2">
                  <strong>Date:</strong>
                </td>
                <td>{eventDateLong}</td>
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
                        <td>22:00</td>
                        <td>Social time</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td rowSpan={2} className="align-top pr-2">
                  <strong>Location:</strong>
                </td>
                <td>
                  {raaf4?.locationUrl ? (
                    <a href={raaf4.locationUrl} target="_blank">
                      {eventLocation}
                    </a>
                  ) : (
                    eventLocation
                  )}
                </td>
              </tr>
              <tr>
                <td>{eventCity}</td>
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

      {SPEAKERS.map((speaker, idx) => (
        <Person
          key={idx}
          person={speaker}
          eventImagePath={eventImagePath}
          reverseOnDesktop={idx % 2 === 1}
          panelClassName={idx % 2 === 1 ? "bg-green-100" : "bg-emerald-50"}
        />
      ))}

      {MORE_SPEAKER_TO_BE_ANNOUNCED ? (
        <div className="p-4 flex items-center gap-2 text-3xl text-gray-700">
          <span>More speakers will be announced soon</span>
          <MegaphoneIcon aria-hidden="true" className="h-10 w-10" />
        </div>
      ) : null}

      {MODERATORS.length > 0 ? (
        <>
          <div className="px-4 pt-4 text-3xl">Moderator:</div>

          {MODERATORS.map((moderator, idx) => (
            <Person
              key={idx}
              person={moderator}
              eventImagePath={eventImagePath}
              reverseOnDesktop={idx % 2 === 1}
            />
          ))}
        </>
      ) : (
        <></>
      )}

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

function Person({
  person,
  eventImagePath,
  reverseOnDesktop = false,
  panelClassName = "",
}: {
  person: PersonInfo;
  eventImagePath: string;
  reverseOnDesktop?: boolean;
  panelClassName?: string;
}) {
  return (
    <div
      className={`p-4 flex flex-col md:items-start gap-4 rounded-xl border border-green-100 shadow-sm ${panelClassName} ${
        reverseOnDesktop ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex flex-col flex-1">
        <span className="text-2xl mb-2">{person.fullName}</span>
        <span className="text-xl mb-4 text-gray-600">
          {person.organization
            ? `${person.title} @ ${person.organization}`
            : person.title}
        </span>

        <div className="mb-4 md:hidden self-center">
          <Image
            src={`/${eventImagePath}/${person.pictureName}`}
            width={275}
            height={330}
            alt={`Picture of ${person.fullName}`}
            className="rounded-lg"
          />
        </div>

        <p className="py-2">{person.description}</p>

        <div className="p-4">
          <ul className="list-disc pl-8">
            {person.links.map((link, lidx) => (
              <li key={lidx}>
                <a href={link.url} target="_blank">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden md:block">
        <Image
          src={`/${eventImagePath}/${person.pictureName}`}
          width={275}
          height={330}
          alt={`Picture of ${person.fullName}`}
          className="flex-shrink-0 rounded-lg"
        />
      </div>
    </div>
  );
}
