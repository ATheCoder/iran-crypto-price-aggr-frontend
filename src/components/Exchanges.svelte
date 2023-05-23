<script>
  import { afterUpdate } from "svelte";
  import { exchanges } from "../stores/exchanges";
  import { flip } from "svelte/animate";

  let pricesBefore = [];

  afterUpdate(() => {
    pricesBefore = $exchanges.map(({ price }) => price);
  });

  const getTransitionClass = (price, index) => {
    if (pricesBefore.length < 1) {
      return "";
    }
    if (price > pricesBefore[index]) {
      return "flash-green";
    } else if (price < pricesBefore[index]) {
      return "flash-red";
    }
    return "";
  };
</script>

<table>
  <thead>
    <tr>
      <th>Exchange</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {#each $exchanges as exchange, index (exchange.name)}
      <tr animate:flip={{ duration: 500 }}>
        <td>{exchange.name}</td>
        <td class={getTransitionClass(exchange.price, index)}>
          {exchange.price}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .flash-green {
    animation: flash-green-animation 3s;
  }

  .flash-red {
    animation: flash-red-animation 3s;
  }

  @keyframes flash-green-animation {
    0% {
      color: green;
    }
    100% {
      color: black;
    }
  }

  @keyframes flash-red-animation {
    0% {
      color: red;
    }
    100% {
      color: black;
    }
  }
</style>
