<script lang="ts">
	import { columns } from '$lib/BoardsStore';
	import Ticket from '$components/Ticket.svelte';
	import AddTicket from '$components/AddTicket.svelte';
	import ColumnTitle from '$components/ColumnTitle.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import type { IColumns, ITicket } from '../routes/types';
	import { ticketRepository } from '$lib/repository/ticketsRepository';

	export let column: IColumns;
	export let projectID: number;
	export let flipDurationMs: number;
	export let i: number;

	function getNextPosition(array: ITicket[], boardID: number) {
		const data = array.filter((column) => column.boardID == boardID);
		return data.length + 1;
	}

	function handleDndConsiderCards(columnId: number, e: any) {
		const colIdx = $columns.findIndex((c: IColumns) => c.id === columnId);
		$columns[colIdx].items = e.detail.items;
		$columns = [...$columns];
	}

	async function handleDndFinalizeCards(columnId: number, e: any) {
		const colIdx = $columns.findIndex((c: IColumns) => c.id === columnId);
		const updatedTicketsPositions = e.detail.items.map((item: ITicket, i: number) => {
			return { ...item, boardID: $columns[colIdx].id, position: i + 1 };
		});
		$columns[colIdx].items = updatedTicketsPositions;
		await ticketRepository.updatePositions(updatedTicketsPositions);
		$columns = [...$columns];
	}
</script>

<ColumnTitle {column} {projectID} />
<div
	class="flex flex-col"
	use:dndzone={{ items: column?.items, flipDurationMs }}
	on:consider={(e) => handleDndConsiderCards(column.id, e)}
	on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
>
	{#each column?.items as item (item.id)}
		<Ticket ticket={item} {i} />
	{/each}
</div>
<AddTicket position={getNextPosition(column?.items, Number(column?.id))} data={column} {i} />
