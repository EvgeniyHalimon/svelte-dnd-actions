<script lang="ts">
	import { columns, comments } from '$lib/BoardsStore';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { IColumns, IComments, ITicket } from '../routes/types';
	import DeleteIcon from './icons/DeleteIcon.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import SendIcon from './icons/SendIcon.svelte';
	import TicketModal from '$components/TicketModal.svelte';
	import ModalContent from '$components/ModalContent.svelte';
	import { commentsRepository } from '$lib/repository/commentsRepository';

	export let ticket: ITicket;
	export let i: number;
	let isEditing = false;
	let newTitle = ticket.title;
	let showModal = false;

	let isVisible = false;

	function toggleVisibility() {
		isVisible = !isVisible;
	}

	const updateTitle = async (id: number) => {
		await ticketRepository.updateTitle(id, newTitle);
		const updatedColumns = $columns.map((column: IColumns) => {
			return {
				...column,
				items: column.items.map((ticket: ITicket) => {
					if (ticket.id === id) {
						return { ...ticket, title: newTitle };
					}
					return ticket;
				})
			};
		});
		columns.set(updatedColumns);
		isEditing = false;
	};

	const deleteTicket = async (id: number) => {
		await ticketRepository.delete(id);
		const updatedTickets = $columns.map((ticket: IColumns) => {
			return {
				...ticket,
				items: ticket.items
					.filter((item: any) => item.id !== id)
					.map((item: any, index: number) => {
						return { ...item, position: index + 1 };
					})
			};
		});
		await ticketRepository.updatePositions(updatedTickets[i].items);
		columns.set(updatedTickets);
	};

	const loadComments = async () => {
		const commentsData = (await commentsRepository.getByTicketID(Number(ticket.id)))?.sort(
			(a: IComments, b: IComments) => b.created_at.localeCompare(a.created_at)
		) as IComments[];
		comments.set(commentsData);
		showModal = true;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="flex justify-between items-center bg-slate-600 rounded-md min-w-[14rem] h-full break-words p-2 mt-3 hover:bg-slate-500 translate-all duration-300"
	on:mouseenter={toggleVisibility}
	on:mouseleave={toggleVisibility}
>
	{#if !isEditing}
		<p class="w-full" on:click={loadComments}>
			{newTitle}
		</p>
		<TicketModal bind:showModal>
			<ModalContent {ticket} />
		</TicketModal>
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
			autofocus
			bind:value={newTitle}
		/>
	{/if}
	{#if !isEditing}
		<div
			class="{isVisible
				? 'opacity-100'
				: 'opacity-0'} flex items-center gap-2 transition-all duration-200 h-5"
		>
			<button
				class="h-4 text-sm hover:opacity-50 transition-all duration-200"
				on:click={() => (isEditing = true)}
			>
				<EditIcon />
			</button>
			<button
				class="h-4 w-4 text-sm hover:opacity-50 transition-all duration-200"
				on:click={() => deleteTicket(Number(ticket.id))}
			>
				<DeleteIcon />
			</button>
		</div>
	{:else}
		<button on:click={() => updateTitle(Number(ticket.id))}>
			<SendIcon />
		</button>
	{/if}
</div>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
