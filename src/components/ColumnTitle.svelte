<script lang="ts">
	import { columns } from '$lib/BoardsStore';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import DeleteIcon from '$components/icons/DeleteIcon.svelte';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoardsRepository';
	import type { IColumns } from '../routes/types';

	export let column: IColumns;
	export let projectID: number;

	let isEditingColumnTitle = false;
	let isVisible = false;
	let boardName = '';
	let prevBoardName = '';

	const updateColumnTitle = async (id: number, newBoardName: string) => {
		await kanbanBoardsRepository.update(id, newBoardName);
		const updatedTickets = $columns.map((ticket: IColumns) => {
			if (ticket.boardName === prevBoardName) {
				return { ...ticket, boardName: newBoardName };
			}

			return ticket;
		});

		columns.set(updatedTickets);
		isEditingColumnTitle = false;
		boardName = '';
	};

	const deleteBoard = async (id: number) => {
		await kanbanBoardsRepository.delete(id);
		const updatedTickets = $columns.filter((ticket: IColumns) => ticket.id !== id);

		columns.set(updatedTickets);
	};

	const setIsEditing = (currentBoardName: string) => {
		isEditingColumnTitle = true;
		boardName = currentBoardName;
		prevBoardName = currentBoardName;
	};

	function toggleVisibility() {
		isVisible = !isVisible;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
	class="flex justify-between items-baseline"
	on:mouseenter={toggleVisibility}
	on:mouseleave={toggleVisibility}
>
	{#if !isEditingColumnTitle}
		<p >{column?.boardName}</p>
	{:else}
		<input
			type="text"
			class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
			bind:value={boardName}
			autofocus
			on:blur={() => updateColumnTitle(Number(column.id), boardName)}
		/>
	{/if}
	<div class="{isVisible
		? 'opacity-100'
		: 'opacity-0'} flex items-center gap-2">
		<button
			class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
			on:click={() => setIsEditing(column.boardName)}
		>
			<EditIcon />
		</button>
		<button
			class="cursor-pointer h-4 hover:opacity-50 transition-all duration-200"
			on:click={() => deleteBoard(Number(column?.id))}
		>
			<DeleteIcon />
		</button>
	</div>
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
