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
        <th class="header-right">Price</th>
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

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

  .table-container {
    max-width: 600px;
    margin: 0 auto;
    overflow-x: auto;
    font-family: "Roboto", sans-serif;
  }
  .crypto-table {
    width: 100%;
    border-collapse: collapse;
  }
  .crypto-table th,
  .crypto-table td {
    padding: 15px;
    text-align: left;
  }
  .crypto-header {
    background-color: #f4f4f4;
  }
  .header-left {
    border-top-left-radius: 10px;
  }
  .header-right {
    border-top-right-radius: 10px;
  }
  .crypto-row {
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s ease;
  }
  .crypto-row:hover {
    background-color: #f8f8f8;
  }
  .exchange-name {
    font-weight: 500;
  }

  .flash-green {
    animation: flash-green-animation 3s;
  }
  .flash-red {
    animation: flash-red-animation 3s;
  }
  @keyframes flash-green-animation {
    0% {
      background-color: #d4edda;
      color: #155724;
    }
    100% {
      background-color: inherit;
      color: inherit;
    }
  }
  @keyframes flash-red-animation {
    0% {
      background-color: #f8d7da;
      color: #721c24;
    }
    100% {
      background-color: inherit;
      color: inherit;
    }
  }
</style>
