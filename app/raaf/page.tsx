import { BASE_METADATA } from "@/lib/metadata";
import { Metadata } from "next/types";
import Image from "next/image";
import { Agenda } from "@/components/agenda/agenda";

const title = "Revolutionary Animal Advocacy Forum";
const description =
  "RAAF inspires you to stand up for animal rights in ways that fit your unique personalities and strengths";

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

export default function RAAF() {
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
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg font-comfortaa">
            Revolutionary Animal Advocacy Forum
          </h1>
        </div>
      </div>

      <div className="p-4">
        <p>
          The Revolutionary Animal Advocacy Forum (RAAF) is a recurring event
          that inspires you to{" "}
          <em>
            stand up for animal rights in ways that fit your unique
            personalities and strengths
          </em>
          . We&apos;ll invite{" "}
          <em>experienced advocates to share personal insights</em> and leave
          plenty of space for reflection. After the talks we&apos;ll have time
          for connection, and a warm, welcoming atmosphere where you can
          recharge and enjoy yourself.
        </p>
      </div>
      <Agenda filterOnTypes={["raaf"]} />
      <div className="p-4">
        <p className="text-xl">RAAF values:</p>
        <br />
        <ul className="list-disc pl-8">
          <li>
            <strong>Radical acceptance:</strong> As animal rights advocates
            we&apos;re all on the same general page when it comes to animal
            rights, however we expect and welcome disagreement on other points
            and nuances. RAAF is a forum, not an echo chamber. All speakers are
            welcome as long as they are animal rights advocates and they do not
            practice hate or hate speech.
          </li>
          <li>
            <strong>As much dialogue as monologue:</strong> RAAF is meant to be
            interactive. We want your participation and are curious to hear your
            opinions and experiences. Speakers will start the dialogue with a
            monologue and we&apos;ll make sure each gets as much time as the
            other.
          </li>
          <li>
            <strong>No one best way:</strong> We don&apos;t know what the
            best/fastest way is to achieve animal liberation, therefore
            we&apos;ll intentionally invite a wide range of speakers to show
            that there are many ways that lead to Rome. Each speaker at a given
            RAAF will be unique in their approach to animal rights advocacy.
          </li>
          <li>
            <strong>Good vibes:</strong> Animal rights activism is hard enough.
            We want you to be relaxed and feel at home. We hope you&apos;ll feel
            the good vibes that we are trying to generate with RAAF.
          </li>
        </ul>
      </div>
    </>
  );
}
