import { Metadata } from "next";
import Image from "next/image";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";
import { SignupForm } from "../signup_form";
import { DonateRaaf } from "../donate_raaf";

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
          RAAF (Revolutionary Animal Advocacy Forum) is back! We&apos;re
          currently in the process of speaker selection. We&apos;ve got a lot of
          speakers lined up, so the next RAAF should be as awesome as the last.
          Track this page or{" "}
          <Link href="https://www.instagram.com/vf.raaf/" target="_blank">
            follow us on Instagram
          </Link>{" "}
          for updates!
        </p>
      </div>

      <div className="p-4 text-3xl">Signup</div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1">
          <SignupForm eventId="raaf2" />
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

      <div className="px-4 pt-4 text-3xl">Confirmed speakers:</div>

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
          alt="Picture of Remco"
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
        For more information about RAAF <Link href="/contact">contact us</Link>.
      </div>
    </>
  );
}
