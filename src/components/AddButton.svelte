<script lang="ts">
	let isHovered = false;

	export let add = () => {};
</script>

<button
	on:click={() => add()}
	class="w-8 h-8 min-w-[2rem] text-white bg-red-800 rounded-md mb-4"
	class:hover:opacity-70={isHovered}
>
	<p
		class="box text-lg h-8 font-semibold"
		class:hovered={isHovered === true}
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
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
