"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/signup_raaf";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || payload.message || res.statusText);
      }

      // success!
      setShowDonationDialog(true);
      setName("");
      setEmail("");
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
          <label htmlFor="keep-updated" className="flex items-center space-x-2">
            <input
              id="keep-updated"
              type="checkbox"
              checked
              readOnly
              className="rounded"
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
            <p className="text-lg mb-4">
              RAAF is a donation-based event. We do have some costs though (e.g.
              renting the space). To break even, we need about{" "}
              <strong>5 euros per person</strong>. If you can support us, it
              would mean the world 🫶
            </p>
            <p className="mb-6 text-md text-gray-700">
              You can donate easily using PayPal below:
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=5&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Donate €5 - help us break even
              </a>
              <a
                href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=10&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Donate €10 - help support the next RAAF
              </a>
              <a
                href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Other Amount
              </a>
            </div>
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

