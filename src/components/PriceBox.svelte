<script>
    import { afterUpdate, beforeUpdate } from "svelte";

    export let price;

    let element;

    let beforePrice;

    const greenRGB_BG = "rgba(57, 255, 20, 0.2)";
    const greenRGB_TXT = "rgba(57, 255, 20, 1)";

    const redRGB_BG = "rgba(255, 49, 49, 0.2)";
    const redRGB_TXT = "rgba(255, 49, 49, 1)";

    beforeUpdate(() => {
        if (element) {
            beforePrice = parseInt(element.innerText, 10);
        }
    });

    function flash(element) {
        const bgColor = price > beforePrice ? greenRGB_BG : redRGB_BG;
        const txtColor = price > beforePrice ? greenRGB_TXT : redRGB_TXT;
        requestAnimationFrame(() => {
            // instant red bg flash in
            element.style.transition = "none";
            element.style.color = txtColor;
            element.style.backgroundColor = bgColor;

            setTimeout(() => {
                // slow 1s fade out
                element.style.transition = "color 1s, background 1s";
                element.style.color = "";
                element.style.backgroundColor = "";
            });
        });
    }

    afterUpdate(() => {
        flash(element);
    });
</script>

<td bind:this={element}>{price}</td>
