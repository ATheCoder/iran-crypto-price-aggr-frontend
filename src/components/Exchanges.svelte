<script>
  import { onMount } from "svelte";
  import {
    createWebsocketStore,
    exchanges,
    highlights,
  } from "../stores/exchanges";
  import { flip } from "svelte/animate";
  import CryptoIcon from "./CryptoIcon.svelte";
  import { socketStore } from "../stores/readableSocket";
  import PriceBox from "./PriceBox.svelte";

  let readableExchanges = [];

  onMount(() => {
    return socketStore.subscribe((val) => {
      readableExchanges = val;
    });
  });
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
      {#each readableExchanges as exchange, index ((exchange.name, index))}
        <tr animate:flip={{ duration: 500 }} class="crypto-row">
          <td class="exchange-name">{exchange.name}</td>
          <PriceBox price={exchange.buy} />
          <PriceBox price={exchange.sell} />
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
