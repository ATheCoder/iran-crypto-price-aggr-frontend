import { tick } from "svelte";
import { derived, readable, writable } from "svelte/store";

// You might want to update this URL to the endpoint of your API

const createCustomStore = () => {
  let subscribersCount = 0;
  let socket;
  let reconnectAttempt = 0;
  const SOCKET_ADDRESS = "ws://api-athena.athecoder.com/ws";

  const { subscribe, set, update } = writable([]);

  function connect() {
    socket = new WebSocket(SOCKET_ADDRESS);

    socket.onopen = () => {
      console.log("Connected!");
      reconnectAttempt = 0; // reset the reconnect attempt counter
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      set(data.sort((e1, e2) => e1.buy - e2.buy));
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
      if (!event.wasClean) {
        // Connection not cleanly closed. Attempt to reconnect.
        const timeout = Math.min(1000 * 2 ** reconnectAttempt, 30000); // Exponential backoff capped at 30 seconds
        console.log(
          `WebSocket connection lost. Reconnecting in ${timeout}ms...`
        );
        setTimeout(connect, timeout);
        reconnectAttempt += 1;
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error observed: ", error);
    };
  }

  return {
    subscribe(run, invalidate = () => {}) {
      if (subscribersCount === 0) {
        if (typeof window !== "undefined") {
          connect();
        }
      }

      subscribersCount += 1;
      const unsubscribe = subscribe(run, invalidate);

      return () => {
        subscribersCount -= 1;
        unsubscribe();

        if (subscribersCount === 0) {
          if (typeof socket !== "undefined") {
            socket.close();
          }
          console.log("Disconnected!");
        }
      };
    },
  };
};

export const exchanges = createCustomStore();

let previousValueOfExchanges = {};

export const highlights = writable(exchanges);

const convertArrayToKeyValue = (arr) => {
  return arr.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: {
        buy: curr.buy,
        sell: curr.sell,
      },
    };
  }, {});
};

exchanges.subscribe(($exchanges) => {
  if (Object.keys(previousValueOfExchanges).length < 1) {
    const newHighlights = $exchanges.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr.name]: {
          buy: "",
          sell: "",
        },
      };
    }, {});
    highlights.set(newHighlights);
    previousValueOfExchanges = convertArrayToKeyValue($exchanges);
  }

  const newHighlights = $exchanges.reduce((acc, exchange) => {
    const name = exchange.name;
    const previousValueOfExchange = previousValueOfExchanges[name];
    if (!previousValueOfExchange) {
      return {
        ...acc,
        [name]: {
          buy: "",
          sell: "",
        },
      };
    }

    const currentBuyPrice = exchange.buy;
    const previousBuyPrice = previousValueOfExchange.buy;

    const currentSellPrice = exchange.sell;
    const previousSellPrice = previousValueOfExchange.sell;
    return {
      ...acc,
      [name]: {
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
      },
    };
  }, {});
  previousValueOfExchanges = convertArrayToKeyValue($exchanges);
  highlights.set(
    $exchanges.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr.name]: {
          buy: "",
          sell: "",
        },
      };
    }, {})
  );
  tick().then(() => {
    highlights.set(newHighlights);
  });
});
