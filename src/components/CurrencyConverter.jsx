import { useState } from "react";
import axios from "axios";
import ExchangeRate from "./ExchangeRate";
import { BASE_URL } from "../Api";

const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
const CurrencyConverter = () => {
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: "BTC",
    secondaryCurrency: "BTC",
    exchangeRate: 0,
  });
  const convert = () => {
    var options = {
      method: "GET",
      url: `${BASE_URL}/getCurrencyExchangeRate`,
      params: {
        from_currency: chosenPrimaryCurrency,
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        console.log(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );

        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
        setExchangedData({
          primaryCurrency: chosenPrimaryCurrency,
          secondaryCurrency: chosenSecondaryCurrency,
          exchangeRate:
            response.data["Realtime Currency Exchange Rate"][
              "5. Exchange Rate"
            ],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency</td>
              <td>
                <input
                  type="number"
                  name="currency-amoumt-1"
                  defaultValue={""}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  defaultValue={""}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency</td>
              <td>
                <input
                  type="number"
                  name="currency-amoumt-2"
                  value={result}
                  disabled
                />
              </td>
              <td>
                <select
                  defaultValue={""}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate exchangedData={exchangedData} />
    </div>
  );
};

export default CurrencyConverter;
