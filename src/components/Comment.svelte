<script lang="ts">
	import { comments } from '$lib/BoardsStore';
	import { commentsRepository } from '$lib/repository/commentsRepository';
	import type { IComments } from '../routes/types';
	import { getDate } from '../utils/utils';

	export let comment: IComments;
	let isUpdating = false;
	let newComment: string;

	const deleteComment = async () => {
		await commentsRepository.delete(comment.id);
		const updatedComments = $comments.filter((com) => com.id !== comment.id);
		comments.set(updatedComments);
	};

	const updateComment = async () => {
		await commentsRepository.update(comment.id, newComment);
		const updatedComments = $comments.map((com) => {
			if (comment.id === com.id) {
				return { ...com, comment: newComment };
			}
			return com;
		});
		comments.set(updatedComments);
		isUpdating = false;
	};

	const setToUpdate = () => {
		isUpdating = true;
		newComment = comment.comment;
	};

	const cancelUpdate = async () => {
		isUpdating = false;
	};
</script>

<div class="mb-3">
	{#if !isUpdating}
		<p class="text-white text-sm bg-slate-900 p-2 rounded mb-2">{comment.comment}</p>
	{:else}
		<input
			type="text"
			autofocus
			class="text-white w-full text-sm bg-slate-900 p-2 rounded mb-2"
			bind:value={newComment}
			on:blur={updateComment}
		/>
	{/if}
	<div class="flex justify-between pl-1">
		<div class="flex gap-2">
			{#if isUpdating}
				<p
					class="text-white cursor-pointer text-xs hover:underline transition-all duration-300"
					on:click={cancelUpdate}
				>
					Cancel
				</p>
			{:else}
				<p
					class="text-white cursor-pointer text-xs hover:underline transition-all duration-300"
					on:click={setToUpdate}
				>
					Update
				</p>
			{/if}
			<p
				class="text-white cursor-pointer text-xs hover:underline transition-all duration-300"
				on:click={deleteComment}
			>
				Delete
			</p>
		</div>
		<p class="text-white text-xs">{getDate(comment.created_at)}</p>
	</div>
</div>
