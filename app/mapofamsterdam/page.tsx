export default function MapOfAmsterdam() {
  return <>
    <div className="text-2xl font-bold p-4 pb-2">Vegan Map Of Amsterdam</div>
    <div className="p-4 pb-2">
      Feel free to print this map and give it to people who you&apos; ve met on the streets of Amsterdam!
    </div>
    <div className="p-4">
      <img src="resources/map/VeganMapOfAmsterdam.png" alt="Vegan Map of Amsterdam" width={600} />
    </div>
    <div className="p-4">
      Download: &nbsp;
      <a href="resources/map/VeganMapOfAmsterdam.pptx" className="underline">VeganMapOfAmsterdam.pptx</a>
    </div>
  </>;
}
