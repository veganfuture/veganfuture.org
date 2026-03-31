"use client";

import { useEffect, useState } from "react";
import { DonateRaaf } from "./donate_raaf";
import { withBaseUrl } from "@/lib/metadata";
import { isAfter } from "date-fns";

const API_URL =
  "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/signup_raaf";

export type SignupFormProps = {
  /**
   * undefined means signing up for the newsletter
   */
  eventId?: string;
  expires?: Date;
};

export function SignupForm({ eventId, expires }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [canEmailUpdates, setCanEmailUpdates] = useState(true);
  const [wantsDinner, setWantsDinner] = useState(false);
  const [dinnerWishes, setDinnerWishes] = useState("");
  const [lastSubmittedWantsDinner, setLastSubmittedWantsDinner] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isNewsLetterSignup = eventId === undefined;
  const supportsDinnerSignup = eventId === "raaf4";
  const dinnerInfoText =
    "Dinner starts at 17:30, is fully vegan, includes one drink, and costs 20 euros to be paid on arrival. If you expect to be late or can no longer make it, please let us know as soon as possible so we can inform the kitchen.";

  const isExpired = !!expires ? isAfter(Date.now(), expires) : false;

  useEffect(() => {
    document.body.style.overflow = showConfirmDialog ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showConfirmDialog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          canEmailUpdates,
          eventId,
          wantsDinner: supportsDinnerSignup ? wantsDinner : false,
          dinnerWishes:
            supportsDinnerSignup && wantsDinner ? dinnerWishes.trim() : "",
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || payload.message || res.statusText);
      }

      // success, reset values
      setLastSubmittedWantsDinner(wantsDinner);
      setShowConfirmDialog(true);
      setName("");
      setEmail("");
      setCanEmailUpdates(true);
      setWantsDinner(false);
      setDinnerWishes("");
    } catch (err: any) {
      setError(
        `Unfortunately something went wrong technically. ` +
          `Try again and otherwise contact us via ${withBaseUrl("/contact")} and send us the error message. Our apologies. ` +
          `Error message: ${err ? `${err}: ${err.message}` : "Unknown"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isExpired ? (
        <div>Signup has ended.</div>
      ) : (
        <>
          {error && (
            <div className="mb-4 text-red-600" role="alert">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            aria-label="Signup form for the Revolutionary Animal Advocacy Forum"
            className="bg-gray-100 p-4 border border-gray-300 rounded-xl space-y-4"
          >
            <div>
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded p-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-600 rounded p-2"
              />
            </div>

            {!isNewsLetterSignup ? (
              <div>
                <label
                  htmlFor="canEmailUpdates"
                  className="flex items-center space-x-2"
                >
                  <input
                    id="canEmailUpdates"
                    type="checkbox"
                    className="rounded"
                    checked={canEmailUpdates}
                    onChange={(e) => {
                      setCanEmailUpdates(e.target.checked);
                    }}
                  />
                  <span>Keep me updated on future RAAFs</span>
                </label>
              </div>
            ) : (
              ""
            )}

            {supportsDinnerSignup ? (
              <div className="space-y-2 rounded-xl border border-green-300 bg-green-50 p-4">
                <label
                  htmlFor="wantsDinner"
                  className="flex items-center space-x-2"
                >
                  <input
                    id="wantsDinner"
                    type="checkbox"
                    className="rounded"
                    checked={wantsDinner}
                    onChange={(e) => {
                      setWantsDinner(e.target.checked);
                    }}
                  />
                  <span>I want to join for dinner</span>
                </label>
                <p className="text-sm text-green-900">{dinnerInfoText}</p>
              </div>
            ) : (
              ""
            )}

            {supportsDinnerSignup && wantsDinner ? (
              <div>
                <label htmlFor="dinnerWishes" className="block font-medium">
                  Any allergies or dietary needs we should know of?
                </label>
                <textarea
                  id="dinnerWishes"
                  value={dinnerWishes}
                  onChange={(e) => setDinnerWishes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full border border-gray-600 rounded p-2"
                />
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-2 w-full py-2 px-4 rounded-xl font-semibold text-white shadow transition duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              aria-label="Submit your signup for the Revolutionary Animal Advocacy Forum"
            >
              {isLoading ? "Signing up…" : "Sign up"}
            </button>
          </form>

          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 max-w-2xl text-center shadow-xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-4xl font-bold mb-4 text-green-700">
                  Thank you for signing up!
                </h2>
                {lastSubmittedWantsDinner ? (
                  <p className="mb-6 rounded-xl border-2 border-green-600 bg-green-50 p-4 text-left text-lg font-medium text-green-900">
                    You are also signed up for dinner before the event.{" "}
                    {dinnerInfoText}
                  </p>
                ) : null}
                {!isNewsLetterSignup ? <DonateRaaf /> : <></>}
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="mt-2 text-gray-600 underline hover:text-gray-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
