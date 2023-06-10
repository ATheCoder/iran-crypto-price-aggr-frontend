<script>
  import { exchanges, highlights } from "../stores/exchanges";
  import { flip } from "svelte/animate";
  import CryptoIcon from "./CryptoIcon.svelte";
</script>

<div class="table-container">
  <div style="position: relative;">
    <div class="small-rectangle">
      <CryptoIcon imgSrc="tether.png" />
      <!-- <CryptoIcon imgSrc="bitcoin.png" /> -->
    </div>
  </div>
  <table class="crypto-table">
    <thead>
      <tr class="crypto-header">
        <th class="header-left">Exchange</th>
        <th class="header-middle">Buy Price</th>
        <th class="header-right">Sell Price</th>
      </tr>
    </thead>
    <tbody>
      {#each $exchanges as exchange, index ((exchange.name, index))}
        <tr animate:flip={{ duration: 500 }} class="crypto-row">
          <td class="exchange-name">{exchange.name}</td>
          <td class={$highlights[exchange.name]["buy"]}>{exchange.buy}</td>
          <td class={$highlights[exchange.name]["sell"]}>{exchange.sell}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .small-rectangle {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: absolute;
    padding: 2rem;
    left: -5.5rem;
    width: 2.5rem;
    padding: 10px;
    /* height: 100px; */
    border-radius: 6px 0px 0px 6px;
    background-color: white;
    /* transform: translate(-100%, -50%); */
    box-shadow: 10px px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    z-index: 9;
  }
</style>
