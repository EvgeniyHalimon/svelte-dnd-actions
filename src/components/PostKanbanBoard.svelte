<script lang="ts">
	import { kanbanBoards } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards.js';
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
		kanbanBoards.set(await kanbanBoardsRepository.get(projectID));
	}

	const addBoard = async (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			add()
		} else if (e.key === 'Escape'){
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
	<button class="h-4" on:click={add}>
		<SendIcon/>
	</button>
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
