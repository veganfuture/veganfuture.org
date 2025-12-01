import Image from "next/image";
import Link from "next/link";

export default function Flyers() {
  return (
    <>
      <div className="text-2xl p-4 pb-2 font-comfortaa">
        Flyers
      </div>
      <div className="p-4 pb-2">
        This flyer is meant for the general (non-vegan) public. We hand these out during street outreach. On the back of this flyer we typically print <Link href="/mapofamsterdam">the vegan map of Amsterdam</Link>.
      </div>
      <div className="p-4">
        <Image
          src="VeganFutureFlyerPreview.png"
          alt="Vegan Future Flyer Preview"
          width={300}
          height={426}
        />
        <p className="text-sm">(This is a preview only)</p>
      </div>
      <div className="p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="https://docs.google.com/presentation/d/1vGWrepYeNnOqeCOY4vpdVnoZaAXWBpM4rnQ_EF6GNo0/edit?usp=sharing">
            Download The Vegan Future Flyer
          </a>
        </button>
      </div>
    </>
  );
}
