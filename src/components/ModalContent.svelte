<script lang="ts">
    import { kanbanBoards } from '$lib/BoardsStore';
    import Description from '$components/ModalDescription.svelte';
    import Title from '$components/ModalTitle.svelte';
    import Comments from '$components/ModalComments.svelte';
	import type { IKanbanBoard, ITicket } from '../routes/types';
	import { getDate } from '../utils/utils';

	export let ticket: ITicket;
    let columnName = $kanbanBoards.filter((board: IKanbanBoard) => board.id === ticket.boardID)[0].boardName

</script>

<div>
    <Title title={ticket.title} id={Number(ticket.id)}/>
    <p class="text-white text-xs mb-3">In column {columnName}</p>
    <Description description={ticket.description} id={Number(ticket.id)}/>
    <p class="text-white text-sm text-right">Created : {getDate(ticket.created_at)}</p>
    <p class="text-white text-lg mb-3">Add comment</p>
    <Comments ticketID={Number(ticket.id)}/>
</div>