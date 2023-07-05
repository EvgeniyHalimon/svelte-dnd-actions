<script lang="ts">
	import { comments } from '$lib/BoardsStore';
	import { commentsRepository } from '$lib/repository/commentsRepository';
	import Comment from '$components/Comment.svelte';
	import type { IComments } from '../routes/types';

	export let ticketID: number;
	let newComment = '';

	const addComment = async () => {
		await commentsRepository.post(ticketID, newComment);
		const newComments = (await commentsRepository.getByTicketID(ticketID))?.sort((a: IComments, b: IComments) => b.created_at.localeCompare(a.created_at)) as IComments[];
		comments.set(newComments)
		newComment = '';
	};
</script>

<div class="flex justify-between mb-5">
	<input
		type="text"
		placeholder="Add comment"
		class="text-white bg-slate-900 border-none border-0 rounded-md w-[85%]"
		bind:value={newComment}
	/>
	<button
		class="text-white rounded-md bg-sky-700 w-20 hover:bg-sky-600 transition-all duration-300"
		on:click={addComment}>Send</button
	>
</div>

{#each $comments as comment}
	<Comment {comment}/>
{/each}
