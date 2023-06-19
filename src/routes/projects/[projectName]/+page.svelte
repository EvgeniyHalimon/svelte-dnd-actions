<script lang="ts">
	import { page } from '$app/stores';
	import { projects, kanbanBoards } from '$lib/BoardsStore';
	import type { IProjects } from '../../types';
	
	let projectName: string = $page.params.projectName
	let projectID : number;
	
	const b = $projects.find((project: IProjects) => {
		if(project.projectName === projectName){
			return project
		}
	});
	projectID = b?.id as number
	console.log("🚀 ~ file: +page.svelte:18 ~ projectID:", projectID)
	$ : console.log("🚀 ~ file: +page.svelte:18 ~ setKanbanBoards ~ kanbanBoards:", $kanbanBoards)

	const addBoard = () => {
		kanbanBoards.update((board) => {
			board = [...board, { boardName: `${Date.now()}`, projectID: projectID }];
			return board;
		});
	};
</script>

<svelte:head>
	<title>{projectName}</title>
</svelte:head>
<h1 class="pb-4">There will be kanban board {projectName}</h1>

<div class="flex gap-8">
		{#each $kanbanBoards as board}
			{#if board.projectID === projectID}
				<p>{board?.boardName}</p>
			{/if}
		{/each}
	<button on:click={() => addBoard()}>+++</button>
</div>
