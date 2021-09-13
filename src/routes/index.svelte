<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from '$lib/Counter.svelte';
	import { toggleService } from '/src/machines/toggleMachine.js';

	$: toggleState = $toggleService.matches('inactive') ? 'Off' : 'On';

	const toggle = () => {
		toggleService.send('TOGGLE');
	};
</script>

<section>
	<h1>
		TESTING TESTING
		<button on:click={toggle}>Switch</button>
		{toggleState}
	</h1>
	<div>
		<Counter />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
