<script lang="ts">
	import { page } from '$app/stores';
	import { kanbanBoards, tickets } from '$lib/BoardsStore';
	import AddKanbanBoard from '$components/AddButton.svelte';
	import KanbanBoard from '$components/KanbanBoard.svelte';
	import PostKanbanBoard from '$components/PostKanbanBoard.svelte';
	import Ticket from '$components/Ticket.svelte';
	import AddTicket from '$components/AddTicket.svelte';
	import { ticketRepository } from '$lib/repository/ticketsRepository.js';
	import type { IKanbanBoard, ITicket } from '../../types';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import DeleteIcon from '$components/icons/DeleteIcon.svelte';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards';

	export let data;
	let isEditing = false;
	let isLoading = true;
	let boardName = '';
	kanbanBoards.set(data.kanbanBoards);
	let projectID = Number($page.params.id);

	const flipDurationMs = 200;

	const add = () => {
		isEditing = true;
	};

	export const sortByPosition = (array: any) => {
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

	

	function getNextPosition(array: ITicket[], boardID: number) {
		const data = array.filter((ticket) => ticket.boardID == boardID);
		return data.length + 1;
	}

	onMount(async () => {
		const data = (await ticketRepository.getByProjectID(projectID)) as ITicket[];

		function transformArrays(boards: IKanbanBoard[], tickets: ITicket[]) {
			const transformedBoard = boards.map((board: IKanbanBoard) => ({
				id: board.id,
				boardName: board.boardName,
				projectID: board.projectID,
				items: tickets.filter((ticket: ITicket) => ticket.boardID === board.id)
			}));

			return transformedBoard;
		}

		tickets.set(transformArrays($kanbanBoards, data));
		isLoading = false;
	});

	function handleDndConsiderColumns(e: any) {
		console.log('🚀 ~ file: KanbanBoard.svelte:79 ~ handleDndConsiderColumns ~ e:', e);
		$tickets = e.detail.items;
	}

	function handleDndFinalizeColumns(e: any) {
		$tickets = e.detail.items;
	}

	function handleDndConsiderCards(columnId: number, e: any) {
		console.log('🚀 ~ file: KanbanBoard.svelte:86 ~ handleDndConsiderCards ~ e:', e);
		const colIdx = $tickets.findIndex((c: ITicket) => c.id === columnId);
		$tickets[colIdx].items = e.detail.items;
		$tickets = [...$tickets];
	}

	function handleDndFinalizeCards(columnId: number, e: any) {
		console.log('🚀 ~ file: KanbanBoard.svelte:91 ~ handleDndFinalizeCards ~ e:', e);
		const colIdx = $tickets.findIndex((c: ITicket) => c.id === columnId);
		$tickets[colIdx].items = e.detail.items/* .map((item: ITicket, i: number) => item.position = i + 1); */
		$tickets = [...$tickets];
	}
	
</script>

<svelte:head>
	<title>{projectID}</title>
</svelte:head>
<h1 class="pb-4">There will be kanban board {projectID}</h1>
	{#if !isLoading}
		<section
		class="flex gap-10 min-w-full"
			use:dndzone={{ items: $tickets, flipDurationMs, type: 'columns' }}
			on:consider={handleDndConsiderColumns}
			on:finalize={handleDndFinalizeColumns}
		>
			{#each $tickets as ticket, i (ticket.id)}
				<div
				class="h-full w-64 min-w-[16rem] rounded-md bg-gray-800 p-3"
					animate:flip={{ duration: flipDurationMs }}
				>
					<div class="flex justify-between items-baseline">
						{#if !isEditing}
							<p>{ticket?.boardName}</p>
						{:else}
							<input
								type="text"
								class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
								bind:value={boardName}
								autofocus
								on:blur={() => updateBoardName(Number(ticket.id), boardName)}
							/>
						{/if}
						<div class="flex items-center gap-2">
							<button
								class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
								on:click={() => setIsEditing(ticket.boardName)}
							>
								<EditIcon />
							</button>
							<button
								class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
								on:click={() => deleteBoard(Number(ticket?.id))}
							>
								<DeleteIcon />
							</button>
						</div>
					</div>
					<div
						class="flex flex-col"
						use:dndzone={{ items: ticket.items, flipDurationMs }}
						on:consider={(e) => handleDndConsiderCards(ticket.id, e)}
						on:finalize={(e) => handleDndFinalizeCards(ticket.id, e)}
					>
						{#each ticket?.items as item (item.id)}
							<Ticket ticket={item}/>
						{/each}
					</div>
					<AddTicket position={getNextPosition(ticket?.items, Number(ticket?.id))} data={ticket} {i}/>
				</div>
			{/each}
			<AddKanbanBoard {add} />
		</section>
	{:else}
		<p>Loading...</p>
	{/if}
	{#if isEditing}
		<PostKanbanBoard bind:isEditing {projectID} />
	{/if}


<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
