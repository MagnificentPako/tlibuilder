<script lang="ts">
	import { hydrate, mount } from 'svelte';
	import TalentNode from './TalentNode.svelte';

	interface Props {
		god: God;
		talents: TalentNodeType[];
	}

	interface TalentState {
		nodeSelection: Map<number, number>;
	}

	let talentState = $state({ nodeSelection: new Map() } as TalentState);

	let { god, talents }: Props = $props();

	let container: HTMLDivElement;
	let svgc: HTMLDivElement;

	$effect(() => {
		container.style.setProperty('--grid-cols', '' + god.size[1]);
		container.style.setProperty('--grid-rows', '' + god.size[0]);
		container.style.setProperty('width', '' + god.size[0] * 64 * 4 + 'px');
		container.innerHTML = ''; // remove all children
		svgc.innerHTML = '';
		const nodes = Array.from(Array(god.size[1] + 1), () => new Array(god.size[0] + 1));

		// Draw Nodes
		talents
			.filter((t) => t.position[0] != 0 && t.position[1] != 0)
			.forEach((t) => {
				let node = document.createElement('div');
				if (!talentState.nodeSelection.has(t.id)) {
					talentState.nodeSelection.set(t.id, 0);
				}
				let props = $state({
					talent: t,
					selectedCount: talentState.nodeSelection.get(t.id) as number,
					increment: () => {
						if ((talentState.nodeSelection.get(t.id) as number) < t.level_up_time) {
							talentState.nodeSelection.set(
								t.id,
								(talentState.nodeSelection.get(t.id) as number) + 1
							);
							props.selectedCount = talentState.nodeSelection.get(t.id) as number;
						}
					},
					decrement: (event: MouseEvent) => {
						event.preventDefault();
						if ((talentState.nodeSelection.get(t.id) as number) > 0) {
							talentState.nodeSelection.set(
								t.id,
								(talentState.nodeSelection.get(t.id) as number) - 1
							);
							props.selectedCount = talentState.nodeSelection.get(t.id) as number;
						}
					}
				});
				mount(TalentNode, {
					target: node,
					props: props
				});
				node.style.setProperty('grid-column', '' + t.position[1]);
				node.style.setProperty('grid-row', '' + t.position[0]);
				node.classList.add('node-wrapper');
				container.appendChild(node);
				nodes[t.position[1]][t.position[0]] = node;
			});

		talents
			.filter((t) => t.position[0] != 0 && t.position[1] != 0)
			.forEach((t) => {
				if (t.before_id != 0) {
					const before_t = talents.filter((tt) => tt.id == t.before_id)[0];
					if (before_t.position[0] != 0 && before_t.position[1] != 0) {
						const before_rect: DOMRect = (
							nodes[before_t.position[1]][before_t.position[0]] as HTMLElement
						).children[0].getBoundingClientRect();
						const rect: DOMRect =
							nodes[t.position[1]][t.position[0]].children[0].getBoundingClientRect();
						const x1 = before_rect.left + before_rect.width / 2;
						const y1 = before_rect.top - 76;
						const x2 = rect.left + rect.width / 2;
						const y2 = rect.top - 76;
						const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
						line.setAttribute('x1', '' + x1);
						line.setAttribute('y1', '' + y1);
						line.setAttribute('x2', '' + x2);
						line.setAttribute('y2', '' + y2);
						const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
						svg.appendChild(line);
						svgc.appendChild(svg);
					}
				}
			});
	});
</script>

<h1>{god.name}</h1>
<div id="wrapper">
	<div id="container" bind:this={container}></div>
	<div id="svg-container" bind:this={svgc}></div>
</div>

<style>
	:root {
		--grid-cols: 1;
		--grid-rows: 1;
	}

	#container {
		top: 0;
		left: 0;
		position: absolute;
		display: grid;
		grid-gap: 1em;
		grid-template-rows: repeat(var(--grid-rows), 1fr);
		grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
		padding: 20px;
		z-index: 1;
	}

	:global(.node-wrapper) {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#svg-container {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	#wrapper {
		position: relative;
		overflow-x: scroll;
		height: 500px;
		width: 60%;
		background-color: orange;
	}

	#svg-container :global(svg) {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	}

	#svg-container :global(line) {
		stroke: white;
		stroke-width: 5px;
	}
</style>
