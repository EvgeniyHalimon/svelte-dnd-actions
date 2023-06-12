<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import {flip} from 'svelte/animate'
	import Card from '../components/Card.svelte';

	const FLIP_DURATION = 100
	
	interface ListItem {
		id: number,
		title: string,
		description: string,
		tags: string[],
	}
	
	let items: ListItem[] = [
		{
			id: 1,
			title: 'Svelte',
			description: '',
			tags: ['unabomber', 'ted k']
		},
		{
			id: 2,
			title: 'SvelteKit',
			description: '',
			tags: ['unabomber']
		}
	];

	const handleConsider = (e: CustomEvent<DndEvent<ListItem>>) => {
		items = e.detail.items
	};

	const handleFinalize = (e: CustomEvent<DndEvent<ListItem>>) => {
		items = e.detail.items
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<section 
		use:dndzone="{{ items: items, flipDurationMs: FLIP_DURATION, dropTargetStyle: {} }}"
		on:consider="{handleConsider}" 
		on:finalize="{handleFinalize}"
	>
		{#each items as item (item.id)}
			<div class="card card-hover w-96 my-4" animate:flip="{{duration: FLIP_DURATION}}">
				<Card cardItem={item}/>
			</div>
		{/each}
	</section>
</div>
