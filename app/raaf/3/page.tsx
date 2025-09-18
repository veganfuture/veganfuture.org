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
        <p>
          RAAF (Revolutionary Animal Advocacy Forum) is back!{" "}
          <strong>
            We&apos;re currently in the process of speaker selection.
          </strong>{" "}
          If you want to speak at RAAF, please fill out the <a href="https://forms.gle/h6kebmbPFcGZuwEW6" target="_blank">speaker signup form</a> or <Link href="/contact">contact us</Link>.
          Sign up for our <Link href="/raaf#newsletter">newsletter</Link> or{" "}
          <Link href="https://www.instagram.com/vf.raaf/" target="_blank">
            follow us on Instagram
          </Link>{" "}
          for updates!
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

      <div className="px-4 pt-4 text-3xl">Confirmed Speakers:</div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Marloes Boere</span>
          <p className="py-4">
            Marloes Boere develops training programs for politicians on ethics, environmental education, and debating skills. She studied Future Planet Studies and Philosophy in Amsterdam, and co-authored an ethics textbook for high school philosophy students. Before that, she grew up in the small village of Hekendorp, always curious about how people justify their choices and how we might do better together.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://www.boom.nl/auteur/110-23442_Boere/100-18778_Dier-natuur-en-mens" target="_blank">
                  Dier, natuur en mens (boek)
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
          <span className="text-2xl">Arjan Smits</span>
          <p className="py-4">
            Arjan Smits coordinates projects and fundraising for Plenty Food Nederland, supporting plant-based food aid around the world. He studied tropical forestry at Wageningen University, spending time in Cameroon to research how rainforests respond to human disturbance. For over a decade he has also been active with the Partij voor de Dieren, organizing campaigns and protests against animal testing, industrial farming, and ecological destruction.
          </p>
          <div className="p-4">
            <ul className="list-disc pl-8">
              <li>
                <a href="https://plentyfood.nl/" target="_blank">
                  Plenty Food
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/arjan-smits-bb078013" target="_blank">
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

      <div className="px-4 pt-4 text-2xl">More speakers to be announced 📣</div>


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
