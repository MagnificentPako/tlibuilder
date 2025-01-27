<script lang="ts">
	import TalentPage from '$lib/TalentPage.svelte';
	import pagesT from '$lib/talent_pages.json' with { type: 'json' };
	const pages = pagesT as unknown as [TalentPageType];
	let selected = $state(pages[0]);
</script>

<select bind:value={selected}>
	{#each pages as page}
		<option value={page}>{page.god.name}</option>
	{/each}
</select>
<TalentPage god={selected.god} talents={selected.talents}></TalentPage>
