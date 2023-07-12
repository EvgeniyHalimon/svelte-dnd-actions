<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userID } from '$lib/BoardsStore';
</script>

{#if $userID}
	<h1>There will be dashboard</h1>
	<a href="/projects" class="mb-3">Move along to see all Projects</a>
{/if}
