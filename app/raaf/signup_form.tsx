"use client";

import { useEffect, useState } from "react";

export function SignupForm() {
  const [showDonationDialog, setShowDonationDialog] = useState(false);

  useEffect(() => {
    if (showDonationDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDonationDialog]);

  const onSignup = () => {
    setShowDonationDialog(true);
  }

  return <>
    <iframe name="hidden_iframe" id="hidden_iframe" className="w-[1px] h-[1px]"></iframe>

    <form
      action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeGOj-K4KeDk9tYqRDu8xoT8RWTh0bbQWj_0ZUJhd2qQzAKiw/formResponse?embedded=true"
      method="POST"
      target="hidden_iframe"
      onSubmit={onSignup}
      aria-label="Signup form for the Revolutionary Animal Advocacy Forum"
      className="bg-gray-100 p-2 border-gray-300 border rounded-xl"
    >
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name:</label>
              </td>
              <td>
                <input
                  className="m-2 border border-gray-600 w-full"
                  type="text"
                  id="name"
                  name="entry.383167970"
                  aria-label="Your name"
                  aria-required="true"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  className="m-2 border border-gray-600 w-full"
                  type="email"
                  id="email"
                  name="entry.1822594624"
                  aria-label="Your email address"
                  aria-required="true"
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <label className="flex items-center space-x-2" htmlFor="keep-updated">
                  <input
                    id="keep-updated"
                    className="m-2"
                    type="checkbox"
                    name="entry.730652021"
                    value="Yes"
                    checked
                    aria-label="Keep me updated on future RAAFs"
                  />
                  <span>Keep me updated on future RAAFs</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200"
        aria-label="Submit your signup for the Revolutionary Animal Advocacy Forum"
      >
        Sign up to join RAAF
      </button>
    </form>
    {showDonationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl text-center shadow-xl w-full max-h-[90vh] overflow-y-auto touch-auto">
            <h2 className="text-4xl font-bold mb-4 text-green-700">Thank you for signing up!</h2>
            <p className="text-lg mb-4">
              RAAF is a donation-based event. We do have some costs though (e.g. renting the space). To break even, we need about <strong>5 euros per person</strong>.
              If you can support us, it would mean the world 🫶
            </p>

            <p className="mb-6 text-md text-gray-700">You can donate easily using PayPal below:</p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=5&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Donate €5 - help us break even
              </a>
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&amount=5&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                Donate €10 - help support the next RAAF
              </a>
              <a href="https://www.paypal.com/donate/?business=N9L3QJHVHU8R2&no_recurring=1&item_name=Revolutionary%20Animal%20Advocacy%20Forum&currency_code=EUR" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
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
  </>;
}