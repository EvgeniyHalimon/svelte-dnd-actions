<script lang="ts">
    import { fade } from 'svelte/transition';

    let isHovered = false;

	export let addBoard = () => {}
</script>


<button 
    on:click={() => addBoard()}  
    class="w-8 h-8 text-white bg-red-800 rounded-md mb-4"
>
    <p
        class="box text-lg h-8 font-semibold"
        class:hovered={isHovered === true} on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}
    > 
        + 
    </p>
</button>

<style>
    .box {
      transition: transform 0.5s;
    }
  
    .box.hovered {
      transform: rotate(360deg);
    }
</style>