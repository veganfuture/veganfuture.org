import { Metadata } from 'next';
import Image from 'next/image';
import { withBaseUrl } from '@/lib/metadata';
import { SignupForm } from './signup_form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RAAF, 23rd of May in Amsterdam',
  description: '5 inspiring speakers show how you can stand up for animals your way',
  openGraph: {
    title: 'RAAF, 23rd of May in Amsterdam',
    description: '5 inspiring speakers show how you can stand up for animals your way',
    images: [
      {
        url: withBaseUrl('/raaf/raaf_opengraph.jpg'),
        width: 764,
        height: 400,
        alt: 'RAAF Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAAF, 23rd of May in Amsterdam',
    description: '5 inspiring speakers show how you can stand up for animals your way',
    images: [withBaseUrl('/raaf/raaf_opengraph.jpg')],
  },
}

export default function RAAF() {
  return (
    <>
      <div className="relative w-full h-[200px]">
        <Image
          src="/raaf/raaf_banner.jpg"
          alt="RAAF banner"
          fill
          style={{ objectFit: 'cover' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg">
            Revolutionary Animal Advocacy Forum
          </h1>
          <p className="absolute bottom-2 w-full text-center text-white text-s drop-shadow-md text-green-200">
            Coming to you on the 23<sup>rd</sup> of May in Amsterdam!
          </p>
        </div>
      </div>

      <div className="p-4">
        <p>
          RAAF (Revolutionary Animal Advocacy Forum) is an event that inspires you to <em>stand up for animal rights in ways that fit your unique personalities and strengths</em>. We&apos;ll invite <em>experienced advocates to share personal insights</em> and leave plenty of space for reflection.
          After the talks we&apos;ll have time for connection, and a warm, welcoming atmosphere where you can recharge and enjoy yourself.
        </p>
        <p>
          This is the first RAAF of what we plan to make a series of gatherings. Our mission is to bring the animal rights movement in the Netherlands closer together, so we can all be more effective advocates for the animals. <em>We hope to see you at RAAF #1</em>.
        </p>
      </div>

      <div className="p-4 text-3xl">
        Reserve your spot for an unforgettable evening!
      </div>

      <div className="p-4 pb-2">
        Whether you&apos;re curious about getting involved or already deep in the movement, RAAF is the place to connect, grow, and celebrate shared values.
      </div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">

        <div className="flex-1">
          <p className="pb-4">
          <strong>Spots are limited</strong>, so early registration is strongly recommended.
          </p>
          <SignupForm />
        </div>

        <div className="w-full md:w-[350px] md:ml-8">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="pr-2"><strong>Date:</strong></td>
                <td>23<sup>rd</sup> May, 2025</td>
              </tr>
              <tr>
                <td className="align-top  pr-2"><strong>Agenda:</strong></td>
                <td><table>
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
                      <td>21:10</td>
                      <td>Social time</td>
                    </tr>
                    <tr>
                      <td>23:00</td>
                      <td>Doors close</td>
                    </tr>
                  </tbody>
                </table></td>
              </tr>
              <tr>
                <td rowSpan={4} className="align-top pr-2"><strong>Location:</strong></td>
                <td>Buurtsalon Jeltje</td>
              </tr>
              <tr><td>Eerste Helmersstraat 106-N</td></tr>
              <tr><td>1054 EG Amsterdam</td></tr>
              <tr><td>(wheel chair accessible)</td></tr>
              <tr><td className="pr-2"><strong>Language:</strong></td><td>English</td></tr>
              <tr><td className="pr-2"><strong>Cost:</strong></td><td>Donation based</td></tr>
              <tr><td className="pr-2" colSpan={2}></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 pt-4 text-3xl">
        Confirmed speakers:
      </div>
      <div className="pl-4">
        (more speakers to be announced 📣)
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Floris van den Berg</span>
          <p className="py-4">
            Floris Vegan Den Berg is a philosopher and thus a vegan. He is specialized in environmental ethics and animal ethics. He has written extensively on these topics including <em>Philosophy for a better world</em>. He strives for a world with less suffering and more happiness – starting with making The Netherlands the first fully vegan nation in the world.
          </p>
          <div>
            <ul className="list-disc pl-8">

              <li>
                <a href="https://nl.wikipedia.org/wiki/Floris_van_den_Berg" target="_blank">Floris van den Berg on Wikipedia</a></li>
              <li><a href="https://www.bol.com/nl/nl/b/boeken-floris-van-den-berg/3456879+8299/" target="_blank">Books of Floris van den Berg</a></li></ul></div>
        </div>

        <Image
          src={"raaf/floris-van-den-berg.jpg"}
          width={275}
          height={330}
          alt="Picture of Floris van den Berg"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Priya Sjambar</span>
          <p className="py-4">
            Priya is a high-powered and multi-talented vegan activist. Amongst other things, she is a plant based chef, a psychologist, street activist and board member at an animal sanctuary. She runs <em>Mental Health for Vegan Activists</em> to help vegan activists with the hardships of fighting for justice in a largely unjust world. On her instagram she shares an amazing mix of plant based recipes, interviews with other vegan activists and her incredible diverse life in service of the animals.
          </p>
          <div>
            <ul className="list-disc pl-8">
              <li><a href="https://www.instagram.com/plantbasedchef.priya/" target="_blank">Priya&apos;s Instagram</a></li>
              <li><a href="https://www.mentalhealthforveganactivists.nl/" target="_blank">Mental health for vegan activists</a></li>
            </ul>
          </div>
        </div>

        <Image
          src={"raaf/priya.jpg"}
          width={275}
          height={330}
          alt="Picture of Priya"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 flex flex-col md:flex-row items-start gap-4">
        <div className="flex-1">
          <span className="text-2xl">Nicoll Peracha</span>
          <p className="py-4">
            Nicoll is the founder and executive director of <em>The Mission Motor</em>. With The Mission Motor Nicoll supports organizations in developing and implementing monitoring and evaluation systems within the animal and vegan advocacy community. Previously Nicoll worked for 8 years at Proveg. She holds a law degree and has 25 years of experience in the international non-profit sector.
          </p>
          <div>
            <ul className="list-disc pl-8">
              <li><a href="https://www.themissionmotor.org/" target="_blank">The Mission Motor</a></li>
              <li><a href="https://www.linkedin.com/in/nicoll-peracha/" target="_blank">Nicoll&apos;s LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <Image
          src={"raaf/nicoll-peracha.jpg"}
          width={275}
          height={330}
          alt="Picture of Nicoll Peracha"
          className="flex-shrink-0"
        />
      </div>
      <div className="p-4 text-3xl">
        Learn more
      </div>
      <div className="p-4">
        For more information about RAAF <Link href="/contact">contact us</Link>.
      </div>
    </>
  );
}
