<script lang="ts">
	import { projects } from '$lib/BoardsStore';
	import { vocab } from '../vocab';
	import Board from '../../components/Board.svelte';
	import AddProject from '../../components/AddButton.svelte';

	const add = () => {
		$projects = [
			...$projects,
			{ projectName: `${vocab[Math.floor(Math.random() * vocab.length) + 1]} board` }
		];
	};
</script>

<svelte:head>
	<title>Boards</title>
</svelte:head>

<AddProject {add} />

<div class="flex gap-4 flex-wrap">
	{#each $projects as project}
		<Board {project} />
	{/each}
</div>

<style>
	.box {
		transition: transform 0.5s;
	}

	.box.hovered {
		transform: rotate(360deg);
	}
</style>
