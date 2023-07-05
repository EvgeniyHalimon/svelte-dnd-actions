<script lang="ts">
	import { columns } from '$lib/BoardsStore';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { IColumns, ITicket } from '../routes/types';

	export let title: string;
	export let id: number;
	let newTitle: string
	let isUpdating = false;

	const save = async (id: number, newTitle: string) => {
		await ticketRepository.updateTitle(id, newTitle);
        const updatedColumns = $columns.map((column: IColumns) => {
			return {...column, items: column.items.map((ticket: ITicket) => {
                if(ticket.id === id){
                    return {...ticket, title: newTitle}
                }
                return ticket;
            })}
		});
        columns.set(updatedColumns)
        isUpdating = false;
	};

	const cancel = () => {
		isUpdating = false;
		newTitle = title;
	};

    const setIsUpdating = () => {
        isUpdating = true;
        newTitle = title;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

{#if isUpdating}
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			bind:value={newTitle}
			autofocus
			class="w-full border-0 bg-slate-900 text-white resize-none rounded-md"
		/>
		<div>
			<button
				class="text-white rounded-md bg-sky-700 w-14 hover:bg-sky-600 transition-all duration-300 mr-3"
				on:click={() => save(id, newTitle)}
			>
				Save
			</button>
			<button
				class="text-white rounded-md bg-red-900 w-14 hover:bg-red-800 transition-all duration-300"
				on:click={cancel}
			>
				Cancel
			</button>
		</div>
	</div>
{:else}
    <p class="text-white font-semibold text-xl mb-3" on:click={setIsUpdating}>{title}</p>
{/if}
