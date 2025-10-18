import { Metadata } from "next";
import Image from "next/image";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";
import { SignupForm } from "../signup_form";
import { DonateRaaf } from "../donate_raaf";
import { getEventByEventId } from "@/lib/events";

const title = "RAAF #3, 28th of November in Amsterdam";
const description =
  "Join RAAF’s third edition for an inspiring evening of diverse animal activism, ranging from planting mental seeds to planting cameras.";

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
}

type PersonInfo = {
  fullName: string;
  title: string;
  organization?: string;
  description: string;
  pictureName: string;
  links: Array<Link>;
}

const SPEAKERS: Array<PersonInfo> = [
  {
    fullName: "Marloes Boere",
    title: "Philosophy Educator",
    description: `Marloes Boere develops training programs for politicians on ethics,
      environmental education, and debating skills. She studied Future Planet
      Studies and Philosophy in Amsterdam, and co-authored an ethics textbook
      for high school philosophy students. Before that, she grew up in the small
      village of Hekendorp, always curious about how people justify their
      choices and how we might do better together.`,
    pictureName: "marloes_boere.jpg",
    links: [{
      text: "Dier, natuur en mens (boek)",
      url: "https://www.boom.nl/auteur/110-23442_Boere/100-18778_Dier-natuur-en-mens",
    }, {
      text: "Candidacy Partij voor de Dieren",
      url: "https://noordholland.partijvoordedieren.nl/personen/marloes-boere"
    }]
  },
  {
    fullName: "Arjan Smits",
    title: "Plant-based Food Aid",
    organization: "Plenty food",
    description: `Arjan Smits coordinates projects and fundraising for Plenty Food
            Nederland, supporting plant-based food aid around the world. He
            studied tropical forestry at Wageningen University, spending time in
            Cameroon to research how rainforests respond to human disturbance.
            For over a decade he has also been active with the Partij voor de
            Dieren, organizing campaigns and protests against animal testing,
            industrial farming, and ecological destruction.`,
    pictureName: "arjan_smits.jpg",
    links: [{
      text: "Plenty Food",
      url: "https://www.boom.nl/auteur/110-23442_Boere/100-18778_Dier-natuur-en-mens",
    }]
  },
  {
    fullName: "Johan Boonstra",
    title: "Undercover Researcher",
    organization: "Ongehoord",
    description: `Johan Boonstra (born 1982) is the spokesperson for the undercover investigation group Ongehoord. He studied philosophy at Utrecht University and decided to become a carpenter. Since 2011, he has been researching the workings and practices of Dutch livestock farming with undercover filming in stables and slaughterhouses as well as literature studies. Ongehoord has brought to light numerous cases of extreme animal abuse in Dutch and Belgium media.`,
    pictureName: "johan_boonstra.jpg",
    links: [{
      text: "Ongehoord website",
      url: "https://ongehoord.info",
    }]
  },
  {
    fullName: "Gabriela Cadore Pimentel",
    title: "Vegan Baker",
    organization: "Inclusive Bites",
    description: `Gabriela (she/her) is the owner of Inclusive Bites, a vegan and
            gluten-free bakery making delicious treats for everyone. A food
            engineer and passionate vegan since 2011, she combines her expertise
            with her love for animals to create inclusive, plant-based recipes
            and inspire others to see food as a powerful form of advocacy.`,
    pictureName: "gabriela.jpg",
    links: [{
      text: "Inclusive Bites Instagram",
      url: "https://www.instagram.com/inclusivebites/",
    }]
  },
  {
    fullName: "Niki Wagner",
    title: "Pigeon Rescuer",
    organization: "SOS duif",
    description: `Did you know you have the power to help pigeons right in your own
            neighborhood? Niki Wagner from SOS Duif shares her personal
            experience on how each of us can step up to care for the homeless
            and wild birds living alongside us in the city. From recognizing
            signs of illness to safely freeing pigeons trapped by strings or
            debris, there are simple, legal actions you can take that align with
            animal protection laws. These winged city dwellers often go
            unnoticed, but they depend on our kindness and awareness. By
            understanding how to identify their needs and knowing your legal
            obligations, you can directly improve their wellbeing — and make our
            urban environment a kinder place for all creatures. Ready to learn
            how to make a difference? Let’s take action, one pigeon at a time.`,
    pictureName: "niki_wagner.jpg",
    links: [{
      text: "SOS duif website",
      url: "https://www.sosduif.nl",
    }]
  },
];

