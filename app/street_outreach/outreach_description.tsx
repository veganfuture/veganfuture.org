import Link from "next/link";
import Image from "next/image";

export function OutreachDescription() {
  return (
    <>
      <div className="p-4">
        <Image
          src="/group_photo.jpg"
          width={300}
          height={225}
          alt="Group photo"
        />
        (group photo after a street outreach event)
      </div>
      <div className="p-4">
        We engage non-vegans in conversations about the benefits of going vegan.
        Our approach is constantly evolving, with methods like the{" "}
        <Link href="/socialexperiment">Social Experiment</Link>, flyering,
        quizzes, and even selling “dog meat” as a thought-provoking tactic.
      </div>
      <div className="p-4">
        Our core principle is to ensure <b>positive interactions</b>. If someone
        becomes defensive or hostile, we end the conversation politely and
        immediately.
      </div>
      <div className="p-4">
        During conversations, we aim to:
        <ol className="list-decimal pl-6">
          <li>
            <b>Inform:</b> Explain the ethical reasons to go vegan
          </li>
          <li>
            <b>Show:</b> Footage of animal agriculture (not shown to anyone
            under 16)
          </li>
          <li>
            <b>Provide:</b> Practical resources on going vegan and where to
            learn more
          </li>
          <li>
            <b>Leave:</b> A positive impression of veganism and vegans
          </li>
        </ol>{" "}
      </div>{" "}
      <div className="p-4">
        {" "}
        Some conversations are filmed, with consent, and shared on our{" "}
        <Link href="https://www.youtube.com/@kindfuturenow">
          YouTube channel
        </Link>{" "}
        to reach a broader audience.{" "}
      </div>
    </>
  );
}
