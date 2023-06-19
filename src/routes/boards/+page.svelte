<script lang="ts">
	import { boards } from '$lib/BoardsStore';
	import { vocab } from '../vocab';
    import Board from '../../components/Board.svelte';
    import AddBoard from '../../components/AddBoard.svelte';

	const addBoard = () => {
        $boards = [...$boards, { boardId: $boards.length + 1, boardName: `${vocab[Math.floor(Math.random() * vocab.length) + 1]} board`, kanbanBoards: [] }];
	};
</script>

<svelte:head>
    <title>Boards</title>
</svelte:head>

<AddBoard {addBoard}/>

<div class="flex gap-4 flex-wrap">
    {#each $boards as board}
    	<Board {board}/>
    {/each}
</div>

<style>
    .box {
      transition: transform 0.5s;
    }
  
    .box.hovered {
      transform: rotate(360deg);
    }
</style>