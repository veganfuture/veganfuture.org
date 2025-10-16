export function DonateRaaf() {
  return (
    <>
      <p className="text-lg mb-4">
        RAAF is a donation-based event. We do have some costs though (e.g.
        renting the space, snacks, printing flyers, etc.). To break even, we
        need about <strong>5 euros per person</strong>, but keep in mind that
        some people don&apos;t donate. If you can support us, it would mean the
        world 💚
      </p>
      <p className="mb-6 text-md text-gray-700">
        You can easily donate through iDEAL:
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <a
          href="https://bunq.me/raaf/5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Donate €5 - help us break even 🙏
        </a>
        <a
          href="https://bunq.me/raaf/10"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Donate €10 - help the next RAAF 💚
        </a>
        <a
          href="https://bunq.me/raaf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Other amount - Be a super supporter of RAAF 🫶
        </a>
      </div>
    </>
  );
}
