import { readable } from "svelte/store";

const generateRandomExchangeNumbers = () => {
  return [
    { name: "Binance", price: Math.floor(Math.random() * 20000) + 5000 },
    { name: "Coinbase", price: Math.floor(Math.random() * 20000) + 5000 },
    { name: "Kraken", price: Math.floor(Math.random() * 20000) + 5000 },
    { name: "Bitfinex", price: Math.floor(Math.random() * 20000) + 5000 },
  ];
};

export const exchanges = readable(
  [
    { name: "Binance", price: 10000 },
    { name: "Coinbase", price: 10000 },
    { name: "Kraken", price: 10000 },
    { name: "Bitfinex", price: 10000 },
    // add as many exchanges as you want
  ],
  function (set) {
    const interval = setInterval(() => {
      set(generateRandomExchangeNumbers());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }
);
