
export default function Home() {
  return (
    <>
      <div className="py-2 w-full text-2xl">
        Welcome to the Vegan Future of Amsterdam
      </div>
      <p className="py-2">
        We are a group of activists from Amsterdam. We are dedicated to making the future vegan, one person at a time.
      </p>
      <div className="pt-2 w-full text-xl">Not vegan yet?</div>
      <p className="py-4">
        Please watch this speech:
      </p>
      <div className="py-2 w-full">
        <iframe
          src="https://www.youtube.com/embed/uxhL2lsgokY?si=1CMtFfuaLlPGK9IV"
          allowFullScreen={true}
          className="w-full md:h-96 lg:h-[500px]" />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
          <div className="pb-4">Find vegan food with the free app happy cow:</div>
          <div className="flex flex-1 border-1">
            <div className="px-4">
              <a href="https://www.happycow.net/" target="_blank">
                <img src="happycow-logo.png" alt="Happy Cow Logo" width={100} />
              </a>
            </div>
            <div>
              <div className="pb-2">
                <a href="https://play.google.com/store/apps/details?id=com.hcceg.veg.compassionfree&referrer=utm_source%3Dhappycow%26utm_campaign%3Dmobile_page">
                  <img src="google-play-badge.png" alt="Google play store" width={100} />
                </a>
              </div>
              <div>
                <a href="https://apple.co/2n3sNti">
                  <img src="app-store-badge.png" alt="Apply app store" width={100} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
          <h2>Try going vegan in 22 days with:</h2>
          <a href="https://challenge22.com/" target="_blank">
            <img src="challenge22-logo.png" alt="Challenge 22 Logo" width={190} />
          </a>
          <h2>Free registered nutritionists help you out</h2>
        </div>
      </div>
    </>
  );
}
