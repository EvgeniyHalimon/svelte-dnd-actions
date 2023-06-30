<script lang="ts">
	import { kanbanBoards, tickets } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards';
	import type { IKanbanBoard, ITicket } from '../routes/types';
	import { onMount } from 'svelte';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import AddTicket from '$components/AddTicket.svelte';
	import Ticket from '$components/Ticket.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import DeleteIcon from './icons/DeleteIcon.svelte';

	export let board: IKanbanBoard;
	export let projectID: number;

	const flipDurationMs = 200;

	let boardName = '';
	let isEditing = false;
	let isLoading = true;

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

	function handleDndConsiderColumns(e: any) {
		console.log("🚀 ~ file: KanbanBoard.svelte:79 ~ handleDndConsiderColumns ~ e:", e)
		$tickets = e.detail.items;
	}
	
	function handleDndFinalizeColumns(e: any) {
		$tickets = e.detail.items;
	}

	function handleDndConsiderCards(cid: number, e: any) {
		console.log("🚀 ~ file: KanbanBoard.svelte:86 ~ handleDndConsiderCards ~ e:", e)
		const colIdx = $tickets.findIndex((c: ITicket) => c.id === cid);
		$tickets[colIdx].items = e.detail.items;
		$tickets = [...$tickets];
	}

	function handleDndFinalizeCards(cid: number, e: any) {
		console.log("🚀 ~ file: KanbanBoard.svelte:91 ~ handleDndFinalizeCards ~ e:", e)
		const colIdx = $tickets.findIndex((c: ITicket) => c.id === cid);
		$tickets[colIdx].items = e.detail.items;
		$tickets = [...$tickets];
	}
</script>

<div class="h-full w-64 min-w-[16rem] rounded-md bg-gray-800 p-3">
	<!-- <div class="flex justify-between items-baseline">
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
			<button
				class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
				on:click={() => setIsEditing(board.boardName)}
			>
				<EditIcon />
			</button>
			<button
				class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
				on:click={() => deleteBoard(Number(board?.id))}
			>
				<DeleteIcon />
			</button>
		</div>
	</div> -->
	{#if !isLoading}
		<section
			use:dndzone={{ items: $tickets, flipDurationMs, type: 'columns' }}
			on:consider={handleDndConsiderColumns}
			on:finalize={handleDndFinalizeColumns}
		>
			{#each $tickets as ticket (ticket.id)}
				<div class="column" animate:flip="{{duration: flipDurationMs}}">
					<div class="column-title">{ticket?.boardName}</div>
					<div
						class="column-content"
						use:dndzone={{ items: ticket.items, flipDurationMs }}
						on:consider={(e) => handleDndConsiderCards(ticket.id, e)}
						on:finalize={(e) => handleDndFinalizeCards(ticket.id, e)}
					>
						{#each ticket?.items as item (item.id)}
							<div class="card" animate:flip={{ duration: flipDurationMs }}>
								{item?.title}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</section>
		<!-- <AddTicket position={getNextPosition($tickets, Number(board?.id))} data={board} /> -->
		{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
	.column {
		height: auto;
		width: 250px;
		padding: 0.5em;
		margin: 1em;
		float: left;
		border: 1px solid #333333;
	}
	.column-content {
		height: auto;
	}
	.column-title {
		margin-bottom: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		height: 15%;
		width: 100%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eb9696;
		border: 1px solid #333333;
	}
</style>
