import { readable } from "svelte/store";

// You might want to update this URL to the endpoint of your API
const API_URL = "http://localhost:8080";

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
