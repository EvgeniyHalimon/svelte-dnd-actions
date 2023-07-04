<script lang="ts">
    import { kanbanBoards } from '$lib/BoardsStore';
    import Description from '$components/Description.svelte';
    import ModalTitle from '$components/ModalTitle.svelte';
	import type { IKanbanBoard, ITicket } from '../routes/types';
	import { getDate } from '../utils/utils';

	export let ticket: ITicket;
    /* let columnName = $kanbanBoards.filter((board: IKanbanBoard) => board.id === ticket.boardID)[0].boardName */

</script>

<div>
    <ModalTitle title={ticket.title} id={Number(ticket.id)}/>
    <p class="text-white text-xs mb-3">In column</p>
    <Description description={ticket.description} id={Number(ticket.id)}/>
    <p class="text-white text-sm text-right">Created : {getDate(ticket.created_at)}</p>
    <p class="text-white text-lg mb-3">Actions</p>
    <div class="flex justify-between">
        <input type="text" placeholder="Out of order" class="text-white bg-slate-900 border-none border-0 rounded-md w-[85%]">
        <button class="text-white rounded-md bg-sky-700 w-20 hover:bg-sky-600 transition-all duration-300">Send</button>
    </div>
</div>