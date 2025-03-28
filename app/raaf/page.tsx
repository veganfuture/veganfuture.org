"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function RAAF() {

  const [showDonationDialog, setShowDonationDialog] = useState(false);

  useEffect(() => {
    if (showDonationDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDonationDialog]);

  const onSignup = () => {
    setShowDonationDialog(true);
  }

  return (
    <>
      <div className="relative w-full h-[200px]">
        <Image
          src="/raaf_banner.jpg"
          alt="RAAF banner"
          layout="fill"
          objectFit="cover"
        />
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
          RAAF (Revolutionary Animal Advocacy Forum) is an event that inspires and you to <em>stand up for animal rights in ways that fit your unique personalities and strengths</em>. We'll invite <em>experienced advocates to share personal insights</em> and leave plenty of space for reflection.
          After the talks we'll have time for connection, and a warm, positive atmosphere to recharge and have fun.
        </p>
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
            Floris Vegan Den Berg is a philosopher and thus a vegan. He is specialized in environmental ethics and animal ethics. He has written extensively on these topics including <em>'Philosophy for a better world'</em>. He strives for a world with less suffering and more happiness – starting with making The Netherlands the first fully vegan nation in the world.
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
            Priya is a high-powered and multi-talented vegan activist. Amongst other things, she is a plant based chef, a psychologist, street activist and board member at an animal sanctuary. She runs <em>mental health for vegan activists</em> to help vegan activists with the hardships of fighting for justice in a largely unjust world. On her instagram she shares an amazing mix of plant based recipes, interviews with other vegan activists and her incredible diverse life in service of the animals.
          </p>
          <div>
            <ul className="list-disc pl-8">
              <li><a href="https://www.instagram.com/plantbasedchef.priya/" target="_blank">Priya's instagram</a></li>
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
              <li><a href="https://www.linkedin.com/in/nicoll-peracha/" target="_blank">Nicoll's LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <Image
          src={"raaf/nicoll-peracha.jpg"}
          width={275}
          height={330}
          alt="Picture of Priya"
          className="flex-shrink-0"
        />
      </div>

      <div className="p-4 text-3xl">
        Sign up to join us for an amazing evening!
      </div>

      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-8">

        <div className="flex-1">
          <iframe name="hidden_iframe" id="hidden_iframe" className="w-[1px] h-[1px]"></iframe>

          <div className="pb-6">
            Whether you're curious about getting involved or already deep in the movement, RAAF is the place to connect, grow, and celebrate shared values.
          </div>

          <form
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdcFt2AsUMF8EWGVZloGSdSq8pIZs8yoo7g1lvglqPnLigRKQ/formResponse?embedded=true"
            method="POST"
            target="hidden_iframe"
            onSubmit={onSignup}
          >
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="name"><strong>Name:</strong></label>
                    </td>
                    <td>
                      <input className="ml-2 border border-gray-600 w-full" type="text" id="name" name="entry.479881687" required />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="email"><strong>Email:</strong></label>
                    </td>
                    <td>
                      <input className="ml-2 border border-gray-600 w-full" type="email" id="email" name="emailAddress" required />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200">
              Sign up to join RAAF
            </button>
          </form>

        </div>

        <div className="w-full md:w-[350px] md:ml-8">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="pr-2"><strong>Date:</strong></td>
                <td>23rd May 2025</td>
              </tr>
              <tr>
                <td className="pr-2"><strong>Time:</strong></td>
                <td>18:30 to 21:30 (no hard stop!)</td>
              </tr>
              <tr>
                <td rowSpan={3} className="align-top pr-2"><strong>Location:</strong></td>
                <td>Buurtsalon Jeltje</td>
              </tr>
              <tr><td>Eerste Helmersstraat 106-N</td></tr>
              <tr><td>1054 EG Amsterdam</td></tr>
              <tr><td className="pr-2"><strong>Language:</strong></td><td>English</td></tr>
              <tr><td className="pr-2"><strong>Cost:</strong></td><td>Donation based</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {showDonationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl text-center shadow-xl w-full max-h-[90vh] overflow-y-auto touch-auto">
            <h2 className="text-4xl font-bold mb-4 text-green-700">Thank you for signing up!</h2>
            <p className="text-lg mb-4">
              RAAF is a donation-based event. We do have some costs though (e.g. renting the space). To break even, we need about <strong>5 euros per person</strong>.
              If you can support us, it would mean the world 🫶
            </p>

            <p className="mb-6 text-md text-gray-700">You can donate easily using PayPal below:</p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=5&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Donate €5 - help us break even
              </a>
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=5&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Donate €10 - champion the speakers
              </a>
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Other Amount
              </a>
            </div>

            <p className="p-4">We're not in it to make money, therefore whatever extra money we shall receive we will hand to our speakers!</p>

            <button
              onClick={() => setShowDonationDialog(false)}
              className="mt-2 text-gray-600 underline hover:text-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
