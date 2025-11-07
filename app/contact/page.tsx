"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

enum FormState {
  UNSENT,
  SENDING,
  SENT,
}

export default function ContactUs() {
  const [formState, setFormState] = useState<FormState>(FormState.UNSENT);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const submitUrl = "https://formsubmit.co/lodewijk.bogaards@gmail.com";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setFormState(FormState.SENDING);

    event.preventDefault();
    const formData = new FormData(event.target as any); // capture form data

    // form needs resubmission to formsubmit.co
    // because of CORS policy
    fetch(submitUrl, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFormState(FormState.SENT);
      })
      .catch((error) => {
        setErrorMsg(
          "An error occurred, please try again later or sent an email directly to 'veganfutureofamsterdam@gmail.com'.",
        );
        console.error(`Error sending email: ${error}`);
        setFormState(FormState.UNSENT);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl text-center mb-6 text-gray-800">Contact Us</h2>

        <div className="flex justify-center">
          <a
            href="https://signal.group/#CjQKIIejwwWrcfw4uWRdv3M7oZx34HM9H-uvcTnxZeY-K6EBEhC4bsMUN5MbkflmSieu8LxD"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
          >
            <Image src="/Signal.svg" width={24} height={24} alt="Signal Logo" />
            <span>Join us on Signal</span>
          </a>
        </div>

        <p className="pt-6 pb-4 text-xl">Or send us a message:</p>

        {errorMsg && (
          <div className="text-red-500 text-center mb-4">{errorMsg}</div>
        )}
        {formState == FormState.SENT ? (
          <div className="h-[200px] text-center items-center justify-center flex">
            <span className="font-italic text-gray-800 text-xl">
              Thank you for your message!
            </span>
          </div>
        ) : formState == FormState.SENDING ? (
          <div className="h-[200px] text-center items-center justify-center flex">
            <div>
              <Image src="spinner.svg" className="inline" alt="Please wait" />{" "}
              <span className="pl-3 font-italic text-gray-800 text-xl">
                Sending email...
              </span>
            </div>
            <div className="text-gray-800">
              (Please be patient, this can take up to a minute)
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="hidden"
              name="_subject"
              value="Vegan Future Contact Form"
            />
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
