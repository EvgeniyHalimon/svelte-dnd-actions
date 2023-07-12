<script lang="ts">
	import { columns } from '$lib/BoardsStore';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { IColumns, ITicket } from '../routes/types';

	export let description: string;
	export let id: number;
	let newDescription: string;
	let isUpdating = false;

	const save = async (id: number, desc: string) => {
		await ticketRepository.updateDescription(id, desc);
		const updatedColumns = $columns.map((column: IColumns) => {
			return {
				...column,
				items: column.items.map((ticket: ITicket) => {
					if (ticket.id === id) {
						return { ...ticket, description: desc };
					}
					return ticket;
				})
			};
		});
		columns.set(updatedColumns);
		isUpdating = false;
	};

	const cancel = () => {
		isUpdating = false;
		newDescription = description;
	};

	const setIsUpdating = () => {
		isUpdating = true;
		newDescription = description;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

{#if isUpdating}
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			bind:value={newDescription}
			autofocus
			class="w-full border-0 h-32 bg-slate-900 text-white resize-none rounded-md mb-2"
		/>
		<div>
			<button
				class="text-white rounded-md bg-sky-700 w-14 hover:bg-sky-600 transition-all duration-300 mr-3"
				on:click={() => save(id, newDescription)}
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
	<p class="text-white text-lg mb-3" on:click={setIsUpdating}>
		Description: {description}
	</p>
{/if}
