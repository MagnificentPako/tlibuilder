<script lang="ts">
	interface Props {
		talent: TalentNodeType;
		selectedCount: number;
		increment: () => void;
		decrement: (evt: MouseEvent) => void;
	}

	let { talent, selectedCount, increment, decrement }: Props = $props();
</script>

<div
	id="container"
	class={selectedCount > 0 ? 'is-active' : ''}
	onclick={increment}
	oncontextmenu={decrement}
>
	<img src="{talent.icon}.png" alt={talent.name} />
	<p id="overlay">{selectedCount}</p>
</div>

<style>
	#container,
	#container > img {
		position: absolute;
		width: 64px;
		height: 64px;
	}

	#container {
		position: relative;
		border-radius: 50%;
		border-style: solid;
		border-color: white;
		border-width: 6px;
		background-color: orange;
	}

	.is-active {
		border-style: none;
		background-color: white !important;
	}

	.is-active > img {
		filter: invert();
	}

	#overlay {
		position: absolute;
		bottom: -35px;
		right: -5px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 16pt;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 10%;
		padding: 2px;
		color: white;
	}
</style>
