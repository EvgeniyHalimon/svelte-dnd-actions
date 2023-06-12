<script lang="ts">
	export let cardItem: ListItem;
    interface ListItem {
		id: number,
		title: string,
		description: string,
		tags: string[],
	}
</script>


<div class="card-header">
    <h4>{cardItem.title}</h4>
</div>
<div class="p-4">{cardItem.description}</div>
<div class="card-footer flex gap-2">
    {#each  cardItem.tags as tag }
        <div class="chip variant-filled-secondary">{tag}</div>
    {/each}
</div>
