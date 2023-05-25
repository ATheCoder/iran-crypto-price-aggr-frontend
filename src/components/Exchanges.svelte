<script>
  import { afterUpdate } from "svelte";
  import { exchanges } from "../stores/exchanges";
  import { flip } from "svelte/animate";

  let buyPricesBefore = [];
  let sellPricesBefore = [];

  afterUpdate(() => {
    buyPricesBefore = $exchanges.map(({ buy }) => buy);
    sellPricesBefore = $exchanges.map(({ sell }) => sell);
  });

  const getTransitionClass = (action, price, index) => {
    let pricesBefore;
    if (action === "buy") {
      pricesBefore = buyPricesBefore;
    } else {
      pricesBefore = sellPricesBefore;
    }
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
        <th class="header-middle">Buy Price</th>
        <th class="header-right">Sell Price</th>
      </tr>
    </thead>
    <tbody>
      {#each $exchanges as exchange, index (exchange.name)}
        <tr animate:flip={{ duration: 500 }} class="crypto-row">
          <td class="exchange-name">{exchange.name}</td>
          <td class={getTransitionClass("buy", exchange.buy, index)}
            >{exchange.buy}</td
          >
          <td class={getTransitionClass("sell", exchange.sell, index)}
            >{exchange.sell}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
