<script lang="ts">
	export let boardName: string;
	export let addBoard: any;
</script>

<input
	type="text"
	class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
	bind:value={boardName}
	autofocus
	on:click={addBoard}
/>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
