<script lang="ts">
	import type { IProjects } from '../routes/types';
	import { projects } from '$lib/BoardsStore';
	import { goto } from '$app/navigation';

	export let project: IProjects;
	/* let newBoardName = board.boardName;
	let isChanging = false;
	const changeBoardName = (id: number) => {
		projects.update((projects) =>
			projects.map((board) => {
				if (board.boardId === id) {
					return { ...board, boardName: newBoardName };
				}
				return board;
			})
		);
		isChanging = false;
		$projects = $projects;
	};

	function toggle() {
		isChanging = !isChanging;
	} */

	const goToBoard = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			goto(`/projects/${project.id}`)
		}
	}
</script>

<button 
	class="h-10 bg-slate-400 rounded-[5px] text-white py-2 px-3 cursor-pointer hover:bg-slate-300 transition-all duration-300" 
	on:click={()=>goto(`/projects/${project.id}`)} 
	on:keydown={(e) => goToBoard(e)}
>
	<p class="flex w-full align-center">{project.projectName}</p>
</button>
<!-- {#if isChanging}
	
	<form
		action="#"
		on:submit|preventDefault={() => changeBoardName(board.boardId)}
		class="h-10 bg-slate-400 rounded-[5px] text-white p-1"
		on:click={toggle}
	>
		<input
			type="text"
			bind:value={newBoardName}
			on:blur={() => changeBoardName(board.boardId)}
			class="formInput w-full bg-transparent border-none border-0 outline-0 h-8 italic"
			autofocus
		/>
	</form>
{:else}
	
	
{/if} -->

<style>
	.formInput:focus{
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
