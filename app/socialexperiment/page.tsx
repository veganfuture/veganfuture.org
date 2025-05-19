export default function SocialExperiment() {
  return (
    <>
      <p className="text-2xl">Social Experiment</p>
      <p>
        One of the techniques we use for our outreach is what we call the social
        experiment. The main idea behind the experiment is that we test
        people&apos;s morality in the safe space of thought experiments. The
        experiments get increasingly difficult, which is designed to prevent
        people from experiencing cognitive dissonance. If people do not have a
        moral framework that aligns with veganism, we simply wish them a nice
        life and move on to the next person.
      </p>
      <p>
        Here is an example of{" "}
        <a href="https://www.youtube.com/@veganpowerlab">Vegan Power Lab</a>{" "}
        conducting the social experiment 2.0:
      </p>
      <p>
        <iframe
          src="https://www.youtube.com/embed/A9LXQwd2yzk?si=N_xkCAjqcmwuqpDq"
          allowFullScreen={true}
          className="w-full md:h-96 lg:h-[500px]"
        />
      </p>
      <p className="text-xl">The Script</p>
      <p>
        Here are all versions of the script:
        <ol>
          <li className="list-disc mx-8">
            <a
              className="underline"
              href="https://docs.google.com/document/d/1NwPWUP1YIPzur1_dO1uM4uGfZgpBCDZ_pBlbE1NNXk0/edit?usp=sharing"
            >
              Social Experiment 3.0
            </a>
          </li>
          <li className="list-disc mx-8">
            <a
              className="underline"
              href="https://docs.google.com/document/d/151fNKfkymeYKwzVbq8CEB9iWKL4CJDhcX4BWo5WRB9M/edit?usp=sharing"
            >
              Social Experiment 2.0
            </a>
          </li>
        </ol>
      </p>
    </>
  );
}
