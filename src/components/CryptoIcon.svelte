<script>
  export let imgSrc = "";
  export let altText = "";
  export let onClick = () => {};
</script>

<img class="crypto-icon" src={imgSrc} {altText} on:click={onClick} />

<style>
  .crypto-icon {
    cursor: pointer;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    margin: 2px;
    transition: transform 0.3s ease;
  }

  .crypto-icon:hover {
    transform: scale(1.1);
  }
</style>
