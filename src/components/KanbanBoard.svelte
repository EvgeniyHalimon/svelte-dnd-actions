<script lang="ts">
	import { kanbanBoards } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards';
	import type { IKanbanBoard, ITicket } from '../routes/types';
	import { onMount } from 'svelte';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import Ticket from '$components/Ticket.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import DeleteIcon from './icons/DeleteIcon.svelte';

	export let board: IKanbanBoard;
	export let projectID: number;

	let boardName = '';
	let isEditing = false;
	let tickets = [] as ITicket[];

	const sortByPosition = (array: any) => {
		return array.sort((a: any, b: any) => a.position - b.position);
	};

	const setUpdatedProjectBoards = async () => {
		const data = await kanbanBoardsRepository.get(projectID);
		kanbanBoards.set(sortByPosition(data));
	};

	const updateBoardName = async (id: number, newBoardName: string) => {
		await kanbanBoardsRepository.update(id, newBoardName);
		setUpdatedProjectBoards();
		isEditing = false;
		boardName = '';
	};

	const deleteBoard = async (id: number) => {
		await kanbanBoardsRepository.delete(id);
		setUpdatedProjectBoards();
	};

	const setIsEditing = (currentBoardName: string) => {
		isEditing = true;
		boardName = currentBoardName;
	};

	onMount(async () => {
		const data = await ticketRepository.getByProjectID(projectID);
		tickets = data as ITicket[];
	});

	async function getTickets(id: number) {
		return await ticketRepository.getByBoardID(id);
	}
	
</script>

<div class="h-full w-64 min-w-[16rem] rounded-md bg-gray-800 p-3">
	<div class="flex justify-between items-baseline">
		{#if !isEditing}
			<p>{board?.boardName}</p>
		{:else}
			<input
				type="text"
				class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
				bind:value={boardName}
				autofocus
				on:blur={() => updateBoardName(Number(board.id), boardName)}
			/>
		{/if}
		<div class="flex items-center gap-2">
			<button class="cursor-pointer h-4" on:click={() => setIsEditing(board.boardName)}>
				<EditIcon/>
			</button>
			<button class="cursor-pointer h-4" on:click={() => deleteBoard(Number(board?.id))}>
				<DeleteIcon/>
			</button>
		</div>
	</div>
	{#await getTickets(Number(board.id))}
		<p>...waiting</p>
	{:then tickData}
		{#each tickData as ticket}
			<Ticket {ticket}/>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
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

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
