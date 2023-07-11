<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import 'iconify-icon';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userID } from '$lib/BoardsStore';
	import { fade, fly } from 'svelte/transition';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		if (session?.user.id) {
			userID.set(session.user.id);
		}

		return () => subscription.unsubscribe();
	});

	const submitLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		goto('/')
	};
</script>

<div class="p-8 w-screen">
	<nav class="pb-10 flex justify-between items-center">
		<div class="flex gap-3">
			{#if $userID}
				<a href="/dashboard" class="font-semibold text-3xl mr-6">Dashboard</a>
				<a href="/projects" class="font-semibold text-3xl">Projects</a>
				{:else}
				<h1 class="text-3xl">Easy kanban boards</h1>
			{/if}
		</div>
		{#if data.session}
			<form action="/logout" method="POST" on:submit={submitLogout}>
				<button type="submit" class="btn btn-primary">Logout</button>
			</form>
		{:else}
			<div class="flex gap-3">
				<a href="/login" class="btn btn-primary">Login</a>
				<a href="/auth" class="btn btn-secondary">Register</a>
			</div>
		{/if}
	</nav>

	{#if data.session}
		<p class="mb-4">Welcome, {data.session.user.user_metadata.username}</p>
	{/if}

	<slot />
</div>
