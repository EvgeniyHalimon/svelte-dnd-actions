<script lang="ts">
	import { page } from '$app/stores';
	import { kanbanBoards, columns, tickets, projects } from '$lib/BoardsStore';
	import AddKanbanBoard from '$components/AddButton.svelte';
	import PostKanbanBoard from '$components/PostKanbanBoard.svelte';
	import { flip } from 'svelte/animate';
	import Column from '$components/Column.svelte';
	import { ticketRepository } from '$lib/repository/ticketsRepository.js';
	import type { ITicket } from '../../types';
	import { onMount } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoardsRepository';
	import { transformArray } from '../../../utils/utils';

	export let data; //data from ssr
	let isEditing = false;
	let isLoading = true;
	let projectID = Number($page.params.id);
	let projectName = $projects.find((project) => project.id === projectID)?.projectName;
	kanbanBoards.set(data.kanbanBoards);

	const flipDurationMs = 300;

	const add = () => {
		isEditing = true;
	};

	onMount(async () => {
		const data = (await ticketRepository.getByProjectID(projectID)) as ITicket[];
		tickets.set(data);
		columns.set(transformArray($kanbanBoards, data));
		isLoading = false;
	});

	function handleDndConsiderColumns(e: any) {
		$columns = e.detail.items;
	}

	async function handleDndFinalizeColumns(e: any) {
		const updateColumnsPositions = e.detail.items.map((item: any, i: number) => {
			return { id: item.id, position: i + 1 };
		});
		await kanbanBoardsRepository.updatePositions(updateColumnsPositions);
		$columns = e.detail.items;
	}
</script>

<svelte:head>
	<title>{projectName}</title>
</svelte:head>

<h1 class="pb-4 text-xl">{projectName}</h1>
{#if !isLoading}
	<section
		class="flex gap-10 min-w-full"
		use:dndzone={{ items: $columns, flipDurationMs, type: 'columns' }}
		on:consider={handleDndConsiderColumns}
		on:finalize={handleDndFinalizeColumns}
	>
		{#each $columns as column, i (column.id)}
			<div
				class="h-full w-64 min-w-[16rem] rounded-md bg-gray-800 p-3"
				animate:flip={{ duration: flipDurationMs }}
			>
				<Column {column} {projectID} {i} />
			</div>
		{/each}
		{#if isEditing}
			<PostKanbanBoard bind:isEditing {projectID} />
		{/if}
		<AddKanbanBoard {add} />
	</section>
{:else}
	<p>Loading...</p>
{/if}
