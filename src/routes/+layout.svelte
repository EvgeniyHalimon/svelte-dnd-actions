<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import { supabase } from '../supabase';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		const { data : { subscription }} = supabase.auth.onAuthStateChange(() => {
			invalidateAll
		})

		return () => {
			subscription.unsubscribe()
		}
	})
</script>

<div class="p-8 w-screen">
	<nav class="pb-10">
		<a href="/" class="font-semibold text-3xl mr-6">Dashboard</a>
		<a href="/projects" class="font-semibold text-3xl">Projects</a>
	</nav>

	<slot />
</div>
