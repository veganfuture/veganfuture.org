import { NextEvent } from "@/components/next-event/next-event";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="p-4 w-full text-2xl">
        What's <strong>Vegan Future</strong>?
      </div>
      <div className="p-4">
        We organize events to accelerate the shift toward a vegan world — one that’s compassionate, practical, and sustainable.
      </div>
      <ul className="list-disc px-6 space-y-4">
        <li>For non-vegans, we host <Link href="/street_outreach">outreach</Link> events that <strong>spark change through respectful, motivating conversations.</strong> We hand out leaflets that feature local vegan restaurants and practical tips to help people anyone go vegan with confidence.
      </li>
      <li>
        For activists, we create spaces to grow and connect. Our flagship event, <Link href="/raaf">RAAF</Link>, is a forum where <strong>experienced advocates share insights</strong>, building community through collaboration and storytelling.
      </li>
      </ul>
      <div className="mt-8 flex flex-col md:flex-row gap-8 px-4 pb-2 items-stretch">
  {/* Block 1 */}
  <div className="flex-1">
    <div className="p-4 border rounded-lg shadow-sm bg-white h-full flex flex-col">
      <div className="text-xl font-semibold mb-2">Our latest video:</div>
      <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          className="w-full h-full rounded"
          src="https://www.youtube.com/embed/n_bOlp8sKQ0?si=dUsvAzS1irElxhGH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  </div>

  {/* Block 2 */}
  <div className="flex-1">
    <div className="p-4 border rounded-lg shadow-sm bg-white h-full flex flex-col">
      <div className="text-xl font-semibold mb-2">Our next event:</div>
      <NextEvent />
    </div>
  </div>
</div>

      <div className="px-4 pt-4 text-2xl">
        <strong>Join us</strong> — and help build the future we believe in.
      </div>
      <div className="p-4">
        Do you want to join one of our events? Please <Link href="/contact">contact us</Link> and we'll get you fully up to speed.
      </div>
      </>
  );
}
