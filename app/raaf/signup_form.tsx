"use client";

import { useEffect, useState } from "react";
import { DonateRaaf } from "./donate_raaf";

const API_URL =
  "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/signup_raaf";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [canEmailUpdates, setCanEmailUpdates] = useState(true);
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = showDonationDialog ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDonationDialog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, canEmailUpdates }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || payload.message || res.statusText);
      }

      // success, reset values
      setShowDonationDialog(true);
      setName("");
      setEmail("");
      setCanEmailUpdates(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          {isLoading ? "Signing up…" : "Sign up to join RAAF"}
        </button>
      </form>

      {showDonationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl text-center shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 text-green-700">
              Thank you for signing up!
            </h2>
            <DonateRaaf />
            <button
              onClick={() => setShowDonationDialog(false)}
              className="mt-2 text-gray-600 underline hover:text-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
