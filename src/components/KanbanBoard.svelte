<script lang="ts">
	import { kanbanBoards } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards';
	import BoardInput from '$components/BoardInput.svelte';
	import type { IKanbanBoard } from '../routes/types';

	export let board: IKanbanBoard;
	export let projectID: number;

	let boardName = '';
	let isEditing = false;

	const deleteBoard = async (id: number) => {
		await kanbanBoardsRepository.delete(id);
		kanbanBoards.set(await kanbanBoardsRepository.get(projectID));
	};

	const updateBoardName = async (id: number, newBoardName: string) => {
		await kanbanBoardsRepository.update(id, newBoardName);
		kanbanBoards.set(await kanbanBoardsRepository.get(projectID));
		isEditing = false
		boardName = ''
	};

	const setIsEditing = (currentBoardName: string) => {
		isEditing = true
		boardName = currentBoardName
	}
</script>

<div class="h-auto w-64 min-w-[16rem] rounded-md bg-gray-800 p-3 flex justify-between items-center">
	{#if !isEditing}
		<p>{board?.boardName}</p>
	{:else}
		<BoardInput bind:boardName addBoard={() => updateBoardName(Number(board.id), boardName)}/>
	{/if}
	<div class="flex items-center gap-2">
		<button class="cursor-pointer h-4" on:click={() => setIsEditing(board.boardName)}>
			<iconify-icon
				icon="streamline:interface-edit-pencil-change-edit-modify-pencil-write-writing"
			/>
		</button>
		<button class="cursor-pointer h-4" on:click={() => deleteBoard(Number(board?.id))}>
			<iconify-icon
				icon="streamline:interface-edit-skull-1-crash-death-delete-die-error-garbage-remove-skull-trash"
				class="w-6"
			/>
		</button>
	</div>
</div>

<!-- <script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import {flip} from 'svelte/animate'
	import type { ListItem } from '../routes/types';
	import Card from './Card.svelte';

	const FLIP_DURATION = 100
	
	let items: ListItem[] = [
		{
			id: 1,
			title: 'Svelte',
			description: '',
			tags: ['unabomber', 'ted k']
		},
		{
			id: 2,
			title: 'SvelteKit',
			description: '',
			tags: ['unabomber']
		}
	];

	const handleConsider = (e: CustomEvent<DndEvent<ListItem>>) => {
		items = e.detail.items
	};

	const handleFinalize = (e: CustomEvent<DndEvent<ListItem>>) => {
		items = e.detail.items
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<section 
		use:dndzone="{{ items: items, flipDurationMs: FLIP_DURATION, dropTargetStyle: {} }}"
		on:consider="{handleConsider}" 
		on:finalize="{handleFinalize}"
	>
		{#each items as item (item.id)}
			<div class="card card-hover w-96 my-4" animate:flip="{{duration: FLIP_DURATION}}">
				<Card cardItem={item}/>
			</div>
		{/each}
	</section>
</div>
 -->
