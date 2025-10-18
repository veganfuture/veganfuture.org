import { Metadata } from "next";
import Image from "next/image";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";
import { SignupForm } from "../signup_form";
import { DonateRaaf } from "../donate_raaf";
import { getEventByEventId } from "@/lib/events";

const title = "RAAF#3, 28th of November in Amsterdam";
const description =
  "Join us, once again, for RAAF#3 on the 28th of November in Amsterdam. Doors open at 18:30!";

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
        <p>RAAF (Revolutionary Animal Advocacy Forum) is back with a third edition!
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

      <div className="px-4 pt-4 text-3xl">Confirmed Speakers:</div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Marloes Boere - Philosophy Educator</span>
          <p className="py-4">
            Marloes Boere develops training programs for politicians on ethics,
            environmental education, and debating skills. She studied Future
            Planet Studies and Philosophy in Amsterdam, and co-authored an
            ethics textbook for high school philosophy students. Before that,
            she grew up in the small village of Hekendorp, always curious about
            how people justify their choices and how we might do better
            together.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a
                  href="https://www.boom.nl/auteur/110-23442_Boere/100-18778_Dier-natuur-en-mens"
                  target="_blank"
                >
                  Dier, natuur en mens (boek)
                </a>
              </li>
              <li>
                <a
                  href="https://noordholland.partijvoordedieren.nl/personen/marloes-boere"
                  target="_blank"
                >
                  Candidacy Partij voor de Dieren
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Image
          src={"/raaf3/marloes_boere.jpg"}
          width={275}
          height={330}
          alt="Picture of Marloes Boere"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Arjan Smits - Plant-based Food Aid</span>
          <p className="py-4">
            Arjan Smits coordinates projects and fundraising for Plenty Food
            Nederland, supporting plant-based food aid around the world. He
            studied tropical forestry at Wageningen University, spending time in
            Cameroon to research how rainforests respond to human disturbance.
            For over a decade he has also been active with the Partij voor de
            Dieren, organizing campaigns and protests against animal testing,
            industrial farming, and ecological destruction.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://plentyfood.nl/" target="_blank">
                  Plenty Food
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/arjan-smits-bb078013"
                  target="_blank"
                >
                  Arjan Smits on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf3/arjan_smits.jpg"}
          width={275}
          height={330}
          alt="Picture of Arjan Smits"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">
            Johan Boonstra - Undercover Researcher
          </span>
          <p className="py-4">
            Johan Boonstra (born 1982) is the spokesperson for the undercover investigation group Ongehoord. He studied philosophy at Utrecht University and decided to become a carpenter. Since 2011, he has been researching the workings and practices of Dutch livestock farming with undercover filming in stables and slaughterhouses as well as literature studies. Ongehoord has brought to light numerous cases of extreme animal abuse in Dutch and Belgium media.           </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://ongehoord.info" target="_blank">
                  Ongehoord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf3/johan_boonstra.jpg"}
          width={275}
          height={330}
          alt="Picture of Johan Boonstra"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">
            Gabriela Cadore Pimentel - Vegan Baker
          </span>
          <p className="py-4">
            Gabriela (she/her) is the owner of Inclusive Bites, a vegan and
            gluten-free bakery making delicious treats for everyone. A food
            engineer and passionate vegan since 2011, she combines her expertise
            with her love for animals to create inclusive, plant-based recipes
            and inspire others to see food as a powerful form of advocacy.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a
                  href="https://www.instagram.com/inclusivebites/?hl=en"
                  target="_blank"
                >
                  Inclusive Bites Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf3/gabriela.jpg"}
          width={275}
          height={330}
          alt="Picture of Gabriela Cadore Pimentel"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Niki Wagner - Pigeon Rescuer</span>
          <p className="py-4">
            Did you know you have the power to help pigeons right in your own
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
            how to make a difference? Let’s take action, one pigeon at a time.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://www.sosduif.nl" target="_blank">
                  SOS duif website
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf3/niki_wagner.jpg"}
          width={275}
          height={330}
          alt="Picture of Niki Wagner"
          className="flex-shrink-0"
        />
      </div>

      <div className="px-4 pt-4 text-3xl">Moderator:</div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">
            That Chip Guy - Youtuber, WTF organizer
          </span>
          <p className="py-4">
            Chip is one of the Netherlands’ most prolific YouTubers on the topic
            of veganism. Several times a week, he can be found on the streets of
            Amsterdam engaging people in thoughtful conversations about their
            values. His livestreams attract extremely large audiences.
          </p>
          <p className="py-4">
            Beyond his online activism, Chip is also a weightlifter, certified
            nutritionist, and critical thinker. He brings a skeptical and
            analytical mindset to everything he does. In addition to his
            personal work, Chip is an organizer for WeTheFree Amsterdam and
            serves as the lead frontend developer at WeTheFree.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://www.youtube.com/@ThatChipGuy" target="_blank">
                  That Chip Guy, Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/realchipguy/"
                  target="_blank"
                >
                  Real Chip Guy, Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Image
          src={"/raaf3/cip.jpg"}
          width={275}
          height={330}
          alt="Picture of That Chip Guy"
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
