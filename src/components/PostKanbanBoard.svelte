<script lang="ts">
	import { kanbanBoards } from '$lib/BoardsStore';
	import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards.js';
    import BoardInput from '$components/BoardInput.svelte'

	export let isEditing;
	export let projectID: number;
	let boardName = '';

	const addBoard = async () => {
		await kanbanBoardsRepository.post({
			boardName: boardName,
			projectID: projectID,
			position: $kanbanBoards?.length
		});
		boardName = '';
		kanbanBoards.set(await kanbanBoardsRepository.get(projectID));
		isEditing = false;
	};
</script>

<div class="h-auto w-64 min-w-[16rem] rounded-md bg-gray-800 p-3">
    <BoardInput bind:boardName {addBoard}/>
</div>