const MODERATORS: Array<PersonInfo> = [
  {
    fullName: "That Chip Guy",
    title: "Youtuber, WeTheFree organizer",
    description: `Chip is one of the Netherlands’ most prolific YouTubers on the topic
      of veganism. Several times a week, he can be found on the streets of
      Amsterdam engaging people in thoughtful conversations about their
      values. His livestreams attract extremely large audiences.
      Beyond his online activism, Chip is also a weightlifter, certified
      nutritionist, and critical thinker. He brings a skeptical and
      analytical mindset to everything he does. In addition to his
      personal work, Chip is an organizer for WeTheFree Amsterdam and
      serves as the lead frontend developer at WeTheFree.`,
    links: [
      {
        text: "That Chip Guy, Youtube",
        url: "https://www.youtube.com/@ThatChipGuy"
      },
      {
        text: "Real Chip Guy, Instagram",
        url: "https://www.instagram.com/realchipguy/"
      }
    ],
    pictureName: "cip.jpg",
  }
];

export default function RAAF3() {
  const raaf3 = getEventByEventId("raaf3");

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
            Revolutionary Animal Advocacy Forum #3
          </h1>
          <p className="absolute bottom-2 w-full text-center text-white text-s drop-shadow-md text-green-200">
            Back again on the 28<sup>th</sup> of November in Amsterdam!
          </p>
        </div>
      </div>

      <div className="p-4">
        <p>RAAF is back with a third edition!
          We're very excited to announce our speakers, who come from an incredibly broad
          range of animal advocacy styles. From baking cakes to planting mental seeds to planting cameras,
          this is an evening to get inspired by all forms of activism.
        </p><p>
          If you are not yet an activist yourself or find yourself wondering how to energize
          or level up your activism, then RAAF is the #1 event for you. Five speakers will explain
          how they got into activism, what drives them, what challenges they faced, and what
          keeps them busy. They'll inspire you to get going to build the future we all desire —
          one in which humanity will recognize that animals are here with us, not for us.
        </p><p>
          After the talks, there will be plenty of time to socialize. We'll enjoy some music, vegan
          snacks, and new connections with like-minded people. We hope to see you there!
        </p>
        <p>
          P.S. If you have any questions about the event, please don't hestitate to <Link href="/contact">contact us</Link>.
        </p>
      </div>

      <div className="p-4 text-3xl">Free Signup (required)</div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1">
          <SignupForm eventId="raaf3" expires={raaf3?.startTime} />
        </div>

        <div className="w-full md:w-[350px] md:ml-8">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="pr-2">
                  <strong>Date:</strong>
                </td>
                <td>
                  28<sup>th</sup> November, 2025
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
                        <td>22:00</td>
                        <td>Social time</td>
                      </tr>
                      <tr>
                        <td>00:00</td>
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

      {SPEAKERS.map((speaker, idx) =>
        <Person key={idx} person={speaker} />
      )}

      <div className="px-4 pt-4 text-3xl">Moderator:</div>

      {MODERATORS.map((moderator, idx) =>
        <Person key={idx} person={moderator} />
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


function Person({ person }: { person: PersonInfo }) {
  return <div className="p-4 flex flex-col md:flex-row items-start gap-4">

    <div className="flex flex-col flex-1 order-2 md:order-1">
      <span className="text-2xl mb-2">{person.fullName}</span>
      <span className="text-xl mb-4 text-gray-600">{ person.organization ?
        `${person.title} @ ${person.organization}` : person.title}</span>

      <div className="mb-4 md:hidden self-center">
        <Image
          src={`/raaf3/${person.pictureName}`}
          width={275}
          height={330}
          alt={`Picture of ${person.fullName}`}
          className="rounded-lg"
        />
      </div>

      <p className="py-2">
        {person.description}
      </p>

      <div className="p-4">
        <ul className="list-disc pl-8">
          {person.links.map((link, lidx) =>
            <li key={lidx}>
              <a
                href={link.url}
                target="_blank"
              >
                {link.text}
              </a>
            </li>)}
        </ul>
      </div>
    </div>

    <div className="order-1 md:order-2 hidden md:block">
      <Image
        src={`/raaf3/${person.pictureName}`}
        width={275}
        height={330}
        alt={`Picture of ${person.fullName}`}
        className="flex-shrink-0 rounded-lg"
      />
    </div>

  </div>
}