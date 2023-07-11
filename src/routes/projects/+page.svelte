<script lang="ts">
	import { projects, userID } from '$lib/BoardsStore';
	import { vocab } from '../vocab';
	import Projects from '$components/Projects.svelte';
	import AddProject from '$components/AddButton.svelte';
	import { projectRepository } from '$lib/repository/projectsRepository';
	import { onMount } from 'svelte';

	const add = async () => {
		/* $projects = [
			...$projects,
			{ projectName: `${vocab[Math.floor(Math.random() * vocab.length) + 1]} board` }
		]; */
		if ($userID) {
			await projectRepository.post({
				projectName: `${vocab[Math.floor(Math.random() * vocab.length) + 1]} board`,
				userID: $userID
			});
			projects.set(await projectRepository.getByUserID($userID));
		}
	};

	onMount(async () => {
		if ($userID) {
			const data = await projectRepository.getByUserID($userID);
			console.log('🚀 ~ file: +page.svelte:24 ~ onMount ~ data:', data);
			projects.set(data);
		}
	});
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<AddProject {add} />

<div class="flex gap-4 flex-wrap">
	{#each $projects as project}
		<Projects {project} />
	{/each}
</div>
