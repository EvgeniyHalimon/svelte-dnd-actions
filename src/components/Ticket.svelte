<script lang="ts">
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { ITicket } from '../routes/types';

	export let ticket: ITicket;
	let isEditing = false;
    let newTitle = ticket.title

    const updateTitle = async (id: number) => {
        await ticketRepository.updateTitle(id, newTitle)
        isEditing = false
    }
</script>

<div class="flex justify-between items-center bg-slate-600 rounded-md min-w-[14rem] h-full break-words p-2 mt-3">
	{#if !isEditing}
		<p class="">
			{newTitle}
		</p>
	{:else}
		<input
			type="text"
			class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
			autofocus
            bind:value={newTitle}
		/>
	{/if}
	{#if !isEditing}
		<button on:click={() => isEditing = true}>
			<iconify-icon
				icon="streamline:interface-edit-pencil-change-edit-modify-pencil-write-writing"
			/>
		</button>
	{:else}
		<button on:click={() => updateTitle(Number(ticket.id))}>
			<iconify-icon icon="carbon:send-alt" />
		</button>
	{/if}
</div>
