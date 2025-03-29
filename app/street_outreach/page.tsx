import Link from 'next/link';
import Image from 'next/image';

export default function StreetOureach() {
  return (
    <>
      <div className="text-2xl font-bold p-4">Street outreach</div>
      <div className="p-4">
        Every two weeks we go out onto the streets of Amsterdam to talk to non-vegans about the benefits of going vegan. We are continously updating our approach. One of the methods is the <Link href="/socialexperiment2">Social experiment 2.0</Link>. We do a number of things though, such as flyering, quizes, selling &quot;dogmeat&quot;.
      </div>
      <div className="p-4">
        One of our main goals it to only have <b>positive interactions</b>. If someone becomes defensive or even hostile, we immediatelely and as pleasantly as possible end the conversation. 
      </div>      
      <div className="p-4">
        When we talk to non-vegans we try to achieve the following:
        <ol className="list-decimal pl-6">
          <li><b>Inform:</b> about the ethical reasons to go vegan</li>
          <li><b>Show:</b> footage of animal agriculture (unless they are younger than 16 years)</li>
          <li><b>Supply:</b> resources (e.g. where to go for vegan food, how to become vegan and where they can learn more)</li>
          <li><b>Leave:</b> positive feeling about veganism</li>
        </ol>
      </div>
      <div className="p-4">
        We film some of our interactions and place them on our <Link href="https://www.youtube.com/@kind-future">youtube channel</Link>. This way we can spread our message wider. Filming is always consensual.
      </div>
      <div className="p-4">
        <Image src="group_photo.jpg" width={600} height={450} alt="Group photo" />
        (group photo after a street outreach event)
      </div>
    </>
  );
}
