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
      set(
        generateRandomExchangeNumbers().sort((e1, e2) => e1.price - e2.price)
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }
);
