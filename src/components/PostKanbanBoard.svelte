<script lang="ts">
	import { columns, kanbanBoards, tickets } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards.js';
	import type { IKanbanBoard } from '../routes/types';
	import { transformArray } from '../utils/utils';
	import SendIcon from './icons/SendIcon.svelte';

	export let isEditing;
	export let projectID: number;
	let boardName = '';

	const add = async () => {
		await kanbanBoardsRepository.post({
			boardName: boardName,
			projectID: projectID,
			position: $kanbanBoards?.length + 1
		});
		boardName = '';
		isEditing = false;
		const boards = await kanbanBoardsRepository.get(projectID) as IKanbanBoard[]
		kanbanBoards.set(boards);
		columns.set(transformArray(boards, $tickets))
	};

	const addBoard = async (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			add();
		} else if (e.key === 'Escape') {
			boardName = '';
			isEditing = false;
			return;
		}
	};
</script>

<div class="h-full w-64 min-w-[16rem] rounded-md bg-gray-800 p-3 flex justify-between items-center">
	<input
		type="text"
		class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
		bind:value={boardName}
		autofocus
		on:keydown={(e) => addBoard(e)}
	/>
	<button class="h-4 hover:opacity-50 transition-all duration-200" on:click={add}>
		<SendIcon />
	</button>
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
