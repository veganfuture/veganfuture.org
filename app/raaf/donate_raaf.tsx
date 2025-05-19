export function DonateRaaf() {
  return (
    <>
      <p className="text-lg mb-4">
        RAAF is a donation-based event. We do have some costs though (e.g.
        renting the space, snacks, etc.). To break even, we need about{" "}
        <strong>5 euros per person</strong>. If you can support us, it would
        mean the world 💚
      </p>
      <p className="mb-6 text-md text-gray-700">
        You can donate easily using Tikkie below:
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <a
          href="https://tikkie.me/pay/as6hurdqkfohdelb26nr"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Donate €5 - help us break even
        </a>
        <a
          href="https://tikkie.me/pay/4hau5r6ig3go6na6cta9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Donate €10 - help support the next RAAF
        </a>
        <a
          href="https://tikkie.me/pay/ucra6itle0jkoa3fjf28"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Other Amount
        </a>
      </div>
    </>
  );
}
