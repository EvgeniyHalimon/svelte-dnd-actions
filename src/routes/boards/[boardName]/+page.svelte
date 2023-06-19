<script lang="ts">
	import { page } from '$app/stores';
	import { boards, kanbanBoards } from '$lib/BoardsStore';
	import { onMount } from 'svelte';
	import type { IBoards } from '../../types';
 
	let boardName: string;

  onMount(async () => {
    boardName = $page.params.boardName;
    await setKanbanBoards();
  });

  async function setKanbanBoards() {
    const matchingBoard = $boards.find((board: IBoards) => board.boardName === boardName);
    if (matchingBoard) {
      kanbanBoards.set(matchingBoard.kanbanBoards);
    }
  }

	const addBoard = () => {
		kanbanBoards.update((board) => {
			board = [...board, { id: board.length + 1, boardName: 'TODO', tickets: [] }];
			return board;
		});
		boards.update(
			(board) => {
				board.map((b) => {
					if (b?.boardName == boardName) {
						b.kanbanBoards.push({ id: b.kanbanBoards.length + 1, boardName: 'TODO', tickets: [] });
					}
				}) as any;
				return board
			});
	};
</script>

<svelte:head>
	<title>{boardName}</title>
</svelte:head>
<h1 class="pb-4">There will be kanban board {boardName}</h1>

<div class="flex gap-8">
	{#if $kanbanBoards.length !== 0}
		{#each $kanbanBoards as board}
			<p>{board?.boardName}</p>
		{/each}
	{:else}
		<p>No boards</p>
	{/if}
	<button on:click={() => addBoard()}>+++</button>
</div>
