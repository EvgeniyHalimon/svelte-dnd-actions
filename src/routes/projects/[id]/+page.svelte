<script lang="ts">
	import { page } from '$app/stores';
	import { kanbanBoards } from '$lib/BoardsStore';
	import AddKanbanBoard from '$components/AddButton.svelte';
	import KanbanBoard from '$components/KanbanBoard.svelte';
	import PostKanbanBoard from '$components/PostKanbanBoard.svelte';

	export let data;
	let isEditing = false;
	kanbanBoards.set(data.kanbanBoards);
	let projectID = Number($page.params.id);

	const add = () => {
		isEditing = true;
	};
</script>

<svelte:head>
	<title>{projectID}</title>
</svelte:head>
<h1 class="pb-4">There will be kanban board {projectID}</h1>

<div class="flex gap-10 min-w-full">
	<!-- <iconify-icon icon="eos-icons:compass"></iconify-icon> -->
	{#each $kanbanBoards as board}
		<KanbanBoard {board} {projectID} />
	{/each}
	{#if isEditing}
		<PostKanbanBoard bind:isEditing {projectID} />
	{/if}
	<AddKanbanBoard {add} />
</div>
