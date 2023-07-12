<script lang="ts">
	import { goto } from '$app/navigation';
	import { userID } from '$lib/BoardsStore.js';
	import { onMount } from 'svelte';

	export let form;
	let password = '';
	let email = '';
	onMount(() => {
		if ($userID) {
			goto('/projects');
		}
	});
</script>

<form
	action="?/login"
	method="POST"
	class="flex flex-col gap-3 m-auto w-[500px] p-5 border-stone-300 border-2 rounded-md"
>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		autocomplete="off"
		class="text-black caret-black rounded-md h-8 pl-1 bg-stone-300 border-0 formInput"
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		autocomplete="off"
		class="text-black caret-black rounded-md h-8 pl-1 bg-stone-300 border-0 formInput"
	/>
	<button type="submit" class="p-2 rounded-md self-center bg-blue-600">Login</button>
	<p class="text-center">Don't have an account? <a href="/auth" class="underline">Jump in!</a></p>
</form>

<style>
	.formInput:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
</style>
