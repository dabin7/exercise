import React from "react";
import { useState, useEffect } from "react";

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0);
  const [MyMoney, setMyMoney] = useState("");
  const [firstPrice, setFirstPrice] = useState(0);
  const [invert] = useState(false);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setFirstPrice(json[0].quotes.USD.price);
      });
  }, []);

  const handleCoin = (event) => {
    setCoinPrice(event.target.value);
    Reset();
  };
  const myMoney = (event) => {
    setMyMoney(parseInt(event.target.value));
    if (event.target.value === "") {
      setMyMoney(0);
    }
  };
  const Reset = () => {
    setMyMoney(0);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onInput={handleCoin}>
          {coins.map((coin) => {
            return (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            );
          })}
        </select>
      )}
      <br />
      <label htmlFor="mm">{invert === false ? "My Budget:" : null}</label>
      <input
        value={invert === false ? MyMoney : coinPrice}
        onChange={myMoney}
        id="mm"
        disabled={invert === true}
      ></input>
      <br />
      <label htmlFor="cc">{invert === false ? "Coins get:" : null}</label>
      <input
        value={
          invert === true
            ? MyMoney
            : coinPrice === 0
            ? MyMoney / firstPrice
            : MyMoney / coinPrice
        }
        id="cc"
        disabled={invert === false}
        onChange={myMoney}
      ></input>
      <br />
      <button onClick={Reset}>Reset</button>
    </div>
  );
};

export default Coin;
