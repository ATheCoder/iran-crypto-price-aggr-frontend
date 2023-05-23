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

<div class="table-container">
  <table class="crypto-table">
    <thead>
      <tr class="crypto-header">
        <th class="header-left">Exchange</th>
        <th class="header-right">Buy Price</th>
      </tr>
    </thead>
    <tbody>
      {#each $exchanges as exchange, index (exchange.name)}
        <tr animate:flip={{ duration: 500 }} class="crypto-row">
          <td class="exchange-name">{exchange.name}</td>
          <td class={getTransitionClass(exchange.price, index)}
            >{exchange.price}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
