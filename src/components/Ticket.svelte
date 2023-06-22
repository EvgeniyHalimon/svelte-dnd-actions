<script lang="ts">
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { ITicket } from '../routes/types';
	import DeleteIcon from './icons/DeleteIcon.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import SendIcon from './icons/SendIcon.svelte';

	export let ticket: ITicket;
	let isEditing = false;
    let newTitle = ticket.title

	let isVisible = false;

	function toggleVisibility() {
		isVisible = !isVisible;
	}

    const updateTitle = async (id: number) => {
        await ticketRepository.updateTitle(id, newTitle)
        isEditing = false
    }
</script>

<div 
	class="flex justify-between items-center bg-slate-600 rounded-md min-w-[14rem] h-full break-words p-2 mt-3 hover:bg-slate-500 translate-all duration-300"
	on:mouseenter={toggleVisibility}
    on:mouseleave={toggleVisibility}
>
	{#if !isEditing}
		<p>
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
		<div class="{isVisible ? 'opacity-100' : 'opacity-0'} flex items-center gap-2 transition-all duration-200 h-5">
			<button class="h-4 text-sm hover:opacity-50 transition-all duration-200" on:click={() => isEditing = true}>
				<EditIcon/>
			</button>
			<button class="h-4 w-4 text-sm hover:opacity-50 transition-all duration-200">
				<DeleteIcon />
			</button>
		</div>
	{:else}
		<button on:click={() => updateTitle(Number(ticket.id))}>
			<SendIcon/>
		</button>
	{/if}
</div>
