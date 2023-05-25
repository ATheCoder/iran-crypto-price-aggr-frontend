import { derived, readable, writable } from "svelte/store";

// You might want to update this URL to the endpoint of your API
const API_URL =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:8080"
    : "http://api-athena.athecoder.com";

const fetchExchangeData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const exchanges = readable([], function (set) {
  const interval = setInterval(async () => {
    const newExchangeData = await fetchExchangeData();
    set(newExchangeData.sort((e1, e2) => e1.buy - e2.buy));
  }, 3000);

  return () => {
    clearInterval(interval);
  };
});

export const highlights = writable([]);

let previousValueOfExchanges = [];

exchanges.subscribe(($exchanges) => {
  if (previousValueOfExchanges.length < 1) {
    highlights.set($exchanges.map(() => ""));
    previousValueOfExchanges = $exchanges;
    return;
  }

  highlights.set(
    $exchanges.map((exchange, index) => {
      const previousValueOfExchange = previousValueOfExchanges[index];

      const currentBuyPrice = exchange.buy;
      const previousBuyPrice = previousValueOfExchange.buy;

      const currentSellPrice = exchange.sell;
      const previousSellPrice = previousValueOfExchange.sell;

      return {
        name: previousValueOfExchange.name,
        buy:
          currentBuyPrice > previousBuyPrice
            ? "flash-green"
            : currentBuyPrice < previousBuyPrice
            ? "flash-red"
            : "",
        sell:
          currentSellPrice > previousSellPrice
            ? "flash-green"
            : currentSellPrice < previousSellPrice
            ? "flash-red"
            : "",
      };
    })
  );
  previousValueOfExchanges = $exchanges;
});
