<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>There will be dashboard</h1>
<a href="/projects" class="mb-3">Move along to see all Projects</a>
