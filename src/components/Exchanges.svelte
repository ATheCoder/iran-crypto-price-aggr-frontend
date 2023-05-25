<script>
  import { exchanges, highlights } from "../stores/exchanges";
  import { flip } from "svelte/animate";
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
          <td class={$highlights[exchange.name]["buy"]}>{exchange.buy}</td>
          <td class={$highlights[exchange.name]["sell"]}>{exchange.sell}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
