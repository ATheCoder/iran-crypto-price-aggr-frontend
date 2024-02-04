import { readable } from "svelte/store";

export const socketStore = readable([], set => {
    const socket = new WebSocket("wss://api-athena.athecoder.com/ws");

    socket.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      data.sort((e1, e2) => e1.buy - e2.buy);
      set(data);
    });

    return () => { socket.close() };
});
