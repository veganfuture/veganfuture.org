import Image from "next/image";

export default function JoinUs() {
  return (
    <>
      <div className="text-2xl font-bold p-4 font-comfortaa">Join Us</div>
      <p className="p-4">
        The quickest way to join us is to join our Signal group. Just join the
        group by following the link below. Once you're in the group please
        introduce yourself. A few things we'd love to know about you:
      </p>
      <ul className="px-4 pt-2 pb-4 list-disc ml-4">
        <li>Name, age and how long you've been vegan</li>
        <li>Previous experience with vegan activism</li>
        <li>Which events you'd like to attend</li>
      </ul>

      <a
        href="https://signal.group/#CjQKIIejwwWrcfw4uWRdv3M7oZx34HM9H-uvcTnxZeY-K6EBEhC4bsMUN5MbkflmSieu8LxD"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 p-4 rounded inline-flex items-center space-x-2"
      >
        <Image src="/Signal.svg" width={24} height={24} alt="Signal Logo" />
        <span>Join our Signal group</span>
      </a>
      <p className="p-4">
        There is no need to be shy. We're all very kind people and are happy to
        have you join us! 🤗
      </p>
    </>
  );
}
