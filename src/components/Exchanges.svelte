<script>
  import { afterUpdate } from "svelte";
  import { exchanges } from "../stores/exchanges";

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
      <tr>
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
    color: green;
    animation: flash-green-animation 1s infinite;
  }

  .flash-red {
    color: red;
    animation: flash-red-animation 1s infinite;
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
