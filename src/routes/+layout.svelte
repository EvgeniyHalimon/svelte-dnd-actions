<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import 'iconify-icon';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userID } from '$lib/BoardsStore';

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

		if(session?.user.id){
			userID.set(session.user.id);
			console.log("🚀 ~ file: +layout.svelte:30 ~ onMount ~ userID:", $userID)
		}

		return () => subscription.unsubscribe();
	});

	const submitLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
	}; 
</script>

<div class="p-8 w-screen">
	<nav class="pb-10 flex justify-between">
		<div class="flex gap-3">
			<a href="/" class="font-semibold text-3xl mr-6">Dashboard</a>
			<a href="/projects" class="font-semibold text-3xl">Projects</a>
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
		<p>Welcome, {data.session.user.user_metadata.username}</p>
	{/if}

	<slot />
</div>
