export default function MapOfAmsterdam() {
  return (
    <>
      <div className="text-2xl font-bold p-4 pb-2">Vegan Map Of Amsterdam</div>
      <div className="p-4 pb-2">
        Feel free to print this map and give it to people who you&apos; ve met
        on the streets of Amsterdam!
      </div>
      <div className="p-4">
        <img
          src="VeganMapOfAmsterdam.png"
          alt="Vegan Map of Amsterdam"
          width={600}
        />
        <p className="text-sm">(This is an out-of-date preview of the map)</p>
      </div>
      <div className="p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="https://docs.google.com/presentation/d/1piA1_2ddn9ZOO6XRk87wRTiUOlaAGkyG6lOV1rYPJs0/edit?usp=sharing">
            Download The Vegan Map Of Amsterdam
          </a>
          .
        </button>
      </div>
    </>
  );
}
