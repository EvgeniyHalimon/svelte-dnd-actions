<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { userID } from '$lib/BoardsStore';
</script>

{#if !$userID}
	<div class="flex flex-col gap-2">
		<p class="text-2xl">
			"Easy Kanban boards" are digital applications that help you easily organize and manage your
			tasks and projects using the Kanban method.
		</p>
		<p class="text-2xl">
			Discover various applications that can simplify your workflow and boost productivity.
		</p>
		<a href="/auth" class="underline text-2xl">Jump in.</a>
	</div>
	{:else}
	<h1>There will be dashboard</h1>
	<a href="/projects" class="mb-3">Move along to see all Projects</a>
{/if}
