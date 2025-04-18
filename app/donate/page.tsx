export default function Factsheets() {
  return (
    <>
      <div className="text-2xl font-bold p-4">Donate</div>
      <div className="p-4">
        Unforuntately running Vegan Future of Amsterdam is not free. Our current
        costs:
      </div>
      <ul>
        <li>Prices, mostly vego chocolate bars (2 euro a piece)</li>
        <li>Flyers (25 cents per piece)</li>
        <li>Second hand tablets (40/50 euro per piece)</li>
        <li>Signs (2.5 euro per piece)</li>
      </ul>
      <div>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="business" value="N9L3QJHVHU8R2" />
          <input type="hidden" name="no_recurring" value="0" />
          <input
            type="hidden"
            name="item_name"
            value="Support Vegan Future of Amsterdam"
          />
          <input type="hidden" name="currency_code" value="EUR" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            src="https://www.paypal.com/en_NL/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </>
  );
}
