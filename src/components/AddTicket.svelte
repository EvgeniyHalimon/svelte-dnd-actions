<script lang="ts">
	import { columns, kanbanBoards } from '$lib/BoardsStore';
	import { ticketRepository } from '$lib/repository/ticketsRepository';
	import type { IColumns, ITicket } from '../routes/types';
	import { transformArray } from '../utils/utils';
	import SendIcon from './icons/SendIcon.svelte';
	export let position: number;
	export let data: IColumns;
	export let i: number;

	let ticketTitle: string;

	const addTicket = async () => {
		await ticketRepository.post(position, { ...data, title: ticketTitle });
		const ticketsByProjectId = (await ticketRepository.getByProjectID(data.projectID)) as ITicket[];

		columns.set(transformArray($kanbanBoards, ticketsByProjectId));
		ticketTitle = '';
		isPosting = !isPosting;
	};

	let isPosting = false;

	function toggle() {
		isPosting = !isPosting;
		ticketTitle = '';
	}
</script>

<div
	class="{isPosting === true
		? 'flex mt-3'
		: 'hidden'} justify-between items-center bg-slate-600 rounded-md min-w-[14rem] h-full break-words p-2 mt-3"
>
	<input
		type="text"
		class="bg-transparent formInput h-[1.5rem] w-[11.5rem] px-0 focus:border-slate-800 border-none border-0 outline-0"
		autofocus={!isPosting}
		bind:value={ticketTitle}
	/>
	<button on:click={addTicket}>
		<SendIcon />
	</button>
</div>

<button
	class="w-6 float-right mt-2 rounded bg-gray-700 hover:bg-gray-600 transition-all duration-200"
	on:click={toggle}
>
	<p class="box w-6 h-6">+</p>
</button>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
