import { NextEvent } from "@/components/next-event/next-event";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-red-200 text-red-900 px-4 py-3 text-center text-sm md:text-base font-medium shadow-sm">
        <strong>Not vegan yet? </strong>
        <Link
          href="https://video.veganfuture.org"
          className="underline font-semibold hover:text-red-600 transition-colors"
        >
          Start your journey here!
        </Link>
      </div>
      <div className="p-4 w-full text-2xl font-comfortaa">
        What&apos;s <strong>Vegan Future</strong>?
      </div>
      <div className="p-4">
        We organize events to accelerate the shift toward a vegan world — one
        that’s compassionate, practical, and sustainable.
      </div>
      <ul className="list-disc px-6 space-y-4">
        <li>
          For non-vegans, we host <Link href="/street_outreach">outreach</Link>{" "}
          events that{" "}
          <strong>
            spark change through respectful, motivating conversations.
          </strong>{" "}
          We hand out leaflets that feature local vegan restaurants and
          practical tips to help people go vegan with confidence.
        </li>
        <li>
          For activists, we create spaces to grow and connect. Our flagship
          event, <Link href="/raaf">RAAF</Link>, is a forum where{" "}
          <strong>experienced advocates share insights</strong>, building
          community through collaboration and storytelling.
        </li>
      </ul>
      <div className="mt-8 flex flex-col md:flex-row gap-8 px-4 pb-2 items-stretch">
        <div className="flex-1">
          <div className="p-4 border rounded-lg shadow-sm bg-white h-full flex flex-col">
            <div className="text-xl font-semibold mb-2">Our latest video:</div>
            <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/7HQdpSQ2UTY?si=3yUBznqX0DHLJoTb"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-4 border rounded-lg shadow-sm bg-white h-full flex flex-col">
            <div className="text-xl font-semibold mb-2">Our next events:</div>
            <NextEvent />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 text-2xl font-comfortaa">
        <strong>Join us</strong> — and help build the future we believe in.
      </div>
      <div className="p-4">
        The animals need our help and we&apos;re always happy to meet new
        people. Jump into our <Link href="/join_us">Signal group</Link> and
        we&apos;ll get you up to speed!
      </div>
    </>
  );
}
